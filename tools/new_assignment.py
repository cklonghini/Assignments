#!/usr/bin/env python3
"""
Start a new assignment from the template.

  python3 tools/new_assignment.py SLUG "Title" "Course name"

Example:
  python3 tools/new_assignment.py explore-cell-membrane "Explore - Cell Membrane" "Biology A"

Makes assignments/SLUG with an assignment.js to fill in, a media/ folder, and a source/ folder for the
original video (source/ is not saved to GitHub). Then refreshes the home page list.
"""
import os, re, shutil, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def main():
    if len(sys.argv) != 4:
        sys.exit(__doc__)
    slug, title, course = sys.argv[1:]
    if not re.match(r'^[a-z0-9][a-z0-9-]*$', slug):
        sys.exit('The slug must be lowercase letters, numbers, and dashes, for example explore-cell-membrane')
    dest = os.path.join(ROOT, 'assignments', slug)
    if os.path.exists(dest):
        sys.exit('assignments/%s already exists' % slug)
    shutil.copytree(os.path.join(ROOT, 'assignments', '_template'), dest)
    os.makedirs(os.path.join(dest, 'source'), exist_ok=True)
    open(os.path.join(dest, 'source', 'PUT-ORIGINAL-VIDEO-HERE.txt'), 'w').write('Original uploads go here. This folder is not saved to GitHub.\n')
    p = os.path.join(dest, 'assignment.js')
    s = open(p, encoding='utf-8').read()
    s = s.replace('__TITLE__', title.replace("'", "\\'")).replace('__COURSE__', course.replace("'", "\\'")).replace('__KEY__', slug + '-v1')
    open(p, 'w', encoding='utf-8').write(s)
    subprocess.run([sys.executable, os.path.join(ROOT, 'tools', 'build_index.py')], check=True)
    print('Created assignments/%s' % slug)
    print('Next: put the video in assignments/%s/source/, then follow CLAUDE.md.' % slug)


if __name__ == '__main__':
    main()
