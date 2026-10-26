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
| `video` | no | The full video (below). Leave out for a reading-only assignment (for example a quiz turned into a page) |
| `start` | no | Only when there is no video: `{ heading, intro, after }` for the "Get started" box at the top. All three are optional |
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

## clips

`tools/video_tools.py cut` prints these lines. Add a `title` to each. `from` and `to` are the times in the full
video and are shown to students. `seconds` is the clip length, rounded up.

```js
clips: {
  changes: { src: 'media/clip-changes.mp4', from: 52.8, to: 127.3, seconds: 75, title: 'Linnaeus, shared traits, and DNA evidence' }
}
```

## parts

```js
{
  title: 'Domains and kingdoms',
  intro: 'Optional plain-text paragraph at the top of the part.',
  clips: ['domains', 'kingdoms'],           // clip names, shown in this order
  read: '<p><b>Read:</b> ...</p>',          // optional green reading box (HTML)
  tableHtml: '<table>...</table>',          // optional table shown after the reading (HTML)
  questions: [ ... ]
}
```

Order on the page: `intro`, clips, `read`, `tableHtml`, questions.

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

### label: drag labels onto a picture (auto-checked, one point per spot)

```js
{ type: 'label', text: 'Label the four chambers of the heart.',
  image: 'media/heart-labeling.png',               // the picture, with letters already drawn on it
  alt: 'Diagram of the heart with four lines labeled A, B, C and D',
  labels: ['Left atrium', 'Left ventricle', 'Right atrium', 'Right ventricle'],   // the word bank
  hint: 'Shared tip',                              // used by every spot unless the spot has its own hint
  spots: [ { name: 'A', x: 94.2, y: 40.9, answer: 'Left atrium', hint: 'Tip', ok: 'Shown after a right answer.' } ] }
```

`x` and `y` are the center of each letter on the picture, in percent of the picture's width and height. A round
button covers each letter. Students drag a label onto a letter (or onto its row beside the picture), or tap a label
and then tap a letter. Each spot is checked on its own and shows its tip when wrong. The PDF lists each letter's answer.

### mnemonic: write a sentence whose words start with given letters (auto-checked)

```js
{ type: 'mnemonic', text: 'Make your own memory trick...', words: ['Domain', 'Kingdom', 'Phylum'] }
```

Each box is labeled with the word and must start with its first letter. One per assignment.

### written: a short written response the teacher grades

```js
{ type: 'written', text: 'Explain... (2 to 4 sentences)', min: 40, placeholder: 'optional',
  ideas: [ ...ideas ] }
```

### highlight: a written response where students highlight evidence in yellow

Same fields as `written` (`text`, `min`, `ideas`). The engine adds the instructions and the yellow highlight buttons.
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
highlighted evidence. A small symbol next to "Results" shows time on task. The teacher grades the written responses.
