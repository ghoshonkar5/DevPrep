import { useState } from "react";
import { Copy, Check } from "lucide-react";

const topics = [
  {
    id: "arrays",
    label: "Arrays",
    color: "#3b82f6",
    problems: [
      {
        title: "Second Largest",
        recognize: [
          "\"find the second largest/smallest element\"",
          "\"second maximum in array\"",
          "Keywords: second, largest, maximum, array"
        ],
        trap: "Don't sort and pick index n-2 blindly — duplicates will fool you (e.g. [5,5,3] → answer is 3, not 5).",
        code: `#include <bits/stdc++.h>
using namespace std;
int main(){
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0;i<n;i++) cin >> arr[i];

    int first = INT_MIN, second = INT_MIN;
    for(int x : arr){
        if(x > first){ second = first; first = x; }
        else if(x > second && x != first) second = x;
    }
    cout << second;
}`
      },
      {
        title: "Reverse Array In-Place",
        recognize: [
          "\"reverse the array without extra space\"",
          "\"reverse in-place\"",
          "Keywords: reverse, in-place, no extra array"
        ],
        trap: "If they say 'without extra space', use two-pointer. If no constraint, reverse() STL is fine.",
        code: `#include <bits/stdc++.h>
using namespace std;
int main(){
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0;i<n;i++) cin >> arr[i];

    int lo=0, hi=n-1;
    while(lo < hi){
        swap(arr[lo], arr[hi]);
        lo++; hi--;
    }
    for(int x : arr) cout << x << " ";
}`
      },
      {
        title: "Find Duplicates",
        recognize: [
          "\"find duplicate elements\"",
          "\"which elements appear more than once\"",
          "Keywords: duplicate, repeated, appears twice"
        ],
        trap: "If they want ALL duplicates, use map. If just yes/no, use set.",
        code: `#include <bits/stdc++.h>
using namespace std;
int main(){
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0;i<n;i++) cin >> arr[i];

    map<int,int> freq;
    for(int x : arr) freq[x]++;

    for(auto& p : freq)
        if(p.second > 1)
            cout << p.first << " ";
}`
      },
      {
        title: "Move Zeros to End",
        recognize: [
          "\"move all zeros to end\"",
          "\"push empty packets to end\"",
          "Keywords: zero, end, push, maintain order"
        ],
        trap: "Order of non-zero elements must be preserved — don't just count zeros.",
        code: `#include <bits/stdc++.h>
using namespace std;
int main(){
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0;i<n;i++) cin >> arr[i];

    int pos = 0;
    for(int i=0;i<n;i++)
        if(arr[i] != 0) arr[pos++] = arr[i];
    while(pos < n) arr[pos++] = 0;

    for(int x : arr) cout << x << " ";
}`
      },
      {
        title: "Rotate Array",
        recognize: [
          "\"rotate array by k positions\"",
          "\"shift elements to the right/left\"",
          "Keywords: rotate, shift, k times, positions"
        ],
        trap: "k can be > n. Always do k = k % n first.",
        code: `#include <bits/stdc++.h>
using namespace std;
int main(){
    int n,k; cin >> n >> k;
    vector<int> arr(n);
    for(int i=0;i<n;i++) cin >> arr[i];

    k = k % n; // handles k > n
    // rotate right by k
    reverse(arr.begin(), arr.end()-k);  // wait — simpler:
    reverse(arr.begin(), arr.end());
    reverse(arr.begin(), arr.begin()+k);
    reverse(arr.begin()+k, arr.end());

    for(int x : arr) cout << x << " ";
}`
      },
      {
        title: "Subarray Sum (equals K)",
        recognize: [
          "\"find subarray with given sum\"",
          "\"count subarrays whose sum equals k\"",
          "Keywords: subarray, sum, contiguous, equals"
        ],
        trap: "If all elements are positive, use sliding window. If negatives possible, use prefix sum + map.",
        code: `#include <bits/stdc++.h>
using namespace std;
int main(){
    int n,k; cin >> n >> k;
    vector<int> arr(n);
    for(int i=0;i<n;i++) cin >> arr[i];

    // Sliding window (all positive elements)
    int lo=0, sum=0, count=0;
    for(int hi=0;hi<n;hi++){
        sum += arr[hi];
        while(sum > k && lo <= hi){ sum -= arr[lo]; lo++; }
        if(sum == k) count++;
    }
    cout << count;
}`
      }
    ]
  },
  {
    id: "strings",
    label: "Strings",
    color: "#8b5cf6",
    problems: [
      {
        title: "Palindrome Check",
        recognize: [
          "\"check if string/number reads same forwards and backwards\"",
          "\"is it a palindrome\"",
          "Keywords: palindrome, reverse, same, mirror"
        ],
        trap: "For numbers, convert to string first. Case sensitivity — ask or assume lowercase.",
        code: `#include <bits/stdc++.h>
using namespace std;
int main(){
    string s; cin >> s;
    string rev = s;
    reverse(rev.begin(), rev.end());
    cout << (s == rev ? "Yes" : "No");
}`
      },
      {
        title: "Reverse a String",
        recognize: [
          "\"reverse the string\"",
          "\"print string backwards\"",
          "Keywords: reverse, backwards, mirror string"
        ],
        trap: "If they say 'reverse words in a sentence' — that's different! Split by space, reverse each word or reverse order.",
        code: `#include <bits/stdc++.h>
using namespace std;
int main(){
    string s;
    getline(cin, s); // use getline if spaces possible
    reverse(s.begin(), s.end());
    cout << s;
    
    // Reverse words in sentence:
    // stringstream ss(s);
    // vector<string> words;
    // string w;
    // while(ss >> w) words.push_back(w);
    // reverse(words.begin(), words.end());
    // for(auto& wd : words) cout << wd << " ";
}`
      },
      {
        title: "Anagram Check",
        recognize: [
          "\"check if two strings are anagrams\"",
          "\"same characters different order\"",
          "Keywords: anagram, rearrange, same letters, permutation"
        ],
        trap: "Length must be equal first. Sort both and compare — simplest approach.",
        code: `#include <bits/stdc++.h>
using namespace std;
int main(){
    string s1, s2;
    cin >> s1 >> s2;

    if(s1.length() != s2.length()){ cout << "No"; return 0; }

    sort(s1.begin(), s1.end());
    sort(s2.begin(), s2.end());
    cout << (s1 == s2 ? "Yes" : "No");
}`
      },
      {
        title: "Character Frequency",
        recognize: [
          "\"count frequency of each character\"",
          "\"how many times each letter appears\"",
          "Keywords: frequency, count, occurrence, each character"
        ],
        trap: "Check if they want only letters, or digits too. Check if case-sensitive.",
        code: `#include <bits/stdc++.h>
using namespace std;
int main(){
    string s; cin >> s;
    map<char,int> freq;
    for(char c : s) freq[c]++;
    for(auto& p : freq)
        cout << p.first << " -> " << p.second << "\n";
}`
      },
      {
        title: "Substring Check / Count",
        recognize: [
          "\"check if one string is substring of another\"",
          "\"count occurrences of pattern in string\"",
          "Keywords: substring, contains, pattern, occurrences, find"
        ],
        trap: "string::find() returns string::npos if not found — always check this.",
        code: `#include <bits/stdc++.h>
using namespace std;
int main(){
    string s, pat;
    cin >> s >> pat;

    // Check if substring exists
    if(s.find(pat) != string::npos)
        cout << "Found at index " << s.find(pat);
    else
        cout << "Not found";

    // Count occurrences
    int count = 0, pos = 0;
    while((pos = s.find(pat, pos)) != string::npos){ count++; pos++; }
    cout << "\nCount: " << count;
}`
      }
    ]
  },
  {
    id: "math",
    label: "Maths",
    color: "#10b981",
    problems: [
      {
        title: "Prime Check",
        recognize: [
          "\"check if number is prime\"",
          "\"find all primes up to N\"",
          "Keywords: prime, divisible only by 1 and itself, Sieve"
        ],
        trap: "For single number: loop till sqrt(n). For range of primes: use Sieve — much faster.",
        code: `#include <bits/stdc++.h>
using namespace std;

// Single number check
bool isPrime(int n){
    if(n < 2) return false;
    for(int i=2; i*i<=n; i++)
        if(n%i==0) return false;
    return true;
}

// Sieve — all primes up to N
void sieve(int n){
    vector<bool> is_prime(n+1, true);
    is_prime[0] = is_prime[1] = false;
    for(int i=2; i*i<=n; i++)
        if(is_prime[i])
            for(int j=i*i; j<=n; j+=i)
                is_prime[j] = false;
    for(int i=2;i<=n;i++)
        if(is_prime[i]) cout << i << " ";
}

int main(){
    int n; cin >> n;
    cout << (isPrime(n) ? "Prime" : "Not Prime");
}`
      },
      {
        title: "Fibonacci",
        recognize: [
          "\"print N terms of fibonacci\"",
          "\"find Nth fibonacci number\"",
          "Keywords: fibonacci, sequence, 0 1 1 2 3 5, series"
        ],
        trap: "Clarify: 0-indexed or 1-indexed? Is 0 the first term or is 1?",
        code: `#include <bits/stdc++.h>
using namespace std;
int main(){
    int n; cin >> n;
    long long a=0, b=1;
    for(int i=0;i<n;i++){
        cout << a << " ";
        long long c = a+b;
        a = b; b = c;
    }
}`
      },
      {
        title: "Factorial",
        recognize: [
          "\"find factorial of N\"",
          "\"N!\"",
          "Keywords: factorial, product, N!, multiply all"
        ],
        trap: "Use long long — factorial grows fast. 20! already overflows int.",
        code: `#include <bits/stdc++.h>
using namespace std;
int main(){
    int n; cin >> n;
    long long fact = 1;
    for(int i=2;i<=n;i++) fact *= i;
    cout << fact;
}`
      },
      {
        title: "Armstrong Number",
        recognize: [
          "\"check if Armstrong number\"",
          "\"sum of cubes of digits equals number\"",
          "Keywords: Armstrong, narcissistic, sum of powers of digits"
        ],
        trap: "Power = number of digits, not always 3. 153 = 1³+5³+3³ (3 digits). 1634 = 1⁴+6⁴+3⁴+4⁴ (4 digits).",
        code: `#include <bits/stdc++.h>
using namespace std;
int main(){
    int n; cin >> n;
    int temp = n, digits = to_string(n).length();
    int sum = 0;
    while(temp > 0){
        int d = temp % 10;
        sum += pow(d, digits);
        temp /= 10;
    }
    cout << (sum == n ? "Armstrong" : "Not Armstrong");
}`
      },
      {
        title: "GCD and LCM",
        recognize: [
          "\"find GCD/HCF of two numbers\"",
          "\"find LCM of two numbers\"",
          "Keywords: GCD, HCF, LCM, common factor, common multiple"
        ],
        trap: "LCM formula: (a/gcd)*b — divide first to prevent overflow before multiplying.",
        code: `#include <bits/stdc++.h>
using namespace std;
int main(){
    long long a, b; cin >> a >> b;
    long long g = __gcd(a, b);
    long long l = (a / g) * b; // divide first!
    cout << "GCD: " << g << "\n";
    cout << "LCM: " << l;
}`
      }
    ]
  },
  {
    id: "patterns",
    label: "Patterns",
    color: "#f59e0b",
    problems: [
      {
        title: "Reading Any Pattern",
        recognize: [
          "Any question showing a triangle/pyramid of stars or numbers",
          "Keywords: pattern, rows, stars, pyramid, triangle, right-angled"
        ],
        trap: "Always identify: (1) how many rows, (2) what prints per row, (3) spaces before/after.",
        code: `// TEMPLATE — works for all patterns
// Ask yourself per row i (1 to n):
//   spaces before = ?
//   chars printed = ?

// Right triangle (stars)
// *
// **
// ***
for(int i=1;i<=n;i++){
    for(int j=1;j<=i;j++) cout << "*";
    cout << "\n";
}

// Inverted triangle
// ***
// **
// *
for(int i=n;i>=1;i--){
    for(int j=1;j<=i;j++) cout << "*";
    cout << "\n";
}

// Pyramid (centred)
//   *
//  ***
// *****
for(int i=1;i<=n;i++){
    for(int s=1;s<=n-i;s++) cout << " "; // spaces
    for(int j=1;j<=2*i-1;j++) cout << "*";
    cout << "\n";
}

// Number pattern (row number)
// 1
// 2 2
// 3 3 3
for(int i=1;i<=n;i++){
    for(int j=1;j<=i;j++) cout << i << " ";
    cout << "\n";
}`
      }
    ]
  },
  {
    id: "sorting",
    label: "Sorting & Search",
    color: "#ef4444",
    problems: [
      {
        title: "Bubble Sort",
        recognize: [
          "\"implement bubble sort\"",
          "\"sort using bubble sort\"",
          "Keywords: bubble sort, adjacent swap, implement sorting"
        ],
        trap: "TCS rarely asks you to implement sort from scratch — they ask 'use bubble sort' to test if you know it. Add the optimized break.",
        code: `#include <bits/stdc++.h>
using namespace std;
int main(){
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0;i<n;i++) cin >> arr[i];

    for(int i=0;i<n-1;i++){
        bool swapped = false;
        for(int j=0;j<n-i-1;j++){
            if(arr[j] > arr[j+1]){
                swap(arr[j], arr[j+1]);
                swapped = true;
            }
        }
        if(!swapped) break; // already sorted — optimization
    }
    for(int x : arr) cout << x << " ";
}`
      },
      {
        title: "Insertion Sort",
        recognize: [
          "\"implement insertion sort\"",
          "Keywords: insertion sort, insert, sorted portion"
        ],
        trap: "Think of it like sorting playing cards — pick one, insert into right position in sorted left part.",
        code: `#include <bits/stdc++.h>
using namespace std;
int main(){
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0;i<n;i++) cin >> arr[i];

    for(int i=1;i<n;i++){
        int key = arr[i];
        int j = i-1;
        while(j >= 0 && arr[j] > key){
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = key;
    }
    for(int x : arr) cout << x << " ";
}`
      },
      {
        title: "Binary Search",
        recognize: [
          "\"search in sorted array\"",
          "\"find element efficiently\"",
          "Keywords: sorted, search, find index, binary search, O(log n)"
        ],
        trap: "Array MUST be sorted. If not sorted, sort first then search. Use lo+(hi-lo)/2 not (lo+hi)/2.",
        code: `#include <bits/stdc++.h>
using namespace std;
int main(){
    int n, target; cin >> n >> target;
    vector<int> arr(n);
    for(int i=0;i<n;i++) cin >> arr[i];

    sort(arr.begin(), arr.end()); // sort first if needed

    int lo=0, hi=n-1, ans=-1;
    while(lo <= hi){
        int mid = lo + (hi-lo)/2;
        if(arr[mid] == target){ ans = mid; break; }
        else if(arr[mid] < target) lo = mid+1;
        else hi = mid-1;
    }
    cout << (ans == -1 ? "Not found" : "Found at index " + to_string(ans));
}`
      }
    ]
  }
];

const RecognizeTag = ({ text }: { text: string }) => (
  <span style={{
    display: "inline-block",
    background: "#1e293b",
    color: "#94a3b8",
    fontSize: "12px",
    padding: "3px 8px",
    borderRadius: "4px",
    marginRight: "6px",
    marginBottom: "6px",
    fontFamily: "monospace"
  }}>{text}</span>
);

export const TcsCppCheatSheet = () => {
  const [activeTopic, setActiveTopic] = useState("arrays");
  const [openProblem, setOpenProblem] = useState<number | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const topic = topics.find(t => t.id === activeTopic) || topics[0];

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="w-full bg-[#0f172a] text-[#e2e8f0] font-sans rounded-2xl overflow-hidden border border-zinc-800" style={{
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      <div className="p-4 sm:p-6 md:p-8">

        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "2px", color: "#475569", textTransform: "uppercase", marginBottom: "6px" }}>TCS NQT Prep</div>
          <h1 style={{ fontSize: "24px", fontWeight: "700", margin: 0, color: "#f1f5f9" }}>C++ Cheat Sheet</h1>
          <p style={{ margin: "6px 0 0", color: "#64748b", fontSize: "14px" }}>
            Pattern recognition + simplest working code for every topic
          </p>
        </div>

        {/* Topic Tabs */}
        <div style={{
          display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px"
        }}>
          {topics.map(t => (
            <button key={t.id} onClick={() => { setActiveTopic(t.id); setOpenProblem(null); }}
              style={{
                padding: "8px 18px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "600",
                background: activeTopic === t.id ? t.color : "#1e293b",
                color: activeTopic === t.id ? "#fff" : "#94a3b8",
                transition: "all 0.15s"
              }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Problems */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {topic.problems.map((p, idx) => {
            const isOpen = openProblem === idx;
            return (
              <div key={idx} style={{
                background: "#1e293b",
                borderRadius: "10px",
                border: `1px solid ${isOpen ? topic.color + "55" : "#334155"}`,
                overflow: "hidden",
                transition: "border-color 0.2s"
              }}>
                {/* Problem Header */}
                <button onClick={() => setOpenProblem(isOpen ? null : idx)}
                  style={{
                    width: "100%", display: "flex", justifyContent: "space-between",
                    alignItems: "center", padding: "16px 20px", background: "none",
                    border: "none", cursor: "pointer", color: "#f1f5f9", textAlign: "left"
                  }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{
                      width: "28px", height: "28px", borderRadius: "6px",
                      background: topic.color + "22", color: topic.color,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "12px", fontWeight: "700", flexShrink: 0
                    }}>{idx + 1}</span>
                    <span style={{ fontSize: "15px", fontWeight: "600" }}>{p.title}</span>
                  </div>
                  <span style={{ color: "#475569", fontSize: "18px" }}>{isOpen ? "▲" : "▼"}</span>
                </button>

                {/* Expanded Content */}
                {isOpen && (
                  <div style={{ padding: "0 20px 20px" }}>

                    {/* How to recognize */}
                    <div style={{ marginBottom: "16px" }}>
                      <div style={{
                        fontSize: "11px", fontWeight: "700", letterSpacing: "1.5px",
                        color: topic.color, textTransform: "uppercase", marginBottom: "10px"
                      }}>🔍 How to recognize</div>
                      <div>
                        {p.recognize.map((r, i) => <RecognizeTag key={i} text={r} />)}
                      </div>
                    </div>

                    {/* Watch out */}
                    <div style={{
                      background: "#0f172a",
                      border: "1px solid #f59e0b33",
                      borderRadius: "8px",
                      padding: "10px 14px",
                      marginBottom: "16px",
                      fontSize: "13px",
                      color: "#fbbf24"
                    }}>
                      <span style={{ fontWeight: "700" }}>⚠ Watch out: </span>
                      <span style={{ color: "#94a3b8" }}>{p.trap}</span>
                    </div>

                    {/* Code */}
                    <div style={{ position: "relative" }}>
                      <div style={{
                        fontSize: "11px", fontWeight: "700", letterSpacing: "1.5px",
                        color: "#475569", textTransform: "uppercase", marginBottom: "8px"
                      }}>Code</div>
                      <pre style={{
                        background: "#0f172a",
                        border: "1px solid #334155",
                        borderRadius: "8px",
                        padding: "16px",
                        fontSize: "13px",
                        lineHeight: "1.7",
                        color: "#a5f3fc",
                        overflowX: "auto",
                        margin: 0,
                        whiteSpace: "pre"
                      }}>{p.code}</pre>
                      <button
                        onClick={() => handleCopy(p.code, `${activeTopic}-${idx}`)}
                        style={{
                          position: "absolute", top: "36px", right: "12px",
                          background: copied === `${activeTopic}-${idx}` ? "#10b981" : "#1e293b",
                          color: copied === `${activeTopic}-${idx}` ? "#fff" : "#64748b",
                          border: "1px solid #334155",
                          borderRadius: "6px", padding: "4px 10px",
                          fontSize: "11px", cursor: "pointer", fontWeight: "600",
                          transition: "all 0.2s",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px"
                        }}>
                        {copied === `${activeTopic}-${idx}` ? (
                          <>
                            <Check className="w-3 h-3" /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" /> Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer tip */}
        <div style={{
          marginTop: "28px", padding: "14px 18px",
          background: "#1e293b", borderRadius: "10px",
          border: "1px solid #334155", fontSize: "13px", color: "#64748b",
          lineHeight: "1.6"
        }}>
          <span style={{ color: "#f1f5f9", fontWeight: "600" }}>Exam tip: </span>
          Always start with <code style={{ color: "#a5f3fc", background: "#0f172a", padding: "1px 5px", borderRadius: "3px" }}>#include &lt;bits/stdc++.h&gt;</code> + <code style={{ color: "#a5f3fc", background: "#0f172a", padding: "1px 5px", borderRadius: "3px" }}>ios_base::sync_with_stdio(false); cin.tie(NULL);</code> — and use <code style={{ color: "#a5f3fc", background: "#0f172a", padding: "1px 5px", borderRadius: "3px" }}>long long</code> whenever numbers could be large.
        </div>
      </div>
    </div>
  );
};
