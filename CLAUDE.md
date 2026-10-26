# Explore assignments: how to build a new one

This repo makes interactive, self-checking assignments for a California virtual high school life-science
teacher (Biology, Anatomy & Physiology, Marine Science). Students work alone, on their own schedule, and turn
in work through Canvas. Each assignment is a web page on Vercel. At the end the student downloads a PDF
printout and uploads it to Canvas, where the teacher grades it.

Every assignment looks and works the same way. **All the shared behavior is in `engine/`. All the content of one
assignment is in `assignments/<slug>/assignment.js`.** Building a new assignment means writing a new
`assignment.js` and preparing the video. Do not copy or fork the engine.

## What the teacher gives you

A video (and ideally its captions as an .srt or .vtt), the questions or ideas she wants students to do, the
course label (for example "Marine Science A"), and a title. Sometimes there is no video, only printed classroom material
(for example station cards). Then each station becomes a part with its card image; see "No video" in
`docs/ASSIGNMENT_FORMAT.md` and `tools/station_images.py`. If something that changes the build is missing, ask
one short question. If she is not there to answer, make the most reasonable choice and say which one you made.

## Steps

1. **Scaffold:** `python3 tools/new_assignment.py SLUG "Explore - Title" "Course"`. Put the original video in
   `assignments/SLUG/source/` (that folder is not saved to GitHub).
2. **Read the video:** `python3 tools/video_tools.py transcript VIDEO [--captions FILE]` prints the numbered
   captions with times. If there are no captions, ask the teacher for a caption file. Do not guess what the video says.
3. **Decide the parts.** A part is one idea students practice, with its own short clip, a short reading, and
   questions. Aim for 4 to 6 parts. The first part is usually vocabulary. The last part can apply the ideas to
   something new (a table, a scenario) with no clip.
4. **Cut the clips:**
   `python3 tools/video_tools.py cut VIDEO --out assignments/SLUG/media --main NAME --clip part1=0:53-2:07 ...`
   Cut points snap to the pauses between caption lines, so no sentence is chopped. The tool re-encodes the full
   video, makes every clip, writes a `.vtt` caption file for each, and prints lines to paste into `assignment.js`.
5. **Write `assignment.js`.** Start from the scaffold and the full guide in `docs/ASSIGNMENT_FORMAT.md`.
6. **Check it:** `node tools/validate.js SLUG`, then preview with `python3 -m http.server 8000` and open
   `http://localhost:8000/assignments/SLUG/`. Click through every question, try wrong answers to read the tips,
   use "Check my ideas" on each written question, download the PDF, and watch a clip with captions on.
   (Captions need the page served over http. They do not load from a double-clicked file.)
7. **Publish:** run `python3 tools/build_index.py` (the scaffold already does), commit, and push to the main
   branch. Vercel redeploys on its own. The student link is `https://PROJECT.vercel.app/assignments/SLUG/`.

## Game boards (tests and reviews)

If the teacher gives a test or a set of questions and wants a Jeopardy-style board, use `board` instead of video and
parts (see "Game board assignments" in `docs/ASSIGNMENT_FORMAT.md`, and `assignments/test-unit-4-transport/` as the
example). Sort the questions into 5 to 7 categories of equal size, easier questions in the lower rows. Crop any
diagrams from the test into `media/` and give them alt text that does not give the answer. Keep the test PDF and key in
`source/`. Note that answers are in `assignment.js`, which anyone can read in the browser.

## Hands-on labs (students add photos)

For a lab students do at home, such as a dissection, end each step with a `photo` question so students add a picture
of their own work (see "photo" in `docs/ASSIGNMENT_FORMAT.md`, and `assignments/heart-dissection/` as the
example). Put the lab handout's steps for each part in its reading box so students can follow along.
Start the lab with a setup and safety part that has `gate: true` (the rest stays hidden until it is done), an `agree`
lab agreement, and a ready-to-go selfie `photo`.

## House rules (the teacher decided these; keep them)

**Page**
- Title format: "Explore - Topic Name" with a dash and capitalized words. The course label sits under the title.
  Exception: hands-on labs have no "Explore - " (for example "Heart Dissection", "Sheep Brain Dissection",
  "Lung Capacity Lab").
- Students enter first and last name at the top. The yellow "Stay on this page until you finish" box, the sticky
  progress bars (one per part), the backup code, the Canvas text-entry fallback, and the PDF printout at the bottom
  are part of the engine. Keep them.
- Each part starts with a thick colored line and a banner title so students can see they are moving to a new section.
- Parts open one at a time. When a part is finished, the student closes it with a button, it folds down, confetti
  plays, and the next part opens. The Finish and submit section shows only after the last part is closed. This is built into the engine (see "One part at a time" in `docs/ASSIGNMENT_FORMAT.md`).
- No "watch for" timestamp boxes. Each clip is titled "Rewatch just this part", with its times in the full video.
- The full video goes at the top. Do not add the old "Remember, Eagles!" line; the teacher removed it.

**Videos**
- One main video at the top, and one or two short clips per part, cut from it. Students should not have to hunt
  through the full video to answer a question.
- Captions are on by default for every player. The teacher cares about accessibility.
- Never describe what a video says unless you have its captions or transcript.

**Questions**
- Every question must be answerable from the video clips and the reading in its own part.
- Mix auto-checked questions (drop-downs, multiple choice, typed answers, a memory-trick sentence) with a small
  number of written responses the teacher grades. Usually 2 written questions per assignment.
- **Wrong answers get a tip, never the answer.** A tip points to where to look or what to think about. The full
  explanation appears only after a right answer. `node tools/validate.js` warns when a tip contains the answer.
- **Every written question has a "Check my ideas" list** of 3 to 5 key ideas. Each is a short pattern match that
  lights up when the student mentions the idea, plus a tip when they have not. It is not a grade and never shows
  the answer. Add a "wrote at least 2 sentences" idea, and for highlight questions a "used transition words" idea and a "highlighted transition words" idea.
  Write the patterns generously (include word forms and plain-language ways to say the idea).
- Highlight questions tell students to provide evidence in their response, along with transition words that bring
  attention to that evidence. Once they finish, they go back and highlight those transition words in yellow to show
  where their evidence is. The teacher wants this on the main written prompt that asks for evidence from the video.
- Write scientific names between asterisks (`*Homo sapiens*`) so they show in italics everywhere, including the PDF.
- Use the words the video uses (for example "single-celled" if the video says that), so students can match the
  question to what they heard.
- Plain, friendly language at a high-school reading level. Short sentences.

**Accessibility**
- Every question, reading, and the warning box has a Listen button (read aloud). The page picks the most natural
  female American English voice on the student’s device (never a British one). There is no voice menu; students can
  change only the speed. This is built into the engine.
- Do not remove or restyle these controls.

## Things to leave alone

- `engine/` is shared by every assignment. Changing it changes all of them. Only edit it when the teacher asks for
  a new feature or a fix, then re-test an existing assignment (open it, answer every question, download the PDF).
- Give every assignment its own `storageKey`. Student progress is saved in the browser under that key. If you change
  the questions of an assignment students may already have started, change the key (for example `-v2`) so old saved
  progress does not clash with the new questions.
- Question numbers are assigned automatically in the order the questions appear.
- Only one memory-trick (`mnemonic`) question is allowed per assignment.
- Keep original uploads in `source/` (not saved to GitHub). GitHub rejects files over 100 MB.
- The page loads the PDF library from cdnjs and fonts from Google Fonts. Do not add other outside libraries.
