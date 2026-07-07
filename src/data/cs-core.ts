import type { Roadmap } from './dsa';

export interface PriorityItem {
  subject: string;
  priority: 'Highest' | 'High' | 'Medium' | 'Low';
  priorityBadge: string;
  effort: string;
  whenItShowsUp: string;
}

export interface SkippedSubject {
  subject: string;
  reason: string;
}

export const PRIORITY_GUIDE: PriorityItem[] = [
  { subject: 'DSA', priority: 'Highest', priorityBadge: '🔴 Highest', effort: 'High', whenItShowsUp: 'Every single technical round' },
  { subject: 'OOPs', priority: 'Highest', priorityBadge: '🔴 Highest', effort: 'Medium', whenItShowsUp: 'Almost every technical round' },
  { subject: 'DBMS + SQL', priority: 'Highest', priorityBadge: '🔴 Highest', effort: 'Medium', whenItShowsUp: 'Nearly guaranteed in product companies' },
  { subject: 'OS', priority: 'High', priorityBadge: '🟠 High', effort: 'Medium', whenItShowsUp: 'Amazon, Microsoft, Flipkart' },
  { subject: 'Security', priority: 'High', priorityBadge: '🟠 High', effort: 'Low', whenItShowsUp: 'Whenever you discuss your project' },
  { subject: 'CN', priority: 'Medium', priorityBadge: '🟡 Medium', effort: 'Medium', whenItShowsUp: 'Backend / full-stack roles' },
  { subject: 'System Design', priority: 'Medium', priorityBadge: '🟡 Medium', effort: 'Low', whenItShowsUp: 'SDE-1 rounds, increasing trend' },
  { subject: 'SDLC / Git', priority: 'Low', priorityBadge: '🟢 Low', effort: 'Very Low', whenItShowsUp: 'HR-adjacent rounds' },
  { subject: 'Aptitude', priority: 'High', priorityBadge: '🟠 High', effort: 'High practice', whenItShowsUp: 'OA round before technical' },
];

export const SKIPPED_SUBJECTS: SkippedSubject[] = [
  { subject: 'Compiler Design', reason: 'Only relevant for compilers/PL research roles' },
  { subject: 'Theory of Computation', reason: 'Same — rarely touched in SDE interviews' },
  { subject: 'Digital Logic', reason: 'Hardware/embedded roles only' },
  { subject: 'Discrete Mathematics', reason: 'Skip unless weak on recursion/combinatorics for DSA' },
  { subject: 'COA', reason: 'Systems/hardware-adjacent roles only' },
];

export const CS_CORE_ROADMAP: Roadmap = {
  phases: [
    {
      id: 201,
      name: '1. OOPs (Object-Oriented Programming)',
      source: 'CS Core Subjects',
      subs: [
        {
          name: 'Core OOPs Concepts & Principles',
          problems: [
            { n: 'Classes & Objects', t: 'OOPs Fundamentals', d: 'Core', l: 'E', u: 'https://www.geeksforgeeks.org/c-classes-and-objects/' },
            { n: 'Constructors & Destructors', t: 'Lifecycle', d: 'Core', l: 'E', u: 'https://www.geeksforgeeks.org/constructors-c/' },
            { n: 'Inheritance (all types)', t: 'Code Reusability', d: 'Core', l: 'M', u: 'https://www.geeksforgeeks.org/inheritance-in-c/' },
            { n: 'Polymorphism', t: 'Static & Dynamic', d: 'Core', l: 'M', u: 'https://www.geeksforgeeks.org/polymorphism-in-c/' },
            { n: 'Encapsulation', t: 'Data Hiding', d: 'Core', l: 'E', u: 'https://www.geeksforgeeks.org/encapsulation-in-c/' },
            { n: 'Abstraction', t: 'Interface Contracts', d: 'Core', l: 'M', u: 'https://www.geeksforgeeks.org/abstraction-in-c/' },
            { n: 'Virtual Functions', t: 'Runtime Polymorphism', d: 'Advanced', l: 'H', u: 'https://www.geeksforgeeks.org/virtual-functions-and-runtime-polymorphism-in-c/' },
            { n: 'Abstract Classes & Interfaces', t: 'Pure Virtual Functions', d: 'Advanced', l: 'M', u: 'https://www.geeksforgeeks.org/pure-virtual-functions-and-abstract-classes/' },
            { n: 'Static & Dynamic Binding', t: 'Binding Time', d: 'Core', l: 'M', u: 'https://www.geeksforgeeks.org/static-and-dynamic-binding-in-cpp/' },
            { n: 'Friend Functions', t: 'Access Override', d: 'C++ Specific', l: 'M', u: 'https://www.geeksforgeeks.org/friend-class-function-cpp/' },
            { n: 'Operator Overloading', t: 'Custom Operators', d: 'C++ Specific', l: 'M', u: 'https://www.geeksforgeeks.org/operator-overloading-cpp/' },
            { n: 'Access Modifiers', t: 'Public, Private, Protected', d: 'Core', l: 'E', u: 'https://www.geeksforgeeks.org/access-modifiers-in-c/' },
            { n: 'SOLID Principles', t: 'Architecture Best Practices', d: 'Design Principles', l: 'H', u: 'https://www.geeksforgeeks.org/solid-principle-in-programming-understand-with-real-life-examples/' },
          ],
        },
        {
          name: 'Design Patterns',
          problems: [
            { n: 'Singleton Pattern', t: 'Creational Pattern', d: 'Design Patterns', l: 'M', u: 'https://www.geeksforgeeks.org/singleton-design-pattern/' },
            { n: 'Factory Pattern', t: 'Creational Pattern', d: 'Design Patterns', l: 'M', u: 'https://www.geeksforgeeks.org/factory-method-design-pattern-in-java/' },
            { n: 'Observer Pattern', t: 'Behavioral Pattern', d: 'Design Patterns', l: 'M', u: 'https://www.geeksforgeeks.org/observer-pattern-set-1-introduction/' },
            { n: 'Strategy Pattern', t: 'Behavioral Pattern', d: 'Design Patterns', l: 'M', u: 'https://www.geeksforgeeks.org/strategy-pattern-set-1/' },
            { n: 'Design Patterns Overview', t: 'Creational, Structural, Behavioral', d: 'Design Patterns', l: 'H', u: 'https://www.geeksforgeeks.org/software-design-patterns/' },
          ],
        },
        {
          name: 'Quick Revision & Interview Q&A',
          problems: [
            { n: 'Last Minute Notes', t: 'Rapid Revision', d: 'Cheatsheet', l: 'E', u: 'https://www.geeksforgeeks.org/last-minute-notes-object-oriented-programming/' },
            { n: 'OOPs Interview Questions', t: 'Top Questions', d: 'Interview Prep', l: 'M', u: 'https://www.geeksforgeeks.org/oops-interview-questions/' },
            { n: 'Design Patterns Interview Questions', t: 'Top Questions', d: 'Interview Prep', l: 'H', u: 'https://www.geeksforgeeks.org/design-patterns-interview-questions/' },
          ],
        },
      ],
    },
    {
      id: 202,
      name: '2. DBMS (Database Management Systems)',
      source: 'CS Core Subjects',
      subs: [
        {
          name: 'Relational Model & SQL Fundamentals',
          problems: [
            { n: 'Keys (Primary, Foreign, Candidate etc)', t: 'Relational Model', d: 'Core DBMS', l: 'E', u: 'https://www.geeksforgeeks.org/types-of-keys-in-relational-model/' },
            { n: 'ER Diagram', t: 'Entity-Relationship Model', d: 'Schema Design', l: 'E', u: 'https://www.geeksforgeeks.org/introduction-of-er-model/' },
            { n: 'Normalization (1NF to BCNF)', t: 'Redundancy Removal', d: 'Schema Design', l: 'H', u: 'https://www.geeksforgeeks.org/normal-forms-in-dbms/' },
            { n: 'Joins (all types)', t: 'Inner, Left, Right, Full Joins', d: 'SQL Queries', l: 'M', u: 'https://www.geeksforgeeks.org/sql-join-set-1-inner-left-right-and-full-joins/' },
            { n: 'Aggregate Functions', t: 'COUNT, SUM, AVG, MIN, MAX', d: 'SQL Queries', l: 'E', u: 'https://www.geeksforgeeks.org/aggregate-functions-in-sql/' },
            { n: 'SQL Queries Practice', t: 'Real-world Query Practice', d: 'SQL Queries', l: 'M', u: 'https://www.geeksforgeeks.org/sql-query-interview-questions/' },
          ],
        },
        {
          name: 'Transactions, Storage & Indexing',
          problems: [
            { n: 'Transactions & ACID', t: 'Atomicity, Consistency, Isolation, Durability', d: 'Transactions', l: 'M', u: 'https://www.geeksforgeeks.org/acid-properties-in-dbms/' },
            { n: 'Isolation Levels', t: 'Read Uncommitted to Serializable', d: 'Transactions', l: 'H', u: 'https://www.geeksforgeeks.org/transaction-isolation-levels-dbms/' },
            { n: 'Indexing', t: 'Database Performance', d: 'Storage & Indexing', l: 'M', u: 'https://www.geeksforgeeks.org/indexing-in-databases-set-1/' },
            { n: 'B & B+ Trees', t: 'Tree Index Structures', d: 'Storage & Indexing', l: 'H', u: 'https://www.geeksforgeeks.org/introduction-of-b-tree/' },
            { n: 'Concurrency Control', t: 'Locking & Timestamp Protocols', d: 'Transactions', l: 'H', u: 'https://www.geeksforgeeks.org/concurrency-control-in-dbms/' },
            { n: 'Deadlock in DBMS', t: 'Detection & Prevention', d: 'Transactions', l: 'M', u: 'https://www.geeksforgeeks.org/deadlock-in-dbms/' },
            { n: 'Views', t: 'Virtual Tables', d: 'SQL Objects', l: 'E', u: 'https://www.geeksforgeeks.org/sql-views/' },
            { n: 'Triggers', t: 'Automated Events', d: 'SQL Objects', l: 'M', u: 'https://www.geeksforgeeks.org/sql-trigger-student-database/' },
            { n: 'Stored Procedures', t: 'Precompiled SQL', d: 'SQL Objects', l: 'M', u: 'https://www.geeksforgeeks.org/what-is-stored-procedures-in-sql/' },
          ],
        },
        {
          name: 'NoSQL & Quick Revision',
          problems: [
            { n: 'SQL vs NoSQL', t: 'Relational vs Document/KV', d: 'Architecture', l: 'M', u: 'https://www.geeksforgeeks.org/difference-between-sql-and-nosql/' },
            { n: 'When to use SQL vs NoSQL', t: 'Use-case Selection', d: 'Architecture', l: 'M', u: 'https://www.geeksforgeeks.org/sql-vs-nosql-which-one-is-better-to-use/' },
            { n: 'Last Minute Notes', t: 'Rapid Revision', d: 'Cheatsheet', l: 'E', u: 'https://www.geeksforgeeks.org/last-minute-notes-dbms/' },
            { n: 'SQL Cheatsheet', t: 'Syntax Guide', d: 'Cheatsheet', l: 'E', u: 'https://www.geeksforgeeks.org/sql-cheat-sheet/' },
            { n: 'SQL Interview Questions', t: 'Top Questions', d: 'Interview Prep', l: 'H', u: 'https://www.geeksforgeeks.org/sql-interview-questions/' },
          ],
        },
      ],
    },
    {
      id: 203,
      name: '3. Operating Systems',
      source: 'CS Core Subjects',
      subs: [
        {
          name: 'Processes, Threads & Scheduling',
          problems: [
            { n: 'Process vs Thread', t: 'Execution Units', d: 'Core OS', l: 'E', u: 'https://www.geeksforgeeks.org/difference-between-process-and-thread/' },
            { n: 'Process Scheduling Algorithms', t: 'FCFS, SJF, RR, Priority', d: 'CPU Scheduling', l: 'M', u: 'https://www.geeksforgeeks.org/cpu-scheduling-in-operating-systems/' },
            { n: 'Context Switching', t: 'State Save & Restore', d: 'CPU Scheduling', l: 'M', u: 'https://www.geeksforgeeks.org/context-switch-in-operating-system/' },
            { n: 'Inter Process Communication', t: 'Pipes, Message Queues, Shared Mem', d: 'IPC', l: 'M', u: 'https://www.geeksforgeeks.org/inter-process-communication-ipc/' },
            { n: 'System Calls', t: 'User to Kernel Mode Transition', d: 'Core OS', l: 'M', u: 'https://www.geeksforgeeks.org/introduction-of-system-call/' },
          ],
        },
        {
          name: 'Memory Management & Synchronization',
          problems: [
            { n: 'Memory Management', t: 'Allocation & Tracking', d: 'Memory', l: 'M', u: 'https://www.geeksforgeeks.org/memory-management-in-operating-system/' },
            { n: 'Paging & Segmentation', t: 'Non-contiguous Memory', d: 'Memory', l: 'H', u: 'https://www.geeksforgeeks.org/paging-in-operating-system/' },
            { n: 'Page Replacement Algorithms', t: 'FIFO, LRU, Optimal', d: 'Memory', l: 'H', u: 'https://www.geeksforgeeks.org/page-replacement-algorithms-in-operating-systems/' },
            { n: 'Virtual Memory', t: 'Illusion of Large Memory', d: 'Memory', l: 'M', u: 'https://www.geeksforgeeks.org/virtual-memory-in-operating-system/' },
            { n: 'Thrashing', t: 'High Page Fault Rate', d: 'Memory', l: 'M', u: 'https://www.geeksforgeeks.org/techniques-to-handle-thrashing/' },
            { n: 'Semaphores & Mutex', t: 'Process Synchronization', d: 'Concurrency', l: 'H', u: 'https://www.geeksforgeeks.org/semaphores-in-process-synchronization/' },
            { n: 'Spinlock vs Mutex', t: 'Busy Waiting vs Sleeping', d: 'Concurrency', l: 'M', u: 'https://www.geeksforgeeks.org/difference-between-spinlock-and-mutex/' },
          ],
        },
        {
          name: 'Deadlocks & Quick Revision',
          problems: [
            { n: 'Deadlock (conditions, prevention, avoidance)', t: 'Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait', d: 'Deadlocks', l: 'H', u: 'https://www.geeksforgeeks.org/deadlock-in-operating-system/' },
            { n: "Banker's Algorithm", t: 'Deadlock Avoidance', d: 'Deadlocks', l: 'H', u: 'https://www.geeksforgeeks.org/bankers-algorithm-in-operating-system/' },
            { n: 'Last Minute Notes', t: 'Rapid Revision', d: 'Cheatsheet', l: 'E', u: 'https://www.geeksforgeeks.org/last-minute-notes-operating-systems/' },
          ],
        },
      ],
    },
    {
      id: 204,
      name: '4. Computer Networks',
      source: 'CS Core Subjects',
      subs: [
        {
          name: 'Network Models & Layers',
          problems: [
            { n: 'OSI Model (all 7 layers)', t: 'Physical to Application Layer', d: 'Network Models', l: 'E', u: 'https://www.geeksforgeeks.org/open-systems-interconnection-model-osi/' },
            { n: 'TCP/IP Model', t: '4-Layer Architecture', d: 'Network Models', l: 'E', u: 'https://www.geeksforgeeks.org/tcp-ip-model/' },
            { n: 'TCP vs UDP', t: 'Connection-oriented vs Connectionless', d: 'Transport Layer', l: 'M', u: 'https://www.geeksforgeeks.org/differences-between-tcp-and-udp/' },
            { n: 'HTTP vs HTTPS', t: 'Secure Communication', d: 'Application Layer', l: 'E', u: 'https://www.geeksforgeeks.org/difference-between-http-and-https/' },
            { n: 'HTTP Methods (GET POST etc)', t: 'RESTful Operations', d: 'Application Layer', l: 'E', u: 'https://www.geeksforgeeks.org/http-request-methods/' },
            { n: 'HTTP Status Codes', t: '1xx, 2xx, 3xx, 4xx, 5xx', d: 'Application Layer', l: 'E', u: 'https://www.geeksforgeeks.org/http-status-codes/' },
            { n: 'DNS', t: 'Domain Name System', d: 'Application Layer', l: 'M', u: 'https://www.geeksforgeeks.org/domain-name-system-dns-in-application-layer/' },
            { n: 'IP Addressing & Subnetting', t: 'IPv4, IPv6, CIDR', d: 'Network Layer', l: 'H', u: 'https://www.geeksforgeeks.org/introduction-of-classful-ip-addressing/' },
            { n: 'Routing Algorithms', t: 'Link State, Distance Vector', d: 'Network Layer', l: 'M', u: 'https://www.geeksforgeeks.org/classification-of-routing-algorithms/' },
            { n: 'MAC Address & ARP', t: 'Address Resolution Protocol', d: 'Link Layer', l: 'M', u: 'https://www.geeksforgeeks.org/how-address-resolution-protocol-arp-works/' },
          ],
        },
        {
          name: 'Handshakes & Data Flow',
          problems: [
            { n: '3-Way Handshake', t: 'SYN, SYN-ACK, ACK', d: 'TCP', l: 'M', u: 'https://www.geeksforgeeks.org/tcp-3-way-handshake-process/' },
            { n: 'TLS/SSL Handshake', t: 'Secure Key Exchange', d: 'Security', l: 'H', u: 'https://www.geeksforgeeks.org/ssl-tls-handshake-process/' },
            { n: 'Flow & Congestion Control', t: 'Sliding Window, Slow Start', d: 'TCP', l: 'H', u: 'https://www.geeksforgeeks.org/tcp-congestion-control/' },
            { n: 'Sockets', t: 'Network Endpoints', d: 'Programming', l: 'M', u: 'https://www.geeksforgeeks.org/socket-in-computer-network/' },
          ],
        },
        {
          name: 'Web Protocols & Quick Revision',
          problems: [
            { n: 'Cookies vs Sessions vs Tokens', t: 'State Management', d: 'Web Architecture', l: 'M', u: 'https://www.geeksforgeeks.org/session-cookies-and-tokens-in-web-development/' },
            { n: 'JWT Explained', t: 'JSON Web Tokens', d: 'Authentication', l: 'M', u: 'https://www.geeksforgeeks.org/json-web-token-jwt/' },
            { n: 'CORS', t: 'Cross-Origin Resource Sharing', d: 'Web Security', l: 'M', u: 'https://www.geeksforgeeks.org/cross-origin-resource-sharing-cors/' },
            { n: 'REST API Design Principles', t: 'Stateless, Cacheable, Uniform', d: 'Web Architecture', l: 'M', u: 'https://www.geeksforgeeks.org/rest-api-introduction/' },
            { n: 'Idempotency', t: 'Safe & Repeatable Requests', d: 'Web Architecture', l: 'M', u: 'https://www.geeksforgeeks.org/idempotent-rest-api/' },
            { n: 'WebSockets', t: 'Full-Duplex Communication', d: 'Web Protocols', l: 'M', u: 'https://www.geeksforgeeks.org/what-is-web-socket-and-how-it-is-different-from-the-http/' },
            { n: 'Last Minute Notes', t: 'Rapid Revision', d: 'Cheatsheet', l: 'E', u: 'https://www.geeksforgeeks.org/last-minute-notes-computer-networks/' },
          ],
        },
      ],
    },
    {
      id: 205,
      name: '5. Security Fundamentals',
      source: 'CS Core Subjects',
      subs: [
        {
          name: 'Web Vulnerabilities & Attacks',
          problems: [
            { n: 'SQL Injection', t: 'Malicious SQL Queries', d: 'Vulnerabilities', l: 'M', u: 'https://www.geeksforgeeks.org/sql-injection/' },
            { n: 'XSS (Cross Site Scripting)', t: 'Stored, Reflected, DOM-based', d: 'Vulnerabilities', l: 'M', u: 'https://www.geeksforgeeks.org/what-is-cross-site-scripting-xss/' },
            { n: 'CSRF', t: 'Cross-Site Request Forgery', d: 'Vulnerabilities', l: 'M', u: 'https://www.geeksforgeeks.org/cross-site-request-forgery-csrf-attack/' },
            { n: 'OWASP Top 10', t: 'Critical Web Vulnerabilities', d: 'Security Standards', l: 'H', u: 'https://www.geeksforgeeks.org/owasp-top-10-vulnerabilities/' },
          ],
        },
        {
          name: 'Cryptography & Revision',
          problems: [
            { n: 'Password Hashing & Salting', t: 'bcrypt, PBKDF2, Argon2', d: 'Cryptography', l: 'M', u: 'https://www.geeksforgeeks.org/password-hashing-with-bcrypt-in-node-js/' },
            { n: 'Symmetric vs Asymmetric Encryption', t: 'AES vs RSA / ECC', d: 'Cryptography', l: 'M', u: 'https://www.geeksforgeeks.org/difference-between-symmetric-and-asymmetric-key-encryption/' },
            { n: 'HTTPS & Encryption Basics', t: 'SSL/TLS Working', d: 'Network Security', l: 'M', u: 'https://www.geeksforgeeks.org/explain-the-working-of-https/' },
            { n: 'Web Security Overview', t: 'Defense in Depth', d: 'Cheatsheet', l: 'E', u: 'https://www.geeksforgeeks.org/web-security/' },
            { n: 'Cryptography Basics', t: 'Encryption Fundamentals', d: 'Cheatsheet', l: 'E', u: 'https://www.geeksforgeeks.org/cryptography-introduction/' },
          ],
        },
      ],
    },
    {
      id: 206,
      name: '6. System Design (HLD & LLD)',
      source: 'CS Core Subjects',
      subs: [
        {
          name: 'Core Architecture & Scaling',
          problems: [
            { n: 'System Design Introduction', t: 'Architectural Blueprinting', d: 'System Design', l: 'E', u: 'https://www.geeksforgeeks.org/system-design-tutorial/' },
            { n: 'HLD vs LLD', t: 'High Level vs Low Level Design', d: 'System Design', l: 'E', u: 'https://www.geeksforgeeks.org/difference-between-high-level-design-and-low-level-design/' },
            { n: 'Horizontal vs Vertical Scaling', t: 'Scale Out vs Scale Up', d: 'Scalability', l: 'M', u: 'https://www.geeksforgeeks.org/horizontal-and-vertical-scaling-in-databases/' },
            { n: 'Load Balancing', t: 'Round Robin, Least Conn, Hash', d: 'Scalability', l: 'M', u: 'https://www.geeksforgeeks.org/load-balancing-in-computer-networks/' },
            { n: 'Caching', t: 'Cache Eviction, Write-Through/Back', d: 'Performance', l: 'M', u: 'https://www.geeksforgeeks.org/caching-system-design-concept-for-beginners/' },
            { n: 'Redis Basics', t: 'In-Memory Data Store', d: 'Performance', l: 'M', u: 'https://www.geeksforgeeks.org/introduction-to-redis-server/' },
            { n: 'Database Sharding', t: 'Horizontal Partitioning', d: 'Databases', l: 'H', u: 'https://www.geeksforgeeks.org/database-sharding-a-system-design-concept/' },
            { n: 'CAP Theorem', t: 'Consistency, Availability, Partition Tolerance', d: 'Distributed Systems', l: 'H', u: 'https://www.geeksforgeeks.org/cap-theorem-in-dbms/' },
          ],
        },
        {
          name: 'Case Studies & Quick Revision',
          problems: [
            { n: 'Design URL Shortener', t: 'TinyURL Architecture', d: 'Case Study', l: 'M', u: 'https://www.geeksforgeeks.org/system-design-url-shortening-service/' },
            { n: 'Design Notification System', t: 'Push, SMS, Email Architecture', d: 'Case Study', l: 'H', u: 'https://www.geeksforgeeks.org/design-a-notification-system/' },
            { n: 'Design Rate Limiter', t: 'Token Bucket, Leaky Bucket', d: 'Case Study', l: 'H', u: 'https://www.geeksforgeeks.org/system-design-rate-limiter/' },
            { n: 'System Design Cheatsheet', t: 'Rapid Reference', d: 'Cheatsheet', l: 'E', u: 'https://www.geeksforgeeks.org/system-design-cheatsheet/' },
            { n: 'Most Asked System Design Questions', t: 'Top 10 Questions', d: 'Interview Prep', l: 'H', u: 'https://www.geeksforgeeks.org/top-10-system-design-interview-questions-and-answers/' },
          ],
        },
      ],
    },
    {
      id: 207,
      name: '7. Software Engineering / SDLC',
      source: 'CS Core Subjects',
      subs: [
        {
          name: 'SDLC Models & Git Workflows',
          problems: [
            { n: 'SDLC Overview', t: 'Req, Design, Impl, Test, Deploy', d: 'SDLC', l: 'E', u: 'https://www.geeksforgeeks.org/software-development-life-cycle-sdlc/' },
            { n: 'Waterfall Model', t: 'Sequential Design Process', d: 'SDLC', l: 'E', u: 'https://www.geeksforgeeks.org/waterfall-model/' },
            { n: 'Agile Model', t: 'Iterative & Incremental', d: 'SDLC', l: 'E', u: 'https://www.geeksforgeeks.org/software-engineering-agile-development-models/' },
            { n: 'Scrum Framework', t: 'Sprints, Standups, Retrospectives', d: 'SDLC', l: 'E', u: 'https://www.geeksforgeeks.org/scrum-software-development/' },
            { n: 'Git Branching', t: 'Feature Branches, GitFlow', d: 'Version Control', l: 'E', u: 'https://www.geeksforgeeks.org/branching-in-git/' },
            { n: 'Merge vs Rebase', t: 'History Preservation vs Linearity', d: 'Version Control', l: 'M', u: 'https://www.geeksforgeeks.org/git-merge-and-git-rebase/' },
            { n: 'Resolving Merge Conflicts', t: 'Conflict Markers & Resolution', d: 'Version Control', l: 'M', u: 'https://www.geeksforgeeks.org/merge-conflicts-and-how-to-handle-them/' },
          ],
        },
        {
          name: 'Testing & Quick Revision',
          problems: [
            { n: 'Unit vs Integration Testing', t: 'Component vs End-to-End', d: 'Testing', l: 'E', u: 'https://www.geeksforgeeks.org/difference-between-unit-testing-and-integration-testing/' },
            { n: 'TDD', t: 'Test-Driven Development', d: 'Testing', l: 'M', u: 'https://www.geeksforgeeks.org/test-driven-development-tdd/' },
            { n: 'Last Minute Notes', t: 'Rapid Revision', d: 'Cheatsheet', l: 'E', u: 'https://www.geeksforgeeks.org/last-minute-notes-software-engineering/' },
            { n: 'Git Cheatsheet', t: 'Command Guide', d: 'Cheatsheet', l: 'E', u: 'https://www.geeksforgeeks.org/git-cheat-sheet/' },
            { n: 'SDLC Interview Questions', t: 'Top Questions', d: 'Interview Prep', l: 'M', u: 'https://www.geeksforgeeks.org/software-engineering-interview-questions/' },
            { n: 'Agile Interview Questions', t: 'Top Questions', d: 'Interview Prep', l: 'M', u: 'https://www.geeksforgeeks.org/agile-interview-questions/' },
          ],
        },
      ],
    },
    {
      id: 208,
      name: '8. Aptitude / Logical Reasoning',
      source: 'CS Core Subjects',
      subs: [
        {
          name: 'Quantitative & Verbal Ability',
          problems: [
            { n: 'Quantitative Aptitude', t: 'Arithmetic, Algebra, Geometry', d: 'Quant', l: 'M', u: 'https://www.indiabix.com/aptitude/questions-and-answers/' },
            { n: 'Logical Reasoning', t: 'Puzzles, Seating Arrangement, Deductions', d: 'Logical', l: 'M', u: 'https://www.indiabix.com/logical-reasoning/questions-and-answers/' },
            { n: 'Verbal Ability', t: 'Grammar, Reading Comprehension', d: 'Verbal', l: 'E', u: 'https://www.indiabix.com/verbal-ability/questions-and-answers/' },
            { n: 'Number Series', t: 'Sequence Prediction', d: 'Logical', l: 'E', u: 'https://www.indiabix.com/logical-reasoning/number-series/' },
            { n: 'Data Interpretation', t: 'Charts, Tables, Graphs Analysis', d: 'Quant', l: 'M', u: 'https://www.indiabix.com/data-interpretation/questions-and-answers/' },
            { n: 'GFG Aptitude Notes', t: 'Comprehensive Aptitude Guide', d: 'Notes', l: 'E', u: 'https://www.geeksforgeeks.org/aptitude-gq/' },
            { n: 'Quant Shortcuts & Tricks', t: 'Speed Math Techniques', d: 'Shortcuts', l: 'E', u: 'https://www.geeksforgeeks.org/quantitative-aptitude/' },
          ],
        },
        {
          name: 'Company Specific Patterns',
          problems: [
            { n: 'TCS NQT Pattern', t: 'National Qualifier Test Prep', d: 'Company Prep', l: 'M', u: 'https://www.prepinsta.com/tcs-nqt/' },
            { n: 'Infosys Pattern', t: 'Infosys Recruitment Pattern', d: 'Company Prep', l: 'M', u: 'https://www.prepinsta.com/infosys/' },
            { n: 'Wipro Pattern', t: 'Wipro Recruitment Pattern', d: 'Company Prep', l: 'M', u: 'https://www.prepinsta.com/wipro/' },
          ],
        },
      ],
    },
    {
      id: 209,
      name: '9. DSA — Topic-wise Quick Reference',
      source: 'CS Core Subjects',
      subs: [
        {
          name: 'Core Data Structures',
          problems: [
            { n: 'Array', t: 'Contiguous Memory Structure', d: 'Data Structure', l: 'E', u: 'https://www.geeksforgeeks.org/array-data-structure/' },
            { n: 'Linked List', t: 'Singly, Doubly, Circular', d: 'Data Structure', l: 'E', u: 'https://www.geeksforgeeks.org/data-structures/linked-list/' },
            { n: 'Stack', t: 'LIFO Structure', d: 'Data Structure', l: 'E', u: 'https://www.geeksforgeeks.org/stack-data-structure/' },
            { n: 'Queue', t: 'FIFO Structure & Priority Queue', d: 'Data Structure', l: 'E', u: 'https://www.geeksforgeeks.org/queue-data-structure/' },
            { n: 'Hashing', t: 'Hash Table, Collision Resolution', d: 'Data Structure', l: 'M', u: 'https://www.geeksforgeeks.org/hashing-data-structure/' },
            { n: 'Heap', t: 'Min-Heap & Max-Heap', d: 'Data Structure', l: 'M', u: 'https://www.geeksforgeeks.org/heap-data-structure/' },
            { n: 'Tree', t: 'Binary Tree, BST, AVL Tree', d: 'Data Structure', l: 'M', u: 'https://www.geeksforgeeks.org/binary-tree-data-structure/' },
            { n: 'Graph', t: 'Adj List, BFS, DFS, Shortest Path', d: 'Data Structure', l: 'H', u: 'https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/' },
            { n: 'Trie', t: 'Prefix Tree & Autocomplete', d: 'Data Structure', l: 'H', u: 'https://www.geeksforgeeks.org/trie-insert-and-search/' },
            { n: 'Segment Tree', t: 'Range Queries & Lazy Prop', d: 'Data Structure', l: 'H', u: 'https://www.geeksforgeeks.org/segment-tree-data-structure/' },
          ],
        },
        {
          name: 'Algorithmic Techniques & Paradigms',
          problems: [
            { n: 'Two Pointers', t: 'Opposite & Same Direction', d: 'Technique', l: 'E', u: 'https://www.geeksforgeeks.org/two-pointers-technique/' },
            { n: 'Sliding Window', t: 'Fixed & Variable Window', d: 'Technique', l: 'M', u: 'https://www.geeksforgeeks.org/window-sliding-technique/' },
            { n: 'Prefix Sum', t: 'Range Sum Optimization', d: 'Technique', l: 'E', u: 'https://www.geeksforgeeks.org/prefix-sum-array-implementation-applications-competitive-programming/' },
            { n: 'Binary Search', t: 'Monotonic Search Space', d: 'Technique', l: 'M', u: 'https://www.geeksforgeeks.org/binary-search/' },
            { n: 'Sorting Algorithms', t: 'Merge, Quick, Heap, Radix Sort', d: 'Algorithms', l: 'M', u: 'https://www.geeksforgeeks.org/sorting-algorithms/' },
            { n: 'Recursion', t: 'Base Cases & Call Stack', d: 'Technique', l: 'M', u: 'https://www.geeksforgeeks.org/recursion/' },
            { n: 'Backtracking', t: 'State Space Tree Exploration', d: 'Technique', l: 'H', u: 'https://www.geeksforgeeks.org/backtracking-algorithms/' },
            { n: 'Dynamic Programming', t: 'Memoization & Tabulation', d: 'Technique', l: 'H', u: 'https://www.geeksforgeeks.org/dynamic-programming/' },
            { n: 'Greedy', t: 'Local Optimal Choice', d: 'Technique', l: 'M', u: 'https://www.geeksforgeeks.org/greedy-algorithms/' },
            { n: 'Bit Manipulation', t: 'XOR, Masks, Bitwise Tricks', d: 'Technique', l: 'M', u: 'https://www.geeksforgeeks.org/bits-manipulation-important-tactics/' },
          ],
        },
      ],
    },
  ],
};
