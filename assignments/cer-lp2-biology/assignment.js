/*
  LP2 - Biology Research and Report (Biology A): Homeostasis and Energy Flow
  The end-of-Learning-Period-2 CER research project. The research questions are the teacher's
  ("Homeostasis and Energy Flow: Research and Report - CER Essential Questions"). Each one gives a claim and what to
  explain, so the CER step asks students to restate the claim in their own words (givenClaim). Everything else is shared with the other CER projects in assignments/cer-common/cer-project.js.
  Part 1's practice CER (bike helmets) and evidence example (breakfast) match the other LP2 projects.
*/
window.ASSIGNMENT = CER_PROJECT({
  title: 'LP2 - Biology Research and Report',
  course: 'Biology A',
  storageKey: 'cer-lp2-biology-v1',
  short: 'lp2-bio-cer',
  accent: 'biology',          // green: the Biology class color
  kicker: 'Research and Report · Homeostasis and Energy Flow',
  givenClaim: true,           // each question gives a claim; students restate it in their own words
  sample: {
    topic: 'bike helmets',
    claim: 'Wearing a helmet protects a bike rider’s brain in a crash.',
    evidence: 'According to the CDC, wearing a bike helmet lowers the risk of a head injury in a crash.',
    reasoning: 'The foam inside a helmet absorbs the force of the hit, so less of that force reaches the skull and the brain.'
  },
  evidence: {
    claim: 'Eating breakfast helps students focus in school.',
    best: 'According to a study by university researchers, students who ate breakfast did better on attention tests than students who skipped it.',
    others: ['I think breakfast is the most important meal of the day.',
      'My sister says she can’t think in class when she is hungry.',
      'Everybody knows you should eat breakfast before school.']
  },
  searchExample: 'insulin glucagon blood sugar site:.edu',
  sites: 'MedlinePlus, the National Institutes of Health (NIH), the CDC, Khan Academy, Britannica, National Geographic Education, and university (.edu) websites',
  questions: [
    { heading: 'Homeostasis', icon: '🌡️' },
    'Claim: The human body must maintain a stable internal temperature to survive. Explain how thermoregulation works and why it is essential.',
    'Claim: Blood glucose homeostasis is critical for normal body function. Use evidence to show how insulin and glucagon regulate blood sugar.',
    'Claim: Feedback loops keep the body in balance. Choose one body system and explain how its negative feedback loop maintains homeostasis.',
    'Claim: Disruptions to homeostasis can be life-threatening. Select an example (heat stroke, hypothermia, dehydration, diabetes) and show what happens when balance is lost.',
    { heading: 'Cellular Homeostasis & Energy', icon: '🔬' },
    'Claim: The cell membrane is essential for maintaining homeostasis. Explain how diffusion, osmosis, or active transport keep cells balanced.',
    'Claim: Enzymes are necessary for maintaining homeostasis. Use evidence to show how temperature or pH affects enzyme function.',
    'Claim: Aerobic respiration is more efficient than anaerobic respiration. Compare ATP output and explain why efficiency matters.',
    'Claim: Mitochondria are essential for cellular energy flow. Explain how mitochondria support energy use and what happens when they don’t function properly.',
    { heading: 'Ecosystem Energy Flow', icon: '🌿' },
    'Claim: Energy flows through an ecosystem in predictable ways. Use a food chain or food web to show how energy moves and why it decreases at each trophic level.',
    'Claim: Producers are the most important organisms in an ecosystem. Explain their role in supporting all other trophic levels.',
    'Claim: Removing one organism from a food web disrupts the entire ecosystem. Use evidence from a real ecosystem to show ripple effects.',
    'Claim: Top predators help maintain the balance of energy flow. Explain how predator loss or reintroduction affects other trophic levels.'
  ]
});
