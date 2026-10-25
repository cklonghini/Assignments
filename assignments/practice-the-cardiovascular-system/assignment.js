/*
  Practice - The Cardiovascular System (Anatomy & Physiology B)
  A virtual version of the classroom Discovery Stations. There is no video: each part is one station card
  (an image, with its words as text for the Listen button), and the Big Body Diagram labeling is done on
  numbered pictures. Card images and numbered diagrams are made with tools/station_images.py
  (the numbered-diagram settings are in diagrams.json).
  Station cards © It's Not Rocket Science.
  Text rules: *text* is shown in italics. Reading boxes (read, text) use HTML.
  Full guide: docs/ASSIGNMENT_FORMAT.md
*/
window.ASSIGNMENT = {
  title: 'Practice - The Cardiovascular System',
  course: 'Anatomy & Physiology B',
  storageKey: 'practice-the-cardiovascular-system-v1',
  partWord: 'Station',            // headings and progress bars say "Station 1" instead of "Part 1"
  icon: '<svg viewBox="0 0 64 72" aria-hidden="true" focusable="false"><rect x="6" y="10" width="52" height="52" rx="12" fill="var(--primary)"/><path d="M32 52 C16 41 13 33 13 27 a9.5 9.5 0 0 1 19 -3 a9.5 9.5 0 0 1 19 3 c0 6 -3 14 -19 25 z" fill="var(--primary-ink)"/></svg>',

  /* no video: this is the box at the top of the page */
  start: {
    heading: 'Discovery stations',
    intro: 'In class, these six station cards would be posted around the room. Here, each part of this page is one station. Read the station card, then answer the questions under it. Do not leave a station until you have answered all of its questions. Remember, Eagles! Quality matters more than quantity, but don’t leave out anything you think is worth noting.',
    after: 'Select a card to open it full size in a new tab. If the card is hard to read, use the Listen button under it, or open “Show the words on this card as text.” In class you would label a Big Body Diagram. Here you label numbered pictures instead. You will also answer three written questions, and in one of them you will highlight your evidence in yellow.'
  },

  parts: [
    /* ---------------------------------------------------------------- Station 1 */
    {
      title: 'Overview',
      images: [{
        src: 'media/station-card-1.jpg',
        alt: 'Station 1 card, Overview. A drawing of a body shows arteries in red and veins in blue running from the heart to the whole body.',
        caption: 'Station 1 card.',
        text: '<p><b>Station 1: Overview</b></p>'
          + '<p>The cardiovascular, or circulatory, system consists of the heart, blood vessels, and the blood that the vessels transport throughout the body. Your heart acts like a pump to move blood through the blood vessels. It sends oxygen-poor blood through veins to the heart and then to the lungs to become oxygenated. It then sends oxygen-rich blood back to the heart to be pumped through arteries to the rest of the body so that our organs and tissues have all of the nutrients they need.</p>'
          + '<p>Key terms for understanding the overall process of circulation:</p>'
          + '<p><b>Blood flow</b> = the volume of blood flowing through a blood vessel, organ, or the entire circulation system in a given period (mL/min). Blood flow throughout the entire system is equal to cardiac output and is relatively constant, but can vary widely among various organs based on their individual needs.</p>'
          + '<p><b>Blood pressure (BP)</b> = the force per unit area exerted on a vessel wall by the blood inside of it (mmHg). Differences in blood pressure (the hydrostatic pressure gradient) create the driving force that keeps blood constantly flowing from areas of high pressure to areas of low pressure.</p>'
          + '<p><b>Resistance</b> = the opposition to flow; the measure of the amount of friction blood encounters as it passes through the blood vessels. It is affected by the blood’s viscosity, the length of a given blood vessel, and the diameter of the blood vessel.</p>'
          + '<p>The greater the difference in blood pressure (ΔP), the greater the blood flow. The lower the resistance, the greater the blood flow.</p>'
          + '<p>Picture note: veins are shown in blue (but they aren’t actually blue!). Arteries are shown in red.</p>'
      }],
      questions: [
        {
          type: 'choice',
          text: 'What are the three main components of the cardiovascular system?',
          options: ['The heart, the lungs, and the blood', 'Arteries, veins, and capillaries', 'The heart, the blood vessels, and the blood', 'The heart, the blood vessels, and the lungs'],
          answer: 2,
          explain: 'The cardiovascular system is the heart, the blood vessels, and the blood that the vessels carry through the body.',
          tip: 'Read the first sentence of Station 1. One choice lists only kinds of blood vessels, and the lungs belong to a different body system.'
        },
        {
          type: 'selects',
          text: 'Define blood flow, blood pressure, and resistance. Match each definition to its key term.',
          options: ['Blood flow', 'Blood pressure', 'Resistance'],
          items: [
            { label: 'The volume of blood moving through a vessel, an organ, or the whole system in a given time (mL/min)', answer: 'Blood flow',
              hint: 'Look at the units at the end. Which key term on Station 1 is measured in mL/min?' },
            { label: 'The force per unit area that the blood puts on a vessel wall (mmHg)', answer: 'Blood pressure',
              hint: 'Look at the units at the end. Which key term on Station 1 is measured in mmHg?' },
            { label: 'The opposition to flow: how much friction blood meets as it passes through the vessels', answer: 'Resistance',
              hint: 'Which key term on Station 1 talks about friction?' }
          ]
        },
        {
          type: 'choice',
          text: 'Why does it make sense that blood flow varies throughout different organs?',
          options: [
            'The heart pumps a different amount of blood every second.',
            'Each organ has its own needs, so blood flow to each organ changes with what it needs.',
            'Organs that are farther from the heart always get less blood.',
            'Blood flow through the whole body is never the same from minute to minute.'
          ],
          answer: 1,
          explain: 'Station 1 says blood flow through the whole system is relatively constant, but it can vary widely among organs based on their individual needs. For example, a working muscle needs more oxygen than a resting one.',
          tip: 'Read the end of the blood flow definition on Station 1. It says what blood flow in the whole system does, and what the flow to each organ is based on.'
        },
        {
          type: 'selects',
          text: 'Blood will travel from areas of ______ to areas of ______.',
          options: ['high pressure', 'low pressure'],
          items: [
            { label: 'Blood travels from areas of…', answer: 'high pressure', hint: 'Read the blood pressure definition on Station 1. It says which way the driving force pushes blood.' },
            { label: '…to areas of…', answer: 'low pressure', hint: 'Read the blood pressure definition on Station 1. It says which way the driving force pushes blood.' }
          ]
        },
        {
          type: 'selects',
          text: 'What two factors will increase blood flow? Choose the word that finishes each sentence.',
          items: [
            { label: 'Blood flow increases when the difference in blood pressure (ΔP) is…', options: ['greater', 'smaller'], answer: 'greater',
              hint: 'Read the two sentences at the bottom of Station 1.' },
            { label: 'Blood flow increases when resistance is…', options: ['higher', 'lower'], answer: 'lower',
              hint: 'Read the two sentences at the bottom of Station 1.' }
          ]
        },
        {
          type: 'written',
          text: 'List the three factors that affect resistance. Then explain how you think each one has an effect on resistance. (3 to 5 sentences)',
          min: 80,
          ideas: [
            { done: 'You named viscosity (how thick the blood is).', q: 'Did you name the factor that is about the blood itself?',
              tip: 'The resistance definition on Station 1 lists three factors. One of them describes the blood, not the vessel.',
              re: /viscos|thick|sticky|thin(ner)? blood|runny|watery/ },
            { done: 'You named the length of the blood vessel.', q: 'Did you name the factor about how long the vessel is?',
              tip: 'One factor on Station 1 is a measurement of the vessel from end to end.',
              re: /length|long|short/ },
            { done: 'You named the diameter of the blood vessel.', q: 'Did you name the factor about how wide the vessel is?',
              tip: 'One factor on Station 1 is a measurement across the vessel.',
              re: /diameter|width|wide|narrow|radius|skinny|small(er)? (blood )?vessel|big(ger)? (blood )?vessel|large(r)? (blood )?vessel|size of the (blood )?vessel/ },
            { done: 'You explained whether each factor raises or lowers resistance.', q: 'Did you explain how each factor changes resistance?',
              tip: 'For each factor, say whether more of it makes blood flow harder or easier. Think about drinking a thick milkshake through a long, skinny straw.',
              re: /more resist|less resist|increase|decrease|higher|lower|raise|harder|easier|slow|fast|friction|more difficult|less difficult/ },
            { done: 'You wrote at least 3 sentences.', q: 'Did you write 3 to 5 full sentences?', tip: 'Write one sentence for each factor.', sentences: 3 }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Station 2 */
    {
      title: 'Blood Vessels',
      images: [{
        src: 'media/station-card-2.jpg',
        alt: 'Station 2 card, Blood Vessels. A diagram shows an artery branching into a capillary bed that drains into a vein, and a photo shows varicose veins on the backs of a person’s legs.',
        caption: 'Station 2 card.',
        text: '<p><b>Station 2: Blood Vessels</b></p>'
          + '<p><b>Blood vessels</b> are the dynamic structures that create pathways that constrict and relax in order to transport blood throughout the body. They form a closed delivery system that begins and ends at the heart. If you stretched out all your blood vessels, they would cover 60,000 miles!</p>'
          + '<p><b>Arteries</b> carry blood away from the heart. In systemic circulation, this means carrying oxygen-rich blood to different parts of the body. In pulmonary circulation, this means carrying oxygen-poor blood to the lungs.</p>'
          + '<p>Arteries branch into smaller <b>arterioles</b>, which feed into capillary beds in our different organs and tissues. <b>Capillaries</b> in the capillary beds are the smallest blood vessels with the thinnest walls in order to maximize the exchange of materials (gases, nutrients, hormones, etc.) between the blood and the interstitial fluid. Capillaries feed into <b>venules</b>, the smallest veins, and then bigger and bigger veins, until eventually getting back to the heart.</p>'
          + '<p><b>Veins</b> carry blood towards the heart. In systemic circulation, this means carrying oxygen-poor blood from the body to the heart. In pulmonary circulation, it means carrying oxygen-rich blood from the lungs to the heart. <b>Venous valves</b> prevent blood from flowing backward in the veins, and are most abundant in our limbs where gravity opposes the upward flow of blood. If these valves become incompetent and leaky, it can result in dilated <b>varicose veins</b>, which nearly 15% of adults suffer from.</p>'
          + '<p>Diagram labels: artery (top, where blood flows in), capillary (the network in the middle), vein (bottom, where blood flows out).</p>'
      }],
      questions: [
        {
          type: 'selects',
          text: 'All blood vessels begin and end at the ______.',
          items: [
            { label: 'All blood vessels begin and end at the…', options: ['lungs', 'heart', 'capillaries', 'brain'], answer: 'heart',
              hint: 'Read the first paragraph of Station 2. It says the blood vessels form a closed delivery system.' }
          ]
        },
        {
          type: 'selects',
          text: 'Big Body Diagram: label the blood vessels in this picture. (On your Big Body Diagram, this is the picture in the bottom left corner.)',
          image: { src: 'media/label-vessels.png', alt: 'A capillary bed diagram with three numbered blood vessels. Number 1 is the tube at the top where blood flows in. Number 2 is the network of tiny vessels in the middle. Number 3 is the tube at the bottom where blood flows out.', caption: 'Use the Station 2 card to name each numbered vessel.' },
          options: ['Artery', 'Capillary', 'Vein'],
          items: [
            { label: 'Number 1', answer: 'Artery', hint: 'Follow the white arrow. Blood flows into the bed here, coming from the heart.' },
            { label: 'Number 2', answer: 'Capillary', hint: 'This is the network of the smallest vessels, where materials are exchanged.' },
            { label: 'Number 3', answer: 'Vein', hint: 'Blood flows out of the bed here, on its way back to the heart.' }
          ]
        },
        {
          type: 'selects',
          text: 'Differentiate between arteries and veins. Choose Arteries or Veins for each description.',
          options: ['Arteries', 'Veins'],
          hint: 'Read the red and blue paragraphs on Station 2. Start with which way the blood is going: toward the heart or away from it.',
          items: [
            { label: 'Carry blood away from the heart', answer: 'Arteries' },
            { label: 'Carry blood toward the heart', answer: 'Veins' },
            { label: 'In systemic circulation, carry oxygen-poor blood from the body to the heart', answer: 'Veins' },
            { label: 'In pulmonary circulation, carry oxygen-poor blood to the lungs', answer: 'Arteries' },
            { label: 'Have valves that keep blood from flowing backward', answer: 'Veins' }
          ]
        },
        {
          type: 'choice',
          text: 'Where are capillary beds located?',
          options: ['Only in the lungs', 'Inside the chambers of the heart', 'In our organs and tissues, between the arterioles and the venules', 'Between the aorta and the vena cava'],
          answer: 2,
          explain: 'Arterioles feed into capillary beds in our different organs and tissues, and the capillaries feed into venules.',
          tip: 'Read the middle paragraph of Station 2. Which small vessels feed into the capillary beds, and which small vessels do the capillaries feed into?'
        },
        {
          type: 'choice',
          text: 'How does the structure of capillaries dictate (decide) their critical function?',
          options: [
            'They have thick, muscular walls, so they can push blood back to the heart.',
            'They have valves, so blood can only flow one way.',
            'They are the largest vessels, so they can carry the most blood.',
            'They are the smallest vessels with the thinnest walls, so materials can easily pass between the blood and the fluid around the cells.'
          ],
          answer: 3,
          explain: 'Thin walls give gases, nutrients, and hormones only a short way to go, which maximizes the exchange between the blood and the interstitial fluid.',
          tip: 'Station 2 describes the size and walls of capillaries, and gives the reason in the same sentence. What is that reason?'
        },
        {
          type: 'selects',
          text: 'What key role do the venous valves play? Where in our bodies do they play the biggest role, and why does this make sense?',
          items: [
            { label: 'What venous valves do', options: ['Push blood out of the heart', 'Keep blood from flowing backward', 'Add oxygen to the blood', 'Make the blood thicker'], answer: 'Keep blood from flowing backward',
              hint: 'Read the last paragraph of Station 2.' },
            { label: 'Where they play the biggest role', options: ['In the brain', 'In the lungs', 'In the limbs (arms and legs)', 'In the heart'], answer: 'In the limbs (arms and legs)',
              hint: 'Station 2 says where in the body these valves are most abundant.' },
            { label: 'Why that makes sense', options: ['Blood moves fastest there', 'Gravity pulls against blood moving up toward the heart', 'Those veins are closest to the heart', 'There is no blood pressure there'], answer: 'Gravity pulls against blood moving up toward the heart',
              hint: 'Think about which way blood in your legs has to travel to get back to your heart, and what pulls against it.' }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Station 3 */
    {
      title: 'The Heart, An Overview',
      images: [{
        src: 'media/station-card-3.jpg',
        alt: 'Station 3 card, The Heart: An Overview. It shows where the heart sits in the chest, a labeled outside view of the heart, and a close-up of the layers of the pericardium.',
        caption: 'Station 3 card.',
        text: '<p><b>Station 3: The Heart, An Overview</b></p>'
          + '<p>The heart is the pump that powers the entire cardiovascular system. An adult heart is the size of two fists clasped together, weighing just under a pound (between 250 and 350 grams). Your heart is enclosed within the <b>mediastinum</b> (along with your thymus gland, esophagus, and trachea) of your <b>thoracic cavity</b>. It sits on the superior surface of your diaphragm, posterior to the sternum and anterior to your vertebral column, with your lungs on either side of it. It sits at a tilt along your medial line so that 2/3 of it lies to the left (which is why we feel it most beneath the left breast) and the other 1/3 is on the right.</p>'
          + '<p>It is enclosed in a double-walled sac called the <b>pericardium</b>. The superficial layer (the <b>fibrous pericardium</b>) is a tough and dense connective tissue that protects the heart and anchors it to surrounding structures. The deeper <b>serous pericardium</b> is a thin and slippery 2-layer (parietal and visceral) serous membrane that contains serous fluid in its <b>pericardial cavity</b> so that the heart can contract in a frictionless environment.</p>'
          + '<p>Inside, the wall of the heart has 3 layers: the epicardium, myocardium, and endocardium. The <b>myocardium</b> is the layer that contracts.</p>'
          + '<p>Outside view labels, starting at the top left and going around: right pulmonary artery, superior vena cava, aorta (aortic arch), left pulmonary artery, auricle of left atrium, left pulmonary veins, left coronary artery and great cardiac vein, apex, aorta (descending), inferior vena cava, right coronary artery and anterior cardiac vein, auricle of right atrium, right pulmonary veins.</p>'
          + '<p>Pericardium close-up labels: normal pericardium, cardiac muscle, fibrous pericardium, pericardial cavity, visceral pericardium, parietal pericardium. Pericarditis is caused by excess fluid in the pericardial cavity following an inflammation.</p>'
      }],
      questions: [
        {
          type: 'selects',
          text: 'Big Body Diagram: label each structure on the outside (external view) of the heart.',
          image: { src: 'media/label-heart-outside.png', alt: 'The outside view of the heart from the Station 3 card, with its 13 labels replaced by the numbers 1 to 13, going clockwise from the top left.', caption: 'Find the same spot on the Station 3 card and read its label.' },
          options: ['Aorta (aortic arch)', 'Aorta (descending)', 'Apex', 'Auricle of left atrium', 'Auricle of right atrium', 'Inferior vena cava', 'Left coronary artery and great cardiac vein', 'Left pulmonary artery', 'Left pulmonary veins', 'Right coronary artery and anterior cardiac vein', 'Right pulmonary artery', 'Right pulmonary veins', 'Superior vena cava'],
          hint: 'Find the same arrow on the Station 3 card and read its label. Right and left mean the heart’s own right and left, so they are flipped from your view.',
          items: [
            { label: 'Number 1', answer: 'Right pulmonary artery' },
            { label: 'Number 2', answer: 'Superior vena cava' },
            { label: 'Number 3', answer: 'Aorta (aortic arch)' },
            { label: 'Number 4', answer: 'Left pulmonary artery' },
            { label: 'Number 5', answer: 'Auricle of left atrium' },
            { label: 'Number 6', answer: 'Left pulmonary veins' },
            { label: 'Number 7', answer: 'Left coronary artery and great cardiac vein' },
            { label: 'Number 8', answer: 'Apex' },
            { label: 'Number 9', answer: 'Aorta (descending)' },
            { label: 'Number 10', answer: 'Inferior vena cava' },
            { label: 'Number 11', answer: 'Right coronary artery and anterior cardiac vein' },
            { label: 'Number 12', answer: 'Auricle of right atrium' },
            { label: 'Number 13', answer: 'Right pulmonary veins' }
          ]
        },
        {
          type: 'selects',
          text: 'Summarize the location of the heart in the human body. Choose the word or phrase that finishes each sentence.',
          note: 'Anterior means in front. Posterior means behind.',
          items: [
            { label: 'The heart is in this body cavity:', options: ['abdominal cavity', 'thoracic cavity', 'cranial cavity', 'pelvic cavity'], answer: 'thoracic cavity',
              hint: 'Read the first paragraph of Station 3. Look for the green words.' },
            { label: 'Inside that cavity, it is in the middle region called the:', options: ['pericardium', 'diaphragm', 'mediastinum', 'sternum'], answer: 'mediastinum',
              hint: 'This region also holds the thymus gland, esophagus, and trachea.' },
            { label: 'It sits on top of the:', options: ['stomach', 'diaphragm', 'liver', 'lungs'], answer: 'diaphragm',
              hint: 'Station 3 says the heart sits on the superior (top) surface of something.' },
            { label: 'In front of the heart (anterior to it) is the:', options: ['vertebral column', 'esophagus', 'sternum', 'diaphragm'], answer: 'sternum',
              hint: 'Station 3 says the heart is posterior to (behind) one bone and anterior to (in front of) another.' },
            { label: 'Behind the heart (posterior to it) is the:', options: ['sternum', 'vertebral column', 'thymus gland', 'diaphragm'], answer: 'vertebral column',
              hint: 'Station 3 says the heart is posterior to (behind) one bone and anterior to (in front of) another.' },
            { label: 'How much of the heart lies to the left of the midline:', options: ['about 1/3', 'about 1/2', 'about 2/3', 'all of it'], answer: 'about 2/3',
              hint: 'Read the last sentence of the first paragraph on Station 3.' }
          ]
        },
        {
          type: 'highlight',
          text: 'When the national anthem is sung or the pledge of allegiance is said, it is customary to place a hand over the heart. What is not completely anatomically accurate about where we are taught to place our hand? Where should we place our hand, based on where the heart is actually located? Use evidence from Station 3. (3 to 5 sentences)',
          min: 80,
          ideas: [
            { done: 'You said the heart is closer to the middle of the chest.', q: 'Did you say where the heart really sits?',
              tip: 'Station 3 says the heart sits along the medial line, posterior to the sternum.',
              re: /middle|center|centre|midline|medial|sternum|breast ?bone|chest ?bone/ },
            { done: 'You explained how the heart is split between the left and right.', q: 'Did you explain how much of the heart is on each side?',
              tip: 'Station 3 gives fractions for how much of the heart lies on each side.',
              re: /2\/3|two.thirds|1\/3|one.third|tilt|mostly (on the )?left|more (on the |to the )?left|slightly (to the )?left|a little (to the )?left|both sides|right side too/ },
            { done: 'You said where we should place our hand.', q: 'Did you say where we should place our hand instead?',
              tip: 'Finish your answer by telling exactly where a hand should go to be over the heart.',
              re: /should (place|put|go|be)|place (our|your|my|a|the) hands?|put (our|your|my|a|the) hands?|hands? (should|would|needs to)/ },
            { done: 'You wrote at least 3 sentences.', q: 'Did you write 3 to 5 full sentences?', tip: 'Add a sentence that explains your reasoning.', sentences: 3 },
            { done: 'You highlighted your evidence in yellow.', q: 'Did you highlight your evidence in yellow?', tip: 'Select the words where you used facts from Station 3, then press the yellow button.', highlight: true }
          ]
        },
        {
          type: 'selects',
          text: 'Explain the roles of the pericardium and the pericardial cavity in the function of the heart. Match each part to its description.',
          options: [
            'Protects the heart and anchors it to surrounding structures',
            'A thin, slippery membrane with 2 layers (parietal and visceral)',
            'The space with serous fluid that lets the heart contract without friction',
            'The layer of the heart wall that contracts'
          ],
          items: [
            { label: 'Fibrous pericardium (the tough outer layer)', answer: 'Protects the heart and anchors it to surrounding structures',
              hint: 'Station 3 says this layer is tough, dense connective tissue. What two jobs does it do?' },
            { label: 'Serous pericardium (the deeper layer)', answer: 'A thin, slippery membrane with 2 layers (parietal and visceral)',
              hint: 'Read how Station 3 describes the deeper part of the pericardium.' },
            { label: 'Pericardial cavity', answer: 'The space with serous fluid that lets the heart contract without friction',
              hint: 'Read the end of the pericardium paragraph on Station 3. What does the fluid let the heart do?' }
          ]
        },
        {
          type: 'selects',
          text: 'Which layer of the heart is responsible for the contractions that give us a heartbeat and let the heart work as a pump? What type of tissue do you think this layer must be made of?',
          items: [
            { label: 'Layer that contracts', options: ['epicardium', 'myocardium', 'endocardium', 'pericardium'], answer: 'myocardium',
              hint: 'Station 3 names the three layers of the heart wall, then tells which one contracts.' },
            { label: 'Type of tissue', options: ['connective tissue', 'nervous tissue', 'cardiac muscle', 'epithelial tissue'], answer: 'cardiac muscle',
              hint: 'Which tissue type can contract? The small pericardium close-up on Station 3 labels this layer.' }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Station 4 */
    {
      title: 'The Heart, A Closer Look',
      images: [{
        src: 'media/station-card-4.jpg',
        alt: 'Station 4 card, The Heart: A Closer Look. A labeled inside view of the heart shows the four chambers, the four valves, the chordae tendineae, the septum, and the large blood vessels.',
        caption: 'Station 4 card.',
        text: '<p><b>Station 4: The Heart, A Closer Look</b></p>'
          + '<p>Your heart is designed to act as a pump to circulate blood through your blood vessels to the rest of your body. To do this, it must maintain pressure by generating pressure gradients: high pressure pushes O<sub>2</sub>-rich blood out of the heart, while low pressure pulls O<sub>2</sub>-poor blood into the heart. Fluid likes to move from areas of high pressure to areas of low pressure, so by creating these gradients, your heart is able to circulate the blood.</p>'
          + '<p>The two superior chambers, the <b>right and left atria</b>, have lower pressure in order to receive blood into the heart that has been circulating in the body. They are thin-walled, as they only need to contract a little to move blood into the ventricles. The <b>superior vena cava</b> vein receives blood from the body region above the diaphragm, and the <b>inferior vena cava</b> (the body’s largest vein) receives blood from the body region below the diaphragm.</p>'
          + '<p>The two inferior chambers, the <b>right and left ventricles</b>, have higher pressure in order to push blood out of the heart and towards the rest of the body. When the ventricles contract, they pump blood out of the heart and into circulation. The right ventricle pumps blood into the <b>pulmonary trunk</b>, to send it to the lungs. The left ventricle sends blood through the <b>aorta</b> (the body’s largest artery) to disperse it throughout the body.</p>'
          + '<p>Each chamber has a valve that allows blood to only flow in one direction.</p>'
          + '<p><b>Atrioventricular (AV) valves</b> (tricuspid and mitral/bicuspid) are found at the junction between the atria and ventricles. These valves prevent blood from flowing back into the atria each time the ventricles contract.</p>'
          + '<p>Fun fact: Ever heard the phrase “pulling at my heart strings”? Your heart strings are actually your <b>chordae tendineae</b>, tiny white collagen cords that anchor the AV valve flaps to the papillary muscles in the ventricular walls.</p>'
          + '<p><b>Semilunar (SL) valves</b> (aortic and pulmonary) are found at the base of the ventricles, where they meet the arteries. These valves prevent blood from flowing back into the ventricles.</p>'
          + '<p>Inside view labels, down the left side: right pulmonary artery, right pulmonary veins, right atrium, aortic valve, tricuspid valve, chordae tendineae, inferior vena cava, right ventricle. Across the top: superior vena cava, aorta (aortic arch). Down the right side: left pulmonary artery, left pulmonary veins, pulmonary trunk, left atrium, mitral (bicuspid) valve, pulmonary valve, left ventricle, interventricular septum. At the bottom: descending aorta.</p>'
      }],
      questions: [
        {
          type: 'selects',
          text: 'Big Body Diagram: label each structure on the inside (internal view) of the heart. The blood vessels are already labeled for you.',
          image: { src: 'media/label-heart-inside.png', alt: 'The inside view of the heart from the Station 4 card. The blood vessels keep their labels. The chambers, valves, chordae tendineae, septum, and pulmonary trunk are numbered 1 to 11: numbers 1 to 6 down the right side, and 7 to 11 going up the left side.', caption: 'Find the same spot on the Station 4 card and read its label.' },
          options: ['Aortic valve', 'Chordae tendineae', 'Interventricular septum', 'Left atrium', 'Left ventricle', 'Mitral (bicuspid) valve', 'Pulmonary trunk', 'Pulmonary valve', 'Right atrium', 'Right ventricle', 'Tricuspid valve'],
          hint: 'Find the same arrow on the Station 4 card and read its label. Right and left mean the heart’s own right and left, so they are flipped from your view.',
          items: [
            { label: 'Number 1', answer: 'Pulmonary trunk' },
            { label: 'Number 2', answer: 'Left atrium' },
            { label: 'Number 3', answer: 'Mitral (bicuspid) valve' },
            { label: 'Number 4', answer: 'Pulmonary valve' },
            { label: 'Number 5', answer: 'Left ventricle' },
            { label: 'Number 6', answer: 'Interventricular septum' },
            { label: 'Number 7', answer: 'Right ventricle' },
            { label: 'Number 8', answer: 'Chordae tendineae' },
            { label: 'Number 9', answer: 'Tricuspid valve' },
            { label: 'Number 10', answer: 'Aortic valve' },
            { label: 'Number 11', answer: 'Right atrium' }
          ]
        },
        {
          type: 'choice',
          text: 'How does your heart use pressure gradients to circulate your blood?',
          options: [
            'It keeps the pressure the same everywhere so the blood can rest.',
            'It uses low pressure to push blood out and high pressure to pull blood in.',
            'It uses high pressure to push blood out and low pressure to pull blood in, and blood moves from high to low pressure.',
            'It uses the lungs to squeeze the blood forward.'
          ],
          answer: 2,
          explain: 'High pressure pushes oxygen-rich blood out of the heart, and low pressure pulls oxygen-poor blood in. Fluid moves from high to low pressure, so these gradients keep the blood moving.',
          tip: 'Read the first paragraph of Station 4. Which kind of pressure pushes blood out, and which kind pulls blood in?'
        },
        {
          type: 'choice',
          text: 'Why would the ventricles need thicker walls for contraction than the atria?',
          options: [
            'The ventricles receive blood from the body, so they need to stretch more.',
            'The atria do all of the pumping, so they need thin walls to move fast.',
            'Thicker walls keep oxygen from leaking out of the ventricles.',
            'The ventricles must push blood out of the heart to the lungs and the whole body, while the atria only push blood a short way into the ventricles.'
          ],
          answer: 3,
          explain: 'The ventricles have higher pressure so they can push blood out of the heart and into circulation. The thin-walled atria only need to contract a little to move blood into the ventricles.',
          tip: 'Station 4 tells how hard each pair of chambers has to contract and where each pair sends its blood.'
        },
        {
          type: 'selects',
          text: 'Differentiate between the roles of the superior vena cava and the inferior vena cava.',
          note: 'Superior means above. Inferior means below.',
          options: ['Superior vena cava', 'Inferior vena cava'],
          hint: 'Read the atria paragraph on Station 4. Find the sentence about the two vena cava veins.',
          items: [
            { label: 'Brings in blood from the body region above the diaphragm', answer: 'Superior vena cava' },
            { label: 'Brings in blood from the body region below the diaphragm', answer: 'Inferior vena cava' },
            { label: 'The body’s largest vein', answer: 'Inferior vena cava' }
          ]
        },
        {
          type: 'selects',
          text: 'Differentiate between the roles of the pulmonary trunk and the aorta.',
          options: ['Pulmonary trunk', 'Aorta'],
          hint: 'Read the ventricles paragraph on Station 4. Each ventricle sends its blood into a different vessel.',
          items: [
            { label: 'Gets blood from the right ventricle', answer: 'Pulmonary trunk' },
            { label: 'Gets blood from the left ventricle', answer: 'Aorta' },
            { label: 'Sends blood to the lungs', answer: 'Pulmonary trunk' },
            { label: 'Sends blood out to the rest of the body', answer: 'Aorta' },
            { label: 'The body’s largest artery', answer: 'Aorta' }
          ]
        },
        {
          type: 'selects',
          text: 'Differentiate between the roles of the atrioventricular (AV) valves and the semilunar (SL) valves.',
          note: 'Atrio- means atrium. Ventricular means ventricle.',
          options: ['AV valves', 'SL valves'],
          hint: 'Read the bottom of Station 4, including the fun fact.',
          items: [
            { label: 'The tricuspid and mitral (bicuspid) valves', answer: 'AV valves' },
            { label: 'The aortic and pulmonary valves', answer: 'SL valves' },
            { label: 'Found between the atria and the ventricles', answer: 'AV valves' },
            { label: 'Found at the base of the ventricles, where they meet the arteries', answer: 'SL valves' },
            { label: 'Keep blood from flowing back into the atria when the ventricles contract', answer: 'AV valves' },
            { label: 'Keep blood from flowing back into the ventricles', answer: 'SL valves' },
            { label: 'Anchored by the chordae tendineae (your “heart strings”)', answer: 'AV valves' }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Station 5 */
    {
      title: 'Blood Flow',
      images: [
        {
          src: 'media/station-card-5.jpg',
          alt: 'Station 5 card, Blood Flow. A heart diagram between the lungs at the top and a capillary bed at the bottom, with green, blue, and purple dotted arrows showing the path of blood.',
          caption: 'Station 5 card, with the blood flow arrows.',
          text: '<p><b>Station 5: Blood Flow</b></p>'
            + '<p>The overall goal of the circulation of blood is to take in oxygen-poor blood from our body’s tissues and send it to the lungs to become oxygenated (this pathway is shown in <b>green</b>) via the following pathway:</p>'
            + '<ul><li>Blood enters the right atrium through 3 veins: the <b>superior vena cava</b> (brings in blood from tissues above the diaphragm), the <b>inferior vena cava</b> (brings in blood from tissues below the diaphragm), and the <b>coronary sinus</b> (collects blood draining from the myocardium).</li>'
            + '<li>The <b>right atrium</b> pushes blood through the <b>tricuspid valve</b> into the <b>right ventricle</b>.</li>'
            + '<li>The right ventricle pumps blood through the <b>pulmonary semilunar valve</b> into the <b>pulmonary trunk</b> (a big vessel that splits to form the left and right pulmonary arteries).</li>'
            + '<li>The blood goes through the pulmonary arteries and travels to the <b>lungs</b> to be oxygenated.</li></ul>'
            + '<p>The oxygen-rich blood is then pumped back through the heart and out to the rest of the body (this pathway is shown in <b>blue</b>) via the following pathway:</p>'
            + '<ul><li>The blood gets back to the heart via <b>4 pulmonary veins</b>, traveling towards the area of lowest pressure: the inside of the relaxed left atrium.</li>'
            + '<li>The <b>left atrium</b> contracts (to increase the pressure) so that blood moves down through the <b>mitral valve</b> into the <b>left ventricle</b>.</li>'
            + '<li>The left ventricle flexes to increase pressure, causing blood to go through the <b>aortic semilunar valve</b> into the largest artery, the <b>aorta</b>, which sends oxygen-rich blood out to <b>the rest of the body</b>.</li></ul>'
            + '<p>Once our organs get the oxygen and nutrients from the blood that they need, the blood travels back to the heart through our veins (shown in <b>purple</b>). Upon arriving at the heart:</p>'
            + '<ul><li>Blood enters via the superior vena cava and the inferior vena cava veins into the right atrium.</li>'
            + '<li>The right atrium contracts so that blood can pass through the tricuspid valve into the right ventricle, and we are back where we started!</li></ul>'
            + '<p>Picture labels: lungs, where blood is oxygenated (top); aorta, pulmonary trunk, right atrium, left atrium, right ventricle, left ventricle (heart); capillary beds in tissues throughout the entire body (bottom).</p>'
        }
      ],
      questions: [
        {
          type: 'selects',
          text: 'Big Body Diagram: trace the path that blood flows. Choose the next stop for each step.',
          note: '<b>Start:</b> oxygen-poor blood comes back from the body in the superior and inferior vena cava. <b>End:</b> after step 14, the blood goes back into the vena cava and starts again.',
          options: ['Aorta', 'Aortic semilunar valve', 'Body tissues (capillary beds)', 'Left atrium', 'Left ventricle', 'Lungs', 'Mitral valve', 'Pulmonary arteries', 'Pulmonary semilunar valve', 'Pulmonary trunk', 'Pulmonary veins', 'Right atrium', 'Right ventricle', 'Tricuspid valve'],
          hint: 'Follow the bullets on Station 5 in order. Each step goes through one chamber, valve, or vessel. Make sure the step before this one is right first.',
          items: [
            { label: 'Step 1', answer: 'Right atrium' },
            { label: 'Step 2', answer: 'Tricuspid valve' },
            { label: 'Step 3', answer: 'Right ventricle' },
            { label: 'Step 4', answer: 'Pulmonary semilunar valve' },
            { label: 'Step 5', answer: 'Pulmonary trunk' },
            { label: 'Step 6', answer: 'Pulmonary arteries' },
            { label: 'Step 7', answer: 'Lungs' },
            { label: 'Step 8', answer: 'Pulmonary veins' },
            { label: 'Step 9', answer: 'Left atrium' },
            { label: 'Step 10', answer: 'Mitral valve' },
            { label: 'Step 11', answer: 'Left ventricle' },
            { label: 'Step 12', answer: 'Aortic semilunar valve' },
            { label: 'Step 13', answer: 'Aorta' },
            { label: 'Step 14', answer: 'Body tissues (capillary beds)' }
          ]
        },
        {
          type: 'written',
          text: 'Now summarize the path of blood through the heart, the lungs, and the body in your own words. (4 to 6 sentences)',
          min: 120,
          ideas: [
            { done: 'You told where oxygen-poor blood enters the heart.', q: 'Did you tell where oxygen-poor blood from the body enters the heart?',
              tip: 'Start your summary with the first bullet on Station 5: which veins bring blood in, and which chamber they empty into?',
              re: /vena cava|right atrium/ },
            { done: 'You explained that blood goes to the lungs to get oxygen.', q: 'Did you explain why the blood goes to the lungs?',
              tip: 'Station 5 says what happens to the blood in the lungs.',
              re: /oxygenat|lungs?[^.]*oxygen|oxygen[^.]*lungs?|pick(s|ed)? up oxygen|gets? oxygen/ },
            { done: 'You described blood coming back to the left side of the heart.', q: 'Did you describe how oxygen-rich blood comes back to the heart?',
              tip: 'After the lungs, which veins bring the blood back, and which side of the heart do they go to?',
              re: /pulmonary veins?|left (atrium|ventricle|side)/ },
            { done: 'You told how blood leaves the heart for the body.', q: 'Did you tell how oxygen-rich blood leaves the heart for the rest of the body?',
              tip: 'Which ventricle pumps blood out to the body, and through which large artery?',
              re: /aorta/ },
            { done: 'You wrote at least 4 sentences.', q: 'Did you write 4 to 6 full sentences?', tip: 'Add a sentence for each part of the trip: into the heart, to the lungs, back to the heart, and out to the body.', sentences: 4 }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Station 6 */
    {
      title: 'Circulation',
      images: [{
        src: 'media/station-card-7.jpg',
        alt: 'Station 6 card, Circulation. A diagram shows the pulmonary circuit looping from the heart up to the lungs, the systemic circuit looping from the heart down to the body, and the coronary circuit on the heart itself.',
        caption: 'Station 6 card.',
        text: '<p><b>Station 6: Circulation</b></p>'
          + '<p>The flow of blood follows two basic circuits: the Pulmonary Circuit and the Systemic Circuit.</p>'
          + '<ul><li><b>Pulmonary Circulation:</b> Blood is pumped from the right side of the heart to the lungs through pulmonary arteries where it picks up oxygen and releases carbon dioxide. The blood then returns to the heart through pulmonary veins.</li>'
          + '<li><b>Systemic Circulation:</b> Blood is pumped from the left side of the heart through the aorta to the rest of the body and then returns to the heart through the superior vena cava and inferior vena cava veins.</li></ul>'
          + '<p>Although the heart is only 1/200th of your body weight, it uses 1/20th of your blood supply! This means that the heart itself requires its own nourishment from arteries and veins connected to the aorta. This is done via <b>Coronary Circulation</b>.</p>'
          + '<ul><li>The <b>left and right coronary arteries</b> supply nutrients, like oxygenated blood, to the atria and ventricles. If they get blocked, it can lead to a heart attack.</li>'
          + '<li><b>Cardiac veins</b> drain away the deoxygenated blood. The <b>coronary sinus</b> is an enlarged blood vessel where the cardiac veins join together. It empties into the right atrium.</li></ul>'
          + '<p>Picture labels: pulmonary circuit (top, to the lungs), coronary circuit (on the heart), systemic circuit (bottom, to the body).</p>'
      }],
      questions: [
        {
          type: 'selects',
          text: 'In systemic circulation, arteries carry blood from the ______ to the ______. Veins carry blood from the ______ to the ______.',
          options: ['heart', 'lungs', 'rest of the body'],
          hint: 'Read the Systemic Circulation bullet on Station 6. Then remember from Station 2 which way arteries and veins carry blood.',
          items: [
            { label: 'Systemic arteries carry blood from the…', answer: 'heart' },
            { label: '…to the…', answer: 'rest of the body' },
            { label: 'Systemic veins carry blood from the…', answer: 'rest of the body' },
            { label: '…to the…', answer: 'heart' }
          ]
        },
        {
          type: 'selects',
          text: 'In pulmonary circulation, arteries carry blood from the ______ to the ______. Veins carry blood from the ______ to the ______.',
          options: ['heart', 'lungs', 'rest of the body'],
          hint: 'Read the Pulmonary Circulation bullet on Station 6. Then remember from Station 2 which way arteries and veins carry blood.',
          items: [
            { label: 'Pulmonary arteries carry blood from the…', answer: 'heart' },
            { label: '…to the…', answer: 'lungs' },
            { label: 'Pulmonary veins carry blood from the…', answer: 'lungs' },
            { label: '…to the…', answer: 'heart' }
          ]
        },
        {
          type: 'selects',
          text: 'Take a peek back at Station 5 (shown again here). Which pathway, green or blue, was describing the systemic circuit? Which was describing the pulmonary circuit?',
          image: { src: 'media/station-card-5.jpg', alt: 'The Station 5 card again, with its green and blue dotted arrows.', caption: 'Station 5 card. Read the green words and the blue words in the text, too.' },
          options: ['Green pathway', 'Blue pathway'],
          hint: 'On Station 5, the green words and arrows describe blood going to one place, and the blue ones describe blood going somewhere else. Which circuit goes to the lungs, and which goes to the rest of the body?',
          items: [
            { label: 'Systemic circuit', answer: 'Blue pathway' },
            { label: 'Pulmonary circuit', answer: 'Green pathway' }
          ]
        },
        {
          type: 'choice',
          text: 'Describe the role of coronary circulation.',
          options: [
            'It carries blood from the heart to the lungs to pick up oxygen.',
            'It supplies the heart muscle itself with oxygen-rich blood and nutrients, and drains away its oxygen-poor blood.',
            'It carries blood from the heart to the rest of the body.',
            'It carries blood from the lungs back to the heart.'
          ],
          answer: 1,
          explain: 'The heart is only 1/200th of your body weight but uses 1/20th of your blood supply, so it needs its own blood supply. That is coronary circulation.',
          tip: 'Read the Coronary Circulation part of Station 6. Whose cells does this circuit feed?'
        },
        {
          type: 'selects',
          text: 'Match each part of coronary circulation to its job. (On your Big Body Diagram, you labeled these on the outside of the heart. Look back at numbers 7 and 11 in Question 13.)',
          options: [
            'Supply oxygenated blood and nutrients to the atria and ventricles',
            'Drain away the deoxygenated blood',
            'Collects blood from the cardiac veins and empties into the right atrium'
          ],
          hint: 'Read the two bullets at the bottom of Station 6.',
          items: [
            { label: 'Left and right coronary arteries', answer: 'Supply oxygenated blood and nutrients to the atria and ventricles' },
            { label: 'Cardiac veins', answer: 'Drain away the deoxygenated blood' },
            { label: 'Coronary sinus', answer: 'Collects blood from the cardiac veins and empties into the right atrium' }
          ]
        },
        {
          type: 'choice',
          text: 'What can happen if a coronary artery gets blocked?',
          options: ['A heart attack', 'Varicose veins', 'The lungs stop working', 'Nothing, because the heart gets blood from inside its chambers'],
          answer: 0,
          explain: 'If a coronary artery is blocked, part of the heart muscle stops getting the oxygen-rich blood it needs. That can lead to a heart attack.',
          tip: 'Look under the coronary arteries bullet on Station 6.'
        }
      ]
    }
  ]
};
