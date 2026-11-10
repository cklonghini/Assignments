/*
  LP2 - Marine Science Research and Report (Marine Science A): Natural Selection, Evolution, and Classification
  The end-of-Learning-Period-2 CER research project. The research questions are the teacher's. She noted that
  questions 2, 3, 4, and 10 suit stronger students because the evidence is still debated, so they carry a
  "Challenge" tag; question 12 is the open-choice path. Everything else is shared with the other CER projects in
  assignments/cer-common/cer-project.js.
  Part 1's practice CER (bike helmets) and evidence example (breakfast) are new for LP2.
*/
window.ASSIGNMENT = CER_PROJECT({
  title: 'LP2 - Marine Science Research and Report',
  course: 'Marine Science A',
  storageKey: 'cer-lp2-marine-science-v1',
  short: 'lp2-marine-cer',
  accent: 'marine',           // blue: the Marine Science class color
  kicker: 'Research and Report · Natural Selection, Evolution, and Classification',
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
  searchExample: 'whale evolution site:.edu',
  sites: 'the Smithsonian Ocean website, NOAA Fisheries, NOAA Ocean Exploration, the Monterey Bay Aquarium Research Institute (MBARI), Understanding Evolution from the University of California Museum of Paleontology, National Geographic, and university (.edu) websites',
  questions: [
    { heading: 'Natural Selection & Adaptation', icon: '🐟' },
    'Why have so many deep-sea animals evolved bioluminescence, and what survival advantage does it give them?',
    { text: 'Are some reef-building corals evolving heat tolerance fast enough to survive warming oceans?', badge: 'Challenge' },
    { text: 'Has decades of overfishing caused Atlantic cod (or another heavily fished species) to evolve to mature at smaller sizes?', badge: 'Challenge' },
    { text: 'Why are invasive lionfish so successful in the Atlantic and Caribbean, and are native species adapting to them?', badge: 'Challenge' },
    { heading: 'Evolution', icon: '🐋' },
    'What is the strongest evidence that whales evolved from land-dwelling mammals?',
    'Why do dolphins and sharks look so similar when one is a mammal and the other is a fish? (convergent evolution)',
    'Are horseshoe crabs truly “living fossils,” or have they kept evolving?',
    'How have sea turtles survived for over 100 million years when so many other reptiles went extinct?',
    'Why did octopuses lose their shells over time while the nautilus kept its shell?',
    { heading: 'Classification', icon: '🗂️' },
    { text: 'Should the different types of orcas (killer whales) be classified as separate species?', badge: 'Challenge' },
    'Why are sponges classified as animals even though they have no brain, organs, or nervous system?',
    { heading: 'Species Exploration (open choice)', icon: '🔍' },
    'Which marine species is the best adapted to its environment, and what evidence supports your choice?'
  ]
});
