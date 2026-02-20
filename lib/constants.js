export const SITE = {
  name: "CASPer Prep",
  tagline: "by TSA (The Success Architect)",
  email: "info.thesuccessarchitect@gmail.com",
  instagram: "https://instagram.com/casperprep.tsa",
  tiktok: "https://tiktok.com/@casperprep.tsa",
  handle: "@casperprep.tsa",
  priceCAD: 215,
};

export const PLANS = {
  strategy: {
    name: "Strategy Course",
    subtitle: "Modules 1–5",
    desc: "Frameworks, mindset & answer techniques",
    price: 149,
    modules: [1, 2, 3, 4, 5],
    features: [
      "5 modules, 21 lessons",
      "6 response frameworks",
      "40+ high-impact ideas bank",
      "3 expert video analysis tutorials",
      "30-second success formula",
      "6 months of access",
    ],
  },
  question_bank: {
    name: "Question Bank + Self-Eval",
    subtitle: "Modules 6–7",
    desc: "Practice scenarios, answer keys & progress tracking",
    price: 99,
    modules: [6, 7],
    features: [
      "4 practice sets, 20+ scenarios",
      "Expert answer keys with frameworks",
      "Video & written response practice",
      "Built-in practice timer",
      "Self-evaluation & tracking tools",
      "6 months of access",
    ],
  },
  full: {
    name: "Full Course",
    subtitle: "All 7 Modules",
    desc: "Complete CASPer preparation system",
    price: 215,
    savings: 33,
    modules: [1, 2, 3, 4, 5, 6, 7],
    features: [
      "All 7 modules, 35 lessons",
      "6 response frameworks",
      "40+ high-impact ideas bank",
      "40+ practice questions + expert answers",
      "3 expert video analysis tutorials",
      "Self-evaluation & tracking tools",
      "6 months of full access",
    ],
  },
  upgrade: {
    name: "Upgrade to Full Course",
    price: 66,
    promoWindow: 14,
  },
};

export const MODULES = [
  {
    num: 1,
    title: "Understanding the CASPer Exam",
    desc: "Introduction to CASPer, exam format, evaluation criteria, question types, and must-use resources.",
    items: ["Introduction to CASPer", "Assessment format breakdown", "Evaluation criteria & question types"],
    lessons: 5,
  },
  {
    num: 2,
    title: "Developing a Winning Strategy",
    desc: "Core competencies, 40+ creative examples, personal experience strategy, and language tips for CASPer.",
    items: ["Core competency phrases", "40+ creative examples", "5 Meaningful Experiences list"],
    lessons: 4,
  },
  {
    num: 3,
    title: "Answering CASPer Questions With 6 Structured Frameworks",
    desc: "A dedicated framework for each of the 6 CASPer question types to structure your responses under pressure.",
    items: ["Situational Judgment Framework", "STAR-T & Reform Frameworks", "Reflection & Thought-Provoking Frameworks"],
    lessons: 7,
  },
  {
    num: 4,
    title: "Expert-Led Video Analysis Tutorials",
    desc: "3 expert video tutorials breaking down real scenario strategies in real-time.",
    items: ["Multiple perspectives analysis", "Assumption identification", "Action explanation techniques"],
    lessons: 3,
    highlight: true,
  },
  {
    num: 5,
    title: "The 30-Second Success Formula",
    desc: "How to use the 30-second reflection period strategically and optimize your typing speed.",
    items: ["30-second reflection strategy", "Quick notes template", "Typing speed optimization"],
    lessons: 2,
  },
  {
    num: 6,
    title: "Comprehensive Question Bank",
    desc: "4 practice sets with 21 scenarios and detailed expert answer keys using all 6 frameworks.",
    items: ["21 practice scenarios", "Expert answer keys with frameworks", "Progressive difficulty sets"],
    lessons: 10,
  },
  {
    num: 7,
    title: "CASPer Self-Evaluation",
    desc: "Reflection tools, daily practice logs, and self-assessment trackers to measure your progress.",
    items: ["Weekly reflection page", "Daily practice logs", "Self-assessment score tracker"],
    lessons: 4,
  },
];

export const TUTORIALS = [
  {
    num: 1,
    title: "Understanding Multiple Perspectives",
    videoId: "vTPRq_I2BDY",
    desc: "Learn how to identify and articulate multiple viewpoints in any CASPer scenario. This tutorial walks through the thought process of considering all stakeholders and demonstrating the balanced reasoning that evaluators reward.",
  },
  {
    num: 2,
    title: "Avoiding Assumptions",
    videoId: "UnngkMarr9A",
    desc: "One of the most common mistakes on CASPer is jumping to conclusions based on incomplete information. This tutorial teaches you how to recognize when you're making assumptions and how to demonstrate open-minded, evidence-based thinking.",
  },
  {
    num: 3,
    title: "Explaining Your Actions",
    videoId: "uisJSIINQ1U",
    desc: "CASPer evaluators want to see your reasoning, not just your conclusions. This tutorial breaks down how to clearly explain the 'why' behind your decisions so your responses feel thoughtful, mature, and deliberate.",
  },
];

export const TESTIMONIALS = [
  {
    text: "As a prospective dental student, I had to take the CASPer exam, yet I had no idea how or where to begin. Especially as a first-generation student, I was completely blindsided and had no expectations of doing well. That's when I came across the TSA CASPer Expert Strategy Course, which taught me everything from what the test entails to how to structure my answers to score maximum points. My favorite part about the course is the wide range of practice questions WITH expert answers, which a lot of online resources lack. And I also found the list of 40+ high-impact example ideas the course offers to adapt to different CASPer scenarios to make my responses more creative, mature, and well-structured. I highly recommend signing up for this prep course!",
    name: "Zahra F.",
    tag: "Dental School Applicant",
  },
  {
    text: "I took the CASPer recently, and this course truly helped me feel more prepared going into it. The structured frameworks were a game changer. They gave me a clear way to approach each scenario and made it easier to stay focused under pressure. I especially appreciated the unique, out-of-the-box ideas that helped me stand out while still hitting the core CASPer values.",
    name: "Alexis",
    tag: "Recent Test Taker",
  },
  {
    text: "I think this course will be of tremendous value to a lot of students that maybe aren't so confident. I could see your strategies extrapolating to interview strategies.",
    name: "Anonymous",
    tag: "Verified Student",
  },
];

export const BLOG_POSTS = [
  {
    slug: "what-casper-actually-tests",
    title: "What CASPer Actually Tests (And What Most Students Get Wrong)",
    excerpt:
      "CASPer isn't testing your medical knowledge or your ability to be a 'nice person.' It's evaluating your professional and interpersonal competencies under time pressure. Here's what that actually means.",
    tag: "Strategy",
    readTime: "6 min read",
    date: "Coming Soon",
  },
  {
    slug: "5-response-mistakes",
    title: "5 CASPer Response Mistakes That Cost You Quartile Points",
    excerpt:
      "After reviewing hundreds of practice responses, these are the five most common patterns that consistently land students in the lower quartiles. The good news? They're all fixable.",
    tag: "Common Mistakes",
    readTime: "8 min read",
    date: "Coming Soon",
  },
  {
    slug: "how-to-practice-casper",
    title: "How to Practice for CASPer When You Don't Have Practice Tests",
    excerpt:
      "Unlike the MCAT, there's no massive bank of past exams. But that doesn't mean you can't prepare effectively. Here's a structured approach to building your own practice routine.",
    tag: "Preparation",
    readTime: "5 min read",
    date: "Coming Soon",
  },
];

export const CHECKOUT_MODULES = [
  { title: "Module 1: Understanding the CASPer Exam", desc: "Introduction to CASPer, assessment format, evaluation criteria, question types & resources" },
  { title: "Module 2: Developing a Winning Strategy", desc: "Core competency phrases, 40+ creative examples, meaningful experiences & language tips" },
  { title: "Module 3: Answering CASPer Questions With 6 Structured Frameworks", desc: "Situational Judgment, Reform, STAR-T, Improvement, Big Thought-Provoking & Reflection frameworks" },
  { title: "Module 4: Expert-Led Video Analysis Tutorials", desc: "3 expert video breakdowns — perspectives, assumptions, and actions" },
  { title: "Module 5: The 30-Second Success Formula", desc: "30-second reflection strategy, quick notes template & typing speed optimization" },
  { title: "Module 6: Comprehensive Question Bank", desc: "4 practice sets with 21 scenarios & expert answer keys" },
  { title: "Module 7: CASPer Self-Evaluation", desc: "Reflection tools, practice logs & self-assessment trackers" },
];