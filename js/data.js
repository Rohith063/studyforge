/* ===================================================================
   StudyForge – Data Module
   Contains all schedule data, roadmaps, quotes, badges, and habits
   =================================================================== */

// ─── Motivational Quotes ───────────────────────────────────────────
const QUOTES = [
    { text: "The only way to learn to code is to code.", author: "Unknown" },
    { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
    { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
    { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
    { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn" },
    { text: "Hard work beats talent when talent doesn't work hard.", author: "Tim Notke" },
    { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
    { text: "The pain of discipline is nothing like the pain of disappointment.", author: "Justin Langer" },
    { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
    { text: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson" },
    { text: "The most damaging phrase in the language is: 'We've always done it this way.'", author: "Grace Hopper" },
    { text: "Knowledge is of no value unless you put it into practice.", author: "Anton Chekhov" },
    { text: "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.", author: "Antoine de Saint-Exupéry" },
    { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
    { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
    { text: "What you do every day matters more than what you do once in a while.", author: "Gretchen Rubin" },
    { text: "Consistency is what transforms average into excellence.", author: "Unknown" },
    { text: "The secret to getting ahead is getting started.", author: "Mark Twain" },
    { text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas Edison" },
    { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { text: "Your limitation—it's only your imagination.", author: "Unknown" },
    { text: "Great things never come from comfort zones.", author: "Unknown" },
    { text: "Dream it. Wish it. Do it.", author: "Unknown" },
    { text: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
    { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Unknown" },
    { text: "Don't stop when you're tired. Stop when you're done.", author: "Unknown" },
    { text: "Wake up with determination. Go to bed with satisfaction.", author: "Unknown" },
    { text: "Do something today that your future self will thank you for.", author: "Sean Patrick Flanery" },
    { text: "Little things make big days.", author: "Unknown" },
    { text: "It's going to be hard, but hard does not mean impossible.", author: "Unknown" },
    { text: "The key to success is to focus on goals, not obstacles.", author: "Unknown" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "Today's effort shapes tomorrow's results.", author: "Unknown" },
    { text: "Excuses don't build skills. Practice does.", author: "Unknown" },
    { text: "Every expert was once a disaster. Keep going.", author: "Unknown" },
    { text: "If it doesn't challenge you, it doesn't change you.", author: "Fred DeVito" },
    { text: "Your future is created by what you do today, not tomorrow.", author: "Robert Kiyosaki" },
    { text: "Strive for progress, not perfection.", author: "Unknown" },
    { text: "The difference between ordinary and extraordinary is that little extra.", author: "Jimmy Johnson" },
    { text: "One day or day one. You decide.", author: "Unknown" },
    { text: "Motivation gets you started. Habit keeps you going.", author: "Jim Ryun" },
    { text: "Code, eat, sleep, repeat.", author: "Developer Mantra" },
    { text: "You are one coding session away from a breakthrough.", author: "Unknown" },
    { text: "Be the person who decided to go for it.", author: "Unknown" },
    { text: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
    { text: "Doubt kills more dreams than failure ever will.", author: "Suzy Kassem" },
    { text: "Don't compare your chapter 1 to someone else's chapter 20.", author: "Unknown" },
    { text: "Success isn't owned. It's leased and rent is due every day.", author: "J.J. Watt" },
    { text: "Action is the foundational key to all success.", author: "Pablo Picasso" },
    { text: "Learning to write programs stretches your mind, and helps you think better.", author: "Bill Gates" },
    { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
    { text: "Everything around you was built by people no smarter than you.", author: "Steve Jobs" },
    { text: "Master the basics, so the advanced comes naturally.", author: "Unknown" },
    { text: "Fall seven times, stand up eight.", author: "Japanese Proverb" },
    { text: "Your only competition is who you were yesterday.", author: "Unknown" },
    { text: "Day 60 you will thank Day 1 you for starting.", author: "StudyForge" }
];

// ─── Habit Definitions ─────────────────────────────────────────────
const HABITS = [
    { id: 'wake', icon: '⏰', name: 'Wake Up On Time', desc: 'Rose with the alarm' },
    { id: 'no_procrastination', icon: '🚀', name: 'No Procrastination', desc: 'Started tasks immediately' },
    { id: 'workout', icon: '💪', name: 'Workout / Exercise', desc: '20+ min of movement' },
    { id: 'no_social', icon: '📵', name: 'No Social Media Distraction', desc: 'Stayed focused' },
    { id: 'sleep', icon: '😴', name: 'Slept On Time', desc: 'Lights out by schedule' },
    { id: 'water', icon: '💧', name: 'Drank Enough Water', desc: '8+ glasses' },
    { id: 'coding', icon: '💻', name: 'Wrote Code Today', desc: 'Hands-on coding done' },
    { id: 'review', icon: '📖', name: 'Reviewed Yesterday', desc: 'Revised previous topics' }
];

// ─── Achievement Badges ────────────────────────────────────────────
const BADGES = [
    { id: 'first_day', emoji: '🌱', name: 'Day One Hero', desc: 'Complete your first day', condition: (s) => s.completedDays >= 1 },
    { id: 'week1', emoji: '🔥', name: 'Week Warrior', desc: 'Complete 7 days', condition: (s) => s.completedDays >= 7 },
    { id: 'streak5', emoji: '⚡', name: 'Streak Master 5', desc: 'Hit a 5-day streak', condition: (s) => s.maxStreak >= 5 },
    { id: 'streak10', emoji: '💎', name: 'Streak Legend 10', desc: 'Hit a 10-day streak', condition: (s) => s.maxStreak >= 10 },
    { id: 'streak30', emoji: '👑', name: 'Streak Royalty 30', desc: 'Hit a 30-day streak', condition: (s) => s.maxStreak >= 30 },
    { id: 'halfway', emoji: '🏔️', name: 'Halfway Summit', desc: 'Complete 30 days', condition: (s) => s.completedDays >= 30 },
    { id: 'problems50', emoji: '🧩', name: 'Problem Solver 50', desc: 'Solve 50 coding problems', condition: (s) => s.problemsSolved >= 50 },
    { id: 'problems100', emoji: '🏆', name: 'Century Coder', desc: 'Solve 100 coding problems', condition: (s) => s.problemsSolved >= 100 },
    { id: 'problems200', emoji: '🦾', name: 'Code Machine 200', desc: 'Solve 200 coding problems', condition: (s) => s.problemsSolved >= 200 },
    { id: 'hours50', emoji: '⏳', name: 'Time Investor 50h', desc: 'Log 50 study hours', condition: (s) => s.totalHours >= 50 },
    { id: 'hours100', emoji: '🕐', name: 'Century Hours', desc: 'Log 100 study hours', condition: (s) => s.totalHours >= 100 },
    { id: 'hours300', emoji: '⌛', name: 'Time Lord 300h', desc: 'Log 300 study hours', condition: (s) => s.totalHours >= 300 },
    { id: 'habit_perfect', emoji: '✨', name: 'Perfect Habits Day', desc: 'Complete all habits in a day', condition: (s) => s.perfectHabitDays >= 1 },
    { id: 'project1', emoji: '🚀', name: 'Project Launch', desc: 'Complete first project', condition: (s) => s.completedDays >= 14 },
    { id: 'week4', emoji: '🎖️', name: 'Month Master', desc: 'Complete 28 days', condition: (s) => s.completedDays >= 28 },
    { id: 'finisher', emoji: '🏁', name: 'The Finisher', desc: 'Complete all 60 days!', condition: (s) => s.completedDays >= 60 },
    { id: 'notes_writer', emoji: '📝', name: 'Reflection Writer', desc: 'Write notes for 10 days', condition: (s) => s.noteDays >= 10 },
    { id: 'early_bird', emoji: '🐦', name: 'Early Bird', desc: 'Complete before noon 5 times', condition: (s) => s.completedDays >= 5 },
];

// ─── Checklist Items Per Day ───────────────────────────────────────
const CHECKLIST_ITEMS = [
    { id: 'schedule', label: "Completed today's schedule" },
    { id: 'coding', label: 'Python coding done' },
    { id: 'leetcode', label: 'LeetCode / DSA done' },
    { id: 'sql', label: 'SQL practice done' },
    { id: 'excel', label: 'Excel practice done' },
    { id: 'pbi', label: 'Power BI practice done' },
    { id: 'revision', label: 'Revision / theory done' },
    { id: 'discipline', label: 'Workout / discipline done' }
];

// ─── Python Roadmap ────────────────────────────────────────────────
const PYTHON_ROADMAP = [
    // Phase 1: Foundations (Day 1-20)
    { days: '1-2', topic: 'Setup, Variables, Data Types', phase: 'beginner', difficulty: 'easy' },
    { days: '3-4', topic: 'Operators, Input/Output', phase: 'beginner', difficulty: 'easy' },
    { days: '5-6', topic: 'Conditionals (if/elif/else)', phase: 'beginner', difficulty: 'easy' },
    { days: '7-8', topic: 'For Loops & While Loops', phase: 'beginner', difficulty: 'easy' },
    { days: '9-10', topic: 'Lists, Tuples, Slicing', phase: 'beginner', difficulty: 'easy' },
    { days: '11-12', topic: 'Dictionaries & Sets', phase: 'beginner', difficulty: 'easy' },
    { days: '13-14', topic: 'Functions & Parameters', phase: 'beginner', difficulty: 'medium' },
    { days: '15-16', topic: 'String Methods & Formatting', phase: 'beginner', difficulty: 'easy' },
    { days: '17-18', topic: 'List Comprehensions', phase: 'beginner', difficulty: 'medium' },
    { days: '19-20', topic: 'Mini Project: Calculator / Quiz App', phase: 'beginner', difficulty: 'medium' },
    // Phase 2: Intermediate (Day 21-40)
    { days: '21-22', topic: 'File Handling (Read/Write)', phase: 'intermediate', difficulty: 'medium' },
    { days: '23-24', topic: 'Exception Handling (try/except)', phase: 'intermediate', difficulty: 'medium' },
    { days: '25-26', topic: 'OOP: Classes & Objects', phase: 'intermediate', difficulty: 'medium' },
    { days: '27-28', topic: 'OOP: Inheritance & Polymorphism', phase: 'intermediate', difficulty: 'medium' },
    { days: '29-30', topic: 'Modules & Packages', phase: 'intermediate', difficulty: 'medium' },
    { days: '31-32', topic: 'Lambda, Map, Filter, Reduce', phase: 'intermediate', difficulty: 'medium' },
    { days: '33-34', topic: 'Decorators & Generators', phase: 'intermediate', difficulty: 'hard' },
    { days: '35-36', topic: 'NumPy Basics', phase: 'intermediate', difficulty: 'medium' },
    { days: '37-38', topic: 'Pandas Basics (DataFrames)', phase: 'intermediate', difficulty: 'medium' },
    { days: '39-40', topic: 'Project: Data Cleaner / Expense Tracker', phase: 'intermediate', difficulty: 'hard' },
    // Phase 3: Applied (Day 41-60)
    { days: '41-42', topic: 'Pandas: Groupby, Merge, Pivot', phase: 'advanced', difficulty: 'medium' },
    { days: '43-44', topic: 'Matplotlib & Seaborn Basics', phase: 'advanced', difficulty: 'medium' },
    { days: '45-46', topic: 'APIs & JSON Handling', phase: 'advanced', difficulty: 'hard' },
    { days: '47-48', topic: 'Web Scraping (BeautifulSoup)', phase: 'advanced', difficulty: 'hard' },
    { days: '49-50', topic: 'Automation Scripts', phase: 'advanced', difficulty: 'medium' },
    { days: '51-52', topic: 'Regular Expressions', phase: 'advanced', difficulty: 'hard' },
    { days: '53-54', topic: 'Project: Portfolio Data Dashboard', phase: 'advanced', difficulty: 'hard' },
    { days: '55-56', topic: 'SQL + Python Integration', phase: 'advanced', difficulty: 'hard' },
    { days: '57-58', topic: 'ML Basics: Scikit-learn Intro', phase: 'advanced', difficulty: 'hard' },
    { days: '59-60', topic: 'Capstone: Full Data Analysis Pipeline', phase: 'advanced', difficulty: 'hard' },
];

// ─── LeetCode / DSA Roadmap ────────────────────────────────────────
const LEETCODE_ROADMAP = [
    // Beginner Phase (Day 1-20)
    { days: '1-3', topic: 'Arrays: Two Sum, Max Subarray', phase: 'beginner', difficulty: 'easy' },
    { days: '4-6', topic: 'Arrays: Rotate Array, Remove Duplicates', phase: 'beginner', difficulty: 'easy' },
    { days: '7-9', topic: 'Strings: Reverse, Palindrome, Anagrams', phase: 'beginner', difficulty: 'easy' },
    { days: '10-12', topic: 'Hashing: Two Sum (HashMap), Valid Anagram', phase: 'beginner', difficulty: 'easy' },
    { days: '13-15', topic: 'Sorting: Bubble, Selection, Insertion Sort', phase: 'beginner', difficulty: 'easy' },
    { days: '16-18', topic: 'Searching: Linear & Binary Search', phase: 'beginner', difficulty: 'easy' },
    { days: '19-20', topic: 'Review & Solve 10 Mixed Easy Problems', phase: 'beginner', difficulty: 'easy' },
    // Intermediate Phase (Day 21-40)
    { days: '21-23', topic: 'Sliding Window: Max Sum Subarray, Longest Substring', phase: 'intermediate', difficulty: 'medium' },
    { days: '24-26', topic: 'Two Pointers: 3Sum, Container With Most Water', phase: 'intermediate', difficulty: 'medium' },
    { days: '27-29', topic: 'Linked List: Reverse, Detect Cycle, Merge', phase: 'intermediate', difficulty: 'medium' },
    { days: '30-32', topic: 'Stack: Valid Parentheses, Min Stack, Daily Temps', phase: 'intermediate', difficulty: 'medium' },
    { days: '33-35', topic: 'Queue & Deque Problems', phase: 'intermediate', difficulty: 'medium' },
    { days: '36-38', topic: 'Binary Search: Advanced Applications', phase: 'intermediate', difficulty: 'medium' },
    { days: '39-40', topic: 'Review & Solve 10 Mixed Medium Problems', phase: 'intermediate', difficulty: 'medium' },
    // Advanced Phase (Day 41-60)
    { days: '41-44', topic: 'Trees: BST, Traversals, Max Depth', phase: 'advanced', difficulty: 'medium' },
    { days: '45-48', topic: 'Recursion & Backtracking Basics', phase: 'advanced', difficulty: 'hard' },
    { days: '49-52', topic: 'Dynamic Programming: Climbing Stairs, Fibonacci, Coin Change', phase: 'advanced', difficulty: 'hard' },
    { days: '53-56', topic: 'Graph Basics: BFS, DFS, Connected Components', phase: 'advanced', difficulty: 'hard' },
    { days: '57-58', topic: 'Greedy: Activity Selection, Jump Game', phase: 'advanced', difficulty: 'medium' },
    { days: '59-60', topic: 'Final Review: Solve 15 Mixed Problems', phase: 'advanced', difficulty: 'hard' },
];

// ─── SQL Roadmap ───────────────────────────────────────────────────
const SQL_ROADMAP = [
    { days: '1-3', topic: 'SELECT, FROM, WHERE Basics', phase: 'beginner', difficulty: 'easy' },
    { days: '4-6', topic: 'ORDER BY, LIMIT, DISTINCT', phase: 'beginner', difficulty: 'easy' },
    { days: '7-9', topic: 'AND, OR, IN, BETWEEN, LIKE', phase: 'beginner', difficulty: 'easy' },
    { days: '10-12', topic: 'Aggregate Functions (COUNT, SUM, AVG, MAX, MIN)', phase: 'beginner', difficulty: 'easy' },
    { days: '13-15', topic: 'GROUP BY & HAVING', phase: 'beginner', difficulty: 'medium' },
    { days: '16-18', topic: 'JOINS: INNER, LEFT, RIGHT, FULL', phase: 'beginner', difficulty: 'medium' },
    { days: '19-20', topic: 'Practice: 20 Basic SQL Queries', phase: 'beginner', difficulty: 'easy' },
    { days: '21-24', topic: 'Subqueries & Nested Queries', phase: 'intermediate', difficulty: 'medium' },
    { days: '25-28', topic: 'UNION, INTERSECT, CASE WHEN', phase: 'intermediate', difficulty: 'medium' },
    { days: '29-32', topic: 'CREATE, INSERT, UPDATE, DELETE (DML)', phase: 'intermediate', difficulty: 'medium' },
    { days: '33-36', topic: 'Window Functions (ROW_NUMBER, RANK, LEAD, LAG)', phase: 'intermediate', difficulty: 'hard' },
    { days: '37-40', topic: 'CTEs & Advanced Joins', phase: 'intermediate', difficulty: 'hard' },
    { days: '41-45', topic: 'Practice: 30 Intermediate SQL Challenges', phase: 'advanced', difficulty: 'medium' },
    { days: '46-50', topic: 'Database Design & Normalization Concepts', phase: 'advanced', difficulty: 'medium' },
    { days: '51-55', topic: 'Stored Procedures & Views (Intro)', phase: 'advanced', difficulty: 'hard' },
    { days: '56-60', topic: 'SQL Project: Full Database Analysis Report', phase: 'advanced', difficulty: 'hard' },
];

// ─── Excel & Power BI Roadmap ──────────────────────────────────────
const EXCEL_PBI_ROADMAP = [
    { days: '1-4', topic: 'Excel: Formulas (SUM, IF, VLOOKUP, COUNTIF)', phase: 'beginner', difficulty: 'easy' },
    { days: '5-8', topic: 'Excel: Conditional Formatting, Data Validation', phase: 'beginner', difficulty: 'easy' },
    { days: '9-12', topic: 'Excel: Pivot Tables & Pivot Charts', phase: 'beginner', difficulty: 'medium' },
    { days: '13-16', topic: 'Excel: INDEX-MATCH, XLOOKUP, Named Ranges', phase: 'intermediate', difficulty: 'medium' },
    { days: '17-20', topic: 'Excel: Dashboard Building & Charts', phase: 'intermediate', difficulty: 'medium' },
    { days: '21-24', topic: 'Excel: Macros Intro & Data Cleaning', phase: 'intermediate', difficulty: 'medium' },
    { days: '25-28', topic: 'Power BI: Interface, Loading Data, Transforms', phase: 'beginner', difficulty: 'easy' },
    { days: '29-32', topic: 'Power BI: Visualizations & Formatting', phase: 'intermediate', difficulty: 'medium' },
    { days: '33-36', topic: 'Power BI: DAX Basics (CALCULATE, FILTER, SUM)', phase: 'intermediate', difficulty: 'medium' },
    { days: '37-40', topic: 'Power BI: Relationships & Data Modeling', phase: 'intermediate', difficulty: 'medium' },
    { days: '41-45', topic: 'Power BI: Advanced DAX & Measures', phase: 'advanced', difficulty: 'hard' },
    { days: '46-50', topic: 'Power BI: Interactive Dashboard Project', phase: 'advanced', difficulty: 'hard' },
    { days: '51-55', topic: 'Excel: Advanced Formulas & Power Query', phase: 'advanced', difficulty: 'hard' },
    { days: '56-60', topic: 'Capstone: Complete Business Dashboard (Excel + PBI)', phase: 'advanced', difficulty: 'hard' },
];

// ─── ML Roadmap ────────────────────────────────────────────────────
const ML_ROADMAP = [
    { days: '1-5', topic: 'Statistics Review: Mean, Median, Variance, SD', phase: 'beginner', difficulty: 'easy' },
    { days: '6-10', topic: 'Probability & Distributions Basics', phase: 'beginner', difficulty: 'easy' },
    { days: '11-15', topic: 'Linear Regression Theory & Intuition', phase: 'beginner', difficulty: 'medium' },
    { days: '16-20', topic: 'Logistic Regression & Classification', phase: 'beginner', difficulty: 'medium' },
    { days: '21-25', topic: 'Decision Trees & Random Forests', phase: 'intermediate', difficulty: 'medium' },
    { days: '26-30', topic: 'Model Evaluation: Accuracy, Precision, Recall, F1', phase: 'intermediate', difficulty: 'medium' },
    { days: '31-35', topic: 'Feature Engineering & Data Preprocessing', phase: 'intermediate', difficulty: 'medium' },
    { days: '36-40', topic: 'K-Means Clustering & KNN', phase: 'intermediate', difficulty: 'medium' },
    { days: '41-45', topic: 'SVM & Ensemble Methods', phase: 'advanced', difficulty: 'hard' },
    { days: '46-50', topic: 'Hands-on: Scikit-learn ML Pipeline', phase: 'advanced', difficulty: 'hard' },
    { days: '51-55', topic: 'Neural Networks & Deep Learning Intro', phase: 'advanced', difficulty: 'hard' },
    { days: '56-60', topic: 'Capstone: End-to-End ML Project', phase: 'advanced', difficulty: 'hard' },
];

// ─── Weekly Targets ────────────────────────────────────────────────
const WEEKLY_TARGETS = [
    {
        week: 1, title: 'Week 1: Foundation & Setup',
        targets: [
            'Set up Python environment (VS Code, Jupyter)',
            'Master variables, data types, operators',
            'Write 15+ practice codes from scratch',
            'Complete basic SQL queries (SELECT, WHERE)',
            'Start Excel formulas practice',
            'Solve 10 easy LeetCode problems',
            'Build daily routine & habit streak'
        ]
    },
    {
        week: 2, title: 'Week 2: Control Flow & Logic',
        targets: [
            'Master if/else, loops, nested loops',
            'Practice 20+ logic-based Python exercises',
            'SQL: ORDER BY, GROUP BY, aggregate functions',
            'Excel: Pivot Tables & Conditional Formatting',
            'Solve 12 LeetCode problems (Arrays & Strings)',
            'Mini Project: Number guessing game',
            'Review Week 1 topics'
        ]
    },
    {
        week: 3, title: 'Week 3: Data Structures & Functions',
        targets: [
            'Lists, Tuples, Dicts, Sets mastery',
            'Functions, parameters, return values',
            'SQL: JOINs (INNER, LEFT, RIGHT)',
            'Excel: VLOOKUP, INDEX-MATCH',
            'Solve 12 LeetCode (Hashing, Searching)',
            'Mini Project: Contact Book / To-Do App',
            'Daily revision of previous topics'
        ]
    },
    {
        week: 4, title: 'Week 4: Intermediate Python & SQL',
        targets: [
            'String methods, list comprehensions',
            'File handling (read/write/append)',
            'SQL: Subqueries, UNION, CASE',
            'Excel: Dashboard project started',
            'Solve 12 LeetCode (Sliding Window, Two Pointers)',
            'Mini Project: File organizer script',
            'Month 1 Review Day'
        ]
    },
    {
        week: 5, title: 'Week 5: OOP & Power BI Start',
        targets: [
            'OOP: Classes, objects, inheritance',
            'Exception handling mastery',
            'SQL: Window Functions intro',
            'Power BI: Setup, load data, basic visuals',
            'Solve 15 LeetCode (Linked List, Stack)',
            'Mini Project: Student Grade System (OOP)',
            'Revision of Python fundamentals'
        ]
    },
    {
        week: 6, title: 'Week 6: Libraries & Data Analysis',
        targets: [
            'NumPy arrays & operations',
            'Pandas DataFrames, filtering, groupby',
            'SQL: CTEs, advanced joins practice',
            'Power BI: DAX basics, relationships',
            'Solve 15 LeetCode (Binary Search, Queue)',
            'Mini Project: Data analysis with Pandas',
            'ML theory revision (Linear/Logistic Regression)'
        ]
    },
    {
        week: 7, title: 'Week 7: Applied Python & Visualization',
        targets: [
            'Matplotlib & Seaborn charts',
            'API calls & JSON handling',
            'SQL: Complex queries practice (30+ problems)',
            'Power BI: Interactive dashboard project',
            'Solve 15 LeetCode (Trees, Recursion)',
            'Mini Project: API Data Visualizer',
            'ML: Decision Trees, Model Evaluation theory'
        ]
    },
    {
        week: 8, title: 'Week 8: Capstone & Polish',
        targets: [
            'Web scraping, automation, regex',
            'SQL + Python integration project',
            'Complete Power BI dashboard',
            'Complete Excel advanced project',
            'Solve 15 LeetCode (DP, Graph basics)',
            'Capstone: Full data analysis pipeline',
            'Final review of all 60 days content'
        ]
    },
    { week: 9, title: 'Overflow / Buffer', targets: ['Catch up on missed days', 'Polish projects', 'Deep revision'] }
];

// ─── Monthly Milestones ────────────────────────────────────────────
const MONTHLY_MILESTONES = {
    month1: {
        title: '🏆 Month 1 Milestone Targets (Day 1-30)',
        items: [
            'Python: Comfortable with basics through file handling',
            'SQL: Basic to intermediate queries mastered',
            'Excel: Pivot tables & dashboards done',
            'LeetCode: 60+ easy/medium problems solved',
            '3+ mini projects completed',
            '100+ hours of focused study',
            'Consistent daily habit streak'
        ]
    },
    month2: {
        title: '🏆 Month 2 Milestone Targets (Day 31-60)',
        items: [
            'Python: OOP, Pandas, NumPy, APIs mastered',
            'SQL: Window functions, CTEs, full projects',
            'Power BI: Complete interactive dashboard',
            'LeetCode: 120+ problems solved (including medium)',
            'ML: Understand core algorithms theoretically',
            'Capstone project completed end-to-end',
            '300+ total hours studied'
        ]
    }
};

// ─── Python Topics Per Day ─────────────────────────────────────────
const PYTHON_DAILY = [
    'Variables & Data Types', 'Operators & Expressions', 'Input/Output & Type Casting', 'if/elif/else Conditionals',
    'Nested Conditionals & Ternary', 'for Loops', 'while Loops & break/continue', 'Nested Loops & Patterns',
    'Lists: Create, Access, Modify', 'List Methods & Slicing', 'Tuples & Tuple Unpacking', 'Dictionaries: CRUD',
    'Dictionary Methods & Iteration', 'Sets & Set Operations', 'Functions: Basics', 'Functions: *args, **kwargs, Default Params',
    'String Methods Deep Dive', 'String Formatting (f-strings)', 'List Comprehensions', 'Review & Mini Project',
    'File Handling: Read/Write', 'File Handling: CSV & JSON', 'Exception Handling: try/except/finally', 'Custom Exceptions',
    'OOP: Classes & __init__', 'OOP: Methods & Self', 'OOP: Inheritance', 'OOP: Polymorphism & Encapsulation',
    'Modules & Imports', 'Revision Day', 'Lambda Functions', 'Map, Filter, Reduce',
    'Decorators', 'Generators & Iterators', 'NumPy: Arrays & Indexing', 'NumPy: Operations & Broadcasting',
    'Pandas: Series & DataFrame', 'Pandas: Filtering & Selection', 'Pandas: Groupby & Merge', 'Project: Data Cleaner',
    'Pandas: Pivot & Melt', 'Pandas: Time Series Basics', 'Matplotlib: Line & Bar Charts', 'Seaborn: Statistical Plots',
    'APIs: requests Library', 'APIs: Parsing JSON Responses', 'Web Scraping: BeautifulSoup', 'Web Scraping: Project',
    'Automation: File Organizer', 'Automation: Email/Report Generator', 'Regular Expressions', 'Regex Practice',
    'Project: Portfolio Dashboard', 'Project: Dashboard cont.', 'SQL + Python: sqlite3', 'SQL + Python: sqlalchemy Intro',
    'ML Intro: Scikit-learn Basics', 'ML: Train/Test Split, Metrics', 'Capstone: Full Pipeline', 'Capstone: Polish & Present'
];

// ─── SQL Topics Per Day ────────────────────────────────────────────
const SQL_DAILY = [
    'SELECT, FROM basics', 'WHERE clause & operators', 'AND, OR, NOT, IN', 'BETWEEN, LIKE, Wildcards',
    'ORDER BY & LIMIT', 'DISTINCT & aliases', 'COUNT, SUM, AVG', 'MAX, MIN, GROUP BY',
    'GROUP BY with conditions', 'HAVING clause', 'INNER JOIN', 'LEFT & RIGHT JOIN',
    'FULL OUTER JOIN', 'Self Joins & Cross Join', 'Practice: 10 join queries', 'Multi-table queries',
    'String functions (UPPER, LOWER, CONCAT)', 'Date functions', 'Subqueries: WHERE clause', 'Review & Practice',
    'Subqueries: SELECT clause', 'Subqueries: FROM clause', 'Correlated subqueries', 'UNION & UNION ALL',
    'INTERSECT & EXCEPT', 'CASE WHEN expressions', 'INSERT statements', 'UPDATE & DELETE',
    'CREATE TABLE & constraints', 'Revision Day', 'ALTER TABLE & indexes', 'Views: CREATE VIEW',
    'ROW_NUMBER()', 'RANK() & DENSE_RANK()', 'LEAD() & LAG()', 'Window Frames (ROWS BETWEEN)',
    'Running totals & moving avg', 'Partitioned aggregates', 'CTEs: WITH clause', 'Recursive CTEs intro',
    'Complex join practice', 'Multi-CTE queries', 'Practice: 15 medium queries', 'Practice: data analysis queries',
    'Practice: business questions', 'Database design: 1NF, 2NF, 3NF', 'ER Diagrams & relationships', 'Normalization practice',
    'Stored Procedures intro', 'Triggers basics', 'Regex in SQL', 'Performance: EXPLAIN',
    'Project: Sales Analysis', 'Project: Customer Segmentation', 'SQL + Python integration', 'Python DB queries',
    'Full project: HR Database', 'Final project: Business Dashboard', 'Final review: 20 hard queries', 'Final review: Mock test'
];

// ─── Excel/PowerBI Topics Per Day ──────────────────────────────────
const EXCEL_DAILY = [
    'Excel: SUM, AVERAGE, COUNT', 'Excel: IF, Nested IF', 'Excel: VLOOKUP', 'Excel: HLOOKUP & XLOOKUP',
    'Excel: Conditional Formatting', 'Excel: Data Validation', 'Excel: Sorting & Filtering', 'Excel: COUNTIF, SUMIF',
    'Excel: Pivot Table basics', 'Excel: Pivot Table advanced', 'Excel: Pivot Charts', 'Excel: INDEX-MATCH',
    'Excel: Named Ranges', 'Excel: Charts & Graphs', 'Excel: Dashboard layout', 'Excel: Sparklines & Icons',
    'Excel: CONCATENATE, TEXT', 'Excel: Date Functions', 'Excel: Data Cleaning tips', 'Review: Excel Practice',
    'Excel: Macros recording', 'Excel: VBA basics intro', 'Excel: Power Query intro', 'Excel: Transform data',
    'Power BI: Install & Interface', 'Power BI: Get Data & Transform', 'Power BI: Data types & cleanup', 'Power BI: Table visual',
    'Power BI: Bar & Column charts', 'Revision Day', 'Power BI: Line & Area charts', 'Power BI: Pie & Donut charts',
    'Power BI: Cards & KPIs', 'Power BI: DAX: SUM, COUNT', 'Power BI: DAX: CALCULATE', 'Power BI: DAX: FILTER',
    'Power BI: Relationships', 'Power BI: Star Schema', 'Power BI: Slicers & Filters', 'Power BI: Dashboard layout',
    'Power BI: DAX: Time Intelligence', 'Power BI: DATEADD, SAMEPERIOD', 'Power BI: Measures vs Columns', 'Power BI: Bookmarks & Buttons',
    'Power BI: Drill-through', 'Power BI: Project: Sales Dashboard', 'Power BI: Project continued', 'Power BI: Project polish',
    'Excel: Power Query advanced', 'Excel: Advanced charting', 'Excel: What-If Analysis', 'Excel: Solver & Scenarios',
    'Capstone: Excel report', 'Capstone: Excel report cont.', 'Capstone: PBI dashboard', 'Capstone: PBI dashboard cont.',
    'Final: Portfolio of Excel & PBI work', 'Final: Present dashboards', 'Polish & export', 'Final review'
];

// ─── LeetCode Topics Per Day ───────────────────────────────────────
const LEETCODE_DAILY = [
    'Arrays: Two Sum', 'Arrays: Best Time to Buy/Sell Stock', 'Arrays: Contains Duplicate', 'Arrays: Product of Array',
    'Arrays: Max Subarray (Kadane)', 'Arrays: Rotate Array', 'Strings: Valid Palindrome', 'Strings: Reverse String',
    'Strings: Valid Anagram', 'Strings: First Unique Character', 'Hashing: Two Sum (HashMap)', 'Hashing: Group Anagrams',
    'Sorting: Merge Sort concept', 'Sorting: Sort Colors', 'Binary Search: Classic', 'Binary Search: Search Insert Position',
    'Binary Search: First/Last Position', 'Pattern: Frequency Counter problems', 'Review: 5 mixed easy problems', 'Review: 5 more easy problems',
    'Sliding Window: Max Sum Subarray of Size K', 'Sliding Window: Longest Substring Without Repeating', 'Sliding Window: Minimum Window Substring', 'Two Pointers: 3Sum',
    'Two Pointers: Container With Most Water', 'Two Pointers: Remove Duplicates (Sorted)', 'Linked List: Reverse Linked List', 'Linked List: Detect Cycle',
    'Linked List: Merge Two Sorted Lists', 'Revision: 5 mixed problems', 'Stack: Valid Parentheses', 'Stack: Min Stack',
    'Stack: Daily Temperatures', 'Stack: Evaluate Reverse Polish', 'Queue: Implement Queue using Stacks', 'Queue: Sliding Window Maximum',
    'Binary Search: Search in Rotated Array', 'Binary Search: Find Peak Element', 'Review: 5 medium problems', 'Review: 5 more medium problems',
    'Trees: Max Depth of Binary Tree', 'Trees: Invert Binary Tree', 'Trees: Level Order Traversal', 'Trees: Validate BST',
    'Recursion: Fibonacci', 'Recursion: Power of Two', 'Backtracking: Subsets', 'Backtracking: Permutations',
    'DP: Climbing Stairs', 'DP: House Robber', 'DP: Coin Change', 'DP: Longest Increasing Subsequence',
    'Graph: Number of Islands', 'Graph: Clone Graph', 'Graph: BFS Shortest Path', 'Graph: DFS Connected Components',
    'Greedy: Jump Game', 'Greedy: Activity Selection', 'Final: 8 mixed problems', 'Final: 7 mixed problems (all levels)'
];

// ─── Generate 60 Day Schedules ─────────────────────────────────────
function generateSchedules(mode) {
    const schedules = [];
    const startDate = new Date(2025, 4, 1); // May 1, 2025

    for (let day = 1; day <= 60; day++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + day - 1);

        const pythonTopic = PYTHON_DAILY[day - 1] || 'Review & Practice';
        const sqlTopic = SQL_DAILY[day - 1] || 'Practice Queries';
        const excelTopic = EXCEL_DAILY[day - 1] || 'Practice';
        const leetcodeTopic = LEETCODE_DAILY[day - 1] || 'Mixed Practice';

        // Determine revision day
        const isRevisionDay = (day % 10 === 0) || day === 20 || day === 30 || day === 40 || day === 50 || day === 60;
        const weekNum = Math.ceil(day / 7);

        let schedule;
        if (mode === 'hardcore') {
            schedule = generateHardcoreDay(day, date, pythonTopic, sqlTopic, excelTopic, leetcodeTopic, isRevisionDay, weekNum);
        } else if (mode === 'balanced') {
            schedule = generateBalancedDay(day, date, pythonTopic, sqlTopic, excelTopic, leetcodeTopic, isRevisionDay, weekNum);
        } else {
            schedule = generateConsistencyDay(day, date, pythonTopic, sqlTopic, excelTopic, leetcodeTopic, isRevisionDay, weekNum);
        }

        schedules.push(schedule);
    }
    return schedules;
}

function generateHardcoreDay(day, date, python, sql, excel, leetcode, isRevision, week) {
    const totalHours = isRevision ? 6 : (day <= 20 ? 8 : (day <= 40 ? 9 : 10));
    const codingProblems = day <= 20 ? 5 : (day <= 40 ? 6 : 7);

    // Project days
    let projectTask = '';
    if (day === 14) projectTask = '🛠 Mini Project: Python Quiz Game';
    else if (day === 20) projectTask = '🛠 Project: Calculator App';
    else if (day === 28) projectTask = '🛠 Project: Student Grade System (OOP)';
    else if (day === 35) projectTask = '🛠 Project: File Organizer Script';
    else if (day === 40) projectTask = '🛠 Project: Expense Tracker with Pandas';
    else if (day === 46) projectTask = '🛠 Project: API Data Fetcher';
    else if (day === 48) projectTask = '🛠 Project: Web Scraper';
    else if (day === 53) projectTask = '🛠 Project: Portfolio Data Dashboard';
    else if (day === 55) projectTask = '🛠 Project: SQL + Python Analytics';
    else if (day === 59 || day === 60) projectTask = '🛠 Capstone: Full Data Analysis Pipeline';

    const blocks = [
        {
            title: 'Morning',
            icon: '🌅',
            hours: isRevision ? '2h' : '3h',
            time: '6:00 AM – 9:00 AM',
            tasks: isRevision
                ? ['📖 Revision: Week review of Python topics', '📖 Revision: SQL queries practice', '☕ Break (15 min)']
                : [`🐍 Python: ${python} — Study + 10 practice codes`, '📝 Notes & code-along (type everything)', '☕ Break + Quick walk (15 min)']
        },
        {
            title: 'Late Morning',
            icon: '☀️',
            hours: isRevision ? '1.5h' : '2h',
            time: '9:30 AM – 11:30 AM',
            tasks: isRevision
                ? ['🔄 Redo 5 hardest LeetCode problems from this week', '📊 Revise Excel formulas']
                : [`🧩 LeetCode: ${leetcode} — Solve ${codingProblems} problems`, '💡 Write brute force first, then optimize', '📝 Document approach for each problem']
        },
        {
            title: 'Afternoon',
            icon: '🌤️',
            hours: isRevision ? '1.5h' : '2.5h',
            time: '12:30 PM – 3:00 PM',
            tasks: isRevision
                ? ['📊 Revise Power BI / Excel projects', '🔁 Re-solve SQL challenges', '🍽️ Lunch break included']
                : [`🗄️ SQL: ${sql} — Study + 10 practice queries`, `📊 ${excel}`, '🍽️ Lunch break included (30 min)']
        },
        {
            title: 'Evening',
            icon: '🌆',
            hours: isRevision ? '1h' : '2h',
            time: '4:00 PM – 6:00 PM',
            tasks: isRevision
                ? ['🧠 ML Theory: Review notes & flashcards', '📈 Practice weak areas']
                : [`🧠 ML/Theory: Revise concepts (${day <= 20 ? 'Stats & Probability' : day <= 40 ? 'Regression & Classification' : 'Trees, Clustering, DP'})`,
                   projectTask || '💻 Extra coding practice — build something small',
                   '🏋️ Workout / Walk (30 min)']
        },
        {
            title: 'Night',
            icon: '🌙',
            hours: isRevision ? '0h' : '1h',
            time: '8:00 PM – 9:00 PM',
            tasks: isRevision
                ? ['✅ Plan tomorrow', '😴 Rest & reset']
                : ['📖 Review today\'s notes', '📋 Plan tomorrow\'s priorities', '📝 Write daily journal/reflection', '😴 Lights out by 10:30 PM']
        }
    ];

    return {
        day, date: date.toISOString(), totalHours, codingProblems,
        python, sql, excel, leetcode, projectTask,
        isRevision, week, blocks,
        revisionTarget: isRevision ? 'Full week review' : `Review yesterday's ${PYTHON_DAILY[day - 2] || 'topic'}`
    };
}

function generateBalancedDay(day, date, python, sql, excel, leetcode, isRevision, week) {
    const totalHours = isRevision ? 3 : 5;
    const codingProblems = day <= 20 ? 3 : (day <= 40 ? 4 : 5);

    let projectTask = '';
    if (day === 20) projectTask = '🛠 Mini Project: Quiz Game';
    else if (day === 30) projectTask = '🛠 Project: Contact Book App';
    else if (day === 40) projectTask = '🛠 Project: Data Analysis with Pandas';
    else if (day === 50) projectTask = '🛠 Project: Dashboard with Power BI';
    else if (day === 60) projectTask = '🛠 Capstone: Data Analysis Report';

    const blocks = [
        {
            title: 'Morning',
            icon: '🌅',
            hours: isRevision ? '1.5h' : '2h',
            time: '8:00 AM – 10:00 AM',
            tasks: isRevision
                ? ['📖 Revision: Python & SQL key concepts', '🔄 Redo 3 problems', '☕ Break']
                : [`🐍 Python: ${python} — Study + 6 practice codes`, '📝 Code along & take notes', '☕ Break (10 min)']
        },
        {
            title: 'Afternoon',
            icon: '🌤️',
            hours: isRevision ? '1.5h' : '2h',
            time: '11:00 AM – 1:00 PM',
            tasks: isRevision
                ? ['📊 Revise Excel/PBI', '🧠 ML Theory flashcards', '🍽️ Lunch']
                : [`🧩 LeetCode: ${leetcode} — Solve ${codingProblems} problems`, `🗄️ SQL: ${sql} — 5 queries`, '🍽️ Lunch break']
        },
        {
            title: 'Evening',
            icon: '🌆',
            hours: isRevision ? '0h' : '1h',
            time: '4:00 PM – 5:00 PM',
            tasks: isRevision
                ? ['✅ Plan next day', '😴 Rest']
                : [`📊 ${excel}`, projectTask || '🧠 Theory / review notes', '🏋️ Workout (20 min)']
        }
    ];

    return {
        day, date: date.toISOString(), totalHours, codingProblems,
        python, sql, excel, leetcode, projectTask,
        isRevision, week, blocks,
        revisionTarget: isRevision ? 'Week review' : `Quick review of yesterday`
    };
}

function generateConsistencyDay(day, date, python, sql, excel, leetcode, isRevision, week) {
    const totalHours = isRevision ? 1 : 2;
    const codingProblems = day <= 20 ? 1 : 2;

    let projectTask = '';
    if (day === 30) projectTask = '🛠 Mini Project: Simple Calculator';
    else if (day === 60) projectTask = '🛠 Final Project: Data Analysis Script';

    const blocks = [
        {
            title: 'Study Block',
            icon: '📚',
            hours: isRevision ? '1h' : '1.5h',
            time: 'Any 1.5 hours (flexible)',
            tasks: isRevision
                ? ['📖 Review key topics from the week', '🔄 Redo 2 problems', '📝 Update notes']
                : [`🐍 Python: ${python} — Study + 3 codes`, `🧩 LeetCode: ${leetcode} — ${codingProblems} problem(s)`, `🗄️ SQL: ${sql} — 3 queries`]
        },
        {
            title: 'Practice Block',
            icon: '💻',
            hours: isRevision ? '0h' : '0.5h',
            time: 'Anytime (30 min)',
            tasks: isRevision
                ? ['✅ Plan next day']
                : [`📊 ${excel} (quick practice)`, projectTask || '📝 Review notes & journal', '🏋️ Short walk / stretch']
        }
    ];

    return {
        day, date: date.toISOString(), totalHours, codingProblems,
        python, sql, excel, leetcode, projectTask,
        isRevision, week, blocks,
        revisionTarget: isRevision ? 'Week review' : 'Recall yesterday'
    };
}

// ─── Project Ideas ─────────────────────────────────────────────────
const PROJECT_IDEAS = [
    { day: 14, title: 'Python Quiz Game', desc: 'Console-based quiz with score tracking', skills: ['Python basics', 'Functions', 'Lists'] },
    { day: 20, title: 'Smart Calculator', desc: 'Calculator with history and error handling', skills: ['Functions', 'Loops', 'Exception handling'] },
    { day: 28, title: 'Student Grade Manager', desc: 'OOP-based grade tracking system', skills: ['OOP', 'File handling', 'Classes'] },
    { day: 35, title: 'File Organizer', desc: 'Auto-sort files by extension into folders', skills: ['os module', 'File handling', 'Automation'] },
    { day: 40, title: 'Expense Tracker', desc: 'Track expenses with Pandas analysis', skills: ['Pandas', 'File I/O', 'Data analysis'] },
    { day: 46, title: 'Weather API App', desc: 'Fetch weather data from API and display', skills: ['APIs', 'JSON', 'requests library'] },
    { day: 48, title: 'Web Scraper', desc: 'Scrape and analyze website data', skills: ['BeautifulSoup', 'requests', 'HTML parsing'] },
    { day: 50, title: 'Power BI Dashboard', desc: 'Interactive sales dashboard', skills: ['Power BI', 'DAX', 'Data modeling'] },
    { day: 55, title: 'SQL + Python Analytics', desc: 'Query database from Python, analyze results', skills: ['sqlite3', 'SQL', 'Pandas'] },
    { day: 60, title: 'Capstone: Data Pipeline', desc: 'End-to-end: scrape → clean → analyze → visualize', skills: ['All skills combined'] },
];

// ─── Progress Tracking Guide ───────────────────────────────────────
const TRACKING_GUIDE = {
    title: 'How to Track Your Progress',
    methods: [
        { icon: '✅', method: 'Daily Checklist', desc: 'Complete the day checklist every evening before sleep.' },
        { icon: '📊', method: 'Analytics Tab', desc: 'Review your weekly completion rate and skill distribution.' },
        { icon: '📅', method: 'Calendar View', desc: 'Visual overview of your consistency. Green = victory.' },
        { icon: '🔥', method: 'Streak Counter', desc: 'Never break the chain. Your streak is your motivation.' },
        { icon: '📝', method: 'Daily Notes', desc: 'Write what you learned, struggled with, and will improve.' },
        { icon: '🏆', method: 'Achievement Badges', desc: 'Unlock badges as milestones. Collect them all!' },
    ]
};
