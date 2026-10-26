#!/usr/bin/env python3
"""Rebuild the home page (index.html) so it lists every assignment in assignments/, and write vercel.json with a
short link for each one (for example /cell-signaling goes to /assignments/explore-cell-signaling/). Run it after
adding an assignment. The short name is the folder name without "explore-", or `short: 'name'` in assignment.js."""
import html, json, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def field(text, name):
    m = re.search(r'^\s*' + name + r"\s*:\s*(['\"])(.*?)(?<!\\)\1", text, re.M)
    return m.group(2).replace("\\'", "'") if m else ''


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
    rows = '\n'.join('      <li><a href="assignments/%s/">%s</a><span>%s</span><code>/%s</code></li>' % (d, html.escape(t), html.escape(c), html.escape(s)) for d, t, c, s in items)
    page = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Assignments</title>
<style>
  body{margin:0;font-family:system-ui,-apple-system,"Segoe UI",sans-serif;background:#f3f6fa;color:#16213a}
  main{max-width:720px;margin:0 auto;padding:40px 20px}
  h1{margin:0 0 6px}
  p{color:#52607a;margin:0 0 24px}
  ul{list-style:none;margin:0;padding:0;display:grid;gap:10px}
  li{background:#fff;border:1px solid #d3dbe8;border-radius:10px;padding:14px 16px;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}
  a{color:#0b5f7a;font-weight:700;text-decoration:none}
  a:hover,a:focus{text-decoration:underline}
  span{color:#52607a}
  code{flex-basis:100%%;color:#52607a;font-size:.9rem}
</style>
</head>
<body>
  <main>
    <h1>Assignments</h1>
    <p>This list is for the teacher. Give students the direct link to their assignment. Each one also has a short
      link: this site's address followed by the short name under it, for example <code style="display:inline">/cell-signaling</code>.</p>
    <ul>
%s
    </ul>
  </main>
</body>
</html>
""" % rows
    open(os.path.join(ROOT, 'index.html'), 'w', encoding='utf-8').write(page)
    print('index.html lists %d assignment(s)' % len(items))


if __name__ == '__main__':
    main()
