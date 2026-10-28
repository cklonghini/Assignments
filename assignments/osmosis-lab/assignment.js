/*
  Osmosis Lab (Biology A)
  Everything a student sees is written in this file. The shared engine in /engine builds the page,
  progress bars, PDF printout, and Listen buttons from it.
  Students do the gummy bear osmosis lab at home with the kit that was mailed to them. Built like the other labs
  (sheep-brain-dissection, heart-dissection), with a lighter setup step: no apron or goggles, just a setup check,
  a hypothesis, and a photo. There are no Orbeez in this lab, only gummy bears.
  Part 1 is the Amoeba Sisters video "Osmosis and Water Potential (Updated)" with questions inside it. The video is cut
  to 0:00-7:16. The water potential section after that (pressure potential, potato cores, turgor pressure) is left out
  because this lab does not use it. Captions come from the teacher's pasted transcript (source/osmosis-amoeba-sisters.vtt).
  PLACEHOLDERS: the teacher's own lab video (Part 3, watched before the experiment starts) and the video for the
  24-hour check (Part 4) are not here yet. When the lab video comes, add it as video: { ..., afterPart: 2 } and
  take out the "coming soon" lines in Parts 3 and 4.
  Sources (in source/, not saved to GitHub): Osmosis_Lab.pdf (the classroom handout, "Orbeez or Gummy Bears"),
  the Amoeba Sisters video, and an osmosis rap video that is not used yet.
  Write *scientific names* between asterisks to show them in italics. Reading boxes and tables use HTML.
  Full guide: docs/ASSIGNMENT_FORMAT.md
*/
var KIT = '<p><b>No lab kit?</b> If you did not get your lab kit, or something is missing from it, let your teacher of record (TOR) know right away so they can get a kit to you. You still do this lab: watch all of the videos, and anywhere you are asked for a photo, add a screenshot of one of the pictures from the videos instead.</p>';

window.ASSIGNMENT = {
  title: 'Osmosis Lab',
  course: 'Biology A',
  storageKey: 'osmosis-lab-v1',

  icon: '<svg viewBox="0 0 64 72" aria-hidden="true" focusable="false">'
    + '<circle cx="20" cy="11" r="7" fill="var(--ligand)"/><circle cx="44" cy="11" r="7" fill="var(--ligand)"/>'
    + '<circle cx="32" cy="22" r="15" fill="var(--ligand)"/>'
    + '<ellipse cx="32" cy="49" rx="17" ry="19" fill="var(--ligand)"/>'
    + '<ellipse cx="13" cy="42" rx="6" ry="9" fill="var(--ligand)"/><ellipse cx="51" cy="42" rx="6" ry="9" fill="var(--ligand)"/>'
    + '<ellipse cx="20" cy="66" rx="8" ry="6" fill="var(--ligand)"/><ellipse cx="44" cy="66" rx="8" ry="6" fill="var(--ligand)"/>'
    + '<circle cx="26" cy="20" r="2.2" fill="var(--primary-ink)"/><circle cx="38" cy="20" r="2.2" fill="var(--primary-ink)"/>'
    + '<ellipse cx="32" cy="27" rx="4" ry="3" fill="var(--primary-ink)"/></svg>',

  /* No full video at the top yet. The teacher's lab video will go here (afterPart: 2) when it is ready. */
  start: {
    heading: 'How this lab works',
    intro: 'In this lab you will use gummy bears to see osmosis in action. Part 1: watch an Amoeba Sisters video about osmosis and answer the questions that pop up in it. Part 2: use an interactive diagram to see what happens to a cell in hypotonic, isotonic, and hypertonic solutions. Part 3: set up your gummy bear experiment and write your hypothesis. Part 4: come back about 24 hours later, measure your gummy bears again, and explain your results.',
    after: 'No lab kit? If you did not get your lab kit, or something is missing from it, let your teacher of record (TOR) know right away so they can get a kit to you. You still do this lab: watch all of the videos, and anywhere you are asked for a photo, add a screenshot of one of the pictures from the videos instead.'
  },

  clips: {
    /* Part 1: the Amoeba Sisters video, cut before the water potential section */
    amoeba: { src: 'media/clip-amoeba.mp4', from: 0, to: 435.9, seconds: 436, title: 'Osmosis (Amoeba Sisters)',
              of: 'Osmosis and Water Potential (Updated)', whole: true },
    tonic:  { src: 'media/clip-tonic.mp4', from: 215.0, to: 337.0, seconds: 122, title: 'Hypertonic, hypotonic, and isotonic, and the IV example',
              of: 'Osmosis and Water Potential (Updated)' },
    fish:   { src: 'media/clip-fish.mp4', from: 337.0, to: 414.0, seconds: 77, title: 'A saltwater fish in a freshwater tank',
              of: 'Osmosis and Water Potential (Updated)' }
  },

  parts: [
    /* ---------------------------------------------------------------- Part 1 */
    {
      title: 'Before the lab: what is osmosis?',
      intro: 'Before you start the lab, watch this Amoeba Sisters video about osmosis. The video stops on its own 5 times and a question pops up. Answer each question to keep watching. You can rewind the video if you need to hear something again.',
      clips: ['amoeba'],
      questions: [
        {
          at: 85,
          type: 'choice',
          text: 'The video says the movement of water molecules across a cell membrane is passive transport. What does that mean?',
          options: ['It does not require energy', 'It requires energy from the cell', 'Only salt can cross the membrane', 'Water can never cross the membrane'], answer: 0,
          explain: 'Right. Passive transport does not require energy. Water molecules are so small that they can travel through the cell membrane, or through protein channels called aquaporins.',
          tip: 'Rewind to about 1:18 and listen for what passive transport “means.”'
        },
        {
          at: 199,
          type: 'choice',
          text: 'In the U-tube, salt is dumped into side B. The membrane lets water through but not salt. Which way does the water move at first?',
          options: ['Toward side B, where there is more salt', 'Toward side A, where there is no salt', 'It does not move at all', 'The salt moves to side A instead'], answer: 0,
          explain: 'Right. Side B has a higher solute concentration, so water moves to side B. The water level on side B gets higher.',
          tip: 'Rewind to about 1:58. The video says to look to the side with the greater solute concentration.'
        },
        {
          at: 250,
          type: 'selects',
          text: 'Side B of the U-tube has more salt than side A. Choose the word the video uses for each side.',
          options: ['Hypertonic', 'Hypotonic'],
          items: [
            { label: 'Side B (higher solute concentration)', answer: 'Hypertonic', hint: 'Rewind to about 3:35. Listen for the word that “means higher solute concentration.”' },
            { label: 'Side A (lower solute concentration)', answer: 'Hypotonic', hint: 'Rewind to about 4:00. The video gives a trick: this word rhymes with “low.”' }
          ]
        },
        {
          at: 334.4,
          type: 'choice',
          text: 'Suppose pure water ran through an IV into someone’s blood. What does the video say would happen to the red blood cells?',
          options: ['They would swell and possibly burst', 'They would shrink', 'They would stay the same size', 'They would turn into salt'], answer: 0,
          explain: 'Right. The red blood cells have more solutes than pure water, so water moves into the cells. They swell and could burst. That is why IV fluid is isotonic to blood plasma: equal concentration, so no swelling or shrinking.',
          tip: 'Rewind to about 4:58. Where does the water go, and what happens to a cell that fills with water?'
        },
        {
          at: 377,
          type: 'choice',
          text: 'A saltwater fish is put into a freshwater tank. Where does the water go?',
          options: ['Into the cells of the saltwater fish', 'Out of the cells of the saltwater fish', 'Nowhere, because the fish is isotonic to fresh water', 'Into the salt'], answer: 0,
          explain: 'Right. The fish’s cells have a higher solute concentration than the fresh water, so the cells are the hypertonic side. Water goes into the cells of that poor saltwater fish.',
          tip: 'Rewind to about 5:49. First ask where there is a higher solute concentration, like the video does.'
        },
        {
          type: 'selects',
          text: 'Background. Complete each sentence about osmosis.',
          items: [
            { label: 'Osmosis is the movement of _____ through a semipermeable membrane.', options: ['water', 'salt', 'sugar'], answer: 'water', hint: 'Think about the definition at about 1:00 in the video. Salt could not get through the U-tube membrane.' },
            { label: 'Water moves from an area of _____ water concentration…', options: ['high', 'low'], answer: 'high', hint: 'Listen again at about 1:25.' },
            { label: '…to an area of _____ water concentration.', options: ['high', 'low'], answer: 'low', hint: 'Listen again at about 1:25. Water moves to the side with more solute, so less room for water.' },
            { label: 'A hypotonic solution has _____ solute than the cell.', options: ['less', 'more', 'the same amount of'], answer: 'less', hint: '“Hypo” rhymes with a word the video uses.' },
            { label: 'A hypertonic solution has _____ solute than the cell.', options: ['less', 'more', 'the same amount of'], answer: 'more', hint: 'Rewind to about 3:35. Think of “hyper” as over or above.' },
            { label: 'An isotonic solution has _____ solute as the cell.', options: ['less', 'more', 'the same amount of'], answer: 'the same amount of', hint: 'Rewind to about 5:29 and listen for what “isotonic” means.' }
          ]
        },
        {
          type: 'choice',
          text: 'At the end of the clip, the video explains how plants get water into their roots. Why does water move from rain-soaked soil into the root hair cells?',
          options: ['The root hair cells have a higher solute concentration than the soil', 'The soil has a higher solute concentration than the root hair cells', 'The root hair cells use energy to pump water in', 'The soil and the root cells are isotonic'], answer: 0,
          explain: 'Right. The root hair cells are hypertonic compared to the hypotonic soil, so water travels into the root cells.',
          tip: 'Rewind to about 7:01. Which has more solutes: the root hair cells or the saturated soil?'
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 2 */
    {
      title: 'Hypotonic, isotonic, and hypertonic',
      intro: 'Use the interactive diagram to see what happens to a cell in three kinds of solutions. You will use the same ideas to explain what happens to your gummy bears.',
      clips: ['tonic'],
      read: '<p><b>Read:</b> A solution is always described <b>compared to</b> something else. In this lab, we compare the solution outside the cell to the inside of the cell.</p><ul>'
        + '<li><b>Hypotonic solution:</b> the solution has a <b>lower</b> solute concentration than the cell (hypo rhymes with low). Water moves <b>into</b> the cell, and the cell swells. A red blood cell in pure water swells and can burst.</li>'
        + '<li><b>Isotonic solution:</b> the solution has an <b>equal</b> solute concentration. Water still moves, but it moves in and out equally, so there is no net movement. The cell stays the same size. This is why IV fluid is isotonic to blood plasma.</li>'
        + '<li><b>Hypertonic solution:</b> the solution has a <b>higher</b> solute concentration than the cell. Water moves <b>out of</b> the cell, and the cell shrinks. This is why salt from a road can kill the plants along the roadside: water leaves their cells.</li></ul>'
        + '<p>The easy rule from the video: to figure out where water will travel, look to the side with the <b>greater solute concentration</b>. Water moves to the hypertonic side.</p>'
        + '<p><b>Your gummy bears:</b> A gummy bear is made of sugar and gelatin, so it is full of solutes. It acts like a big “cell” in your experiment. Plain water has no solutes at all.</p>',
      questions: [
        {
          type: 'tonicity',
          text: 'Interactive diagram. First, move the slider to change how much solute is in the water outside the cell, and watch what the water does. Then, for each cell below, choose the answers in all three menus. When all three are right, the cell shows what happens.',
          cell: 2,
          items: [
            { name: 'Cell 1', who: 'A red blood cell in pure water (like the IV example)', outside: 0 },
            { name: 'Cell 2', who: 'A plant cell next to a road that was salted in winter', outside: 4, inside: 1 },
            { name: 'Cell 3', who: 'A red blood cell in IV fluid that matches blood plasma', outside: 2 },
            { name: 'Cell 4', who: 'A root hair cell in soil soaked with rain', outside: 1, inside: 3 }
          ]
        },
        {
          type: 'typed',
          text: 'Fill in the blank: In osmosis, water moves to the side with the higher _____ concentration.',
          accept: ['solute', 'solutes'],
          tip: 'It is the word for substances, like salt or sugar, that can be dissolved in water. Look at the last paragraph of the reading.',
          aria: 'The missing word'
        },
        {
          type: 'choice',
          text: 'Cup A in your lab has plain water. The gummy bear is full of sugar. Compared to the gummy bear, the plain water is:',
          options: ['Hypotonic', 'Isotonic', 'Hypertonic'], answer: 0,
          explain: 'Right. Plain water has a lower solute concentration than the gummy bear, so it is hypotonic to the gummy bear. Water should move into the gummy bear.',
          tip: 'Plain water has no solutes. Which word in the reading means a lower solute concentration than the cell?'
        },
        {
          type: 'choice',
          text: 'Why does a hospital IV hold a solution that is isotonic to blood plasma instead of pure water?',
          options: ['So the red blood cells do not swell or shrink', 'So the red blood cells take in as much water as they can', 'So the red blood cells shrink and fit through the vein', 'Because pure water costs more'], answer: 0,
          explain: 'Right. Isotonic means equal concentration, so water moves in and out equally and the red blood cells keep their size.',
          tip: 'Rewatch the clip from 5:18 to the end. What does “isotonic” mean, and what does that do to the cells?'
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 3 */
    {
      title: 'Set up your lab and make a hypothesis',
      gate: true,                 // Part 4 and the Finish section stay hidden until everything here is done
      intro: 'Do this part when you are ready to start your experiment. You will set up your cups, make a hypothesis, measure your gummy bears, and put them in the water. Part 4 opens when you finish this part.',
      read: KIT
        + '<p><b>Watch the lab video first.</b> <i>Coming soon: your teacher will add the lab video here. Watch the whole video before you start your experiment.</i> You may hear about Orbeez in the video. This lab uses only gummy bears, so skip anything about Orbeez.</p>'
        + '<p><b>Purpose:</b> Find out how water moves across a semipermeable barrier by watching how gummy bears change size in water with different amounts of salt.</p>'
        + '<p><b>Check your kit.</b> You need:</p><ul>'
        + '<li>4 gummy bears</li><li>4 clear cups</li><li>Water and table salt</li><li>A ruler with millimeters (mm)</li><li>A marker</li><li>Paper towels and a spoon</li></ul>'
        + '<p><b>Make your solutions.</b> Label the cups A, B, C, and D with the marker. Put 1 cup (240 mL) of room-temperature water in each cup. Add the salt from the table below, and stir until it dissolves. These amounts are close enough for this lab.</p>'
        + '<p><b>Do it:</b> Follow these steps in order.</p><ol>'
        + '<li>Label your cups and make your four solutions.</li>'
        + '<li>Write your hypothesis below, before anything goes in the water.</li>'
        + '<li>Measure each gummy bear from the top of its head to the bottom of its feet, in millimeters. Write down which bear goes in which cup. Use the gummy bears straight from the bag.</li>'
        + '<li>Put one gummy bear in each cup. Write down the date and time.</li>'
        + '<li>Take a photo of your four cups with a gummy bear in each one.</li>'
        + '<li>Leave the cups somewhere safe for about 24 hours. Then come back for Part 4.</li></ol>'
        + '<p><b>Stay safe:</b> Do not eat the gummy bears or drink the salt water. Clean up any spills, and wash your hands when you finish.</p>',
      tableHtml: '<table><caption>Salt for each cup (per 1 cup, or 240 mL, of water)</caption>'
        + '<thead><tr><th scope="col">Cup</th><th scope="col">Solution</th><th scope="col">Salt to add</th></tr></thead><tbody>'
        + '<tr><td>A</td><td>0% (plain water)</td><td>No salt</td></tr>'
        + '<tr><td>B</td><td>Low (about 1%)</td><td>½ teaspoon</td></tr>'
        + '<tr><td>C</td><td>Medium (about 3%)</td><td>1¼ teaspoons</td></tr>'
        + '<tr><td>D</td><td>High (about 5%)</td><td>2 teaspoons</td></tr></tbody></table>',
      questions: [
        {
          type: 'selects',
          text: 'How much salt goes in each cup? Use the table.',
          options: ['No salt', '½ teaspoon', '1¼ teaspoons', '2 teaspoons'],
          hint: 'Find the cup’s row in the table, and read across to the “Salt to add” column.',
          items: [
            { label: 'Cup A (0%)', answer: 'No salt' },
            { label: 'Cup B (Low)', answer: '½ teaspoon' },
            { label: 'Cup C (Medium)', answer: '1¼ teaspoons' },
            { label: 'Cup D (High)', answer: '2 teaspoons' }
          ]
        },
        {
          type: 'selects',
          text: 'Variables. Choose the independent variable (what you change on purpose) and the dependent variable (what you measure) for this experiment.',
          options: ['The amount of salt in the water', 'The size of the gummy bear', 'The size of the cups', 'The time in the solution'],
          items: [
            { label: 'Independent variable', answer: 'The amount of salt in the water', hint: 'What is different from cup A to cup D? Look at the table.' },
            { label: 'Dependent variable', answer: 'The size of the gummy bear', hint: 'What do you measure with your ruler before and after?' }
          ]
        },
        {
          type: 'choice',
          text: 'Which of these should stay the same (be a constant) in every cup?',
          options: ['The amount of water and the time in the solution', 'The amount of salt', 'Nothing needs to stay the same', 'Only the color of the gummy bear'], answer: 0,
          explain: 'Right. Constants include the same model (gummy bears), the same amount of water, the same time in the solution, the same temperature, and the same cup size. Only the salt changes.',
          tip: 'A fair test changes only one thing. Which answer is the one thing that does change from cup to cup? It cannot be a constant.'
        },
        {
          type: 'written',
          text: 'Hypothesis. Before your gummy bears go in the water, predict what will happen to the gummy bear in each cup (A plain water, B low salt, C medium salt, D high salt) after about 24 hours. Explain why, using the word osmosis. (2 to 4 sentences)',
          starters: ['If a gummy bear is placed in plain water, then …', 'I think the gummy bear in cup D (high salt) will …', 'This will happen because during osmosis, water moves toward …', 'Compared to the gummy bear, the salt water in cup D is …'],
          min: 60,
          ideas: [
            { done: 'You made a prediction with If… then….', q: 'Did you write your prediction as “If…, then…”?', tip: 'A hypothesis often reads: “If (what you change), then (what you think will happen).”', re: /\bif\b[\s\S]*\bthen\b|\bi (think|predict)|\bwill\b/ },
            { done: 'You predicted what happens in plain water.', q: 'Did you predict what happens to the gummy bear in plain water (cup A)?', tip: 'Think about the interactive diagram. What does a cell do in a solution with a lower solute concentration?', re: /(plain|pure|no salt|cup a|\ba\b)[\s\S]*(grow|bigger|swell|larger|expand|gain|increase|absorb)|(grow|bigger|swell|larger|expand|gain|increase|absorb)[\s\S]*(plain|pure|no salt|cup a)/ },
            { done: 'You predicted what happens in salty water.', q: 'Did you predict what happens in the salty cups (B, C, or D)?', tip: 'Does more salt in the water help the gummy bear gain water, or not? Say what you think happens in cup D.', re: /salt|cup [bcd]|\b[bcd]\b/ },
            { done: 'You explained it with water moving.', q: 'Did you explain why, using osmosis and water moving?', tip: 'Use the rule from the video: water moves to the side with the greater solute concentration.', re: /osmosis|water (will )?(move|moves|moving|go|goes|travel|enter|leave|flow)|solute|concentration|hypotonic|hypertonic/ },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write 2 to 4 full sentences?', tip: 'Add another sentence that explains why.', sentences: 2 }
          ]
        },
        {
          type: 'numbers',
          text: 'Starting measurements. Measure each gummy bear from the top of its head to the bottom of its feet, before it goes in the water. (No kit? Use the measurements from the lab video.)',
          unit: 'mm',
          items: [
            { label: 'Cup A (0%) gummy bear', between: [5, 60], tip: 'Measure in millimeters (mm), not centimeters. A gummy bear is about 2 centimeters tall, and 1 centimeter is 10 millimeters.' },
            { label: 'Cup B (Low) gummy bear', between: [5, 60], tip: 'Measure in millimeters (mm), not centimeters. A gummy bear is about 2 centimeters tall, and 1 centimeter is 10 millimeters.' },
            { label: 'Cup C (Medium) gummy bear', between: [5, 60], tip: 'Measure in millimeters (mm), not centimeters. A gummy bear is about 2 centimeters tall, and 1 centimeter is 10 millimeters.' },
            { label: 'Cup D (High) gummy bear', between: [5, 60], tip: 'Measure in millimeters (mm), not centimeters. A gummy bear is about 2 centimeters tall, and 1 centimeter is 10 millimeters.' }
          ]
        },
        {
          type: 'agree',
          text: 'Check your setup. Check each box to show you did it.',
          items: [
            'I watched the lab video.',
            'My 4 cups are labeled A (0%), B (Low), C (Medium), and D (High).',
            'Each cup has 1 cup (240 mL) of room-temperature water, with the right amount of salt stirred in until it dissolved.',
            'I measured each gummy bear before it went in the water.',
            'I put one gummy bear in each cup, and I wrote down the date and time.',
            'My cups are in a safe place where no one will eat or drink them, and I will come back in about 24 hours.'
          ]
        },
        {
          type: 'photo',
          text: 'Take a photo of your experiment: your four labeled cups with one gummy bear in each. (No kit? Add a screenshot of the experiment from one of the videos.)',
          caption: 'Write the date and time you put the gummy bears in the water.',
          placeholder: 'For example: I started on Monday at 3:15 p.m.'
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 4 */
    {
      title: 'After 24 hours: measure and explain',
      intro: 'Wait about 24 hours after your gummy bears went in the water. Then come back to this page to measure them again and explain what happened.',
      clips: ['fish'],
      read: KIT
        + '<p><b>Watch:</b> <i>Coming soon: your teacher will add a video for this part here.</i></p>'
        + '<p><b>Do it:</b></p><ol>'
        + '<li>Take a look at your cups before you touch anything. What do you notice?</li>'
        + '<li>Use the spoon to take out one gummy bear at a time. Gently blot it on a paper towel.</li>'
        + '<li>Measure it the same way as before: from the top of its head to the bottom of its feet, in millimeters. Be gentle, because it may be soft.</li>'
        + '<li>Line up your gummy bears in front of their cups and take a photo.</li>'
        + '<li>Clean up: throw the gummy bears away (do not eat them), pour the salt water down the sink, rinse the cups, and wash your hands.</li></ol>'
        + '<p><b>Read:</b> A gummy bear that got bigger took in water. Its cup was hypotonic to it. A gummy bear that got smaller lost water. Its cup was hypertonic to it. A gummy bear that stayed the same size was in a solution that was about isotonic to it.</p>'
        + '<p><b>Connect to cells:</b> In the clip, a saltwater fish goes into fresh water, and water goes into its cells. It works the other way, too. When a living thing from fresh water is put in salty water, the salty water is the side with the greater solute concentration, so water leaves its cells.</p>',
      questions: [
        {
          type: 'numbers',
          text: 'Measurements after 24 hours. Measure each gummy bear again, the same way. (No kit? Use the measurements from the lab video.)',
          unit: 'mm',
          items: [
            { label: 'Cup A (0%) gummy bear', between: [3, 120], tip: 'Measure in millimeters (mm) from the top of the head to the bottom of the feet. 1 centimeter is 10 millimeters.' },
            { label: 'Cup B (Low) gummy bear', between: [3, 120], tip: 'Measure in millimeters (mm) from the top of the head to the bottom of the feet. 1 centimeter is 10 millimeters.' },
            { label: 'Cup C (Medium) gummy bear', between: [3, 120], tip: 'Measure in millimeters (mm) from the top of the head to the bottom of the feet. 1 centimeter is 10 millimeters.' },
            { label: 'Cup D (High) gummy bear', between: [3, 120], tip: 'Measure in millimeters (mm) from the top of the head to the bottom of the feet. 1 centimeter is 10 millimeters.' }
          ]
        },
        {
          type: 'photo',
          text: 'Take a photo of your gummy bears after 24 hours, lined up in front of their cups. (No kit? Add a screenshot of the gummy bears after 24 hours from one of the videos.)',
          caption: 'What do you notice? Which gummy bear changed the most?',
          placeholder: 'For example: The gummy bear from cup … looks …'
        },
        {
          type: 'selects',
          text: 'Use the reading. Choose the word that describes the cup’s solution, compared to the gummy bear.',
          options: ['Hypotonic', 'Isotonic', 'Hypertonic'],
          items: [
            { label: 'If the gummy bear got bigger, its cup was', answer: 'Hypotonic', hint: 'A bear that got bigger took in water. Water moves toward more solute, so which side had less solute?' },
            { label: 'If the gummy bear got smaller, its cup was', answer: 'Hypertonic', hint: 'A bear that got smaller lost water. Water moved out toward the side with more solute.' },
            { label: 'If the gummy bear stayed the same size, its cup was', answer: 'Isotonic', hint: 'No change in size means no net movement of water. Which word means equal?' }
          ]
        },
        {
          type: 'multi',
          text: 'Sources of error. Which of these could make your results less accurate? Choose all that are correct.',
          options: ['Measuring the gummy bears in a different way before and after', 'Not blotting the gummy bears dry before measuring', 'Salt that did not fully dissolve', 'Leaving some bears in the water longer than others', 'Using the same amount of water in every cup'],
          answers: ['Measuring the gummy bears in a different way before and after', 'Not blotting the gummy bears dry before measuring', 'Salt that did not fully dissolve', 'Leaving some bears in the water longer than others'],
          rules: [{ any: ['Using the same amount of water in every cup'], tip: 'Keeping something the same in every cup is a constant. Constants make a test fair. Do they cause error?' }],
          tip: 'There are more. Think about each step: making the solutions, timing, and measuring.',
          explain: 'Right. Each of these can change your numbers. To reduce error next time, measure the same way every time, blot each bear the same way, stir until the salt dissolves, and take every bear out at the same time.'
        },
        {
          type: 'choice',
          text: 'Connect to cells. A tiny single-celled protozoan that lives in fresh water is put into salty water. What happens?',
          options: ['Water moves out of its cell, and it shrinks', 'Water moves into its cell, and it swells', 'Nothing happens, because salt cannot cross a membrane', 'Salt moves into the cell, and it swells'], answer: 0,
          explain: 'Right. The salty water has a higher solute concentration than the protozoan, so the water is hypertonic to it. Water moves out of its cell and it shrinks, like a gummy bear that loses water.',
          tip: 'This is the opposite of the fish in the clip. Use the “Connect to cells” paragraph: which side has the greater solute concentration now?'
        },
        {
          type: 'highlight',
          cer: true,
          from: 'your measurements',
          text: 'In which cup did your gummy bear gain the most water, and in which cup did it gain the least water or lose water? Use your measurements as evidence, and explain your results using osmosis and the words hypotonic or hypertonic.',
          starters: ['The gummy bear in cup … gained the most water.', 'It started at … mm and ended at … mm.', 'This shows that …', 'This happened because the water in cup … was … compared to the gummy bear, so water moved …', 'My hypothesis was … because …'],
          min: 80,
          ideas: [
            { done: 'You named the cups.', q: 'Did you say which cup gained the most and which gained the least?', tip: 'Name the cups by letter or by how much salt they had.', re: /cup [abcd]|plain water|no salt|(low|medium|high) salt|0%|[135] ?%/ },
            { done: 'You used your measurements.', q: 'Did you use your numbers as evidence?', tip: 'Give the starting and ending size of a gummy bear in millimeters.', re: /\d/ },
            { done: 'You told which way the water moved.', q: 'Did you tell which way the water moved?', tip: 'Did water move into the gummy bear or out of it? Use the rule: water moves toward the greater solute concentration.', re: /water (moved|moves|move|went|goes|traveled|travels|entered|enters|left|leaves|came|flowed)|into the (gummy )?bear|out of the (gummy )?bear|absorb|gained water|lost water|took in/ },
            { done: 'You used hypotonic or hypertonic.', q: 'Did you use the words hypotonic or hypertonic?', tip: 'Compare each cup’s water to the gummy bear. Which word fits a cup with less solute than the bear?', re: /hypotonic|hypertonic|isotonic/ },
            { done: 'You talked about solute or salt concentration.', q: 'Did you explain it with solute (or salt and sugar) concentration?', tip: 'The gummy bear is full of sugar. How does that compare to the salt in each cup?', re: /solute|concentration|sugar|salt/ },
            { done: 'You wrote at least 3 sentences.', q: 'Did you write at least 3 full sentences?', tip: 'Add a sentence that explains how your evidence supports your claim.', sentences: 3 }
          ]
        }
      ]
    }
  ]
};
