export interface Problem { n: string; t: string; d: string; l: 'E' | 'M' | 'H'; u?: string; links?: string[]; }
export interface SubPhase { name: string; problems: Problem[]; }
export interface Phase { id: number | string; name: string; source: string; subs: SubPhase[]; }
export interface Roadmap { phases: Phase[]; }

export const SQL_ROADMAP: Roadmap = {
  phases: [
    {id:100,name:'SQL Basics & Filtering',source:'SQL Core',subs:[{name:'SELECT & WHERE',problems:[
      {n:'Recyclable and Low Fat Products',t:'Basic Filtering',d:'Table',l:'E',u:'https://leetcode.com/problems/recyclable-and-low-fat-products/'},
      {n:'Find Customer Referee',t:'NULL Handling',d:'Table',l:'E',u:'https://leetcode.com/problems/find-customer-referee/'},
      {n:'Big Countries',t:'OR / UNION',d:'Table',l:'E',u:'https://leetcode.com/problems/big-countries/'},
      {n:'Article Views I',t:'DISTINCT & ORDER BY',d:'Table',l:'E',u:'https://leetcode.com/problems/article-views-i/'},
      {n:'Invalid Tweets',t:'String Length',d:'Table',l:'E',u:'https://leetcode.com/problems/invalid-tweets/'},
      {n:'Patients With a Condition',t:'LIKE Wildcard',d:'Table',l:'E',u:'https://leetcode.com/problems/patients-with-a-condition/'},
      {n:'Fix Names in a Table',t:'String Functions (UPPER/LOWER)',d:'Table',l:'E',u:'https://leetcode.com/problems/fix-names-in-a-table/'},
    ]}]},
    {id:101,name:'Joins & Relational Algebra',source:'SQL Core',subs:[{name:'INNER, LEFT, Self Joins',problems:[
      {n:'Replace Employee ID With The Unique Identifier',t:'LEFT JOIN',d:'Two Tables',l:'E',u:'https://leetcode.com/problems/replace-employee-id-with-the-unique-identifier/'},
      {n:'Product Sales Analysis I',t:'INNER JOIN',d:'Two Tables',l:'E',u:'https://leetcode.com/problems/product-sales-analysis-i/'},
      {n:'Customer Who Visited but Did Not Make Any Transactions',t:'LEFT JOIN + IS NULL',d:'Two Tables',l:'E',u:'https://leetcode.com/problems/customer-who-visited-but-did-not-make-any-transactions/'},
      {n:'Rising Temperature',t:'Self Join + DATEDIFF',d:'Self Join',l:'E',u:'https://leetcode.com/problems/rising-temperature/'},
      {n:'Employee Bonus',t:'LEFT JOIN + NULL check',d:'Two Tables',l:'E',u:'https://leetcode.com/problems/employee-bonus/'},
      {n:'Average Time of Process per Machine',t:'Self Join / AVG',d:'Self Join',l:'E',u:'https://leetcode.com/problems/average-time-of-process-per-machine/'},
      {n:'Students and Examinations',t:'CROSS JOIN + LEFT JOIN + COUNT',d:'Multi Table',l:'E',u:'https://leetcode.com/problems/students-and-examinations/'},
      {n:'Managers with at Least 5 Direct Reports',t:'Self Join + GROUP BY',d:'Self Join',l:'M',u:'https://leetcode.com/problems/managers-with-at-least-5-direct-reports/'},
      {n:'Confirmation Rate',t:'LEFT JOIN + IF/CASE + AVG',d:'Two Tables',l:'M',u:'https://leetcode.com/problems/confirmation-rate/'},
    ]}]},
    {id:102,name:'Aggregation & Grouping',source:'SQL Core',subs:[{name:'GROUP BY & HAVING',problems:[
      {n:'Not Boring Movies',t:'MOD & ORDER BY',d:'Table',l:'E',u:'https://leetcode.com/problems/not-boring-movies/'},
      {n:'Average Selling Price',t:'SUM / COUNT + BETWEEN',d:'Two Tables',l:'E',u:'https://leetcode.com/problems/average-selling-price/'},
      {n:'Project Employees I',t:'GROUP BY + ROUND + AVG',d:'Two Tables',l:'E',u:'https://leetcode.com/problems/project-employees-i/'},
      {n:'Percentage of Users Attended a Contest',t:'GROUP BY + Subquery',d:'Two Tables',l:'E',u:'https://leetcode.com/problems/percentage-of-users-attended-a-contest/'},
      {n:'Queries Quality and Percentage',t:'CASE WHEN in AVG',d:'Table',l:'E',u:'https://leetcode.com/problems/queries-quality-and-percentage/'},
      {n:'Monthly Transactions I',t:'DATE_FORMAT + GROUP BY',d:'Table',l:'M',u:'https://leetcode.com/problems/monthly-transactions-i/'},
      {n:'Immediate Food Delivery II',t:'First Order / HAVING MIN',d:'Table',l:'M',u:'https://leetcode.com/problems/immediate-food-delivery-ii/'},
      {n:'Game Play Analysis IV',t:'Consecutive Dates + COUNT',d:'Table',l:'M',u:'https://leetcode.com/problems/game-play-analysis-iv/'},
    ]}]},
    {id:103,name:'Sorting & Grouping Advanced',source:'SQL Mastery',subs:[{name:'Complex HAVING & Ordering',problems:[
      {n:'Number of Unique Subjects Taught by Each Teacher',t:'COUNT DISTINCT',d:'Table',l:'E',u:'https://leetcode.com/problems/number-of-unique-subjects-taught-by-each-teacher/'},
      {n:'User Activity for the Past 30 Days I',t:'Date Range Filtering',d:'Table',l:'E',u:'https://leetcode.com/problems/user-activity-for-the-past-30-days-i/'},
      {n:'Product Sales Analysis III',t:'MIN Date per Group',d:'Two Tables',l:'M',u:'https://leetcode.com/problems/product-sales-analysis-iii/'},
      {n:'Classes More Than 5 Students',t:'GROUP BY + HAVING',d:'Table',l:'E',u:'https://leetcode.com/problems/classes-more-than-5-students/'},
      {n:'Find Followers Count',t:'GROUP BY + ORDER BY',d:'Table',l:'E',u:'https://leetcode.com/problems/find-followers-count/'},
      {n:'Biggest Single Number',t:'Subquery / HAVING COUNT = 1',d:'Table',l:'E',u:'https://leetcode.com/problems/biggest-single-number/'},
      {n:'Customers Who Bought All Products',t:'COUNT DISTINCT comparison',d:'Two Tables',l:'M',u:'https://leetcode.com/problems/customers-who-bought-all-products/'},
    ]}]},
    {id:104,name:'Subqueries & CTEs',source:'SQL Mastery',subs:[{name:'WITH Clause & Correlated Subqueries',problems:[
      {n:'The Number of Employees Which Report to Each Employee',t:'Self Join / Subquery',d:'Table',l:'E',u:'https://leetcode.com/problems/the-number-of-employees-which-report-to-each-employee/'},
      {n:'Primary Department for Each Employee',t:'UNION / Subquery COUNT',d:'Table',l:'E',u:'https://leetcode.com/problems/primary-department-for-each-employee/'},
      {n:'Triangle Judgement',t:'CASE WHEN / Geometry logic',d:'Table',l:'E',u:'https://leetcode.com/problems/triangle-judgement/'},
      {n:'Consecutive Numbers',t:'3-way Self Join / LEAD/LAG',d:'Table',l:'M',u:'https://leetcode.com/problems/consecutive-numbers/'},
      {n:'Product Price at a Given Date',t:'CTE + Last Value before Date',d:'Table',l:'M',u:'https://leetcode.com/problems/product-price-at-a-given-date/'},
      {n:'Last Person to Fit in the Bus',t:'Running Total / Subquery',d:'Table',l:'M',u:'https://leetcode.com/problems/last-person-to-fit-in-the-bus/'},
      {n:'Count Salary Categories',t:'UNION ALL / SUM CASE',d:'Table',l:'M',u:'https://leetcode.com/problems/count-salary-categories/'},
    ]}]},
    {id:105,name:'Window Functions',source:'SQL Advanced',subs:[{name:'RANK, DENSE_RANK, ROW_NUMBER, LAG, LEAD',problems:[
      {n:'Employees Earning More Than Their Managers',t:'Self Join / Window',d:'Table',l:'E',u:'https://leetcode.com/problems/employees-earning-more-than-their-managers/'},
      {n:'Second Highest Salary',t:'DENSE_RANK / LIMIT OFFSET',d:'Table',l:'M',u:'https://leetcode.com/problems/second-highest-salary/'},
      {n:'Nth Highest Salary',t:'DENSE_RANK() / Function',d:'Table',l:'M',u:'https://leetcode.com/problems/nth-highest-salary/'},
      {n:'Department Highest Salary',t:'MAX OVER Partition / RANK',d:'Two Tables',l:'M',u:'https://leetcode.com/problems/department-highest-salary/'},
      {n:'Department Top Three Salaries',t:'DENSE_RANK() OVER Partition',d:'Two Tables',l:'H',u:'https://leetcode.com/problems/department-top-three-salaries/'},
      {n:'Exchange Seats',t:'CASE + ROW_NUMBER / MOD',d:'Table',l:'M',u:'https://leetcode.com/problems/exchange-seats/'},
      {n:'Movie Rating',t:'UNION / ORDER BY LIMIT 1',d:'Multi Table',l:'M',u:'https://leetcode.com/problems/movie-rating/'},
      {n:'Restaurant Growth',t:'7-day Moving Average Window',d:'Table',l:'M',u:'https://leetcode.com/problems/restaurant-growth/'},
      {n:'Friend Requests II: Who Has the Most Friends',t:'UNION ALL + SUM + LIMIT',d:'Table',l:'M',u:'https://leetcode.com/problems/friend-requests-ii-who-has-the-most-friends/'},
      {n:'Investments in 2016',t:'COUNT OVER / NOT EXISTS',d:'Table',l:'M',u:'https://leetcode.com/problems/investments-in-2016/'},
      {n:'Trips and Users',t:'Cancellation Rate / Filtering',d:'Three Tables',l:'H',u:'https://leetcode.com/problems/trips-and-users/'},
    ]}]},
    {id:106,name:'Advanced String & Date Manipulation',source:'SQL Advanced',subs:[{name:'Regex, CONCAT, Date Math',problems:[
      {n:'Fix Names in a Table',t:'CONCAT + UPPER/LOWER',d:'String',l:'E',u:'https://leetcode.com/problems/fix-names-in-a-table/'},
      {n:'Patients With a Condition',t:'REGEX / LIKE prefix check',d:'String',l:'E',u:'https://leetcode.com/problems/patients-with-a-condition/'},
      {n:'Find Users With Valid E-Mails',t:'REGEXP Matching',d:'String',l:'E',u:'https://leetcode.com/problems/find-users-with-valid-e-mails/'},
      {n:'Group Sold Products By The Date',t:'GROUP_CONCAT / STRING_AGG',d:'String + Grouping',l:'E',u:'https://leetcode.com/problems/group-sold-products-by-the-date/'},
      {n:'List the Products Ordered in a Period',t:'DATE_FORMAT / HAVING',d:'Two Tables',l:'E',u:'https://leetcode.com/problems/list-the-products-ordered-in-a-period/'},
    ]}]},
    {id:107,name:'Database Design & Optimization',source:'Theory & Patterns',subs:[{name:'Schema & ACID Concepts',problems:[
      {n:'1NF, 2NF, 3NF & BCNF Normalization',t:'Schema Normal Forms',d:'DB Theory',l:'M'},
      {n:'Clustered vs Non-Clustered Indexes',t:'Indexing Strategy B-Tree',d:'Performance',l:'M'},
      {n:'ACID Properties & Transaction Isolation Levels',t:'Concurrency Control',d:'DB Theory',l:'M'},
      {n:'Query Optimization & EXPLAIN Plan Analysis',t:'Execution Plan Optimization',d:'Performance',l:'H'},
      {n:'Sharding, Partitioning & Replication',t:'Horizontal vs Vertical Scaling',d:'Architecture',l:'H'},
      {n:'SQL vs NoSQL Database Selection Guide',t:'System Design Choice',d:'Architecture',l:'M'},
    ]}]}
  ]
};



