/*
  LP4 - Biology Research and Report (Biology B): Heredity and Genetics
  The end-of-Learning-Period-4 CER research project. The research questions are the teacher's
  ("Heredity and Genetics: Research and Report - CER Essential Questions"). Everything else is shared with the other
  CER projects in assignments/cer-common/cer-project.js.
  Part 1's practice CER (honeybees) and evidence example (water and athletes) are new for LP4.
*/
window.ASSIGNMENT = CER_PROJECT({
  title: 'LP4 - Biology Research and Report',
  course: 'Biology B',
  storageKey: 'cer-lp4-biology-v1',
  short: 'lp4-bio-cer',
  accent: 'biology',          // green: the Biology class color
  kicker: 'Research and Report · Heredity and Genetics',
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
  searchExample: 'incomplete dominance site:.edu',
  sites: 'MedlinePlus Genetics, the National Human Genome Research Institute (genome.gov), Learn.Genetics from the University of Utah, the CDC, Khan Academy, Britannica, and university (.edu) websites',
  questions: [
    { heading: 'Mendelian Genetics', icon: '🌱' },
    'How do dominant and recessive alleles determine traits in organisms?',
    'How can Punnett squares be used to predict inherited traits?',
    'What are the limits of Mendel’s model of inheritance?',
    { heading: 'Non-Mendelian Inheritance', icon: '🌺' },
    'How do incomplete dominance and codominance affect inherited traits?',
    'Why do some traits not follow simple dominant and recessive patterns?',
    { heading: 'Genetic Disorders', icon: '🧬' },
    'How are genetic disorders passed from one generation to the next?',
    'How do scientists use pedigrees to study inherited diseases?',
    'How can genetic testing help detect genetic disorders?',
    { heading: 'Pedigrees and Predicting Traits', icon: '🌳' },
    'How can pedigrees help identify carriers of genetic traits?',
    'How can scientists tell if a trait is dominant, recessive, or sex-linked using a pedigree?',
    'How accurate are pedigrees for predicting inherited traits?',
    { heading: 'Complex Traits', icon: '📏' },
    'Why are some traits controlled by many genes instead of just one?',
    'How do genetics and environment both influence traits like height or intelligence?',
    'Why are complex traits harder to predict than single-gene traits?',
    { heading: 'Epigenetics (Advanced Topic)', icon: '🔄' },
    'How can the environment affect how genes are turned on or off?',
    'Can life experiences change gene expression?',
    'Can epigenetic changes be passed to future generations?'
  ]
});
