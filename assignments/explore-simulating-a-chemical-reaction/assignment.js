/*
  Explore - Simulating A Chemical Reaction (Biology A)
  Everything a student sees in this assignment is written here. The shared engine in /engine builds the page,
  the progress bars, the PDF, the Listen buttons, and the captions from this file.
  Text rules: *text* is shown in italics (use it for scientific names). Reading boxes (read) and tables use HTML.
  Full guide: docs/ASSIGNMENT_FORMAT.md
*/
window.ASSIGNMENT = {
  title: 'Explore - Simulating A Chemical Reaction',
  course: 'Biology A',
  storageKey: 'explore-simulating-a-chemical-reaction-v1',
  short: 'chemical-reaction',                 // short link: SITE/chemical-reaction

  /* the full video at the top. A captions file with the same name (.vtt) sits next to it.
     TODO: no captions yet. Re-cut with --captions once the teacher sends the Canvas Studio caption file. */
  video: {
    title: 'Simulating a Chemical Reaction',
    src: 'media/chemical-reaction-video.mp4',
    seconds: 345
  },

  /* short clips, one per trial. from/to are the times in the full video (they are shown to students). */
  clips: {
    model:     { src: 'media/clip-model.mp4',     from: 2.879,   to: 156.703, seconds: 154, title: 'What each part of the model represents' },
    baseline:  { src: 'media/clip-baseline.mp4',  from: 156.703, to: 202.956, seconds: 47,  title: 'Trial 1: baseline data' },
    denatured: { src: 'media/clip-denatured.mp4', from: 202.956, to: 249.832, seconds: 47,  title: 'Trial 2: denatured enzyme (thumb taped)' },
    coenzyme:  { src: 'media/clip-coenzyme.mp4',  from: 249.832, to: 284.518, seconds: 35,  title: 'Trial 3: coenzyme (niece helping)' },
    inhibitor: { src: 'media/clip-inhibitor.mp4', from: 284.518, to: 325.961, seconds: 42,  title: 'Trial 4: competitive inhibitor (tennis ball)' }
  },

  parts: [
    /* ---------------------------------------------------------------- Part 1 */
    {
      title: 'Purpose and hypothesis',
      intro: 'Guiding question: How do different factors affect the rate of a chemical reaction? Make your predictions in this part before you watch the experiment.',
      read: '<p><b>Purpose:</b> To investigate the effect of three different factors on the rate of a chemical reaction.</p>'
        + '<p><b>Overview:</b> In the real world, many different things can affect the rate of a chemical reaction. In this simulation:</p>'
        + '<ul><li>An <b>enzyme</b> is represented by a hand.</li>'
        + '<li>The <b>substrate</b> is represented by pennies on the ground.</li>'
        + '<li>The <b>chemical reaction</b> is represented by flipping the pennies over (one at a time) so they land heads up on the desk.</li></ul>'
        + '<p>Mrs. Kinzy will complete four trials:</p>'
        + '<ol><li><b>Baseline</b> (control group): just flipping pennies over.</li>'
        + '<li><b>Denatured:</b> Mrs. Kinzy’s thumb is taped so it can not be used.</li>'
        + '<li><b>Coenzyme:</b> Mrs. Kinzy’s niece helps flip pennies.</li>'
        + '<li><b>Competitive inhibitor:</b> Mrs. Kinzy holds a tennis ball while trying to flip the pennies.</li></ol>'
        + '<p>After watching Mrs. Kinzy gather data, you will answer some questions about what you observed and how this relates to chemical reactions and enzymes.</p>',
      questions: [
        {
          type: 'written',
          text: 'Hypothesis: Make a prediction about how you think each factor will affect the rate of a chemical reaction. Write one prediction for each trial: baseline, denatured, coenzyme, and competitive inhibitor. (4 or more sentences)',
          starters: ['In the baseline trial, I predict that the reaction rate will …', 'If the enzyme is denatured, I think the rate will … because …', 'When a coenzyme is added, I predict that …', 'With a competitive inhibitor, I think the reaction will … because …'],
          min: 80,
          placeholder: 'Baseline: I predict...\nDenatured: I predict...\nCoenzyme: I predict...\nCompetitive inhibitor: I predict...',
          ideas: [
            { done: 'You made a prediction for the baseline trial.', q: 'Did you make a prediction for the baseline trial?',
              tip: 'The baseline is the control group. What do you think will happen when Mrs. Kinzy just flips the pennies over?',
              re: /baseline|control|normal|just flip/ },
            { done: 'You made a prediction for the denatured trial.', q: 'Did you make a prediction for the denatured trial?',
              tip: 'Think about the trial where her thumb is taped.',
              re: /denatur|tape|thumb/ },
            { done: 'You made a prediction for the coenzyme trial.', q: 'Did you make a prediction for the coenzyme trial?',
              tip: 'Think about the trial where her niece joins in.',
              re: /co-?enzyme|niece|help/ },
            { done: 'You made a prediction for the competitive inhibitor trial.', q: 'Did you make a prediction for the competitive inhibitor trial?',
              tip: 'Think about the trial with the tennis ball.',
              re: /inhibit|tennis|ball/ },
            { done: 'You said how the rate will change.', q: 'Did you say whether the reaction will go faster, slower, or stay the same?',
              tip: 'A prediction about rate tells how fast. Use words that compare speed.',
              re: /fast|slow|quick|speed|rate|increase|decrease|more|less|fewer|same|longer|shorter|time/ }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 2 */
    {
      title: 'The model',
      clips: ['model', 'baseline'],
      read: '<p><b>Read:</b> An <b>enzyme</b> is a protein that speeds up a chemical reaction. The molecule an enzyme acts on is called the <b>substrate</b>. The substrate fits into a spot on the enzyme called the <b>active site</b>, the reaction happens, and the enzyme lets go of the product.</p>'
        + '<p>An enzyme is not used up by the reaction. It can do the same job again and again with new substrate. The <b>rate</b> of a reaction is how fast it happens, for example how many pennies get flipped in a set amount of time.</p>'
        + '<p>Here is the baseline data from the video. Each number is how many pennies had been flipped by the end of that time period.</p>',
      tableHtml: '<table><thead><tr><th>Time period (s)</th><th>Trial 1: Baseline Data</th></tr></thead><tbody>'
        + '<tr><td>0 to 10</td><td>8</td></tr><tr><td>11 to 20</td><td>16</td></tr><tr><td>21 to 30</td><td>24</td></tr><tr><td>31 to 40</td><td>33</td></tr><tr><td>41 to 50</td><td>43</td></tr><tr><td>51 to 60</td><td>53</td></tr><tr><td>61 to 70</td><td>63</td></tr><tr><td>71 to 80</td><td>73</td></tr><tr><td>81 to 90</td><td>83</td></tr><tr><td>91 to 100</td><td>93</td></tr></tbody></table>',
      questions: [
        {
          type: 'selects',
          text: 'Match each part of the real reaction to what represented it in the model.',
          options: ['Flipping a penny heads up onto the desk', 'Mrs. Kinzy’s hand', 'The pennies', 'The tennis ball'],
          items: [
            { label: 'What represented the enzyme in the model?', answer: 'Mrs. Kinzy’s hand',
              hint: 'An enzyme is the part that does the work. Reread the Overview in Part 1.' },
            { label: 'What represented the substrate in the model?', answer: 'The pennies',
              hint: 'The substrate is what the enzyme acts on. Reread the Overview in Part 1.' },
            { label: 'What represented the chemical reaction?', answer: 'Flipping a penny heads up onto the desk',
              hint: 'The reaction is the change that happens to the substrate. Reread the Overview in Part 1.' }
          ]
        },
        {
          type: 'choice',
          text: 'Mrs. Kinzy uses the same hand to flip penny after penny. What does this show about enzymes?',
          options: ['An enzyme is used up after one reaction', 'An enzyme can be used again and again', 'An enzyme turns into the product', 'An enzyme only works on one substrate in its whole life'],
          answer: 1,
          explain: 'Enzymes are not used up by the reaction, so one enzyme can act on many substrate molecules, one after another.',
          tip: 'Does the hand get used up after one penny? Reread the second paragraph of the reading.'
        },
        {
          type: 'choice',
          text: 'In this experiment, how could you measure the rate of the reaction?',
          options: ['Count how many pennies get flipped in a set amount of time', 'Count how many fingers are on the hand', 'Measure how heavy the pennies are', 'Check the year printed on each penny'],
          answer: 0,
          explain: 'Rate means how fast. Counting how many pennies are flipped in a set time measures how fast the reaction goes.',
          tip: 'Rate is about speed. Which choice tells you how fast the pennies are being flipped?'
        },
        {
          type: 'typed',
          text: 'In the baseline trial, how many pennies had been flipped by the end of 100 seconds? Type the number.',
          expected: '93',
          aria: 'Pennies flipped in the baseline trial',
          tip: 'Look at the last row of the baseline table, the 91 to 100 time period.'
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 3 */
    {
      title: 'Denatured enzyme',
      clips: ['denatured'],
      read: '<p><b>Read:</b> An enzyme’s shape is what lets it work. The substrate has to fit into the active site. When an enzyme is <b>denatured</b>, its shape changes. Things like very high temperature or the wrong pH can denature an enzyme. The substrate no longer fits well, so the enzyme works more slowly or stops working.</p>'
        + '<p>In the model, Mrs. Kinzy’s thumb was taped so it could not be used. The video sums it up: “The enzyme has changed shape and doesn’t work properly.”</p>',
      tableHtml: '<table><thead><tr><th>Time period (s)</th><th>Trial 2: Denatured Enzyme</th></tr></thead><tbody>'
        + '<tr><td>0 to 10</td><td>3</td></tr><tr><td>11 to 20</td><td>6</td></tr><tr><td>21 to 30</td><td>11</td></tr><tr><td>31 to 40</td><td>15</td></tr><tr><td>41 to 50</td><td>19</td></tr><tr><td>51 to 60</td><td>24</td></tr><tr><td>61 to 70</td><td>28</td></tr><tr><td>71 to 80</td><td>30</td></tr><tr><td>81 to 90</td><td>33</td></tr><tr><td>91 to 100</td><td>42</td></tr></tbody></table>',
      questions: [
        {
          type: 'choice',
          text: 'What happens to an enzyme when it is denatured?',
          options: ['It gets bigger and works faster', 'Its shape changes, so the substrate does not fit well', 'It turns into a substrate', 'It makes more copies of itself'],
          answer: 1,
          explain: 'Denaturing changes the enzyme’s shape. The active site no longer fits the substrate well, so the reaction slows down or stops.',
          tip: 'Reread the reading. What does an enzyme need in order for the substrate to fit?'
        },
        {
          type: 'choice',
          text: 'Which of these can denature an enzyme?',
          options: ['Adding more substrate', 'A very high temperature', 'Adding a coenzyme', 'Using the enzyme many times'],
          answer: 1,
          explain: 'Very high temperature (and the wrong pH) can change an enzyme’s shape and denature it.',
          tip: 'The reading names two things that can denature an enzyme. Is one of them in this list?'
        },
        {
          type: 'typed',
          text: 'With her thumb taped, how many pennies had Mrs. Kinzy flipped by the end of 100 seconds? Type the number.',
          expected: '42',
          aria: 'Pennies flipped in the denatured enzyme trial',
          tip: 'Look at the last row of the Trial 2 table, the 91 to 100 time period.'
        },
        {
          type: 'written',
          text: 'Describe how taping my thumb acted as a denatured enzyme. (2 to 4 sentences)',
          starters: ['Taping my thumb acted like a denatured enzyme because …', 'When my thumb was taped, …', 'As a result, the rate of the reaction …'],
          min: 40,
          ideas: [
            { done: 'You described what the taped thumb did to the hand.', q: 'Did you describe what taping the thumb did to the hand?',
              tip: 'Think about what Mrs. Kinzy’s hand could and could not do with the thumb taped.',
              re: /tape|thumb|can.?t (use|grab|grip|pick|flip)|couldn.?t|could not|harder|hard to|difficult|struggl|grip|grab/ },
            { done: 'You connected it to the enzyme’s shape.', q: 'Did you connect the taped thumb to the enzyme’s shape?',
              tip: 'What does denaturing change about an enzyme? Reread the reading.',
              re: /shape|active site|fit|form|structure|bent|chang/ },
            { done: 'You said how it affected the rate of the reaction.', q: 'Did you say how this affected the rate of the reaction?',
              tip: 'Think about how fast the pennies were flipped compared to the baseline trial.',
              re: /slow|fast|rate|speed|fewer|less|longer|more time|decrease|stop|not work|didn.?t work|work(s|ed)? (less|worse)/ },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write 2 to 4 full sentences?',
              tip: 'Add another sentence that explains your idea.', sentences: 2 }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 4 */
    {
      title: 'Coenzyme',
      clips: ['coenzyme'],
      read: '<p><b>Read:</b> A <b>coenzyme</b> is a helper molecule that works together with an enzyme so the enzyme can do its job. Many coenzymes come from the vitamins in the food you eat. With its helper, an enzyme can carry out the reaction more easily.</p>'
        + '<p>In the model, Mrs. Kinzy’s niece worked with Mrs. Kinzy to flip the pennies.</p>',
      tableHtml: '<table><thead><tr><th>Time period (s)</th><th>Trial 3: Coenzyme</th></tr></thead><tbody>'
        + '<tr><td>0 to 10</td><td>20</td></tr><tr><td>11 to 20</td><td>41</td></tr><tr><td>21 to 30</td><td>64</td></tr><tr><td>31 to 40</td><td>87</td></tr><tr><td>41 to 50</td><td>100</td></tr><tr><td>51 to 60</td><td>100</td></tr><tr><td>61 to 70</td><td>100</td></tr><tr><td>71 to 80</td><td>100</td></tr><tr><td>81 to 90</td><td>100</td></tr><tr><td>91 to 100</td><td>100</td></tr></tbody></table>',
      questions: [
        {
          type: 'choice',
          text: 'What is a coenzyme?',
          options: ['A molecule that blocks the active site', 'A helper molecule that works with an enzyme', 'An enzyme that has been denatured', 'The product of a reaction'],
          answer: 1,
          explain: 'A coenzyme is a helper. It works together with an enzyme so the enzyme can do its job.',
          tip: 'Reread the first sentence of the reading.'
        },
        {
          type: 'choice',
          text: 'Many coenzymes come from which part of your diet?',
          options: ['Water', 'Vitamins', 'Salt', 'Sugar'],
          answer: 1,
          explain: 'Many coenzymes are made from vitamins, which is one reason vitamins are important.',
          tip: 'The reading names where many coenzymes come from.'
        },
        {
          type: 'choice',
          text: 'In the coenzyme trial, during which time period were all 100 pennies flipped?',
          options: ['21 to 30 seconds', '41 to 50 seconds', '71 to 80 seconds', 'They never all got flipped'],
          answer: 1,
          explain: 'The table first reaches 100 in the 41 to 50 second row. That is less than half the time of the full trial.',
          tip: 'Go down the Trial 3 table and find the first row where the number reaches 100.'
        },
        {
          type: 'written',
          text: 'Describe how having Mrs. Kinzy’s niece flip pennies with her acted as a coenzyme. (2 to 4 sentences)',
          starters: ['Mrs. Kinzy’s niece acted like a coenzyme because …', 'With her niece helping, …', 'This shows that a coenzyme …'],
          min: 40,
          ideas: [
            { done: 'You described what the niece did.', q: 'Did you describe what Mrs. Kinzy’s niece did?',
              tip: 'Think about what changed when the niece joined in.',
              re: /niece|she|her|helper|second|another|extra|partner|two/ },
            { done: 'You explained that a coenzyme helps the enzyme.', q: 'Did you explain what a coenzyme does?',
              tip: 'What is a coenzyme’s job? Reread the reading.',
              re: /help|assist|work(s|ed|ing)? (together|with)|together|team|partner|support/ },
            { done: 'You said how it affected the rate of the reaction.', q: 'Did you say how this affected the rate of the reaction?',
              tip: 'Think about how fast the pennies were flipped compared to the baseline trial.',
              re: /fast|quick|rate|speed|more|increase|less time|shorter|slow/ },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write 2 to 4 full sentences?',
              tip: 'Add another sentence that explains your idea.', sentences: 2 }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 5 */
    {
      title: 'Competitive inhibitor',
      clips: ['inhibitor'],
      read: '<p><b>Read:</b> A <b>competitive inhibitor</b> is a molecule that is shaped a lot like the substrate. It fits into the enzyme’s active site and takes up the spot where the substrate should go. While the inhibitor is in the active site, the substrate cannot get in. The inhibitor and the substrate “compete” for the same spot, so the reaction slows down.</p>'
        + '<p>In the model, Mrs. Kinzy held a tennis ball while she tried to flip the pennies. The video describes the tennis ball as “something occupying the space of the active site on the enzyme, making the enzyme not work properly.”</p>',
      tableHtml: '<table><thead><tr><th>Time period (s)</th><th>Trial 4: Competitive Inhibitor</th></tr></thead><tbody>'
        + '<tr><td>0 to 10</td><td>2</td></tr><tr><td>11 to 20</td><td>5</td></tr><tr><td>21 to 30</td><td>11</td></tr><tr><td>31 to 40</td><td>14</td></tr><tr><td>41 to 50</td><td>18</td></tr><tr><td>51 to 60</td><td>23</td></tr><tr><td>61 to 70</td><td>29</td></tr><tr><td>71 to 80</td><td>35</td></tr><tr><td>81 to 90</td><td>40</td></tr><tr><td>91 to 100</td><td>46</td></tr></tbody></table>',
      questions: [
        {
          type: 'choice',
          text: 'Where does a competitive inhibitor attach to an enzyme?',
          options: ['To the substrate', 'To the active site', 'To the product', 'It does not attach to anything'],
          answer: 1,
          explain: 'A competitive inhibitor fits into the active site, the same spot the substrate needs.',
          tip: 'Think about the word “competitive.” What are the inhibitor and the substrate competing for?'
        },
        {
          type: 'choice',
          text: 'Why does a competitive inhibitor slow down a reaction?',
          options: ['It changes the substrate into a different molecule', 'It takes up the spot where the substrate should go', 'It adds more enzymes', 'It raises the temperature'],
          answer: 1,
          explain: 'While the inhibitor sits in the active site, the substrate cannot get in, so fewer reactions happen.',
          tip: 'Reread the reading. What can the substrate not do while the inhibitor is there?'
        },
        {
          type: 'typed',
          text: 'Holding the tennis ball, how many pennies had Mrs. Kinzy flipped by the end of the 81 to 90 second time period? Type the number.',
          expected: '40',
          aria: 'Pennies flipped in the competitive inhibitor trial',
          tip: 'Find the 81 to 90 row in the Trial 4 table.'
        },
        {
          type: 'written',
          text: 'Describe how holding the tennis ball acted as a competitive inhibitor. (2 to 4 sentences)',
          starters: ['Holding the tennis ball acted like a competitive inhibitor because …', 'While my hand was holding the tennis ball, …', 'This is similar to an inhibitor that …'],
          min: 40,
          ideas: [
            { done: 'You described what the tennis ball did.', q: 'Did you describe what the tennis ball did to the hand?',
              tip: 'Think about what Mrs. Kinzy’s hand was doing while she held the tennis ball.',
              re: /tennis|ball|holding|hold|occupied|full|in (her|the|my) hand|in the way/ },
            { done: 'You connected it to the active site.', q: 'Did you connect the tennis ball to the active site?',
              tip: 'Where does a competitive inhibitor go? Reread the reading.',
              re: /active site|spot|place|space|block|took up|takes up|taking up|room|compet|fit/ },
            { done: 'You said how it affected the rate of the reaction.', q: 'Did you say how this affected the rate of the reaction?',
              tip: 'Think about how fast the pennies were flipped compared to the baseline trial.',
              re: /slow|fast|rate|speed|fewer|less|longer|more time|decrease|harder/ },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write 2 to 4 full sentences?',
              tip: 'Add another sentence that explains your idea.', sentences: 2 }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 6 */
    {
      title: 'Real world connection',
      intro: 'This part has no clip. Use the reading, the data table, and what you learned in the earlier parts.',
      read: '<p><b>Read:</b> Every enzyme has a temperature where it works best, called its <b>optimal temperature</b>. Most enzymes in the human body work best at 37°C (98.6°F), which is normal body temperature.</p>'
        + '<p>When the temperature moves away from the optimal temperature, an enzyme works more slowly. If the temperature gets high enough, the enzyme can change shape and become denatured. When you are sick, your body may run a fever, which raises your body temperature above normal. A fever is one of the ways the body fights an infection.</p>'
        + '<p>Here is the data from all four trials, side by side.</p>',
      tableHtml: '<table><thead><tr><th>Time period (s)</th><th>Baseline Data</th><th>Denatured Enzyme</th><th>Coenzyme</th><th>Competitive Inhibitor</th></tr></thead><tbody>'
        + '<tr><td>0 to 10</td><td>8</td><td>3</td><td>20</td><td>2</td></tr><tr><td>11 to 20</td><td>16</td><td>6</td><td>41</td><td>5</td></tr><tr><td>21 to 30</td><td>24</td><td>11</td><td>64</td><td>11</td></tr><tr><td>31 to 40</td><td>33</td><td>15</td><td>87</td><td>14</td></tr><tr><td>41 to 50</td><td>43</td><td>19</td><td>100</td><td>18</td></tr><tr><td>51 to 60</td><td>53</td><td>24</td><td>100</td><td>23</td></tr><tr><td>61 to 70</td><td>63</td><td>28</td><td>100</td><td>29</td></tr><tr><td>71 to 80</td><td>73</td><td>30</td><td>100</td><td>35</td></tr><tr><td>81 to 90</td><td>83</td><td>33</td><td>100</td><td>40</td></tr><tr><td>91 to 100</td><td>93</td><td>42</td><td>100</td><td>46</td></tr></tbody></table>',
      questions: [
        {
          type: 'selects',
          text: 'Use the data table. Compared to the baseline trial, was each reaction faster or slower?',
          options: ['Faster', 'Slower'],
          hint: 'Compare each column to the Baseline column in the same rows.',
          items: [
            { label: 'Denatured enzyme (taped thumb)', answer: 'Slower', hint: 'Compare the Denatured column to the Baseline column in the same rows.' },
            { label: 'Coenzyme (a helper)', answer: 'Faster', hint: 'Compare the Coenzyme column to the Baseline column in the same rows.' },
            { label: 'Competitive inhibitor (tennis ball)', answer: 'Slower', hint: 'Compare the Competitive Inhibitor column to the Baseline column in the same rows.' }
          ]
        },
        {
          type: 'choice',
          text: 'At what temperature do most enzymes in the human body work best?',
          options: ['0°C (32°F)', '25°C (77°F)', '37°C (98.6°F)', '100°C (212°F)'],
          answer: 2,
          explain: 'Most human enzymes work best at 37°C (98.6°F), normal body temperature.',
          tip: 'Reread the first paragraph of the reading. It is the same as normal body temperature.'
        },
        {
          type: 'written',
          text: 'Real World Connection: Most enzymes in the human body work best at 37°C (98.6°F). What do you think this means then when you are sick? (2 to 4 sentences)',
          starters: ['If most enzymes work best at 37°C, then when I have a fever …', 'When body temperature goes up, enzymes might …', 'This could explain why, when I am sick, …'],
          min: 40,
          ideas: [
            { done: 'You described what happens to body temperature when you are sick.', q: 'Did you say what happens to your body temperature when you are sick?',
              tip: 'Think about what a fever does to your body temperature.',
              re: /fever|temperature|hot|warm|heat|higher|rise|above|over 37|over 98/ },
            { done: 'You explained how that affects your enzymes.', q: 'Did you explain how that affects your enzymes?',
              tip: 'What happens to an enzyme when it is not at its optimal temperature? Reread the reading.',
              re: /enzyme|denatur|shape|slow|not work|don.?t work|work (less|worse)|less well|not as well|optimal/ },
            { done: 'You connected it to how your body works or feels.', q: 'Did you connect it to how your body works or feels when you are sick?',
              tip: 'Enzymes run many reactions in your body. What might happen if they slow down?',
              re: /body|feel|tired|weak|process|reaction|function|digest|energy|sick|ill/ },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write 2 to 4 full sentences?',
              tip: 'Add another sentence that explains your idea.', sentences: 2 }
          ]
        },
        {
          type: 'written',
          text: 'In relation to your answer to the last question, pretend scientists discover an enzyme in the human body that works best at 39°C (102.2°F). What processes do you think this enzyme is most likely involved in? (2 to 4 sentences)',
          starters: ['An enzyme that works best at 39°C would be most active when …', 'I think this enzyme is involved in … because …', 'This would help the body …'],
          min: 40,
          ideas: [
            { done: 'You noticed that 39°C is a fever temperature.', q: 'Did you notice when your body would be at 39°C?',
              tip: 'Is 39°C (102.2°F) a normal body temperature? When would your body be that warm?',
              re: /fever|sick|ill|higher than normal|above normal|hotter|warmer|infection/ },
            { done: 'You named a process the enzyme might be part of.', q: 'Did you name a process this enzyme might be involved in?',
              tip: 'Think about what your body is busy doing when it has a fever.',
              re: /immune|fight|infection|germ|bacteria|virus|pathogen|white blood|heal|recover|defen|kill|antibod|sick/ },
            { done: 'You explained your reasoning.', q: 'Did you explain why you think so?',
              tip: 'Use “because” to connect the enzyme’s best temperature to the process you named.',
              re: /because|since|so that|this means|that.?s why|when/ },
            { done: 'You wrote at least 2 sentences.', q: 'Did you write 2 to 4 full sentences?',
              tip: 'Add another sentence that explains your idea.', sentences: 2 }
          ]
        }
      ]
    }
  ]
};
