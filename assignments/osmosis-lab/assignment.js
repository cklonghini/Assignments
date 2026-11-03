/*
  Osmosis Lab (Biology A)
  Everything a student sees is written in this file. The shared engine in /engine builds the page,
  progress bars, PDF printout, and Listen buttons from it.
  Students do the gummy bear osmosis lab at home with the kit that was mailed to them. Built like the other labs
  (sheep-brain-dissection, heart-dissection), with a lighter setup step: no apron or goggles, just a setup check,
  a hypothesis, and a photo. There are no Orbeez in this lab, only gummy bears. The teacher changed the handout's four salt
  cups to three cups: plain water, salt water, and sugar water (students use any sugar or syrup from home).
  Part 1 is the Amoeba Sisters video "Osmosis and Water Potential (Updated)" with questions inside it. The video is cut
  to 0:00-7:16. The water potential section after that (pressure potential, potato cores, turgor pressure) is left out
  because this lab does not use it. Captions come from the teacher's pasted transcript (source/osmosis-amoeba-sisters.vtt).
  Part 3 has the teacher's own lab setup video (clip "setup", whole: true) with questions inside it. Its captions were
  made from the teacher's pasted transcript (source/osmosis-lab-setup.vtt), with times spread between her time stamps.
  Amounts the teacher set for everyone: about 1 cup of water per cup, 3 tablespoons of salt, and 3 tablespoons of sugar
  (the video shows larger amounts; the reading tells students to use these). Her gummy bears started at 15 mm; students
  measure their own before the experiment and again after 24 hours.
  Part 4 has the teacher's 24-hour results video (clip "results"). The teacher had no transcript for it, so its captions
  (source/osmosis-lab-24h.vtt) are a draft made with offline speech-to-text and cleaned up by hand; a few muddy stretches
  near the start are marked [Audio unclear]. Her results (started at 15 mm): water 20 and 19 mm, sugar 17 and 16 mm,
  salt 9 and 10 mm. media/teacher-results.jpg is her photo of the bears after 24 hours.
  The storage key stays osmosis-lab-v3 on purpose: students are mid-experiment, and a new key would erase their
  starting measurements from Part 3.
  Sources (in source/, not saved to GitHub): Osmosis_Lab.pdf (the classroom handout, "Orbeez or Gummy Bears"),
  the Amoeba Sisters video, and an osmosis rap video that is not used yet.
  Write *scientific names* between asterisks to show them in italics. Reading boxes and tables use HTML.
  Full guide: docs/ASSIGNMENT_FORMAT.md
*/
var KIT = '<p><b>No lab kit?</b> If you did not get your lab kit, or something is missing from it, let your teacher of record (TOR) know right away so they can get a kit to you. You still do this lab: watch all of the videos, and anywhere you are asked for a photo, add a screenshot of one of the pictures from the videos instead.</p>';

window.ASSIGNMENT = {
  title: 'Osmosis Lab',
  course: 'Biology A',
  storageKey: 'osmosis-lab-v3',
  /* supported version (?support=eagle): the goal box at the top */
  essential: {
    question: 'How does water move by osmosis, and what happens to a gummy bear in plain water, salt water, and sugar water?',
    goals: [
      'Explain that in osmosis, water moves to the side with the greater solute concentration.',
      'Tell what happens to a cell in a hypotonic, isotonic, and hypertonic solution.',
      'Measure your gummy bears before and after 24 hours.',
      'Use your measurements to explain your results with the words hypotonic and hypertonic.'
    ]
  },

  icon: '<svg viewBox="0 0 64 72" aria-hidden="true" focusable="false">'
    + '<circle cx="20" cy="11" r="7" fill="var(--ligand)"/><circle cx="44" cy="11" r="7" fill="var(--ligand)"/>'
    + '<circle cx="32" cy="22" r="15" fill="var(--ligand)"/>'
    + '<ellipse cx="32" cy="49" rx="17" ry="19" fill="var(--ligand)"/>'
    + '<ellipse cx="13" cy="42" rx="6" ry="9" fill="var(--ligand)"/><ellipse cx="51" cy="42" rx="6" ry="9" fill="var(--ligand)"/>'
    + '<ellipse cx="20" cy="66" rx="8" ry="6" fill="var(--ligand)"/><ellipse cx="44" cy="66" rx="8" ry="6" fill="var(--ligand)"/>'
    + '<circle cx="26" cy="20" r="2.2" fill="var(--primary-ink)"/><circle cx="38" cy="20" r="2.2" fill="var(--primary-ink)"/>'
    + '<ellipse cx="32" cy="27" rx="4" ry="3" fill="var(--primary-ink)"/></svg>',

  /* No full video at the top. Each lab video sits in its own part as a whole clip. */
  /* startNote: shown in the yellow box in Start here */
  startNote: 'For this lab you need your lab kit and some sugar or syrup from home. No lab kit? If you did not get your lab kit, or something is missing from it, let your teacher of record (TOR) know right away so they can get a kit to you. You still do this lab: watch all of the videos, and anywhere you are asked for a photo, add a screenshot of one of the pictures from the videos instead.',

  clips: {
    /* Part 1: the Amoeba Sisters video, cut before the water potential section */
    amoeba: { src: 'media/clip-amoeba.mp4', from: 0, to: 435.9, seconds: 436, title: 'Osmosis (Amoeba Sisters)',
              of: 'Osmosis and Water Potential (Updated)', whole: true },
    tonic:  { support: false, src: 'media/clip-tonic.mp4', from: 215.0, to: 337.0, seconds: 122, title: 'Hypertonic, hypotonic, and isotonic, and the IV example',
              of: 'Osmosis and Water Potential (Updated)' },
    fish:   { support: false, src: 'media/clip-fish.mp4', from: 337.0, to: 414.0, seconds: 77, title: 'A saltwater fish in a freshwater tank',
              of: 'Osmosis and Water Potential (Updated)' },
    /* Part 3: the teacher's lab setup video */
    setup:  { src: 'media/osmosis-lab-setup.mp4', from: 0, to: 241.9, seconds: 242, title: 'Osmosis Lab Setup',
              of: 'Osmosis Lab Setup', whole: true },
    /* Part 4: the teacher's 24-hour results video */
    results: { src: 'media/osmosis-lab-results.mp4', from: 0, to: 158.4, seconds: 159, title: 'Osmosis Lab Results (After 24 Hours)',
               of: 'Osmosis Lab Results (After 24 Hours)', whole: true }
  },

  parts: [
    /* ---------------------------------------------------------------- Part 1 */
    {
      title: 'Before the lab: what is osmosis?',
      intro: 'Before you start the lab, watch this Amoeba Sisters video about osmosis. The video stops on its own 5 times and a question pops up. Answer each question to keep watching. You can rewind the video if you need to hear something again.',
      easyIntro: 'Before you start the lab, watch this Amoeba Sisters video about osmosis. The video stops on its own 2 times and a question pops up. Answer each question to keep watching. You can rewind the video if you need to hear something again.',
      clips: ['amoeba'],
      questions: [
        {
          at: 85,
          type: 'choice',
          support: false,
          text: 'The video says the movement of water molecules across a cell membrane is passive transport. What does that mean?',
          easy: 'The video says water crossing a cell membrane is passive transport. What does passive transport mean?',
          options: ['It does not require energy', 'It requires energy from the cell', 'Only salt can cross the membrane', 'Water can never cross the membrane'], answer: 0,
          explain: 'Right. Passive transport does not require energy. Water molecules are so small that they can travel through the cell membrane, or through protein channels called aquaporins.',
          tip: 'Rewind to about 1:18 and listen for what passive transport “means.”'
        },
        {
          at: 199,
          type: 'choice',
          text: 'In the U-tube, salt is dumped into side B. The membrane lets water through but not salt. Which way does the water move at first?',
          easy: 'Salt is added to side B of the U-tube. Only water can cross the membrane. Which way does the water move first?',
          options: ['Toward side B, where there is more salt', 'Toward side A, where there is no salt', 'It does not move at all', 'The salt moves to side A instead'], answer: 0,
          explain: 'Right. Side B has a higher solute concentration, so water moves to side B. The water level on side B gets higher.',
          tip: 'Rewind to about 1:58. The video says to look to the side with the greater solute concentration.'
        },
        {
          at: 250,
          type: 'selects',
          text: 'Side B of the U-tube has more salt than side A. Choose the word the video uses for each side.',
          easy: 'Side B has more salt. Side A has less salt. Pick the word for each side.',
          options: ['Hypertonic', 'Hypotonic'],
          items: [
            { label: 'Side B (higher solute concentration)', answer: 'Hypertonic', hint: 'Rewind to about 3:35. Listen for the word that “means higher solute concentration.”' },
            { label: 'Side A (lower solute concentration)', answer: 'Hypotonic', hint: 'Rewind to about 4:00. The video gives a trick: this word rhymes with “low.”' }
          ]
        },
        {
          at: 334.4,
          type: 'choice',
          support: false,
          text: 'Suppose pure water ran through an IV into someone’s blood. What does the video say would happen to the red blood cells?',
          easy: 'What would pure water in an IV do to red blood cells?',
          options: ['They would swell and possibly burst', 'They would shrink', 'They would stay the same size', 'They would turn into salt'], answer: 0,
          explain: 'Right. The red blood cells have more solutes than pure water, so water moves into the cells. They swell and could burst. That is why IV fluid is isotonic to blood plasma: equal concentration, so no swelling or shrinking.',
          tip: 'Rewind to about 4:58. Where does the water go, and what happens to a cell that fills with water?'
        },
        {
          at: 377,
          type: 'choice',
          support: false,
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
          support: false,
          text: 'At the end of the clip, the video explains how plants get water into their roots. Why does water move from rain-soaked soil into the root hair cells?',
          easy: 'Why does water move from wet soil into root hair cells?',
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
          easy: 'Move the slider and watch the water. Then pick all three answers for each cell. When all three are right, the cell moves.',
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
          support: false,
          text: 'Why does a hospital IV hold a solution that is isotonic to blood plasma instead of pure water?',
          easy: 'Why do hospitals use IV fluid that is isotonic to blood, and not pure water?',
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
      intro: 'Do this part when you are ready to start your experiment. First, watch your teacher set up the lab. The video stops on its own 4 times and a question pops up. Then you will set up your cups, make a hypothesis, measure your gummy bears, and put them in the water. Part 4 opens when you finish this part.',
      easyIntro: 'Do this part when you are ready to start your experiment. First, watch your teacher set up the lab. The video stops on its own 2 times and a question pops up. Then you will set up your cups, make a hypothesis, measure your gummy bears, and put them in the water. Part 4 opens when you finish this part.',
      clips: ['setup'],
      read: KIT
        + '<p><b>Use these amounts.</b> In the video, your teacher uses about a cup and a half of water and about a quarter cup of salt and sugar. For your lab, use <b>about 1 cup of water</b> in each cup, <b>3 tablespoons of salt</b>, and <b>3 tablespoons of sugar</b>. That way everyone’s lab is the same, and the salt and sugar amounts match.</p>'
        + '<p><b>Purpose:</b> Find out how water moves across a semipermeable barrier by watching how gummy bears change size in plain water, salt water, and sugar water.</p>'
        + '<p><b>Check your kit.</b> You need:</p><ul>'
        + '<li>3 gummy bears (if your kit has more, you only need 3)</li><li>3 clear cups</li><li>Water and table salt</li><li>A measuring tape or ruler with centimeters (cm) and millimeters (mm)</li><li>A tablespoon to measure with</li><li>A marker</li><li>Paper towels and a spoon</li></ul>'
        + '<p><b>Sugar from home:</b> You will need some sugar from your own house. It is not in the kit. You can use any kind of sugar you have, such as white sugar or brown sugar. It can also be a syrup, such as pancake syrup, maple syrup, corn syrup, simple syrup, a coffee syrup, or honey. Sugar packets work too (about 9 packets make 3 tablespoons). Use 3 tablespoons of whatever you choose, the same as the salt. No sugar or syrup at all? Fill cup C with about 1 cup of regular soda instead of water. It must be regular soda, because diet soda has no sugar.</p>'
        + '<p><b>Make your solutions.</b> Label the cups A, B, and C with the marker. Put about 1 cup of room-temperature water in each cup. Add what the table below says, and stir until it dissolves. It may take a minute. Salt water may look cloudy, and some sugar makes the water a little yellow. That is okay.</p>'
        + '<p><b>How to measure a gummy bear:</b> Use the centimeter side of your measuring tape (the side where the numbers are close together), not the inch side. Put the top of the gummy bear’s head at the 0 and read the line at the bottom of its feet. Each small line is 1 millimeter (mm), and there are 10 of them from 0 to 1 centimeter. So a bear that reaches halfway between the 1 and the 2 is 15 mm. Your teacher’s gummy bears started at 15 mm. Yours may be a different size, so measure your own.</p>'
        + '<p><b>Do it:</b> Follow these steps in order.</p><ol>'
        + '<li>Label your cups and make your three solutions.</li>'
        + '<li>Write your hypothesis below, before anything goes in the water.</li>'
        + '<li>Before the experiment starts, measure each gummy bear from the top of its head to the bottom of its feet, in millimeters. Write down which bear goes in which cup. Use the gummy bears straight from the bag.</li>'
        + '<li>Put one gummy bear in each cup. (In the video, your teacher puts 2 in each cup so she has extras to check. You only need 1.) Write down the date and time.</li>'
        + '<li>Take a photo of your three cups with a gummy bear in each one.</li>'
        + '<li>Leave the cups somewhere safe for about 24 hours. Then come back for Part 4.</li></ol>'
        + '<p><b>Stay safe:</b> Do not eat the gummy bears or drink the solutions. Clean up any spills, and wash your hands when you finish.</p>',
      tableHtml: '<table><caption>What goes in each cup (about 1 cup of water in each)</caption>'
        + '<thead><tr><th scope="col">Cup</th><th scope="col">Solution</th><th scope="col">What to add</th></tr></thead><tbody>'
        + '<tr><td>A</td><td>Plain water</td><td>Nothing</td></tr>'
        + '<tr><td>B</td><td>Salt water</td><td>3 tablespoons of salt</td></tr>'
        + '<tr><td>C</td><td>Sugar water</td><td>3 tablespoons of sugar, or 3 tablespoons of syrup</td></tr></tbody></table>',
      questions: [
        {
          at: 78,
          type: 'choice',
          text: 'Which side of the measuring tape should you use to measure your gummy bears?',
          easy: 'Which side of the measuring tape should you use?',
          options: ['The centimeter side, where the numbers are close together', 'The inch side, where the numbers are further apart', 'Either side, because they are the same', 'Neither side. Just guess the size.'], answer: 0,
          explain: 'Right. In scientific activities, you use the centimeter side. Its numbers are close together, and it is marked in millimeters, too.',
          tip: 'Rewind to about 0:55. Listen for which side you use “in scientific activities.”'
        },
        {
          at: 145,
          type: 'typed',
          support: false,
          text: 'Fill in the blank: On the centimeter side, there are 10 small lines between the 0 and the 1. Each of those small lines is one _____.',
          easy: 'Fill in the blank: Each small line between the 0 and the 1 is one _____.',
          accept: ['millimeter', 'millimeters', 'millimetre', 'millimetres', 'mm'],
          tip: 'Rewind to about 2:04. Listen for what your teacher calls “each one of those lines.”',
          aria: 'The missing word'
        },
        {
          at: 154,
          type: 'choice',
          text: 'Your teacher’s gummy bears started at 15 millimeters. What should you do with your gummy bears?',
          easy: 'Your teacher’s gummy bears were 15 mm. What should you do?',
          options: ['Measure my own gummy bears before they go in the water, because mine may be a different size', 'Write down 15 mm, because every gummy bear is the same size', 'Skip the first measurement and only measure after 24 hours', 'Measure them after they go in the water'], answer: 0,
          explain: 'Right. Your gummy bears may be bigger or smaller than your teacher’s. Measure each one before the experiment starts, and again after 24 hours, so you can see how much it changed.',
          tip: 'Rewind to about 2:24. Your teacher says yours “might be different.” How would you know your starting size?'
        },
        {
          at: 218,
          type: 'choice',
          support: false,
          text: 'Why does your teacher say to use the same amount of sugar as salt?',
          easy: 'Why use the same amount of sugar and salt?',
          options: ['To keep things constant in the experiment', 'So the gummy bears taste better', 'Because sugar and salt are the same thing', 'So the water turns cloudy'], answer: 0,
          explain: 'Right. Keeping the amounts the same keeps things constant, so it is a fair test. For your lab, everyone uses 3 tablespoons of each.',
          tip: 'Rewind to about 3:19 and listen to the end of what your teacher says about sugar.'
        },
        {
          type: 'selects',
          text: 'What goes in each cup? Use the table.',
          options: ['Nothing', '3 tablespoons of salt', '3 tablespoons of sugar or syrup'],
          hint: 'Find the cup’s row in the table, and read across to the “What to add” column.',
          items: [
            { label: 'Cup A (plain water)', answer: 'Nothing' },
            { label: 'Cup B (salt water)', answer: '3 tablespoons of salt' },
            { label: 'Cup C (sugar water)', answer: '3 tablespoons of sugar or syrup' }
          ]
        },
        {
          type: 'selects',
          support: false,
          text: 'Variables. Choose the independent variable (what you change on purpose) and the dependent variable (what you measure) for this experiment.',
          easy: 'Pick the independent variable (what you change) and the dependent variable (what you measure).',
          options: ['What is dissolved in the water (nothing, salt, or sugar)', 'The size of the gummy bear', 'The size of the cups', 'The time in the solution'],
          items: [
            { label: 'Independent variable', answer: 'What is dissolved in the water (nothing, salt, or sugar)', hint: 'What is different from cup A to cup C? Look at the table.' },
            { label: 'Dependent variable', answer: 'The size of the gummy bear', hint: 'What do you measure with your ruler before and after?' }
          ]
        },
        {
          type: 'choice',
          support: false,
          text: 'Which of these should stay the same (be a constant) in every cup?',
          options: ['The amount of water and the time in the solution', 'What is dissolved in the water', 'Nothing needs to stay the same', 'Only the color of the gummy bear'], answer: 0,
          explain: 'Right. Constants include the same model (gummy bears), the same amount of water, the same time in the solution, the same temperature, and the same cup size. Only what is dissolved in the water changes.',
          tip: 'A fair test changes only one thing. Which answer is the one thing that does change from cup to cup? It cannot be a constant.'
        },
        {
          type: 'written',
          text: 'Hypothesis. Before your gummy bears go in the water, predict what will happen to the gummy bear in each cup (A plain water, B salt water, C sugar water) after about 24 hours. Explain why, using the word osmosis. (2 to 4 sentences)',
          easy: 'Hypothesis. Before the gummy bears go in the water, predict what will happen in each cup (A plain water, B salt water, C sugar water). Tell why. Use the word osmosis. (2 to 4 sentences)',
          starters: ['If a gummy bear is placed in plain water, then …', 'I think the gummy bear in the salt water (cup B) will …', 'In the sugar water (cup C), I think the gummy bear will …', 'This will happen because during osmosis, water moves toward …'],
          min: 60,
          ideas: [
            { done: 'You predicted what happens in plain water.', q: 'Did you predict what happens to the gummy bear in plain water (cup A)?', tip: 'Think about the interactive diagram. What does a cell do in a solution with a lower solute concentration?', all: [/plain|pure|cup a\b/, /grow|bigger|swell|larger|expand|gain|increase|absorb|take in|takes in|soak/] },
            { done: 'You predicted what happens in salt water.', q: 'Did you predict what happens in the salt water (cup B)?', tip: 'Salt is a solute. Will the gummy bear gain more water, less water, or lose water than in plain water?', all: [/salt|cup b\b/, /grow|bigger|swell|larger|gain|shrink|smaller|lose|lost|stay the same|same size|not grow|won.?t grow|less|barely|a little/] },
            { done: 'You predicted what happens in sugar water.', q: 'Did you predict what happens in the sugar water (cup C)?', tip: 'The gummy bear is full of sugar, and so is cup C. Compare them. Will the gummy bear gain water, lose water, or stay about the same?', all: [/sugar|syrup|cup c\b/, /grow|bigger|swell|larger|gain|shrink|smaller|lose|lost|stay the same|same size|not grow|won.?t grow|less|barely|a little/] },
            { done: 'You explained it with water and solute concentration.', q: 'Did you explain why, using where the solute (salt or sugar) is?', tip: 'Use the rule from the video: water moves to the side with the greater solute concentration. Is that the gummy bear or the water?', all: [/water/, /solute|concentration|hypotonic|hypertonic|isotonic|more sugar|less sugar|more salt|less salt|saltier|sweeter/] },
            { done: 'You wrote your prediction as If… then….', q: 'Did you write your prediction as “If…, then…”?', tip: 'A hypothesis often reads: “If (what you change), then (what you think will happen).”', writing: true, re: /\bif\b[\s\S]*\bthen\b/ },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write 2 to 4 full sentences?', tip: 'Add another sentence that explains why.', sentences: 2 }
          ]
        },
        {
          type: 'numbers',
          text: 'Starting measurements. Before the experiment starts, measure each gummy bear from the top of its head to the bottom of its feet, in millimeters. Your teacher’s were 15 mm, but yours may be different. (No kit? Use 15 mm, the measurement from the lab video.)',
          easy: 'Measure each gummy bear from head to feet in millimeters (mm) before it goes in the water. (No kit? Use 15 mm, from the lab video.)',
          unit: 'mm',
          items: [
            { label: 'Cup A (plain water) gummy bear', between: [5, 60], tip: 'Measure in millimeters (mm), not centimeters. A gummy bear is about 2 centimeters tall, and 1 centimeter is 10 millimeters.' },
            { label: 'Cup B (salt water) gummy bear', between: [5, 60], tip: 'Measure in millimeters (mm), not centimeters. A gummy bear is about 2 centimeters tall, and 1 centimeter is 10 millimeters.' },
            { label: 'Cup C (sugar water) gummy bear', between: [5, 60], tip: 'Measure in millimeters (mm), not centimeters. A gummy bear is about 2 centimeters tall, and 1 centimeter is 10 millimeters.' }
          ]
        },
        {
          type: 'agree',
          text: 'Check your setup. Check each box to show you did it.',
          items: [
            'I watched the lab video.',
            'My 3 cups are labeled A (plain water), B (salt water), and C (sugar water).',
            'Each cup has about 1 cup of room-temperature water. I stirred 3 tablespoons of salt into cup B and 3 tablespoons of sugar or syrup into cup C until it dissolved.',
            'I measured each gummy bear in millimeters before it went in the water, and I wrote it down.',
            'I put one gummy bear in each cup, and I wrote down the date and time.',
            'My cups are in a safe place where no one will eat or drink them, and I will come back in about 24 hours.'
          ]
        },
        {
          type: 'photo',
          text: 'Take a photo of your experiment: your three labeled cups with one gummy bear in each. (No kit? Add a screenshot of the experiment from one of the videos.)',
          easy: 'Take a photo of your three labeled cups with a gummy bear in each. (No kit? Add a screenshot from one of the videos.)',
          caption: 'Write the date and time you put the gummy bears in the water. Also tell what kind of sugar or syrup you used.',
          placeholder: 'For example: I started on Monday at 3:15 p.m. I used …'
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 4 */
    {
      title: 'After 24 hours: measure and explain',
      intro: 'Wait about 24 hours after your gummy bears went in the water. Then come back to this page. First, watch your teacher measure her gummy bears. The video stops on its own 3 times and a question pops up. Then measure your own gummy bears again and explain what happened.',
      easyIntro: 'Wait about 24 hours after your gummy bears went in the water. Then come back to this page. First, watch your teacher measure her gummy bears. The video stops on its own 2 times and a question pops up. Then measure your own gummy bears again and explain what happened.',
      clips: ['results', 'fish'],
      images: [ { src: 'media/teacher-results.jpg', alt: 'Your teacher’s gummy bears after 24 hours, two from each cup, on a paper towel with three rows labeled water, sugar, and salt.', caption: 'Your teacher’s gummy bears after 24 hours. Compare the sizes in each row.' } ],
      read: KIT
        + '<p><b>Do it:</b></p><ol>'
        + '<li>Take a look at your cups before you touch anything. What do you notice?</li>'
        + '<li>Use the spoon to take out one gummy bear at a time. Gently blot it on a paper towel.</li>'
        + '<li>Measure it the same way as before: on the centimeter side, from the top of its head (at the 0) to the bottom of its feet, in millimeters. Be gentle, because it may be soft.</li>'
        + '<li>Line up your gummy bears in front of their cups and take a photo.</li>'
        + '<li>Clean up: throw the gummy bears away (do not eat them), pour the salt water and sugar water down the sink, rinse the cups, and wash your hands.</li></ol>'
        + '<p><b>Read:</b> A gummy bear that got bigger took in water. Its cup was hypotonic to it. A gummy bear that got smaller lost water. Its cup was hypertonic to it. A gummy bear that stayed the same size was in a solution that was about isotonic to it.</p>'
        + '<p><b>Connect to cells:</b> In the clip, a saltwater fish goes into fresh water, and water goes into its cells. It works the other way, too. When a living thing from fresh water is put in salty water, the salty water is the side with the greater solute concentration, so water leaves its cells.</p>',
      questions: [
        {
          at: 104,
          type: 'choice',
          text: 'Your teacher’s gummy bears started at 15 millimeters. After 24 hours in plain water, her first gummy bear measured 20 millimeters. What happened to it?',
          easy: 'Her gummy bear started at 15 mm. After 24 hours in plain water, it was 20 mm. What happened?',
          options: ['It got bigger', 'It got smaller', 'It stayed the same size'], answer: 0,
          explain: 'Right. It grew from 15 mm to 20 mm, so it took in water. Her second plain water bear was 19 mm.',
          tip: 'Compare the two numbers. Is 20 mm more or less than 15 mm?'
        },
        {
          at: 132,
          type: 'choice',
          support: false,
          text: 'How long were your teacher’s two gummy bears from the sugar water after 24 hours?',
          easy: 'How long were the two sugar water gummy bears after 24 hours?',
          options: ['17 mm and 16 mm', '20 mm and 19 mm', '9 mm and 10 mm', '15 mm and 15 mm'], answer: 0,
          explain: 'Right. The sugar water bears were 17 mm and 16 mm. They grew a little from 15 mm, but not as much as the plain water bears.',
          tip: 'Rewind to about 1:56 and listen for “when I go to measure the sugar ones.”'
        },
        {
          at: 145,
          type: 'selects',
          text: 'Your teacher’s gummy bears all started at 15 mm. Use the video to tell what happened to the gummy bears in each cup.',
          easy: 'All of her gummy bears started at 15 mm. What happened in each cup?',
          options: ['Got bigger', 'Got smaller', 'Stayed the same size'],
          items: [
            { label: 'Plain water (20 mm and 19 mm)', answer: 'Got bigger', hint: 'Compare 20 mm and 19 mm to the starting size of 15 mm.' },
            { label: 'Sugar water (17 mm and 16 mm)', answer: 'Got bigger', hint: 'Compare 17 mm and 16 mm to the starting size of 15 mm. Even a small change counts.' },
            { label: 'Salt water (9 mm and 10 mm)', answer: 'Got smaller', hint: 'Compare 9 mm and 10 mm to the starting size of 15 mm.' }
          ]
        },
        {
          type: 'numbers',
          text: 'Measurements after 24 hours. Measure each gummy bear again, the same way. (No kit? Use your teacher’s first gummy bear from each cup in the video: 20 mm, 17 mm, and 9 mm.)',
          easy: 'Measure each gummy bear again, the same way, in millimeters. (No kit? Use your teacher’s: 20 mm, 17 mm, and 9 mm.)',
          unit: 'mm',
          items: [
            { label: 'Cup A (plain water) gummy bear', between: [3, 120], tip: 'Measure in millimeters (mm) from the top of the head to the bottom of the feet. 1 centimeter is 10 millimeters.' },
            { label: 'Cup B (salt water) gummy bear', between: [3, 120], tip: 'Measure in millimeters (mm) from the top of the head to the bottom of the feet. 1 centimeter is 10 millimeters.' },
            { label: 'Cup C (sugar water) gummy bear', between: [3, 120], tip: 'Measure in millimeters (mm) from the top of the head to the bottom of the feet. 1 centimeter is 10 millimeters.' }
          ]
        },
        {
          type: 'photo',
          text: 'Take a photo of your gummy bears after 24 hours, lined up in front of their cups. (No kit? Add a screenshot of the gummy bears after 24 hours from one of the videos.)',
          easy: 'Take a photo of your gummy bears in front of their cups. (No kit? Add a screenshot from one of the videos.)',
          caption: 'What do you notice? Which gummy bear changed the most?',
          placeholder: 'For example: The gummy bear from cup … looks …'
        },
        {
          type: 'selects',
          text: 'Use the reading. Choose the word that describes the cup’s solution, compared to the gummy bear.',
          easy: 'Use the reading. Pick the word for each cup’s water, compared to the gummy bear.',
          options: ['Hypotonic', 'Isotonic', 'Hypertonic'],
          items: [
            { label: 'If the gummy bear got bigger, its cup was', answer: 'Hypotonic', hint: 'A bear that got bigger took in water. Water moves toward more solute, so which side had less solute?' },
            { label: 'If the gummy bear got smaller, its cup was', answer: 'Hypertonic', hint: 'A bear that got smaller lost water. Water moved out toward the side with more solute.' },
            { label: 'If the gummy bear stayed the same size, its cup was', answer: 'Isotonic', hint: 'No change in size means no net movement of water. Which word means equal?' }
          ]
        },
        {
          type: 'multi',
          support: false,
          text: 'Sources of error. Which of these could make your results less accurate? Choose all that are correct.',
          easy: 'Which of these could make your results less accurate? Choose all that are correct.',
          options: ['Measuring the gummy bears in a different way before and after', 'Not blotting the gummy bears dry before measuring', 'Salt or sugar that did not fully dissolve', 'Leaving some bears in the water longer than others', 'Using the same amount of water in every cup'],
          answers: ['Measuring the gummy bears in a different way before and after', 'Not blotting the gummy bears dry before measuring', 'Salt or sugar that did not fully dissolve', 'Leaving some bears in the water longer than others'],
          rules: [{ any: ['Using the same amount of water in every cup'], tip: 'Keeping something the same in every cup is a constant. Constants make a test fair. Do they cause error?' }],
          tip: 'There are more. Think about each step: making the solutions, timing, and measuring.',
          explain: 'Right. Each of these can change your numbers. To reduce error next time, measure the same way every time, blot each bear the same way, stir until the salt or sugar dissolves, and take every bear out at the same time.'
        },
        {
          type: 'choice',
          support: false,
          text: 'Connect to cells. A tiny single-celled protozoan that lives in fresh water is put into salty water. What happens?',
          easy: 'A tiny one-celled living thing from fresh water is put in salty water. What happens?',
          options: ['Water moves out of its cell, and it shrinks', 'Water moves into its cell, and it swells', 'Nothing happens, because salt cannot cross a membrane', 'Salt moves into the cell, and it swells'], answer: 0,
          explain: 'Right. The salty water has a higher solute concentration than the protozoan, so the water is hypertonic to it. Water moves out of its cell and it shrinks, like a gummy bear that loses water.',
          tip: 'This is the opposite of the fish in the clip. Use the “Connect to cells” paragraph: which side has the greater solute concentration now?'
        },
        {
          type: 'highlight',
          cer: true,
          from: 'your measurements',
          text: 'In which cup did your gummy bear gain the most water, and in which cup did it gain the least water or lose water? Compare plain water, salt water, and sugar water. Use your measurements as evidence, and explain your results using osmosis and the words hypotonic or hypertonic.',
          easy: 'Which cup’s gummy bear gained the most water? Which gained the least water or lost water? Compare all three cups. Use your measurements as evidence. Explain why using osmosis and the words hypotonic or hypertonic.',
          starters: ['The gummy bear in cup … gained the most water.', 'It started at … mm and ended at … mm.', 'This shows that …', 'This happened because the water in cup … was … compared to the gummy bear, so water moved …', 'My hypothesis was … because …'],
          min: 80,
          ideas: [
            { done: 'You named the cups.', q: 'Did you say which cup gained the most and which gained the least?', tip: 'Name the cups by letter or by what was in the water.', re: /cup [abc]\b|plain water|salt water|salty|sugar water|sugary|syrup/ },
            { done: 'You used your measurements.', q: 'Did you use your numbers as evidence?', tip: 'Give the starting and ending size of a gummy bear in millimeters.', re: /\d/ },
            { done: 'You told which way the water moved.', q: 'Did you tell which way the water moved?', tip: 'Did water move into the gummy bear or out of it? Use the rule: water moves toward the greater solute concentration.', all: [/water/, /into|out of|entered|enters|left the|leaves|absorb|lost water|took in|soaked/] },
            { done: 'You used hypotonic or hypertonic.', q: 'Did you use the words hypotonic or hypertonic?', tip: 'Compare each cup’s water to the gummy bear. Which word fits a cup with less solute than the bear?', re: /hypotonic|hypertonic|isotonic/ },
            { done: 'You talked about solute or salt concentration.', q: 'Did you explain it with solute (or salt and sugar) concentration?', tip: 'The gummy bear is full of sugar. How does that compare to the salt water and the sugar water?', re: /solute|concentration|sugar|salt/ },
            { done: 'You wrote at least 3 sentences.', q: 'Did you write at least 3 full sentences?', tip: 'Add a sentence that explains how your evidence supports your claim.', sentences: 3 }
          ]
        }
      ]
    }
  ]
};
