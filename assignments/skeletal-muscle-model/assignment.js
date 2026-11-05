/*
  Skeletal Muscle Model (Anatomy & Physiology A)
  Everything a student sees is written in this file. The shared engine in /engine builds the page,
  progress bars, PDF printout, Listen buttons, and captions from it.
  Students build a model of a skeletal muscle at home from straws, spaghetti, and three colors of masking tape,
  and follow along here one step at a time. Each build step ends with a photo of their own model.
  Sources (in source/, not saved to GitHub): the "Skeletal Muscle Model" handout (Skeletal_Muscle_Model.pdf) and
  the teacher's lab overview video. Captions come from the teacher's pasted transcript
  (source/skeletal-muscle-model.srt), with the muscle words spelled correctly.
  Write *scientific names* between asterisks to show them in italics. Reading boxes and tables use HTML.
  Full guide: docs/ASSIGNMENT_FORMAT.md
*/
window.ASSIGNMENT = {
  title: 'Skeletal Muscle Model',
  course: 'Anatomy & Physiology A',
  storageKey: 'skeletal-muscle-model-v2',
  /* supported version (?support=eagle): the goal box at the top */
  essential: {
    question: 'How is a skeletal muscle built from smaller and smaller bundles, each one wrapped in its own layer?',
    goals: [
      'Put the parts of a muscle in order from smallest to largest: myofilaments, myofibril, muscle fiber, fascicle, muscle.',
      'Tell which layer wraps each bundle: endomysium, perimysium, and epimysium.',
      'Tell what each part of your straw model stands for in a real muscle.',
      'Explain how the model is like a real muscle.'
    ]
  },
  partWord: 'Step',

  /* a muscle cut across: bundles inside bundles */
  icon: '<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">'
    + '<circle cx="32" cy="32" r="28" fill="var(--ligand)" stroke="var(--primary-ink)" stroke-width="3"/>'
    + '<g fill="#fff" stroke="var(--primary-ink)" stroke-width="2">'
    + '<circle cx="32" cy="32" r="8"/><circle cx="32" cy="15" r="7"/><circle cx="32" cy="49" r="7"/>'
    + '<circle cx="17" cy="23.5" r="7"/><circle cx="47" cy="23.5" r="7"/><circle cx="17" cy="40.5" r="7"/><circle cx="47" cy="40.5" r="7"/></g></svg>',

  /* one clip per build step, cut from the teacher's video. from/to are times in that video. There is no full video at
     the top: the teacher wants students to start with the short setup clip, then watch each clip as they build. */
  clips: {
    setup:      { src: 'media/clip-setup.mp4',      from: 0.0,   to: 23.0,  seconds: 24,  of: 'Model a Muscle Lab Overview', title: 'What you need for this lab' },
    myofibrils: { src: 'media/clip-myofibrils.mp4', from: 23.0,  to: 63.0,  seconds: 41,  of: 'Model a Muscle Lab Overview', title: 'Step 1 in the video: fill your straws with spaghetti' },
    fiber:      { src: 'media/clip-fiber.mp4',      from: 63.0,  to: 185.0, seconds: 123, of: 'Model a Muscle Lab Overview', title: 'Step 2 in the video: bundle seven straws and wrap them in endomysium' },
    fascicle:   { src: 'media/clip-fascicle.mp4',   from: 185.0, to: 276.0, seconds: 92,  of: 'Model a Muscle Lab Overview', title: 'Step 3 in the video: bundle muscle fibers and wrap them in perimysium' },
    muscle:     { src: 'media/clip-muscle.mp4',     from: 276.0, to: 361.0, seconds: 86,  of: 'Model a Muscle Lab Overview', title: 'Step 4 in the video: bundle the fascicles and wrap them in epimysium' },
    recap:      { src: 'media/clip-recap.mp4',      from: 361.0, to: 418.5, seconds: 58,  of: 'Model a Muscle Lab Overview', title: 'Looking back at every part of the model' }
  },

  parts: [
    /* ---------------------------------------------------------------- Step 1 */
    {
      title: 'Get set up',
      gate: true,                 // the build steps stay hidden until everything in this step is done
      intro: 'Keep this page open next to you and follow along, one step at a time, while you build your own model. Each step has a short clip from the video Model a Muscle Lab Overview. This page is your lab sheet: when the video says to add your pictures to the document, add them here instead. Do all of this step before you start building. The rest of the lab opens when you finish it: agree to the lab rules, answer the setup questions, and take a selfie with your materials.',
      clips: ['setup'],
      read: '<p><b>Today you will build a physical model of a skeletal muscle.</b> Afterward, you will reflect on how well the model shows the real structure of a skeletal muscle.</p>'
        + '<p><b>Materials</b> (from your lab bag):</p><ul>'
        + '<li>Straws</li>'
        + '<li>Masking tape in 3 colors</li>'
        + '<li>Dry spaghetti (or another thin pasta). Not every bag has spaghetti. If yours does not, that is OK. You will skip the spaghetti part of Step 2.</li></ul>'
        + '<p><b>Do it:</b></p><ol>'
        + '<li><b>Set up your space.</b> Clear a table so you have room to lay out your straws and tape.</li>'
        + '<li><b>Lay out your materials</b> from your lab bag.</li>'
        + '<li><b>Keep this page open.</b> It is your lab sheet. You will add a photo of your model at the end of each build step.</li>'
        + '<li><b>Take your ready selfie</b> at the bottom of this step, with your materials.</li></ol>'
        + '<p><b>Tip:</b> A friend or family member can help hold the bundles while you wrap them, but you can also do it by yourself.</p>',
      questions: [
        {
          type: 'agree',
          text: 'Lab agreement. Read each statement, and check the box to show you agree. Then sign with your name.',
          sign: true,
          items: [
            'I will build my own model and take my own photos.',
            'I will follow the steps in order and add a photo at the end of each build step.',
            'I will clean up my space when I finish.'
          ]
        },
        {
          type: 'multi',
          text: 'Which materials do you need for this lab? Choose all that are correct.',
          easy: 'What do you need for this lab? Pick all the right answers.',
          options: ['Straws', 'Masking tape in 3 colors', 'Dry spaghetti (if your bag has it)', 'Glue', 'Scissors and a knife', 'Water'],
          answers: ['Straws', 'Masking tape in 3 colors', 'Dry spaghetti (if your bag has it)'],
          rules: [{ any: ['Glue', 'Scissors and a knife', 'Water'], tip: 'Look at the materials list in the reading. Pick only what is on it.' }],
          tip: 'There are more. Look at the materials list in the reading again.',
          explain: 'Right. Straws, three colors of masking tape, and dry spaghetti if your bag has it. That is all you need.'
        },
        {
          type: 'choice',
          text: 'Your lab bag has no spaghetti. What should you do?',
          options: ['Skip the spaghetti and move on to making a muscle fiber', 'Stop the lab until you get spaghetti', 'Fill the straws with tape instead', 'Use only one straw for the whole model'], answer: 0,
          explain: 'Right. The video says not to worry about it. Just move on. In Step 2, tell your teacher in the photo box that you did not have spaghetti.',
          tip: 'Rewatch the clip, or read the materials list again. What does it say to do if your bag has no spaghetti?'
        },
        {
          type: 'photo',
          text: 'Take a selfie that shows you are ready to build, with your materials laid out in front of you.',
          easy: 'Take a selfie with your materials. Show your straws and tape.',
          caption: 'List the materials in your photo.',
          placeholder: 'For example: I have my straws, ...'
        }
      ]
    },

    /* ---------------------------------------------------------------- Step 2 */
    {
      title: 'Make the myofibrils',
      intro: 'Start with the smallest parts of the muscle. Each straw you fill becomes one myofibril.',
      clips: ['myofibrils'],
      images: [
        { src: 'media/diagram-step1.jpg', caption: 'The parts of a skeletal muscle. This step builds the parts in the red and purple boxes.',
          alt: 'Drawing of a skeletal muscle taken apart into smaller and smaller pieces, from the whole muscle on the left to tiny threads on the right. A red box marks the myofibril and a purple box marks the myofilaments.',
          text: '<p>Labels, from left to right: Muscle. Epimysium. Perimysium. Fascicle. Sarcoplasmic reticulum. Endomysium. Muscle fibers. Sarcomere. Myofibril (red box). Myofilaments (purple box): Actin thin filament, Myosin.</p>' }
      ],
      read: '<p><b>Do it:</b> Step 1 from your lab handout.</p><ul>'
        + '<li>Fill straws with spaghetti. Pack each straw full enough that the pasta doesn’t fall out.</li>'
        + '<li>Keep filling straws until you run out of pasta. You will need several for the next step.</li>'
        + '<li><b>Tip from the video:</b> Hold a stack of straws and drop the spaghetti noodles in. It should be a pretty quick process.</li>'
        + '<li>If you do not have spaghetti, skip this and tell your teacher in the photo box below. Then move on.</li></ul>'
        + '<p><b>Read:</b> The <b>spaghetti</b> noodles inside the straws represent the <b>myofilaments</b>. Myofilaments are the tiniest threads in a muscle. Look at the right side of the diagram: there are two kinds of myofilaments, <b>actin</b> (the thin filament) and <b>myosin</b>.</p>'
        + '<p>The myofilaments are all bundled inside a <b>myofibril</b>. So each <b>straw</b> represents one myofibril.</p>',
      questions: [
        {
          type: 'selects',
          text: 'What does each part of your model represent?',
          options: ['Myofilaments', 'Myofibril', 'Muscle fiber'],
          items: [
            { label: 'The spaghetti noodles inside a straw', answer: 'Myofilaments', hint: 'Rewatch the clip at about 0:27. What does the video say the noodles represent?' },
            { label: 'One straw filled with spaghetti', answer: 'Myofibril', hint: 'The noodles are bundled inside something. What does the video call each straw?' }
          ]
        },
        {
          type: 'multi',
          text: 'Look at the diagram. Which two kinds of myofilaments does it name? Choose all that are correct.',
          easy: 'Look at the diagram. There are two kinds of myofilaments. Which two? Pick all the right answers.',
          options: ['Actin', 'Myosin', 'Sarcomere', 'Endomysium', 'Fascicle'],
          answers: ['Actin', 'Myosin'],
          rules: [{ any: ['Sarcomere', 'Endomysium', 'Fascicle'], tip: 'Look at the far right of the diagram, next to the purple box. Only pick names that are there.' }],
          tip: 'There is one more. Look at the far right of the diagram, below the purple box.',
          explain: 'Right. Actin is the thin filament and myosin is the other one. In your model, both are spaghetti.'
        },
        {
          type: 'photo',
          text: 'Take a photo of your straws filled with spaghetti (your myofibrils).',
          easy: 'Take a photo of your straws with spaghetti inside. These are your myofibrils.',
          caption: 'What does your photo show? If you did not have spaghetti, say so here.',
          placeholder: 'For example: These are my myofibrils. Each straw ...'
        }
      ]
    },

    /* ---------------------------------------------------------------- Step 3 */
    {
      title: 'Make a muscle fiber',
      intro: 'Now bundle your myofibrils into muscle fibers, and wrap each one in its own layer.',
      clips: ['fiber'],
      images: [
        { src: 'media/diagram-step2.jpg', caption: 'This step builds the parts in the orange and pink boxes.',
          alt: 'The same drawing of a skeletal muscle taken apart. An orange box marks the muscle fibers, and a pink box marks the thin layer around each muscle fiber.',
          text: '<p>Labels, from left to right: Muscle. Epimysium. Perimysium. Fascicle. Sarcoplasmic reticulum. Endomysium (pink box). Muscle fibers (orange box). Sarcomere. Myofibril. Myofilaments: Actin thin filament, Myosin.</p>' }
      ],
      read: '<p><b>Do it:</b> Step 2 from your lab handout.</p><ul>'
        + '<li>Gather <b>7</b> filled straws (myofibrils) into a bundle. It will look a little like a flower.</li>'
        + '<li>Wrap them together with <b>one color</b> of masking tape. This tape layer represents the <b>endomysium</b>.</li>'
        + '<li>Repeat with your other myofibrils to make more muscle fibers. If you have a few straws left over, put them to the side.</li></ul>'
        + '<p><b>Tips from the video:</b> Start by taping around the top of the 7 straws, so they are already bundled and ready to go. Hold the tape at an angle and wrap it close around. If you get a little bubble, just squish it down. The first color of tape may run out, but you have just enough to wrap every bundle.</p>'
        + '<p><b>Read:</b> A bundle of myofibrils is a <b>muscle fiber</b>. One muscle fiber is one long muscle cell. The <b>endomysium</b> is the thin layer of connective tissue that wraps around each muscle fiber.</p>',
      questions: [
        {
          type: 'numbers',
          text: 'How many filled straws (myofibrils) go in each muscle fiber?',
          easy: 'How many straws go in one muscle fiber?',
          items: [ { label: 'Myofibrils in each muscle fiber', between: [7, 7], tip: 'Read the first bullet in the lab steps, or rewatch the start of the clip.' } ]
        },
        {
          type: 'choice',
          text: 'In your model, the first color of tape represents the endomysium. What does the endomysium wrap around?',
          easy: 'The first color of tape is the endomysium. What does it wrap around?',
          options: ['Each muscle fiber', 'Each fascicle', 'The whole muscle', 'Each piece of spaghetti'], answer: 0,
          explain: 'Right. The endomysium wraps each muscle fiber, the bundle of myofibrils.',
          tip: 'You wrap the tape around a bundle of 7 straws. What is that bundle called?'
        },
        {
          type: 'choice',
          support: false,
          text: 'After making bundles of 7, the teacher in the video has one straw left over. What does the teacher do with it?',
          easy: 'The teacher in the video has one straw left over. What happens to it?',
          options: ['It goes to the side', 'It gets taped to the outside of a bundle', 'It gets cut into seven pieces', 'The teacher starts over'], answer: 0,
          explain: 'Right. A leftover straw or two is fine. Put it to the side.',
          tip: 'Rewatch the clip from about 0:40, right after the groups of seven are done.'
        },
        {
          type: 'photo',
          text: 'Take a photo of all your muscle fibers. You can lay them out or hold them up to the camera.',
          easy: 'Take a photo of all your muscle fibers.',
          caption: 'What does your photo show? How many muscle fibers did you make?',
          placeholder: 'For example: These are my muscle fibers. I made ...'
        }
      ]
    },

    /* ---------------------------------------------------------------- Step 4 */
    {
      title: 'Make a fascicle',
      intro: 'Bundle your muscle fibers into fascicles, and wrap each fascicle in a second color of tape.',
      clips: ['fascicle'],
      images: [
        { src: 'media/diagram-step3.jpg', caption: 'This step builds the parts in the green and pink boxes.',
          alt: 'The same drawing of a skeletal muscle taken apart. A green box marks the fascicle, and a pink box marks the layer around the fascicle.',
          text: '<p>Labels, from left to right: Muscle. Epimysium. Perimysium (pink box). Fascicle (green box). Sarcoplasmic reticulum. Endomysium. Muscle fibers. Sarcomere. Myofibril. Myofilaments: Actin thin filament, Myosin.</p>' }
      ],
      read: '<p><b>Do it:</b> Step 3 from your lab handout.</p><ul>'
        + '<li>Bundle several muscle fibers together. The video uses bundles of <b>3</b>.</li>'
        + '<li>Wrap them with a <b>second color</b> of masking tape. This layer represents the <b>perimysium</b>.</li>'
        + '<li>Make as many fascicles as you can.</li></ul>'
        + '<p><b>Tips from the video:</b> Start with a piece of tape around the top so the fibers stick together while you work. Wrap slowly. If your tape overlaps too much, undo it and redo it.</p>'
        + '<p><b>Read:</b> A bundle of muscle fibers is a <b>fascicle</b>. The <b>perimysium</b> is the layer of connective tissue that wraps around each fascicle. In your model, it is OK if some of the first color shows through. But in a real muscle, the perimysium covers the whole bundle of muscle fibers.</p>',
      questions: [
        {
          type: 'numbers',
          text: 'In the video, how many muscle fibers does the teacher put in each fascicle?',
          easy: 'In the video, how many muscle fibers go in each fascicle?',
          items: [ { label: 'Muscle fibers in each fascicle', between: [3, 3], tip: 'Read the first bullet in the lab steps, or rewatch the start of the clip.' } ]
        },
        {
          type: 'selects',
          text: 'What does each part of your model represent?',
          options: ['Muscle fiber', 'Fascicle', 'Endomysium', 'Perimysium', 'Epimysium'],
          items: [
            { label: 'A bundle of muscle fibers', answer: 'Fascicle', hint: 'The video says “next up, we’re making our…” What does it name?' },
            { label: 'The second color of tape, around the bundle of muscle fibers', answer: 'Perimysium', hint: 'Read the second bullet in the lab steps. What does the second color represent?' }
          ]
        },
        {
          type: 'choice',
          support: false,
          text: 'Some of the first color of tape still shows through your second color. What does the video say about this?',
          easy: 'You can still see some of the first tape color under the second color. What does the video say?',
          options: ['It is OK in the model, but in a real muscle the perimysium would cover all the muscle fibers', 'You have to start the fascicle over', 'It means you used too many muscle fibers', 'The first color of tape should always be on the outside'], answer: 0,
          explain: 'Right. Your model does not have to be perfect. In a real muscle, the perimysium covers the whole bundle of muscle fibers.',
          tip: 'Rewatch the clip from about 0:57, when the teacher undoes and redoes the tape.'
        },
        {
          type: 'photo',
          text: 'Take a photo of your fascicles wrapped in their perimysium.',
          easy: 'Take a photo of your fascicles. Show the second color of tape.',
          caption: 'What does your photo show? How many muscle fibers are in each fascicle?',
          placeholder: 'For example: These are my fascicles. Each one has ...'
        }
      ]
    },

    /* ---------------------------------------------------------------- Step 5 */
    {
      title: 'Assemble the muscle',
      intro: 'Last build step. Put all your fascicles together and wrap the outside to make your full muscle.',
      clips: ['muscle'],
      images: [
        { src: 'media/diagram-step4.jpg', caption: 'This step builds the parts in the blue and pink boxes.',
          alt: 'The same drawing of a skeletal muscle taken apart. A blue box marks the whole muscle, and a pink box marks the outer layer around the whole muscle.',
          text: '<p>Labels, from left to right: Muscle (blue box). Epimysium (pink box). Perimysium. Fascicle. Sarcoplasmic reticulum. Endomysium. Muscle fibers. Sarcomere. Myofibril. Myofilaments: Actin thin filament, Myosin.</p>' }
      ],
      read: '<p><b>Do it:</b> Step 4 from your lab handout.</p><ul>'
        + '<li>Gather all of your fascicles together.</li>'
        + '<li>Wrap the outside with your <b>third, final color</b> of masking tape. This outer layer represents the <b>epimysium</b>.</li>'
        + '<li>You have now made your full muscle!</li></ul>'
        + '<p><b>Tips from the video:</b> If you are working alone, put a long piece of tape on the table, sticky side up. Stack your fascicles on it and squish the others in as you go, then wrap. If you have a few muscle fibers left over that did not make a full fascicle, you can put them in the muscle too.</p>'
        + '<p><b>Read:</b> A bundle of fascicles makes up the whole <b>muscle</b>. The <b>epimysium</b> is the outer layer of connective tissue that wraps around the whole muscle.</p>',
      questions: [
        {
          type: 'choice',
          text: 'In your model, the third color of tape represents the epimysium. What does the epimysium wrap around?',
          easy: 'The third color of tape is the epimysium. What does it wrap around?',
          options: ['The whole muscle', 'Each muscle fiber', 'Each myofibril', 'Each fascicle, one at a time'], answer: 0,
          explain: 'Right. The epimysium is the outside layer. It wraps all the fascicles together into one muscle.',
          tip: 'Read the second bullet in the lab steps. Is the third color on the inside or the outside?'
        },
        {
          type: 'choice',
          support: false,
          text: 'The teacher in the video had two muscle fibers left over that did not make a group of three. What did the teacher do with them?',
          easy: 'The teacher had two muscle fibers left over. What happened to them?',
          options: ['They went into the muscle with the fascicles', 'They were thrown away', 'They were wrapped in the first color of tape again', 'They became a second muscle'], answer: 0,
          explain: 'Right. They went in with the fascicles before the whole muscle was wrapped.',
          tip: 'Rewatch the clip from about 0:13. Listen for “also as a note…”'
        },
        {
          type: 'photo',
          text: 'Take a photo of your full muscle, wrapped in its epimysium.',
          easy: 'Take a photo of your whole muscle. Show the third color of tape.',
          caption: 'What does your photo show? Name the layer on the outside.',
          placeholder: 'For example: This is my full muscle. The outside layer is ...'
        }
      ]
    },

    /* ---------------------------------------------------------------- Step 6 */
    {
      title: 'Model components',
      intro: 'This step is the Model Components table from your lab handout. Use what you built in Steps 2 to 5.',
      clips: ['recap'],
      read: '<p><b>Read:</b> Your muscle is made of bundles inside bundles. Here they are from smallest to largest:</p><ol>'
        + '<li><b>Myofilaments</b> (actin and myosin) are the spaghetti.</li>'
        + '<li>Myofilaments are bundled inside a <b>myofibril</b>, one straw.</li>'
        + '<li>Myofibrils are bundled into a <b>muscle fiber</b>, wrapped in <b>endomysium</b> (your first color of tape).</li>'
        + '<li>Muscle fibers are bundled into a <b>fascicle</b>, wrapped in <b>perimysium</b> (your second color).</li>'
        + '<li>Fascicles are bundled into the whole <b>muscle</b>, wrapped in <b>epimysium</b> (your third color, on the outside).</li></ol>'
        + '<p><b>Word parts</b> can help you keep the three layers straight. <b>Endo-</b> means within, <b>peri-</b> means around, and <b>epi-</b> means upon or on the outside. The <b>-mysium</b> part comes from a Greek word for muscle.</p>',
      questions: [
        {
          type: 'selects',
          text: 'Model components. As you look back at your model, choose what represents each structure.',
          easy: 'Look at your model. Pick what stands for each part of a real muscle.',
          options: ['The spaghetti', 'One straw', 'A bundle of 7 straws', 'A bundle of muscle fibers', 'All the fascicles together', 'The first color of tape', 'The second color of tape', 'The third color of tape (outside)'],
          items: [
            { label: 'Actin myofilament', answer: 'The spaghetti', hint: 'Actin is one kind of myofilament. What went inside the straws?' },
            { label: 'Myosin myofilament', answer: 'The spaghetti', hint: 'Myosin is the other kind of myofilament. What went inside the straws?' },
            { label: 'Myofibrils', answer: 'One straw', hint: 'Look back at Step 2. What held the spaghetti?' },
            { label: 'Muscle fibers', answer: 'A bundle of 7 straws', hint: 'Look back at Step 3. What did you bundle together first?' },
            { label: 'Fascicles', answer: 'A bundle of muscle fibers', hint: 'Look back at Step 4. What did you bundle in groups of 3?' },
            { label: 'Muscle', answer: 'All the fascicles together', hint: 'Look back at Step 5. What makes the whole muscle?' },
            { label: 'Epimysium', answer: 'The third color of tape (outside)', hint: '“Epi-” means upon or on the outside. Which tape is on the outside?' },
            { label: 'Perimysium', answer: 'The second color of tape', hint: 'It wraps around each fascicle. Which tape color did you use in Step 4?' },
            { label: 'Endomysium', answer: 'The first color of tape', hint: 'It wraps each muscle fiber. Which tape color did you use first?' }
          ]
        },
        {
          type: 'order',
          text: 'Put the parts of a skeletal muscle in order, from smallest to largest.',
          easy: 'Put the parts in order. Start with the smallest. End with the biggest.',
          items: ['Myofilaments', 'Myofibril', 'Muscle fiber', 'Fascicle', 'Muscle'],
          tip: 'Think about the order you built them. What did you start with, and what did you make last?',
          explain: 'Right. Myofilaments are bundled into a myofibril, myofibrils into a muscle fiber, muscle fibers into a fascicle, and fascicles into the muscle.'
        }
      ]
    },

    /* ---------------------------------------------------------------- Step 7 */
    {
      title: 'Reflection',
      intro: 'These are the reflection questions from your lab handout. Answer them in your own words, using what you built and what you saw in the video.',
      easyIntro: 'These questions are from your lab handout. Answer them in your own words. Use what you built and what you saw in the video.',
      read: '<p><b>Think about it:</b> As you compare your straw muscle to a real skeletal muscle, think about how the parts are arranged. What is inside what? Which layer wraps each bundle? What does each material in your model stand for?</p>',
      questions: [
        {
          type: 'highlight',
          cer: true,              // claim (blue), evidence (yellow), expand (green)
          from: 'your model and the video',
          text: 'How does this model effectively represent the structure of a skeletal muscle? Use evidence from your model and the video.',
          easy: 'How is your model like a real skeletal muscle? Think about how the parts are put together. Use evidence from your model and the video.',
          starters: ['This model represents a skeletal muscle well because …', 'In my model, the straws …', 'According to the video, …', 'This shows that a real muscle is made of …'],
          min: 60,
          ideas: [
            { done: 'You named parts of the muscle.', q: 'Did you name parts of a real muscle?', tip: 'Use the real names, like myofibril, muscle fiber, or fascicle.', re: /myofibril|myofilament|muscle fib(er|re)|fascicle|actin|myosin|endomysium|perimysium|epimysium/ },
            { done: 'You said how the model shows bundles inside bundles.', q: 'Did you say how the parts are organized?', tip: 'What is inside what? Think about how you built it, one bundle at a time.', all: [/bundl|group|inside|within|made (up )?of|layers?|wrap|smaller|larger|bigger|order|organiz|together/, /myofibril|myofilament|muscle fib(er|re)|fascicle|straws?|spaghetti|pasta|tape|endomysium|perimysium|epimysium/] },
            { done: 'You told what a part of the model stands for.', q: 'Did you tell what a part of the model stands for?', tip: 'Connect a material to a real part: the straws, the spaghetti, or a color of tape.', all: [/straws?|spaghetti|pasta|noodles?|tape/, /represent|stands? for|shows?|is (a|an|the|like)|are (the|like)|acts? as|model of|myofibril|myofilament|fib(er|re)|fascicle|mysium/] },
            { done: 'You used transition words to point to your evidence.', q: 'Did you use transition words to point to your evidence?', tip: 'Introduce your evidence with words like “For example,” “According to the video,” or “In my model.”', writing: true, re: /for example|for instance|according to|this shows|that shows|which shows|shows that|in the video|the video (says|said|shows|showed|explains|explained)|such as|in my model|when i (built|made|wrapped|bundled)|this means|proves?|supports?/ },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write at least 2 full sentences?', tip: 'Add another sentence.', sentences: 2 }
          ]
        },
        {
          type: 'written',
          support: false,
          text: 'What do you understand better now about skeletal muscles after creating this model? (2 to 4 sentences)',
          easy: 'What do you understand better about skeletal muscles now, after building the model? Write 2 to 4 sentences.',
          starters: ['After building this model, I understand …', 'Before, I did not know that …', 'Now I can see how …'],
          min: 40,
          ideas: [
            { done: 'You told what you understand better.', q: 'Did you tell what you understand better now?', tip: 'Start with “Now I understand…” or “I learned that…”', all: [/understand|learn|realiz|know|see|get|clear|makes? sense|before|now/, /myofibril|myofilament|fib(er|re)|fascicle|actin|myosin|mysium|layers?|bundl|wrap|inside|organiz|structure|muscle/] },
            { done: 'You used the name of a muscle part.', q: 'Did you name a part of a skeletal muscle?', tip: 'Name the part you learned about, like fascicle or endomysium.', re: /myofibril|myofilament|muscle fib(er|re)|fascicle|actin|myosin|endomysium|perimysium|epimysium/ },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write 2 to 4 full sentences?', tip: 'Add another sentence.', sentences: 2 }
          ]
        },
        {
          type: 'written',
          text: 'What are you still struggling to understand about skeletal muscles, even after this activity? (2 to 4 sentences)',
          easy: 'What is still hard to understand about skeletal muscles? Name the part you are asking about. Write 2 to 4 sentences.',
          starters: ['I am still confused about …', 'One thing I do not understand yet is …', 'A question I still have is …'],
          min: 40,
          ideas: [
            { done: 'You named something you are still working on.', q: 'Did you name something that is still hard to understand?', tip: 'It is OK to still have questions! Start with “I am still not sure about…”', all: [/confus|struggl|still|unsure|not sure|don.?t (get|understand|know)|do not (get|understand|know)|wonder|question|hard|unclear|mix(ed)? up/, /myofibril|myofilament|fib(er|re)|fascicle|actin|myosin|mysium|layers?|bundl|wrap|contract|move|sarcomere|sarcoplasmic|cells?|nerves?|tendons?|bones?|muscle/] },
            { done: 'You named a part of a skeletal muscle.', q: 'Did you name the part you are asking about?', tip: 'Which part is it? Use its name.', re: /myofibril|myofilament|muscle fib(er|re)|fascicle|actin|myosin|endomysium|perimysium|epimysium|sarcomere|sarcoplasmic|tendon/ },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write 2 to 4 full sentences?', tip: 'Add another sentence.', sentences: 2 }
          ]
        }
      ]
    }
  ]
};
