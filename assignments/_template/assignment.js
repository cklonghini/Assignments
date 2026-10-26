/*
  __TITLE__ (__COURSE__)
  Everything a student sees is written in this file. The shared engine in /engine builds the page,
  progress bars, PDF printout, Listen buttons, and captions from it.
  Write *scientific names* between asterisks to show them in italics. Reading boxes and tables use HTML.
  Full guide: docs/ASSIGNMENT_FORMAT.md
*/
window.ASSIGNMENT = {
  title: '__TITLE__',
  course: '__COURSE__',
  storageKey: '__KEY__',          // must be different for every assignment; change it if the questions change a lot

  video: {
    title: 'VIDEO NAME',
    src: 'media/video.mp4',       // captions are read from media/video.vtt
    seconds: 60                   // length of the video in seconds, rounded up
  },

  /* Clips are made with tools/video_tools.py, which prints these lines for you to paste. */
  clips: {
    // intro: { src: 'media/clip-intro.mp4', from: 0, to: 30, seconds: 31, title: 'What the clip is about' }
  },

  parts: [
    {
      title: 'Key vocabulary',
      clips: [],                  // clip names from above, shown at the top of the part
      read: '<p><b>Read:</b> A short reading that teaches what the questions need.</p>',
      questions: [
        {
          type: 'selects',        // a row of drop-down menus
          text: 'Match each description to the correct word.',
          options: ['Word A', 'Word B'],
          items: [
            { label: 'Description one', answer: 'Word A', hint: 'A tip that points the student the right way without giving the answer.' },
            { label: 'Description two', answer: 'Word B', hint: 'Another tip.' }
          ]
        }
      ]
    },
    {
      title: 'Check your understanding',
      questions: [
        {
          type: 'choice',         // multiple choice
          text: 'A multiple-choice question?',
          options: ['Option one', 'Option two', 'Option three'], answer: 1,
          explain: 'Shown only after the student gets it right.',
          tip: 'Shown when the student gets it wrong. Point to where to look. Do not give the answer.'
        },
        {
          type: 'typed',          // student types the exact answer and presses Check
          text: 'Type the answer.',
          expected: 'Paris',
          tip: 'Shown when the response is wrong. Point to where to look.'
        },
        {
          type: 'written',        // written response; the teacher grades it. ideas power the "Check my ideas" button.
          text: 'Explain your thinking. (2 to 4 sentences)',
          starters: ['I think this because …', 'One reason is …', 'This means that …'],
          min: 40,
          ideas: [
            { done: 'You explained the main idea.', q: 'Did you explain the main idea?', tip: 'A nudge toward the idea.', re: /keyword|another word/ },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write 2 to 4 full sentences?', tip: 'Add another sentence.', sentences: 2 }
          ]
        },
        {
          type: 'highlight',      // written response: students give evidence with transition words, then highlight those words in yellow
          text: 'Use evidence from the video to support your answer.',
          starters: ['According to the video, …', 'One piece of evidence is …', 'This shows that …'],
          min: 40,
          ideas: [
            { done: 'You used an example from the video.', q: 'Did you give an example from the video?', tip: 'What example did the video use?', re: /example|for instance/ },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write at least 2 full sentences?', tip: 'Add another sentence.', sentences: 2 },
            { done: 'You used transition words to point to your evidence.', q: 'Did you use transition words to point to your evidence?', tip: 'Introduce your evidence with words like “For example,” “According to the video,” or “This shows that.”', re: /for example|for instance|according to|this shows|that shows|which shows|shows that|evidence|in the video|the video (says|said|shows|showed|explains|explained|mentions|mentioned)|because|such as|as an example|one example|proves?|this means|supports?/ },
            { done: 'You highlighted your transition words in yellow.', q: 'Did you highlight your transition words in yellow?', tip: 'Go back and select the transition words that point to your evidence, then press the yellow button.', highlight: true }
          ]
        }
      ]
    }
  ]
};
