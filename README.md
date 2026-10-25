# Explore assignments

Interactive, self-checking assignments for the teacher's Biology, Anatomy & Physiology, and Marine Science classes.
Each one is a page on Vercel with the video and short clips, auto-checked practice, written responses, read-aloud
(Listen) buttons, captions, and a PDF printout students upload to Canvas.

## Assignments

| Assignment | Folder |
| --- | --- |
| Explore - The Cardiovascular System (Anatomy and Physiology B) | `assignments/explore-circulatory-system/` |
| Explore - Species Classification (Marine Science A) | `assignments/explore-species-classification/` |
| Test - Unit 4 Transport (Anatomy & Physiology), game board | `assignments/test-unit-4-transport/` |
| Practice - The Cardiovascular System (Anatomy & Physiology B) | `assignments/practice-the-cardiovascular-system/` |

The home page (`index.html`) lists every assignment. Students get the direct link, for example
`https://YOUR-PROJECT.vercel.app/assignments/explore-species-classification/`.

## Make a new assignment (with Claude Code)

Open this folder in Claude Code and say something like:

> Build a new assignment called "Explore - Cell Membrane" for Biology A from `~/Videos/cell-membrane.mp4`
> (captions are in `~/Videos/cell-membrane.srt`). Here are my questions: ...

Claude Code reads `CLAUDE.md`, which has the whole recipe and your house rules, and it will:
cut the video into clips, write the assignment, check it, show it to you, and push it.
You can paste questions, describe interactive ideas, or ask for changes after you see it.

## How it is organized

```
index.html                  home page (lists assignments)
engine/                     shared code: page, progress bars, PDF, Listen buttons, captions
assignments/
  <slug>/assignment.js      everything one assignment says (video, parts, questions)
  <slug>/index.html         tiny page that loads the engine and assignment.js
  <slug>/media/             encoded video, clips, and caption (.vtt) files
  <slug>/source/            original uploads (not saved to GitHub)
  _template/                starting point for new assignments
tools/
  new_assignment.py         create a new assignment folder
  video_tools.py            read a video's captions and cut clips (needs ffmpeg)
  station_images.py         turn a PDF of station cards into images and numbered diagrams
  validate.js               check an assignment for mistakes (needs Node)
  build_index.py            refresh the home page list
docs/ASSIGNMENT_FORMAT.md   every field in assignment.js
CLAUDE.md                   instructions and house rules for Claude Code
```

## Put it online

1. Create a GitHub repository and push this folder to it.
2. In Vercel choose **Add New > Project**, import the repository, set **Framework Preset** to **Other**, leave Build
   Command and Output Directory empty, and click **Deploy**.
3. Every push to the main branch redeploys.

## Preview on your computer

```
python3 -m http.server 8000
```

then open `http://localhost:8000/`. (Captions only load when the page is served this way.)

## Tools you need on your computer

- Python 3 and ffmpeg (for cutting video). On a Mac: `brew install ffmpeg`.
- Node (only for `tools/validate.js`).

## Notes

- Student progress is saved in the student's own browser, so it does not follow them to another device. The page
  has a backup code and the PDF for that reason.
- The page loads the PDF library (cdnjs) and fonts (Google Fonts) from the internet. If the fonts are blocked it
  still works with a plain font.
- The engine is shared. Changing `engine/` changes every assignment.
