# assignment.js reference

`assignments/<slug>/assignment.js` sets one global, `window.ASSIGNMENT`. This page lists every field.
Run `node tools/validate.js <slug>` to check your work.

Text rules: `*words*` shows in italics (use it for scientific names). `read` boxes and `tableHtml` take HTML.
All other text is plain text. Use real curly quotes if you like; the file is saved as UTF-8.

## Top level

| Field | Required | What it does |
| --- | --- | --- |
| `title` | yes | Page title and PDF title, for example `'Explore - Cell Membrane'` |
| `course` | yes | Shown under the title and on the PDF, for example `'Biology A'` |
| `storageKey` | yes | Unique key for saved progress. Change it (`-v2`) if you change the questions after students started |
| `icon` | no | Inline SVG for the header. Leave out for a play-button icon. May use `var(--primary)`, `var(--receptor)`, `var(--ligand)`, `var(--ink)` |
| `video` | usually | The full video (below). Leave it out for an assignment with no video, such as station cards |
| `start` | no | Only when there is no video: the box at the top of the page (below) |
| `partWord` | no | The word before each part number, for example `'Station'` so headings read "Station 1: Overview". Default `'Part'` |
| `clips` | no | The short clips (below) |
| `parts` | yes | The parts, in order (below) |

## video

```js
video: {
  title: 'Taxonomy',                 // "Please watch the video Taxonomy..."
  src: 'media/taxonomy-video.mp4',   // captions come from media/taxonomy-video.vtt
  seconds: 324,                      // length, rounded up
  heading: 'Watch the video',        // optional
  intro: '...',                      // optional: replaces the default "Please watch the video..." sentence
  after: '...'                       // optional: replaces the default "Work from top to bottom..." paragraph
}
```

## No video: start and images

An assignment can work from pictures instead of a video, for example classroom station cards turned into a
virtual activity (see `assignments/practice-the-cardiovascular-system`). Leave out `video` and `clips`, and give
each part `images` (or, for a lab with no pictures, just the `start` box and readings, as in `assignments/explore-lung-capacity-lab`). The top of the page then shows the `start` box instead of a video:

```js
start: {
  heading: 'Discovery stations',     // optional, default "How this assignment works"
  intro: '...',                      // optional: the first paragraph
  after: '...'                       // optional: the second paragraph
}
```

Make the images with `tools/station_images.py`: `cards` saves every page of a PDF as a JPEG, and `numbered`
covers chosen labels on a diagram with numbered circles for "label the diagram" questions (see the notes at the
top of the script).

## clips

`tools/video_tools.py cut` prints these lines. Add a `title` to each. `from` and `to` are the times in the full
video and are shown to students. `seconds` is the clip length, rounded up.

```js
clips: {
  changes: { src: 'media/clip-changes.mp4', from: 52.8, to: 127.3, seconds: 75, title: 'Linnaeus, shared traits, and DNA evidence' }
}
```

A clip can also come from a second video. Add `of` with that video's title, and `from`/`to` are then times in that
video. Students see "Watch this clip: TITLE (0:00 to 3:27 of the video “OF”)" in place of "Rewatch just this part".

```js
  bloodtypes: { src: 'media/clip-bloodtypes.mp4', from: 0, to: 206.6, seconds: 207, title: 'Blood types and donating blood',
                of: 'Multiple Alleles, ABO Blood Types, and Punnett Squares' }
```

## parts

```js
{
  title: 'Domains and kingdoms',
  intro: 'Optional plain-text paragraph at the top of the part.',
  clips: ['domains', 'kingdoms'],           // clip names, shown in this order
  images: [ { src: 'media/station-card-1.jpg', alt: '...', caption: 'Station 1 card.', text: '<p>...</p>' } ],
  read: '<p><b>Read:</b> ...</p>',          // optional green reading box (HTML)
  tableHtml: '<table>...</table>',          // optional table shown after the reading (HTML)
  questions: [ ... ]
}
```

Order on the page: `intro`, clips, images, `read`, `tableHtml`, questions.

`images` (optional): pictures such as station cards. Selecting one opens it full size in a new tab. `alt` is
required for screen readers. `text` (HTML) is the words on the picture: students can open it as text, and a
Listen button under the picture reads it aloud. Give `text` to any picture that has words students need.

Any question can also show a picture with `img` (see below), for example a numbered diagram to label.

## Question types

Every question has `type` and `text`. Numbers are added automatically.

### selects: one or more drop-down menus (auto-checked, one point each)

```js
{ type: 'selects', text: 'Match each description to the correct word.',
  options: ['Autotroph', 'Heterotroph'],          // used by every item unless the item has its own options
  hint: 'Shared tip',                              // used by every item unless the item has its own hint
  note: 'Spot 1 is the broadest',                  // optional line above the menus (HTML)
  sci: true,                                       // optional: show menu text in italics
  items: [ { label: 'Makes its own food', answer: 'Autotroph', hint: 'Think about photosynthesis.' } ] }
```

Use `items` with different `options` for paired menus such as domain and kingdom. Each item is auto-checked on its own.

### choice: multiple choice (auto-checked)

```js
{ type: 'choice', text: 'Which two organisms are in the same family?',
  options: ['A', 'B', 'C'], answer: 1,             // answer is the position of the right option, starting at 0
  explain: 'Shown after a right answer.',
  tip: 'Shown after a wrong answer. Point, do not tell.' }
```

True/false is a choice question with two options.

### typed: the student types the exact answer and presses Check (auto-checked)

```js
{ type: 'typed', text: 'Fix this name: *enhydra Lutris*', expected: 'Enhydra lutris',
  tip: 'Shown after a wrong answer.',
  caseTip: 'Optional. Shown instead when only the capital letters are wrong.',
  aria: 'Corrected name' }
```

### mnemonic: write a sentence whose words start with given letters (auto-checked)

```js
{ type: 'mnemonic', text: 'Make your own memory trick...', words: ['Domain', 'Kingdom', 'Phylum'] }
```

Each box is labeled with the word and must start with its first letter. One per assignment.

### multi: choose every correct answer (check boxes, auto-checked)

```js
{ type: 'multi', text: 'Priya is type B−. Which donor bags are safe for her?',
  options: ['O−', 'O+', 'A−', 'B−'], answers: ['O−', 'B−'],
  rules: [{ any: ['O+'], tip: 'Priya is Rh negative. Look at the + or − on each bag.' }],  // first rule whose
                                                       // "any" list matches a wrong pick gives its tip
  tip: 'Shown when no rule matches (usually: there are more right answers).',
  explain: 'Shown after a right answer.' }
```

### speak: say it out loud (auto-checked, one point per card)

Students press **Say it** and say the word and its definition. In Chrome, Edge, and Safari the card listens for the
word (`say`) and every pattern in `keys`. It turns green when it hears them all. In Firefox it can only check that the
student spoke out loud for 3 seconds, and the PDF says so. `not` is an optional pattern that must *not* be heard
(for example `/\baway\b/` on Vein). Patterns are tested on lowercase words with punctuation removed. Write them
generously, because speech-to-text spells things in odd ways (`/\bvein|vain|vane\b/`).

```js
{ type: 'speak', text: 'Round 1: Read each card out loud.',
  memory: false,                     // true hides the definition (a Peek button shows it, and the PDF records peeks)
  cards: [ { term: 'Artery', def: 'A blood vessel that carries blood away from the heart.',
             say: /\barter(y|ies)\b/, keys: [/\baway\b/, /\bheart\b/] } ] }
```

If a student's microphone is blocked or missing, the card shows `micHelp` (a top-level field; leave it out for the
default message telling students to contact IT). `node tools/validate.js` warns when a card's patterns do not match
its own word and definition.

### label: label a diagram (auto-checked, one point per box)

Numbered markers sit on a picture, and students drag (or tap) labels into the matching numbered boxes. Wrong labels go
back to the bank with that box's tip. `viewBox` is the drawing area in the picture's own pixels, and it can be wider
than the picture to leave room for markers at the sides. `to` draws pointer lines from a marker to the exact spot.

```js
{ type: 'label', text: 'Label the heart...',
  viewBox: '-150 0 1092 1006', image: { src: 'media/heart-diagram.webp', width: 792, height: 1006 },
  alt: 'Cutaway drawing of the heart with 13 numbered parts',
  legend: 'optional HTML under the picture', credit: 'Heart illustration: Shutterstock',
  spots: [ { x: 185, y: 500, label: 'Right atrium', tip: 'Point, do not tell.' },
           { x: -85, y: 720, label: 'Tricuspid valve', tip: '...', to: [[205, 692]] } ],
  explain: 'Shown when every label is right.' }
```

### order: put steps in order (auto-checked)

Students drag the steps (or use the arrow buttons). After a wrong try the steps in the right spot turn green.

```js
{ type: 'order', text: 'Put the stops in order.', items: ['First', 'Second', 'Third'],   // the correct order
  tip: 'Shown after a wrong try.', explain: 'Shown after a right answer.' }
```

### bloodlab: blood typing lab (auto-checked, one point per patient)

Students add anti-A, anti-B, and anti-Rh serum to each patient's blood, read the clumping, and choose the type.
Write types with the real minus sign: `'O−'`, not `'O-'`.

```js
{ type: 'bloodlab', text: 'Test each patient’s blood...',
  patients: [ { name: 'Patient 1: Marcus', who: 'Age 17. Broke his leg playing soccer.', type: 'A+' } ] }
```

### numbers: type one or more numbers (auto-checked, one point each)

Each box accepts any number inside `between` (low and high, inclusive). Commas and units are ignored, so
"3,300 cm3" counts as 3300. Use a range when students read a value off a graph or round.

```js
{ type: 'numbers', text: 'Find the average diameter for each volume.', unit: 'cm',     // unit shows after every box
  items: [ { label: 'Average tidal volume diameter', between: [9.95, 10.05], tip: 'Add the three trials, then divide by 3.' } ] }
```

A `typed` question can also use `between: [low, high]` instead of `expected`.

### readgraph: read values off a curve (auto-checked, one point per box)

A `numbers` question with a graph above it. A slider moves a dashed line from the x-axis up to the curve and across
to the y-axis. The value is not printed: students read it off the grid. Example: Figure 1 in
`assignments/explore-lung-capacity-lab`.

```js
{ type: 'readgraph', text: '...', unit: 'cm³',
  graph: { title: 'Figure 1: ...', alt: 'Description for screen readers',
           x: { min: 0, max: 25, step: 2, minor: 1, label: 'Balloon diameter (cm)', unit: 'cm' },
           y: { min: 0, max: 8000, step: 1000, minor: 250, label: 'Lung volume (cm³)' },
           fn: function (d) { return Math.PI * d * d * d / 6; },   // the curve
           to: 24.8, start: 5, sliderLabel: 'Balloon diameter: ' },
  items: [ { label: 'Tidal volume', between: [400, 650], tip: '...' } ] }
```

### graph: build a graph from a data table (auto-checked, five points)

The student chooses a factor, then works through five checked steps: the kind of graph (bar graph or scatter plot),
the x-axis label, the y-axis label (both from the `labels` menu, so "Height" without units gets a tip), a title (it
must match the factor's `title` pattern and `y.title`), and the data. On a bar graph each bar is a group's average
(within `barTol`); students type the heights or select inside the graph. On a scatter plot each row gets one dot
(x within the factor's `tol`, y within `y.tol`); students select the graph to add or remove a dot, or type the numbers.
The graph redraws as they work. When it is right, the graphs of the other factors appear, the way lab partners each
graph a different factor. The PDF shows every step and a picture of the student's graph.

```js
{ type: 'graph', text: 'Build your graph...',
  graph: {
    rows: [ { sex: 'Female', height: 61, vc: 2700 }, ... ],
    y: { key: 'vc', name: 'Vital capacity', label: 'Vital capacity (cm³)', unit: 'cm³', min: 0, max: 6000, step: 1000,
         minor: 250, snap: 50, tol: 150, title: /vital capacity|lung capacity/ },
    labels: ['Sex', 'Height', 'Height (in)', 'Vital capacity', 'Vital capacity (cm³)'],   // the axis label menus
    barTol: 50,
    factors: [
      { key: 'sex', name: 'Sex', kind: 'bar', label: 'Sex', cats: ['Female', 'Male'], title: /sex|male|female/ },
      { key: 'height', name: 'Height', kind: 'scatter', label: 'Height (in)', min: 56, max: 76, step: 2, minor: 1,
        snap: 1, tol: 0.5, title: /height|tall/ } ] },
  barTip: 'Shown after a wrong bar graph.', dotTip: 'Shown after a wrong scatter plot.', explain: 'Shown when it is right.' }
```

### written: a short written response the teacher grades

```js
{ type: 'written', text: 'Explain... (2 to 4 sentences)', min: 40, placeholder: 'optional',
  ideas: [ ...ideas ] }
```

### highlight: a written response where students point to their evidence with transition words and highlight those words in yellow

Same fields as `written` (`text`, `min`, `ideas`). The engine adds the instructions and the yellow highlight buttons.
For an assignment with no video, set `examples` to replace the example transition words (the default list includes
"According to the video").
The instructions tell students to provide evidence along with transition words that bring attention to it (for example
"According to the video," "This shows that"), then go back and highlight those transition words in yellow.
Give these questions a "used transition words" idea (a pattern for common evidence transitions) and a "highlighted" idea.
The highlighted words are marked with `[[double brackets]]` in the Canvas text-entry fallback and in yellow on the PDF.

### ideas (the "Check my ideas" list)

```js
{ done: 'You told how DNA evidence helps.',      // shown when the idea is found
  q: 'Did you say how DNA evidence helps?',      // shown when it is missing
  tip: 'The video says taxonomists combine physical traits with another kind of evidence.',
  re: /dna|genetic|genes?\b/ }                    // found when the student's answer matches (case ignored)
```

Instead of `re`, an idea can use `sentences: 2` (found when the answer has at least 2 sentences) or
`highlight: true` (found when the student highlighted something; highlight questions only).

## What the teacher sees

The PDF lists every answer, how much of each video was watched, auto-check results with wrong-try counts, and the
highlighted transition words. A small symbol next to "Results" shows time on task. The teacher grades the written responses.

## Game board assignments (Jeopardy style)

Use `board` instead of `video`, `clips`, and `parts` to make a game board. Students pick a tile, answer its
question in a pop-up window, and earn points. The name boxes, warning box, Listen buttons, backup code, Canvas
text fallback, and PDF all work the same. Example: `assignments/test-unit-4-transport/assignment.js`.

```js
board: {
  heading: 'Unit 4 Transport game board',   // optional
  intro: '...',                              // optional: replaces the automatic how-to-play paragraph
  tries: 3,                                  // tries on each answer that checks itself (default 3)
  credit: [1, 0.5, 0.25],                    // share of the points for a right answer on try 1, 2, 3
  values: [100, 200, 300, 400, 500],         // points for row 1, 2, 3...; a tile can set its own `points`
  categories: [
    { title: 'Blood Basics', tiles: [ question, question, ... ] }   // one column per category
  ],
  final: { title: 'Final round', points: 1000, ...question }        // optional; opens when every tile is finished
}
```

- Tiles are ordinary questions (`choice`, `selects`, `typed`, `written`, `highlight`). Give every category the same
  number of tiles so the board is a full rectangle.
- A right answer, or the last wrong try, locks the answer. Wrong answers say "Not quite" and how many tries are left.
  On a board `tip` and `explain` are optional; a tip, if given, is shown after a wrong try. The answer is never shown.
- For a `selects` tile each menu is checked and scored on its own; the tile earns the average.
- Written tiles are graded by the teacher and show their point value on the PDF.
- `ref: 12` (optional) is printed on the PDF as "test question 12" so the teacher can match the key.

## Extra question fields (any assignment)

- `img: { src: 'media/heart.png', alt: 'Description that does not give the answer', caption: 'optional' }` shows a
  picture under the question. `alt` is required.
- `typed` questions can use `accept: ['cellular respiration', 'cell respiration']` instead of `expected`. Capital
  letters and an end period are ignored.
- In question text, `_____` (3 or more underscores) is read aloud as "blank".
