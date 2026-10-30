/*
  LP2 - Biology Mastery: Inside the Cell (Biology A)
  A mastery check for students who join late and have no grade for Learning Period 2. It covers the LP2 units:
  cell theory and organelles, homeostasis and feedback loops, cell transport, cell signaling, and enzymes.
  The written answers show the teacher what a student understands, so there is no mastery score.
  Videos: the teacher's notes videos (cell theory, homeostasis, cell transport), the Amoeba Sisters enzymes video,
  and the Amoeba Sisters Intro to Cell Signaling video, which is shared with explore-cell-signaling (its file lives there).
  Original videos and caption transcripts are in source/ (not saved to GitHub).
  Everything a student sees is written in this file. The shared engine in /engine builds the page,
  progress bars, PDF printout, Listen buttons, and captions from it.
  Full guide: docs/ASSIGNMENT_FORMAT.md
*/
window.ASSIGNMENT = {
  title: 'LP2 - Biology Mastery: Inside the Cell',
  course: 'Biology A',
  storageKey: 'mastery-biology-lp2-v1',          // must be different for every assignment; change it if the questions change a lot

  /* No single main video: each part has its own video or clips. */
  start: {
    heading: 'How this assignment works',
    intro: 'This assignment covers what we learned inside the cell this learning period: cell theory and organelles, homeostasis and feedback loops, cell transport, cell signaling, and enzymes.',
    after: 'Work from top to bottom. Each part has a video or short clips, a reading, and questions that check your work. Some videos stop on their own and a question pops up. Answer it to keep watching. There is one written question in every part. Write it in your own words, because it shows your teacher what you understand. Each part opens when you finish the one before it.'
  },

  clips: {
    celltheory: { src: 'media/cell-theory.mp4', from: 0, to: 415.5, seconds: 416, title: 'Cell Theory and Organelles', of: 'Cell Theory and Organelles', whole: true },
    homeo:      { src: 'media/clip-homeo.mp4', from: 0, to: 243, seconds: 244, title: 'Homeostasis, stimulus, and response', of: 'Homeostasis' },
    feedback:   { src: 'media/clip-feedback.mp4', from: 243, to: 514, seconds: 272, title: 'Positive and negative feedback loops', of: 'Homeostasis' },
    membrane:   { src: 'media/clip-membrane.mp4', from: 514, to: 891.971, seconds: 378, title: 'The cell membrane keeps the cell in balance', of: 'Homeostasis' },
    words:      { src: 'media/clip-words.mp4', from: 0, to: 327, seconds: 328, title: 'Passive and active transport, and key words', of: 'Cell Transport' },
    diffusion:  { src: 'media/clip-diffusion.mp4', from: 327, to: 527, seconds: 201, title: 'Simple diffusion and facilitated diffusion', of: 'Cell Transport' },
    osmosis:    { src: 'media/clip-osmosis.mp4', from: 527, to: 863, seconds: 337, title: 'Osmosis: hypertonic, hypotonic, and isotonic', of: 'Cell Transport' },
    active:     { src: 'media/clip-active.mp4', from: 1044, to: 1270, seconds: 227, title: 'Active transport: pumps, endocytosis, and exocytosis', of: 'Cell Transport' },
    signaling:  { src: '../explore-cell-signaling/media/intro-cell-signaling.mp4', from: 0, to: 538.4, seconds: 539, title: 'Intro to Cell Signaling', of: 'Intro to Cell Signaling', whole: true },
    enzymes:    { src: 'media/enzymes.mp4', from: 0, to: 346.8, seconds: 347, title: 'Enzymes', of: 'Enzymes', whole: true }
  },

  parts: [
    /* ---------------------------------------------------------------- Part 1 */
    {
      title: 'Cell theory and organelles',
      intro: 'Watch the Cell Theory and Organelles video. It stops on its own 4 times and a question pops up. Answer each question to keep watching. Then open the reading about organelles and answer the questions below it.',
      clips: ['celltheory'],
      read: '<p><b>Read: the parts of a cell.</b> Organelles are specialized structures inside a cell. Each one has a job that helps the cell survive and grow. Think of them as mini organs inside the cell.</p>'
        + '<ul>'
        + '<li><b>Cell membrane:</b> a thin layer that wraps around the cell. It controls which substances enter and leave the cell. In an animal cell it is the outer layer.</li>'
        + '<li><b>Cytoplasm:</b> the thick liquid that fills the space between the cell membrane and the nucleus. It is mostly water. It holds the cell’s parts in place, and many chemical reactions happen there.</li>'
        + '<li><b>Nucleus:</b> the control center. It holds the <b>chromosomes</b>, which are made of DNA. DNA has the information the cell uses for growth and activities.</li>'
        + '<li><b>Ribosomes:</b> tiny dots that make proteins (protein synthesis). Some float in the cytoplasm, and some sit on the rough endoplasmic reticulum.</li>'
        + '<li><b>Endoplasmic reticulum (ER):</b> a folded system of membranes next to the nucleus. Rough ER is covered with ribosomes and helps make proteins and move them through the cell.</li>'
        + '<li><b>Golgi apparatus:</b> a stack of flat sacs. It packages proteins and sends them where they need to go, often in small bubbles called vesicles.</li>'
        + '<li><b>Mitochondria:</b> break down sugar and release energy that the cell can use. This energy is stored in a molecule called ATP.</li>'
        + '<li><b>Lysosomes:</b> break down worn-out cell parts and other waste. An animal cell may have many lysosomes.</li>'
        + '<li><b>Vacuoles:</b> store water, waste, and nutrients such as sugar. Animal cells usually have several small vacuoles.</li>'
        + '</ul>'
        + '<p><b>Plant cells</b> have all of these parts too, plus a few more: a <b>cell wall</b> outside the cell membrane that gives support (made of cellulose), <b>chloroplasts</b> that capture light energy to make sugar (photosynthesis), and one <b>large central vacuole</b> that stores water.</p>',
      questions: [
        {
          at: 23,
          type: 'multi',
          text: 'The video starts with cell theory. Choose the three statements that make up cell theory.',
          options: ['All living things are made of cells.', 'Cells are the basic unit of life.', 'All cells come from other cells.', 'All cells have a nucleus.', 'All cells are the same size.'],
          answers: ['All living things are made of cells.', 'Cells are the basic unit of life.', 'All cells come from other cells.'],
          tip: 'Rewind to the very start of the video. Listen for the three things the video says cell theory is. One of your choices is not true for every cell.',
          explain: 'Right. Cell theory says all living things are made of cells, cells are the basic unit of life, and all cells come from other cells.'
        },
        {
          at: 78,
          type: 'order',
          text: 'In a multicellular organism, cells are organized into bigger and bigger levels. Put the levels in order, from smallest to largest.',
          items: ['Cells', 'Tissues', 'Organs', 'Organ systems'],
          tip: 'Rewind to about 1:02. Listen for what many cells organize into first, and then what comes after that.',
          explain: 'Right. Cells organize into tissues, tissues into organs, and organs into organ systems.'
        },
        {
          at: 254,
          type: 'selects',
          text: 'The video compares prokaryotic and eukaryotic cells. Choose the type of cell for each description.',
          options: ['Prokaryotic', 'Eukaryotic'],
          items: [
            { label: 'Has a nucleus', answer: 'Eukaryotic', hint: 'Rewind to about 2:36. Which type of cell has a nucleus in the middle?' },
            { label: 'Has no membrane-bound organelles', answer: 'Prokaryotic', hint: 'Rewind to about 2:51. Mitochondria and the ER are membrane-bound organelles. Which type of cell does not have them?' },
            { label: 'Divides by binary fission', answer: 'Prokaryotic', hint: 'Rewind to about 3:06 and listen to the part about division.' },
            { label: 'Divides by mitosis', answer: 'Eukaryotic', hint: 'Rewind to about 3:06 and listen to the part about division.' },
            { label: 'Bacteria', answer: 'Prokaryotic', hint: 'Rewind to about 3:56. Listen for the example organism for each type of cell.' },
            { label: 'Animals, plants, fungi, and protists', answer: 'Eukaryotic', hint: 'Rewind to about 3:56. Listen for the example organisms for each type of cell.' }
          ]
        },
        {
          at: 365,
          type: 'multi',
          text: 'The video says ALL cells, prokaryotic and eukaryotic, have four structures. Choose all four.',
          options: ['Genetic material (DNA)', 'Cytoplasm', 'Cell membrane', 'Ribosomes', 'Nucleus', 'Mitochondria', 'Cell wall'],
          answers: ['Genetic material (DNA)', 'Cytoplasm', 'Cell membrane', 'Ribosomes'],
          rules: [
            { any: ['Nucleus', 'Mitochondria'], tip: 'Prokaryotic cells do not have this, so not ALL cells have it. Rewind to about 2:36.' },
            { any: ['Cell wall'], tip: 'Animal cells do not have this, so not ALL cells have it. Rewind to about 3:33.' }
          ],
          tip: 'There are four right answers. Rewind to about 4:14 and listen for each structure the video says both types of cells have.',
          explain: 'Right. All cells have genetic material, cytoplasm, a cell membrane, and ribosomes. Eukaryotic cells also have membrane-bound organelles.'
        },
        {
          type: 'label',
          text: 'Label the animal cell. Drag each label into the box with the matching number. (On a phone, tap a label and then tap a box.) Use the reading above.',
          viewBox: '-150 0 900 440',
          image: { src: 'media/animal-cell.svg', width: 600, height: 440 },
          alt: 'Drawing of an animal cell with nine numbered parts: an outer layer, the fluid inside, a large purple round structure, folded green membranes dotted with tiny dots, loose tiny dots, a stack of flat blue sacs, two oval structures with folds inside, a small yellow circle, and a light blue oval.',
          spots: [
            { x: -95, y: 70, label: 'Lysosome', tip: 'This small sac breaks down waste and worn-out cell parts.', to: [[190, 118]] },
            { x: -95, y: 170, label: 'Vacuole', tip: 'This sac stores water, waste, and nutrients.', to: [[100, 205]] },
            { x: -95, y: 280, label: 'Mitochondrion', tip: 'Look for the folds inside. This organelle releases energy from sugar.', to: [[128, 298]] },
            { x: -95, y: 390, label: 'Cell membrane', tip: 'This is the thin layer around the whole cell.', to: [[123, 373]] },
            { x: 262, y: 250, label: 'Nucleus', tip: 'This large round structure holds the chromosomes.' },
            { x: 525, y: 315, label: 'Cytoplasm', tip: 'This number sits in the liquid that fills the cell.' },
            { x: 695, y: 210, label: 'Ribosome', tip: 'These tiny dots make proteins. Some float freely.', to: [[512, 238]] },
            { x: 695, y: 300, label: 'Endoplasmic reticulum', tip: 'These folded membranes sit next to the nucleus and are dotted with ribosomes.', to: [[447, 262]] },
            { x: 695, y: 390, label: 'Golgi apparatus', tip: 'This stack of flat sacs packages proteins.', to: [[366, 350]] }
          ],
          explain: 'Right. You labeled all nine parts of the animal cell.'
        },
        {
          type: 'selects',
          text: 'Match each job to the organelle that does it.',
          options: ['Cell membrane', 'Chloroplast', 'Golgi apparatus', 'Lysosome', 'Mitochondria', 'Nucleus', 'Ribosome'],
          items: [
            { label: 'Holds the chromosomes (DNA) that control what the cell does', answer: 'Nucleus', hint: 'Where are the chromosomes kept in animal and plant cells?' },
            { label: 'Makes proteins', answer: 'Ribosome', hint: 'The video says this structure is in all cells and is responsible for protein synthesis.' },
            { label: 'Breaks down sugar and releases energy the cell can use', answer: 'Mitochondria', hint: 'Look in the reading for the organelle that releases energy as ATP.' },
            { label: 'Controls which substances enter and leave the cell', answer: 'Cell membrane', hint: 'Which part wraps around the whole cell?' },
            { label: 'Breaks down waste and worn-out cell parts', answer: 'Lysosome', hint: 'Look in the reading for the cell’s cleanup crew.' },
            { label: 'Packages proteins and sends them where they need to go', answer: 'Golgi apparatus', hint: 'Look in the reading for the stack of flat sacs.' },
            { label: 'Captures light energy to make sugar', answer: 'Chloroplast', hint: 'This one is only in plant cells. Reread the last paragraph of the reading.' }
          ]
        },
        {
          type: 'selects',
          text: 'Is each part found in plant cells only, or in both plant and animal cells?',
          options: ['Plant cells only', 'Both plant and animal cells'],
          items: [
            { label: 'Cell wall', answer: 'Plant cells only', hint: 'Reread the last paragraph of the reading. In the video, which eukaryotes have cell walls?' },
            { label: 'Chloroplast', answer: 'Plant cells only', hint: 'Do animal cells make their own sugar from light?' },
            { label: 'Large central vacuole', answer: 'Plant cells only', hint: 'Reread the reading. What kind of vacuoles do animal cells usually have?' },
            { label: 'Mitochondria', answer: 'Both plant and animal cells', hint: 'Plant cells need to release energy from sugar too.' },
            { label: 'Nucleus', answer: 'Both plant and animal cells', hint: 'Plants and animals are both eukaryotes. What do all eukaryotic cells have?' },
            { label: 'Cell membrane', answer: 'Both plant and animal cells', hint: 'The video says every cell has this.' }
          ]
        },
        {
          type: 'written',
          text: 'A classmate says, “Bacteria are too simple to be alive. They don’t even have a nucleus.” Is your classmate right? Use cell theory and what you learned about prokaryotic cells to explain. (3 to 5 sentences)',
          starters: ['My classmate is … because …', 'According to cell theory, …', 'Bacteria are a type of cell called …', 'Even without a nucleus, bacteria still have …'],
          min: 120,
          ideas: [
            { done: 'You used cell theory.', q: 'Did you use cell theory?', tip: 'Cell theory says what all living things are made of, and what the basic unit of life is.', re: /made (up )?of (a |one )?cells?|basic unit|unit of life|smallest (part|unit)|all living things/ },
            { done: 'You said bacteria are prokaryotic or single-celled.', q: 'Did you say what type of cell bacteria are?', tip: 'The video names bacteria as the example for one type of cell. Is it one cell or many?', re: /prokaryot|procaryot|unicellular|single[- ]?cell|one cell/ },
            { done: 'You named something bacteria still have.', q: 'Did you name a structure bacteria still have?', tip: 'The video lists four structures that ALL cells have, even without a nucleus.', re: /dna|genetic|ribosome|cytoplasm|(cell )?membrane|cell wall|rna/ },
            { done: 'You said where the DNA is without a nucleus.', q: 'Did you say where a bacterium keeps its DNA?', tip: 'In a prokaryotic cell, where does the video say the genetic material floats?', all: [/dna|genetic|chromosome/, /cytoplasm|float|free/] },
            { done: 'You wrote at least 3 sentences.', q: 'Did you write 3 to 5 sentences?', tip: 'Add a sentence that explains your answer.', sentences: 3 }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 2 */
    {
      title: 'Homeostasis and feedback loops',
      intro: 'This part uses three clips from the Homeostasis video. The first clip stops on its own 3 times and a question pops up. Answer each question to keep watching. Then watch the other two clips and answer the questions below them.',
      clips: ['homeo', 'feedback', 'membrane'],
      read: '<p><b>Read: key ideas.</b> <b>Homeostasis</b> is the need of an organism to stay stable by regulating its internal conditions, such as temperature, pH, and blood sugar. It is a <b>dynamic equilibrium</b>: things are not always exactly the same, but they stay within a healthy range.</p>'
        + '<p>A <b>stimulus</b> is a change in the environment. A <b>response</b> is a change in the organism because of a stimulus.</p>'
        + '<p><b>Feedback loops</b> use the output of a system to change the input. In a <b>positive feedback loop</b>, the output intensifies (amplifies) the response, so it grows and grows. In a <b>negative feedback loop</b>, the output causes a counter response that brings the system back to a set point, so it stabilizes.</p>'
        + '<p>At the level of the cell, homeostasis is kept by the <b>cell membrane</b>. Its phospholipid bilayer makes it <b>selectively permeable</b>: it is picky about what goes in and out.</p>',
      questions: [
        {
          at: 61,
          type: 'typed',
          text: 'Fill in the blank from the video: Homeostasis is the need of an organism to stay _____ by regulating its internal conditions.',
          accept: ['stable', 'balanced', 'stable and balanced'],
          tip: 'Rewind to about 0:52 and listen for the word right after “stay.”',
          okMsg: 'Right. Homeostasis is the need of an organism to stay stable by regulating its internal conditions.',
          aria: 'Missing word'
        },
        {
          at: 97,
          type: 'choice',
          text: 'Your body temperature is not always exactly 98.6°F. Why does the video say you are still in homeostasis?',
          options: ['It is a dynamic equilibrium: the temperature goes up and down but stays within a healthy range.', 'Homeostasis only matters for blood sugar, not temperature.', 'Your body temperature never changes at all.', 'A fever is part of homeostasis.'],
          answer: 0,
          tip: 'Rewind to about 1:01. Listen for what “dynamic” means and what the video says about a range.',
          explain: 'Right. Homeostasis is dynamic. Things like temperature change a little, but as long as they stay within a certain range, you are healthy.'
        },
        {
          at: 129,
          type: 'selects',
          text: 'Is each one a stimulus or a response?',
          options: ['Stimulus', 'Response'],
          items: [
            { label: 'A change in the environment around you', answer: 'Stimulus', hint: 'Rewind to about 1:53 and listen to the two definitions.' },
            { label: 'A change in the organism because of a change in the environment', answer: 'Response', hint: 'Rewind to about 1:53 and listen to the two definitions.' },
            { label: 'An animal experiences a sudden drop in temperature', answer: 'Stimulus', hint: 'Is the cold something that happens to the animal, or something the animal does?' }
          ]
        },
        {
          type: 'selects',
          text: 'Match each description to the type of feedback loop.',
          options: ['Positive feedback', 'Negative feedback'],
          items: [
            { label: 'The output intensifies (amplifies) the response', answer: 'Positive feedback', hint: 'In the second clip, which type uses the plus sign and the arrow going up?' },
            { label: 'The output causes a counter response to return to a set point', answer: 'Negative feedback', hint: 'Which type is trying to stabilize the system?' },
            { label: 'Childbirth: more pressure releases more hormones, which cause more contractions', answer: 'Positive feedback', hint: 'Does this keep getting bigger until the baby is born, or does it settle back down?' },
            { label: 'A ripening banana releases ethylene, which makes nearby fruit ripen and release more ethylene', answer: 'Positive feedback', hint: 'Does the ripening spread and grow, or settle back down?' },
            { label: 'You get hot outside, you sweat, and the sweat cools you down', answer: 'Negative feedback', hint: 'Does sweating make you hotter and hotter, or bring your temperature back?' },
            { label: 'Your body keeps blood sugar and water levels within a range', answer: 'Negative feedback', hint: 'Listen to the examples the video gives after body temperature.' }
          ]
        },
        {
          type: 'order',
          text: 'Put the steps of body temperature regulation (a negative feedback loop) in order, starting with the stimulus.',
          items: ['You are outside in the heat.', 'Your body temperature rises above the set point.', 'Your body responds by sweating.', 'The sweat cools you down.', 'Your body temperature returns to the set point.'],
          tip: 'Start with the stimulus (the change in the environment), and end back where the body started. Rewatch the second clip at about 6:21.',
          explain: 'Right. Heat raises your temperature, you sweat, the sweat cools you, and your temperature comes back to the set point. The response works against the change, so it is negative feedback.'
        },
        {
          type: 'choice',
          text: 'The third clip says the cell membrane is selectively permeable. What does that mean?',
          options: ['It is picky about what goes in and out of the cell.', 'It lets everything in and out of the cell.', 'It never lets anything in or out of the cell.', 'It is only found in plant cells.'],
          answer: 0,
          tip: 'Rewatch the third clip at about 8:49. The teacher uses a simple word that means “selective.”',
          explain: 'Right. Selectively permeable means the membrane is picky. Some things pass easily, and some need help.'
        },
        {
          type: 'multi',
          text: 'According to the third clip, which kinds of molecules can pass through the cell membrane easily? Choose all that apply.',
          options: ['Small molecules', 'Nonpolar (hydrophobic) molecules', 'Oxygen (O₂)', 'Large molecules', 'Polar molecules'],
          answers: ['Small molecules', 'Nonpolar (hydrophobic) molecules', 'Oxygen (O₂)'],
          rules: [{ any: ['Large molecules', 'Polar molecules'], tip: 'Rewatch the third clip at about 9:20. What does the video say about larger or polar molecules?' }],
          tip: 'There are three right answers. Rewatch the third clip at about 9:03 and at about 10:26.',
          explain: 'Right. Small, nonpolar molecules such as oxygen pass through easily. Larger or polar molecules need help.'
        },
        {
          type: 'highlight',
          text: 'Explain how a negative feedback loop is different from a positive feedback loop. Use one example of each from the video, and tell how each loop ends. (4 to 6 sentences)',
          starters: ['In a negative feedback loop, the output …', 'For example, according to the video, when you get too hot …', 'In a positive feedback loop, the output …', 'One example from the video is …', 'This shows that negative feedback … while positive feedback …'],
          min: 180,
          ideas: [
            { done: 'You explained negative feedback.', q: 'Did you explain what negative feedback does?', tip: 'Does negative feedback make the change bigger, or bring the system back?', all: [/negative/, /stabiliz|stable|set ?point|counter|back to (normal|the)|return|reverse|opposite|balance|steady|range/] },
            { done: 'You explained positive feedback.', q: 'Did you explain what positive feedback does?', tip: 'Does positive feedback make the change bigger, or bring the system back?', all: [/positive/, /amplif|intensif|increas|bigger|greater|more and more|grow|build|speed|keep going|stronger/] },
            { done: 'You gave a negative feedback example.', q: 'Did you give an example of negative feedback from the video?', tip: 'The video gives body temperature, water concentration, and blood sugar as examples.', re: /sweat|temperature|thermo|blood sugar|glucose|water (level|concentration|balance)|osmo/ },
            { done: 'You gave a positive feedback example.', q: 'Did you give an example of positive feedback from the video?', tip: 'The video gives two examples: one about a baby and one about fruit.', re: /child ?birth|labor|bab(y|ies)|contraction|uterus|ripen|banana|fruit|ethylene/ },
            { done: 'You used transition words to point to your evidence.', q: 'Did you use transition words to point to your evidence?', tip: 'Introduce your evidence with words like “For example,” “According to the video,” or “This shows that.”', writing: true, re: /for example|for instance|according to|this shows|that shows|which shows|shows that|in the video|the video (says|said|shows|showed|explains|explained|mentions|mentioned|gives|gave)|such as|as an example|one example|this means|another example/ },
            { done: 'You highlighted your transition words in yellow.', q: 'Did you highlight your transition words in yellow?', tip: 'Go back and select the transition words that point to your evidence, then press the yellow button.', highlight: true }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 3 */
    {
      title: 'Cell transport',
      intro: 'This part uses four clips from the Cell Transport video. The first clip stops on its own 4 times and a question pops up. Answer each question to keep watching. Then watch the other clips and answer the questions below them.',
      clips: ['words', 'diffusion', 'osmosis', 'active'],
      read: '<p><b>Read: key ideas.</b> <b>Passive transport</b> needs no extra energy. Molecules move from high concentration to low concentration, down the concentration gradient, like going down a slide. Examples: <b>simple diffusion</b>, <b>facilitated diffusion</b> (with help from a transport protein), and <b>osmosis</b> (the diffusion of water).</p>'
        + '<p><b>Active transport</b> needs extra energy in the form of <b>ATP</b>. It moves materials from low concentration to high concentration, against the concentration gradient, like climbing up a slide. Examples: <b>molecular pumps</b>, <b>endocytosis</b> (vesicles bring large particles into the cell), and <b>exocytosis</b> (vesicles send materials out of the cell).</p>'
        + '<p>In osmosis, water moves toward the side with less water and more solute. In a <b>hypertonic</b> solution, water rushes out and the cell shrivels. In a <b>hypotonic</b> solution, water rushes in and the cell swells. In an <b>isotonic</b> solution, water moves in and out equally and the cell stays the same.</p>',
      questions: [
        {
          at: 48,
          type: 'multi',
          text: 'The video names three examples of passive transport. Choose all three.',
          options: ['Simple diffusion', 'Facilitated diffusion', 'Osmosis', 'Molecular pumps', 'Endocytosis'],
          answers: ['Simple diffusion', 'Facilitated diffusion', 'Osmosis'],
          rules: [{ any: ['Molecular pumps', 'Endocytosis'], tip: 'That one needs extra energy. Rewind to about 0:40 and listen for the examples of passive transport.' }],
          tip: 'There are three right answers. Rewind to about 0:40.',
          explain: 'Right. Simple diffusion, facilitated diffusion, and osmosis are passive transport. They need no extra energy.'
        },
        {
          at: 71,
          type: 'typed',
          text: 'Active transport needs extra energy. What is the name of that energy molecule?',
          accept: ['ATP', 'adenosine triphosphate'],
          tip: 'Rewind to about 0:48. Listen for the three letters the teacher says the energy is called.',
          okMsg: 'Right. Active transport uses ATP to move materials against their concentration gradient.',
          aria: 'Energy molecule'
        },
        {
          at: 122,
          type: 'selects',
          text: 'The video uses lemonade to explain three key words. Match each part of the lemonade to its word.',
          options: ['Solute', 'Solvent', 'Solution'],
          items: [
            { label: 'The lemonade powder (what gets dissolved)', answer: 'Solute', hint: 'Rewind to about 1:33. Which word means “what gets dissolved”?' },
            { label: 'The water (what does the dissolving)', answer: 'Solvent', hint: 'Rewind to about 1:47. Which word means “what does the dissolving”?' },
            { label: 'The powder and water mixed together', answer: 'Solution', hint: 'Rewind to about 1:54. Which word means the mixture?' }
          ]
        },
        {
          at: 180,
          type: 'choice',
          text: 'Which lemonade has a HIGH concentration?',
          options: ['A super strong, sour lemonade with lots of powder', 'A watery lemonade where the ice has melted', 'A glass of plain water'],
          answer: 0,
          tip: 'Rewind to about 2:35. Concentration is the amount of solute dissolved in the solvent.',
          explain: 'Right. High concentration means a lot of solute, like a strong, sour lemonade.'
        },
        {
          type: 'selects',
          text: 'Name the type of transport in each example.',
          options: ['Simple diffusion', 'Facilitated diffusion', 'Osmosis', 'Molecular pump', 'Endocytosis', 'Exocytosis'],
          items: [
            { label: 'The smell of bacon spreads from the kitchen to the rest of the house. Oxygen moves into a cell the same way.', answer: 'Simple diffusion', hint: 'Rewatch the second clip at about 5:35. This one happens on its own with no help.' },
            { label: 'Glucose moves from high to low concentration through a transport protein.', answer: 'Facilitated diffusion', hint: 'It still goes from high to low, but it needs help from a protein. Rewatch the second clip at about 7:24.' },
            { label: 'Water moves across the cell membrane.', answer: 'Osmosis', hint: 'Which kind of passive transport is only about water?' },
            { label: 'A cell uses energy to move potassium ions through a protein channel against the concentration gradient.', answer: 'Molecular pump', hint: 'Against the gradient means active transport. Rewatch the last clip at about 17:54.' },
            { label: 'A white blood cell engulfs bacteria to fight infection.', answer: 'Endocytosis', hint: 'Is the bacteria coming into the cell or going out? “Endo” means in.' },
            { label: 'A nerve cell releases neurotransmitters to send signals.', answer: 'Exocytosis', hint: 'Are the neurotransmitters coming into the cell or going out?' }
          ]
        },
        {
          type: 'tonicity',
          text: 'Interactive diagram. First, move the slider to change how much solute is in the water outside the cell, and watch what the water does. Then, for each cell below, choose the answers in all three menus. When all three are right, the cell shows what happens.',
          cell: 2,
          items: [
            { name: 'Cell 1', who: 'A red blood cell placed in pure water', outside: 0 },
            { name: 'Cell 2', who: 'A cell placed in very salty water', outside: 4 },
            { name: 'Cell 3', who: 'A cell placed in a solution that matches its cytoplasm', outside: 2 }
          ]
        },
        {
          type: 'written',
          text: 'Explain the difference between passive transport and active transport. In your answer, tell which way molecules move compared to the concentration gradient, whether energy (ATP) is needed, and give one example of each. (3 to 5 sentences)',
          starters: ['Passive transport moves molecules from …', 'It does not need … because …', 'Active transport moves molecules from …', 'One example of passive transport is …', 'One example of active transport is …'],
          min: 140,
          ideas: [
            { done: 'You said which way passive transport moves.', q: 'Did you say which way molecules move in passive transport?', tip: 'Think about the slide. Do molecules go from high to low concentration, or low to high?', all: [/passive/, /high(er)? (concentration )?to low|down the (concentration )?gradient|with the (concentration )?gradient|down (a|the) slide/] },
            { done: 'You said which way active transport moves.', q: 'Did you say which way molecules move in active transport?', tip: 'Think about climbing up the slide.', all: [/active/, /low(er)? (concentration )?to high|against the (concentration )?gradient|up the (concentration )?gradient|up (a|the) slide/] },
            { done: 'You explained the energy difference.', q: 'Did you explain which one needs energy?', tip: 'Which kind of transport needs ATP?', re: /\batp\b|energy/ },
            { done: 'You gave examples.', q: 'Did you give an example of each?', tip: 'The video gives three examples of each kind of transport.', re: /diffusion|osmosis|pump|endocytosis|exocytosis|vesicle/ },
            { done: 'You wrote at least 3 sentences.', q: 'Did you write 3 to 5 sentences?', tip: 'Give each kind of transport its own sentence.', sentences: 3 }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 4 */
    {
      title: 'Cell signaling',
      intro: 'Watch the Intro to Cell Signaling video. It stops on its own 5 times and a question pops up. Answer each question to keep watching. Then open the reading and answer the questions below it.',
      clips: ['signaling'],
      read: '<p><b>Read: key ideas.</b> Cells “talk” to each other with signals. A <b>sending cell</b> releases a signal molecule, also called a <b>ligand</b>. The ligand binds to a <b>receptor</b>, often a protein on the surface of the target cell. Some receptors are inside the cell instead.</p>'
        + '<p>Ligands and receptors have a very specific fit, like a key in a lock. A <b>target cell</b> has the right receptor for the signal, so it responds. A <b>non-target cell</b> does not have that receptor, so it does not respond, even when the signal reaches it.</p>'
        + '<p>Cell signaling happens in three stages. <b>Reception:</b> the ligand binds the receptor. <b>Transduction:</b> the receptor is activated and changes shape, and the message is passed along by <b>chemical messengers</b> inside the cell. <b>Response:</b> the cell does something, such as making a protein.</p>'
        + '<p class="small">Reading adapted from the Cell Signaling activity by Andrea Bierema, Michigan State University.</p>',
      questions: [
        {
          at: 74,
          type: 'typed',
          text: 'The video says we will be talking a lot about one kind of molecule. What is the name of the molecule that a signal molecule can bind to?',
          accept: ['receptor', 'receptors', 'a receptor', 'the receptor', 'receptor protein', 'receptor proteins', 'a receptor protein'],
          okMsg: 'Correct. A receptor is a molecule, such as a protein, where a signal molecule can bind. Many receptors are on the surface of the cell membrane.',
          tip: 'Rewind to about 1:06 and listen for the word the video says we will be talking a lot about. (A ligand is the signal molecule itself.)',
          aria: 'Your answer'
        },
        {
          at: 117.5,
          type: 'choice',
          text: 'The video says the signal molecule can be considered a ligand. What does it say a ligand is?',
          options: ['The smaller molecule that binds to a typically larger molecule, such as a receptor', 'A large protein in the cell membrane that catches signals', 'The change a cell makes after it gets a signal', 'A connection between two cells that touch'],
          answer: 0,
          tip: 'Rewind to about 1:34. Listen for what “ligand” basically means, and whether it is smaller or larger than the molecule it binds.',
          explain: 'Right. A ligand is the smaller molecule that binds to a typically larger molecule. Signal molecules are ligands.'
        },
        {
          at: 157,
          type: 'order',
          text: 'The video gives the general sequence of cell signaling. Put the three stages in order.',
          items: ['Reception', 'Transduction', 'Response'],
          tip: 'Rewind to about 2:01. Listen for the stage the video calls “first.” What has to happen before the receptor can be activated?',
          explain: 'Right. First reception (a signal molecule binds a receptor), then transduction (the receptor gets activated), then a response.'
        },
        {
          at: 258.3,
          type: 'selects',
          text: 'Match each type of cell signaling to what the video says about it.',
          options: ['autocrine', 'endocrine', 'paracrine', 'synaptic'],
          items: [
            { label: 'A signal molecule diffuses to a nearby cell. The cells are close but need not be connected.', answer: 'paracrine', hint: 'Rewind to about 3:21. This is the first type of local signaling the video names.' },
            { label: 'Neurotransmitters carry the signal across a synapse.', answer: 'synaptic', hint: 'Rewind to about 3:40. The video calls this another example of local signaling.' },
            { label: 'A cell talks to a target cell far away. Signals such as hormones may be carried in the bloodstream.', answer: 'endocrine', hint: 'Rewind to about 3:50. Listen for the long-distance type.' },
            { label: 'A cell signals itself, such as a cell releasing its own growth factor.', answer: 'autocrine', hint: 'Rewind to about 4:02. The molecule binds to a receptor on the same cell that made it.' }
          ]
        },
        {
          at: 312,
          type: 'choice',
          text: 'Where can receptors be found?',
          options: ['Inside the cell, or on the surface of the cell membrane', 'Only inside the nucleus', 'Only floating in the bloodstream', 'Only on the outside of the cell wall'],
          answer: 0,
          tip: 'Rewind to about 4:36. In the steroid hormone example, where was the receptor? Then listen to what the video says right after.',
          explain: 'Right. Some receptors are inside the cell, like the one for the steroid hormone. Receptors are also often part of the cell membrane surface.'
        },
        {
          type: 'selects',
          text: 'Label the diagram. Match each letter to the correct label.',
          img: { src: '../explore-cell-signaling/media/signaling-diagram.svg', alt: 'Diagram of a cell. A small circle sits in a cup-shaped receptor on the cell membrane. Below it, two rounded boxes inside the cell are connected by arrows, and the last arrow points to a spiky burst. Letters A to D mark four parts.' },
          options: ['cell membrane', 'chemical messengers', 'ligand', 'receptor', 'response'],
          items: [
            { label: 'Label A', answer: 'ligand', hint: 'This is the signal molecule that arrives from outside the cell.' },
            { label: 'Label B', answer: 'receptor', hint: 'This protein sits in the cell membrane and catches the signal.' },
            { label: 'Label C', answer: 'chemical messengers', hint: 'These molecules pass the message along inside the cell.' },
            { label: 'Label D', answer: 'response', hint: 'This is what the cell does at the end of the chain of events.' }
          ]
        },
        {
          type: 'written',
          text: 'A hormone is released into the bloodstream, so it reaches almost every cell in the body. But only some cells respond to it. Explain why. Use the words ligand, receptor, and response. (3 to 5 sentences)',
          starters: ['In cell signaling, the hormone is called a …', 'A cell can only respond if …', 'The video says ligands and receptors have …', 'Cells that do not respond …'],
          min: 120,
          ideas: [
            { done: 'You called the hormone a ligand or signal.', q: 'Did you say what the hormone is in cell signaling?', tip: 'In cell signaling, what is another name for the signal molecule?', all: [/hormone|\bit\b/, /ligand|signal(ing)? molecule/] },
            { done: 'You said a cell needs the right receptor.', q: 'Did you say what a cell needs in order to respond?', tip: 'What does the ligand have to bind to?', all: [/receptor/, /\bonly\b|right|matching|correct|specific|fits?\b|\bneeds?\b|target/] },
            { done: 'You explained the specific fit.', q: 'Did you explain why the hormone only binds some receptors?', tip: 'The video and reading say ligands and receptors have a very specific fit. What does that compare to?', re: /specific|lock|\bkey\b|shape|fits?\b|match/ },
            { done: 'You explained why other cells do not respond.', q: 'Did you explain the cells that do not respond?', tip: 'What is missing on a non-target cell?', re: /non[- ]?target|(do|does)(n.t| not) have (a |the |that |any )?(right |matching |correct )?receptor|without (a |the |that )?(right |matching )?receptor|no receptor|lack|(won.t|cannot|can.t|does not|doesn.t) (bind|fit|attach)/ },
            { done: 'You wrote at least 3 sentences.', q: 'Did you write 3 to 5 sentences?', tip: 'Add a sentence that explains the response.', sentences: 3 }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 5 */
    {
      title: 'Enzymes',
      intro: 'Watch the Enzymes video. It stops on its own 5 times and a question pops up. Answer each question to keep watching. Then open the reading and answer the questions below it.',
      clips: ['enzymes'],
      read: '<p><b>Read: key ideas.</b> Most <b>enzymes</b> are proteins. An enzyme has a specifically shaped area called the <b>active site</b>. The molecules that bind there are called <b>substrates</b>. The enzyme builds up or breaks down the substrates, and the result is called the <b>product</b>.</p>'
        + '<p>Enzymes speed up reactions. They are <b>catalysts</b>, which means they are not used up and can be used over and over. Enzyme names often end in <b>-ase</b> (lactase), and many sugar names end in <b>-ose</b> (lactose). <b>Cofactors</b> and <b>coenzymes</b> are helpers that help the enzyme do its job.</p>'
        + '<p>Each enzyme has an ideal range of temperature and pH. If the conditions go outside that range, the enzyme can become <b>denatured</b>. Its shape becomes distorted, so it can no longer bind its substrate or work correctly.</p>',
      questions: [
        {
          at: 52,
          type: 'choice',
          text: 'The video says “P for Pac-Man and P for…” what? What kind of molecule are most enzymes?',
          options: ['Proteins', 'Sugars', 'Lipids (fats)', 'DNA'],
          answer: 0,
          tip: 'Rewind to about 0:46 and listen for what the second P stands for.',
          explain: 'Right. Most enzymes are proteins.'
        },
        {
          at: 93,
          type: 'choice',
          text: 'What does the video say happens during induced fit?',
          options: ['The active site changes its shape even more to bind the substrate perfectly.', 'The enzyme is used up and disappears.', 'The substrate turns into an enzyme.', 'The enzyme breaks apart.'],
          answer: 0,
          tip: 'Rewind to about 1:24. Think about the “enzyme-substrate hug.”',
          explain: 'Right. In induced fit, the active site changes shape even more to bind the substrate perfectly.'
        },
        {
          at: 102,
          type: 'selects',
          text: 'Match each enzyme word to its meaning.',
          options: ['Active site', 'Substrate', 'Product'],
          items: [
            { label: 'The specifically shaped area of the enzyme where items can bind', answer: 'Active site', hint: 'Rewind to about 0:57. Listen for the name of the shaped area.' },
            { label: 'The items that bind to the enzyme', answer: 'Substrate', hint: 'Rewind to about 1:04. Listen for the name of the items that bind.' },
            { label: 'The resulting item after the enzyme builds up or breaks down the substrate', answer: 'Product', hint: 'Rewind to about 1:35 and listen for the name of the resulting item.' }
          ]
        },
        {
          at: 197,
          type: 'choice',
          text: 'Why does the video call enzymes catalysts?',
          options: ['They are not used up, so they can be used over and over in the reaction.', 'They slow reactions down.', 'They are used up after one reaction.', 'They are a kind of sugar.'],
          answer: 0,
          tip: 'Rewind to about 2:58. What happens to the lactase after it breaks down lactose?',
          explain: 'Right. Enzymes are catalysts. They speed up reactions and are not used up, so they can be used over and over.'
        },
        {
          at: 298,
          type: 'choice',
          text: 'What does it mean when an enzyme becomes denatured?',
          options: ['Its shape becomes distorted, so it can no longer bind to its substrate.', 'It works faster than before.', 'It gets help from a coenzyme.', 'It turns into a substrate.'],
          answer: 0,
          tip: 'Rewind to about 4:50. Think about what happens to Pac-Man’s shape when a ghost touches him.',
          explain: 'Right. A denatured enzyme has a distorted shape, so it can no longer bind its substrate and cannot work correctly.'
        },
        {
          type: 'selects',
          text: 'Your digestive system uses many enzymes. Match each enzyme to the substrate it breaks down.',
          options: ['Lactose (milk sugar)', 'Lipids (fats)', 'Proteins', 'Starch'],
          items: [
            { label: 'Lactase', answer: 'Lactose (milk sugar)', hint: 'Enzyme names often end in -ase, and sugar names end in -ose. Compare the start of the words.' },
            { label: 'Lipase', answer: 'Lipids (fats)', hint: 'Compare the start of the word with the choices. Rewatch the video at about 3:22.' },
            { label: 'Amylase', answer: 'Starch', hint: 'Rewatch the video at about 3:25.' },
            { label: 'Protease', answer: 'Proteins', hint: 'Compare the start of the word with the choices.' }
          ]
        },
        {
          type: 'multi',
          text: 'Which changes could cause an enzyme to become denatured? Choose all that apply.',
          options: ['The temperature goes outside the enzyme’s ideal range.', 'The pH goes outside the enzyme’s ideal range.', 'A coenzyme helps the enzyme.', 'More substrate is added.'],
          answers: ['The temperature goes outside the enzyme’s ideal range.', 'The pH goes outside the enzyme’s ideal range.'],
          rules: [{ any: ['A coenzyme helps the enzyme.', 'More substrate is added.'], tip: 'Denaturing happens when the enzyme’s environment leaves its ideal conditions. Does that choice change the conditions?' }],
          tip: 'There are two right answers. Rewatch the video at about 4:36.',
          explain: 'Right. If the temperature or pH goes outside an enzyme’s ideal range, the enzyme can become denatured.'
        },
        {
          type: 'written',
          text: 'Some people are lactose intolerant, and milk makes them sick. Explain why. Use the words enzyme, substrate, and product in your answer. (3 to 5 sentences)',
          starters: ['In the video, lactase …', 'The substrate of lactase is …', 'When lactase breaks down lactose, the products are …', 'A person who is lactose intolerant …'],
          min: 120,
          ideas: [
            { done: 'You named lactase as the enzyme.', q: 'Did you name the enzyme?', tip: 'Which enzyme does the video use as its real life example?', all: [/lactase/, /enzyme/] },
            { done: 'You named lactose as the substrate.', q: 'Did you name the substrate?', tip: 'What molecule binds to lactase and gets broken down?', all: [/lactose|milk sugar/, /substrate/] },
            { done: 'You described the product.', q: 'Did you describe the product?', tip: 'The video says lactase breaks lactose into something our body can use. What are the pieces like?', all: [/product/, /small|parts?|pieces|digest|two sugars|simpl|glucose|galactose|broken/] },
            { done: 'You explained what goes wrong.', q: 'Did you explain what goes wrong for a lactose intolerant person?', tip: 'What does the video say these people do not produce enough of?', re: /(not|n.t|no|little|less|lack|without|low) [^.!?]*(enough )?(lactase|enzyme)|(can.t|cannot|unable|not able) [^.!?]*(break|digest)/ },
            { done: 'You wrote at least 3 sentences.', q: 'Did you write 3 to 5 sentences?', tip: 'Add a sentence that explains why the person gets sick.', sentences: 3 }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 6 */
    {
      title: 'Put it all together',
      intro: 'There is no video in this part. Read about Jordan’s race, and use what you learned in Parts 1 to 5 to answer the questions.',
      read: '<p><b>Read: Jordan runs a race.</b> Jordan is running a 5K race on a hot afternoon. Here is what is happening inside Jordan’s body as Jordan runs:</p>'
        + '<ol>'
        + '<li>Jordan’s body temperature starts to rise. Sweat glands release sweat, and the sweat cools Jordan’s skin.</li>'
        + '<li>Oxygen moves from Jordan’s blood, where there is a lot of it, into the muscle cells, where there is less. No energy is needed.</li>'
        + '<li>Glucose (sugar) moves from the blood into the muscle cells through a transport protein, from high concentration to low concentration.</li>'
        + '<li>The muscle cells use ATP to pump sodium ions out of the cell, against the concentration gradient.</li>'
        + '<li>Jordan’s adrenal glands release the hormone adrenaline. It travels through the bloodstream to cells all over the body.</li>'
        + '<li>Inside the muscle cells, enzymes speed up the reactions that break down glucose and release energy. The enzymes are not used up.</li>'
        + '</ol>',
      questions: [
        {
          type: 'selects',
          text: 'Match each numbered event in Jordan’s race to the idea it shows.',
          options: ['Negative feedback', 'Positive feedback', 'Simple diffusion', 'Facilitated diffusion', 'Active transport', 'Endocrine signaling', 'Enzymes as catalysts'],
          items: [
            { label: 'Event 1: sweating cools Jordan down', answer: 'Negative feedback', hint: 'Does sweating make Jordan hotter and hotter, or bring the temperature back? Look back at Part 2.' },
            { label: 'Event 2: oxygen moves into the muscle cells', answer: 'Simple diffusion', hint: 'It moves from high to low with no energy and no help. Look back at Part 3.' },
            { label: 'Event 3: glucose moves in through a transport protein', answer: 'Facilitated diffusion', hint: 'It moves from high to low, but it needs help from a protein. Look back at Part 3.' },
            { label: 'Event 4: sodium ions are pumped out using ATP', answer: 'Active transport', hint: 'It moves against the concentration gradient and uses energy. Look back at Part 3.' },
            { label: 'Event 5: adrenaline travels through the bloodstream', answer: 'Endocrine signaling', hint: 'Which type of signaling uses hormones that travel long distances? Look back at Part 4.' },
            { label: 'Event 6: enzymes speed up reactions and are not used up', answer: 'Enzymes as catalysts', hint: 'Look back at Part 5. What is the word for something that speeds up a reaction and can be used over and over?' }
          ]
        },
        {
          type: 'choice',
          text: 'Jordan’s muscle cells need a lot of energy to keep running. Which organelle breaks down sugar and releases the energy as ATP?',
          options: ['Mitochondria', 'Ribosomes', 'Golgi apparatus', 'Lysosomes'],
          answer: 0,
          tip: 'Look back at the reading in Part 1. Which organelle releases energy the cell can use?',
          explain: 'Right. Mitochondria break down sugar and release energy as ATP. Active muscle cells have many mitochondria.'
        },
        {
          type: 'choice',
          text: 'Adrenaline reaches cells all over Jordan’s body, but only some of them respond. Why?',
          options: ['Only target cells have a receptor that fits adrenaline.', 'Adrenaline is too big to reach most cells.', 'Only cells with a nucleus can respond.', 'Adrenaline only works on cells near the adrenal glands.'],
          answer: 0,
          tip: 'Look back at the reading in Part 4. What does a cell need in order to respond to a signal?',
          explain: 'Right. A cell responds only if it has the right receptor for that ligand.'
        },
        {
          type: 'highlight',
          cer: true,
          from: 'the videos in Parts 2 and 5',
          text: 'Jordan keeps running in the heat, and Jordan’s body temperature climbs to 104°F (about 40°C). Is this dangerous for Jordan’s cells? Make a claim. Support it with evidence about homeostasis and enzymes. Then explain your reasoning: how does keeping body temperature in a range protect the enzymes in Jordan’s cells? (5 to 7 sentences)',
          starters: ['I claim that a body temperature of 104°F is …', 'According to the Homeostasis video, …', 'The Enzymes video says that if an enzyme’s environment …', 'This matters because an enzyme’s shape …', 'Jordan’s body fights back by …'],
          min: 220,
          ideas: [
            { done: 'You explained homeostasis or a healthy range.', q: 'Did you use homeostasis in your evidence?', tip: 'The Homeostasis video says body temperature can change a little. What does it have to stay within?', re: /range|set ?point|stable|stabiliz|balance|dynamic equilibrium|98\.6/ },
            { done: 'You explained denaturing.', q: 'Did you say what can happen to the enzymes?', tip: 'What does the Enzymes video say happens when the temperature leaves an enzyme’s ideal range?', re: /denatur|distort|los(e|es|t) (its|their) shape|shape (changes|is changed|gets|becomes)|change (its|their) shape/ },
            { done: 'You connected shape to the active site or substrate.', q: 'Did you explain why the enzyme’s shape matters?', tip: 'What can a distorted enzyme no longer do with its substrate?', re: /active site|substrate|bind|fit|(can.t|cannot|won.t|no longer|unable to|not) (work|do (its|their) job|function|speed)/ },
            { done: 'You used negative feedback or sweating.', q: 'Did you explain how Jordan’s body fights back?', tip: 'What negative feedback response from Part 2 brings body temperature back down?', re: /sweat|negative feedback|cool(s|ing)? (down|off|the)|counter ?response/ },
            { done: 'You used transition words to point to your evidence.', q: 'Did you use transition words to point to your evidence?', tip: 'Introduce your evidence with words like “According to the video,” “For example,” or “This shows that.”', writing: true, re: /for example|for instance|according to|this shows|that shows|which shows|shows that|in the video|the video (says|said|shows|showed|explains|explained|mentions|mentioned)|such as|this means|because of this|therefore/ }
          ]
        }
      ]
    }
  ]
};
