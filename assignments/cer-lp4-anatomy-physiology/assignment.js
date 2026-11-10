/*
  LP4 - Anatomy and Physiology Research and Report (Anatomy & Physiology B)
  The end-of-Learning-Period-4 CER research project. The seven research questions are the teacher's (the
  cardiovascular system, blood, and the lymphatic system). Everything else is shared with the other CER projects in
  assignments/cer-common/cer-project.js.
  Part 1's practice CER (honeybees) and evidence example (water and athletes) are new for LP4.
*/
window.ASSIGNMENT = CER_PROJECT({
  title: 'LP4 - Anatomy and Physiology Research and Report',
  course: 'Anatomy & Physiology B',
  storageKey: 'cer-lp4-anatomy-physiology-v1',
  short: 'lp4-ap-cer',
  accent: 'anatomy',          // red: the Anatomy & Physiology class color
  kicker: 'Research and Report · Blood, Circulation, and the Lymphatic System',
  sample: {
    topic: 'honeybees',
    claim: 'Honeybees help farmers grow more of the food we eat.',
    evidence: 'According to the U.S. Department of Agriculture, bees pollinate many of the fruit, nut, and vegetable crops that people eat.',
    reasoning: 'Pollination lets a plant make fruit and seeds, so without bees, many crops would produce much less food.'
  },
  evidence: {
    claim: 'Drinking enough water helps athletes perform better.',
    best: 'According to a sports medicine study, athletes who lost water through sweat and did not drink ran slower than athletes who stayed hydrated.',
    others: ['I always feel better when I drink water.',
      'My coach says water is the best drink for athletes.',
      'Everyone knows that athletes need to drink water.']
  },
  searchExample: 'atherosclerosis site:.gov',
  sites: 'MedlinePlus, the National Heart, Lung, and Blood Institute (NHLBI), the American Heart Association, the CDC, the Cleveland Clinic, the Mayo Clinic, and university (.edu) websites',
  questions: [
    'Why does high blood pressure (hypertension) increase the risk of heart attack and stroke over time?',
    'How does the structure of red blood cells relate to their function in oxygen transport?',
    'Compare arteries and veins: why do their structural differences matter for blood flow and pressure?',
    'Why do people living at high altitudes often have a higher red blood cell count than those at sea level?',
    'Evaluate how atherosclerosis develops and why it can lead to life-threatening complications.',
    'How does the lymphatic system help defend the body against infection, and what happens when lymph nodes are removed or damaged?',
    'Why is sickle cell anemia harmful to oxygen transport throughout the body?'
  ]
});
