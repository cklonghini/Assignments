/*
  LP2 - Anatomy and Physiology Research and Report (Anatomy & Physiology A): Support and Motion
  The end-of-Learning-Period-2 CER research project. The seven research questions are the teacher's ("CER - Support
  and Motion - Research and Report"). Everything else is shared with the other CER projects in
  assignments/cer-common/cer-project.js.
  Part 1's practice CER (bike helmets) and evidence example (breakfast) are new for LP2.
*/
window.ASSIGNMENT = CER_PROJECT({
  title: 'LP2 - Anatomy & Physiology Research and Report',
  course: 'Anatomy & Physiology A',
  storageKey: 'cer-lp2-anatomy-physiology-v1',
  short: 'lp2-ap-cer',
  accent: 'anatomy',          // red: the Anatomy & Physiology class color
  kicker: 'Research and Report · Support and Motion',
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
  searchExample: 'osteoporosis site:.gov',
  sites: 'MedlinePlus, the National Institute of Arthritis and Musculoskeletal and Skin Diseases (NIAMS), NASA, the Bone Health & Osteoporosis Foundation, the Cleveland Clinic, the Mayo Clinic, and university (.edu) websites',
  questions: [
    'Why do astronauts experience significant bone density loss during long-term space missions?',
    'How does osteoporosis affect the structural integrity of bones, and why are older adults more susceptible?',
    'Compare the healing process of a bone fracture to the recovery of a torn muscle: why does one typically take longer?',
    'Why do athletes who use anabolic steroids often experience tendon and ligament injuries despite increased muscle mass?',
    'How does immobilization (like a cast) lead to muscle atrophy, and how long does it take for muscles to recover afterward?',
    'Predict what would happen to the skeletal system if the parathyroid glands stopped functioning properly.',
    'Why are children’s bones more flexible and less likely to fully fracture compared to adult bones?'
  ]
});
