/*
  Test - Unit 4 Transport (Anatomy & Physiology)
  A game board version of the Unit 4 Transport Test (Form A). Every test question is a tile.
  The test's question number is in `ref` and is printed on the PDF so the teacher can match it to the key.
  Students get 3 tries on each answer that checks itself. A wrong answer says "not quite" and counts the tries,
  but never shows the answer. Written tiles are graded by the teacher.
  Full guide: docs/ASSIGNMENT_FORMAT.md
*/
var WORD_BANK = ['Aorta', 'Aortic valve', 'Inferior vena cava', 'Left atrium', 'Left ventricle', 'Lungs', 'Mitral valve',
  'Pulmonary trunk', 'Pulmonary valve', 'Pulmonary veins', 'Right atrium', 'Right ventricle', 'Superior vena cava', 'Tricuspid valve'];
var ZONES = ['Conducting zone', 'Respiratory zone'];
var HEMOSTASIS = ['Coagulation', 'Platelet plug formation', 'Vascular spasm'];
var SIDES = ['right; systemic; lungs', 'right; pulmonary; lungs', 'left; systemic; body', 'left; pulmonary; body'];
var MORE_LESS = ['increase; increase', 'decrease; decrease', 'increase; decrease', 'decrease; increase'];
var TWO_SENTENCES = { done: 'You wrote at least 2 sentences.', q: 'Did you write at least 2 full sentences?', tip: 'Add a sentence that explains why.', sentences: 2 };

window.ASSIGNMENT = {
  title: 'Test - Unit 4 Transport',
  course: 'Anatomy & Physiology',
  storageKey: 'test-unit-4-transport-v1',

  board: {
    heading: 'Unit 4 Transport game board',
    tries: 3,                       // tries on each answer that checks itself
    credit: [1, 0.5, 0.25],         // share of the points for a right answer on try 1, 2, 3
    values: [100, 200, 300, 400, 500],
    categories: [
      {
        title: 'Blood Basics',
        tiles: [
          { ref: 3, type: 'choice', text: 'Which ion allows hemoglobin to readily bind with oxygen?',
            options: ['Fe2+', 'Na+', 'K+', 'Ca2+'], answer: 0 },
          { ref: 1, type: 'choice', text: 'Which of the following statements about mature red blood cells is NOT true?',
            options: ['Life span of around 120 days', 'No nuclei', 'Contain hemoglobin', 'Divide to make new cells when old ones need to be replaced'], answer: 3 },
          { ref: 11, type: 'choice', text: 'The amount of strain or force placed on the blood vessels as the blood moves through them is known as',
            options: ['pulse.', 'diastole.', 'tidal volume.', 'blood pressure.'], answer: 3 },
          { ref: 23, type: 'selects', text: 'Define hematopoiesis. Then name the two other organ systems that play a role in it.',
            items: [
              { label: 'Hematopoiesis means', options: ['blood cell formation', 'blood clot formation', 'blood flow through the heart', 'the breakdown of old red blood cells'], answer: 'blood cell formation' },
              { label: 'Where blood cells are made', options: ['Red bone marrow', 'Liver', 'Heart', 'Lungs'], answer: 'Red bone marrow' },
              { label: 'The organ system where blood cells are made', options: ['Skeletal system', 'Endocrine system', 'Nervous system', 'Digestive system', 'Respiratory system'], answer: 'Skeletal system' },
              { label: 'The organ system that controls it with the hormone EPO', options: ['Skeletal system', 'Endocrine system', 'Nervous system', 'Digestive system', 'Respiratory system'], answer: 'Endocrine system' }
            ] },
          { ref: 21, type: 'written', text: 'Explain how the unique shape of erythrocytes (red blood cells) enables them to best carry out their function. (2 to 4 sentences)',
            starters: ['The shape of a red blood cell is …', 'This shape helps it … because …'],
            min: 60,
            ideas: [
              { done: 'You described the shape.', q: 'Did you describe the shape of an erythrocyte?', tip: 'Think about what a red blood cell looks like from the side.', re: /biconcave|concave|flatten|flat|dis[ck]|donut|doughnut|dimpl|indent|squish/ },
              { done: 'You explained what the shape does for the cell.', q: 'Did you explain what the shape does for the cell?', tip: 'Think about how much of the cell touches the blood plasma around it.', re: /surface area|more area|more surface|more space|more room|bend|squeeze|flexib|fit through/ },
              { done: 'You named the job of a red blood cell.', q: 'Did you name the job of a red blood cell?', tip: 'What does a red blood cell carry around the body?', re: /oxygen|\bo2\b|gas exchange|gases|hemoglobin|haemoglobin|carbon dioxide|\bco2\b/ },
              TWO_SENTENCES
            ] }
        ]
      },
      {
        title: 'Blood Types & Clotting',
        tiles: [
          { ref: 2, type: 'choice', text: 'If your blood type is O-, that means',
            options: ['you have no agglutinogens on your red blood cells.', 'you have the rhesus antigens.', 'you only have anti-A antibodies in your blood plasma.', 'all of the above.'], answer: 0 },
          { ref: 22, type: 'choice', text: 'You are a doctor treating a patient with liver failure due to chronic alcoholism. One result is reduced synthesis of plasma proteins, like fibrin. What issue can you expect to arise because of this?',
            options: ['Their blood will not clot well, so bleeding will be hard to stop.', 'Their body will make too many red blood cells.', 'Their red blood cells will not be able to carry oxygen.', 'Their heart will beat too fast.'], answer: 0 },
          { ref: '25 a-b', type: 'selects', text: 'Assume you are blood type A.',
            items: [
              { label: 'a. What agglutinogens are on your red blood cells?', options: ['A agglutinogens', 'B agglutinogens', 'Both A and B agglutinogens', 'No agglutinogens'], answer: 'A agglutinogens' },
              { label: 'b. What antibodies do you have in your plasma?', options: ['Anti-A antibodies', 'Anti-B antibodies', 'Both anti-A and anti-B antibodies', 'No antibodies'], answer: 'Anti-B antibodies' }
            ] },
          { ref: 24, type: 'selects', text: 'List and describe the steps in the process of hemostasis. First put the steps in order. Then match each step to what happens.',
            options: HEMOSTASIS,
            items: [
              { label: 'Step 1', answer: 'Vascular spasm' },
              { label: 'Step 2', answer: 'Platelet plug formation' },
              { label: 'Step 3', answer: 'Coagulation' },
              { label: 'Platelets gather and stick to the damaged site and to each other', answer: 'Platelet plug formation' },
              { label: 'Fibrin proteins form a mesh-like clot to close the gap', answer: 'Coagulation' },
              { label: 'The blood vessel narrows (vasoconstriction) to slow blood flow to the damaged area', answer: 'Vascular spasm' }
            ] },
          { ref: '25 c-d', type: 'written', text: 'Assume you are blood type A. (c) What would happen if you received a blood transfusion from someone with type B blood, and why? (d) Who can you donate blood to, and why? Label your answers c and d.',
            starters: ['c. If I received type B blood, …', 'This happens because …', 'd. I can donate blood to … because …'],
            min: 80,
            ideas: [
              { done: 'For part c, you said what your body would do.', q: 'For part c, did you say what your body would do with the type B blood?', tip: 'Think about how your body treats blood it sees as foreign.', re: /attack|reject|react|clump|agglutinat|foreign|immune|destroy|clot/ },
              { done: 'For part c, you explained what causes it.', q: 'For part c, did you explain which part of your blood causes this?', tip: 'Look back at what you have in your plasma (part b).', re: /antibod|anti-?\s?b/ },
              { done: 'For part d, you named who can get your blood.', q: 'For part d, did you name the blood types that can get your blood?', tip: 'Go through each blood type and ask whether it would accept A agglutinogens.', re: /\bab\b|type a\b|\ba\b.{0,12}\bab\b/ },
              { done: 'For part d, you explained why.', q: 'For part d, did you explain why those people can get your blood?', tip: 'Think about the antibodies in the plasma of the person who gets your blood.', re: /anti-?\s?a|antibod|don'?t (make|have)|do not (make|have)|foreign|attack|agglutinogen/ },
              TWO_SENTENCES
            ] }
        ]
      },
      {
        title: 'Heart Anatomy',
        tiles: [
          { ref: 6, type: 'choice', text: 'The purpose of the serous fluid in the pericardial cavity is',
            options: ['to carry critical nutrients like oxygen to the heart.', 'to provide Ca2+ ions needed for muscle contraction.', 'to decrease friction between the layers of the heart as it contracts.', 'to lubricate the walls of the blood vessels to decrease resistance to blood flow.'], answer: 2 },
          { ref: 8, type: 'choice', text: 'Which of the following is true for both cardiac and skeletal muscle tissues?',
            options: ['Striated', 'Branched', 'Contract as a unit', 'Can spontaneously depolarize without input from the nervous system'], answer: 0 },
          { ref: 12, type: 'choice', text: 'Which of the following statements about the valves of the heart is FALSE?',
            options: ['The tricuspid valve is the semilunar valve on the right side of the heart.', 'The aortic valve prevents backflow into the left ventricle.', 'The mitral valve has two cusps between the left atrium and left ventricle.', 'The pulmonary valve guards the base of the pulmonary trunk.'], answer: 0 },
          { ref: 29, type: 'selects', text: 'Label parts A to F in the figure using the word bank. Not all words will be used.',
            img: { src: 'media/heart.png', alt: 'Drawing of the inside of the heart with six labels, A through F, each with an arrow pointing to a different part.' },
            options: WORD_BANK,
            items: [
              { label: 'A', answer: 'Superior vena cava' },
              { label: 'B', answer: 'Aorta' },
              { label: 'C', answer: 'Pulmonary veins' },
              { label: 'D', answer: 'Pulmonary trunk' },
              { label: 'E', answer: 'Tricuspid valve' },
              { label: 'F', answer: 'Left atrium' }
            ] },
          { ref: 27, type: 'written', text: 'Explain the function of the myocardium and why it needs to be thicker in one of the ventricles than the other. Be sure to clearly state which ventricle it is thicker in. (2 to 4 sentences)',
            starters: ['The function of the myocardium is …', 'It is thicker in the … ventricle because …'],
            min: 60,
            ideas: [
              { done: 'You explained what the myocardium does.', q: 'Did you explain what the myocardium does?', tip: 'Think about what job the muscle layer of the heart wall does.', re: /contract|pump|squeez|push|beat|muscle/ },
              { done: 'You named the ventricle with the thicker wall.', q: 'Did you clearly name which ventricle has the thicker wall?', tip: 'Compare where each ventricle sends its blood.', re: /left ventricle|left side|the left/ },
              { done: 'You explained why that ventricle needs more muscle.', q: 'Did you explain why that ventricle needs more muscle?', tip: 'Think about how far each ventricle has to push blood.', re: /body|systemic|farther|further|more force|more pressure|harder|stronger|everywhere|far/ },
              { done: 'You compared it to the other ventricle.', q: 'Did you say where the other ventricle sends its blood?', tip: 'Name the circuit the other ventricle pumps blood through.', re: /lungs?|pulmonary|right ventricle|right side/ },
              TWO_SENTENCES
            ] }
        ]
      },
      {
        title: 'Heartbeat & Pressure',
        tiles: [
          { ref: 10, type: 'choice', text: 'Which statement below correctly matches the structure with its function?',
            options: ['Veins carry blood away from the heart.', 'The atria are the high pressure receiving chambers of the heart.', 'The sinoatrial node initiates the action potential that causes the heart to beat.', 'Contractile cardiac muscle cells can trigger their own action potentials without neural input.'], answer: 2 },
          { ref: 9, type: 'choice', text: 'Which of the following statements about AEDs is FALSE?',
            options: ['They are tools used for someone experiencing sudden cardiac arrest.', 'An AED can be used to restart a heart with no electrical activity.', 'They get the cardiac cells contracting in sync again.', 'They work by stopping the heart for a second in order to reset it.'], answer: 1 },
          { ref: 13, type: 'choice', text: 'In order to increase blood flow, there needs to be a(n) _____ in the pressure gradient and a(n) _____ in the resistance.',
            options: MORE_LESS, answer: 2 },
          { ref: 7, type: 'choice', text: 'Which of the following accurately reflects the order of events that causes the heart to pump out blood?',
            options: ['Electrical event → distribution → mechanical event → pressure change → fluid movement', 'Electrical event → pressure change → mechanical event → distribution → fluid movement', 'Mechanical event → distribution → electrical event → pressure change → fluid movement', 'Mechanical event → pressure change → electrical event → distribution → fluid movement'], answer: 0 },
          { ref: 31, type: 'written', text: 'Describe the purpose of an electrocardiogram (EKG). Then describe what the EKG tracing would look like for a heart beating at a high frequency, a heart beating at a low frequency, and a heart that isn’t beating at all.',
            starters: ['An EKG is used to …', 'For a heart beating at a high frequency, the tracing would …', 'For a heart beating at a low frequency, …', 'For a heart that is not beating, …'],
            min: 80,
            ideas: [
              { done: 'You said what an EKG tracks.', q: 'Did you say what an EKG tracks?', tip: 'Think about what kind of activity the heart’s conduction system makes.', re: /electric|signal|impulse|depolariz|action potential/ },
              { done: 'You described a fast heartbeat.', q: 'Did you describe the tracing for a heart beating at a high frequency?', tip: 'Picture how far apart the spikes would be when the heart beats fast.', re: /(close|closer|tight|many|more|lots|frequent|fast|quick|short)[^.]*(peak|spike|wave|beat|bump|line|squiggle)|(peak|spike|wave|beat|bump)s?[^.]*(close|together|many|frequent|fast)/ },
              { done: 'You described a slow heartbeat.', q: 'Did you describe the tracing for a heart beating at a low frequency?', tip: 'Picture how far apart the spikes would be when the heart beats slowly.', re: /(far|farther|further|spread|wide|fewer|few|less|slow|long)[^.]*(peak|spike|wave|beat|bump|apart|gap|space|line)|apart/ },
              { done: 'You described a heart that is not beating.', q: 'Did you describe the tracing for a heart that isn’t beating at all?', tip: 'Think about what the line would do with no electrical activity at all.', re: /flat|straight|no (peaks?|spikes?|waves?|bumps?|beats?)|nothing/ },
              TWO_SENTENCES
            ] }
        ]
      },
      {
        title: 'Circulation',
        tiles: [
          { ref: 4, type: 'choice', text: 'The _____ side of the heart is the _____ circuit and pumps oxygen-poor blood to the _____.',
            options: SIDES, answer: 1 },
          { ref: 5, type: 'choice', text: 'The _____ side of the heart is the _____ circuit and pumps oxygen-rich blood to the _____.',
            options: SIDES, answer: 2 },
          { ref: 26, type: 'selects', text: 'List the three types of circuits that blood flows through in the heart and their roles. Match each circuit to its role.',
            options: ['Pumps oxygen-poor blood through the right side of the heart to the lungs', 'Pumps oxygen-rich blood through the left side of the heart out to the rest of the body', 'Supplies the heart with its own oxygen-rich blood', 'Carries blood from the stomach and intestines to the liver'],
            items: [
              { label: 'Pulmonary circulation', answer: 'Pumps oxygen-poor blood through the right side of the heart to the lungs' },
              { label: 'Systemic circulation', answer: 'Pumps oxygen-rich blood through the left side of the heart out to the rest of the body' },
              { label: 'Coronary circulation', answer: 'Supplies the heart with its own oxygen-rich blood' }
            ] },
          { ref: 35, type: 'written', text: 'Explain the purpose of the different blood vessels in the picture that connect to the alveoli: the artery, the capillary network, and the vein.',
            starters: ['The artery carries …', 'The capillary network is where …', 'The vein carries …'],
            img: { src: 'media/alveoli.png', alt: 'Drawing of clusters of alveoli. An artery and a vein connect to a capillary network that wraps around the alveoli.' },
            min: 80,
            ideas: [
              { done: 'You explained the artery.', q: 'Did you explain what the artery does?', tip: 'Think about where the blood in this artery comes from and what it is low in.', re: /arter[^.]*(oxygen.?poor|deoxygenated|low (in )?oxygen|little oxygen|carbon dioxide|\bco2\b|heart)|(oxygen.?poor|deoxygenated)[^.]*arter/ },
              { done: 'You explained the capillary network.', q: 'Did you explain what happens in the capillary network?', tip: 'Think about what the alveoli and the blood trade with each other.', re: /capillar[^.]*(exchange|diffus|swap|trade|pick|drop|oxygen|carbon|\bo2\b|\bco2\b)|(exchange|diffus)[^.]*capillar/ },
              { done: 'You explained the vein.', q: 'Did you explain what the vein does?', tip: 'Think about where this blood goes next and what it now carries.', re: /vein[^.]*(oxygen.?rich|oxygenated|full of oxygen|high (in )?oxygen|heart)|(oxygen.?rich|oxygenated)[^.]*vein/ },
              TWO_SENTENCES
            ] },
          { ref: 30, type: 'written', text: 'List three factors that cause resistance to the flow of blood through the vessels. Explain which has the greatest impact and why.',
            starters: ['Three factors that cause resistance are …', 'The factor with the greatest impact is … because …'],
            min: 80,
            ideas: [
              { done: 'You named a factor about the blood itself.', q: 'Did you name a factor that is about the blood itself?', tip: 'One factor is about the blood, not the vessel.', re: /viscos|thick|thin|sticky|syrup/ },
              { done: 'You named two factors about the blood vessel.', q: 'Did you name two factors that are about the blood vessel?', tip: 'Think about the size of a blood vessel in two different ways.', re: /^(?=[\s\S]*(length|\blong))(?=[\s\S]*(diameter|width|wide|narrow|radius|lumen|size))/ },
              { done: 'You said which factor has the greatest impact.', q: 'Did you say which factor has the greatest impact?', tip: 'Choose one of your three factors and say it matters most.', re: /greatest|most|biggest|largest|main|strongest|highest/ },
              { done: 'You explained why.', q: 'Did you explain why that factor has the greatest impact?', tip: 'Think about which factor can change from minute to minute, and which stay about the same.', re: /chang|constrict|dilat|block|cholesterol|plaque|clog|stay(s)? (about )?the same|constant|doesn'?t change|does not change/ },
              TWO_SENTENCES
            ] }
        ]
      },
      {
        title: 'Airways & Lungs',
        tiles: [
          { ref: 16, type: 'choice', text: 'Before entering the lungs, air MUST first pass through the',
            options: ['esophagus.', 'trachea.', 'nasopharynx.', 'alveoli.'], answer: 1 },
          { ref: 18, type: 'choice', text: 'The left lung has ___ lobes and the right lung has ___ lobes.',
            options: ['2; 2', '3; 3', '2; 3', '3; 2'], answer: 2 },
          { ref: 20, type: 'choice', text: 'The structure indicated by the arrow in the picture is the',
            img: { src: 'media/airway.png', alt: 'Drawing of the head, neck, and chest showing the airway and lungs. An arrow points to a structure in the neck.' },
            options: ['larynx.', 'esophagus.', 'pharynx.', 'trachea.'], answer: 0 },
          { ref: 15, type: 'choice', text: 'The amount of air that moves in and out of the lungs when you take a normal breath is the',
            options: ['vital capacity.', 'tidal volume.', 'residual volume.', 'lung capacity.'], answer: 1 },
          { ref: 32, type: 'selects', text: 'Define the functional roles of the conducting and respiratory zones. Then sort each structure into the zone it is a part of.',
            items: [
              { label: 'Role of the conducting zone', options: ['Warms, humidifies, and filters air as it travels into the body', 'Gas exchange'], answer: 'Warms, humidifies, and filters air as it travels into the body' },
              { label: 'Role of the respiratory zone', options: ['Warms, humidifies, and filters air as it travels into the body', 'Gas exchange'], answer: 'Gas exchange' },
              { label: 'Nose', options: ZONES, answer: 'Conducting zone' },
              { label: 'Pharynx', options: ZONES, answer: 'Conducting zone' },
              { label: 'Larynx', options: ZONES, answer: 'Conducting zone' },
              { label: 'Trachea', options: ZONES, answer: 'Conducting zone' },
              { label: 'Bronchi', options: ZONES, answer: 'Conducting zone' },
              { label: 'Bronchioles', options: ZONES, answer: 'Respiratory zone' },
              { label: 'Alveolar ducts', options: ZONES, answer: 'Respiratory zone' },
              { label: 'Alveoli', options: ZONES, answer: 'Respiratory zone' }
            ] }
        ]
      },
      {
        title: 'Breathing & Gas Exchange',
        tiles: [
          { ref: 14, type: 'choice', text: 'The diaphragm is the muscle that contracts each time we _____ so that the lungs can _____.',
            options: ['inhale; contract', 'exhale; contract', 'inhale; expand', 'exhale; expand'], answer: 2 },
          { ref: 19, type: 'choice', text: 'When the diaphragm contracts, volume inside the lungs _____ and pressure inside the lungs _____.',
            options: MORE_LESS, answer: 2 },
          { ref: 33, type: 'typed', text: 'The overall function of the respiratory system is to supply oxygen to our cells for what critical process? Type your answer.',
            accept: ['cellular respiration', 'cell respiration', 'aerobic respiration', 'aerobic cellular respiration'], aria: 'The critical process' },
          { ref: 17, type: 'choice', text: 'Which of the following statements about gas exchange is FALSE?',
            options: ['Our blood plays a central role.', 'Exchange happens in the alveoli and our body tissues.', 'Simple diffusion is the method of transport.', 'In the alveoli, CO2 moves into the blood and O2 moves out of it.'], answer: 3 },
          { ref: 34, type: 'written', text: 'Explain the relationship between pressure and volume changes that cause air to flow into and out of the lungs. (2 to 4 sentences)',
            starters: ['When you breathe in, the volume …', 'As the volume changes, the pressure …', 'Air flows into the lungs when …'],
            min: 60,
            ideas: [
              { done: 'You explained how volume and pressure are related.', q: 'Did you explain how volume and pressure change together?', tip: 'When the lungs get bigger, what happens to the pressure inside them?', re: /opposite|inverse|(volume[^.]*(increase|goes up|rise|bigger|larger|expand|grow)[^.]*pressure[^.]*(decrease|drop|goes down|lower|fall|less))|(pressure[^.]*(decrease|drop|goes down|lower|fall)[^.]*volume)/ },
              { done: 'You explained breathing in.', q: 'Did you explain what happens when we inhale?', tip: 'Describe the lungs and the air when we breathe in.', re: /inhal|breathe in|breathing in|air (moves|flows|rushes|comes|goes) in/ },
              { done: 'You explained breathing out.', q: 'Did you explain what happens when we exhale?', tip: 'Describe the lungs and the air when we breathe out.', re: /exhal|breathe out|breathing out|air (moves|flows|rushes|goes|leaves) out|pushed out/ },
              { done: 'You explained which way air moves.', q: 'Did you explain which way air moves between areas of pressure?', tip: 'Air always moves from one kind of pressure area to another.', re: /high(er)?[^.]*to[^.]*low(er)?|from high|toward(s)? (the )?low|low(er)? pressure/ },
              TWO_SENTENCES
            ] }
        ]
      }
    ],

    final: {
      title: 'Final round', points: 1000, ref: 28, type: 'selects',
      text: 'Use the word bank to describe the pathway that blood travels through each part of the heart. Oxygen-poor blood enters the heart through the superior and inferior vena cava. Choose where it goes at each step, until oxygen-rich blood leaves the heart to head out to the body.',
      options: WORD_BANK,
      items: [
        { label: 'Step 1', answer: 'Right atrium' },
        { label: 'Step 2', answer: 'Tricuspid valve' },
        { label: 'Step 3', answer: 'Right ventricle' },
        { label: 'Step 4', answer: 'Pulmonary valve' },
        { label: 'Step 5', answer: 'Pulmonary trunk' },
        { label: 'Step 6', answer: 'Lungs' },
        { label: 'Step 7', answer: 'Pulmonary veins' },
        { label: 'Step 8', answer: 'Left atrium' },
        { label: 'Step 9', answer: 'Mitral valve' },
        { label: 'Step 10', answer: 'Left ventricle' },
        { label: 'Step 11', answer: 'Aortic valve' },
        { label: 'Step 12 (out to the body)', answer: 'Aorta' }
      ]
    }
  }
};
