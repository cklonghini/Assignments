#!/usr/bin/env python3
"""
Video helper for the Explore assignments. Needs ffmpeg and ffprobe on the PATH. Nothing else to install.

  python3 tools/video_tools.py transcript VIDEO [--captions FILE]
      Print the captions with times, so you can decide where each part's clip should start and end.

  python3 tools/video_tools.py cut VIDEO --out assignments/NAME/media --main taxonomy-video \
        --clip vocab=3:20-4:15 --clip changes=0:53-2:07 [--captions FILE]
      Re-encode the full video (the --main name) and cut one short clip per --clip.
      Each cut time is moved to the middle of the nearest pause between caption lines, so no sentence is chopped.
      Writes NAME.mp4 and NAME.vtt (captions) for the main video and for every clip, then prints the
      text to paste into assignment.js.

Captions: use --captions with an .srt or .vtt file, or leave it out to use captions stored inside the video file.
With no captions at all, cuts snap to the nearest quiet moment in the audio instead, and no .vtt files are written.
Times can be seconds (73.5) or minutes:seconds (1:13.5).
"""
import argparse, math, os, re, subprocess, sys, tempfile


def run(cmd, **kw):
    return subprocess.run(cmd, check=True, capture_output=True, text=True, **kw)


def parse_time(s):
    s = str(s).strip().replace(',', '.')
    parts = s.split(':')
    t = 0.0
    for p in parts:
        t = t * 60 + float(p)
    return t


def fmt_ts(x):
    x = max(0.0, x)
    return "%02d:%02d:%06.3f" % (int(x // 3600), int(x % 3600 // 60), x % 60)


def fmt_short(x):
    x = int(round(x))
    return "%d:%02d" % (x // 60, x % 60)


def duration(path):
    out = run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path]).stdout.strip()
    return float(out)


def read_cues_text(text):
    """Parse SRT or WebVTT text into [(start, end, text)]."""
    cues = []
    blocks = re.split(r'\n\s*\n', text.replace('\r\n', '\n').strip())
    for b in blocks:
        lines = [l for l in b.split('\n') if l.strip() != '']
        idx = next((i for i, l in enumerate(lines) if '-->' in l), None)
        if idx is None:
            continue
        a, c = [x.strip().split(' ')[0] for x in lines[idx].split('-->')]
        body = ' '.join(l.strip() for l in lines[idx + 1:])
        if body:
            cues.append((parse_time(a), parse_time(c), body))
    return cues


def load_cues(video, captions):
    if captions:
        return read_cues_text(open(captions, encoding='utf-8').read())
    with tempfile.TemporaryDirectory() as d:
        out = os.path.join(d, 'embedded.srt')
        try:
            run(['ffmpeg', '-v', 'error', '-y', '-i', video, '-map', '0:s:0', out])
            return read_cues_text(open(out, encoding='utf-8').read())
        except subprocess.CalledProcessError:
            return []


def silences(video):
    """Quiet moments in the audio, used only when there are no captions."""
    p = subprocess.run(['ffmpeg', '-v', 'info', '-i', video, '-map', '0:a:0', '-af', 'silencedetect=noise=-38dB:d=0.3',
                        '-f', 'null', '-'], capture_output=True, text=True)
    out, start = [], None
    for l in p.stderr.split('\n'):
        m = re.search(r'silence_start: (-?[\d.]+)', l)
        if m:
            start = max(0.0, float(m.group(1)))
        m = re.search(r'silence_end: ([\d.]+)', l)
        if m and start is not None:
            out.append((start, float(m.group(1))))
            start = None
    return out


def snap_points(cues, video):
    """Candidate cut points: the middle of each pause between caption lines (or each quiet moment)."""
    pts = []
    if cues:
        for i in range(len(cues) - 1):
            gap = cues[i + 1][0] - cues[i][1]
            if gap >= 0.15:
                pts.append((cues[i][1] + cues[i + 1][0]) / 2)
    else:
        pts = [(a + b) / 2 for a, b in silences(video)]
    return pts


def snap(t, pts, total):
    if t <= 0.05:
        return 0.0
    if t >= total - 0.05:
        return total
    if not pts:
        return t
    best = min(pts, key=lambda p: abs(p - t))
    return best if abs(best - t) <= 6 else t


def write_vtt(path, cues, start, length):
    lines = ['WEBVTT', '']
    n = 0
    for a, b, t in cues:
        if b <= start or a >= start + length:
            continue
        lines += [fmt_ts(max(0, a - start)) + ' --> ' + fmt_ts(min(length, b - start)), t, '']
        n += 1
    open(path, 'w', encoding='utf-8').write('\n'.join(lines))
    return n


def encode(video, out, start, length, width, crf):
    cmd = ['ffmpeg', '-v', 'error', '-y', '-ss', str(start), '-t', str(length), '-i', video,
           '-map', '0:v:0', '-map', '0:a:0?', '-sn', '-vf', 'scale=%d:-2' % width,
           '-c:v', 'libx264', '-preset', 'medium', '-crf', str(crf), '-pix_fmt', 'yuv420p',
           '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', out]
    run(cmd)
    return duration(out)


def cmd_transcript(a):
    cues = load_cues(a.video, a.captions)
    if not cues:
        print('No captions found. Pass --captions FILE.srt, or ask for a caption file.', file=sys.stderr)
        sys.exit(1)
    for i, (s, e, t) in enumerate(cues, 1):
        print('%3d  [%s - %s]  %s' % (i, fmt_short(s), fmt_short(e), t))
    print('\nTotal length: %s' % fmt_short(duration(a.video)))


def cmd_cut(a):
    os.makedirs(a.out, exist_ok=True)
    total = duration(a.video)
    cues = load_cues(a.video, a.captions)
    if not cues:
        print('Note: no captions found, so no .vtt files will be written and cuts snap to quiet moments in the audio.')
    pts = snap_points(cues, a.video)
    prefix = os.path.basename(os.path.normpath(a.out))
    results = {}
    # main video
    mp = os.path.join(a.out, a.main + '.mp4')
    secs = encode(a.video, mp, 0, total, a.width, a.crf)
    if cues:
        write_vtt(os.path.join(a.out, a.main + '.vtt'), cues, 0, total)
    main_seconds = math.ceil(secs)
    print('wrote %s (%.1f s)' % (mp, secs))
    for spec in a.clip or []:
        m = re.match(r'^([A-Za-z0-9_-]+)=([^-]+)-(.+)$', spec)
        if not m:
            sys.exit('Bad --clip "%s". Use name=START-END, for example vocab=3:20-4:15' % spec)
        name, s0, e0 = m.group(1), parse_time(m.group(2)), parse_time(m.group(3))
        s1, e1 = snap(s0, pts, total), snap(e0, pts, total)
        if e1 <= s1 + 1:
            sys.exit('Clip %s is too short after snapping (%.2f to %.2f)' % (name, s1, e1))
        out = os.path.join(a.out, 'clip-' + name + '.mp4')
        secs = encode(a.video, out, s1, e1 - s1, a.width, a.crf)
        if cues:
            write_vtt(os.path.join(a.out, 'clip-' + name + '.vtt'), cues, s1, secs)
        results[name] = dict(src='media/clip-%s.mp4' % name, frm=round(s1, 3), to=round(e1, 3), seconds=math.ceil(secs))
        print('wrote %s (%s to %s in the full video)' % (out, fmt_short(s1), fmt_short(e1)))
    print('\nPaste into assignment.js (fill in each title):\n')
    print("  video: { title: 'TITLE', src: 'media/%s.mp4', seconds: %d }," % (a.main, main_seconds))
    print('  clips: {')
    for k, v in results.items():
        print("    %s: { src: '%s', from: %s, to: %s, seconds: %d, title: 'TODO' }," % (k, v['src'], v['frm'], v['to'], v['seconds']))
    print('  },')


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest='cmd', required=True)
    t = sub.add_parser('transcript')
    t.add_argument('video'); t.add_argument('--captions')
    t.set_defaults(fn=cmd_transcript)
    c = sub.add_parser('cut')
    c.add_argument('video'); c.add_argument('--out', required=True); c.add_argument('--captions')
    c.add_argument('--main', required=True, help='file name (no extension) for the full video')
    c.add_argument('--clip', action='append', help='name=START-END, repeat for each clip')
    c.add_argument('--width', type=int, default=1280); c.add_argument('--crf', type=int, default=27)
    c.set_defaults(fn=cmd_cut)
    a = ap.parse_args()
    a.fn(a)


if __name__ == '__main__':
    try:
        main()
    except BrokenPipeError:
        pass
