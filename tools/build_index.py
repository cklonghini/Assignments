#!/usr/bin/env python3
"""Rebuild the home page (index.html) so it lists every assignment in assignments/, and write vercel.json with a
short link for each one (for example /cell-signaling goes to /assignments/explore-cell-signaling/). Run it after
adding an assignment. The home page groups assignments by subject (the course label without its A/B semester). The short name is the folder name without "explore-", or `short: 'name'` in assignment.js.
A standalone page (an index.html with no assignment.js and no engine) is listed when its <head> has
<meta name="assignment-title" content="..."> and <meta name="assignment-course" content="...">
(and optionally assignment-short). Folders without these, such as redirect pages, are skipped."""
import html, json, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def field(text, name):
    m = re.search(r'^\s*' + name + r"\s*:\s*(['\"])(.*?)(?<!\\)\1", text, re.M)
    return m.group(2).replace("\\'", "'") if m else ''


def meta(text, name):
    m = re.search(r'<meta\s+name="' + name + r'"\s+content="([^"]*)"', text)
    return html.unescape(m.group(1)) if m else ''


SUBJECTS = ['Biology', 'Anatomy & Physiology', 'Marine Science']


def subject(course):
    """'Anatomy and Physiology B' -> ('Anatomy & Physiology', 'B'). A label with no A/B gets semester ''."""
    c = re.sub(r'\s+and\s+', ' & ', course.strip())
    m = re.match(r'^(.*?)\s+([AB])$', c)
    return (m.group(1), m.group(2)) if m else (c or 'Other', '')


def main():
    base = os.path.join(ROOT, 'assignments')
    items = []
    for d in sorted(os.listdir(base)):
        p = os.path.join(base, d, 'assignment.js')
        page = os.path.join(base, d, 'index.html')
        if d.startswith('_'):
            continue
        if os.path.isfile(p):
            t = open(p, encoding='utf-8').read()
            short = field(t, 'short') or re.sub(r'^explore-', '', d)
            items.append((d, field(t, 'title') or d, field(t, 'course'), short))
        elif os.path.isfile(page):
            t = open(page, encoding='utf-8').read()
            if meta(t, 'assignment-title'):
                short = meta(t, 'assignment-short') or re.sub(r'^explore-', '', d)
                items.append((d, meta(t, 'assignment-title'), meta(t, 'assignment-course'), short))
    seen = {}
    for d, t, c, short in items:
        if short in seen:
            raise SystemExit('Short link /%s is used by both %s and %s. Give one of them its own short: name.' % (short, seen[short], d))
        if short in ('assignments', 'engine', 'docs', 'tools', 'index.html'):
            raise SystemExit('Short link /%s for %s clashes with a folder of the site. Give it its own short: name.' % (short, d))
        seen[short] = d
    redirects = []
    for d, t, c, short in items:
        for name in dict.fromkeys([short, d]):
            for src in ('/' + name, '/' + name + '/'):
                redirects.append({'source': src, 'destination': '/assignments/%s/' % d, 'permanent': False})
    open(os.path.join(ROOT, 'vercel.json'), 'w', encoding='utf-8').write(json.dumps({'redirects': redirects}, indent=2) + '\n')
    # ---- the home page: one section per class (Biology A, Biology B, ...), grouped by kind of assignment ----
    def kind(d, t):
        tl = t.lower()
        if d.startswith('cer-') or 'research and report' in tl: return 'Research and Report'
        if tl.startswith('explore') or d.startswith('explore-'): return 'Explore'
        if tl.startswith('practice'): return 'Practice'
        if tl.startswith('test') or 'review' in tl: return 'Tests and reviews'
        if 'mastery' in tl: return 'Mastery checks'
        if d.startswith('welcome') or 'welcome' in tl: return 'Getting started'
        return 'Labs'
    KINDS = ['Research and Report', 'Explore', 'Practice', 'Labs', 'Tests and reviews', 'Mastery checks', 'Getting started']
    CLASSES = ['Biology A', 'Biology B', 'Marine Science A', 'Marine Science B', 'Anatomy & Physiology A', 'Anatomy & Physiology B']
    def klass(c):
        subj, sem = subject(c)
        if re.match(r'^all\b', c.strip(), re.I): return 'Every class'
        name = (subj + ' ' + sem).strip()
        return name if sem else 'Not sorted yet'
    def natkey(t):  # "LP10" after "LP9"
        return [int(x) if x.isdigit() else x for x in re.split(r'(\d+)', t.lower())]
    cls = {}
    for d, t, c, sh in items:
        path = os.path.join(base, d, 'assignment.js')
        src = open(path, encoding='utf-8').read() if os.path.isfile(path) else ''
        sup = bool(src) and not re.search(r'^  support\s*:\s*false', src, re.M)  # the assignment's own setting (2 spaces in), not a question's
        cls.setdefault(klass(c), []).append((KINDS.index(kind(d, t)), natkey(t), d, t, c, sh, kind(d, t), sup))
    order = [k for k in CLASSES if k in cls] + (['Every class'] if 'Every class' in cls else []) \
        + sorted(k for k in cls if k not in CLASSES + ['Every class', 'Not sorted yet']) + (['Not sorted yet'] if 'Not sorted yet' in cls else [])
    slug = lambda g: re.sub(r'[^a-z0-9]+', '-', g.lower()).strip('-')
    esc = lambda x: html.escape(x, quote=True)
    pills = '\n'.join('      <button type="button" class="pill" data-class="%s" aria-pressed="false">%s <span>%d</span></button>' % (esc(slug(g)), esc(g), len(cls[g])) for g in order)
    kinds_used = [k for k in KINDS if any(x[6] == k for g in cls.values() for x in g)]
    kchips = '\n'.join('      <button type="button" class="chip" data-kind="%s" aria-pressed="false">%s</button>' % (esc(slug(k)), esc(k)) for k in kinds_used)
    secs = []
    for g in order:
        rows, last = [], None
        for ki, _, d, t, c, sh, k, sup in sorted(cls[g]):
            if k != last:
                if last is not None: rows.append('        </ul>')
                rows.append('        <h3 data-kind="%s">%s</h3>\n        <ul>' % (esc(slug(k)), esc(k)))
                last = k
            links = '<button type="button" class="copy" data-short="%s">Copy student link</button>' % esc(sh) \
                + '<a class="sm" href="assignments/%s/?teacher=tm7k2q">Teacher view</a>' % esc(d) \
                + ('<a class="sm" href="assignments/%s/?support=eagle">Supported version</a>' % esc(d) if sup else '')
            rows.append('          <li data-kind="%s"><div class="t"><a href="assignments/%s/">%s</a><span class="sl">/%s</span></div><div class="act">%s</div></li>'
                        % (esc(slug(k)), esc(d), esc(t), esc(sh), links))
        rows.append('        </ul>')
        note = '<p class="note">These have no A or B in their course label. Tell Claude which class each one belongs to.</p>' if g == 'Not sorted yet' else ''
        secs.append('    <section id="%s" data-class="%s">\n      <h2>%s <span>%d</span></h2>\n      %s\n%s\n    </section>'
                    % (esc(slug(g)), esc(slug(g)), esc(g), len(cls[g]), note, '\n'.join(rows)))
    page = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Assignments</title>
<link rel="icon" type="image/png" href="engine/brand/favicon.png">
<style>
  :root{--bg:#f7f4ee;--card:#fff;--ink:#2d2926;--muted:#5f5850;--line:#e0d8ca;--gold:#c1a01e;--gold-ink:#7f6810}
  @media (prefers-color-scheme:dark){:root{--bg:#161412;--card:#23201d;--ink:#f3eee6;--muted:#b8ae9f;--line:#3d3833;--gold-ink:#dcbc3c}}
  *{box-sizing:border-box}
  body{margin:0;font-family:system-ui,-apple-system,"Segoe UI",sans-serif;background:var(--bg);color:var(--ink)}
  main{max-width:860px;margin:0 auto;padding:32px 16px 60px}
  .brand{margin:0 0 18px;padding-bottom:14px;border-bottom:3px solid var(--gold)}
  .brand img{width:min(240px,70%%);height:auto}
  h1{margin:0 0 4px}
  .lead{color:var(--muted);margin:0 0 18px}
  .tools{position:sticky;top:0;z-index:5;background:var(--bg);padding:10px 0 8px;border-bottom:1px solid var(--line)}
  .row{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 8px}
  .lab{font-size:.8rem;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;margin:2px 0 4px}
  button{font:inherit;cursor:pointer}
  .pill,.chip{background:var(--card);color:var(--ink);border:1px solid var(--line);border-radius:999px;padding:6px 14px;font-weight:600}
  .pill span{color:var(--muted);font-weight:400;margin-left:2px}
  .chip{padding:4px 12px;font-size:.9rem}
  .pill[aria-pressed="true"],.chip[aria-pressed="true"]{background:var(--ink);color:var(--bg);border-color:var(--ink)}
  .pill[aria-pressed="true"] span{color:inherit}
  input{width:100%%;font:inherit;padding:10px 12px;border:1px solid #c9bfae;border-radius:8px;background:var(--card);color:var(--ink)}
  h2{margin:30px 0 4px;padding-bottom:6px;border-bottom:3px solid var(--gold);font-size:1.35rem;display:flex;align-items:baseline;gap:8px}
  h2 span{font-size:.9rem;font-weight:500;color:var(--muted)}
  h3{margin:16px 0 8px;font-size:.85rem;text-transform:uppercase;letter-spacing:.08em;color:var(--gold-ink)}
  .note{color:var(--muted);margin:6px 0 0}
  section[hidden],li[hidden],h3[hidden],ul[hidden]{display:none}
  ul{list-style:none;margin:0;padding:0;display:grid;gap:8px}
  li{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:12px 14px;display:flex;justify-content:space-between;align-items:center;gap:8px 14px;flex-wrap:wrap}
  .t a{color:var(--ink);font-weight:700;text-decoration:none}
  .t a:hover,.t a:focus{text-decoration:underline}
  .sl{display:block;font-size:.85rem;color:var(--muted)}
  .act{display:flex;flex-wrap:wrap;gap:6px 12px;align-items:center}
  .copy{background:var(--ink);color:var(--bg);border:0;border-radius:8px;padding:6px 12px;font-weight:700;font-size:.85rem}
  .copy.done{background:#17703f;color:#fff}
  .sm{font-size:.85rem;color:var(--muted)}
  #none{color:var(--muted)}
  @media (max-width:700px){.tools{position:static}.row{flex-wrap:nowrap;overflow-x:auto;padding-bottom:4px;-webkit-overflow-scrolling:touch}.pill,.chip{flex:none}}
</style>
</head>
<body>
  <main>
    <div class="brand"><img src="engine/brand/logo.png" alt="Elite Academic Academy"></div>
    <h1>Assignments</h1>
    <p class="lead">This list is for the teacher. Choose a class, or search. “Copy student link” copies the short link to give students.</p>
    <div class="tools">
      <p class="lab">Class</p>
      <div class="row" role="group" aria-label="Show one class">
      <button type="button" class="pill" data-class="" aria-pressed="true">All classes</button>
%s
      </div>
      <p class="lab">Type</p>
      <div class="row" role="group" aria-label="Show one type of assignment">
      <button type="button" class="chip" data-kind="" aria-pressed="true">All types</button>
%s
      </div>
      <input type="search" id="find" placeholder="Search assignments" aria-label="Search assignments">
    </div>
%s
    <p id="none" hidden>No assignments match. Try another class, type, or search.</p>
  </main>
  <script>
    var box = document.getElementById('find'), cur = {cls: '', kind: ''};
    try { var saved = JSON.parse(localStorage.getItem('eaa-index') || '{}'); cur.cls = saved.cls || ''; cur.kind = saved.kind || ''; } catch (e) {}
    function apply(){
      var q = box.value.trim().toLowerCase(), any = false;
      document.querySelectorAll('.pill').forEach(function(b){ b.setAttribute('aria-pressed', b.dataset.class === cur.cls ? 'true' : 'false'); });
      document.querySelectorAll('.chip').forEach(function(b){ b.setAttribute('aria-pressed', b.dataset.kind === cur.kind ? 'true' : 'false'); });
      document.querySelectorAll('main section').forEach(function(sec){
        var shown = 0, on = !cur.cls || sec.dataset.class === cur.cls;
        sec.querySelectorAll('ul').forEach(function(ul){
          var n = 0;
          ul.querySelectorAll('li').forEach(function(li){
            var hit = on && (!cur.kind || li.dataset.kind === cur.kind) && (!q || li.textContent.toLowerCase().indexOf(q) > -1);
            li.hidden = !hit; if (hit) n++;
          });
          ul.hidden = !n; ul.previousElementSibling.hidden = !n; shown += n;
        });
        sec.hidden = !shown; if (shown) any = true;
      });
      document.getElementById('none').hidden = any;
      try { localStorage.setItem('eaa-index', JSON.stringify(cur)); } catch (e) {}
    }
    document.querySelectorAll('.pill').forEach(function(b){ b.addEventListener('click', function(){ cur.cls = b.dataset.class; apply(); }); });
    document.querySelectorAll('.chip').forEach(function(b){ b.addEventListener('click', function(){ cur.kind = b.dataset.kind; apply(); }); });
    box.addEventListener('input', apply);
    document.querySelectorAll('.copy').forEach(function(b){
      b.addEventListener('click', function(){
        var url = location.origin + '/' + b.dataset.short;
        function done(ok){ b.textContent = ok ? 'Copied!' : url; b.classList.toggle('done', ok); if (ok) setTimeout(function(){ b.textContent = 'Copy student link'; b.classList.remove('done'); }, 2000); }
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(function(){ done(true); }, function(){ done(false); });
        else done(false);
      });
    });
    apply();
  </script>
</body>
</html>
""" % (pills, kchips, '\n'.join(secs))
    open(os.path.join(ROOT, 'index.html'), 'w', encoding='utf-8').write(page)
    print('index.html lists %d assignment(s)' % len(items))


if __name__ == '__main__':
    main()
