#!/usr/bin/env python3
"""Rebuild the home page (index.html) so it lists every assignment in assignments/, and write vercel.json with a
short link for each one (for example /cell-signaling goes to /assignments/explore-cell-signaling/). Run it after
adding an assignment. The home page groups assignments by subject (the course label without its A/B semester). The short name is the folder name without "explore-", or `short: 'name'` in assignment.js."""
import html, json, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def field(text, name):
    m = re.search(r'^\s*' + name + r"\s*:\s*(['\"])(.*?)(?<!\\)\1", text, re.M)
    return m.group(2).replace("\\'", "'") if m else ''


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
        if d.startswith('_') or not os.path.isfile(p):
            continue
        t = open(p, encoding='utf-8').read()
        short = field(t, 'short') or re.sub(r'^explore-', '', d)
        items.append((d, field(t, 'title') or d, field(t, 'course'), short))
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
    groups = {}
    for d, t, c, s in items:
        subj, sem = subject(c)
        groups.setdefault(subj, []).append((sem or 'Z', t.lower(), d, t, c, s))
    order = [g for g in SUBJECTS if g in groups] + sorted(g for g in groups if g not in SUBJECTS)
    slug = lambda g: re.sub(r'[^a-z0-9]+', '-', g.lower()).strip('-')
    nav = '\n'.join('      <a href="#%s">%s <span>(%d)</span></a>' % (slug(g), html.escape(g), len(groups[g])) for g in order)
    rows = '\n'.join(
        '    <section id="%s">\n      <h2>%s</h2>\n      <ul>\n%s\n      </ul>\n    </section>' % (slug(g), html.escape(g), '\n'.join(
            '        <li><a href="assignments/%s/">%s</a><span>%s</span></li>' % (d, html.escape(t), html.escape(c))
            for _, _, d, t, c, s in sorted(groups[g])))
        for g in order)
    page = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Assignments</title>
<link rel="icon" type="image/png" href="engine/brand/favicon.png">
<style>
  body{margin:0;font-family:system-ui,-apple-system,"Segoe UI",sans-serif;background:#f7f4ee;color:#2d2926}
  main{max-width:720px;margin:0 auto;padding:40px 20px}
  .brand{display:flex;align-items:center;gap:14px;margin:0 0 22px;padding-bottom:16px;border-bottom:3px solid #c1a01e}
  .brand img{width:min(260px,70%%);height:auto}
  h1{margin:0 0 6px}
  p{color:#5f5850;margin:0 0 24px}
  nav{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 16px}
  nav a{background:#fff;border:1px solid #e0d8ca;border-radius:999px;padding:6px 14px;font-weight:600}
  nav a span{color:#5f5850;font-weight:400}
  input{width:100%%;box-sizing:border-box;font:inherit;padding:10px 12px;border:1px solid #c9bfae;border-radius:8px;margin:0 0 8px}
  h2{margin:28px 0 10px;padding-bottom:6px;border-bottom:3px solid #c1a01e;font-size:1.3rem}
  section[hidden],li[hidden]{display:none}
  ul{list-style:none;margin:0;padding:0;display:grid;gap:10px}
  li{background:#fff;border:1px solid #e0d8ca;border-radius:10px;padding:14px 16px;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}
  a{color:#2d2926;font-weight:700;text-decoration:none}
  a:hover,a:focus{text-decoration:underline}
  span{color:#5f5850}
</style>
</head>
<body>
  <main>
    <div class="brand"><img src="engine/brand/logo.png" alt="Elite Academic Academy"></div>
    <h1>Assignments</h1>
    <p>This list is for the teacher. Give students the direct link to their assignment.</p>
    <nav aria-label="Jump to a subject">
%s
    </nav>
    <input type="search" id="find" placeholder="Search assignments" aria-label="Search assignments">
%s
    <p id="none" hidden>No assignments match that search.</p>
  </main>
  <script>
    var box = document.getElementById('find');
    box.addEventListener('input', function(){
      var q = box.value.trim().toLowerCase(), any = false;
      document.querySelectorAll('main section').forEach(function(sec){
        var shown = 0;
        sec.querySelectorAll('li').forEach(function(li){
          var hit = !q || li.textContent.toLowerCase().indexOf(q) > -1;
          li.hidden = !hit; if(hit) shown++;
        });
        sec.hidden = !shown; if(shown) any = true;
      });
      document.getElementById('none').hidden = any;
    });
  </script>
</body>
</html>
""" % (nav, rows)
    open(os.path.join(ROOT, 'index.html'), 'w', encoding='utf-8').write(page)
    print('index.html lists %d assignment(s)' % len(items))


if __name__ == '__main__':
    main()
