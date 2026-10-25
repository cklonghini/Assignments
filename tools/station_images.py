#!/usr/bin/env python3
"""
Make web images from a PDF of station cards (or any slides), for assignments with no video.

  python3 tools/station_images.py cards PDF --out assignments/SLUG/media --name station [--pages 1-7] [--width 1600]
      Saves every page as media/station-1.jpg, station-2.jpg, ...

  python3 tools/station_images.py numbered PDF --out assignments/SLUG/media --spec SPEC.json
      Makes "label the diagram" images: crops part of a page, covers chosen labels with white, and puts a
      numbered circle where each label was. SPEC.json looks like this (all sizes in PDF points, 72 per inch;
      `pdftotext -bbox-layout PDF out.html` prints where every label is):

      [ { "page": 3, "out": "label-heart.png", "crop": [40, 225, 365, 585],
          "labels": [ { "n": 1, "box": [55, 239, 111, 278] }, ... ],
          "blank": [ [400, 158, 421, 310] ] } ]

      "blank" (optional) lists boxes to cover with white and leave empty, such as bits of reading text that
      fall inside the crop.

Needs pdftoppm (poppler) and Python Pillow.
"""
import argparse, json, os, subprocess, sys, tempfile

from PIL import Image, ImageDraw, ImageFont

FONT = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'


def render(pdf, page, dpi, tmp):
    base = os.path.join(tmp, 'p%d' % page)
    subprocess.run(['pdftoppm', '-r', str(dpi), '-f', str(page), '-l', str(page), '-singlefile', '-png', pdf, base], check=True)
    return Image.open(base + '.png').convert('RGB')


def pages_arg(s, n):
    if not s:
        return list(range(1, n + 1))
    out = []
    for part in s.split(','):
        a, _, b = part.partition('-')
        out += list(range(int(a), int(b or a) + 1))
    return out


def page_count(pdf):
    info = subprocess.run(['pdfinfo', pdf], capture_output=True, text=True, check=True).stdout
    return int([l for l in info.splitlines() if l.startswith('Pages:')][0].split()[1])


def cards(a):
    os.makedirs(a.out, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        for i, p in enumerate(pages_arg(a.pages, page_count(a.pdf)), 1):
            im = render(a.pdf, p, 200, tmp)
            if im.width > a.width:
                im = im.resize((a.width, round(im.height * a.width / im.width)), Image.LANCZOS)
            dest = os.path.join(a.out, '%s-%d.jpg' % (a.name, p))
            im.save(dest, quality=84, optimize=True, progressive=True)
            print('%s  (%dx%d, %d KB)' % (dest, im.width, im.height, os.path.getsize(dest) // 1024))


def numbered(a):
    os.makedirs(a.out, exist_ok=True)
    spec = json.load(open(a.spec))
    dpi = 300
    k = dpi / 72.0
    with tempfile.TemporaryDirectory() as tmp:
        for d in spec:
            im = render(a.pdf, d['page'], dpi, tmp)
            dr = ImageDraw.Draw(im)
            for b in d.get('blank', []):
                dr.rectangle([v * k for v in b], fill='white')
            for lab in d['labels']:
                x0, y0, x1, y1 = [v * k for v in lab['box']]
                pad = 2 * k
                dr.rectangle([x0 - pad, y0 - pad, x1 + pad, y1 + pad], fill='white')
                r = 9 * k
                cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
                dr.ellipse([cx - r, cy - r, cx + r, cy + r], fill='#16213a', outline='white', width=round(k))
                f = ImageFont.truetype(FONT, round(11 * k))
                dr.text((cx, cy), str(lab['n']), fill='white', font=f, anchor='mm')
            c = [round(v * k) for v in d['crop']]
            im = im.crop(c)
            w = d.get('width', 1200)
            if im.width > w:
                im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
            dest = os.path.join(a.out, d['out'])
            im.save(dest, optimize=True)
            print('%s  (%dx%d, %d KB)' % (dest, im.width, im.height, os.path.getsize(dest) // 1024))


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest='cmd', required=True)
    c = sub.add_parser('cards')
    c.add_argument('pdf'); c.add_argument('--out', required=True); c.add_argument('--name', default='station')
    c.add_argument('--pages'); c.add_argument('--width', type=int, default=1600)
    n = sub.add_parser('numbered')
    n.add_argument('pdf'); n.add_argument('--out', required=True); n.add_argument('--spec', required=True)
    a = ap.parse_args()
    {'cards': cards, 'numbered': numbered}[a.cmd](a)


if __name__ == '__main__':
    sys.exit(main())
