import { useState } from "react";

const sections = [
  {
    id: "input",
    label: "Input Cases",
    color: "#3b82f6",
    intro: "Every possible input format you'll see. Nothing else exists.",
    cases: [
      {
        title: "Just a number",
        template: `int n; cin >> n;`,
        example: `Input:\n5`,
        note: "Most basic. Factorial, prime check, Armstrong."
      },
      {
        title: "Two numbers",
        template: `int a, b; cin >> a >> b;`,
        example: `Input:\n12 8`,
        note: "GCD, LCM, anything comparing two values."
      },
      {
        title: "Number then array",
        template: `int n; cin >> n;\nvector<int> arr(n);\nfor(int i=0;i<n;i++) cin >> arr[i];`,
        example: `Input:\n5\n3 1 4 1 5`,
        note: "Move zeros, rotate, second largest, duplicates."
      },
      {
        title: "Array elements each on new line",
        template: `int n; cin >> n;\nvector<int> arr(n);\nfor(int i=0;i<n;i++) cin >> arr[i];`,
        example: `Input:\n5\n3\n1\n4\n1\n5`,
        note: "Same cin code works. cin >> reads next number regardless of newline or space."
      },
      {
        title: "Just a string (no spaces)",
        template: `string s; cin >> s;`,
        example: `Input:\nmadam`,
        note: "Palindrome, reverse, anagram, character frequency."
      },
      {
        title: "String that may have spaces",
        template: `string s; getline(cin, s);`,
        example: `Input:\nhello world`,
        note: "Reverse words in sentence, word count problems."
      },
      {
        title: "Number then string",
        template: `int n; cin >> n;\ncin.ignore();\nstring s; getline(cin, s);`,
        example: `Input:\n3\nhello world test`,
        note: "MOST IMPORTANT — forget cin.ignore() and getline reads empty string."
      },
      {
        title: "Two strings",
        template: `string s1, s2; cin >> s1 >> s2;`,
        example: `Input:\nlisten silent`,
        note: "Anagram check, substring check."
      },
      {
        title: "Number then two numbers (like GCD with test cases)",
        template: `int t; cin >> t;\nwhile(t--){\n    int a, b; cin >> a >> b;\n    // solve\n}`,
        example: `Input:\n3\n12 8\n15 5\n9 6`,
        note: "Multiple test cases — t cases follow. Wrap your logic in while(t--)."
      },
      {
        title: "Array size not given",
        template: `vector<int> arr;\nint x;\nwhile(cin >> x) arr.push_back(x);`,
        example: `Input:\n3 1 4 1 5`,
        note: "Rare but happens. Read till end of input."
      }
    ]
  },
  {
    id: "output",
    label: "Output Cases",
    color: "#8b5cf6",
    intro: "Every output variation TCS uses. Read the problem statement last line carefully.",
    cases: [
      {
        title: "Yes / No",
        template: `cout << (condition ? "Yes" : "No");`,
        example: `Is madam a palindrome?\nOutput: Yes`,
        note: "Most common. Check exact casing — sometimes YES/NO or yes/no."
      },
      {
        title: "Just a number",
        template: `cout << answer;`,
        example: `Find second largest in array.\nOutput: 4`,
        note: "No label, no extra text. Just the number."
      },
      {
        title: "Space separated elements",
        template: `for(int x : arr) cout << x << " ";`,
        example: `After moving zeros to end:\nOutput: 1 3 5 0 0`,
        note: "Trailing space is usually fine in TCS judge."
      },
      {
        title: "Newline separated elements",
        template: `for(int x : arr) cout << x << "\\n";`,
        example: `Print sorted array:\nOutput:\n1\n3\n5`,
        note: "Use \\n not endl for speed."
      },
      {
        title: "Found / Not Found with index",
        template: `if(found) cout << "Found at index " << idx;\nelse cout << "Not Found";`,
        example: `Search 4 in array.\nOutput: Found at index 2`,
        note: "Binary search problems. Sometimes just index, sometimes message."
      },
      {
        title: "Prime / Not Prime",
        template: `cout << (isPrime(n) ? "Prime" : "Not Prime");`,
        example: `Is 17 prime?\nOutput: Prime`,
        note: "Self explanatory."
      },
      {
        title: "Count only",
        template: `cout << count;`,
        example: `How many duplicates?\nOutput: 2`,
        note: "Don't print the elements, just how many."
      },
      {
        title: "Pattern (no specific output var)",
        template: `// just print inside the loop itself`,
        example: `Print triangle of 3 rows:\nOutput:\n*\n**\n***`,
        note: "Nothing to store. Print directly inside nested loops."
      }
    ]
  },
  {
    id: "framing",
    label: "How TCS Frames Questions",
    color: "#10b981",
    intro: "TCS always wraps simple logic in a real-world story. Here's how to decode them instantly.",
    cases: [
      {
        title: "Move Zeros to End",
        template: `STORY:\n"A chocolate factory packs chocolates into packets.\nArray represents packets. 0 = empty packet.\nPush all empty packets to the end of conveyor belt."\n\nDECODE: arr = [3,0,1,0,5] → [3,1,5,0,0]\nIT IS JUST: Move zeros to end.`,
        example: `Input:\n5\n3 0 1 0 5\n\nOutput:\n3 1 5 0 0`,
        note: "Keywords: empty, push to end, zeros, conveyor."
      },
      {
        title: "Find Duplicate",
        template: `STORY:\n"A company has employee IDs. Due to system error\none ID was assigned twice. Find the duplicate ID."\n\nDECODE: arr = [1,3,4,2,3] → answer is 3\nIT IS JUST: Find duplicate element.`,
        example: `Input:\n5\n1 3 4 2 3\n\nOutput:\n3`,
        note: "Keywords: error, assigned twice, repeated, find the faulty."
      },
      {
        title: "Rotate Array",
        template: `STORY:\n"N soldiers standing in a row. Commander orders\nthem to rotate k positions to the right. Print\nnew arrangement."\n\nDECODE: arr=[1,2,3,4,5], k=2 → [4,5,1,2,3]\nIT IS JUST: Rotate array right by k.`,
        example: `Input:\n5 2\n1 2 3 4 5\n\nOutput:\n4 5 1 2 3`,
        note: "Keywords: rotate, shift, positions, arrangement, row."
      },
      {
        title: "Second Largest",
        template: `STORY:\n"In a school competition, find the student who\nscored the second highest marks. Print their score."\n\nDECODE: arr=[45,78,90,62,78] → answer is 78\nIT IS JUST: Second largest element.`,
        example: `Input:\n5\n45 78 90 62 78\n\nOutput:\n78`,
        note: "Keywords: second highest, runner-up, second maximum, silver."
      },
      {
        title: "Palindrome",
        template: `STORY:\n"A string is said to be magical if it reads\nthe same from left to right and right to left.\nCheck if given string is magical."\n\nDECODE: s = "racecar" → Yes\nIT IS JUST: Palindrome check.`,
        example: `Input:\nracecar\n\nOutput:\nYes`,
        note: "Keywords: magical, mirror, same forwards backwards, symmetric."
      },
      {
        title: "Anagram",
        template: `STORY:\n"Two players each pick a word. They can rearrange\nletters of their word. Check if both can form\nthe same word."\n\nDECODE: s1="listen" s2="silent" → Yes\nIT IS JUST: Anagram check.`,
        example: `Input:\nlisten silent\n\nOutput:\nYes`,
        note: "Keywords: rearrange, same letters, permutation, jumbled."
      },
      {
        title: "Prime",
        template: `STORY:\n"A number is called special if it has no factors\nother than 1 and itself. Check if N is special."\n\nDECODE: n=17 → Special / Prime\nIT IS JUST: Prime check.`,
        example: `Input:\n17\n\nOutput:\nSpecial`,
        note: "Keywords: special, no factors, only 1 and itself, indivisible."
      },
      {
        title: "Armstrong",
        template: `STORY:\n"A number is called a perfect number if the sum\nof cubes of its digits equals the number itself.\nCheck if N is perfect."\n\nDECODE: n=153 → 1³+5³+3³=153 → Yes\nIT IS JUST: Armstrong check.`,
        example: `Input:\n153\n\nOutput:\nYes`,
        note: "Keywords: perfect, sum of powers of digits, narcissistic."
      },
      {
        title: "Subarray Sum",
        template: `STORY:\n"A shopkeeper has daily sales records. Find if\nthere exists a consecutive period where total\nsales equal exactly target T."\n\nDECODE: arr=[1,4,2,3], T=6 → Yes (4+2)\nIT IS JUST: Subarray with given sum.`,
        example: `Input:\n4 6\n1 4 2 3\n\nOutput:\nYes`,
        note: "Keywords: consecutive, period, total equals, contiguous."
      },
      {
        title: "GCD / LCM",
        template: `STORY:\n"Two machines complete a cycle in A and B seconds.\nFind when they will both complete a cycle together."\n\nDECODE: a=12, b=8 → LCM=24\nIT IS JUST: LCM of two numbers.`,
        example: `Input:\n12 8\n\nOutput:\n24`,
        note: "Keywords: together, same time, common, both complete — that's LCM.\nKeywords: largest common, shared factor — that's GCD."
      }
    ]
  },
  {
    id: "strategy",
    label: "Exam Strategy",
    color: "#f59e0b",
    intro: "What to do from the moment you read a question to the moment you submit.",
    cases: [
      {
        title: "Step 1 — Ignore the story, read last 2 lines",
        template: `The last 2 lines of every TCS question are:\n- "Given array of N elements, find..."\n- "Print the result"\n\nThe story is decoration. The actual task is always\nin the last 1-2 lines. Read those first.`,
        example: `"A factory... workers... shifts... given array of\nN numbers find the second largest element.\nPrint the answer."\n\n→ You read: second largest → done, you know the code.`,
        note: "Save 2 minutes by skipping the story on first read."
      },
      {
        title: "Step 2 — Identify input format from examples",
        template: `Every question gives sample input/output.\nLook at the sample input:\n- Is n given? → cin >> n\n- Numbers on one line? → cin in loop\n- String? → getline\n- Number before string? → cin.ignore() first`,
        example: `Sample Input:\n5\n3 0 1 0 5\n\n→ First line is n=5\n→ Second line is array\n→ Use: cin>>n, then loop cin>>arr[i]`,
        note: "Always decode input from the example, not from the paragraph."
      },
      {
        title: "Step 3 — Check output format exactly",
        template: `Sample output tells you exactly what to print.\nMatch it character for character:\n- "Yes" not "YES" not "yes"\n- "Not Found" not "not found"\n- Space separated or newline?`,
        example: `Sample Output:\n3 1 5 0 0\n\n→ Space separated, no label\n→ for(int x:arr) cout << x << " ";`,
        note: "Wrong output format = 0 marks even if logic is correct."
      },
      {
        title: "Step 4 — Edge cases to always check",
        template: `Before submitting mentally run:\n1. What if n=1? (single element)\n2. What if all elements are same?\n3. What if answer is 0 or negative?\n4. Can numbers be large? → use long long`,
        example: `Second largest: arr=[5]\n→ No second element exists\n→ Handle: if(second == INT_MIN) cout << -1;`,
        note: "TCS always has at least one edge case test. These 4 cover 90% of them."
      },
      {
        title: "Time split for 2 questions",
        template: `Total time: 30 minutes for 2 questions\n\nQuestion 1 (simpler):\n- Read + identify: 3 min\n- Code + test: 10 min\n- Submit: 13 min total\n\nQuestion 2 (harder):\n- Remaining 17 min\n- Even partial output = partial marks`,
        example: `If Q2 is hard:\n→ Get the easy test cases passing\n→ Don't spend 25 min on one edge case\n→ Partial > zero`,
        note: "TCS gives partial marks per test case. A working solution for 5/10 cases beats a perfect solution you didn't finish."
      }
    ]
  }
];

export const TcsFramingGuide = () => {
  const [activeSection, setActiveSection] = useState("input");
  const [openCase, setOpenCase] = useState<number | null>(null);

  const section = sections.find(s => s.id === activeSection) || sections[0];

  return (
    <div className="w-full bg-[#0f172a] text-[#e2e8f0] font-sans rounded-2xl overflow-hidden border border-zinc-800" style={{
      fontFamily: "'Inter', system-ui, sans-serif"
    }}>
      <div className="p-4 sm:p-6 md:p-8">

        <div style={{ marginBottom: "28px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "2px", color: "#475569", textTransform: "uppercase", marginBottom: "6px" }}>TCS NQT Prep</div>
          <h1 style={{ fontSize: "24px", fontWeight: "700", margin: 0, color: "#f1f5f9" }}>Question Framing Guide</h1>
          <p style={{ margin: "6px 0 0", color: "#64748b", fontSize: "14px" }}>
            Every input case · Every output case · How TCS wraps real questions in stories
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
          {sections.map(s => (
            <button key={s.id} onClick={() => { setActiveSection(s.id); setOpenCase(null); }}
              style={{
                padding: "8px 18px", borderRadius: "8px", border: "none",
                cursor: "pointer", fontSize: "13px", fontWeight: "600",
                background: activeSection === s.id ? s.color : "#1e293b",
                color: activeSection === s.id ? "#fff" : "#94a3b8",
                transition: "all 0.15s"
              }}>{s.label}</button>
          ))}
        </div>

        {/* Intro */}
        <div style={{
          background: "#1e293b", borderRadius: "8px", padding: "12px 16px",
          marginBottom: "16px", fontSize: "13px", color: "#94a3b8",
          borderLeft: `3px solid ${section.color}`
        }}>
          {section.intro}
        </div>

        {/* Cases */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {section.cases.map((c, idx) => {
            const isOpen = openCase === idx;
            return (
              <div key={idx} style={{
                background: "#1e293b", borderRadius: "10px",
                border: `1px solid ${isOpen ? section.color + "55" : "#334155"}`,
                overflow: "hidden"
              }}>
                <button onClick={() => setOpenCase(isOpen ? null : idx)}
                  style={{
                    width: "100%", display: "flex", justifyContent: "space-between",
                    alignItems: "center", padding: "14px 18px",
                    background: "none", border: "none", cursor: "pointer",
                    color: "#f1f5f9", textAlign: "left"
                  }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{
                      width: "26px", height: "26px", borderRadius: "6px",
                      background: section.color + "22", color: section.color,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "11px", fontWeight: "700", flexShrink: 0
                    }}>{idx + 1}</span>
                    <span style={{ fontSize: "14px", fontWeight: "600" }}>{c.title}</span>
                  </div>
                  <span style={{ color: "#475569" }}>{isOpen ? "▲" : "▼"}</span>
                </button>

                {isOpen && (
                  <div style={{ padding: "0 18px 18px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    {/* Template/Decode */}
                    <div>
                      <div style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "1.5px", color: section.color, textTransform: "uppercase", marginBottom: "8px" }}>
                        {activeSection === "framing" ? "Decode" : activeSection === "strategy" ? "How" : "Code"}
                      </div>
                      <pre style={{
                        background: "#0f172a", border: "1px solid #334155",
                        borderRadius: "8px", padding: "12px", fontSize: "12px",
                        lineHeight: "1.7", color: "#a5f3fc",
                        overflowX: "auto", margin: 0, whiteSpace: "pre-wrap"
                      }}>{c.template}</pre>
                    </div>

                    {/* Example */}
                    <div>
                      <div style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "1.5px", color: "#64748b", textTransform: "uppercase", marginBottom: "8px" }}>
                        Example
                      </div>
                      <pre style={{
                        background: "#0f172a", border: "1px solid #334155",
                        borderRadius: "8px", padding: "12px", fontSize: "12px",
                        lineHeight: "1.7", color: "#86efac",
                        overflowX: "auto", margin: 0, whiteSpace: "pre-wrap"
                      }}>{c.example}</pre>
                    </div>

                    {/* Note */}
                    <div style={{ gridColumn: "1 / -1" }}>
                      <div style={{
                        background: "#0f172a", border: "1px solid #f59e0b33",
                        borderRadius: "8px", padding: "10px 14px",
                        fontSize: "13px", color: "#94a3b8"
                      }}>
                        <span style={{ color: "#fbbf24", fontWeight: "700" }}>Note: </span>
                        {c.note}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom reminder */}
        <div style={{
          marginTop: "24px", padding: "14px 18px",
          background: "#1e293b", borderRadius: "10px",
          border: "1px solid #334155", fontSize: "13px",
          color: "#64748b", lineHeight: "1.8"
        }}>
          <div style={{ color: "#f1f5f9", fontWeight: "700", marginBottom: "6px" }}>One line summary</div>
          <div>Read last 2 lines of question → spot keyword → recall pattern → copy your template → match input from example → match output label exactly → submit.</div>
        </div>
      </div>
    </div>
  );
};
