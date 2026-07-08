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
  passages?: { text: string; questions: { q: string; options: string[] }[] }[];
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
      'Perfect number: Sum of proper divisors = itself (e.g., 6 = 1+2+3).',
      'Co-prime: HCF = 1. Twin primes: Differ by 2 (e.g., 11,13).',
    ],
    formulas: [
      'HCF × LCM = Product of two numbers (only valid for exactly two numbers)',
      'HCF of fractions = HCF of numerators / LCM of denominators',
      'LCM of fractions = LCM of numerators / HCF of denominators',
      'Divisibility: 2 (even last digit), 3 (sum div by 3), 4 (last 2 digits div by 4), 5 (ends in 0/5), 6 (div by 2 & 3), 7 (double last digit, subtract from rest), 8 (last 3 digits), 9 (sum div by 9), 11 (sum of odd positions − sum of even positions = 0 or mult of 11), 12 (div by 3 & 4), 25 (last 2 digits div by 25).',
    ],
    shortcuts: [
      'For HCF by division method: Divide larger by smaller, then divisor by remainder, repeat until remainder = 0. Last divisor = HCF.',
      'LCM from HCF: LCM = (Product of numbers) / HCF — for two numbers only.',
      'Number of factors of N = a^p × b^q × c^r → Total factors = (p+1)(q+1)(r+1).',
      'Sum of factors of N = a^p × b^q → [(a^(p+1) − 1)/(a−1)] × [(b^(q+1) − 1)/(b−1)].',
      'Trailing zeros in N!: Count powers of 5: ⌊N/5⌋ + ⌊N/25⌋ + ⌊N/125⌋ + ...',
      'Remainder of (a×b) / m = [(a mod m) × (b mod m)] mod m.',
      'Cyclicity of units digits: 2, 3, 7, 8 → cycle 4; 4, 9 → cycle 2; 0, 1, 5, 6 → always same.',
    ],
    practiceQuestions: [
      { q: 'The HCF of two numbers is 11 and their LCM is 7700. If one number is 275, find the other.', options: ['(a) 305', '(b) 308', '(c) 312', '(d) 318'] },
      { q: 'Find the greatest number that will divide 43, 91 and 183 leaving the same remainder in each case.', options: ['(a) 4', '(b) 7', '(c) 9', '(d) 13'] },
      { q: 'Six bells commence tolling together and toll at intervals of 2, 4, 6, 8, 10, 12 seconds respectively. In 30 minutes, how many times do they toll together (excluding the start)?', options: ['(a) 4', '(b) 10', '(c) 15', '(d) 16'] },
      { q: 'What is the least number which, when divided by 12, 15, 20 and 54, leaves a remainder of 8?', options: ['(a) 548', '(b) 540', '(c) 536', '(d) 544'] },
      { q: 'Find the number of zeros at the end of 100!', options: ['(a) 20', '(b) 22', '(c) 24', '(d) 25'] },
      { q: 'What is the unit digit of 7^105?', options: ['(a) 1', '(b) 3', '(c) 7', '(d) 9'] },
      { q: 'The LCM of two numbers is 2310 and their HCF is 30. If one number is 210, find the other.', options: ['(a) 300', '(b) 330', '(c) 360', '(d) 390'] },
      { q: 'What is the greatest number of 4 digits divisible by 15, 25, 40 and 75?', options: ['(a) 9000', '(b) 9400', '(c) 9600', '(d) 9800'] },
      { q: 'How many numbers between 1 and 100 are divisible by 7 but not by 14?', options: ['(a) 7', '(b) 8', '(c) 9', '(d) 10'] },
      { q: 'Find the remainder when 2^51 is divided by 5.', options: ['(a) 1', '(b) 2', '(c) 3', '(d) 4'] },
      { q: 'Find the HCF of (3^3 × 5^2 × 7) and (3^2 × 5^3 × 11).', options: ['(a) 225', '(b) 315', '(c) 45', '(d) 675'] },
      { q: 'What is the least number that should be added to 1056 so that the sum is completely divisible by 23?', options: ['(a) 2', '(b) 3', '(c) 18', '(d) 21'] },
      { q: 'How many 3-digit numbers are divisible by 6?', options: ['(a) 149', '(b) 150', '(c) 151', '(d) 166'] },
      { q: 'N = 2^3 × 3^4 × 5^2. How many factors does N have?', options: ['(a) 24', '(b) 30', '(c) 36', '(d) 60'] },
      { q: 'The product of two co-prime numbers is 117. Their LCM is:', options: ['(a) 117', '(b) 9', '(c) 13', '(d) 39'] },
    ],
    pyqTraps: [
      { title: 'Trap 1 — "Same Remainder" HCF', desc: '"Find the greatest number that divides 1305, 4665 and 6905 leaving the same remainder." Method: HCF of differences → HCF(4665−1305, 6905−4665, 6905−1305) = HCF(3360, 2240, 5600) = 1120. TCS phrasing makes students try HCF of the numbers directly — wrong.' },
      { title: 'Trap 2 — Bells Tolling "Together"', desc: 'Students find LCM but forget to include time 0 or miscalculate how many multiples fit in the time window. Formula: (Total time / LCM) + 1 if start is included, just Total time / LCM if excluding start.' },
      { title: 'Trap 3 — Unit Digit of Large Powers', desc: '"Find the unit digit of 3^100 + 7^98" — Students compute separately but add without checking combined unit digit. 3^100 → mod 4 = 0 → unit digit 1. 7^98 → mod 4 = 2 → unit digit 9. Sum unit digit = 1+9 = 10 → 0.' },
    ],
  },
  {
    id: 'percentages',
    title: 'Percentages',
    category: 'Aptitude',
    refresher: [
      'Percentage = (Part / Whole) × 100.',
      'x% of y = y% of x (very useful shortcut).',
      'If A is x% more than B, then B is [x/(100+x)] × 100% less than A.',
      'If A is x% less than B, then B is [x/(100-x)] × 100% more than A.',
      'Successive percentage changes: If +a% then +b%, net = a + b + ab/100.',
    ],
    formulas: [
      'Fraction Equivalents: 1/2=50%, 1/3=33.33%, 1/4=25%, 1/5=20%, 1/6=16.67%, 1/7=14.28%, 1/8=12.5%, 1/9=11.11%, 1/11=9.09%, 1/12=8.33%.',
    ],
    shortcuts: [
      'For "x% of A = y% of B", you don\'t need to find A or B individually; find ratio A:B = y:x.',
      'If population increases by r% per year, after n years = P(1 + r/100)^n.',
      'Net effect of +a% and -a% = -a²/100% (always a loss).',
      '"What percent of X is Y?" = (Y/X) × 100.',
    ],
    practiceQuestions: [
      { q: 'A student scored 40% in an exam and failed by 16 marks. The passing percentage is 55%. Find the maximum marks.', options: ['(a) 80', '(b) 100', '(c) 120', '(d) 160'] },
      { q: 'If the price of rice increases by 20%, by what percentage must a family reduce consumption to maintain the same expenditure?', options: ['(a) 16.67%', '(b) 20%', '(c) 25%', '(d) 15%'] },
      { q: 'A number is increased by 20% and then decreased by 20%. The net change is:', options: ['(a) 4% decrease', '(b) 4% increase', '(c) No change', '(d) 2% decrease'] },
      { q: 'What percentage of numbers from 1 to 70 have squares ending in 1?', options: ['(a) 1/7', '(b) 14.28%', '(c) 20%', '(d) 21.42%'] },
      { q: 'In an election between two candidates, the winner got 60% of votes and won by 480 votes. Total votes polled?', options: ['(a) 2400', '(b) 2000', '(c) 2200', '(d) 1800'] },
      { q: 'The salary of a worker was first increased by 10% then decreased by 10%. What is the net change?', options: ['(a) 1% increase', '(b) 1% decrease', '(c) No change', '(d) 2% decrease'] },
      { q: '45% of 750 + 35% of 820 = ? % of 3750', options: ['(a) 15.82%', '(b) 16.74%', '(c) 17.44%', '(d) 18.52%'] },
      { q: 'A person\'s income is 20% more than his friend\'s income. By what percent is the friend\'s income less than the person\'s?', options: ['(a) 20%', '(b) 16.67%', '(c) 25%', '(d) 18%'] },
      { q: 'If 15% of A = 20% of B, find A:B.', options: ['(a) 3:4', '(b) 4:3', '(c) 5:4', '(d) 4:5'] },
      { q: 'A town\'s population increased by 5% in 2021 and decreased by 5% in 2022. If initial population was 10,000, what is the population after 2022?', options: ['(a) 10,000', '(b) 9,975', '(c) 9,950', '(d) 10,025'] },
      { q: 'In a class, 70% students passed in English, 80% in Maths, and 10% failed in both subjects. What % passed in both?', options: ['(a) 56%', '(b) 60%', '(c) 62%', '(d) 65%'] },
      { q: '35% of a number is 175. What is 60% of that number?', options: ['(a) 280', '(b) 290', '(c) 300', '(d) 310'] },
      { q: 'A trader marks his goods 40% above CP and gives a 20% discount. His gain%?', options: ['(a) 8%', '(b) 10%', '(c) 12%', '(d) 15%'] },
      { q: 'If A = 80% of B and B = 75% of C, then A:C?', options: ['(a) 3:5', '(b) 4:5', '(c) 3:4', '(d) 2:3'] },
      { q: '8% of voters pledged before the poll to vote for candidate A and 16% of those cancelled their pledge. If total voters = 8000, how many votes did A get?', options: ['(a) 537', '(b) 537.6', '(c) 538', '(d) 640'] },
    ],
    pyqTraps: [
      { title: 'Trap 1 — Reverse Percentage', desc: '"A is 20% more than B" — students write A = 1.2B correctly but then compute "B is 20% less than A" which is wrong. Correct: B is less than A by 20/120 × 100 = 16.67%.' },
      { title: 'Trap 2 — Pass/Fail with Two Conditions', desc: '"Student gets 40%, fails by 16 marks. Passing marks = 55%. Find max marks." 0.55M − 0.40M = 16 → 0.15M = 16 → M = 106.67 (TCS sometimes uses non-round numbers — don\'t assume it must be round).' },
      { title: 'Trap 3 — Successive Discounts vs Single Discount', desc: '"Two successive discounts of 20% and 30%" ≠ 50% discount. Net discount = 20 + 30 − (20×30/100) = 44%. TCS uses this exact pattern.' },
    ],
  },
  {
    id: 'profit-loss',
    title: 'Profit & Loss',
    category: 'Aptitude',
    refresher: [
      'Profit = SP − CP; Loss = CP − SP; Profit% = (Profit/CP) × 100.',
      'SP = CP × (100 + Profit%) / 100; CP = SP × 100 / (100 + Profit%).',
      'Marked Price (MP) → Discount on MP → SP: SP = MP × (100 − Discount%) / 100.',
      'Profit when cost includes overhead: CP = Manufacturing cost + overhead.',
    ],
    formulas: [
      'If selling two items at same SP — one at x% profit, one at x% loss → always a loss of x²/100 %.',
      'Dishonest dealer using false weights: Gain% = (Error / True value − Error) × 100.',
      'If CP of x articles = SP of y articles: Profit% = (x−y)/y × 100.',
    ],
    shortcuts: [
      'To find CP when SP and profit% are given: CP = SP × 100 / (100 + P%).',
      'Marked price when discount and SP given: MP = SP × 100 / (100 − D%).',
      'For false weight shortcut: Gain% = [(True weight − False weight) / False weight] × 100.',
      'Net profit with successive discounts d1, d2: SP = MP × (1 − d1/100)(1 − d2/100).',
    ],
    practiceQuestions: [
      { q: 'A man buys a cycle for ₹1400 and sells it at a loss of 15%. What is the selling price?', options: ['(a) ₹1090', '(b) ₹1160', '(c) ₹1190', '(d) ₹1202'] },
      { q: 'If a trader sells goods at cost price using a false weight of 900g instead of 1 kg, his gain% is:', options: ['(a) 10%', '(b) 11.11%', '(c) 9.09%', '(d) 12.5%'] },
      { q: 'A shopkeeper sells two TVs at ₹9900 each. On one he gains 10% and on the other he loses 10%. What is his overall profit/loss?', options: ['(a) Neither', '(b) 1% loss', '(c) 1% profit', '(d) 2% loss'] },
      { q: 'By selling 45 lemons for ₹40, a man loses 20%. How many lemons should he sell for ₹24 to gain 20%?', options: ['(a) 16', '(b) 18', '(c) 20', '(d) 22'] },
      { q: 'A retailer marks goods 30% above CP and allows a 15% discount. His profit%?', options: ['(a) 10.5%', '(b) 11%', '(c) 12%', '(d) 15%'] },
      { q: 'An article is sold at ₹100 at a profit of 25%. What is the CP?', options: ['(a) ₹75', '(b) ₹80', '(c) ₹85', '(d) ₹90'] },
      { q: 'A man sold two houses for ₹7.8 lakh each, gaining 5% on the first and losing 5% on the second. Net result:', options: ['(a) No profit no loss', '(b) ₹2000 loss', '(c) ₹4000 loss', '(d) ₹2000 profit'] },
      { q: 'If the CP of 12 items equals SP of 8 items, profit% is:', options: ['(a) 33.33%', '(b) 50%', '(c) 25%', '(d) 40%'] },
      { q: 'After two successive discounts of 20% and 15%, a customer pays ₹680 for an article. Find the MP.', options: ['(a) ₹900', '(b) ₹950', '(c) ₹1000', '(d) ₹1100'] },
      { q: 'A trader purchases 80 kg at ₹5/kg and 120 kg at ₹4.50/kg. He mixes them and sells at ₹5.50/kg. Find gain%?', options: ['(a) 10%', '(b) 12%', '(c) 11.11%', '(d) 9%'] },
      { q: 'A person buys 8 articles for ₹5 and sells 5 articles for ₹8. Gain or loss%?', options: ['(a) 28% loss', '(b) 28% gain', '(c) 56% gain', '(d) 25% gain'] },
      { q: 'A dealer purchases 10 pens for ₹9 and sells 9 pens for ₹10. Profit%?', options: ['(a) 23.45%', '(b) 11.11%', '(c) 23.4%', '(d) 25%'] },
      { q: 'If selling price is doubled, the profit triples. Find the original profit%?', options: ['(a) 66.67%', '(b) 100%', '(c) 50%', '(d) 75%'] },
      { q: 'A dishonest trader claims to sell at cost price but uses 800g weight for 1 kg. Profit%?', options: ['(a) 20%', '(b) 25%', '(c) 22.5%', '(d) 18%'] },
      { q: 'A man gains 30% by selling an article at ₹910. At what price should he sell to gain 40%?', options: ['(a) ₹980', '(b) ₹940', '(c) ₹960', '(d) ₹970'] },
    ],
    pyqTraps: [
      { title: 'Trap 1 — Equal SP, Different Profit/Loss', desc: 'Two items at same SP — one at x% profit, one at x% loss = ALWAYS a net loss of x²/100%. TCS asks this expecting students to say "no net change."' },
      { title: 'Trap 2 — CP of x articles = SP of y articles', desc: 'Profit% = (x−y)/y × 100, NOT (x−y)/x × 100. Students mix up denominator.' },
      { title: 'Trap 3 — False Weight (selling at CP)', desc: 'Gain% = (True − False) / False × 100, NOT (True − False) / True × 100. For 900g sold as 1000g: gain = 100/900 × 100 = 11.11%, not 10%.' },
    ],
  },
  {
    id: 'time-work',
    title: 'Time & Work',
    category: 'Aptitude',
    refresher: [
      'If A can do work in n days → A\'s 1-day work = 1/n.',
      'A and B together: 1-day work = 1/a + 1/b; Days = ab/(a+b).',
      'If A is x times as efficient as B → A takes work in 1/x time of B.',
      'Work done = Rate × Time.',
      'Pipes: Inlet fills (+), Outlet empties (-). Net rate = Sum of inlets − Sum of outlets.',
    ],
    formulas: [
      'Mandays Concept: Work = Men × Days.',
      'If M1 men do W1 work in D1 days at H1 hours/day, and M2 men do W2 work in D2 days at H2 hours/day: M1 × D1 × H1 / W1 = M2 × D2 × H2 / W2.',
    ],
    shortcuts: [
      'A does work in \'a\' days, B in \'b\' days, together = ab/(a+b).',
      'A, B, C together: = 1/(1/a + 1/b + 1/c).',
      'If A and B together do work in T days, A alone in \'a\' days → B alone = aT/(a−T) days.',
      'Alternate-day work: If A works on odd days, B on even days — find LCM of their individual days to determine cycle.',
      'Efficiency ratio: If A:B efficiency = m:n, then time ratio = n:m.',
    ],
    practiceQuestions: [
      { q: 'A can do a piece of work in 10 days, B can do it in 15 days. In how many days can both together do it?', options: ['(a) 5 days', '(b) 6 days', '(c) 8 days', '(d) 12 days'] },
      { q: 'A is twice as efficient as B. Together they complete work in 14 days. How long does B alone take?', options: ['(a) 21 days', '(b) 42 days', '(c) 28 days', '(d) 35 days'] },
      { q: 'A and B together can complete work in 12 days. B and C together in 15 days. C and A together in 20 days. In how many days can all three together complete the work?', options: ['(a) 10 days', '(b) 12 days', '(c) 15 days', '(d) 8 days'] },
      { q: 'Pipe A fills a tank in 10 hours, Pipe B in 15 hours, Pipe C empties it in 20 hours. If all three are opened simultaneously, in how many hours will the tank be full?', options: ['(a) 12', '(b) 10', '(c) 8', '(d) 6'] },
      { q: '10 men can complete a work in 7 days. How many men are needed to complete it in 5 days?', options: ['(a) 12', '(b) 14', '(c) 16', '(d) 18'] },
      { q: 'A can do a work in 20 days. After working for 5 days, B joins. Both together finish the remaining work in 3 days. How many days would B alone take?', options: ['(a) 4 days', '(b) 10 days', '(c) 12 days', '(d) 8 days'] },
      { q: 'A can finish a work in 18 days. B is 50% more efficient than A. In how many days will B finish it alone?', options: ['(a) 9 days', '(b) 12 days', '(c) 10 days', '(d) 15 days'] },
      { q: '30 workers complete a project in 20 days working 8 hrs/day. How many workers needed to complete same project in 12 days working 10 hrs/day?', options: ['(a) 35', '(b) 36', '(c) 40', '(d) 45'] },
      { q: 'Inlet A fills tank in 4 hrs, Inlet B in 6 hrs. Outlet C empties full tank in 12 hrs. If all three open together when tank is half full, in how many hours will the tank be full?', options: ['(a) 1.5 hrs', '(b) 2 hrs', '(c) 2.5 hrs', '(d) 3 hrs'] },
      { q: 'A and B can do a work in 8 days. B and C in 12 days. A, B, and C together in 6 days. How long does A alone take?', options: ['(a) 24 days', '(b) 20 days', '(c) 16 days', '(d) 12 days'] },
      { q: '16 men can complete a work in 12 days. 12 men started working. After 4 days, how many additional men are needed to complete the remaining work on time?', options: ['(a) 4', '(b) 6', '(c) 8', '(d) 10'] },
      { q: 'A can do 1/3 of a work in 5 days. B can do 2/5 of the same work in 6 days. Together, how many days to complete the work?', options: ['(a) 7 days', '(b) 8.5 days', '(c) 9 days', '(d) 9.375 days'] },
      { q: 'A and B working together finish a job in 12 days. If A works alone for 8 days and leaves, B finishes it in 20 days. How long does A alone take?', options: ['(a) 24 days', '(b) 30 days', '(c) 32 days', '(d) 36 days'] },
      { q: 'A takes 6 days more than B to do a work. Together they finish in 4 days. How long does A alone take?', options: ['(a) 6 days', '(b) 12 days', '(c) 9 days', '(d) 10 days'] },
      { q: 'A is 30% more efficient than B. A starts the work and works for 10 days, then leaves. B finishes remaining work in 14 days. Total work takes how many days?', options: ['(a) 20 days', '(b) 22 days', '(c) 24 days', '(d) 25 days'] },
    ],
    pyqTraps: [
      { title: 'Trap 1 — "Together in T days, A alone in a days, find B alone"', desc: 'Students use T + a instead of formula: B = aT/(a−T). Remember denominator is a − T, not a + T.' },
      { title: 'Trap 2 — Efficiency vs Time', desc: '"B is 50% more efficient than A who takes 18 days." More efficient = less time. B takes 18 × (2/3) = 12 days. Students often add 50% to 18 days instead.' },
      { title: 'Trap 3 — Men-Days-Hours', desc: '"If 30 men in 20 days at 8 hrs = 12 days at 10 hrs, find men needed." More days needed → fewer men, more hours/day → fewer men. Apply: 30×20×8 = M×12×10 → M = 40. TCS will put a twist in the question like "5 days off" mid-project.' },
    ],
  },
  {
    id: 'speed-distance',
    title: 'Speed, Time & Distance',
    category: 'Aptitude',
    refresher: [
      'Speed = Distance / Time; Distance = Speed × Time; Time = Distance / Speed.',
      'Average speed (equal distances): 2xy/(x+y) where x and y are speeds.',
      'Relative speed (same direction): |v1 − v2|; Opposite direction: v1 + v2.',
      'Conversions: km/h to m/s: multiply by 5/18; m/s to km/h: multiply by 18/5.',
    ],
    formulas: [
      'Train crossing pole/person: Time = Length of train / Speed.',
      'Train crossing platform/bridge: Time = (Length of train + Length of platform) / Speed.',
      'Two trains crossing each other: Time = (L1 + L2) / Relative Speed.',
      'Boat & Stream: Downstream speed = u + v; Upstream speed = u − v. Boat speed = (Downstream + Upstream) / 2; Stream speed = (Downstream − Upstream) / 2.',
    ],
    shortcuts: [
      'If A reaches destination T1 minutes late at speed S1 and T2 minutes early at S2: Distance = S1×S2×(T1+T2) / (S2−S1).',
      'If same journey done at S1 and S2 — average = 2S1S2/(S1+S2) only if equal distances.',
      'For a person walking at 3/4 of usual speed, time = 4/3 of usual time (T2/T1 = S1/S2).',
    ],
    practiceQuestions: [
      { q: 'A train 150m long passes a pole in 15 seconds. How long to pass a 250m platform?', options: ['(a) 30 sec', '(b) 35 sec', '(c) 40 sec', '(d) 45 sec'] },
      { q: 'A man covers a distance in 2 hours at 12 km/h. How long at 16 km/h?', options: ['(a) 1.5 hrs', '(b) 1.25 hrs', '(c) 1.75 hrs', '(d) 2 hrs'] },
      { q: 'Two trains running in opposite directions cross each other in 12 seconds. Their speeds are 50 km/h and 58 km/h. Find the sum of their lengths.', options: ['(a) 356m', '(b) 362m', '(c) 360m', '(d) 368m'] },
      { q: 'A boat goes 12 km upstream in 4 hours and 18 km downstream in 3 hours. Find the speed of stream.', options: ['(a) 1 km/h', '(b) 1.5 km/h', '(c) 2 km/h', '(d) 2.5 km/h'] },
      { q: 'A person walks at 4 km/h and reaches office 5 minutes late. At 5 km/h, reaches 10 minutes early. Find the distance.', options: ['(a) 4 km', '(b) 5 km', '(c) 6 km', '(d) 8 km'] },
      { q: 'A cyclist covers a distance at 12 km/h but returns the same distance at 16 km/h. What is the average speed?', options: ['(a) 13.71 km/h', '(b) 14 km/h', '(c) 14.5 km/h', '(d) 13.5 km/h'] },
      { q: 'Two trains 200m and 150m long are moving in opposite directions at 50 m/s and 30 m/s. Time to cross each other?', options: ['(a) 3.5 sec', '(b) 4.37 sec', '(c) 5 sec', '(d) 4 sec'] },
      { q: 'A man walks at 5/6th of his usual speed. He reaches office 30 minutes late. Find his usual time.', options: ['(a) 120 min', '(b) 150 min', '(c) 160 min', '(d) 100 min'] },
      { q: 'Train A starts from city X at 6 AM at 60 km/h. Train B from city Y at 8 AM at 80 km/h toward A. Distance XY = 600 km. At what time do they meet?', options: ['(a) 10:00 AM', '(b) 11:00 AM', '(c) 10:30 AM', '(d) 11:30 AM'] },
      { q: 'A car travels first 160 km in 4 hours, next 160 km in 5 hours. What is the average speed?', options: ['(a) 35.5 km/h', '(b) 32 km/h', '(c) 36 km/h', '(d) 40 km/h'] },
      { q: 'A thief is spotted by a policeman from 200m away. Thief runs at 10 km/h, policeman at 12 km/h. After 5 minutes, how far from the spot is the thief caught?', options: ['(a) 700m', '(b) 750m', '(c) 800m', '(d) 850m'] },
      { q: 'A boat\'s speed in still water is 8 km/h. Speed of stream is 2 km/h. Time to go 36 km upstream and return?', options: ['(a) 9 hrs', '(b) 9.6 hrs', '(c) 10 hrs', '(d) 8.5 hrs'] },
      { q: 'Two persons A and B start simultaneously from two stations 300 km apart toward each other at 60 and 40 km/h respectively. When do they meet and how far from A?', options: ['(a) 3 hrs, 180 km', '(b) 2.5 hrs, 150 km', '(c) 3 hrs, 200 km', '(d) 2 hrs, 140 km'] },
      { q: 'A train passes a man standing on a platform in 8 sec and passes the platform (280m long) in 36 sec. Speed of train?', options: ['(a) 10 m/s', '(b) 12 m/s', '(c) 15 m/s', '(d) 16 m/s'] },
      { q: 'A man can row upstream at 7 km/h and downstream at 10 km/h. He rows from X to Y and back in 9 hrs. Find XY distance.', options: ['(a) 35 km', '(b) 30 km', '(c) 40 km', '(d) 45 km'] },
    ],
    pyqTraps: [
      { title: 'Trap 1 — Average Speed (Unequal Distances)', desc: 'Average = Total distance / Total time. The formula 2xy/(x+y) ONLY applies when both distances are equal. TCS deliberately uses unequal distances.' },
      { title: 'Trap 2 — Late/Early with Different Speeds', desc: 'Usual time = (S2×T1 + S1×T2)/(S2−S1), where T1 = minutes late, T2 = minutes early. Students mix sign conventions.' },
      { title: 'Trap 3 — Relative Speed Direction Confusion', desc: '"Train A at 60 km/h, B at 40 km/h, same direction. When does B overtake A?" Students use sum (100) instead of difference (20) for same direction. Common exam trap.' },
    ],
  },
  {
    id: 'averages',
    title: 'Averages',
    category: 'Aptitude',
    refresher: [
      'Average = Sum of values / Number of values.',
      'Sum = Average × Number of values.',
      'If a number is added/removed: New average = (Old sum ± new value) / New count.',
      'Average of n consecutive integers starting at a: a + (n-1)/2.',
      'Average of first n natural numbers: (n+1)/2.',
      'Average of first n odd numbers: n; Average of first n even numbers: n+1.',
    ],
    formulas: [
      'Weighted average = (n1×a1 + n2×a2) / (n1 + n2).',
    ],
    shortcuts: [
      'If average of a set increases by d when a new member is added: New member = Old average + (n+1)×d.',
      'If a wrong value was used: Correct sum = Wrong sum − Wrong value + Correct value.',
    ],
    practiceQuestions: [
      { q: 'Average of 5 numbers is 27. If one number is excluded, average becomes 25. Find the excluded number.', options: ['(a) 35', '(b) 37', '(c) 38', '(d) 40'] },
      { q: 'Average age of 8 members of a family is 40 years. If the youngest member is 10 years old, what was the average age at the time of birth of the youngest member?', options: ['(a) 32', '(b) 30', '(c) 34', '(d) 36'] },
      { q: 'The average of 20 numbers is 0. Of them, at most how many may be greater than 0?', options: ['(a) 1', '(b) 10', '(c) 19', '(d) 20'] },
      { q: 'Batting average of 40 innings is 50. Minimum score needed in 41st inning to raise average to 51?', options: ['(a) 91', '(b) 92', '(c) 93', '(d) 94'] },
      { q: 'Average marks of a class is 72. Boys\' average is 75, girls\' average is 70. If total students = 50, how many boys?', options: ['(a) 20', '(b) 25', '(c) 30', '(d) 35'] },
      { q: 'Average of 11 numbers is 36. If 3 numbers with average 45 are removed, what is the average of remaining 8?', options: ['(a) 32.6', '(b) 32.25', '(c) 30.75', '(d) 33'] },
      { q: 'A batsman scored 96 runs in his 12th innings, thereby increasing his average by 5. Find his average after 12 innings.', options: ['(a) 41', '(b) 42', '(c) 46', '(d) 51'] },
      { q: 'Average of 30 students is 14. Average of first 20 is 16 and last 10 is ?', options: ['(a) 10', '(b) 11', '(c) 12', '(d) 13'] },
      { q: 'Average salary of 60 employees is ₹6000. Managers\' average is ₹10,000 and workers\' is ₹5,500. How many managers?', options: ['(a) 5', '(b) 6', '(c) 8', '(d) 10'] },
      { q: 'Mean of 25 observations is 36. It was later found that two observations 42 and 56 were wrongly recorded as 24 and 65 respectively. Find the correct mean.', options: ['(a) 35.64', '(b) 36.44', '(c) 37.56', '(d) 36.24'] },
    ],
    pyqTraps: [
      { title: 'Trap 1 — Age at Birth of Youngest', desc: '"Average age 8 years ago = Current average − 8 years" — students subtract only the youngest\'s age, forgetting that everyone was 8 years younger, so the average was simply 8 less than current... but also the youngest wasn\'t born, so the denominator changes from 8 to 7.' },
      { title: 'Trap 2 — Wrong Entry Correction', desc: 'Many students compute (Correct − Wrong) without applying it properly to the full sum. Always: Correct Mean = (Old Sum − Wrong + Correct) / N.' },
      { title: 'Trap 3 — Batting Average Trap', desc: '"Average after 12 innings if 12th innings = 96 raised average by 5." Average after 12 = Average after 11 + 5. Use: 96 = 12×(A+5) − 11×A → A = 96 − 55 − 5 = 36, final = 41. Students get confused with whether to add or subtract.' },
    ],
  },
  {
    id: 'si-ci',
    title: 'Simple Interest & Compound Interest',
    category: 'Aptitude',
    refresher: [
      'SI = PRT/100; Amount = P + SI = P(1 + RT/100); P = 100×SI / (R×T).',
      'CI: A = P(1 + R/100)^n; CI = A − P.',
      'Half-yearly: A = P(1 + R/200)^(2n); Quarterly: A = P(1 + R/400)^(4n).',
    ],
    formulas: [
      'For 2 years: CI − SI = P(R/100)²',
      'For 3 years: CI − SI = P(R/100)²(3 + R/100)',
    ],
    shortcuts: [
      'Rule of 72: Time to double = 72/R (approximate).',
      'If SI on P for 2 years = X, then CI for same P and R for 2 years = X + X²/(4P).',
      'If amount becomes k times in n years at SI, it becomes mk times in mn years.',
    ],
    practiceQuestions: [
      { q: 'A sum of money doubles itself at SI in 10 years. Rate of interest?', options: ['(a) 10%', '(b) 20%', '(c) 15%', '(d) 12%'] },
      { q: 'What is the CI on ₹8000 at 10% per annum for 2 years?', options: ['(a) ₹1600', '(b) ₹1680', '(c) ₹1700', '(d) ₹1640'] },
      { q: 'The difference between SI and CI for 2 years at 10% per annum on a sum is ₹400. Find the sum.', options: ['(a) ₹30,000', '(b) ₹40,000', '(c) ₹50,000', '(d) ₹60,000'] },
      { q: 'In what time will ₹800 amount to ₹882 at 5% CI per annum?', options: ['(a) 1 year', '(b) 2 years', '(c) 3 years', '(d) 4 years'] },
      { q: 'A sum of ₹5000 is borrowed at 4% SI. Total interest after 3 years?', options: ['(a) ₹600', '(b) ₹700', '(c) ₹800', '(d) ₹900'] },
      { q: 'At what rate % CI does a sum of money become 4 times in 2 years?', options: ['(a) 80%', '(b) 100%', '(c) 75%', '(d) 60%'] },
      { q: 'If difference between CI and SI for 3 years at 10% is ₹620, find the principal.', options: ['(a) ₹16,000', '(b) ₹18,000', '(c) ₹20,000', '(d) ₹15,000'] },
      { q: '₹12,000 was invested at 12% per annum CI half-yearly for 1 year. Find amount.', options: ['(a) ₹13,483.2', '(b) ₹13,440', '(c) ₹13,680', '(d) ₹13,200'] },
      { q: 'A sum at SI triples in 8 years. In how many years will it become 5 times?', options: ['(a) 14 years', '(b) 16 years', '(c) 18 years', '(d) 20 years'] },
      { q: 'The CI on a sum for 2 years at 8% per annum is ₹664. Find the SI for the same period.', options: ['(a) ₹620', '(b) ₹640', '(c) ₹650', '(d) ₹630'] },
      { q: 'A person invests ₹5000 at 6% SI and ₹3000 at 5% SI. Total interest in 2 years?', options: ['(a) ₹900', '(b) ₹960', '(c) ₹1000', '(d) ₹840'] },
      { q: 'If the rate of interest is 10% per annum, what is the difference between CI and SI on ₹2000 for 2 years?', options: ['(a) ₹10', '(b) ₹20', '(c) ₹30', '(d) ₹40'] },
    ],
    pyqTraps: [
      { title: 'Trap 1 — Half-Yearly vs Annual CI', desc: '"12% per annum compounded half-yearly" = 6% per half year, double the periods. Students use 12% and 1 year directly.' },
      { title: 'Trap 2 — Triples vs Doubles in SI', desc: '"Triples in 8 years at SI → when does it become 5 times?" At SI, interest = 2P in 8 years → rate = 25%. For 5 times: interest needed = 4P = 4P/2P × 8 = 16 years. Shortcut: (multiple−1)/(original multiple−1) × time = (5−1)/(3−1) × 8 = 16.' },
      { title: 'Trap 3 — Finding P from CI−SI Difference', desc: 'Students use CI−SI = PR²/100² (wrong), correct formula for 2 years: P(R/100)². For ₹400 difference at 10%: P = 400/(10/100)² = 400/0.01 = ₹40,000.' },
    ],
  },
  {
    id: 'ratio-prop',
    title: 'Ratio & Proportion',
    category: 'Aptitude',
    refresher: [
      'Ratio a:b = a/b; a:b = c:d → ad = bc (cross multiply).',
      'If a:b = m:n and b:c = p:q, then a:b:c = mp : np : nq.',
      'Compounded ratio of a:b and c:d = ac:bd; Duplicate ratio = a²:b²; Sub-duplicate = √a:√b.',
      'Proportion: a:b :: c:d → ad = bc (product of means = product of extremes).',
      'Mean proportion of a and b = √(ab); Third proportion to a and b: x = b²/a; Fourth proportion: a:b = c:x → x = bc/a.',
    ],
    formulas: [
      'Mixing ratios: a/b and c/d mixed in ratio m:n → Result = (ma + nc)/(mb + nd) for each component.',
    ],
    shortcuts: [
      'If two quantities in ratio a:b, and total = T: First = aT/(a+b), Second = bT/(a+b).',
      'If ratio changes when amount added: Set up equation with x.',
    ],
    practiceQuestions: [
      { q: 'Salaries of A and B are in ratio 2:3. If both get increase of ₹4000, new ratio becomes 40:57. Original salaries?', options: ['(a) ₹17k, ₹25.5k', '(b) ₹16k, ₹24k', '(c) ₹18k, ₹27k', '(d) ₹20k, ₹30k'] },
      { q: 'A bag contains coins of 25p, 50p, and ₹1 in ratio 5:3:2. Total value = ₹70. Number of 50p coins?', options: ['(a) 30', '(b) 40', '(c) 60', '(d) 80'] },
      { q: 'What must be added to each term of 5:3 to make it equal to 3:2?', options: ['(a) 1', '(b) 2', '(c) 3', '(d) 4'] },
      { q: 'Find the fourth proportional to 4, 9, 12.', options: ['(a) 24', '(b) 27', '(c) 30', '(d) 36'] },
      { q: 'Rs 3000 is divided among A, B, C in ratio 3:4:5. How much more does C get than A?', options: ['(a) ₹500', '(b) ₹600', '(c) ₹700', '(d) ₹750'] },
      { q: 'The ratio of boys to girls in a class is 4:5. If 10 girls leave and 10 boys join, ratio becomes 2:1. Find total original students.', options: ['(a) 54', '(b) 60', '(c) 63', '(d) 72'] },
      { q: 'Mean proportion between 0.36 and 0.04?', options: ['(a) 0.12', '(b) 0.02', '(c) 0.14', '(d) 0.20'] },
      { q: 'If a:b = 3:4 and b:c = 5:6, find a:b:c.', options: ['(a) 15:20:24', '(b) 3:4:6', '(c) 5:6:8', '(d) 9:12:16'] },
      { q: 'Two numbers are in ratio 3:5. Their LCM is 60. Find their HCF.', options: ['(a) 4', '(b) 6', '(c) 8', '(d) 10'] },
      { q: 'Two numbers are in ratio 2:3. Sum of their squares is 117. Find the larger number.', options: ['(a) 6', '(b) 9', '(c) 12', '(d) 15'] },
    ],
    pyqTraps: [
      { title: 'Trap 1 — Adding Same Quantity', desc: '"Ratio 5:3. Same x added. New ratio 3:2. Find x." → (5+x)/(3+x) = 3/2 → 10+2x = 9+3x → x = 1. TCS also asks subtracting the same quantity.' },
      { title: 'Trap 2 — Ratio Involving LCM', desc: 'Given ratio a:b, LCM = L → Numbers are ka and kb where (ka)(kb)/HCF(ka,kb) = L. Since HCF = k (when a,b are coprime), LCM = kab. So k = L/(ab). Students forget to check if a and b are coprime first.' },
      { title: 'Trap 3 — Multi-Step Ratio Combination', desc: '"A:B = 3:4, B:C = 5:6 → A:B:C" — Students write A:B:C = 3:4:6 forgetting to equalize B. Correct: multiply first by 5, second by 4 → A:B:C = 15:20:24.' },
    ],
  },
  {
    id: 'perm-comb',
    title: 'Permutations & Combinations',
    category: 'Aptitude',
    refresher: [
      'nPr = n! / (n-r)! (Arrangement — order matters).',
      'nCr = n! / [r!(n-r)!] (Selection — order doesn\'t matter); nCr = nC(n-r).',
      'nCr + nC(r-1) = (n+1)Cr.',
      'Circular arrangement of n distinct items: (n-1)!; Necklace (flip counted same): (n-1)! / 2.',
    ],
    formulas: [
      'Arrangements with repetitions: If word has n letters with a, b, c repeated: n! / (a! b! c!).',
      'Number of diagonals in n-sided polygon: nC2 − n = n(n-3)/2.',
    ],
    shortcuts: [
      'At least one = Total − None.',
      'Distribute n identical items into r groups: C(n+r-1, r-1).',
      'Addition rule: OR → add; Multiplication rule: AND → multiply.',
    ],
    practiceQuestions: [
      { q: 'How many 3-digit numbers can be formed using digits 1-5 without repetition?', options: ['(a) 60', '(b) 80', '(c) 100', '(d) 120'] },
      { q: 'In how many ways can 6 people be seated in a circular table?', options: ['(a) 24', '(b) 60', '(c) 120', '(d) 720'] },
      { q: 'How many ways can the word LEADER be arranged?', options: ['(a) 360', '(b) 720', '(c) 480', '(d) 540'] },
      { q: 'How many ways can a team of 3 be selected from 8 men and 5 women with at least 1 woman?', options: ['(a) 210', '(b) 220', '(c) 205', '(d) 230'] },
      { q: 'How many words can be formed from MATHEMATICS using all letters?', options: ['(a) 4989600', '(b) 4545600', '(c) 5040000', '(d) 3628800'] },
      { q: 'How many 4-digit numbers can be formed from digits 0–9 with no digit repeated where first digit is not 0?', options: ['(a) 4536', '(b) 4823', '(c) 5040', '(d) 4032'] },
      { q: 'From 7 consonants and 4 vowels, how many words of 3 consonants and 2 vowels can be formed?', options: ['(a) 25200', '(b) 24500', '(c) 23600', '(d) 26000'] },
      { q: 'Number of diagonals in a decagon (10-sided polygon)?', options: ['(a) 35', '(b) 40', '(c) 45', '(d) 50'] },
      { q: 'In how many ways can 5 books be arranged on a shelf if 2 particular books must always be together?', options: ['(a) 24', '(b) 48', '(c) 96', '(d) 120'] },
      { q: 'A committee of 5 is to be chosen from 6 men and 4 women. In how many ways such that exactly 2 women are included?', options: ['(a) 60', '(b) 90', '(c) 120', '(d) 126'] },
      { q: 'How many 3-digit even numbers can be formed using digits 1, 2, 3, 4, 5 without repetition?', options: ['(a) 24', '(b) 36', '(c) 48', '(d) 20'] },
      { q: 'How many arrangements of MISSISSIPPI are there?', options: ['(a) 34650', '(b) 69300', '(c) 138600', '(d) 27720'] },
      { q: 'In how many ways can 4 red, 3 green, 2 blue balls be arranged in a row (identical within color)?', options: ['(a) 1260', '(b) 2520', '(c) 5040', '(d) 840'] },
      { q: 'A polygon has 35 diagonals. How many sides?', options: ['(a) 8', '(b) 9', '(c) 10', '(d) 12'] },
      { q: 'How many 4-letter words (with or without meaning) can be formed from the letters of LOGARITHMS?', options: ['(a) 40', '(b) 400', '(c) 5040', '(d) 2520'] },
    ],
    pyqTraps: [
      { title: 'Trap 1 — "At Least One" Problems', desc: 'Students calculate directly. Shortcut: At least 1 = Total ways − Ways with none selected. Much faster.' },
      { title: 'Trap 2 — Circular Permutation with Identical Items', desc: '"In how many ways can 5 people sit around a table if 2 are identical?" → (5−1)! / 2! = 12. Students use either 4! = 24 or forget the circular adjustment.' },
      { title: 'Trap 3 — Digits with Zero', desc: 'For 4-digit numbers using 0−9 without repetition: First digit = 9 choices (1−9), remaining = 9×8×7. Total = 9 × 9 × 8 × 7 = 4536. Students include 0 in first position giving 10×9×8×7 = 5040 (wrong).' },
    ],
  },
  {
    id: 'probability',
    title: 'Probability',
    category: 'Aptitude',
    refresher: [
      'P(A) = Favorable outcomes / Total outcomes; P(A\') = 1 − P(A) (complement).',
      'P(A∪B) = P(A) + P(B) − P(A∩B); P(A∩B) = P(A) × P(B) (if independent).',
      'P(A|B) = P(A∩B) / P(B) (conditional).',
      'Dice: Total outcomes = 6^n for n dice; Coins: Total outcomes = 2^n.',
      'Cards: Total = 52; 4 suits × 13 cards; Face cards = 12 (Jack, Queen, King × 4 suits).',
    ],
    formulas: [
      'For mutually exclusive events: P(A or B) = P(A) + P(B).',
      'Odds in favor of A = P(A) : P(A\') = favorable : unfavorable.',
    ],
    shortcuts: [
      'P(at least 1) = 1 − P(none).',
    ],
    practiceQuestions: [
      { q: 'Two dice are thrown. Probability of getting sum = 7?', options: ['(a) 1/6', '(b) 5/36', '(c) 7/36', '(d) 1/4'] },
      { q: 'A bag has 6 red and 4 blue balls. Two drawn at random. Probability both are red?', options: ['(a) 1/3', '(b) 1/5', '(c) 2/5', '(d) 1/6'] },
      { q: 'A card is drawn from a deck of 52. Probability of getting a face card?', options: ['(a) 3/13', '(b) 1/13', '(c) 4/13', '(d) 1/4'] },
      { q: 'Three coins are tossed. Probability of at least 2 heads?', options: ['(a) 1/2', '(b) 3/8', '(c) 5/8', '(d) 1/4'] },
      { q: 'P(A) = 1/2, P(B) = 1/3, A and B independent. P(A∩B)?', options: ['(a) 5/6', '(b) 1/6', '(c) 1/4', '(d) 2/3'] },
      { q: 'Probability that a number selected from 1 to 25 is prime?', options: ['(a) 9/25', '(b) 8/25', '(c) 1/5', '(d) 2/5'] },
      { q: 'A bag has 5 white and 4 black balls. 3 balls drawn. Probability all 3 are white?', options: ['(a) 5/42', '(b) 5/21', '(c) 10/63', '(d) 1/9'] },
      { q: 'Two cards are drawn from 52. Probability both are kings?', options: ['(a) 1/52', '(b) 1/221', '(c) 2/221', '(d) 1/169'] },
      { q: 'P(A) = 0.3, P(B) = 0.4, P(A∪B) = 0.6. Find P(A∩B).', options: ['(a) 0.1', '(b) 0.12', '(c) 0.15', '(d) 0.2'] },
      { q: 'Letters of PROBABILITY chosen at random. Probability of selecting a vowel?', options: ['(a) 1/3', '(b) 4/11', '(c) 3/11', '(d) 5/11'] },
      { q: 'From a pack of 52 cards, 2 are drawn. Probability one is king and one is queen?', options: ['(a) 8/663', '(b) 4/663', '(c) 16/663', '(d) 1/221'] },
      { q: 'A and B can solve a problem with probabilities 1/2 and 2/3. Probability problem is solved?', options: ['(a) 5/6', '(b) 1/3', '(c) 2/3', '(d) 1/6'] },
    ],
    pyqTraps: [
      { title: 'Trap 1 — With Replacement vs Without', desc: 'When drawing cards "without replacement," each draw changes the total. P(2nd king | 1st was king) = 3/51. Students use 4/52 again.' },
      { title: 'Trap 2 — At Least vs Exactly', desc: '"At least 2 heads" ≠ "Exactly 2 heads". Use complement: 1 − P(0 heads) − P(1 head) for "at least 2."' },
      { title: 'Trap 3 — Repeated Letters in Probability', desc: '"PROBABILITY has 11 letters" — students count wrong. It has P,R,O,B,A,B,I,L,I,T,Y = 11 letters, with B and I repeated. When selecting one letter "at random," there are 11 equally likely choices, not 9 distinct ones.' },
    ],
  },
  {
    id: 'mixtures-alligations',
    title: 'Mixtures & Alligations',
    category: 'Aptitude',
    refresher: [
      'Alligation Rule: To find ratio in which two ingredients (at prices/concentrations C1 and C2) must be mixed to get mean price/concentration Cm: Quantity1 : Quantity2 = (C2 − Cm) : (Cm − C1).',
      'Replacement Formula: If a vessel has X litres of liquid and Y litres are removed and replaced with another liquid for n times: Final quantity of original = X × (1 − Y/X)^n.',
    ],
    formulas: [
      'Mixture problems with percentage purity: Use alligation on concentrations.',
      'Mixing two solutions: (V1×C1 + V2×C2) / (V1+V2) = Final concentration.',
    ],
    shortcuts: [
      'Alligation cross-subtraction: Always subtract smaller from larger to keep ratios positive.',
    ],
    practiceQuestions: [
      { q: 'In what ratio must rice at ₹9.30/kg be mixed with rice at ₹10.80/kg so that mixture costs ₹10/kg?', options: ['(a) 8:7', '(b) 7:8', '(c) 6:7', '(d) 7:6'] },
      { q: 'A vessel has 60L of milk. 6L removed and replaced with water. Repeated 3 times. Find milk concentration.', options: ['(a) 72.9%', '(b) 75%', '(c) 70%', '(d) 65.6%'] },
      { q: 'How many kg of sugar worth ₹45/kg must be mixed with 30kg of ₹30/kg sugar so mixture is worth ₹35/kg?', options: ['(a) 15kg', '(b) 18kg', '(c) 20kg', '(d) 25kg'] },
      { q: 'A solution of 30% alcohol. 10L removed and replaced with pure alcohol. New strength = 60%. Find original volume.', options: ['(a) 15L', '(b) 20L', '(c) 25L', '(d) 30L'] },
      { q: 'Mix 3L of 40% HCl with 2L of 20% HCl. Find concentration of mixture.', options: ['(a) 30%', '(b) 32%', '(c) 34%', '(d) 36%'] },
      { q: 'A milkman has 20L milk and adds water to increase volume by 25%. Percentage of milk in new mixture?', options: ['(a) 80%', '(b) 75%', '(c) 70%', '(d) 85%'] },
      { q: 'Two alloys have gold:silver ratios of 3:2 and 2:3. Equal weights mixed. New ratio of gold:silver?', options: ['(a) 1:1', '(b) 2:3', '(c) 3:2', '(d) 5:5'] },
      { q: 'A grocer mixes 2 types of coffee — ₹120/kg and ₹180/kg — in ratio 2:3. Selling at ₹165/kg. Profit%?', options: ['(a) 8.33%', '(b) 10%', '(c) 12%', '(d) 15%'] },
      { q: 'A 40-litre mixture of milk and water is 80% milk. How much water must be added to make it 60% milk?', options: ['(a) 12L', '(b) 13.33L', '(c) 14L', '(d) 16L'] },
      { q: 'In a mixture, ratio of spirit to water = 3:1. 10L of water added. Now ratio = 3:2. Find original volume.', options: ['(a) 40L', '(b) 50L', '(c) 60L', '(d) 45L'] },
    ],
    pyqTraps: [
      { title: 'Trap 1 — Replacement Formula', desc: '"Remove Y litres and add water n times." Final original = X(1−Y/X)^n. Students just subtract Y × n without compounding.' },
      { title: 'Trap 2 — Alligation Direction', desc: 'Formula: Ratio = (C2 − Mean) : (Mean − C1). Students mix up which value is subtracted from which, reversing the ratio.' },
      { title: 'Trap 3 — Equal Weights vs Equal Volumes', desc: '"Equal weights of two alloys mixed" ≠ "Equal volumes." For alloys, weight-based mixing means simple weighted average of fractions by weight.' },
    ],
  },
  {
    id: 'geometry',
    title: 'Geometry & Mensuration',
    category: 'Aptitude',
    refresher: [
      'Triangles: Area = ½ × base × height; Heron\'s Area = √[s(s-a)(s-b)(s-c)] where s = (a+b+c)/2.',
      'Pythagoras: a² + b² = c² (right triangle). Triplets: (3,4,5), (5,12,13), (8,15,17), (7,24,25), (9,40,41).',
      'Sum of angles = 180°; Exterior angle = sum of two non-adjacent interior angles.',
      'Similar triangles: Ratio of areas = (Ratio of sides)². Equilateral triangle: Area = (√3/4)a², Height = (√3/2)a.',
      'Circles: Area = πr², Circumference = 2πr; Arc length = (θ/360) × 2πr; Sector area = (θ/360) × πr².',
      'Tangent is perpendicular to radius at point of contact. Angle in semicircle = 90°.',
      'Rectangle: Area = l×b, Diagonal = √(l²+b²). Square: Area = a², Diagonal = a√2.',
      'Parallelogram: Area = base × height. Rhombus: Area = (d1×d2)/2. Trapezium: Area = ½ × (sum of parallel sides) × height.',
    ],
    formulas: [
      'Cube (side a): Volume = a³, SA = 6a². Cuboid: Volume = l×b×h, SA = 2(lb+bh+lh).',
      'Cylinder: Volume = πr²h, TSA = 2πr(r+h). Cone: Volume = (1/3)πr²h, Slant height l = √(r²+h²), LSA = πrl.',
      'Sphere: Volume = (4/3)πr³, SA = 4πr². Hemisphere: Volume = (2/3)πr³, TSA = 3πr².',
      'Important Theorems: Angle bisector theorem; Midpoint theorem (line joining midpoints of two sides is parallel to and half of third side); Basic Proportionality (Thales) Theorem.',
    ],
    shortcuts: [
      'If all dimensions of a 2D shape increase by k times, Area increases by k² times.',
      'If all dimensions of a 3D shape increase by k times, Volume increases by k³ times.',
      'In an equilateral triangle of side a: Height = (√3/2)a, Area = (√3/4)a², Inradius = a/(2√3), Circumradius = a/√3.',
    ],
    practiceQuestions: [
      { q: 'The perimeter of a triangle is 48 cm and sides are in ratio 1:2:3. Find the area.', options: ['(a) 0', '(b) 48 cm²', '(c) 96 cm²', '(d) 24 cm²'] },
      { q: 'A circle of radius 7 cm is inscribed in a square. Find the area of the square not covered by the circle.', options: ['(a) 42 cm²', '(b) 45.86 cm²', '(c) 48 cm²', '(d) 50 cm²'] },
      { q: 'A cylinder has radius 7 cm, height 10 cm. Find its total surface area. (π = 22/7)', options: ['(a) 748 cm²', '(b) 754 cm²', '(c) 760 cm²', '(d) 770 cm²'] },
      { q: 'A room is 15m × 12m × 5m. Find the longest diagonal.', options: ['(a) 18.38m', '(b) 17.69m', '(c) 19.23m', '(d) 16.76m'] },
      { q: 'A cone and hemisphere have equal base and equal heights. Ratio of volumes?', options: ['(a) 1:2', '(b) 2:3', '(c) 1:3', '(d) 1:1'] },
      { q: 'In triangle ABC, AB = 6, BC = 8, AC = 10. Find the area of the incircle.', options: ['(a) 4π', '(b) 9π', '(c) π', '(d) 2π'] },
      { q: 'Two poles of heights 6m and 11m stand on a plane. Distance between them = 12m. Find distance between tops.', options: ['(a) 12m', '(b) 13m', '(c) 14m', '(d) 15m'] },
      { q: 'The side of a square increases by 10%. Find the percentage increase in area.', options: ['(a) 10%', '(b) 21%', '(c) 20%', '(d) 22%'] },
      { q: 'A sphere of radius 6 cm is melted and recast into small spheres of radius 1 cm. How many?', options: ['(a) 16', '(b) 36', '(c) 216', '(d) 256'] },
      { q: 'In a right triangle, hypotenuse = 17 cm, one side = 8 cm. Area of triangle?', options: ['(a) 60 cm²', '(b) 68 cm²', '(c) 72 cm²', '(d) 80 cm²'] },
      { q: 'The diagonal of a rectangle is 26 cm. If length is 24 cm, find perimeter.', options: ['(a) 60 cm', '(b) 68 cm', '(c) 70 cm', '(d) 80 cm'] },
      { q: 'A circular wheel makes 500 revolutions per minute. What is its speed in km/h if diameter = 84 cm? (π = 22/7)', options: ['(a) 79.2 km/h', '(b) 72 km/h', '(c) 81 km/h', '(d) 66 km/h'] },
    ],
    pyqTraps: [
      { title: 'Trap 1 — Triangle with Sides 1:2:3', desc: '1:2:3 ratio with perimeter 48 → sides = 8, 16, 24. But 8+16 = 24 → this is a degenerate triangle (collinear points). Area = 0. TCS specifically traps students who apply Heron\'s formula anyway.' },
      { title: 'Trap 2 — Sphere Melted to Smaller Spheres', desc: 'Volume conserved: (4/3)πR³ = n × (4/3)πr³ → n = (R/r)³. For R=6, r=1: n = 216. Students compute n = (R/r)² = 36 using surface area instead.' },
      { title: 'Trap 3 — Diagonal of 3D Room', desc: 'Diagonal = √(l²+b²+h²), not √(l²+b²). Students forget to include height.' },
    ],
  },
  // ========== VERBAL ABILITY TOPICS ==========
  {
    id: 'reading-comprehension',
    title: 'Reading Comprehension',
    category: 'Verbal',
    refresher: [
      'TCS tests: Main idea / central theme, Inference (logically concluded but NOT stated directly), Author\'s tone (critical, appreciative, neutral, satirical, sarcastic), Vocabulary in context, Specific detail retrieval, Title / best heading selection.',
      'Strategy 1: Read the questions first (30 seconds), then read the passage with intent.',
      'Strategy 2: Paragraph mapping — Write a 3-word summary per paragraph as you read.',
      'Eliminate traps: Too extreme answers ("always," "never," "all"); Out-of-scope answers (true in general, not supported by passage); Opposite tone from author.',
      'Inference questions: Must be deducible from passage, not common knowledge.',
      'Tone words — Positive: laudatory, appreciative, optimistic, sanguine, zealous. Negative: cynical, acerbic, critical, deprecatory, sardonic. Neutral: objective, analytical, dispassionate, impartial, didactic. Mixed: ambivalent, ambiguous, paradoxical.',
    ],
    formulas: [
      'Main idea → Find the thesis sentence (often first or last of first paragraph).',
      'Inference → Must be 100% supported; don\'t add outside knowledge.',
      'Author\'s tone → Look at adjectives, verbs of judgment.',
      'Best title → Should cover the entire passage, not just one part.',
      'Specific fact → Go back and locate; don\'t guess from memory.',
      'Meaning in context → Read surrounding sentences, not just the word.',
    ],
    shortcuts: [],
    practiceQuestions: [],
    passages: [
      {
        text: 'Technology is transforming every sector, and education is no exception. Traditional classrooms are giving way to digital platforms that allow students to learn at their own pace and time. This democratization of learning means that a student in a rural village can now access the same quality of education as someone in a metropolitan city. However, critics argue that this shift widens the digital divide — those without internet access or digital devices are further marginalized. The human element — mentorship, peer interaction, and the role of a teacher — is also diluted in an online setting.',
        questions: [
          { q: 'What is the central theme of the passage?', options: ['(a) Technology is completely replacing traditional education', '(b) Online education has both advantages and limitations', '(c) Rural students benefit more from technology than urban students', '(d) Critics are against digital education'] },
          { q: 'The word "democratization" in the passage most nearly means:', options: ['(a) Making something political', '(b) Making something equally accessible', '(c) Making something digital', '(d) Making something free'] },
          { q: 'What concern do critics have about digital education?', options: ['(a) It is too expensive to implement', '(b) It reduces the role of students', '(c) It can worsen inequality for those without digital access', '(d) It cannot match the quality of traditional education'] },
          { q: 'The author\'s tone is best described as:', options: ['(a) Strongly critical of technology in education', '(b) Enthusiastically supportive', '(c) Balanced and analytical', '(d) Sarcastic'] },
          { q: 'What can be inferred from the passage?', options: ['(a) All rural students now have internet access', '(b) The digital divide is a myth', '(c) Technology in education is irreversible', '(d) Access to digital infrastructure is unequal across regions'] },
        ],
      },
      {
        text: 'Climate change has long been a subject of scientific consensus, yet it remains politically contentious. Governments of developed nations, historically the largest emitters of greenhouse gases, are under pressure to cut emissions. Emerging economies, however, argue that they should not be penalized for pursuing the same industrialization path that made wealthy nations prosperous. This tension creates an impasse in international climate negotiations. Despite landmark agreements like the Paris Accord, enforcement mechanisms remain weak, and emissions continue to rise globally.',
        questions: [
          { q: 'What is the main argument of the passage?', options: ['(a) Developed nations are solely responsible for climate change', '(b) International climate negotiations are making excellent progress', '(c) There is a fundamental tension between developed and emerging economies in tackling climate change', '(d) The Paris Accord is ineffective'] },
          { q: 'The word "contentious" means:', options: ['(a) Widely accepted', '(b) Causing dispute', '(c) Scientific', '(d) Rapidly changing'] },
          { q: 'Which of the following is an inference, NOT a direct statement from the passage?', options: ['(a) The Paris Accord is a landmark agreement', '(b) Emerging economies want to industrialize', '(c) Wealthy nations achieved prosperity through industrialization', '(d) Without equitable burden-sharing, global climate action will remain stalled'] },
          { q: 'The author\'s attitude toward international climate negotiations is:', options: ['(a) Optimistic', '(b) Indifferent', '(c) Skeptical', '(d) Enthusiastic'] },
          { q: 'What does "impasse" mean in the context of the passage?', options: ['(a) Progress', '(b) Deadlock or standstill', '(c) Agreement', '(d) Discussion'] },
        ],
      },
    ],
    pyqTraps: [
      { title: 'Trap 1 — Inference vs Fact', desc: 'TCS mixes "directly stated" facts with inferences. An inference must be logically deducible from the passage — NOT general knowledge. If it\'s not supported by at least one sentence in the passage, it\'s wrong.' },
      { title: 'Trap 2 — Extreme Answer Choices', desc: 'Options with words like "always," "never," "completely," "all" are almost always wrong. TCS uses moderate/balanced options as correct answers.' },
      { title: 'Trap 3 — Tone Confusion', desc: 'Students confuse "balanced/analytical" with "neutral/indifferent." Balanced = author presents both sides but may lean one way. Indifferent = author doesn\'t care at all. TCS tests this distinction.' },
    ],
  },
  {
    id: 'sentence-correction',
    title: 'Sentence Correction & Grammar',
    category: 'Verbal',
    refresher: [
      'Subject-Verb Agreement: Singular subjects take singular verbs. "Each of the boys is..." not "are." Collective nouns (team, committee) are usually singular.',
      'Tense Consistency: Don\'t mix past and present tenses in the same sentence without reason.',
      'Parallelism: Items in a list must follow the same grammatical form. "She likes dancing, singing, and painting" NOT "She likes dancing, to sing, and painting."',
      'Modifiers: Dangling/misplaced modifiers are TCS favorites. "Walking down the road, the trees looked beautiful" — WHO is walking?',
      'Pronoun Agreement: "Everyone should bring their book" is technically wrong (everyone = singular). Correct: "his or her book."',
      'Articles: Use "a" before consonant sounds, "an" before vowel sounds. "An honest man" (silent h), "A university" (sounds like \'yoo\').',
    ],
    formulas: [
      'Common error patterns: Neither...nor (verb agrees with nearest subject), Either...or (same rule), Not only...but also.',
      'Preposition rules: "Consist of" (not "consist in"), "Different from" (not "different than"), "Superior to" (not "superior than").',
      'Redundancy: "Repeat again," "revert back," "return back," "free gift" — all are redundant.',
    ],
    shortcuts: [
      'Read the sentence aloud — errors in subject-verb agreement and tense become obvious when heard.',
      'If two options are grammatically identical but one is more concise, choose the concise one.',
      'Check if the sentence has a clear subject and verb — fragments are a common trap.',
    ],
    practiceQuestions: [
      { q: 'Choose the correct sentence:', options: ['(a) Each of the students have completed their project.', '(b) Each of the students has completed his project.', '(c) Each of the students have completed his project.', '(d) Each of the students has completed their projects.'] },
      { q: 'Identify the error: "The team are going to celebrate their victory at the restaurant tonight."', options: ['(a) are → is', '(b) their → its', '(c) Both (a) and (b)', '(d) No error'] },
      { q: 'Select the grammatically correct option:', options: ['(a) Neither the teacher nor the students was present.', '(b) Neither the teacher nor the students were present.', '(c) Neither the teacher nor the students is present.', '(d) Neither the teacher nor the students has been present.'] },
      { q: '"Walking through the park, the flowers smelled wonderful." What is the error?', options: ['(a) Tense error', '(b) Dangling modifier — flowers can\'t walk', '(c) Subject-verb disagreement', '(d) No error'] },
      { q: 'Choose the correct form: "He is one of those people who ___ always late."', options: ['(a) is', '(b) are', '(c) was', '(d) has been'] },
      { q: '"I am looking forward to meet you." Correct or incorrect?', options: ['(a) Correct', '(b) Incorrect — should be "to meeting you"', '(c) Incorrect — should be "to met you"', '(d) Incorrect — should be "for meeting you"'] },
      { q: 'Choose the correct sentence:', options: ['(a) The data shows that the experiment was successful.', '(b) The data show that the experiment was successful.', '(c) Both are correct', '(d) Neither is correct'] },
      { q: '"She is more taller than her sister." Fix the error:', options: ['(a) She is most taller', '(b) She is taller', '(c) She is more tall', '(d) No error'] },
      { q: '"Everyone should mind their own business." Is this correct?', options: ['(a) Correct — informal English allows it', '(b) Incorrect — should be "his or her"', '(c) Both (a) and (b) are valid depending on context', '(d) Incorrect — should be "its"'] },
      { q: '"The committee have made their decision." Correct version:', options: ['(a) The committee has made its decision.', '(b) The committee have made its decision.', '(c) The committee has made their decision.', '(d) No change needed.'] },
    ],
    pyqTraps: [
      { title: 'Trap 1 — Collective Nouns', desc: '"The team are..." — In Indian English (TCS context), collective nouns are typically singular: "The team is..." TCS marks singular as correct.' },
      { title: 'Trap 2 — Neither...Nor Agreement', desc: '"Neither the boys nor the teacher were..." — Verb agrees with NEAREST subject. Correct: "Neither the boys nor the teacher was..."' },
      { title: 'Trap 3 — Dangling Modifiers', desc: '"Running to catch the bus, my bag fell." — This implies the bag was running! Correct: "Running to catch the bus, I dropped my bag." TCS loves this pattern.' },
    ],
  },
  {
    id: 'para-jumbles',
    title: 'Para Jumbles & Sentence Ordering',
    category: 'Verbal',
    refresher: [
      'Para Jumbles: Rearrange jumbled sentences into a coherent paragraph. Look for opening/closing sentence clues.',
      'Opening sentence clue: Introduces the topic without assuming prior context. Often has "a/an" (indefinite article).',
      'Closing sentence clue: Concludes, summarizes, or gives final thoughts. Often has "thus," "therefore," "hence."',
      'Pronoun links: "He," "She," "It," "They," "This" must refer to a noun introduced in a PREVIOUS sentence.',
      'Transition words: "However" (contrast), "Moreover" (addition), "Therefore" (conclusion), "For instance" (example follows).',
      'Chronological clues: Dates, time references, "first...then...finally" signal order.',
    ],
    formulas: [
      'Step 1: Find the opening sentence (introduces topic, no backward references).',
      'Step 2: Find mandatory pairs (pronoun references, cause-effect, example-explanation).',
      'Step 3: Find the closing sentence (summary, conclusion, "thus/hence/therefore").',
      'Step 4: Arrange the middle sentences using transitions and logic.',
    ],
    shortcuts: [
      'If a sentence starts with "This," "These," "Such," "It" — it CANNOT be the first sentence.',
      'Look for article clues: "A scientist" (first mention) comes before "The scientist" (already introduced).',
      'If two options differ only in the position of one sentence, focus on where that sentence fits logically.',
    ],
    practiceQuestions: [
      { q: 'Arrange: P: "He was born in a small village." Q: "Later, he moved to the city for education." R: "Ram is a famous scientist." S: "His discoveries changed the world."', options: ['(a) R-P-Q-S', '(b) P-R-Q-S', '(c) R-Q-P-S', '(d) P-Q-R-S'] },
      { q: 'Which sentence should come FIRST? A: "This led to a revolution." B: "The invention of the printing press was a milestone." C: "It enabled mass production of books." D: "Knowledge was no longer limited to the elite."', options: ['(a) A', '(b) B', '(c) C', '(d) D'] },
      { q: 'Arrange: 1: "However, this growth has come at a cost." 2: "India has experienced rapid economic growth." 3: "Environmental degradation and inequality have increased." 4: "Sustainable development is now a priority."', options: ['(a) 2-1-3-4', '(b) 1-2-3-4', '(c) 2-3-1-4', '(d) 4-2-1-3'] },
      { q: 'If sentence S starts with "Therefore," it is most likely:', options: ['(a) The opening sentence', '(b) The second sentence', '(c) A middle sentence', '(d) The concluding sentence'] },
      { q: 'Arrange: A: "The results were astonishing." B: "A team of researchers conducted an experiment." C: "They found that plants respond to music." D: "This challenged existing botanical theories."', options: ['(a) B-A-C-D', '(b) B-C-A-D', '(c) A-B-C-D', '(d) C-B-A-D'] },
    ],
    pyqTraps: [
      { title: 'Trap 1 — "This/These" as Opener', desc: 'A sentence starting with "This phenomenon" or "These findings" CANNOT be the opener. TCS places such sentences as option (a) to trap quick solvers.' },
      { title: 'Trap 2 — Ignoring Pronoun References', desc: '"He became famous" — who is "He"? If no prior sentence introduces a person, this can\'t come first. Students pick it because it "sounds" complete.' },
      { title: 'Trap 3 — Forced Chronological Order', desc: 'Not all para jumbles are chronological. Some are thematic (cause→effect, general→specific). Don\'t assume time order.' },
    ],
  },
  {
    id: 'fill-blanks',
    title: 'Fill in the Blanks & Cloze Test',
    category: 'Verbal',
    refresher: [
      'Fill in the Blanks: Choose the correct word/phrase to complete a sentence. Tests vocabulary, grammar, and context understanding.',
      'Cloze Test: A passage with multiple blanks — tests coherence and flow in addition to vocabulary.',
      'Context clues: Read the entire sentence before looking at options. The surrounding words often hint at the answer.',
      'Tone matching: If the sentence is positive, the blank likely needs a positive word. If negative, negative.',
      'Collocations: Certain words naturally go together. "Make a decision" (not "do a decision"), "take a risk" (not "make a risk").',
    ],
    formulas: [
      'Common collocations TCS tests: "Make progress," "Pay attention," "Take advantage," "Come to a conclusion," "Draw a distinction."',
      'Preposition combinations: "Accused of," "Acquitted of," "Abstain from," "Averse to," "Comply with," "Dispose of," "Preside over."',
    ],
    shortcuts: [
      'Eliminate obviously wrong options first — usually 2 out of 4 can be eliminated quickly.',
      'If two options are synonyms, neither is likely correct (they\'d both work, which is ambiguous).',
      'For cloze tests, read the ENTIRE passage first before filling any blank.',
    ],
    practiceQuestions: [
      { q: 'The teacher asked the students to ___ from using their phones during class.', options: ['(a) refrain', '(b) restrain', '(c) abstain', '(d) constrain'] },
      { q: 'His ___ nature made him popular among his colleagues.', options: ['(a) amicable', '(b) hostile', '(c) ambiguous', '(d) arbitrary'] },
      { q: 'The government has ___ new regulations to curb pollution.', options: ['(a) imposed', '(b) disposed', '(c) composed', '(d) supposed'] },
      { q: 'She was ___ of the charges due to lack of evidence.', options: ['(a) accused', '(b) convicted', '(c) acquitted', '(d) charged'] },
      { q: 'The company ___ a significant profit this quarter.', options: ['(a) did', '(b) made', '(c) got', '(d) took'] },
      { q: 'The report highlighted the ___ need for reform in the education sector.', options: ['(a) eminent', '(b) imminent', '(c) prominent', '(d) urgent'] },
      { q: 'He was too ___ to admit his mistake in front of everyone.', options: ['(a) haughty', '(b) humble', '(c) proud', '(d) arrogant'] },
      { q: 'The policy was ___ by the opposition party as discriminatory.', options: ['(a) criticised', '(b) praised', '(c) lauded', '(d) applauded'] },
      { q: 'Despite his ___ efforts, the project failed to meet the deadline.', options: ['(a) half-hearted', '(b) strenuous', '(c) feeble', '(d) reluctant'] },
      { q: 'The manager asked the team to ___ with the new guidelines immediately.', options: ['(a) comply', '(b) apply', '(c) supply', '(d) imply'] },
    ],
    pyqTraps: [
      { title: 'Trap 1 — Confusing Similar Words', desc: '"Eminent" (famous) vs "Imminent" (about to happen) vs "Immanent" (inherent). TCS deliberately uses these near-homophones.' },
      { title: 'Trap 2 — Collocation Errors', desc: '"Do a mistake" vs "Make a mistake" — TCS tests these natural English pairings. Students who translate from Hindi/regional languages often pick wrong collocations.' },
      { title: 'Trap 3 — Preposition Traps', desc: '"Comply with" not "comply to." "Abstain from" not "abstain of." TCS uses wrong prepositions as distractor options.' },
    ],
  },
  {
    id: 'synonyms-antonyms',
    title: 'Synonyms & Antonyms',
    category: 'Verbal',
    refresher: [
      'Synonyms: Words with similar meanings. Antonyms: Words with opposite meanings.',
      'Context matters: A word can have different meanings in different contexts. "Light" can mean brightness OR not heavy.',
      'Degree of intensity: "Happy" → "Elated" → "Ecstatic" (increasing intensity). TCS may ask for the closest synonym, not just any synonym.',
      'Common TCS vocabulary: Aberration (deviation), Ameliorate (improve), Benevolent (kind), Candid (honest), Diligent (hardworking), Ephemeral (short-lived), Gregarious (sociable), Immaculate (flawless), Judicious (wise), Lucid (clear).',
    ],
    formulas: [
      'Word roots help: "Bene-" = good (benevolent, benefit). "Mal-" = bad (malevolent, malice). "Ambi-" = both (ambiguous, ambivalent). "Anti-" = against (antipathy, antithesis).',
      'Prefixes for antonyms: un-, in-, im-, ir-, il-, dis-, mis-, non-.',
    ],
    shortcuts: [
      'If you don\'t know a word, try to recall where you\'ve heard it used — context clues from memory.',
      'Eliminate options you know are wrong, even if you\'re unsure about the correct answer.',
      'Words ending in "-ous" are often adjectives (generous, nervous, curious).',
    ],
    practiceQuestions: [
      { q: 'Synonym of "Ephemeral":', options: ['(a) Eternal', '(b) Transient', '(c) Permanent', '(d) Stable'] },
      { q: 'Antonym of "Benevolent":', options: ['(a) Kind', '(b) Generous', '(c) Malevolent', '(d) Helpful'] },
      { q: 'Synonym of "Candid":', options: ['(a) Diplomatic', '(b) Frank', '(c) Reserved', '(d) Secretive'] },
      { q: 'Antonym of "Gregarious":', options: ['(a) Sociable', '(b) Friendly', '(c) Reclusive', '(d) Outgoing'] },
      { q: 'Synonym of "Ameliorate":', options: ['(a) Worsen', '(b) Improve', '(c) Destroy', '(d) Maintain'] },
      { q: 'Antonym of "Lucid":', options: ['(a) Clear', '(b) Transparent', '(c) Obscure', '(d) Bright'] },
      { q: 'Synonym of "Diligent":', options: ['(a) Lazy', '(b) Careless', '(c) Industrious', '(d) Negligent'] },
      { q: 'Antonym of "Immaculate":', options: ['(a) Pure', '(b) Flawless', '(c) Tainted', '(d) Clean'] },
      { q: 'Synonym of "Judicious":', options: ['(a) Reckless', '(b) Prudent', '(c) Careless', '(d) Impulsive'] },
      { q: 'Antonym of "Aberration":', options: ['(a) Anomaly', '(b) Deviation', '(c) Normality', '(d) Exception'] },
    ],
    pyqTraps: [
      { title: 'Trap 1 — Degree Confusion', desc: '"Synonym of \'angry\'" — TCS gives "furious" and "irritated" as options. Both are synonyms but at different intensities. Pick the closest match in degree.' },
      { title: 'Trap 2 — Context-Dependent Meaning', desc: '"Antonym of \'light\'" — could be "heavy" or "dark" depending on context. TCS usually provides the sentence context; read it carefully.' },
      { title: 'Trap 3 — Similar-Looking Words', desc: '"Synonym of \'eminent\'" — options include "imminent" (about to happen) and "immanent" (inherent). Students confuse spelling and meaning.' },
    ],
  },
  {
    id: 'active-passive',
    title: 'Active & Passive Voice',
    category: 'Verbal',
    refresher: [
      'Active Voice: Subject performs the action. "The cat (S) caught (V) the mouse (O)."',
      'Passive Voice: Object receives the action. "The mouse (S) was caught (V) by the cat."',
      'Conversion: Active → Passive: Object becomes subject, verb becomes "be + past participle," subject becomes "by + agent."',
      'Tense changes in passive: Simple Present: is/am/are + V3. Simple Past: was/were + V3. Present Continuous: is/am/are + being + V3. Past Continuous: was/were + being + V3. Present Perfect: has/have + been + V3. Past Perfect: had + been + V3. Future: will + be + V3.',
    ],
    formulas: [
      'Modals in passive: "Can do" → "Can be done." "Must complete" → "Must be completed." "Should finish" → "Should be finished."',
      'Imperative passive: "Close the door" → "Let the door be closed." "Help him" → "Let him be helped."',
      'Questions in passive: "Did he write the letter?" → "Was the letter written by him?"',
    ],
    shortcuts: [
      'If the sentence has "by + agent" at the end, it\'s likely passive. Convert by making the agent the subject.',
      'For modals, just insert "be" before the past participle: "can write" → "can be written."',
      'Intransitive verbs (no object) CANNOT be made passive: "He slept" has no passive form.',
    ],
    practiceQuestions: [
      { q: 'Change to passive: "The teacher punished the student."', options: ['(a) The student was punished by the teacher.', '(b) The student is punished by the teacher.', '(c) The student has been punished by the teacher.', '(d) The student were punished by the teacher.'] },
      { q: 'Change to active: "The book was read by her."', options: ['(a) She reads the book.', '(b) She read the book.', '(c) She has read the book.', '(d) She is reading the book.'] },
      { q: 'Change to passive: "They are building a new bridge."', options: ['(a) A new bridge is being built by them.', '(b) A new bridge was being built by them.', '(c) A new bridge has been built by them.', '(d) A new bridge is built by them.'] },
      { q: 'Change to passive: "She can solve this problem."', options: ['(a) This problem can solved by her.', '(b) This problem can be solved by her.', '(c) This problem could be solved by her.', '(d) This problem is solved by her.'] },
      { q: 'Change to passive: "Open the door."', options: ['(a) The door is opened.', '(b) Let the door be opened.', '(c) The door was opened.', '(d) The door should be opened.'] },
      { q: 'Change to active: "The match was won by our team."', options: ['(a) Our team wins the match.', '(b) Our team won the match.', '(c) Our team has won the match.', '(d) Our team is winning the match.'] },
      { q: 'Which sentence is in passive voice?', options: ['(a) She wrote a beautiful poem.', '(b) The poem was written by her.', '(c) She is writing a poem.', '(d) She will write a poem.'] },
      { q: 'Change to passive: "Someone has stolen my wallet."', options: ['(a) My wallet has been stolen.', '(b) My wallet was stolen.', '(c) My wallet is stolen.', '(d) My wallet had been stolen.'] },
      { q: 'Which verb CANNOT be made passive?', options: ['(a) Write', '(b) Eat', '(c) Sleep', '(d) Build'] },
      { q: 'Change to passive: "The company will launch a new product next month."', options: ['(a) A new product will be launched by the company next month.', '(b) A new product is launched by the company next month.', '(c) A new product was launched by the company next month.', '(d) A new product has been launched by the company next month.'] },
    ],
    pyqTraps: [
      { title: 'Trap 1 — Tense Mismatch', desc: 'Active is in Simple Past ("wrote") but student converts to Present Perfect passive ("has been written") instead of Simple Past passive ("was written"). Always match the tense.' },
      { title: 'Trap 2 — Intransitive Verbs', desc: '"He died" — students try to convert: "He was died" — WRONG! Intransitive verbs have no object and cannot be made passive.' },
      { title: 'Trap 3 — Modal Passive Missing "be"', desc: '"Can solve" → "Can be solved." Students write "Can solved" (missing "be"). Every modal passive needs "modal + be + V3."' },
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
            { n: 'LCM, HCF & Remainders', t: 'Number System', d: 'Aptitude', l: 'E' },
            { n: 'Divisibility Rules & Power Cycles', t: 'Number System', d: 'Aptitude', l: 'E' },
            { n: 'Percentages & Successive Changes', t: 'Arithmetic', d: 'Aptitude', l: 'E' },
            { n: 'Profit, Loss, Discounts & False Weights', t: 'Commercial Math', d: 'Aptitude', l: 'M' },
            { n: 'Simple & Compound Interest (SI/CI)', t: 'Commercial Math', d: 'Aptitude', l: 'M' },
          ],
        },
        {
          name: 'Speed, Time, Work & Averages',
          problems: [
            { n: 'Time & Work, Man-Days Concept', t: 'Efficiency', d: 'Aptitude', l: 'M' },
            { n: 'Pipes & Cisterns', t: 'Efficiency', d: 'Aptitude', l: 'M' },
            { n: 'Speed, Time & Distance, Trains & Boats', t: 'Kinematics', d: 'Aptitude', l: 'M' },
            { n: 'Averages & Weighted Mean', t: 'Statistics', d: 'Aptitude', l: 'E' },
            { n: 'Mixtures & Alligations', t: 'Ratio & Proportions', d: 'Aptitude', l: 'M' },
          ],
        },
        {
          name: 'Algebra, Combinatorics & Geometry',
          problems: [
            { n: 'Ratio, Proportion & Ages', t: 'Algebra', d: 'Aptitude', l: 'E' },
            { n: 'Permutations & Combinations (nPr / nCr)', t: 'Combinatorics', d: 'Aptitude', l: 'M' },
            { n: 'Probability & Independent Events', t: 'Combinatorics', d: 'Aptitude', l: 'M' },
            { n: 'Geometry & Mensuration (2D/3D)', t: 'Geometry', d: 'Aptitude', l: 'M' },
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
            { n: 'Reading Comprehension (RC)', t: 'Verbal', d: 'English', l: 'M' },
            { n: 'Sentence Correction & Spotting Errors', t: 'Grammar', d: 'English', l: 'E' },
            { n: 'Para Jumbles & Sentence Ordering', t: 'Logic', d: 'English', l: 'M' },
            { n: 'Fill in the Blanks & Cloze Test', t: 'Vocabulary', d: 'English', l: 'E' },
            { n: 'Synonyms, Antonyms & Prepositions', t: 'Vocabulary', d: 'English', l: 'E' },
            { n: 'Active & Passive Voice', t: 'Grammar', d: 'English', l: 'E' },
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
            { n: 'Coding-Decoding & Letter Shifting', t: 'Logic', d: 'Reasoning', l: 'E' },
            { n: 'Blood Relations & Family Tree', t: 'Logic', d: 'Reasoning', l: 'E' },
            { n: 'Direction Sense Test', t: 'Spatial', d: 'Reasoning', l: 'E' },
            { n: 'Number & Letter Series', t: 'Pattern', d: 'Reasoning', l: 'M' },
            { n: 'Data Sufficiency', t: 'Logic', d: 'Reasoning', l: 'H' },
            { n: 'Seating Arrangements (Linear/Circular)', t: 'Arrangement', d: 'Reasoning', l: 'M' },
            { n: 'Syllogisms & Venn Diagrams', t: 'Deduction', d: 'Reasoning', l: 'M' },
            { n: 'Meaningful Word Formation', t: 'Vocabulary', d: 'Reasoning', l: 'E' },
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
            { n: 'Advanced Data Interpretation (Tables/Charts)', t: 'DI', d: 'Advanced Quant', l: 'H' },
            { n: 'Complex Permutations & Probability', t: 'Advanced Math', d: 'Advanced Quant', l: 'H' },
            { n: 'Advanced Syllogisms & Possibility Cases', t: 'Deduction', d: 'Advanced Reasoning', l: 'H' },
            { n: 'Multi-Variable Seating Arrangements', t: 'Arrangement', d: 'Advanced Reasoning', l: 'H' },
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
            { n: 'Choose Your Language & Practice (Array Basics Playlist)', t: 'Array Traversal', d: 'Arrays', l: 'E', u: 'https://www.youtube.com/playlist?list=PLbJhGqY-mq44tdtsBxMG00DMttxm9JspQ' },
            { n: 'Hashmaps Fundamentals & Practice', t: 'Hashmaps', d: 'Arrays', l: 'M', u: 'https://www.youtube.com/watch?v=9a4A6CbrLCo&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=45' },
            { n: 'Find Max, Min, Second Largest & Reverse In-Place', t: 'Array Traversal', d: 'Arrays', l: 'E' },
          ],
        },
        {
          name: 'Day 2: Two Pointers & Array Manipulation',
          problems: [
            { n: 'Move All Zeros to End', t: 'Two Pointers', d: 'Arrays', l: 'E', u: 'https://www.youtube.com/watch?v=Fu7LD_mIo00&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=3' },
            { n: 'Remove Duplicates from Sorted Array', t: 'Two Pointers', d: 'Arrays', l: 'E', u: 'https://www.youtube.com/watch?v=PvyEr3CeKzE&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=4' },
            { n: 'Triplet Sum / 3Sum', t: 'Two Pointers', d: 'Arrays', l: 'M', u: 'https://www.youtube.com/watch?v=rM9EthMlXnw&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=7' },
            { n: 'Dutch National Flag (Sort 0s, 1s, 2s)', t: 'Three Pointers', d: 'Arrays', l: 'M', u: 'https://www.youtube.com/watch?v=ljJJcYql6Bc&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=8' },
          ],
        },
        {
          name: 'Day 3 & 4: Sliding Window Patterns',
          problems: [
            { n: 'Intro to Sliding Window', t: 'Fixed Window', d: 'Sliding Window', l: 'E', u: 'https://www.youtube.com/watch?v=V6pRTnOZ7Mc&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=10' },
            { n: 'Fixed Window Questions', t: 'Fixed Window', d: 'Sliding Window', l: 'M', u: 'https://www.youtube.com/watch?v=DL8LSXUsfWE&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=11' },
            { n: 'String Window Question', t: 'Variable Window', d: 'Strings', l: 'M', u: 'https://www.youtube.com/watch?v=2HZ12B2ZPAQ&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=13' },
            { n: 'Sliding Window Revision', t: 'Fixed Window', d: 'Sliding Window', l: 'M', u: 'https://www.youtube.com/watch?v=lyZp-49pdzQ&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=14' },
            { n: 'Sliding Window Revision (Min Window)', t: 'Min Window', d: 'Sliding Window', l: 'H', u: 'https://www.youtube.com/watch?v=IR3oL6ltbJ8&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=15' },
            { n: 'Sliding Window Important Question', t: 'Variable Window', d: 'Sliding Window', l: 'H', u: 'https://www.youtube.com/watch?v=9wc8HZH_sh4&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=16' },
          ],
        },
        {
          name: 'Day 5: Strings I & Character Frequency',
          problems: [
            { n: 'Reverse String, Palindrome Check & Vowel/Consonant Count', t: 'Two Pointers', d: 'Strings', l: 'E' },
            { n: 'Character Frequency & Anagrams (Use ChatGPT for Practice)', t: 'Frequency Map', d: 'Strings', l: 'E' },
          ],
        },
        {
          name: 'Day 6: Number Theory & Math Fundamentals',
          problems: [
            { n: 'Prime Check (Sieve of Eratosthenes), Armstrong & Perfect Numbers', t: 'Number Theory', d: 'Math', l: 'M' },
            { n: 'Factorial, Fibonacci Series & GCD/LCM', t: 'Series', d: 'Math', l: 'E' },
          ],
        },
        {
          name: 'Day 7: Pattern Printing & Sorting Basics',
          problems: [
            { n: 'Star, Number & Pyramid Nested Loop Patterns', t: 'Nested Loops', d: 'Patterns', l: 'E' },
            { n: 'Bubble Sort, Insertion Sort & Selection Sort', t: 'Sorting', d: 'Algorithms', l: 'E' },
            { n: 'Time Complexity Analysis Masterclass', t: 'Complexity', d: 'Algorithms', l: 'E', u: 'https://www.youtube.com/watch?v=oFwHwCkSoGw&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=6' },
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
            { n: 'Linked List Basics', t: 'Linked List', d: 'Data Structures', l: 'E', u: 'https://www.youtube.com/watch?v=NSh5oNElD84&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=20' },
            { n: 'Linked List Slow-Fast Intro', t: 'Slow-Fast Pointers', d: 'Linked List', l: 'M', u: 'https://www.youtube.com/watch?v=IxxlDYwMrZ8&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=17' },
            { n: 'Slow-Fast Question (Cycle/Middle Node)', t: 'Slow-Fast Pointers', d: 'Linked List', l: 'M', u: 'https://www.youtube.com/watch?v=RNpZBhZBtJc&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=21' },
            { n: 'Linked List Reversal', t: 'Linked List', d: 'Data Structures', l: 'M', u: 'https://www.youtube.com/watch?v=7gOCx1vbx0k&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=47' },
            { n: 'Kadane Intro (Max Subarray Sum)', t: 'Dynamic Programming', d: 'Arrays', l: 'M', u: 'https://www.youtube.com/watch?v=N8vJ8RyQEes&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=23' },
            { n: 'Kadane One Deletion Variant', t: 'Dynamic Programming', d: 'Arrays', l: 'H', u: 'https://www.youtube.com/watch?v=jIz4zcFuUU8&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=48' },
          ],
        },
        {
          name: 'Day 10: Binary Search Fundamentals',
          problems: [
            { n: 'Binary Search Intro', t: 'Divide & Conquer', d: 'Binary Search', l: 'E', u: 'https://www.youtube.com/watch?v=S0E1Ix67qbc&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=51' },
            { n: 'Binary Search Question', t: 'Binary Search', d: 'Arrays', l: 'M', u: 'https://www.youtube.com/watch?v=zEEwwS9_fwA&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=52' },
            { n: 'Binary Search Story Questions (Search on Answer)', t: 'Search on Answer', d: 'Binary Search', l: 'H', u: 'https://www.youtube.com/watch?v=0Kxg0LPGwFo&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=56' },
          ],
        },
        {
          name: 'Day 11: Stacks & Applications',
          problems: [
            { n: 'Stack Intro', t: 'Stack Application', d: 'Stacks', l: 'E', u: 'https://www.youtube.com/watch?v=V0wJuik3WSE&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=39' },
            { n: 'Stack Question', t: 'Stack Application', d: 'Stacks', l: 'M', u: 'https://www.youtube.com/watch?v=K1idN2Rqcmw&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=40' },
            { n: 'Stack Next Greater Element', t: 'Monotonic Stack', d: 'Stacks', l: 'M', u: 'https://www.youtube.com/watch?v=gFqOIPfAEjw&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=42' },
            { n: 'Stack Balanced Parenthesis', t: 'Stack Application', d: 'Stacks', l: 'E', u: 'https://www.youtube.com/watch?v=YutYOZFt6sQ&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=41' },
          ],
        },
        {
          name: 'Day 12: Heaps & Priority Queues',
          problems: [
            { n: 'Heap Intro', t: 'Heap Select', d: 'Heaps', l: 'E', u: 'https://www.youtube.com/watch?v=_1AbrkD8pak&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=61' },
            { n: 'Heap Question', t: 'Heap Select', d: 'Heaps', l: 'M', u: 'https://www.youtube.com/watch?v=zzu-k85RLGs&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=62' },
            { n: 'Heap on Pairs', t: 'Heap + Pairs', d: 'Heaps', l: 'M', u: 'https://www.youtube.com/watch?v=I1-0ALAJxZI&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=63' },
            { n: 'Heap Revision', t: 'Heap Revision', d: 'Heaps', l: 'M', u: 'https://www.youtube.com/watch?v=1yax0YQOb8w&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=69' },
          ],
        },
        {
          name: 'Day 13: Recursion & Backtracking',
          problems: [
            { n: 'Recursion Basics', t: 'Recursion', d: 'Algorithms', l: 'E', u: 'https://www.youtube.com/watch?v=HdPb_thlF5s&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=70' },
            { n: 'Backtracking Intro', t: 'Backtracking', d: 'Recursion', l: 'M', u: 'https://www.youtube.com/watch?v=I081UkZCLlc&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=72' },
            { n: 'Recursion Questions', t: 'Recursion', d: 'Algorithms', l: 'M', u: 'https://www.youtube.com/watch?v=-gC-QEdpvO4&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=74' },
            { n: 'Backtracking Template', t: 'Backtracking', d: 'Recursion', l: 'H', u: 'https://www.youtube.com/watch?v=IKfIT6uFOcs&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=76' },
          ],
        },
        {
          name: 'Day 14: Trees & Traversals',
          problems: [
            { n: 'Tree Intro', t: 'Tree Basics', d: 'Trees', l: 'E', u: 'https://www.youtube.com/watch?v=VdujirLGDDE&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=79' },
            { n: 'Tree Traversal (Inorder, Preorder, Postorder)', t: 'DFS Traversal', d: 'Trees', l: 'E', u: 'https://www.youtube.com/watch?v=ZvYJT_QwnEw&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=80' },
            { n: 'Tree Level Order', t: 'BFS Traversal', d: 'Trees', l: 'M', u: 'https://www.youtube.com/watch?v=-g6h0Ok1Buk&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=81' },
            { n: 'Tree Lowest Common Ancestor (LCA)', t: 'Tree Query', d: 'Trees', l: 'M', u: 'https://www.youtube.com/watch?v=_UoIHF3KUpE&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=84' },
          ],
        },
        {
          name: 'Day 15: Prefix Sum & Subarrays',
          problems: [
            { n: 'Prefix Sum Intro', t: 'Prefix Sum', d: 'Hashmap', l: 'E', u: 'https://www.youtube.com/watch?v=F86WfZ5RUC8&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=29' },
            { n: 'Subarray Sum 0', t: 'Prefix Sum + Set', d: 'Hashmap', l: 'M', u: 'https://www.youtube.com/watch?v=XLtRoHIDGs0&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=30' },
            { n: 'Number of Subarrays with Given Sum', t: 'Prefix Sum + Map', d: 'Hashmap', l: 'M', u: 'https://www.youtube.com/watch?v=sh0Ng7sjscE&list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&index=31' },
          ],
        },
        {
          name: 'Day 16: 1-D Dynamic Programming',
          problems: [
            { n: 'Fibonacci, Coin Change & Climbing Stairs (Use Any Resource)', t: '1D DP', d: 'Dynamic Programming', l: 'M' },
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
            { n: 'PrepInsta & GFG Full-Length Mocks (Exam Simulation)', t: 'Exam Simulation', d: 'Mocks', l: 'M' },
            { n: 'Identify & Review Wrong Questions in Aptitude & Verbal', t: 'Trap Review', d: 'Revision', l: 'E' },
            { n: 'Review Coding Edge Cases (Empty Array, Single Element, Large N)', t: 'Edge Cases', d: 'Revision', l: 'M' },
          ],
        },
      ],
    },
  ],
};
