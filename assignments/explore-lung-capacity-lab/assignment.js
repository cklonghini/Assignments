/*
  Explore - Lung Capacity Lab (Anatomy & Physiology)
  Everything a student sees is written in this file. The shared engine in /engine builds the page,
  progress bars, PDF printout, Listen buttons, and graphs from it.
  Write *scientific names* between asterisks to show them in italics. Reading boxes and tables use HTML.
  Full guide: docs/ASSIGNMENT_FORMAT.md

  From the classroom packet "Lab: Lung Capacity" (Transport Unit, source/packet-lung-capacity-lab.pdf).
  Students work alone and online, so the balloon data come from a sample student (Maya) and the class data
  are a sample class of 20 students. Both are made up for this assignment.
*/

/* the sample class. Vital capacity was measured with the balloon and Figure 1. */
var CLASS = [
  ['Female', 61, 15, 'Low', 2700], ['Female', 63, 16, 'Medium', 3100], ['Female', 64, 14, 'High', 3600],
  ['Female', 60, 15, 'Medium', 2550], ['Female', 66, 17, 'High', 3750], ['Female', 62, 16, 'Low', 2950],
  ['Female', 65, 15, 'Medium', 3400], ['Female', 67, 16, 'High', 4050], ['Female', 59, 14, 'Low', 2500],
  ['Female', 64, 17, 'Medium', 3200], ['Male', 66, 15, 'Medium', 4200], ['Male', 70, 16, 'High', 4900],
  ['Male', 68, 17, 'Low', 4100], ['Male', 72, 16, 'High', 5150], ['Male', 64, 14, 'Low', 3650],
  ['Male', 69, 15, 'Medium', 4650], ['Male', 71, 17, 'Medium', 4800], ['Male', 67, 14, 'High', 4500],
  ['Male', 74, 16, 'Medium', 5300], ['Male', 65, 15, 'Low', 3900]
].map(function (r) { return { sex: r[0], height: r[1], age: r[2], activity: r[3], vc: r[4] }; });

window.ASSIGNMENT = {
  title: 'Explore - Lung Capacity Lab',
  course: 'Anatomy & Physiology',
  storageKey: 'explore-lung-capacity-lab-v1',
  icon: '<svg viewBox="0 0 64 72" aria-hidden="true" focusable="false"><rect x="6" y="10" width="52" height="52" rx="12" fill="var(--primary)"/><path d="M32 18 V34 M32 30 L26 35 M32 30 L38 35" stroke="var(--primary-ink)" stroke-width="3" stroke-linecap="round" fill="none"/><path d="M24 30 C18 31 15 40 15 48 c0 4 3 6 7 5 l5 -2 c2 -1 2 -3 2 -5 V35 c0 -3 -2 -5 -5 -5 z M40 30 C46 31 49 40 49 48 c0 4 -3 6 -7 5 l-5 -2 c-2 -1 -2 -3 -2 -5 V35 c0 -3 2 -5 5 -5 z" fill="var(--primary-ink)"/></svg>',

  /* no video: this is the box at the top of the page */
  start: {
    heading: 'Lab: Lung Capacity',
    intro: 'Guiding question: What is lung capacity, and what types of factors affect it? In this lab you will investigate how sex, age, height, and activity level affect lung capacity in humans.',
    after: 'Work from top to bottom. You will learn the lung volumes, make predictions, learn how a balloon can measure lung volume, work with one student’s balloon data, and then graph and analyze data from a whole class. The graph in Part 5 is interactive: you build it yourself and the page checks it. You will also answer three written questions, and in one of them you will use transition words to point to your evidence and highlight them in yellow.'
  },

  parts: [
    /* ---------------------------------------------------------------- Part 1 */
    {
      title: 'Lung volumes',
      read: '<p><b>Read:</b> The amount of air your lungs can hold is called your <b>lung capacity</b>. Doctors look at lung capacity to check someone’s <b>respiratory health</b>. To find it, they measure several <b>respiratory volumes</b>.</p>'
        + '<ul><li><b>Tidal volume (TV)</b> is the amount of air that moves in and out of your lungs with each breath when you are breathing normally.</li>'
        + '<li><b>Inspiratory reserve volume (IRV)</b> is the extra air you can breathe in when you try to breathe in as much as you possibly can.</li>'
        + '<li><b>Expiratory reserve volume (ERV)</b> is the extra air you can force out after a normal breath out.</li>'
        + '<li><b>Residual volume (RV)</b> is the air that always stays in your lungs. It keeps your alveoli open and keeps your lungs from collapsing.</li></ul>'
        + '<p><b>Vital capacity (VC)</b> is the total volume of air you can forcibly breathe out after you take your deepest breath. It is often called the total amount of <b>exchangeable air</b>. You can find it with this formula:</p>'
        + '<p><b>Vital capacity = Tidal volume + Inspiratory reserve volume + Expiratory reserve volume</b></p>'
        + '<p>These volumes can be measured with a tool called a <b>spirometer</b>, or more simply by measuring the size of a balloon you breathe into.</p>',
      questions: [
        {
          type: 'selects',
          text: 'Match each description to the correct lung volume.',
          options: ['Tidal volume', 'Inspiratory reserve volume', 'Expiratory reserve volume', 'Residual volume', 'Vital capacity'],
          items: [
            { label: 'The air that moves in and out with each normal breath', answer: 'Tidal volume', hint: 'Look for the volume that describes everyday, normal breathing.' },
            { label: 'The extra air you can breathe in when you breathe in as much as you can', answer: 'Inspiratory reserve volume', hint: 'To inspire means to breathe in. Which reserve volume is about breathing in?' },
            { label: 'The extra air you can force out after a normal breath out', answer: 'Expiratory reserve volume', hint: 'To expire means to breathe out. Which reserve volume is about breathing out?' },
            { label: 'The air that always stays in your lungs so they do not collapse', answer: 'Residual volume', hint: 'A residue is something that is left behind. Which volume is left behind?' },
            { label: 'All the air you can force out after your deepest breath', answer: 'Vital capacity', hint: 'This one is the total amount of exchangeable air. Look at the formula in the reading.' }
          ]
        },
        {
          type: 'choice',
          text: 'Which three volumes add up to vital capacity?',
          options: [
            'Tidal volume + residual volume + expiratory reserve volume',
            'Tidal volume + inspiratory reserve volume + expiratory reserve volume',
            'Inspiratory reserve volume + expiratory reserve volume + residual volume',
            'Tidal volume + inspiratory reserve volume + residual volume'
          ],
          answer: 1,
          explain: 'Vital capacity is the air you can exchange: a normal breath, plus the extra you can breathe in, plus the extra you can force out. Residual volume is not part of it, because that air never leaves your lungs.',
          tip: 'Vital capacity only counts air you can move in and out. Which volume never leaves your lungs?'
        },
        {
          type: 'choice',
          text: 'Why is it important to understand someone’s lung capacity?',
          options: [
            'It tells you how fast their heart beats.',
            'It helps doctors check their respiratory health.',
            'It tells you their blood type.',
            'It shows how much food their stomach can hold.'
          ],
          answer: 1,
          explain: 'Lung capacity is measured to check respiratory health. A lung capacity that is lower than expected can be a sign of a lung problem.',
          tip: 'Look at the second sentence of the reading. What does measuring lung capacity help doctors check?'
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 2 */
    {
      title: 'Make your predictions',
      intro: 'Before you look at any data, make your predictions. There is no wrong prediction. In Part 7 you will check whether the data support them.',
      read: '<p><b>Read:</b> In this lab, we look at four factors that might affect someone’s vital capacity:</p>'
        + '<ul><li><b>Sex</b> (female or male)</li>'
        + '<li><b>Age</b> (in years)</li>'
        + '<li><b>Height</b> (in inches)</li>'
        + '<li><b>Activity level</b> (low, medium, or high): how much a person exercises or plays sports each week</li></ul>'
        + '<p>A <b>hypothesis</b> is a prediction you can test. A good one says what you think will happen and why, for example: “I predict that ___ will have a higher vital capacity because ___.”</p>',
      questions: [
        {
          type: 'written',
          text: 'Hypotheses: Make a prediction about the relationship between lung capacity and each factor: sex, age, height, and activity level. Tell why you think so. (4 or more sentences)',
          min: 120,
          placeholder: 'Sex: I predict...\nAge: I predict...\nHeight: I predict...\nActivity level: I predict...',
          ideas: [
            { done: 'You made a prediction about sex.', q: 'Did you make a prediction about sex?', tip: 'Do you think females or males will have a larger lung capacity, or will they be about the same?', re: /\bsex\b|\bmales?\b|females?|gender|\bboys?\b|\bgirls?\b|\bmen\b|\bwomen\b/ },
            { done: 'You made a prediction about age.', q: 'Did you make a prediction about age?', tip: 'Do you think older or younger students will have a larger lung capacity?', re: /\bage\b|\bolder\b|younger|\bold\b|\byoung\b|years/ },
            { done: 'You made a prediction about height.', q: 'Did you make a prediction about height?', tip: 'Do you think taller or shorter people will have a larger lung capacity?', re: /height|tall|short/ },
            { done: 'You made a prediction about activity level.', q: 'Did you make a prediction about activity level?', tip: 'Do you think people who exercise more will have a larger lung capacity?', re: /activ|exercis|sports?|athlet|work ?out|fit/ },
            { done: 'You told why for your predictions.', q: 'Did you tell why you think so?', tip: 'Add a reason, for example “because bigger bodies have bigger lungs.”', re: /because|since|so that|reason|due to|that is why|this is why/ }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 3 */
    {
      title: 'Measuring with a balloon',
      read: '<p><b>Read:</b> In the classroom, each student measures their own lung volumes with a <b>balloon</b> and a <b>ruler</b>. The more air you blow into the balloon, the larger its <b>diameter</b> (the distance across it).</p>'
        + '<p><b>Safety note:</b> If you have any sort of breathing difficulty, such as asthma or another condition, you should not collect personal data for this lab.</p>'
        + '<p><b>Part 1, Tidal volume:</b> Stretch the balloon five times to loosen it up. Take a normal breath. Breathe out into the balloon the way you normally would (do not force it). Pinch the end of the balloon to keep the air inside. Lay the balloon flat on a table and stand the ruler up beside it. Measure the diameter in centimeters and record it. Do this for three trials, then find the average.</p>'
        + '<p><b>Part 2, Expiratory reserve volume:</b> Take a normal breath and breathe out normally, like in Part 1. Then put your mouth on the balloon and breathe out as much <i>extra</i> air as you possibly can. Do NOT take a breath in between. Pinch, measure, and record. Do three trials, then find the average.</p>'
        + '<p><b>Part 3, Vital capacity:</b> Take as deep a breath as you can, and breathe out as much of it as you can into the balloon. Pinch, measure, and record. Do three trials, then find the average.</p>'
        + '<p><b>Part 4, Putting it all together:</b> Use a graph (Figure 1, in the next part of this page) to turn each average balloon diameter into a lung volume.</p>',
      questions: [
        {
          type: 'selects',
          text: 'Which lung volume does each balloon measurement find?',
          options: ['Tidal volume', 'Expiratory reserve volume', 'Vital capacity'],
          items: [
            { label: 'Breathe in normally, then breathe out normally into the balloon', answer: 'Tidal volume', hint: 'This one is all about normal breathing. Look at Part 1 of the procedure.' },
            { label: 'Breathe out normally first, then blow all the extra air you can into the balloon', answer: 'Expiratory reserve volume', hint: 'Only the extra air after a normal breath out goes into the balloon. Look at Part 2 of the procedure.' },
            { label: 'Take the deepest breath you can, then blow out as much as you can into the balloon', answer: 'Vital capacity', hint: 'Deepest breath in, then all the way out. Look at Part 3 of the procedure.' }
          ]
        },
        {
          type: 'order',
          text: 'Put the steps for one tidal volume trial in order.',
          items: [
            'Stretch the balloon five times to loosen it up.',
            'Take a normal breath.',
            'Breathe out normally into the balloon.',
            'Pinch the end of the balloon to keep the air inside.',
            'Lay the balloon flat and stand the ruler up beside it.',
            'Measure the diameter in centimeters and record it.'
          ],
          tip: 'Read Part 1 of the procedure again, one sentence at a time. You can not measure the balloon until the air is trapped inside it.',
          explain: 'You loosen the balloon, breathe normally into it, trap the air, and then measure the diameter with the ruler.'
        },
        {
          type: 'choice',
          text: 'When you measure expiratory reserve volume, why must you NOT take a breath in between the normal breath out and blowing into the balloon?',
          options: [
            'A new breath would add air that is not part of the expiratory reserve volume, so the balloon would be too big.',
            'A new breath would pop the balloon.',
            'You need to hold your breath to make your lungs bigger.',
            'Breathing in would make the ruler hard to read.'
          ],
          answer: 0,
          explain: 'Expiratory reserve volume is only the extra air left after a normal breath out. If you breathed in again, you would blow that new air into the balloon too, and your measurement would be too large.',
          tip: 'Expiratory reserve volume is the extra air you can force out after a normal breath out. What would a new breath add to the balloon?'
        },
        {
          type: 'choice',
          text: 'Why does each measurement have three trials that are then averaged?',
          options: [
            'So the balloon gets stretched out more each time.',
            'Because one trial could be off by accident, and an average of several trials is more reliable.',
            'Because the teacher needs three balloons.',
            'So that each trial measures a different lung volume.'
          ],
          answer: 1,
          explain: 'Any one breath can be a little bigger or smaller than usual, and measuring a balloon is not perfect. Averaging three trials evens out those small mistakes, so the result is more reliable.',
          tip: 'Think about what could go wrong in just one trial. How does doing it more than once help?'
        },
        {
          type: 'choice',
          text: 'Which student should NOT collect personal data for this lab?',
          options: [
            'A student who plays on the soccer team',
            'A student who is the shortest in the class',
            'A student who has asthma',
            'A student who has never blown up a balloon'
          ],
          answer: 2,
          explain: 'Forcing air out of your lungs can be hard and unsafe for someone with a breathing difficulty such as asthma.',
          tip: 'Read the safety note in the reading.'
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 4 */
    {
      title: 'One student’s data',
      intro: 'Maya is a student in the class. She is female, 16 years old, 64 inches tall, and has a medium activity level. Here are her balloon measurements.',
      tableHtml: '<table><caption><b>Data Table 1: Maya’s balloon diameter</b></caption><thead><tr><th></th><th>Tidal volume (cm)</th><th>Expiratory reserve volume (cm)</th><th>Vital capacity (cm)</th></tr></thead><tbody>'
        + '<tr><th>Trial 1</th><td>9.8</td><td>12.6</td><td>17.8</td></tr>'
        + '<tr><th>Trial 2</th><td>10.2</td><td>13.2</td><td>18.1</td></tr>'
        + '<tr><th>Trial 3</th><td>10.0</td><td>13.2</td><td>18.1</td></tr>'
        + '<tr><th>Average</th><td>?</td><td>?</td><td>?</td></tr></tbody></table>',
      read: '<p><b>Read:</b> To find an <b>average</b>, add the three trials and divide by 3.</p>'
        + '<p>Lung volume is measured in milliliters (mL) or cubic centimeters (cm³). They are the same size: <b>1 mL = 1 cm³</b>. There are 1,000 mL in 1 liter (L).</p>'
        + '<p><b>Figure 1</b> below shows the relationship between balloon diameter and lung volume. Find a diameter on the x-axis, go straight up to the curve, then go straight across to the y-axis to read the lung volume.</p>'
        + '<p>Inspiratory reserve volume can not be measured with a balloon, so we use an average value: <b>3,100 mL</b> for the average adult male and <b>1,900 mL</b> for the average adult female.</p>',
      questions: [
        {
          type: 'numbers',
          text: 'Data Table 1: Find Maya’s average balloon diameter for each lung volume.',
          unit: 'cm',
          items: [
            { label: 'Average tidal volume diameter', between: [9.95, 10.05], tip: 'Add the three tidal volume trials, then divide by 3.' },
            { label: 'Average expiratory reserve volume diameter', between: [12.95, 13.05], tip: 'Add the three expiratory reserve volume trials, then divide by 3.' },
            { label: 'Average vital capacity diameter', between: [17.95, 18.05], tip: 'Add the three vital capacity trials, then divide by 3.' }
          ]
        },
        {
          type: 'readgraph',
          text: 'Data Table 2: Use Figure 1 to turn each of Maya’s average diameters into a lung volume. Move the slider to the average diameter you found above, then read the lung volume where the dashed line meets the y-axis. Round to the nearest 50.',
          graph: {
            title: 'Figure 1: The relationship between balloon diameter and lung volume',
            alt: 'Graph of lung volume in cubic centimeters (0 to 8,000) against balloon diameter in centimeters (0 to 25). The curve starts flat and gets steeper as the diameter grows. A dashed line shows the point for the diameter on the slider.',
            x: { min: 0, max: 25, step: 2, minor: 1, label: 'Balloon diameter (cm)', unit: 'cm' },
            y: { min: 0, max: 8000, step: 1000, minor: 250, label: 'Lung volume (cm³)' },
            fn: function (d) { return Math.PI * d * d * d / 6; },   // the volume of a round balloon
            to: 24.8, start: 5,
            sliderLabel: 'Balloon diameter: '
          },
          unit: 'cm³',
          items: [
            { label: 'Tidal volume', between: [400, 650], tip: 'Set the slider to Maya’s average tidal volume diameter. Each light grid line on the y-axis is 250 cm³.' },
            { label: 'Expiratory reserve volume', between: [1000, 1300], tip: 'Set the slider to Maya’s average expiratory reserve volume diameter, then follow the dashed line across to the y-axis.' },
            { label: 'Vital capacity (measured)', between: [2850, 3250], tip: 'Set the slider to Maya’s average vital capacity diameter. Count the grid lines up from the last number below the dashed line.' }
          ]
        },
        {
          type: 'numbers',
          text: 'Vital capacity calculated: Use the formula and Maya’s numbers from Figure 1. Maya is female, so use the average inspiratory reserve volume for an adult female.',
          unit: 'cm³',
          items: [
            { label: 'Vital capacity (calculated)', between: [3300, 3850], tip: 'Vital capacity = tidal volume + inspiratory reserve volume + expiratory reserve volume. Use your tidal volume and expiratory reserve volume from Figure 1, and the female inspiratory reserve volume from the reading.' }
          ]
        },
        {
          type: 'numbers',
          text: 'Vital capacity researched: An online vital capacity calculator uses a person’s sex, age, and height. For Maya it says 3.3 liters. Change this to cm³.',
          unit: 'cm³',
          items: [
            { label: 'Vital capacity (researched)', between: [3300, 3300], tip: 'There are 1,000 mL in 1 L, and 1 mL = 1 cm³. Multiply the liters by 1,000.' }
          ]
        },
        {
          type: 'choice',
          text: 'Compare Maya’s three vital capacities: measured with the balloon, calculated with the formula, and researched online. Which one is the lowest?',
          options: ['Measured with the balloon', 'Calculated with the formula', 'Researched online', 'They are all exactly the same'],
          answer: 0,
          explain: 'The balloon (measured) value is the lowest. It is a little less than the researched value and a few hundred cm³ less than the calculated value.',
          tip: 'Look at your answers above. Put the three numbers in order from smallest to largest.'
        },
        {
          type: 'choice',
          text: 'Which is the best explanation for why the balloon measurement could come out lower than the other two?',
          options: [
            'The balloon makes the lungs smaller.',
            'Some air can escape before the balloon is pinched, and a balloon is hard to blow into, so it is easy to stop before the lungs are truly empty.',
            'The ruler adds extra centimeters.',
            'The formula and the online calculator always give values that are too small.'
          ],
          answer: 1,
          explain: 'Air can leak out, a balloon pushes back as you blow, and the balloon is not a perfect ball. All of these make the measured volume a little low. The calculated value also uses an average inspiratory reserve volume, which might not match Maya.',
          tip: 'Think about what really happens when you blow up a balloon. Could any air get lost or be left behind?'
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 5 */
    {
      title: 'Graph the class data',
      intro: 'Every student in the class added their data to a class data table. Choose one factor (sex, height, age, or activity level) and build a graph that compares it to vital capacity. A good graph has a title and labeled x- and y-axes with units.',
      tableHtml: '<table><caption><b>Class data</b> (vital capacity measured with the balloon)</caption><thead><tr><th>Student</th><th>Sex</th><th>Height (in)</th><th>Age (years)</th><th>Activity level</th><th>Vital capacity (cm³)</th></tr></thead><tbody>'
        + CLASS.map(function (r, i) { return '<tr><td>' + (i + 1) + '</td><td>' + r.sex + '</td><td>' + r.height + '</td><td>' + r.age + '</td><td>' + r.activity + '</td><td>' + r.vc.toLocaleString('en-US') + '</td></tr>'; }).join('')
        + '</tbody></table>',
      read: '<p><b>Read:</b> Choose the graph that fits your data.</p>'
        + '<ul><li>A <b>bar graph</b> compares groups that have names, like “female” and “male.” Each bar shows the <b>average</b> for one group.</li>'
        + '<li>A <b>scatter plot</b> is for numbers on a scale, like inches or years. Each student gets one dot: across to their number on the x-axis, and up to their vital capacity on the y-axis.</li></ul>'
        + '<p>The <b>independent variable</b> (the factor you compare) goes on the <b>x-axis</b>, across the bottom. The <b>dependent variable</b> (what was measured) goes on the <b>y-axis</b>, up the side. The <b>title</b> names both variables, for example “The Effect of ___ on ___.”</p>',
      questions: [
        {
          type: 'graph',
          text: 'Build your graph. Choose a factor, then work through the steps. Your graph updates as you go. When it is right, you will see the graphs for the other three factors too.',
          graph: {
            rows: CLASS,
            y: { key: 'vc', name: 'Vital capacity', label: 'Vital capacity (cm³)', unit: 'cm³', min: 0, max: 6000, step: 1000, minor: 250, snap: 50, tol: 150,
                 title: /vital capacity|lung capacity|lung volume|\bvc\b/ },
            labels: ['Sex', 'Height', 'Height (in)', 'Age', 'Age (years)', 'Activity level', 'Vital capacity', 'Vital capacity (cm³)'],
            barTol: 50,
            factors: [
              { key: 'sex', name: 'Sex', kind: 'bar', label: 'Sex', cats: ['Female', 'Male'], title: /\bsex\b|\bmales?\b|females?|gender|\bboys?\b|\bgirls?\b/ },
              { key: 'height', name: 'Height', kind: 'scatter', label: 'Height (in)', min: 56, max: 76, step: 2, minor: 1, snap: 1, tol: 0.5, title: /height|tall/ },
              { key: 'age', name: 'Age', kind: 'scatter', label: 'Age (years)', min: 13, max: 18, step: 1, snap: 1, tol: 0.5, title: /\bages?\b|\bold/ },
              { key: 'activity', name: 'Activity level', kind: 'bar', label: 'Activity level', cats: ['Low', 'Medium', 'High'], title: /activ|exercis/ }
            ]
          },
          barTip: 'The height of each bar is the average vital capacity for that group. Add up the vital capacities of everyone in the group, then divide by the number of students in the group.',
          dotTip: 'Each student in the table gets one dot. Find the student’s number on the x-axis, then go up to their vital capacity on the y-axis. Red dots do not match anyone in the table.',
          explain: 'Look at the shape of your graph: do the bars or dots go up, go down, or show no clear pattern?'
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 6 */
    {
      title: 'Analysis',
      intro: 'Use your graph and your lab group’s graphs from Part 5 to analyze the class data.',
      read: '<p><b>Read:</b> In an experiment, the <b>independent variable</b> is the factor that is changed or compared. The <b>dependent variable</b> is what is measured. <b>Constants</b> are the things kept the same for everyone, so the comparison is fair.</p>'
        + '<p>A <b>trend</b> is a pattern in the data. On a bar graph, compare the heights of the bars. On a scatter plot, see if the dots go up from left to right, go down, or are scattered with no clear pattern.</p>'
        + '<p>To investigate a factor properly, the data need a <b>wide range</b> of values for it. If everyone in the class is almost the same for a factor, you can not tell what that factor does.</p>',
      questions: [
        {
          type: 'selects',
          text: 'Experimental set-up: Match each part of the experiment.',
          options: ['The factor being compared (sex, height, age, or activity level)', 'Vital capacity', 'The balloon method and Figure 1, used the same way by everyone'],
          items: [
            { label: 'Independent variable', answer: 'The factor being compared (sex, height, age, or activity level)', hint: 'The independent variable is the factor that is changed or compared. It goes on the x-axis.' },
            { label: 'Dependent variable', answer: 'Vital capacity', hint: 'The dependent variable is what was measured for every student. It goes on the y-axis.' },
            { label: 'A constant', answer: 'The balloon method and Figure 1, used the same way by everyone', hint: 'A constant is kept the same for everyone so the comparison is fair.' }
          ]
        },
        {
          type: 'selects',
          text: 'What does the class data show for each factor?',
          options: ['Higher vital capacity', 'Lower vital capacity', 'No clear pattern'],
          items: [
            { label: 'Males, compared to females, have…', answer: 'Higher vital capacity', hint: 'Look at the two bars on the sex graph. Which bar is taller?' },
            { label: 'Taller students, compared to shorter students, have…', answer: 'Higher vital capacity', hint: 'Look at the height scatter plot. Do the dots on the right sit higher or lower than the dots on the left?' },
            { label: 'Older students, compared to younger students, have…', answer: 'No clear pattern', hint: 'Look at the age scatter plot. Do the dots move steadily up or down from left to right?' },
            { label: 'Students with a high activity level, compared to a low activity level, have…', answer: 'Higher vital capacity', hint: 'Look at the activity level graph. Compare the low bar and the high bar.' }
          ]
        },
        {
          type: 'choice',
          text: 'Which of the four factors were we NOT able to properly investigate as a class, and why?',
          options: [
            'Sex, because there were more males than females.',
            'Height, because everyone was the same height.',
            'Age, because every student was between 14 and 17 years old, so the range of ages was too small.',
            'Activity level, because nobody had a high activity level.'
          ],
          answer: 2,
          explain: 'A high school class only has ages 14 to 17. Lung capacity changes a lot between childhood and old age, but this small range of ages can not show that.',
          tip: 'Look back at the class data table. For which factor are all the students almost the same?'
        },
        {
          type: 'highlight',
          text: 'Analysis: Explain what the class data show. Tell how each factor (sex, height, age, and activity level) relates to vital capacity, and use numbers or patterns from the data and graphs as evidence. Then write out at least three ways the data may not be completely accurate, with a specific way to fix each problem in the future. (6 or more sentences)',
          examples: 'Examples: “According to the data,” “The graph shows that,” “For example,” “One piece of evidence is,” or “This shows that.”',
          min: 250,
          ideas: [
            { done: 'You described the trend for sex and height.', q: 'Did you tell how sex and height relate to vital capacity?', tip: 'Look at the sex bar graph and the height scatter plot. Which group had a higher vital capacity?', re: /(\bsex\b|\bmales?\b|females?|\bboys?\b|\bgirls?\b)[\s\S]*(height|tall)|(height|tall)[\s\S]*(\bsex\b|\bmales?\b|females?|\bboys?\b|\bgirls?\b)/ },
            { done: 'You described age and activity level.', q: 'Did you tell what the data show for age and activity level?', tip: 'Look at the age scatter plot and the activity level bar graph. Is there a pattern?', re: /(\bage\b|older|younger)[\s\S]*(activ|exercis)|(activ|exercis)[\s\S]*(\bage\b|older|younger)/ },
            { done: 'You used numbers from the data as evidence.', q: 'Did you use numbers from the data?', tip: 'Give an average or a value from the table, such as the average vital capacity of one group.', re: /\d{3,}|\d,\d{3}/ },
            { done: 'You named ways the data may not be accurate.', q: 'Did you name ways the data may not be accurate?', tip: 'Think about the balloon: air escaping, the balloon not being perfectly round, or measuring the diameter by eye.', re: /error|inaccura|mistake|escap|leak|not (perfectly )?round|measur(e|ing)|ruler|human|wrong|accurate/ },
            { done: 'You gave a fix for the problems.', q: 'Did you give a specific fix for each problem?', tip: 'For each error, tell what the class could do differently next time, such as “use a spirometer” or “have the same person measure every balloon.”', re: /fix|solution|solve|prevent|instead|next time|in the future|could use|should|better|spirometer|same person|more trials|retest/ },
            { done: 'You wrote at least 6 sentences.', q: 'Did you write at least 6 full sentences?', tip: 'There is a lot to cover here. Write one or two sentences for the factors and one for each error and its fix.', sentences: 6 },
            { done: 'You used transition words to point to your evidence.', q: 'Did you use transition words to point to your evidence?', tip: 'Introduce your evidence with words like “According to the data,” “The graph shows that,” or “For example.”', re: /for example|for instance|according to|this shows|that shows|which shows|shows that|evidence|the (data|graph|table)s? (says?|shows?|showed)|because|such as|as an example|one example|proves?|this means|supports?/ },
            { done: 'You highlighted your transition words in yellow.', q: 'Did you highlight your transition words in yellow?', tip: 'Go back and select the transition words that point to your evidence, then press the yellow button.', highlight: true }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- Part 7 */
    {
      title: 'Conclusion and the real world',
      read: '<p><b>Read:</b> <b>Why lung capacity matters.</b> Your alveoli are where <b>gas exchange</b> happens: oxygen moves from the air into your blood, and carbon dioxide moves from your blood into the air you breathe out. A larger lung capacity means more air, and more oxygen, can reach the alveoli with each breath. Athletes need a lot of oxygen for their working muscles. Singers and people who play wind instruments need to push out a long, steady stream of air.</p>'
        + '<p><b>Changing your lung capacity.</b> Regular aerobic exercise (like running or swimming), singing or playing a wind instrument, and deep breathing exercises can help your lungs work at their best. Smoking, vaping, and breathing polluted air damage the lungs and can lower lung capacity.</p>'
        + '<p><b>Respiratory distress</b> is any kind of breathing difficulty. Some diseases that cause it:</p>'
        + '<ul><li><b>Asthma:</b> the airways swell, tighten, and fill with mucus, so they become narrow and it is hard to move air in and out.</li>'
        + '<li><b>Emphysema</b> (a type of COPD, usually caused by smoking): the walls of the alveoli are damaged, so there is less surface for gas exchange and air gets trapped in the lungs.</li>'
        + '<li><b>Chronic bronchitis</b> (another type of COPD): the bronchial tubes stay swollen and make extra mucus, which blocks air flow.</li>'
        + '<li><b>Pneumonia:</b> an infection that fills the alveoli with fluid or pus, so less air can get in.</li>'
        + '<li><b>Cystic fibrosis:</b> a genetic disease that makes thick, sticky mucus that clogs the airways.</li>'
        + '<li><b>Lung cancer:</b> tumors grow in the lungs and take up space and block airways.</li></ul>',
      questions: [
        {
          type: 'choice',
          text: 'Why is a high lung capacity more important for athletes and singers than for the average person?',
          options: [
            'Athletes need more oxygen for their working muscles, and singers need a long, steady stream of air.',
            'Athletes and singers need to hold their breath longer to stay calm.',
            'A high lung capacity makes their hearts smaller.',
            'Athletes and singers do not need gas exchange.'
          ],
          answer: 0,
          explain: 'More air per breath means more oxygen for hard-working muscles, and more air to push out for long notes and phrases.',
          tip: 'Read the first paragraph. What does each group need a lot of?'
        },
        {
          type: 'choice',
          text: 'How does lung capacity connect to gas exchange?',
          options: [
            'A larger lung capacity means less air reaches the alveoli.',
            'A larger lung capacity lets more air, and more oxygen, reach the alveoli, where oxygen moves into the blood.',
            'Gas exchange happens in the stomach, so lung capacity does not matter.',
            'Lung capacity only affects how loud you can talk.'
          ],
          answer: 1,
          explain: 'Gas exchange happens in the alveoli. The more air that reaches them with each breath, the more oxygen can move into the blood and the more carbon dioxide can be breathed out.',
          tip: 'Where does gas exchange happen? Think about what more air in the lungs means for that place.'
        },
        {
          type: 'multi',
          text: 'Which of these can help someone’s lungs work at their best? Choose every correct answer.',
          options: ['Regular aerobic exercise', 'Smoking or vaping', 'Singing or playing a wind instrument', 'Breathing polluted air', 'Deep breathing exercises'],
          answers: ['Regular aerobic exercise', 'Singing or playing a wind instrument', 'Deep breathing exercises'],
          rules: [{ any: ['Smoking or vaping', 'Breathing polluted air'], tip: 'One of your choices damages the lungs. Read the second paragraph again.' }],
          tip: 'There are more right answers. Read the second paragraph again.',
          explain: 'Exercise, singing or playing a wind instrument, and deep breathing all train the breathing muscles. Smoking, vaping, and polluted air do the opposite.'
        },
        {
          type: 'selects',
          text: 'How does each disease cause respiratory distress?',
          options: ['The airways swell and get narrow', 'The walls of the alveoli are damaged', 'The alveoli fill with fluid', 'Thick, sticky mucus clogs the airways'],
          items: [
            { label: 'Asthma', answer: 'The airways swell and get narrow', hint: 'Find asthma in the list. What happens to the airways?' },
            { label: 'Emphysema', answer: 'The walls of the alveoli are damaged', hint: 'Find emphysema in the list. Which part of the lungs is hurt?' },
            { label: 'Pneumonia', answer: 'The alveoli fill with fluid', hint: 'Pneumonia is an infection. What fills the air sacs?' },
            { label: 'Cystic fibrosis', answer: 'Thick, sticky mucus clogs the airways', hint: 'Cystic fibrosis is a genetic disease. What does it make too much of?' }
          ]
        },
        {
          type: 'written',
          text: 'Conclusion: Do the class data support your hypotheses from Part 2? Give a possible explanation for the results, and say whether they make sense. Then choose one disease from the reading and explain how it causes respiratory distress and how you think it affects lung capacity. Finally, describe one way this lab could be redesigned to investigate a different question about lung capacity. (5 or more sentences)',
          min: 200,
          ideas: [
            { done: 'You said whether the data support your hypotheses.', q: 'Did you say whether the data support your hypotheses?', tip: 'Look back at your predictions in Part 2. Were they right, partly right, or wrong?', re: /support|hypothes|predict|correct|right|wrong|agree|match/ },
            { done: 'You gave an explanation for the results.', q: 'Did you explain why the results came out this way?', tip: 'Why might taller people or males have a larger vital capacity? Think about body size and the size of the lungs and chest.', re: /because|bigger|larger|smaller|body|chest|lungs? (are|is)|size|makes sense|explain/ },
            { done: 'You described a disease and its effect on lung capacity.', q: 'Did you explain how one disease affects lung capacity?', tip: 'Choose one disease from the reading. Tell what it does to the airways or alveoli, and whether lung capacity would go up or down.', re: /asthma|emphysema|copd|bronchitis|pneumonia|cystic|fibrosis|cancer/ },
            { done: 'You described a way to redesign the lab.', q: 'Did you describe a new way to investigate lung capacity?', tip: 'What else could you test? For example, compare people who play wind instruments to people who do not, or measure before and after exercise.', re: /redesign|investigate|test|compare|experiment|could (measure|study)|instead|another|different|new/ },
            { done: 'You wrote at least 5 sentences.', q: 'Did you write at least 5 full sentences?', tip: 'There are four things to cover. Give each one at least one full sentence.', sentences: 5 }
          ]
        }
      ]
    }
  ]
};
