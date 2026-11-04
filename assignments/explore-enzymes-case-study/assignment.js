/*
  Explore - Enzymes Case Study (Biology A)
  Students work as a veterinary technician to find out why Gus, a yellow Labrador retriever (Ms. Kinzy's own dog),
  is losing weight even though he eats a lot. The science follows the ideas of the Enzymes STEM Case the class used
  before, but every word, picture, and data set here is our own.
  Everything a student sees is written in this file. The shared engine in /engine builds the page, progress bars,
  PDF printout, Listen buttons, and captions from it.
  Full guide: docs/ASSIGNMENT_FORMAT.md
*/
window.ASSIGNMENT = {
  title: 'Explore - Enzymes Case Study',
  course: 'Biology A',
  storageKey: 'explore-enzymes-case-study-v2',
  short: 'enzymes',

  /* supported version (?support=eagle): the goal box at the top */
  essential: {
    question: 'How do enzymes help Gus digest his food, and what happens when there are not enough of them?',
    goals: [
      'Explain what an enzyme does to the speed of a chemical reaction.',
      'Explain why an enzyme only fits one kind of substrate, and how heat or pH can change its shape.',
      'Name where pepsin, protease, lipase, and carbohydrase work and what each one breaks down.',
      'Use lab data as evidence to say what is wrong with Gus and how the treatment helps.'
    ]
  },

  /* Clips. The intro is Ms. Kinzy's own video (captions from her transcript). The others are cut from two videos she
     chose: "Enzymes" (Amoeba Sisters) and "Digestive Enzymes" (FuseSchool). from/to are times in those videos.
     The originals and caption files are in source/ (not saved to GitHub). */
  clips: {
    intro: { src: 'media/intro-video.mp4', from: 0, to: 37.3, seconds: 38, whole: true, title: 'Welcome to Eagle Valley Animal Hospital', of: 'Welcome to Eagle Valley Animal Hospital' },
    rate: { src: 'media/clip-rate.mp4', from: 102.0, to: 197.0, seconds: 95, title: 'Enzymes speed up reactions: the lactase example', of: 'Enzymes (Amoeba Sisters)' },
    shape: { src: 'media/clip-shape.mp4', from: 31.0, to: 102.0, seconds: 71, title: 'Active sites, substrates, and products', of: 'Enzymes (Amoeba Sisters)' },
    denature: { src: 'media/clip-denature.mp4', from: 242.0, to: 302.0, seconds: 60, title: 'When an enzyme is denatured', of: 'Enzymes (Amoeba Sisters)' },
    digest: { src: 'media/clip-digest.mp4', from: 44.0, to: 178.0, seconds: 135, title: 'Enzymes that digest carbohydrates and proteins', of: 'Digestive Enzymes (FuseSchool)' },
    lipids: { src: 'media/clip-lipids.mp4', from: 178.0, to: 247.0, seconds: 70, title: 'Lipase, and a recap of the digestive enzymes', of: 'Digestive Enzymes (FuseSchool)' }
  },

  parts: [
    /* ---------------------------------------------------------------- Part 1 */
    {
      title: 'Meet your patient',
      clips: ['intro'],
      images: [
        { src: 'media/gus-checkin.jpg', width: 320, alt: 'Gus, a yellow Labrador retriever with white fur, a pink nose, and a red leash, looking up at the camera at the animal hospital.', caption: 'Gus at check-in today.' }
      ],
      tableHtml: '<table class="ptable"><caption>Eagle Valley Animal Hospital: Patient chart</caption>'
        + '<tr><th scope="row">Patient</th><td>Gus</td></tr>'
        + '<tr><th scope="row">Species and breed</th><td>Dog (<i>Canis familiaris</i>), yellow Labrador retriever</td></tr>'
        + '<tr><th scope="row">Age and sex</th><td>2 years old, male</td></tr>'
        + '<tr><th scope="row">Weight 6 months ago</th><td>80 pounds (lb), a healthy weight for Gus</td></tr>'
        + '<tr><th scope="row">Weight today</th><td>60 pounds (lb)</td></tr>'
        + '<tr><th scope="row">Owner’s notes</th><td>“Gus is always hungry. He eats more than he used to, but he keeps getting thinner. He is tired and does not want to play fetch anymore.”</td></tr>'
        + '<tr><th scope="row">Temperature, heart, lungs</th><td>Normal. No fever. No cough. He walks normally.</td></tr>'
        + '</table>',
      read: '<p><b>Metabolism</b> is all of the chemical reactions that happen in a living thing. A <b>chemical reaction</b> changes substances into different substances. The substances you start with are the <b>reactants</b>. The new substances made are the <b>products</b>.</p>'
        + '<p>Metabolism includes two types of reactions:</p>'
        + '<ul><li><b>Reactions that break things down.</b> For example, chemical reactions break food into small pieces the body can use.</li>'
        + '<li><b>Reactions that build things up.</b> For example, chemical reactions use those small pieces to build muscle.</li></ul>'
        + '<p><b>Homeostasis</b> is the body’s way of keeping conditions inside it stable. For example, a healthy body keeps its weight steady by matching how much food is eaten with how much is used. When chemical reactions in the body are not working right, homeostasis can break down.</p>'
        + '<p>Gus is eating a lot but losing weight, and he has low energy. That is a clue that something is wrong with his metabolism.</p>',
      questions: [
        {
          type: 'speak',
          text: 'Vocabulary check. Open “Read this before you answer” above. Then press Say it on each card and say the word and its definition out loud.',
          easy: 'Read the reading above. Then press Say it on each card. Say the word and what it means.',
          cards: [
            { term: 'Metabolism', def: 'All of the chemical reactions that happen in a living thing.', say: /metabol/, keys: [/reaction/, /living|body|organism/] },
            { term: 'Homeostasis', def: 'The body’s way of keeping conditions inside it stable.', say: /homeo|home ?o ?stasis|homie/, keys: [/stable|steady|balance|same/, /condition|inside|internal/] },
            { term: 'Chemical reaction', def: 'A change that turns substances into different substances.', say: /reaction/, keys: [/substance|chemical/, /different|new/] },
            { term: 'Reactants', def: 'The substances you start with in a chemical reaction.', say: /reactant|re ?act ?ants?/, keys: [/start|begin/] },
            { term: 'Products', def: 'The new substances a chemical reaction makes.', say: /product/, keys: [/new|make|made/] }
          ]
        },
        {
          type: 'multi',
          text: 'Use the patient chart. Which of these are Gus’s symptoms? Choose all that apply.',
          easy: 'Look at the patient chart. Which of these are Gus’s symptoms? Choose all that apply.',
          options: ['He eats a lot (he is always hungry)', 'He is losing weight', 'He has low energy', 'He has a fever', 'He is coughing', 'He is limping'],
          answers: ['He eats a lot (he is always hungry)', 'He is losing weight', 'He has low energy'],
          rules: [{ any: ['He has a fever', 'He is coughing', 'He is limping'], tip: 'Read the last row of the chart. It lists what the veterinarian checked and found normal.' }],
          tip: 'There are more symptoms. Read the owner’s notes again, one sentence at a time.',
          explain: 'Gus is hungry, losing weight, and tired. His temperature, heart, and lungs are normal.'
        },
        {
          type: 'numbers',
          text: 'How much weight has Gus lost? Use the chart. Then find what percent of his healthy weight he lost. Hint: percent lost = weight lost ÷ healthy weight × 100. For example, a 50 lb dog that lost 10 lb lost 10 ÷ 50 × 100 = 20% of its weight.',
          easy: 'Use the chart. How many pounds did Gus lose? Then find the percent: weight lost ÷ 80 × 100. (Example: a 50 lb dog that lost 10 lb lost 10 ÷ 50 × 100 = 20%.)',
          calculator: true,
          items: [
            { label: 'Weight lost', unit: 'lb', between: [20, 20], tip: 'Subtract his weight today from his weight 6 months ago.' },
            { label: 'Percent of his healthy weight lost', unit: '%', between: [24.5, 25.5], tip: 'Use your answer for weight lost. Divide it by 80 (his healthy weight), then multiply by 100. Follow the example in the question.' }
          ]
        },
        {
          type: 'selects',
          text: 'Match each description to the correct word.',
          options: ['Metabolism', 'Homeostasis', 'Chemical reaction', 'Reactants', 'Products'],
          hint: 'Open the reading and find the word in bold that matches this description.',
          items: [
            { label: 'All of the chemical reactions that happen in a living thing', answer: 'Metabolism' },
            { label: 'The body keeping conditions inside it stable', answer: 'Homeostasis' },
            { label: 'A change that turns substances into different substances', answer: 'Chemical reaction' },
            { label: 'The substances you start with in a reaction', answer: 'Reactants' },
            { label: 'The new substances a reaction makes', answer: 'Products' }
          ]
        },
        {
          type: 'selects',
          text: 'Metabolism has two types of reactions. Does each reaction break something down or build something up?',
          easy: 'Does each reaction break something down or build something up?',
          options: ['Breaks down', 'Builds up'],
          hint: 'Is the reaction making something smaller, or using small pieces to make something bigger?',
          items: [
            { label: 'Gus’s body breaks his dog food into small pieces', answer: 'Breaks down' },
            { label: 'Gus’s body uses small pieces to build muscle', answer: 'Builds up' },
            { label: 'A puppy’s body grows new bone', answer: 'Builds up' },
            { label: 'Fat is split into smaller molecules for energy', answer: 'Breaks down' }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 2 */
    {
      title: 'Reaction rate and enzymes',
      intro: 'Gus’s body needs its chemical reactions to happen fast. In this part, you will see how enzymes speed reactions up. The video stops 3 times to ask you a question.',
      clips: ['rate'],
      read: '<p><b>Reaction rate</b> is how fast a chemical reaction happens: how much product is made in a certain amount of time.</p>'
        + '<p class="eq">Reaction rate = amount of product made ÷ time</p>'
        + '<p>For example, if a reaction makes 16 mg (milligrams) of product in 4 seconds, its rate is 16 ÷ 4 = 4 mg per second (4 mg/s).</p>'
        + '<p>Living things need many reactions to happen very quickly. Without help, most of the reactions in Gus’s cells would be far too slow to keep him alive.</p>'
        + '<p><b>Enzymes</b> are proteins that make chemical reactions happen faster. A substance that speeds up a chemical reaction is called a <b>catalyst</b>, so enzymes are biological catalysts. An enzyme is not used up by the reaction. It can be used again and again.</p>'
        + '<p>Every chemical reaction needs a small push of energy to get started. This is called the <b>activation energy</b>. Enzymes speed up reactions by <b>lowering the activation energy</b>. They do not change the energy of the reactants or the products.</p>',
      questions: [
        { at: 13, type: 'choice', text: 'According to the video, what can an enzyme do to a chemical reaction?',
          options: ['Speed it up', 'Stop it from happening', 'Make it use more energy'], answer: 0,
          tip: 'Rewind to the start of the clip and listen to the first sentence.',
          explain: 'An enzyme can really speed up a reaction, so processes happen fast enough for life.' },
        { at: 60, type: 'choice', text: 'What does the enzyme lactase do to lactose (milk sugar)?',
          easy: 'What does lactase do to lactose (milk sugar)?',
          options: ['Breaks it into smaller parts the body can digest', 'Builds it into a bigger sugar', 'Turns it into a protein'], answer: 0,
          tip: 'Rewind about 30 seconds and listen to what lactase has “the ability” to do.',
          explain: 'Lactase breaks lactose into smaller parts, so the body can digest it quickly.' },
        { at: 94, type: 'choice', text: 'Why are enzymes called catalysts?',
          options: ['They are not used up, so they can be used over and over', 'They are used up in each reaction', 'They only work one time'], answer: 0,
          tip: 'Listen to the end of the clip. What happens to lactase after the reaction?',
          explain: 'An enzyme is not used up by the reaction. It can be used again and again, so it is a catalyst.' },
        {
          type: 'choice',
          text: 'Predict: Two cells have the same reactants. You add an enzyme to one cell. In that cell, what will happen to the amount of product made in 4 seconds?',
          easy: 'Predict: You add an enzyme to one cell. What happens to the amount of product it makes in 4 seconds?',
          options: ['It will increase', 'It will stay the same', 'It will decrease'],
          answer: 0,
          tip: 'Read what the reading says enzymes do to the speed of a reaction. A faster reaction makes how much product in the same time?',
          explain: 'An enzyme speeds up the reaction, so more product is made in the same amount of time. Now test your prediction.'
        },
        {
          type: 'reaction',
          text: 'Reaction race. Add the enzyme to Cell 2, then start the reaction. Watch the clock and the product counter in each cell. Then work out each reaction rate.',
          easy: 'Add the enzyme to Cell 2. Start the reaction. Watch the product counters. Then find each reaction rate.',
          seconds: 4, pairs: 20, each: 1, unit: 'mg',
          cells: [
            { name: 'Cell 1: no enzyme', rate: 0.5 },
            { name: 'Cell 2: enzyme added', rate: 4, enzyme: true }
          ],
          calculator: true,
          items: [
            { label: 'Reaction rate in Cell 1', unit: 'mg/s', between: [0.5, 0.5], tip: 'Read how much product Cell 1 made, then divide by the 4 seconds the reaction ran.' },
            { label: 'Reaction rate in Cell 2', unit: 'mg/s', between: [4, 4], tip: 'Read how much product Cell 2 made, then divide by the 4 seconds the reaction ran.' },
            { label: 'How many times faster was Cell 2?', unit: 'times', between: [8, 8], tip: 'Divide the rate in Cell 2 by the rate in Cell 1.' }
          ]
        },
        {
          type: 'label',
          text: 'This energy diagram shows the same reaction with and without an enzyme. Label the three numbered parts.',
          easy: 'Label the three numbered parts of the energy diagram.',
          viewBox: '0 0 800 500', image: { src: 'media/energy-diagram.svg', width: 800, height: 500 },
          alt: 'An energy diagram. A line starts at one energy level on the left, rises to a tall hump, and ends at a lower energy level on the right. A dashed line for the reaction with an enzyme has a shorter hump. An arrow shows the height of the tall hump above the starting level. Three numbered markers point to parts of the diagram.',
          markerSize: 26,
          spots: [
            { x: 455, y: 210, to: [[404, 210]], label: 'Activation energy', tip: 'This arrow shows how big a push of energy the reaction needs before it can start.' },
            { x: 160, y: 270, to: [[160, 330]], label: 'Energy of the reactants', tip: 'This is where the reaction starts, on the left side of the diagram.' },
            { x: 680, y: 340, to: [[680, 400]], label: 'Energy of the products', tip: 'This is where the reaction ends, on the right side of the diagram.' }
          ],
          extra: ['Reaction rate'],
          explain: 'The reaction starts at the energy of the reactants and ends at the energy of the products. The hump in between is the activation energy, the push needed to get the reaction started.'
        },
        {
          type: 'choice',
          text: 'Compare the dashed line (with an enzyme) to the solid line (without an enzyme). What did the enzyme change?',
          easy: 'Look at the dashed line (with an enzyme). What did the enzyme change?',
          options: ['It lowered the activation energy', 'It lowered the energy of the reactants', 'It raised the energy of the products', 'It changed nothing'],
          answer: 0,
          tip: 'Look at where the two lines start, where they end, and how tall each hump is. Which part is different?',
          explain: 'Both lines start and end at the same energy. Only the hump is shorter. Enzymes speed up reactions by lowering the activation energy.'
        },
        {
          type: 'written',
          text: 'Gus is a big, active dog, and his body runs many chemical reactions every second. Why is reaction rate important for living things like Gus? Use what you saw in the reaction race to explain how enzymes help. (2 to 4 sentences)',
          easy: 'Why do living things like Gus need fast reactions? Use the reaction race to explain how enzymes help. (2 to 4 sentences)',
          min: 80,
          starters: ['Reaction rate is important because living things need …', 'In the reaction race, the cell with the enzyme …', 'This shows that enzymes …', 'Without enzymes, Gus’s body would …'],
          ideas: [
            { done: 'You explained that living things need reactions to happen fast.', q: 'Did you explain why living things need fast reactions?', tip: 'The reading says what would happen if the reactions in Gus’s cells were too slow.',
              all: [/\b(fast|quick|speed|rapid|slow|time)/, /(alive|live|living|surviv|grow|energy|digest|food|die)/] },
            { done: 'You said that enzymes speed up reactions.', q: 'Did you say what enzymes do to a reaction?', tip: 'Enzymes are catalysts. What does a catalyst do to the speed of a reaction?',
              all: [/(enzyme|catalyst)/, /(fast|quick|speed|rate|sooner)/] },
            { done: 'You used evidence from the reaction race.', q: 'Did you use numbers or results from the reaction race?', tip: 'Give the amount of product or the rate in each cell, or how many times faster Cell 2 was.',
              re: /(\b16\b|\b2 ?mg|\b0?\.5\b|\b4 ?mg|\b8 times|eight times|cell 2|cell two|cell 1|cell one)/ },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write at least 2 sentences?', tip: 'Write one sentence about why rate matters and one about how enzymes help.', sentences: 2 }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 3 */
    {
      title: 'An enzyme’s shape: lock and key',
      intro: 'Every enzyme has its own shape, and that shape decides which reaction it can speed up. The first video stops 3 times to ask you a question.',
      clips: ['shape', 'denature'],
      read: '<p>Enzymes are proteins. Like all proteins, an enzyme is made of small building blocks called <b>amino acids</b>, linked together in a chain. Each enzyme has its own <b>sequence</b> (order) of amino acids. The chain folds into a shape, so every enzyme has a different <b>structure</b> (shape). There are more than 75,000 different enzymes in the body, and each one has its own job.</p>'
        + '<p>Each enzyme has an <b>active site</b>. This is the area where the reactants are changed into products. The reactants that attach to an enzyme’s active site are called its <b>substrates</b>.</p>'
        + '<p>Just like a lock only opens with the right key, only a substrate with the right shape fits an enzyme’s active site. This is called the <b>lock and key model</b>. So enzymes are <b>specific</b>: each enzyme only speeds up one kind of reaction. If a substrate does not fit, no reaction happens, no matter how much of it there is.</p>'
        + '<p>A <b>mutation</b> is a change in DNA. A mutation can change one of the amino acids in an enzyme. Then the chain folds into a different shape, and the substrate may no longer fit.</p>'
        + '<p>An enzyme’s shape also depends on <b>temperature</b> and <b>pH</b> (how acidic or basic its surroundings are). Each enzyme works best at a certain temperature and pH. Too far from those, and its shape changes so the substrate no longer fits. When an enzyme loses its shape and stops working, it is <b>denatured</b>.</p>',
      questions: [
        { at: 21, type: 'choice', text: 'According to the video, most enzymes are what kind of molecule?',
          options: ['Proteins', 'Sugars', 'Fats'], answer: 0,
          tip: 'Listen for how the video remembers it: “P for Pac-Man and P for …”',
          explain: 'Most enzymes are proteins.' },
        { at: 35, type: 'selects', text: 'Complete the sentences from the video.',
          options: ['Active site', 'Substrates', 'Products'],
          hint: 'Rewind a few seconds and listen for the two words the video names.',
          items: [
            { label: 'The specifically shaped area on an enzyme is called the', answer: 'Active site' },
            { label: 'The items that bind there are called', answer: 'Substrates' }
          ] },
        { at: 70, type: 'choice', text: 'An enzyme builds up or breaks down the substrates that bind to it. What is the resulting item called?',
          easy: 'What do we call what the enzyme makes?',
          options: ['The product', 'The substrate', 'The active site'], answer: 0,
          tip: 'Listen to the last sentence of the clip.',
          explain: 'The enzyme changes its substrates, and the result is the product.' },
        {
          type: 'order',
          text: 'Put these steps in order to show how an enzyme gets its shape and does its job.',
          easy: 'Put the steps in order, from first to last.',
          items: [
            'The cell links amino acids together in a specific order.',
            'The chain of amino acids folds into a shape.',
            'The folded shape forms an active site.',
            'A substrate with the matching shape fits into the active site.',
            'The enzyme changes the substrate into products.'
          ],
          tip: 'Start with the building blocks. The reading tells what they are linked into, and what that chain does next.',
          explain: 'The order of amino acids decides how the chain folds. The fold makes the active site, and only a matching substrate fits there and is changed into products.'
        },
        {
          type: 'lockkey',
          text: 'These enzymes come from a dog’s small intestine. Match each substrate (a nutrient in food) to the enzyme whose active site it fits.',
          easy: 'Put each nutrient into the enzyme it fits.',
          enzymes: [
            { name: 'Protease', shape: 'square', tip: 'Look at the notch on Protease. Which molecule has a part with the same shape?', ok: 'Protein fits Protease’s active site. Protease breaks proteins down into amino acids.' },
            { name: 'Lipase', shape: 'triangle', tip: 'Look at the notch on Lipase. Which molecule has a part with the same pointed shape?', ok: 'The lipid (fat) fits Lipase’s active site. Lipase breaks fats down into smaller molecules.' },
            { name: 'Carbohydrase', shape: 'round', tip: 'Look at the notch on Carbohydrase. Which molecule has a part with the same curved shape?', ok: 'The carbohydrate fits Carbohydrase’s active site. Carbohydrase breaks carbohydrates down into sugars.' }
          ],
          substrates: [
            { name: 'Protein', shape: 'square' },
            { name: 'Lipid (fat)', shape: 'triangle' },
            { name: 'Carbohydrate', shape: 'round' }
          ],
          mutation: 'Protease',
          explain: 'Each enzyme fits only one substrate, like a key in a lock. When the substrate fits, the enzyme breaks it into two products. Now try the mutation switch to see what a change in the enzyme’s shape does.'
        },
        {
          type: 'choice',
          text: 'Which of these statements about enzymes is FALSE?',
          options: ['Every enzyme has an active site.', 'An enzyme can speed up almost any reaction if there is enough substrate.', 'An enzyme’s shape decides which substrate fits its active site.', 'Enzymes speed up reactions.'],
          answer: 1,
          tip: 'Three of these are true. Think about what the lock and key model says happens when a substrate does not fit, even if there is a lot of it.',
          explain: 'An enzyme only speeds up the reaction for the substrate that fits its active site. If the substrate does not fit, no reaction happens, no matter how much of it there is.',
          support: false
        },
        {
          type: 'dial',
          text: 'Temperature test. Move the temperature slider and watch the enzyme’s active site and its reaction rate. Find the temperature where this dog enzyme works best, and record it. Then try a high temperature to see what happens.',
          easy: 'Move the slider. Find the temperature where the enzyme works fastest. Record it. Then try a very high temperature.',
          factor: 'temperature', sliderLabel: 'Temperature', unit: '°C', xLabel: 'Temperature (°C)',
          min: 0, max: 70, step: 1, start: 20, graphStep: 10,
          enzymes: [
            { name: 'Protease', where: 'a dog enzyme', best: 38, low: 14, high: 7, tol: 2, shape: 'square', subColor: '#d63f78',
              tip: 'Try temperatures on both sides of your tallest dot. The best temperature has the tallest dot on your graph.',
              ok: 'This enzyme works best at about 38 °C, which is a dog’s normal body temperature. Now try 55 °C or more and watch the active site.' }
          ]
        },
        {
          type: 'written',
          text: 'Explain why each enzyme fits only one substrate. Then explain what happened to protease when its gene had a mutation, or when it got too hot. (3 to 5 sentences)',
          easy: 'Why does each enzyme fit only one substrate? What happened to protease after a mutation, or when it got too hot? (3 to 5 sentences)',
          min: 120,
          starters: ['Each enzyme fits only one substrate because …', 'This works like a … because …', 'When the protease gene had a mutation, …', 'At a very high temperature, …'],
          ideas: [
            { done: 'You explained that the substrate must fit the active site’s shape.', q: 'Did you explain the shape of the active site?', tip: 'Use the words “shape” and “active site.” What has to match for the reaction to happen?',
              all: [/(shape|notch)/, /(active site|substrate|fit|match)/] },
            { done: 'You compared it to a lock and key.', q: 'Did you use the lock and key model?', tip: 'The reading compares the enzyme and substrate to two everyday things.',
              re: /(lock|key)/ },
            { done: 'You explained what the mutation did.', q: 'Did you explain what the mutation changed?', tip: 'A mutation changes one amino acid. What did that do to the active site, and could protein still fit?',
              all: [/mutat/, /(shape|fold|amino|fit|active site|no longer|not work|stop)/] },
            { done: 'You explained what high temperature did.', q: 'Did you explain what happened when it got too hot?', tip: 'What word does the reading use for an enzyme that lost its shape from heat?',
              re: /(denatur|(hot|heat|high temp|55|60|70)[^.]*(shape|fit|stop|not work|slow))/ },
            { done: 'You wrote at least 3 sentences.', q: 'Did you write at least 3 sentences?', tip: 'Write about the fit, the mutation, and the heat.', sentences: 3 }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 4 */
    {
      title: 'A tour of Gus’s digestive system',
      intro: 'Gus eats a lot, but he is still losing weight. That suggests his food is not being broken down. Follow the food through his body to see which enzymes work where. The first video stops 3 times to ask you a question.',
      clips: ['digest', 'lipids'],
      read: '<p>Food contains many <b>nutrients</b>, including <b>proteins</b>, <b>carbohydrates</b>, and <b>lipids</b> (fats). These are big molecules. <b>Digestion</b> is the process of breaking food down into small molecules that the body can <b>absorb</b> (take in). Enzymes speed up the reactions that break food down.</p>'
        + '<p><b>1. Esophagus.</b> When Gus swallows, food moves down a tube called the esophagus to his stomach.</p>'
        + '<p><b>2. Stomach.</b> In the stomach, an enzyme called <b>pepsin</b> breaks down proteins. Pepsin works best at a low pH (very acidic, about pH 2). The stomach keeps its pH low by releasing hydrochloric acid.</p>'
        + '<p><b>3. Small intestine.</b> Next, food moves to the small intestine. Here, three enzymes finish the job. They are named after the substrate they break down:</p>'
        + '<ul><li><b>Protease</b> breaks down proteins.</li><li><b>Lipase</b> breaks down lipids (fats).</li><li><b>Carbohydrase</b> breaks down carbohydrates.</li></ul>'
        + '<p>The small intestine is slightly basic (about pH 8), so these enzymes work best near pH 8. The small molecules made here are absorbed into the blood.</p>'
        + '<p><b>4. Pancreas.</b> Protease, lipase, and carbohydrase are made in the <b>pancreas</b>, an organ next to the stomach. The pancreas <b>secretes</b> (sends out) these enzymes into the small intestine.</p>'
        + '<p><b>5. Large intestine.</b> Whatever was not digested and absorbed moves on to the large intestine and leaves the body as waste (poop).</p>'
        + '<p><b>In the video:</b> the protease the pancreas sends to the small intestine is called <b>trypsin</b>, and <b>amylase</b> is a carbohydrase that breaks down starch.</p>',
      questions: [
        { at: 55, type: 'choice', text: 'Amylase is a type of carbohydrase. According to the video, what does amylase break down?',
          easy: 'What does amylase break down?',
          options: ['Starch, a big carbohydrate', 'Proteins', 'Lipids (fats)'], answer: 0,
          tip: 'Rewind a few seconds. Listen for the big carbohydrate the video names.',
          explain: 'Amylase breaks starch into smaller molecules, and then into glucose that can move into the blood.' },
        { at: 98, type: 'choice', text: 'Where does the protease pepsin break down proteins?',
          options: ['In the stomach', 'In the small intestine', 'In the mouth'], answer: 0,
          tip: 'Rewind a few seconds and listen for where pepsin works, and where it stops working.',
          explain: 'Pepsin works in the stomach. In the small intestine, a different protease (trypsin) takes over.' },
        { at: 133, type: 'selects', text: 'What pH does the video give for each place?',
          options: ['About 2 (very acidic)', 'About 8', 'About 12'],
          hint: 'Rewind about 15 seconds. Listen for the pH of the stomach and of the small intestine.',
          items: [
            { label: 'Stomach', answer: 'About 2 (very acidic)' },
            { label: 'Small intestine', answer: 'About 8' }
          ] },
        {
          type: 'label',
          text: 'Label the parts of Gus’s digestive system.',
          viewBox: '0 0 900 520', image: { src: 'media/dog-digestion.svg', width: 900, height: 520 },
          alt: 'A side view drawing of a dog with its digestive organs shown inside its body. Five numbered markers point to a tube in the neck, an organ in the belly, a thin organ under it, a long, tightly coiled tube, and a wider tube that runs up the side and along the back to the tail.',
          markerSize: 28,
          spots: [
            { x: 300, y: 110, to: [[305, 210]], label: 'Esophagus', tip: 'This is the tube food travels through right after Gus swallows.' },
            { x: 440, y: 105, to: [[448, 225]], label: 'Stomach', tip: 'This is where food goes first after the tube from the mouth. Pepsin works here.' },
            { x: 470, y: 420, to: [[482, 304]], label: 'Pancreas', tip: 'This organ sits next to the stomach and sends enzymes into the small intestine.' },
            { x: 560, y: 420, to: [[560, 313]], label: 'Small intestine', tip: 'This is the long, coiled tube where most nutrients are broken down and absorbed.' },
            { x: 800, y: 330, to: [[710, 280]], label: 'Large intestine', tip: 'This is the last part of the path. Food that was not absorbed passes through here as waste.' }
          ],
          explain: 'Food goes down the esophagus to the stomach, then to the small intestine, where enzymes from the pancreas finish digestion. The large intestine handles the waste.'
        },
        {
          type: 'selects',
          text: 'Fill in the digestive enzyme chart. For each enzyme, choose where it works and what it breaks down.',
          easy: 'For each enzyme, choose where it works and what it breaks down.',
          rowImages: {
            pepsin: { src: 'media/enzyme-pepsin.svg', alt: 'A cartoon enzyme with a name tag that says Pepsin.' },
            protease: { src: 'media/enzyme-protease.svg', alt: 'A cartoon enzyme with a name tag that says Protease.' },
            lipase: { src: 'media/enzyme-lipase.svg', alt: 'A cartoon enzyme with a name tag that says Lipase.' },
            carbohydrase: { src: 'media/enzyme-carbohydrase.svg', alt: 'A cartoon enzyme with a name tag that says Carbohydrase.' }
          },
          items: [
            { row: 'pepsin', label: 'Pepsin works in the', options: ['Stomach', 'Small intestine'], answer: 'Stomach', hint: 'Read part 2 of the tour.' },
            { row: 'pepsin', label: 'Pepsin breaks down', options: ['Proteins', 'Lipids (fats)', 'Carbohydrates'], answer: 'Proteins', hint: 'Read part 2 of the tour.' },
            { row: 'protease', label: 'Protease works in the', options: ['Stomach', 'Small intestine'], answer: 'Small intestine', hint: 'Read part 3 of the tour.' },
            { row: 'protease', label: 'Protease breaks down', options: ['Proteins', 'Lipids (fats)', 'Carbohydrates'], answer: 'Proteins', hint: 'The enzyme’s name comes from its substrate. Read part 3 of the tour.' },
            { row: 'lipase', label: 'Lipase works in the', options: ['Stomach', 'Small intestine'], answer: 'Small intestine', hint: 'Read part 3 of the tour.' },
            { row: 'lipase', label: 'Lipase breaks down', options: ['Proteins', 'Lipids (fats)', 'Carbohydrates'], answer: 'Lipids (fats)', hint: 'The enzyme’s name comes from its substrate. Read part 3 of the tour.' },
            { row: 'carbohydrase', label: 'Carbohydrase works in the', options: ['Stomach', 'Small intestine'], answer: 'Small intestine', hint: 'Read part 3 of the tour.' },
            { row: 'carbohydrase', label: 'Carbohydrase breaks down', options: ['Proteins', 'Lipids (fats)', 'Carbohydrates'], answer: 'Carbohydrates', hint: 'The enzyme’s name comes from its substrate. Read part 3 of the tour.' },
            { label: 'Protease, lipase, and carbohydrase are made in the', options: ['Stomach', 'Pancreas', 'Large intestine'], answer: 'Pancreas', hint: 'Read part 4 of the tour.' }
          ]
        },
        {
          type: 'dial',
          text: 'pH test. Each digestive enzyme works best at its own pH. Choose an enzyme, move the pH slider, and find the pH where it works fastest. Record the best pH for all four enzymes.',
          easy: 'Choose an enzyme. Move the slider to find the pH where it works fastest. Record it. Do all four enzymes.',
          factor: 'pH', sliderLabel: 'pH', xLabel: 'pH', min: 0, max: 12, step: 0.5, start: 6, graphStep: 1, tol: 0.5,
          tip: 'Try values on both sides of your tallest dot. The best pH has the tallest dot on the graph for this enzyme.',
          enzymes: [
            { name: 'Pepsin', where: 'stomach', best: 2, low: 1.3, high: 1.6, shape: 'square', subColor: '#d63f78', ok: 'Pepsin works best near pH 2, the very acidic pH of the stomach.' },
            { name: 'Protease', where: 'small intestine', best: 8, low: 1.6, high: 1.6, shape: 'square', subColor: '#d63f78', ok: 'Protease works best near pH 8, the slightly basic pH of the small intestine.' },
            { name: 'Lipase', where: 'small intestine', best: 8, low: 1.8, high: 1.6, shape: 'triangle', subColor: '#e2a72a', ok: 'Lipase works best near pH 8, the slightly basic pH of the small intestine.' },
            { name: 'Carbohydrase', where: 'small intestine', best: 7.5, low: 2, high: 2, shape: 'round', subColor: '#3a9a5b', ok: 'Carbohydrase works best near pH 7.5. It still works well at pH 8 in the small intestine.' }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 5 */
    {
      title: 'Run the lab: what is wrong with Gus?',
      intro: 'Now you will collect data from Gus and compare it to a healthy dog. Then you will test three possible causes, one at a time.',
      read: '<p><b>How the digestion test works.</b> We take 1 mL of liquid from a dog’s stomach or small intestine. The liquid has the dog’s digestive enzymes in it. We add it to a dish of nutrient (the substrate), then measure how much substrate is left over time. As the enzymes break the substrate down, the amount left goes <b>down</b>. A line that drops faster means a faster reaction rate.</p>'
        + '<p><b>Control data.</b> We run the same test on a healthy dog. The healthy dog is the <b>control</b>: what normal looks like. Comparing Gus to the control shows whether Gus’s reactions are low, normal, or high.</p>'
        + '<p><b>Three possible causes.</b> If food is being broken down too slowly, the veterinary team has three ideas (hypotheses) about why:</p>'
        + '<ul><li><b>Active site mutation:</b> A mutation changed the shape of Gus’s enzymes’ active sites, so the substrates do not fit well.</li>'
        + '<li><b>Abnormal pH:</b> Gus’s small intestine is not at the right pH, so his enzymes lose their shape and work slowly.</li>'
        + '<li><b>Low enzyme production:</b> Gus’s pancreas is not making enough enzymes. An enzyme works on one substrate molecule at a time, so with fewer enzymes, the reaction rate is lower.</li></ul>'
        + '<p>A good scientist tests each idea. A test can <b>rule out</b> an idea (show it is not the cause). Ideas that are not ruled out are still possible.</p>',
      questions: [
        {
          type: 'selects',
          text: 'Here is the digestion test data. Compared to the healthy dog, did Gus’s enzymes break down each nutrient at a low, normal, or high rate? Answer under each graph.',
          easy: 'Compare Gus (pink dashed line) to the healthy dog (blue line). Is Gus’s rate low, normal, or high? Answer under each graph.',
          options: ['Low', 'Normal', 'High'],
          hint: 'Look at the graph right above this menu. Does Gus’s pink dashed line drop as fast as the healthy dog’s blue line, slower, or faster?',
          items: [
            { label: 'Stomach: protein', answer: 'Normal',
              chart: { title: 'Stomach: protein', alt: 'Stomach protein test. Both lines start at 1 milligram per milliliter and drop to 0.2 by 30 minutes. The healthy dog line and Gus’s line are on top of each other.',
                x: { min: 0, max: 30, step: 10, label: 'Time (minutes)' }, y: { min: 0, max: 1, step: 0.2, label: 'Protein left (mg/mL)' },
                lines: [{ name: 'Healthy dog', pts: [[0, 1], [30, 0.2]] }, { name: 'Gus', pts: [[0, 1], [30, 0.2]] }] } },
            { label: 'Small intestine: protein', answer: 'Low',
              chart: { title: 'Small intestine: protein', alt: 'Small intestine protein test. The healthy dog line drops from 1 to 0.1 by 30 minutes. Gus’s line only drops from 1 to 0.75.',
                x: { min: 0, max: 30, step: 10, label: 'Time (minutes)' }, y: { min: 0, max: 1, step: 0.2, label: 'Protein left (mg/mL)' },
                lines: [{ name: 'Healthy dog', pts: [[0, 1], [30, 0.1]] }, { name: 'Gus', pts: [[0, 1], [30, 0.75]] }] } },
            { label: 'Small intestine: lipid (fat)', answer: 'Low',
              chart: { title: 'Small intestine: lipid (fat)', alt: 'Small intestine lipid test. The healthy dog line drops from 1 to 0.15 by 30 minutes. Gus’s line only drops from 1 to 0.8.',
                x: { min: 0, max: 30, step: 10, label: 'Time (minutes)' }, y: { min: 0, max: 1, step: 0.2, label: 'Lipid left (mg/mL)' },
                lines: [{ name: 'Healthy dog', pts: [[0, 1], [30, 0.15]] }, { name: 'Gus', pts: [[0, 1], [30, 0.8]] }] } },
            { label: 'Small intestine: carbohydrate', answer: 'Low',
              chart: { title: 'Small intestine: carbohydrate', alt: 'Small intestine carbohydrate test. The healthy dog line drops from 1 to 0.1 by 30 minutes. Gus’s line only drops from 1 to 0.7.',
                x: { min: 0, max: 30, step: 10, label: 'Time (minutes)' }, y: { min: 0, max: 1, step: 0.2, label: 'Carbohydrate left (mg/mL)' },
                lines: [{ name: 'Healthy dog', pts: [[0, 1], [30, 0.1]] }, { name: 'Gus', pts: [[0, 1], [30, 0.7]] }] } }
          ]
        },
        {
          type: 'choice',
          text: 'Based on the data, where is the problem with Gus’s digestion?',
          options: ['In his stomach', 'In his small intestine', 'In both his stomach and small intestine'],
          answer: 1,
          tip: 'Look at your answers above. Which place had rates that matched the healthy dog, and which place did not?',
          explain: 'Digestion in Gus’s stomach is normal, but digestion in his small intestine is slow for all three nutrients. The problem is in the small intestine.'
        },
        {
          type: 'diagnosis',
          text: 'Case board. Choose your first hypothesis. Then run each test, read the data, and decide what it tells you about one possible cause.',
          easy: 'Choose your first guess. Then run each test, read the data, and decide what it means.',
          causes: [
            { key: 'mutation', name: 'Active site mutation', about: 'The active sites changed shape, so substrates do not fit.' },
            { key: 'ph', name: 'Abnormal pH', about: 'The small intestine is at the wrong pH, so the enzymes lose their shape.' },
            { key: 'low', name: 'Low enzyme production', about: 'The pancreas does not make enough enzymes.' }
          ],
          tests: [
            {
              name: 'Test 1: Do the substrates still fit Gus’s enzymes?', cause: 'mutation', run: 'Run the binding test',
              how: '<p>We take protease, lipase, and carbohydrase from Gus’s small intestine and from the healthy dog. We measure how well each substrate fits each enzyme’s active site. 100% means a perfect fit.</p>',
              chart: { title: 'Substrate fit in the active site', alt: 'Bar graph of substrate fit. Protease, lipase, and carbohydrase each show 100 percent fit for both the healthy dog and Gus.', valueLabels: true, valueUnit: '%',
                x: { cats: ['Protease', 'Lipase', 'Carbohydrase'], label: 'Enzyme' }, y: { min: 0, max: 120, step: 20, label: 'Substrate fit (%)' },
                bars: [{ name: 'Healthy dog', values: [100, 100, 100] }, { name: 'Gus', values: [100, 100, 100] }] },
              ask: 'Do the active sites of Gus’s enzymes still fit their substrates? What does this test tell you about the “Active site mutation” idea?',
              answer: 'Ruled out',
              tip: 'Compare Gus’s bars to the healthy dog’s bars. If a mutation had changed the active sites, would the substrates still fit perfectly?',
              explain: 'Gus’s substrates fit his enzymes 100%, just like the healthy dog’s. His active sites have the right shape, so a mutation is not the cause.'
            },
            {
              name: 'Test 2: Is the pH in Gus’s small intestine normal?', cause: 'ph', run: 'Run the pH test',
              how: '<p>First, we measure the pH inside Gus’s small intestine. Then we take 1 mg of pure protease from each dog, put it in a dish of protein at pH 8 (the normal pH of the small intestine), and measure how fast the protein is broken down.</p>',
              result: '<p>pH of the small intestine: healthy dog 8.0, Gus 7.9.</p>',
              chart: { title: '1 mg of pure protease at pH 8', alt: 'Line graph. Protein left drops from 1 to 0.1 milligrams per milliliter in 10 minutes for both the healthy dog’s protease and Gus’s protease. The two lines are on top of each other.',
                x: { min: 0, max: 10, step: 2, label: 'Time (minutes)' }, y: { min: 0, max: 1, step: 0.2, label: 'Protein left (mg/mL)' },
                lines: [{ name: 'Healthy dog', pts: [[0, 1], [10, 0.1]] }, { name: 'Gus', pts: [[0, 1], [10, 0.1]] }] },
              ask: 'Is Gus’s pH in the range where his enzymes work best, and does the same amount of his protease work at a normal rate? What does this test tell you about the “Abnormal pH” idea?',
              answer: 'Ruled out',
              tip: 'Look at the pH you found for the small intestine enzymes in Part 4. Is 7.9 close to it? Then compare the two lines.',
              explain: 'Gus’s small intestine is at a normal pH, and the same amount of his protease works just as fast as the healthy dog’s. Abnormal pH is not the cause.'
            },
            {
              name: 'Test 3: Is Gus’s pancreas making enough enzymes?', cause: 'low', run: 'Run the enzyme production test',
              how: '<p>We take a tiny sample of cells from each dog’s pancreas and measure how much of each enzyme the cells make over 2.5 hours.</p>',
              charts: [
                { title: 'Protease made', alt: 'Line graph. The healthy dog’s pancreas makes protease steadily, reaching 90 units in 2.5 hours. Gus’s pancreas only reaches 15 units.',
                  x: { min: 0, max: 2.5, step: 0.5, label: 'Time (hours)' }, y: { min: 0, max: 100, step: 20, label: 'Enzyme made (units)' },
                  lines: [{ name: 'Healthy dog', pts: [[0, 0], [2.5, 90]] }, { name: 'Gus', pts: [[0, 0], [2.5, 15]] }] },
                { title: 'Lipase made', alt: 'Line graph. The healthy dog’s pancreas makes lipase steadily, reaching 85 units in 2.5 hours. Gus’s pancreas only reaches 12 units.',
                  x: { min: 0, max: 2.5, step: 0.5, label: 'Time (hours)' }, y: { min: 0, max: 100, step: 20, label: 'Enzyme made (units)' },
                  lines: [{ name: 'Healthy dog', pts: [[0, 0], [2.5, 85]] }, { name: 'Gus', pts: [[0, 0], [2.5, 12]] }] },
                { title: 'Carbohydrase made', alt: 'Line graph. The healthy dog’s pancreas makes carbohydrase steadily, reaching 80 units in 2.5 hours. Gus’s pancreas only reaches 14 units.',
                  x: { min: 0, max: 2.5, step: 0.5, label: 'Time (hours)' }, y: { min: 0, max: 100, step: 20, label: 'Enzyme made (units)' },
                  lines: [{ name: 'Healthy dog', pts: [[0, 0], [2.5, 80]] }, { name: 'Gus', pts: [[0, 0], [2.5, 14]] }] }
              ],
              ask: 'Does Gus’s pancreas make protease, lipase, and carbohydrase at a normal rate? What does this test tell you about the “Low enzyme production” idea?',
              answer: 'This is the cause',
              tip: 'Compare how high Gus’s pink dashed line climbs to how high the healthy dog’s line climbs. Then think about the two ideas you already ruled out.',
              explain: 'Gus’s pancreas makes far less of all three enzymes than a healthy dog’s pancreas. With fewer enzymes in his small intestine, his food is broken down too slowly.'
            }
          ],
          diagnosis: '<p><b>Diagnosis: Exocrine pancreatic insufficiency (EPI).</b> In EPI, the cells of the pancreas that make digestive enzymes are damaged, so the pancreas cannot secrete enough enzymes into the small intestine. Gus’s food is not broken down fast enough, so his body cannot absorb the nutrients. That is why he is hungry, thin, and tired.</p>'
        },
        {
          type: 'written',
          text: 'Scientists change their ideas when they get new data. Explain how your thinking changed during the case. What was your first hypothesis? Which tests ruled ideas out, and how did you reach the diagnosis? (3 to 5 sentences)',
          easy: 'What was your first guess? Which tests ruled ideas out? How did you find the cause? (3 to 5 sentences)',
          min: 120,
          support: false,
          starters: ['My first hypothesis was …', 'Test 1 showed that …, so …', 'Test 2 showed that …', 'Finally, Test 3 showed …', 'This shows that scientists …'],
          ideas: [
            { done: 'You named your first hypothesis.', q: 'Did you name your first hypothesis?', tip: 'Tell which of the three causes you guessed before running any tests.',
              all: [/(first|hypothes|guess|predict|thought)/, /(mutation|\bph\b|enzyme production|low enzyme|not enough enzyme|pancreas)/] },
            { done: 'You told how a test ruled out the mutation idea.', q: 'Did you say what the binding test showed?', tip: 'Test 1 measured how well the substrates fit. What did that show about the mutation idea?',
              all: [/(mutation|active site|fit|bind)/, /(rule|not the|wasn.?t|was not|isn.?t|100|normal|still fit|eliminat)/] },
            { done: 'You told how a test ruled out the pH idea.', q: 'Did you say what the pH test showed?', tip: 'Test 2 measured Gus’s pH and how his protease worked at pH 8. What did that show?',
              all: [/\bph\b/, /(rule|not the|wasn.?t|was not|isn.?t|normal|7\.9|same|eliminat)/] },
            { done: 'You explained how the data led to the diagnosis.', q: 'Did you explain how the last test found the cause?', tip: 'What did Test 3 show about how much enzyme Gus’s pancreas makes?',
              all: [/(pancreas|enzyme production|produc|made|make|epi)/, /(low|less|fewer|not enough|cause|lower)/] },
            { done: 'You wrote at least 3 sentences.', q: 'Did you write at least 3 sentences?', tip: 'Write about your first idea, the tests, and the final answer.', sentences: 3 }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 6 */
    {
      title: 'Treatment and case report',
      intro: 'You found the cause. Now help Gus get better, and write his case report for the veterinarian.',
      read: '<p><b>Treatment for EPI.</b> Gus’s pancreas cannot make enough digestive enzymes, so the veterinarian prescribes an <b>enzyme supplement</b>: a powder mixed into every meal. The powder contains protease, lipase, and carbohydrase.</p>'
        + '<p>The supplement raises the <b>concentration</b> (amount) of enzymes in Gus’s small intestine. More enzymes means a faster reaction rate, so his food is broken down quickly. Now his body can absorb the nutrients and use them to build muscle and make energy.</p>'
        + '<p><b>Results.</b> Ms. Kinzy weighed Gus every week after he started the supplement. Two months later, Gus is back near his healthy weight, and he is energetic and playful again. EPI cannot be cured, so Gus will take the supplement with every meal for the rest of his life.</p>',
      images: [
        { src: 'media/gus-home.jpg', width: 300, alt: 'Gus, a yellow Labrador retriever, lying on a patterned rug at home. He looks full-bodied and healthy.', caption: 'Gus at home, two months after starting his enzyme supplement.' }
      ],
      questions: [
        {
          type: 'selects',
          text: 'Explain how the enzyme supplement helps Gus. Complete each sentence.',
          easy: 'How does the supplement help Gus? Complete each sentence.',
          hint: 'Open the reading and follow the steps of the treatment, one at a time.',
          items: [
            { label: 'The amount of enzymes in Gus’s small intestine goes', options: ['Up', 'Down', 'Stays the same'], answer: 'Up' },
            { label: 'The reaction rate of digestion in his small intestine goes', options: ['Up', 'Down', 'Stays the same'], answer: 'Up' },
            { label: 'The nutrients Gus’s body can absorb', options: ['Increase', 'Decrease', 'Stay the same'], answer: 'Increase' },
            { label: 'Gus’s weight', options: ['Increases', 'Decreases', 'Stays the same'], answer: 'Increases' }
          ]
        },
        {
          type: 'readgraph',
          text: 'Gus’s weight after treatment. Use the graph to find Gus’s weight 4 weeks and 8 weeks after he started the supplement.',
          easy: 'Read the graph. How much did Gus weigh at week 4 and at week 8?',
          support: false,
          unit: 'lb',
          graph: {
            title: 'Gus’s weight after starting the enzyme supplement',
            alt: 'Line graph of Gus’s weight in pounds over 8 weeks. It starts at 60 pounds at week 0 and rises quickly at first, then more slowly, leveling off near 80 pounds.',
            x: { min: 0, max: 8, step: 1, minor: 0.5, label: 'Weeks after starting the supplement', unit: 'weeks' },
            y: { min: 55, max: 85, step: 5, minor: 1, label: 'Weight (lb)' },
            fn: function (w) { return 80 - 20 * Math.exp(-w / 3); },
            start: 0, slider: 0.5, sliderLabel: 'Week: '
          },
          items: [
            { label: 'Weight at week 4', between: [73.5, 76], tip: 'Move the slider to week 4. Follow the dashed line up to the curve and across to the weight axis.' },
            { label: 'Weight at week 8', between: [77.5, 79.5], tip: 'Move the slider to week 8. Follow the dashed line up to the curve and across to the weight axis.' }
          ]
        },
        {
          type: 'highlight',
          cer: true,
          from: 'your lab tests in Part 5',
          text: 'Write Gus’s case report for the veterinarian. What is causing Gus to lose weight even though he eats a lot, and how will the treatment help? Make a claim, support it with evidence from your lab tests, and explain your reasoning using what you know about enzymes. (5 to 8 sentences)',
          easy: 'Write Gus’s case report. What is causing his weight loss? Give evidence from your lab tests. Explain how enzymes and the treatment fit in. (5 to 8 sentences)',
          min: 220,
          starters: ['Gus is losing weight because …', 'One piece of evidence is that Test 3 showed …', 'We ruled out an active site mutation because …', 'We also ruled out abnormal pH because …', 'This matters because enzymes …', 'The enzyme supplement will help because …'],
          ideas: [
            { done: 'You named the cause (low enzyme production or EPI).', q: 'Did you make a claim about the cause?', tip: 'Which of the three possible causes did your tests find? You can also give the name of the condition.',
              re: /(\bepi\b|exocrine|pancrea[a-z]* insufficien|(low|not enough|less|fewer)[^.]*(enzyme|production)|pancreas[^.]*(not|n.t|less|low|fewer)[^.]*(make|produc|secret))/ },
            { done: 'You used the enzyme production data as evidence.', q: 'Did you give evidence from Test 3?', tip: 'Tell what the enzyme production graphs showed for Gus compared to the healthy dog.',
              all: [/(test 3|production|produc|made|make|pancreas)/, /(healthy|control|normal|less|lower|only|\b1[245]\b|\b[89]0\b|85)/] },
            { done: 'You explained how other causes were ruled out.', q: 'Did you explain why it was not a mutation or abnormal pH?', tip: 'Tell what Test 1 or Test 2 showed, and why that rules out a cause.',
              all: [/(mutation|active site|\bph\b)/, /(100|7\.9|\bnormal|same|still fit|perfect)/] },
            { done: 'You explained why fewer enzymes means slow digestion.', q: 'Did you connect enzymes to digestion and weight loss?', tip: 'Enzymes speed up the reactions that break down food. What happens to the reaction rate, and to Gus, when there are fewer enzymes?',
              all: [/(enzyme|digest|break)/, /(slow|rate|absorb|nutrient|weight|energy|hungry)/] },
            { done: 'You explained how the treatment helps.', q: 'Did you explain how the supplement helps?', tip: 'What does the supplement add to Gus’s food, and what does that do in his small intestine?',
              all: [/(supplement|powder|treatment|medicine|added enzyme|add enzyme)/, /(digest|break|rate|absorb|weight|gain|concentration|more enzyme)/] },
            { done: 'You wrote at least 5 sentences.', q: 'Did you write at least 5 sentences?', tip: 'Write your claim, two or more pieces of evidence, your reasoning, and how the treatment helps.', sentences: 5 }
          ]
        }
      ]
    }
  ]
};
