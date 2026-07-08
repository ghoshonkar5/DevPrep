import type { Roadmap } from './dsa';

export interface TcsRoleInfo {
  role: string;
  package: string;
  requirement: string;
  badgeColor: string;
}

export interface CoachTopic {
  id: string;
  title: string;
  category: 'Aptitude' | 'Verbal' | 'Reasoning' | 'DSA';
  refresher: string[];
  formulas: string[];
  shortcuts: string[];
  practiceQuestions: { q: string; options: string[] }[];
  pyqTraps: { title: string; desc: string }[];
}

export const TCS_ROLES: TcsRoleInfo[] = [
  {
    role: 'Ninja',
    package: '3.5 LPA',
    requirement: 'Clear Foundation Cutoff + Moderate performance in Reasoning & Verbal. Basic coding attempt.',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
  },
  {
    role: 'Digital',
    package: '7.0 LPA',
    requirement: 'High Foundation score + Solve at least 1st Coding Question (Story Mode / 80% pattern) with edge cases.',
    badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
  },
  {
    role: 'Prime',
    package: '9.0 - 10.0 LPA',
    requirement: 'Top percentile in Foundation + Solve BOTH Coding Questions (Easy + Hard) + Strong 20% Advanced DSA.',
    badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 font-extrabold',
  },
];

export const TCS_AI_PROMPT = `You are a TCS NQT aptitude/reasoning coach. Today's topic: [TOPIC]. 
1. Give me a 5-min concept refresher with key formulas and 2-3 shortcuts. 
2. Then give me 10 questions of TCS NQT difficulty. 
3. Don't show answers — I'll attempt first. 
4. Mark my answers, show solutions for wrong ones with the fastest method. 
5. End with 3 PYQ-style traps TCS commonly asks on this topic.`;

export const TCS_COACH_TOPICS: CoachTopic[] = [
  {
    id: 'num-sys',
    title: 'Number System (LCM, HCF, Divisibility)',
    category: 'Aptitude',
    refresher: [
      'HCF (Highest Common Factor): Largest number that divides all given numbers exactly.',
      'LCM (Lowest Common Multiple): Smallest number divisible by all given numbers.',
      'Co-prime numbers have HCF = 1. Twin primes differ by 2 (e.g., 11, 13).',
    ],
    formulas: [
      'HCF × LCM = Product of two numbers (only valid for exactly two numbers)',
      'HCF of fractions = HCF of numerators / LCM of denominators',
      'LCM of fractions = LCM of numerators / HCF of denominators',
      'Number of factors of N = a^p × b^q × c^r → Total factors = (p+1)(q+1)(r+1)',
    ],
    shortcuts: [
      'For HCF by division method: Divide larger by smaller, then divisor by remainder, repeat until remainder = 0.',
      'Trailing zeros in N!: Count powers of 5: ⌊N/5⌋ + ⌊N/25⌋ + ⌊N/125⌋ + ...',
      'Cyclicity of units digits: 2, 3, 7, 8 have cycle 4. 4, 9 have cycle 2. 0, 1, 5, 6 always end in same digit.',
    ],
    practiceQuestions: [
      { q: 'The HCF of two numbers is 11 and their LCM is 7700. If one number is 275, find the other.', options: ['(a) 305', '(b) 308', '(c) 312', '(d) 318'] },
      { q: 'Find the greatest number that will divide 43, 91 and 183 leaving the same remainder in each case.', options: ['(a) 4', '(b) 7', '(c) 9', '(d) 13'] },
      { q: 'Six bells commence tolling together and toll at intervals of 2, 4, 6, 8, 10, 12 seconds. In 30 mins, how many times do they toll together?', options: ['(a) 4', '(b) 10', '(c) 15', '(d) 16'] },
      { q: 'What is the least number which, when divided by 12, 15, 20 and 54, leaves a remainder of 8?', options: ['(a) 548', '(b) 540', '(c) 536', '(d) 544'] },
      { q: 'Find the number of zeros at the end of 100!', options: ['(a) 20', '(b) 22', '(c) 24', '(d) 25'] },
      { q: 'What is the unit digit of 7^105?', options: ['(a) 1', '(b) 3', '(c) 7', '(d) 9'] },
    ],
    pyqTraps: [
      { title: 'Trap 1 — "Same Remainder" HCF', desc: 'When asked for greatest number leaving same remainder, find HCF of differences between numbers! E.g. HCF(4665−1305, 6905−4665, 6905−1305). TCS phrasing makes students try HCF of numbers directly.' },
      { title: 'Trap 2 — Bells Tolling "Together"', desc: 'Students find LCM but forget to include time 0. Formula: (Total time / LCM) + 1 if start is included.' },
      { title: 'Trap 3 — Unit Digit of Large Powers Sum', desc: 'For 3^100 + 7^98, check individual cycles: 3^100 → mod 4 = 0 (digit 1). 7^98 → mod 4 = 2 (digit 9). Sum = 1+9 = 10 → Unit digit is 0!' },
    ],
  },
  {
    id: 'percentages',
    title: 'Percentages & Successive Changes',
    category: 'Aptitude',
    refresher: [
      'Percentage = (Part / Whole) × 100.',
      'x% of y = y% of x (very useful shortcut in mental math!).',
      'If A is x% more than B, then B is [x/(100+x)] × 100% less than A.',
    ],
    formulas: [
      'Successive percentage changes: If +a% then +b%, net = a + b + (ab/100)%',
      'Net effect of equal +a% and -a% = -a²/100% (always a loss/decrease)',
      'Population after n years at r% growth = P(1 + r/100)^n',
    ],
    shortcuts: [
      'Memorize fraction equivalents: 1/3 = 33.33%, 1/6 = 16.67%, 1/7 = 14.28%, 1/8 = 12.5%, 1/9 = 11.11%, 1/11 = 9.09%.',
      'For "x% of A = y% of B", simply find ratio A:B = y:x.',
    ],
    practiceQuestions: [
      { q: 'A student scored 40% in an exam and failed by 16 marks. Passing percentage is 55%. Find max marks.', options: ['(a) 80', '(b) 100', '(c) 120', '(d) 160'] },
      { q: 'If price of rice increases by 20%, by what percentage must consumption reduce to maintain expenditure?', options: ['(a) 16.67%', '(b) 20%', '(c) 25%', '(d) 15%'] },
      { q: 'A number is increased by 20% and then decreased by 20%. Net change is:', options: ['(a) 4% decrease', '(b) 4% increase', '(c) No change', '(d) 2% decrease'] },
      { q: 'In an election between two candidates, winner got 60% votes and won by 480 votes. Total votes polled?', options: ['(a) 2400', '(b) 2000', '(c) 2200', '(d) 1800'] },
    ],
    pyqTraps: [
      { title: 'Trap 1 — Reverse Percentage', desc: '"A is 20% more than B" does NOT mean B is 20% less than A. Correct: B is less by 20/120 × 100 = 16.67%.' },
      { title: 'Trap 2 — Successive Discounts', desc: 'Two successive discounts of 20% and 30% do NOT equal 50%. Net discount = 20 + 30 − (20×30/100) = 44%.' },
    ],
  },
  {
    id: 'profit-loss',
    title: 'Profit & Loss, Discounts & False Weights',
    category: 'Aptitude',
    refresher: [
      'Profit = SP − CP; Loss = CP − SP.',
      'SP = CP × (100 + Profit%) / 100; SP = MP × (100 − Discount%) / 100.',
    ],
    formulas: [
      'Dishonest dealer using false weights: Gain% = [Error / (True value − Error)] × 100%',
      'If CP of x articles = SP of y articles: Profit% = [(x−y)/y] × 100%',
      'Selling two items at same SP (one at x% profit, one at x% loss) → Always a loss of x²/100%',
    ],
    shortcuts: [
      'To find CP when SP and profit% given: CP = SP × 100 / (100 + P%)',
      'For false weight shortcut: Gain% = [(True weight − False weight) / False weight] × 100',
    ],
    practiceQuestions: [
      { q: 'If a trader sells goods at cost price using false weight of 900g instead of 1 kg, his gain% is:', options: ['(a) 10%', '(b) 11.11%', '(c) 9.09%', '(d) 12.5%'] },
      { q: 'A shopkeeper sells two TVs at ₹9900 each. On one he gains 10% and on other loses 10%. Overall result?', options: ['(a) Neither', '(b) 1% loss', '(c) 1% profit', '(d) 2% loss'] },
      { q: 'If the CP of 12 items equals SP of 8 items, profit% is:', options: ['(a) 33.33%', '(b) 50%', '(c) 25%', '(d) 40%'] },
    ],
    pyqTraps: [
      { title: 'Trap 1 — Equal SP, Different Profit/Loss', desc: 'Two items at same SP — one at x% profit, one at x% loss = ALWAYS a net loss of x²/100%. TCS asks this expecting students to say "no net change."' },
      { title: 'Trap 2 — False Weight Denominator', desc: 'Gain% = (True − False) / False × 100, NOT divided by True weight! For 900g sold as 1000g: gain = 100/900 × 100 = 11.11%.' },
    ],
  },
  {
    id: 'time-work',
    title: 'Time & Work, Pipes & Cisterns',
    category: 'Aptitude',
    refresher: [
      'If A can do work in n days → A\'s 1-day work = 1/n.',
      'Work done = Rate × Time. Pipes: Inlet fills (+), Outlet empties (-).',
    ],
    formulas: [
      'A and B together: Days = ab / (a + b)',
      'A, B, C together: 1 / (1/a + 1/b + 1/c)',
      'Mandays Concept: (M1 × D1 × H1) / W1 = (M2 × D2 × H2) / W2',
    ],
    shortcuts: [
      'If A and B together do work in T days, A alone in a days → B alone = aT / (a − T) days.',
      'Efficiency ratio: If A:B efficiency = m:n, then time ratio = n:m.',
    ],
    practiceQuestions: [
      { q: 'A can do a piece of work in 10 days, B in 15 days. In how many days can both together do it?', options: ['(a) 5 days', '(b) 6 days', '(c) 8 days', '(d) 12 days'] },
      { q: '30 workers complete a project in 20 days working 8 hrs/day. How many workers needed for 12 days at 10 hrs/day?', options: ['(a) 35', '(b) 36', '(c) 40', '(d) 45'] },
      { q: 'A is 50% more efficient than B. If A finishes in 18 days, how many days will B alone take?', options: ['(a) 9 days', '(b) 12 days', '(c) 27 days', '(d) 15 days'] },
    ],
    pyqTraps: [
      { title: 'Trap 1 — Efficiency vs Time', desc: '"B is 50% more efficient than A who takes 18 days." More efficient = LESS time! B takes 18 × (2/3) = 12 days.' },
      { title: 'Trap 2 — B alone formula', desc: 'Remember denominator is a − T, not a + T when finding individual time from combined time.' },
    ],
  },
  {
    id: 'speed-distance',
    title: 'Speed, Time & Distance, Trains, Boats',
    category: 'Aptitude',
    refresher: [
      'Speed = Distance / Time. km/h to m/s: multiply by 5/18.',
      'Relative speed: Same direction = |v1 − v2|; Opposite direction = v1 + v2.',
    ],
    formulas: [
      'Average speed (equal distances) = 2xy / (x + y)',
      'Train crossing platform of length P: Time = (Train Length + Platform Length) / Speed',
      'Boat Downstream = u + v; Upstream = u − v. Boat in still water = (Down + Up)/2.',
    ],
    shortcuts: [
      'If A reaches T1 min late at S1 and T2 min early at S2: Distance = S1×S2×(T1+T2) / (S2−S1)',
      'For a person walking at 3/4 of usual speed, time taken is 4/3 of usual time.',
    ],
    practiceQuestions: [
      { q: 'A train 150m long passes a pole in 15 sec. How long to pass a 250m platform?', options: ['(a) 30 sec', '(b) 35 sec', '(c) 40 sec', '(d) 45 sec'] },
      { q: 'Two trains in opposite directions cross in 12 sec. Speeds are 50 km/h and 58 km/h. Sum of lengths?', options: ['(a) 356m', '(b) 362m', '(c) 360m', '(d) 368m'] },
      { q: 'A boat goes 12 km upstream in 4 hrs and 18 km downstream in 3 hrs. Speed of stream?', options: ['(a) 1 km/h', '(b) 1.5 km/h', '(c) 2 km/h', '(d) 2.5 km/h'] },
    ],
    pyqTraps: [
      { title: 'Trap 1 — Average Speed Unequal Distances', desc: 'The formula 2xy/(x+y) ONLY applies when both distances are equal! Otherwise use Total Distance / Total Time.' },
      { title: 'Trap 2 — Relative Speed Direction', desc: 'For same direction overtaking, subtract speeds (v1 − v2). Students often add them by mistake.' },
    ],
  },
  {
    id: 'averages-alligations',
    title: 'Averages, Mixtures & Alligations',
    category: 'Aptitude',
    refresher: [
      'Average = Sum of values / Number of values.',
      'Alligation Rule: Ratio of quantities = (C2 − Mean) : (Mean − C1).',
    ],
    formulas: [
      'Average of first n natural numbers = (n+1)/2. Average of first n even numbers = n+1.',
      'Replacement formula: Final quantity = X × (1 − Y/X)^n',
    ],
    shortcuts: [
      'If average increases by d when new member added: New member = Old avg + (n+1)×d',
      'Correct sum = Wrong sum − Wrong value + Correct value.',
    ],
    practiceQuestions: [
      { q: 'Average of 5 numbers is 27. If one excluded, average becomes 25. Excluded number?', options: ['(a) 35', '(b) 37', '(c) 38', '(d) 40'] },
      { q: 'In what ratio must rice at ₹9.30/kg be mixed with ₹10.80/kg rice so mixture costs ₹10/kg?', options: ['(a) 8:7', '(b) 7:8', '(c) 6:7', '(d) 7:6'] },
      { q: 'A vessel has 60L milk. 6L removed and replaced with water 3 times. Milk concentration?', options: ['(a) 72.9%', '(b) 75%', '(c) 70%', '(d) 65.6%'] },
    ],
    pyqTraps: [
      { title: 'Trap 1 — Replacement Compounding', desc: 'In replacement problems, apply X(1−Y/X)^n. Do not simply subtract Y × n!' },
      { title: 'Trap 2 — Age at birth of youngest', desc: 'When finding average age N years ago, remember the youngest was not born, so denominator decreases by 1.' },
    ],
  },
  {
    id: 'si-ci',
    title: 'Simple Interest & Compound Interest',
    category: 'Aptitude',
    refresher: [
      'SI = PRT / 100; CI Amount = P(1 + R/100)^n.',
      'Half-yearly CI: Rate becomes R/2, Time periods become 2n.',
    ],
    formulas: [
      '2-Year CI and SI Difference: CI − SI = P(R/100)²',
      '3-Year CI and SI Difference: CI − SI = P(R/100)² × (3 + R/100)',
    ],
    shortcuts: [
      'Rule of 72: Time to double at CI ≈ 72 / Rate.',
      'If a sum triples in 8 years at SI, rate = 25%. To become 5 times, interest needed = 4P → takes 16 years.',
    ],
    practiceQuestions: [
      { q: 'Difference between SI and CI for 2 years at 10% per annum is ₹400. Find principal.', options: ['(a) ₹30,000', '(b) ₹40,000', '(c) ₹50,000', '(d) ₹60,000'] },
      { q: 'A sum doubles itself at SI in 10 years. Rate of interest?', options: ['(a) 10%', '(b) 20%', '(c) 15%', '(d) 12%'] },
    ],
    pyqTraps: [
      { title: 'Trap 1 — Half-Yearly Rate', desc: 'Always halve the rate and double the time periods for half-yearly compounding!' },
      { title: 'Trap 2 — SI Tripling vs 5 Times', desc: 'At SI, tripling means Interest = 2P. 5 times means Interest = 4P (exactly double the time!).' },
    ],
  },
  {
    id: 'perm-comb-prob',
    title: 'Permutations, Combinations & Probability',
    category: 'Aptitude',
    refresher: [
      'nPr = n! / (n-r)! (Arrangement); nCr = n! / [r!(n-r)!] (Selection).',
      'P(A) = Favorable / Total. P(A∪B) = P(A) + P(B) − P(A∩B).',
    ],
    formulas: [
      'Circular arrangement of n distinct items = (n−1)!; Necklace = (n−1)! / 2.',
      'Arrangements with repetitions of letters a, b, c: n! / (a! b! c!)',
      'Number of diagonals in n-sided polygon = n(n−3)/2',
    ],
    shortcuts: [
      'At least one = Total ways − None selected. This shortcut saves 80% calculation time!',
      'P(A\') = 1 − P(A).',
    ],
    practiceQuestions: [
      { q: 'How many ways can the word LEADER be arranged?', options: ['(a) 360', '(b) 720', '(c) 480', '(d) 540'] },
      { q: 'Number of diagonals in a decagon (10-sided polygon)?', options: ['(a) 35', '(b) 40', '(c) 45', '(d) 50'] },
      { q: 'Two dice thrown. Probability of getting sum = 7?', options: ['(a) 1/6', '(b) 5/36', '(c) 7/36', '(d) 1/4'] },
    ],
    pyqTraps: [
      { title: 'Trap 1 — At Least One', desc: 'Never calculate 1 + 2 + 3... directly. Always compute Total − None!' },
      { title: 'Trap 2 — Repeated Letters in Probability', desc: 'In PROBABILITY (11 letters), B and I repeat twice. When selecting 1 letter at random, there are 11 equally likely choices, not 9.' },
    ],
  },
];

export const TCS_NQT_ROADMAP: Roadmap = {
  phases: [
    {
      id: 301,
      name: '1. Foundation — Aptitude (20 Qs in Exam)',
      source: 'TCS NQT Syllabus',
      subs: [
        {
          name: 'Number System & Arithmetic Basics',
          problems: [
            { n: 'LCM, HCF & Remainders', t: 'Number System', d: 'Aptitude', l: 'E', u: 'https://www.geeksforgeeks.org/lcm-and-hcf-in-aptitude/' },
            { n: 'Divisibility Rules & Power Cycles', t: 'Number System', d: 'Aptitude', l: 'E', u: 'https://www.geeksforgeeks.org/divisibility-rules/' },
            { n: 'Percentages & Successive Changes', t: 'Arithmetic', d: 'Aptitude', l: 'E', u: 'https://www.geeksforgeeks.org/percentage-aptitude/' },
            { n: 'Profit, Loss, Discounts & False Weights', t: 'Commercial Math', d: 'Aptitude', l: 'M', u: 'https://www.geeksforgeeks.org/profit-and-loss-aptitude/' },
            { n: 'Simple & Compound Interest (SI/CI)', t: 'Commercial Math', d: 'Aptitude', l: 'M', u: 'https://www.geeksforgeeks.org/simple-interest-and-compound-interest/' },
          ],
        },
        {
          name: 'Speed, Time, Work & Averages',
          problems: [
            { n: 'Time & Work, Man-Days Concept', t: 'Efficiency', d: 'Aptitude', l: 'M', u: 'https://www.geeksforgeeks.org/time-and-work-aptitude/' },
            { n: 'Pipes & Cisterns', t: 'Efficiency', d: 'Aptitude', l: 'M', u: 'https://www.geeksforgeeks.org/pipes-and-cisterns-aptitude/' },
            { n: 'Speed, Time & Distance, Trains & Boats', t: 'Kinematics', d: 'Aptitude', l: 'M', u: 'https://www.geeksforgeeks.org/speed-time-and-distance/' },
            { n: 'Averages & Weighted Mean', t: 'Statistics', d: 'Aptitude', l: 'E', u: 'https://www.geeksforgeeks.org/averages-aptitude/' },
            { n: 'Mixtures & Alligations', t: 'Ratio & Proportions', d: 'Aptitude', l: 'M', u: 'https://www.geeksforgeeks.org/alligation-or-mixture-aptitude/' },
          ],
        },
        {
          name: 'Algebra, Combinatorics & Geometry',
          problems: [
            { n: 'Ratio, Proportion & Ages', t: 'Algebra', d: 'Aptitude', l: 'E', u: 'https://www.geeksforgeeks.org/ratio-and-proportion-aptitude/' },
            { n: 'Permutations & Combinations (nPr / nCr)', t: 'Combinatorics', d: 'Aptitude', l: 'M', u: 'https://www.geeksforgeeks.org/permutation-and-combination/' },
            { n: 'Probability & Independent Events', t: 'Combinatorics', d: 'Aptitude', l: 'M', u: 'https://www.geeksforgeeks.org/probability-in-aptitude/' },
            { n: 'Geometry & Mensuration (2D/3D)', t: 'Geometry', d: 'Aptitude', l: 'M', u: 'https://www.geeksforgeeks.org/geometry-in-aptitude/' },
          ],
        },
      ],
    },
    {
      id: 302,
      name: '2. Foundation — Verbal Ability (25 Qs in Exam)',
      source: 'TCS NQT Syllabus',
      subs: [
        {
          name: 'Grammar & Vocabulary',
          problems: [
            { n: 'Reading Comprehension (RC)', t: 'Verbal', d: 'English', l: 'M', u: 'https://www.geeksforgeeks.org/reading-comprehension-aptitude/' },
            { n: 'Sentence Correction & Spotting Errors', t: 'Grammar', d: 'English', l: 'E', u: 'https://www.geeksforgeeks.org/spotting-errors-aptitude/' },
            { n: 'Para Jumbles & Sentence Ordering', t: 'Logic', d: 'English', l: 'M', u: 'https://www.geeksforgeeks.org/parajumbles-aptitude/' },
            { n: 'Fill in the Blanks & Cloze Test', t: 'Vocabulary', d: 'English', l: 'E', u: 'https://www.geeksforgeeks.org/cloze-test-aptitude/' },
            { n: 'Synonyms, Antonyms & Prepositions', t: 'Vocabulary', d: 'English', l: 'E', u: 'https://www.geeksforgeeks.org/synonyms-and-antonyms/' },
            { n: 'Active & Passive Voice', t: 'Grammar', d: 'English', l: 'E', u: 'https://www.geeksforgeeks.org/active-and-passive-voice/' },
          ],
        },
      ],
    },
    {
      id: 303,
      name: '3. Foundation — Reasoning Ability (20 Qs in Exam)',
      source: 'TCS NQT Syllabus',
      subs: [
        {
          name: 'Deductive & Visual Reasoning',
          problems: [
            { n: 'Coding-Decoding & Letter Shifting', t: 'Logic', d: 'Reasoning', l: 'E', u: 'https://www.geeksforgeeks.org/coding-and-decoding-reasoning/' },
            { n: 'Blood Relations & Family Tree', t: 'Logic', d: 'Reasoning', l: 'E', u: 'https://www.geeksforgeeks.org/blood-relations-reasoning/' },
            { n: 'Direction Sense Test', t: 'Spatial', d: 'Reasoning', l: 'E', u: 'https://www.geeksforgeeks.org/direction-sense-test/' },
            { n: 'Number & Letter Series', t: 'Pattern', d: 'Reasoning', l: 'M', u: 'https://www.geeksforgeeks.org/number-series/' },
            { n: 'Data Sufficiency', t: 'Logic', d: 'Reasoning', l: 'H', u: 'https://www.geeksforgeeks.org/data-sufficiency/' },
            { n: 'Seating Arrangements (Linear/Circular)', t: 'Arrangement', d: 'Reasoning', l: 'M', u: 'https://www.geeksforgeeks.org/seating-arrangement-reasoning/' },
            { n: 'Syllogisms & Venn Diagrams', t: 'Deduction', d: 'Reasoning', l: 'M', u: 'https://www.geeksforgeeks.org/syllogism-reasoning/' },
            { n: 'Meaningful Word Formation', t: 'Vocabulary', d: 'Reasoning', l: 'E', u: 'https://www.geeksforgeeks.org/word-formation/' },
          ],
        },
      ],
    },
    {
      id: 304,
      name: '4. Advanced — Quant & Reasoning MCQs',
      source: 'TCS NQT Advanced',
      subs: [
        {
          name: 'High-Difficulty MCQs (For Digital & Prime)',
          problems: [
            { n: 'Advanced Data Interpretation (Tables/Charts)', t: 'DI', d: 'Advanced Quant', l: 'H', u: 'https://www.geeksforgeeks.org/data-interpretation/' },
            { n: 'Complex Permutations & Probability', t: 'Advanced Math', d: 'Advanced Quant', l: 'H', u: 'https://www.geeksforgeeks.org/probability-in-aptitude/' },
            { n: 'Advanced Syllogisms & Possibility Cases', t: 'Deduction', d: 'Advanced Reasoning', l: 'H', u: 'https://www.geeksforgeeks.org/syllogism-reasoning/' },
            { n: 'Multi-Variable Seating Arrangements', t: 'Arrangement', d: 'Advanced Reasoning', l: 'H', u: 'https://www.geeksforgeeks.org/seating-arrangement-reasoning/' },
          ],
        },
      ],
    },
    {
      id: 305,
      name: '5. Advanced — DSA 80% (Repeated Core Patterns)',
      source: 'TCS Coding Curriculum',
      subs: [
        {
          name: 'Day 1: Arrays & DSA Basics',
          problems: [
            { n: 'Find Max, Min & Second Largest Element', t: 'Array Traversal', d: 'Arrays', l: 'E', u: 'https://www.geeksforgeeks.org/find-second-largest-element-array/' },
            { n: 'Reverse Array In-Place', t: 'Two Pointers', d: 'Arrays', l: 'E', u: 'https://www.geeksforgeeks.org/write-a-program-to-reverse-an-array-or-string/' },
            { n: 'Count Positive, Negative & Zeros', t: 'Array Traversal', d: 'Arrays', l: 'E', u: 'https://www.geeksforgeeks.org/count-positive-negative-numbers-array/' },
            { n: 'Rotate Array by K Elements', t: 'Array Rotation', d: 'Arrays', l: 'M', u: 'https://www.geeksforgeeks.org/array-rotation/' },
          ],
        },
        {
          name: 'Day 2: Two Pointers & Array Manipulation',
          problems: [
            { n: 'Move All Zeros to End', t: 'Two Pointers', d: 'Arrays', l: 'E', u: 'https://www.geeksforgeeks.org/move-zeroes-end-array/' },
            { n: 'Remove Duplicates from Sorted Array', t: 'Two Pointers', d: 'Arrays', l: 'E', u: 'https://www.geeksforgeeks.org/remove-duplicates-sorted-array/' },
            { n: 'Triplet Sum / 3Sum', t: 'Two Pointers', d: 'Arrays', l: 'M', u: 'https://www.geeksforgeeks.org/find-a-triplet-that-sum-to-a-given-value/' },
            { n: 'Dutch National Flag (Sort 0s, 1s, 2s)', t: 'Three Pointers', d: 'Arrays', l: 'M', u: 'https://www.geeksforgeeks.org/sort-an-array-of-0s-1s-and-2s/' },
          ],
        },
        {
          name: 'Day 3 & 4: Sliding Window Patterns',
          problems: [
            { n: 'Max Sum Subarray of Size K', t: 'Fixed Window', d: 'Sliding Window', l: 'E', u: 'https://www.geeksforgeeks.org/find-maximum-minimum-sum-subarray-size-k/' },
            { n: 'First Negative Number in Window of Size K', t: 'Fixed Window', d: 'Sliding Window', l: 'M', u: 'https://www.geeksforgeeks.org/first-negative-integer-every-window-size-k/' },
            { n: 'Longest Substring Without Repeating Characters', t: 'Variable Window', d: 'Strings', l: 'M', u: 'https://www.geeksforgeeks.org/length-of-the-longest-substring-without-repeating-characters/' },
            { n: 'Smallest Window Containing All Characters', t: 'Min Window', d: 'Strings', l: 'H', u: 'https://www.geeksforgeeks.org/find-the-smallest-window-in-a-string-containing-all-characters-of-another-string/' },
          ],
        },
        {
          name: 'Day 5: Strings I & Character Frequency',
          problems: [
            { n: 'Reverse String & Palindrome Check', t: 'String Basics', d: 'Strings', l: 'E', u: 'https://www.geeksforgeeks.org/c-program-check-given-string-palindrome/' },
            { n: 'Count Vowels, Consonants & Spaces', t: 'String Parsing', d: 'Strings', l: 'E', u: 'https://www.geeksforgeeks.org/count-vowels-consonants-spaces-string/' },
            { n: 'Check if Two Strings are Anagrams', t: 'Frequency Map', d: 'Strings', l: 'E', u: 'https://www.geeksforgeeks.org/check-whether-two-strings-are-anagram-of-each-other/' },
            { n: 'Character Frequency & First Non-Repeating Char', t: 'Frequency Map', d: 'Strings', l: 'M', u: 'https://www.geeksforgeeks.org/given-a-string-find-its-first-non-repeating-character/' },
          ],
        },
        {
          name: 'Day 6: Number Theory & Math Fundamentals',
          problems: [
            { n: 'Prime Check using Sieve of Eratosthenes', t: 'Number Theory', d: 'Math', l: 'M', u: 'https://www.geeksforgeeks.org/sieve-of-eratosthenes/' },
            { n: 'Armstrong & Perfect Number Check', t: 'Number Theory', d: 'Math', l: 'E', u: 'https://www.geeksforgeeks.org/program-armstrong-numbers/' },
            { n: 'Factorial & Fibonacci Series (Iterative / Recursive)', t: 'Series', d: 'Math', l: 'E', u: 'https://www.geeksforgeeks.org/program-for-nth-fibonacci-number/' },
            { n: 'GCD & LCM of Two Numbers (Euclid Algorithm)', t: 'Number Theory', d: 'Math', l: 'E', u: 'https://www.geeksforgeeks.org/program-to-find-lcm-of-two-numbers/' },
          ],
        },
        {
          name: 'Day 7: Pattern Printing & Sorting Basics',
          problems: [
            { n: 'Star, Number & Pyramid Nested Loop Patterns', t: 'Nested Loops', d: 'Patterns', l: 'E', u: 'https://www.geeksforgeeks.org/programs-printing-pyramid-patterns-java/' },
            { n: 'Bubble Sort & Insertion Sort Implementation', t: 'Sorting', d: 'Algorithms', l: 'E', u: 'https://www.geeksforgeeks.org/bubble-sort/' },
            { n: 'Selection Sort & Time Complexity Analysis', t: 'Sorting', d: 'Algorithms', l: 'E', u: 'https://www.geeksforgeeks.org/selection-sort/' },
          ],
        },
      ],
    },
    {
      id: 306,
      name: '6. Advanced — DSA 20% (For Prime & Digital Roles)',
      source: 'TCS Advanced Coding',
      subs: [
        {
          name: 'Day 8 & 9: Linked Lists & Kadane Algorithm',
          problems: [
            { n: 'Reverse a Linked List (Iterative / Recursive)', t: 'Linked List', d: 'Data Structures', l: 'M', u: 'https://www.geeksforgeeks.org/reverse-a-linked-list/' },
            { n: 'Detect Cycle in Linked List (Floyd Slow-Fast)', t: 'Slow-Fast Pointers', d: 'Linked List', l: 'M', u: 'https://www.geeksforgeeks.org/detect-loop-in-a-linked-list/' },
            { n: 'Find Middle Node of Linked List', t: 'Slow-Fast Pointers', d: 'Linked List', l: 'E', u: 'https://www.geeksforgeeks.org/write-a-c-function-to-print-the-middle-of-the-linked-list/' },
            { n: 'Kadane Algorithm (Maximum Subarray Sum)', t: 'Dynamic Programming', d: 'Arrays', l: 'M', u: 'https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/' },
          ],
        },
        {
          name: 'Day 10: Binary Search Fundamentals',
          problems: [
            { n: 'Binary Search on Sorted Array', t: 'Divide & Conquer', d: 'Binary Search', l: 'E', u: 'https://www.geeksforgeeks.org/binary-search/' },
            { n: 'First & Last Occurrence of Element', t: 'Binary Search', d: 'Arrays', l: 'M', u: 'https://www.geeksforgeeks.org/find-first-and-last-positions-of-an-element-in-a-sorted-array/' },
            { n: 'Binary Search on Answer (Story Mode Problems)', t: 'Search on Answer', d: 'Binary Search', l: 'H', u: 'https://www.geeksforgeeks.org/allocate-minimum-number-pages/' },
          ],
        },
        {
          name: 'Day 11: Stacks & Applications',
          problems: [
            { n: 'Balanced Parentheses Check', t: 'Stack Application', d: 'Stacks', l: 'E', u: 'https://www.geeksforgeeks.org/check-for-balanced-parentheses-in-an-expression/' },
            { n: 'Next Greater Element (Monotonic Stack)', t: 'Monotonic Stack', d: 'Stacks', l: 'M', u: 'https://www.geeksforgeeks.org/next-greater-element/' },
          ],
        },
        {
          name: 'Day 12: Heaps & Priority Queues',
          problems: [
            { n: 'Kth Largest / Smallest Element in Array', t: 'Heap Select', d: 'Heaps', l: 'M', u: 'https://www.geeksforgeeks.org/kth-smallest-largest-element-in-unsorted-array/' },
            { n: 'Top K Frequent Elements', t: 'Heap + Map', d: 'Heaps', l: 'M', u: 'https://www.geeksforgeeks.org/find-k-numbers-with-most-occurrences-in-the-given-array/' },
          ],
        },
        {
          name: 'Day 13: Recursion & Backtracking',
          problems: [
            { n: 'Recursion Basics & Call Stack', t: 'Recursion', d: 'Algorithms', l: 'E', u: 'https://www.geeksforgeeks.org/introduction-to-recursion/' },
            { n: 'Generate All Subsets / Power Set', t: 'Backtracking', d: 'Recursion', l: 'M', u: 'https://www.geeksforgeeks.org/power-set/' },
            { n: 'N-Queens / Permutations Backtracking Template', t: 'Backtracking', d: 'Recursion', l: 'H', u: 'https://www.geeksforgeeks.org/n-queen-problem-backtracking-3/' },
          ],
        },
        {
          name: 'Day 14: Trees & Traversals',
          problems: [
            { n: 'Binary Tree Inorder, Preorder, Postorder Traversals', t: 'DFS Traversal', d: 'Trees', l: 'E', u: 'https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/' },
            { n: 'Level Order Traversal (BFS)', t: 'BFS Traversal', d: 'Trees', l: 'M', u: 'https://www.geeksforgeeks.org/level-order-tree-traversal/' },
            { n: 'Lowest Common Ancestor (LCA) in BST/BT', t: 'Tree Query', d: 'Trees', l: 'M', u: 'https://www.geeksforgeeks.org/lowest-common-ancestor-binary-tree-set-1/' },
          ],
        },
        {
          name: 'Day 15: Prefix Sum & Subarrays',
          problems: [
            { n: 'Subarray with 0 Sum Check', t: 'Prefix Sum + Set', d: 'Hashmap', l: 'M', u: 'https://www.geeksforgeeks.org/find-if-there-is-a-subarray-with-0-sum/' },
            { n: 'Count Subarrays with Given Sum', t: 'Prefix Sum + Map', d: 'Hashmap', l: 'M', u: 'https://www.geeksforgeeks.org/number-subarrays-sum-exactly-equal-k/' },
          ],
        },
        {
          name: 'Day 16: 1-D Dynamic Programming',
          problems: [
            { n: 'Climbing Stairs & Fibonacci Memoization', t: '1D DP', d: 'Dynamic Programming', l: 'E', u: 'https://www.geeksforgeeks.org/count-ways-reach-nth-stair/' },
            { n: 'Coin Change Problem (Minimum Coins / Ways)', t: 'Knapsack Variant', d: 'Dynamic Programming', l: 'M', u: 'https://www.geeksforgeeks.org/coin-change-dp-7/' },
          ],
        },
      ],
    },
    {
      id: 307,
      name: '7. Day 17–20: Full-Length Mocks & Speed Drills',
      source: 'PrepInsta & GFG TCS Mocks',
      subs: [
        {
          name: 'Mock Tests & PYQ Trap Review',
          problems: [
            { n: 'PrepInsta TCS NQT Full-Length Mock 1', t: 'Exam Simulation', d: 'Mocks', l: 'M', u: 'https://prepinsta.com/tcs-nqt/mock-test/' },
            { n: 'GeeksforGeeks TCS NQT Practice Sheet & Mock', t: 'Exam Simulation', d: 'Mocks', l: 'M', u: 'https://www.geeksforgeeks.org/tcs-nqt-preparation/' },
            { n: 'Review Aptitude Traps (Reverse %, Equal SP Loss, Alligation Direction)', t: 'Trap Review', d: 'Revision', l: 'E', u: 'https://www.geeksforgeeks.org/aptitude-questions-and-answers/' },
            { n: 'Review Coding Edge Cases (Empty Array, Single Element, Large N)', t: 'Edge Cases', d: 'Revision', l: 'M', u: 'https://www.geeksforgeeks.org/test-cases-in-competitive-programming/' },
          ],
        },
      ],
    },
  ],
};
