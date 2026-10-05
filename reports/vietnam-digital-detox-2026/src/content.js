// Report text: British English, ken-writing method inside a Minto structure.
// House rules: no comma before "and" or "but", no long dash.
// Inline markup: **bold**, [^key] footnote from FN.

const FN = {
  dr_vn: "DataReportal (Kepios, We Are Social and Meltwater), Digital 2026: Vietnam. 79.0 million social media user identities (77.6% of the population); 85.6 million internet users (84.2%).",
  dr_global: "DataReportal, Digital 2026 Global Overview Report and April 2026 update: 5.79 billion social media user identities, 69.9% of the world's population.",
  dr_th: "DataReportal, Digital 2026: Thailand (October 2025 data): 79.1% social media penetration; 2 hours 58 minutes a day on social media. Global average daily time of 2 hours 40 minutes.",
  platforms: "DataReportal, Digital 2026: Vietnam; platform advertising audiences and Zalo monthly active users as reported by Elite Asia (2026).",
  online_time: "Tuoi Tre News (15 October 2025), reporting the Ministry of Public Security's 'Cham Ma Chac' online safety campaign: Vietnamese internet users spend 6 hours 38 minutes online a day.",
  wearesocial_2024: "We Are Social and Meltwater, Digital 2024: Vietnam, as reported by Bao Ha Tinh (2026): more than two hours a day on social media.",
  unplug: "UnplugWell (2025), Key Findings From the 2025 Global Digital Detox Survey: 15,000 respondents in 24 countries.",
  decisionlab: "Decision Lab, Connected Consumer surveys (2025), as reported by VietNamNet and Bao Ha Tinh: 74% of Gen Z use four or more social apps a day; 75% wish to leave at least one platform.",
  addiction_review: "Systematic review of 11 Vietnamese studies (12,931 participants) on digital addiction and mental health, Tap chi Y hoc Cong dong and PubMed Central (2025).",
  symptoms_2026: "Study reported by Bao Ha Tinh (2026): 90.7% of surveyed young Vietnamese reported physical symptoms linked to intensive digital use.",
  variable: "Ta-sinuzzaman, M. (2025), Reinforcement Schedule in the Digital Age; Sharma, Y. and Pothen, S. (2025), Social Media and the Dopamine System.",
  dopamine: "SalamGuard (2023), The Dopamine Loop.",
  scroll: "Pires, C. (2026), How Social Apps' Infinite Scroll Design Is Rewiring User Behavior, Visualmodo.",
  badge: "Saif, S. (2025), Red notification dot: the psychological manipulation to keep users engaged.",
  electroiq: "Bhalla, P. (2025), Digital Detox Statistics and Facts, ElectroIQ.",
  jmir: "Huang, J. and Ge, Z. et al. (2025), Associations Between Social Media Use and Anxiety and Depression Among Older Adults, JMIR Aging.",
  sleep: "Hjetland, G. et al. (2025), How and when screens are used: comparing different screen activities and sleep in Norwegian university students, Frontiers in Psychiatry.",
  eye: "Pucker, A. et al. (2024), Digital Eye Strain: Updated Perspectives, Taylor and Francis.",
  attention: "Poles, A. (2025), Impact of Social Media Usage on Attention Spans, Scientific Research.",
  phubbing: "Abeele, M. (2024), Co-present mobile phone use as an expectancy violation, Taylor and Francis.",
  limit_hour: "Davis, C. G. and Goldfield, G. S. (2025), Limiting social media use decreases depression, anxiety and fear of missing out in youth with emotional distress, American Psychological Association.",
  focus: "Fox, E. (2025), Scrolling instead of working? YouTuber Hank Green's new app wants to help, NBC News.",
  ikea: "Design Middle East (2025), IKEA UAE Launches 'Phone Sleep' Collection.",
  kitkat: "Herring, J. (2026), KitKat creates a wrapper that blocks phone signals, Famous Campaigns.",
  circular32: "Circular 32/2020/TT-BGDDT of the Ministry of Education and Training on general education school charters.",
  hcmc: "VnEconomy and Vietnam.vn (2025-2026): Ho Chi Minh City piloted restrictions at 16 schools from October 2025 and extended them to more than 500 schools from January 2026.",
  decree147: "Decree 147/2024/ND-CP on the management, provision and use of internet services and online information, effective 25 December 2024; DFDL (2024).",
  draft_2026: "Tuoi Tre News (24 July 2026), Bloomberg (24 July 2026) and TNGlobal (4 September 2026) on the draft decree of the Ministry of Culture, Sports and Tourism.",
  age_time: "Digital Web Solutions, global average daily time on social media by age group.",
  age_laws: "UNICEF Australia (2026); Channel News Asia (2026); The Straits Times (2026); Baker McKenzie (2026).",
  newcastle: "University of Newcastle (Australia) study of June 2026 on access to social media by children under 16.",
  nuvoodoo: "O'Connor, M. (2025), New Data: Excessive Screen Time Sparks a Digital Detox Movement, NuVoodoo.",
  monzo: "Monzo (2026), Managing your app notifications; Changing your marketing preferences.",
  uob: "UOB (2025), TMRW Smart Insights.",
  accounts: "State Bank of Vietnam as reported by The Investor (2026): nearly 87% of adults hold a bank account; draft National Financial Inclusion Strategy 2026-2030 targets 95% of those aged 15 and above.",
  cashless: "State Bank of Vietnam as reported by Thoi bao Tai chinh Viet Nam (2026): cashless payments equal to about 28 times GDP in 2025; volume up more than 42% and value up nearly 23%.",
  qr: "State Bank of Vietnam data for the first nine months of 2025: QR code payments up 150.67% in value; internet transactions up 51.2% in volume.",
  biometric: "Decision 2345/QD-NHNN of the State Bank of Vietnam: biometric authentication for transfers above VND 10 million or above VND 20 million a day, from 1 July 2024.",
  fraud: "Tuoi Tre News (October 2025): online fraud losses near VND 20 trillion in 2024. Ministry of Public Security: online fraud losses above VND 8 trillion in 2025.",
  vib: "Vnbusiness (2025) on MyVIB and the ViePro virtual assistant; Thi truong Tai chinh Tien te (2026) on LPBank Plus.",
  jomo: "Kantar, A. et al. (2025), Joy of Missing Out (JOMO) and Its Role in Reducing Social Media Addiction, SAGE Journals.",
};

const S = [];
const p = (text, o = {}) => S.push({ t: "p", text, ...o });
const h2 = (text) => S.push({ t: "h2", text });
const exhibit = (o) => S.push({ t: "exhibit", ...o });
const section = (o) => S.push({ t: "section", ...o });
const keymsg = (lead, items) => S.push({ t: "glance", title: "Key message", lead, items });
const callout = (text, o = {}) => S.push({ t: "callout", text, ...o });
const table = (o) => S.push({ t: "table", ...o });
const stats = (o) => S.push({ t: "stats", ...o });
const mech = (o) => S.push({ t: "mech", ...o });
const cards = (o) => S.push({ t: "cards", ...o });
const box = (o) => S.push({ t: "box", ...o });
const bullets = (items) => S.push({ t: "bullets", items });

// ============================================================ EXECUTIVE SUMMARY
section({ id: "exec", title: "Executive Summary", exec: true, headline: "Vietnam's digital detox will reprice banking around value, not time" });

p("**Situation.** Vietnam is one of the most connected societies in Asia. Social media reaches 77.6% of the population, above the world average of 69.9%. Internet users spend about 6 hours 38 minutes online every day. The platforms that take this time are designed to keep it: variable rewards, infinite feeds, red badges and algorithms that learn what holds attention.", { exec: true });
p("**Complication.** The costs are now visible. Three quarters of Vietnam's Gen Z say they want to leave at least one platform, nine in ten young people in a 2026 study reported physical symptoms of heavy digital use and online fraud cost Vietnamese users close to VND 20 trillion in 2024. Policy has started to move: Ho Chi Minh City restricted phones in more than 500 schools from January 2026 and a draft decree would require parents to register the social media accounts of children under 16.", { exec: true });
p("**Question.** If customers deliberately spend less time on screens, what happens to a banking system that has staked its growth on mobile engagement?", { exec: true });
p("**Answer.** Digital detox will not shrink digital banking in Vietnam. It will reprice it. The winning metric moves from time in the app to value per minute. We believe the banks that win will be those that answer quickly, alert only when it matters and earn trust by protecting customers' attention and money alike.", { exec: true });

stats({
  title: "Key findings at a glance",
  items: [
    ["77.6%", "of Vietnamese use social media (world: 69.9%)", "DataReportal 2026"],
    ["6h 38m", "spent online a day by the average internet user", "Ministry of Public Security, 2025"],
    ["75%", "of Gen Z want to quit at least one platform", "Decision Lab, 2025"],
    ["500+", "schools in Ho Chi Minh City restrict phones since January 2026", "HCMC Department of Education"],
    ["87%", "of adults hold a bank account; cashless payments equal 28x GDP", "State Bank of Vietnam, 2025"],
    ["VND 20 tn", "lost to online fraud in 2024", "Ministry of Public Security"],
  ],
});

exhibit({
  n: 1, img: "ex_pyramid", dir: "charts", pageBreak: true,
  title: "The argument on one page: digital detox moves banking from attention to value",
  notes: "Structured as a Minto pyramid: the governing thought at the top, three supporting arguments and the evidence beneath each.",
  source: "ABrighter Research",
});

// ============================================================ INTRODUCTION
section({ id: "intro", title: "Introduction", eyebrow: "01" });

keymsg("Vietnam has gone further into the digital world than most of the region. The first signs of a deliberate step back are now appearing.", [
  "Social media reaches 77.6% of Vietnamese, eight points above the world average.",
  "Globally the share of people planning a digital break doubled from 31% in 2020 to 63% in 2025.",
  "For banks the shift is both a risk to engagement and an opening for better products.",
]);

p("Artificial intelligence (AI) and online platforms have become part of daily life. People stay connected and find information anywhere with a few taps. Daily routines are more bound to the digital world than ever before. In Vietnam the pattern is especially strong. Facebook, Zalo, TikTok and YouTube each reach more than 60 million people. These platforms let users follow trends, build networks, learn, find inspiration and share their views.");

p("The scale of adoption sets Vietnam apart. In 2026 Vietnam counted 79.0 million social media user identities, equal to 77.6% of the population. It also counted 85.6 million internet users.[^dr_vn] The world average stood at 69.9% in April 2026.[^dr_global] Vietnam therefore sits close to Thailand (79.1%), one of the most social-media-intensive markets in Asia.[^dr_th] Time online is high as well. The average Vietnamese internet user spends 6 hours 38 minutes online each day,[^online_time] of which more than two hours go to social media.[^wearesocial_2024]");

exhibit({
  n: 2, img: "ex_vn_world", dir: "charts",
  title: "Vietnam uses social media more than the world average and its attention is concentrated on four platforms",
  notes: "Panel A: social media user identities as a share of the total population. Panel B: Facebook and YouTube advertising audiences, TikTok users aged 18 and above and Zalo monthly active users; the measures differ by platform and are not strictly comparable.",
  source: "DataReportal, Digital 2026 (Vietnam, Thailand and Global); Elite Asia (2026); ABrighter Research",
});
box({
  label: "Deep dive 3", title: "Why Vietnam is so connected",
  blocks: [
    { t: "p", text: "Several forces explain why Vietnam sits above the world average. The first is that Vietnam moved straight to the smartphone: for many households the phone is the first and only computer, so work, study, shopping and payments all run through one device. The second is the role of messaging. Zalo, a Vietnamese platform with 78.3 million monthly users, often carries work groups, school announcements and family conversations, so stepping away from it means stepping away from daily obligations. The third is that payments now live on the phone as well, through QR codes that have spread from supermarkets to street stalls." },
    { t: "p", text: "The consequence is that digital detox in Vietnam cannot mean switching off completely. Few people can afford to leave Zalo or their banking app. The practical form of detox is therefore selective: fewer platforms, fewer notifications and shorter, more purposeful sessions. That is precisely the behaviour that will reshape how Vietnamese customers judge digital services." },
  ],
});

p("Against this backdrop **digital detox, the intentional practice of taking a break from social media and digital devices, has become a growing wellness trend.** It is strongest among working professionals and younger people who live much of their lives online. Prolonged engagement with digital platforms has contributed to digital fatigue, a state of physical and mental exhaustion from screen use. It has also raised stress levels, shortened attention spans and blurred the line between online identity and real life. Cyberbullying and online scams have pushed many people, especially the young, to disconnect for a while.");

p("The global data show how fast the idea has spread. In the 2025 Global Digital Detox Survey of 15,000 people in 24 countries, 63% planned to take a break from the digital world, more than double the 31% recorded in 2020.[^unplug] Vietnam shows the same appetite. Decision Lab found that 75% of Vietnamese Gen Z wish to leave at least one of the social platforms they use, even though 74% are active on four or more apps every day.[^decisionlab] The gap between what young people do and what they say they want is the space in which digital detox grows.");

p("This shift matters for commercial banks, which have moved most of their customer relationships onto mobile apps. Less time online could mean fewer digital touchpoints and less room to sell. It could also open demand for products that respect customers' time and well-being. This report explains how platforms capture attention, why digital detox matters, how society and the state in Vietnam are responding and what this means for digital banking.");

// ============================================================ DESIGN
section({ id: "design", title: "How Social Media Platforms Are Designed to Maximise Engagement", eyebrow: "02" });

keymsg("Heavy use is not only a matter of willpower. Platforms are engineered to bring users back more often and keep them longer.", [
  "Four design mechanisms do most of the work: unpredictable rewards, endless feeds, red badges and personalised algorithms.",
  "Each one exploits a known feature of the brain's reward system.",
  "Understanding the mechanisms is the first step to designing products that respect attention.",
]);

p("Excessive social media use is not solely the result of individual behaviour. It is also driven by the behavioural and psychological design of the platforms themselves, which are built to encourage users to return more often and stay longer. Four mechanisms stand out.");

mech({
  img: "il_slot", n: 1, title: "Variable rewards: the slot machine in your pocket",
  text: "One of the most powerful mechanisms is the **variable reinforcement schedule**. The home feed serves content tailored to each user, while pull-to-refresh delivers something new and unpredictable each time. The action closely resembles pulling the lever of a slot machine.[^variable] While the brain anticipates an uncertain reward it releases more dopamine, the neurotransmitter linked to pleasure and motivation. The excitement keeps users scrolling in search of the next reward and, over time, the cycle hardens into a habit known as the dopamine loop.",
});
box({
  label: "Deep dive 1", title: "Why an unpredictable reward is stronger than a certain one",
  blocks: [
    { t: "p", text: "Behavioural psychology has studied this effect for decades. When a reward arrives every time, the brain soon learns to expect it and the anticipation fades. When it arrives at random, the brain can never quite predict it, so each attempt carries the chance of a surprise. That gap between what was expected and what arrives keeps the dopamine response alive. Behaviour rewarded on such a variable schedule is also the hardest to stop, because a long run without reward never proves that the next attempt will fail." },
    { t: "p", text: "This explains a feature of social media that users often find puzzling. Most refreshes bring nothing important, yet people keep refreshing. The occasional message, like or striking video is enough to sustain the habit. For banks the lesson is direct. Mechanics borrowed from games and casinos, such as spin-to-win rewards, streaks or surprise prizes in a payments app, may lift engagement in the short term. In a financial setting they can also encourage impulsive behaviour and will sit badly with customers who are trying to use their phones less." },
  ],
});

box({
  label: "Box 1", title: "What is the dopamine loop?",
  blocks: [
    { t: "p", text: "**Dopamine plays a central role in the brain's reward system.** It is released when a person feels pleasure or expects a reward. The dopamine loop is a cycle in which rewarding experiences reinforce behaviour and make it more likely to be repeated. It has four stages.[^dopamine]" },
    { t: "img", img: "il_loop", dir: "illus", width: 560 },
    { t: "p", text: "The fourth stage explains why the habit is so hard to break. Once the brain has linked the trigger to the reward, people reach for their phones at the sound of a notification or at the first moment of boredom, often without being aware of it." },
  ],
});

mech({
  img: "il_scroll", n: 2, title: "Infinite scroll: no natural place to stop",
  text: "Most platforms load new content automatically as users scroll, without any need to turn a page or switch to another site. **Infinite scroll removes the natural stopping points** that traditional web pages provide, so the decision to stop never arrives on its own. Many users keep consuming content almost automatically and spend far longer on the platform than they intended.[^scroll]",
});

mech({
  img: "il_badge", n: 3, title: "Red badges: notifications built to be noticed",
  text: "Platforms design their notifications to pull users back. **Red badges on app icons are highly visible and hard to ignore.** Red carries a sense of urgency and importance, while the small circle is a shape the brain processes very quickly. Together these cues draw attention to unread messages or pending activity and prompt users to reopen the app almost by instinct.[^badge]",
});

mech({
  img: "il_echo", n: 4, title: "Personalised algorithms: comfortable but narrowing",
  text: "Recommendation algorithms are the engine of content curation. They learn from viewing time, likes, comments and shares to predict what each user wants and serve more of it. This helps users find relevant content quickly. It also **repeats exposure to views that confirm what users already believe**, which over time can build an echo chamber in which other perspectives rarely appear, critical thinking weakens and existing biases deepen.",
});
box({
  label: "Deep dive 2", title: "The attention business model: why platforms will not help users stop",
  blocks: [
    { t: "p", text: "Most social platforms are free to the user because the product being sold is the user's attention. Advertising revenue grows with the number of users, the time each one spends, the number of advertisements shown in that time and the price advertisers pay for them. Every design choice that adds a minute of use therefore adds revenue. Infinite scroll, red badges and personalised feeds are not side effects of the business model. They are the business model." },
    { t: "p", text: "It follows that the impulse to disconnect is unlikely to come from the platforms themselves. It has to come from users who change their habits, from regulators who set limits and from other businesses whose interests differ. That is where banks stand apart. A bank does not earn its living from minutes of attention. It earns from deposits, loans, payments and the trust that keeps customers coming back for them. Banks are therefore one of the few large digital businesses that can align with digital detox rather than fight it." },
  ],
});

// ============================================================ WHAT / WHY
section({ id: "why", title: "What Is Digital Detox and Why Does It Matter?", eyebrow: "03" });

keymsg("Digital detox is a deliberate break from screens. It matters because heavy use carries real costs to the mind, the body and relationships.", [
  "The evidence links heavy social media use to depression, poor sleep, eye strain, shorter attention and weaker relationships.",
  "In Vietnam studies of young people show the same pattern.",
  "The aim is balance and not rejection of technology.",
]);

p("**Digital detox refers to the intentional practice of refraining from using digital devices, such as smartphones, computers and tablets, for a period of time.** It can be as simple as a temporary screen break. The goal is to give mind and body time to recover from constant digital stimulation and to restore a healthier balance between online and offline life. The need has grown as long sessions on news feeds and short-form video bring hidden costs in stress, anxiety and poor sleep. Regular breaks can reduce the harm in five areas.");

exhibit({
  n: 3, img: "il_icons", dir: "illus",
  title: "Digital detox helps in five areas of life",
  source: "ABrighter Research",
});

p("**1. Mental well-being.** Excessive social media use is associated with a higher risk of depression. A 2025 study in JMIR found that older adults who spent more than six hours a day on social media were about 1.5 times more likely to show depressive symptoms than those who used it for an hour or less.[^jmir] Heavy use can also feed newer forms of stress such as the fear of missing out (FOMO) and nomophobia, the anxiety of being without one's phone.");
p("**2. Sleep quality.** Blue light from screens stimulates the brain and suppresses melatonin, the hormone that regulates the sleep-wake cycle. Each additional hour of screen time before bed is associated with a 59% higher risk of insomnia and about 24 minutes less sleep.[^sleep]");
p("**3. Physical health.** Long screen sessions raise the risk of digital eye strain: tired eyes, blurred vision, headaches and pain in the neck and shoulders. Focusing on a screen also cuts the blink rate from the normal 15 to 20 blinks a minute, which dries the eyes and can lead to dry eye syndrome.[^eye]");
p("**4. Attention and cognitive performance.** A steady diet of short-form content trains the brain to expect rapid change and makes sustained focus harder. A 2025 study found that people who spent less than two hours a day on social media, mostly for work or study, performed better on attention and memory than those who spent more than four hours on entertainment platforms.[^attention]");
p("**5. Relationships.** Using a phone during face-to-face conversation, known as phubbing, lowers the quality of interaction. The other person feels ignored. The basic expectation that conversation partners stay attentive is broken.[^phubbing]");

p("Vietnamese evidence points the same way. A review of 11 Vietnamese studies covering 12,931 people found digital addiction rates ranging from 7.3% to more than 69% depending on the group studied. Eight of those studies linked digital addiction with depression and six with anxiety.[^addiction_review] In a 2026 study 90.7% of young Vietnamese respondents reported physical symptoms linked to intensive digital use.[^symptoms_2026] The cost of the attention economy is therefore already visible in Vietnamese clinics and classrooms.");

exhibit({
  n: 4, img: "ex_activities", dir: "charts",
  title: "Scrolling social media is the main reason people seek a digital detox while one in seven also wants a break from financial apps",
  notes: "Share of internet users who cite each activity as a reason to consider a digital detox.",
  source: "ElectroIQ (2025); ABrighter Research",
});

p("The ranking contains a signal for banks. Scrolling social media tops the list at 64.2%. But 14.5% of users also name checking financial apps as something that prompts them to consider a detox.[^electroiq] Banking is not exempt from digital fatigue. A bank app that demands attention for its own sake will increasingly be treated like any other app that needs to be switched off.");

p("**Digital detox can be practised in many ways.** Common approaches include limiting social media to an hour a day,[^limit_hour] avoiding screens in the hour before bed, setting screen-free periods during the day, blocking non-essential notifications and switching phones to greyscale to make them less appealing. AI-powered well-being tools and wearables can also prompt users to take breaks. These habits work best alongside offline activities such as reading, exercise or learning a new skill.");
p("**Ultimately, digital detox does not mean rejecting technology.** It means finding a healthy balance between online and offline life so that people keep the benefits of digital tools while limiting their long-term cost to physical and mental health.");

// ============================================================ ADVANCING
section({ id: "policy", title: "Advancing Digital Detox: From Social Awareness to Public Policy", eyebrow: "04" });

keymsg("Digital detox has moved from personal choice to product design and public policy. Vietnam is now part of that shift.", [
  "Companies are turning disconnection into a product feature or a brand campaign.",
  "Governments are restricting phones in schools and social media for children.",
  "Vietnam limits gaming time for minors and is drafting parental registration for under-16 accounts.",
]);

p("**Digital detox is gaining momentum across society.** Digital well-being apps now help users manage screen time, while well-known brands are launching products and campaigns that encourage healthier habits. Three examples show the range of approaches.");

cards({
  n: 5, title: "Three ways business is turning disconnection into a product",
  items: [
    { img: "il_bean", head: "Focus Friend", sub: "App, launched August 2025", text: "A virtual bean knits socks and scarves while the user's distracting apps stay blocked. If the user quits early, the bean stops knitting and the session fails. Responsibility to the character builds self-control.[^focus]" },
    { img: "il_bed", head: "The Phone Sleep Collection", sub: "IKEA, UAE, October 2025", text: "Buyers of sleep products receive a miniature bed for their phone with an NFC chip. Customers who meet sleep targets, such as seven hours a night for seven nights, earn discounts.[^ikea]" },
    { img: "il_wrapper", head: "Break Mode", sub: "KitKat Panama, April 2026", text: "A reusable wrapper lined with signal-blocking material cuts the phone off from mobile networks, Wi-Fi, Bluetooth and GPS. It was handed out at universities, concerts and fairs.[^kitkat]" },
  ],
  source: "NBC News (2025); Design Middle East (2025); Famous Campaigns (2026). Illustrations by ABrighter Research",
});

p("The common thread is design. Each initiative uses the same behavioural tools that platforms use to capture attention, such as rewards, responsibility to a character or a physical ritual. Each turns them towards disconnection. That is the lesson for any business that wants to stand on the right side of the trend.");

p("**Beyond the private sector, governments are placing more emphasis on healthy digital habits,** especially for children and adolescents. South Korea passed a law in March 2026 banning smartphones and other devices from classrooms. Poland will restrict smartphone use in primary schools from 1 September 2026. The United Kingdom, Norway, France, Spain and Denmark are considering or advancing similar rules.");

mech({
  img: "il_school", n: 0, title: "Vietnam: from school rules to platform rules",
  text: "Vietnam is moving on several fronts. Circular 32/2020 already bars students from using phones in class except for learning with a teacher's permission.[^circular32] Ho Chi Minh City went further: after a pilot at 16 schools from October 2025 it **restricted phone use during break times in more than 500 schools from January 2026** to encourage students to talk, play and focus.[^hcmc] Decree 147/2024/ND-CP, in force since 25 December 2024, caps online gaming for under-18s at 60 minutes per game and 180 minutes a day and requires parents to register accounts for under-16s.[^decree147]",
});

p("The next step concerns social media itself. In July 2026 the Ministry of Culture, Sports and Tourism published a draft decree that would have barred children under 16 from posting, commenting or reacting on social media. Following consultation, the draft reported in September 2026 does not ban under-16s. It requires parents to register and supervise their accounts and bars children under 13 from posting, commenting or sharing.[^draft_2026] Platforms would have to identify child users and filter harmful content. The decree is not yet final. Its direction is clear, however: Vietnam is choosing supervised access rather than prohibition.");

box({
  label: "Box 2", title: "Young people and social media",
  blocks: [
    { t: "p", text: "**Young people spend more time on social media than any other age group,** which makes them especially vulnerable to cyberbullying, inappropriate content, misinformation, scams and other online crime. These risks can affect mental health and development for years. In response a growing number of countries have restricted access to social media for children. Australia was the first to legislate a ban for under-16s. Indonesia was the first in Southeast Asia to adopt similar measures." },
    { t: "exhibit", n: 6, img: "ex_age", dir: "charts", title: "Teenagers spend three times as long on social media each day as adults over 50", source: "Digital Web Solutions; ABrighter Research" },
    { t: "table", n: "Table 1", title: "Vietnam is joining a growing list of countries that limit children's access to social media",
      head: ["Country", "Measure", "Platforms or scope", "Effective date"], widths: [1500, 3000, 3138, 1700],
      rows: [
        ["Australia", "Ban for under-16s", "TikTok, X, Instagram, Facebook, YouTube, Snapchat, Threads, Reddit, Kick, Twitch", "10 Dec 2025"],
        ["Indonesia", "Restrictions for under-16s", "YouTube, TikTok, Facebook, Instagram, Threads, X, Bigo Live, Roblox", "28 Mar 2026"],
        ["Malaysia", "Age checks barring under-16 accounts", "Facebook, Instagram, TikTok, YouTube", "1 Jun 2026"],
        ["United Arab Emirates", "Ban for under-15s", "TikTok, X, Instagram, Facebook, Snapchat", "Jun 2027"],
        ["Vietnam (draft)", "Parental registration under 16; no posting under 13", "All social media platforms", "Not yet final"],
      ], source: "UNICEF Australia; Channel News Asia; The Straits Times; Baker McKenzie; Tuoi Tre News; TNGlobal (2025-2026)" },
    { t: "p", text: "Enforcement remains the hard part. A June 2026 study by the University of Newcastle in Australia found that more than 85% of Australian children under 16 could still reach social media despite the new law.[^newcastle] Weak age verification, fake accounts, borrowed accounts and private browsing all undermine age limits. Vietnam's choice of parental registration and supervision rather than a ban may prove easier to enforce, provided platforms build reliable age checks." },
  ],
});

// ============================================================ BANKING
section({ id: "banking", title: "The Implications of Digital Detox for Digital Banking in Vietnam", eyebrow: "05" });

keymsg("Digital detox will not reduce the need for banking. It will change what customers reward: value per minute rather than minutes per session.", [
  "Vietnam's banking has moved onto the phone faster than almost anywhere, which raises the stakes.",
  "Fraud and biometric checks already make security a source of both friction and trust.",
  "Banks need new metrics, new segments and a new pricing logic built on value rather than attention.",
]);

h2("Vietnam has moved banking onto the phone");
p("Few countries have digitised payments as fast as Vietnam. Nearly 87% of adults now hold a bank account and the State Bank of Vietnam aims for 95% of people aged 15 and above by 2030.[^accounts] Cashless payments in 2025 were worth about 28 times GDP. Their volume rose by more than 42% and their value by nearly 23%.[^cashless] QR payments grew by 150.67% in value in the first nine months of 2025.[^qr] For millions of Vietnamese the bank app is now the most frequently used financial tool in their lives.");

exhibit({
  n: 7, img: "ex_banking", dir: "charts",
  title: "Digital payments are growing fast while fraud keeps raising the cost of trust",
  notes: "Panel B compares an estimate for 2024 reported by the press with the Ministry of Public Security's figure for online fraud in 2025; the scopes differ, so the decline should be read with caution.",
  source: "State Bank of Vietnam (2025); Tuoi Tre News (2025); Ministry of Public Security (2026); ABrighter Research",
});

p("The same channel carries risk. Online fraud cost Vietnamese users close to VND 20 trillion in 2024 and more than VND 8 trillion in 2025.[^fraud] Since 1 July 2024 the State Bank has required biometric authentication for transfers above VND 10 million or above VND 20 million a day.[^biometric] The rule shows that friction is not always bad. A face scan that stops a scam adds a few seconds and saves a great deal of trust. The design challenge for banks is to remove the friction that wastes time while keeping the friction that protects.");

h2("Engagement metrics are losing their meaning");
p("**The digital detox movement is encouraging consumers to use digital platforms less and with more intent.** The trend is strongest among Gen Z and Millennials, who are more inclined than older generations to cut their daily screen time.[^nuvoodoo] Many bank engagement strategies have been built to bring customers back to the app more often, through notifications, offers and product recommendations. As customers try to reduce unnecessary screen time, banks will need to rethink how they deliver digital experiences.");
p("**Rather than maximise engagement through longer sessions, banks will need to deliver efficient, intuitive and low-friction experiences** that let customers complete tasks quickly and see only what matters to them. Exhibit 8 sets out the choice. Every banking interaction can be placed by the value it gives the customer and the time it asks of them. Digital detox pushes customers to abandon the attention trap and to reward what we call calm banking.");

exhibit({
  n: 8, img: "ex_matrix", dir: "charts",
  title: "Customers who detox will abandon the attention trap and reward calm banking",
  source: "ABrighter Research",
});
box({
  label: "Deep dive 4", title: "Why less screen time need not mean less revenue for banks",
  blocks: [
    { t: "p", text: "The fear behind the question in this report is simple: fewer sessions mean fewer chances to sell. It rests on a funnel view of digital banking in which revenue equals visits multiplied by offers shown multiplied by the share that converts. In that view digital detox cuts the top of the funnel and everything below it shrinks." },
    { t: "p", text: "The economics of banking point elsewhere. Most of a retail bank's earnings come from being the customer's main bank: the account that receives the salary, holds the savings and handles the bills. Balances held in current and savings accounts are among the cheapest sources of funding a bank has. A customer who trusts the bank with daily money is the most likely to borrow from it when a life event arrives. None of this depends on how long the customer spends in the app. It depends on whether the customer trusts the bank enough to keep their money there." },
    { t: "p", text: "Digital detox therefore shifts the battleground from attention to primacy. A bank that saves its customers time, protects them from fraud and speaks up only when it matters is more likely to become their main bank. A bank that fills their screens with offers risks being muted, uninstalled or kept only for occasional transfers. The revenue that is at risk is the impulse cross-sell. The revenue that is at stake is the relationship." },
  ],
});

h2("Leading banks already compete on calm");
p("Several banks have already adapted. **Monzo**, the UK digital bank, lets customers choose which notifications they receive, from new features to promotional offers and marketing.[^monzo] Customers can change these preferences at any time, which reduces notification fatigue and gives them control. **BBVA** in Spain and **UOB** in Singapore use AI in their personal finance services. BBVA sorts transactions automatically into spending, income, savings and investment. UOB's Smart Insights analyses spending behaviour and offers personalised insights.[^uob] Both send alerts when spending patterns change, so customers see only what needs their attention.");

mech({
  img: "il_bank", n: 0, title: "In Vietnam the race to the calm app has begun",
  text: "Vietnamese banks are moving in the same direction. VIB equipped millions of customers with **ViePro, a 24/7 virtual assistant** that it aims to develop into a financial adviser that helps with borrowing capacity and spending.[^vib] LPBank launched **LPBank Plus as an 'AI-first' app** with Smart Nav, a large-language-model navigator that takes users straight to what they need. It also offers LP Pay, an assistant that makes transfers through conversation. The common idea is that a customer should be able to say what they want and be done.",
});

h2("Four customer segments need four different answers");
p("Customers will not detox in the same way. For product and pricing decisions it helps to group them by how they want to relate to their bank app. The segments below are an ABrighter Research framework built on the behaviours described in this report. They are not the result of a survey. Banks should size them with their own data.");

table({
  n: "Table 2",
  title: "Four segments react differently to digital detox and each needs a different offer",
  head: ["Segment", "Typical profile", "What they value", "What wins them"],
  widths: [1900, 2400, 2600, 2738],
  rows: [
    ["Always-on scrollers", "Gen Z and young professionals; four or more social apps a day", "Speed, social features, rewards", "Smart limits and spending nudges that feel helpful rather than preachy"],
    ["Selective connectors", "Mid-career urban users who are cutting screen time on purpose", "Control over notifications and a clear overview in seconds", "Notification settings, one-screen dashboards and AI summaries"],
    ["Digital minimalists", "Users who switch off for days or keep only essential apps", "Reliability, security and no surprises", "Scheduled reports, voice or chat payments and strong fraud protection"],
    ["Assisted users", "Older and rural customers, often new to digital banking", "Simplicity, human help, safety", "Simple mode, biometric security and access to a person when needed"],
  ],
  source: "ABrighter Research framework",
});

h2("Pricing and value must follow the shift");
p("Digital detox also changes how banks earn money from digital channels. Fee income and cross-selling that depend on frequent sessions will weaken if customers open the app less often. The alternative is to price the value that the bank delivers rather than the attention it captures.");

table({
  n: "Table 3",
  title: "The value model replaces the attention model in what banks measure and sell",
  head: ["Dimension", "Attention model", "Value model"],
  widths: [2200, 3600, 3838],
  rows: [
    ["Success metric", "Daily active users, session length, screen views", "Time to complete a task, problems solved, trust and retention"],
    ["Notifications", "Frequent offers to bring users back", "Few alerts, chosen by the customer and triggered by events that matter"],
    ["Cross-selling", "Banners and pop-ups during the session", "Timely advice at life events, based on data the customer has shared"],
    ["Revenue logic", "Fees per transaction and campaign-driven sales", "Bundles and subscriptions priced on outcomes such as savings, protection and planning"],
    ["Security", "Seen as friction to minimise", "Sold as part of the value: protection that customers notice and trust"],
  ],
  source: "ABrighter Research",
});

p("As customers put more weight on digital well-being, **the institutions that succeed will be those that design digital services around a deep understanding of changing expectations.** By offering experiences that are simple, personal and respectful of people's time and attention, banks can raise satisfaction, strengthen long-term relationships and build more lasting loyalty.");

// ============================================================ VIEW
section({ id: "view", title: "ABrighter Research View", eyebrow: "06" });

callout("We expect the search for balance between online and offline life to become one of the defining consumer trends in Vietnam over the next few years. More customers will choose selective disconnection: not following every update and not joining every conversation. This is the Joy of Missing Out (JOMO). Customers will spend less time on social media and more on offline activities. For banks the question is no longer how to win more of the customer's time. It is how to give more value in less of it.", { strong: true });

p("We would expect the shift to arrive unevenly. Young urban customers will lead it, as they already say they want to leave at least one platform. Older and rural customers will follow more slowly and will need human support as much as digital tools. Regulation will add pressure from the other side: rules on children's accounts, on gaming time and on fraud will make safety and simplicity part of what a good digital service means in Vietnam.[^jomo]");

p("The rise of digital detox reaches beyond individual lifestyle choices. **It is also a strategic challenge for commercial banks as customer expectations change.** Customers who practise digital detox are more likely to cut their time on social media, turn off non-essential notifications and open apps only when necessary. That may mean fewer sessions in banking apps and fewer chances to promote products through digital channels. Several actions are required.");

p("**The first is to change the scoreboard.** Banks should measure time to complete a task, problems solved and trust rather than time in the app. What is measured is what product teams will optimise, so the metric must change before the design can.");
p("**The second is to give customers control of their attention.** Notification settings that customers choose, quiet hours and a single screen that shows what matters should become standard. This mirrors what Monzo has done and costs little to build.");
p("**The third is to make AI the shortcut, not the destination.** Assistants such as VIB's ViePro and LPBank's Smart Nav should be judged by how quickly they end a session with the problem solved, not by how long the conversation lasts.");
p("**The fourth is to sell protection as value.** With fraud losses measured in trillions of dong, the security that biometric checks and smart alerts provide is something customers will pay for in trust and loyalty. Banks should present it as part of the product rather than a hurdle.");
p("**The fifth is to price outcomes rather than activity.** Bundles built around saving, protection and planning, together with partnerships in travel, preventive health and well-being, let banks earn from the value they create while customers spend less time on screens.");

p("Looking ahead, the banks that win customers' trust may not be those that maximise screen time or engagement. They will be those that let people manage their money quickly, easily and with confidence, reduce the mental load of financial decisions and leave them more time for life beyond the screen. Success will depend on whether banks can change their metrics, protect customers without slowing them down and earn from value rather than attention. With 87% of adults already banked and digital payments still growing by double digits, Vietnam's banks have the reach to lead. The best digital experience in a detox era may be the one customers barely notice.");

const REFS = [
  "Abeele, M. (2024). Co-present mobile phone use as an expectancy violation: revisiting 'phubbing' in two lab-based experiments. https://www.tandfonline.com/doi/full/10.1080/15534510.2024.2419622",
  "Baker McKenzie (2026). United Arab Emirates: Legislation Issued Banning Under-15s from Social Media. https://www.bakermckenzie.com",
  "Bhalla, P. (2025). Digital Detox Statistics and Facts (2025). ElectroIQ. https://electroiq.com/stats/digital-detox-statistics/",
  "Bloomberg (24 July 2026). Vietnam weighs limiting social media use for children under 16. https://www.bloomberg.com",
  "CNA (2026). Indonesia starts implementing social media restrictions for children under 16. https://www.channelnewsasia.com",
  "Davis, C. G. and Goldfield, G. S. (2025). Limiting social media use decreases depression, anxiety and fear of missing out in youth with emotional distress. https://psycnet.apa.org",
  "Decision Lab (2025). Connected Consumer survey and Gen Z insights. https://www.decisionlab.co",
  "Design Middle East (2025). IKEA UAE Launches 'Phone Sleep' Collection. https://design-middleeast.com",
  "DFDL (2024). Vietnam: More Requirements on Internet Service and Online Information (Decree 147/2024/ND-CP). https://www.dfdl.com",
  "Elite Asia (2026). Top Digital and Social Media Trends in Vietnam in 2026. https://www.eliteasia.co",
  "Fox, E. (2025). Scrolling instead of working? YouTuber Hank Green's new app wants to help. NBC News. https://www.nbcnews.com",
  "Herring, J. (2026). KitKat creates a wrapper that blocks phone signals. Famous Campaigns. https://www.famouscampaigns.com",
  "Hjetland, G. et al. (2025). How and when screens are used: comparing different screen activities and sleep in Norwegian university students. https://www.frontiersin.org",
  "Huang, J. and Ge, Z. et al. (2025). Associations Between Social Media Use and Anxiety and Depression Among Older Adults. https://aging.jmir.org",
  "Kantar, A. et al. (2025). Joy of Missing Out (JOMO) and Its Role in Reducing Social Media Addiction. https://journals.sagepub.com",
  "Kepios (2026). Digital 2026: Vietnam; Digital 2026: Thailand; Digital 2026 Global Overview Report. https://datareportal.com",
  "Monzo (2026). Managing your app notifications. https://monzo.com",
  "O'Connor, M. (2025). New Data: Excessive Screen Time Sparks a Digital Detox Movement. NuVoodoo. https://nuvoodoo.com",
  "Pires, C. (2026). How Social Apps' Infinite Scroll Design Is Rewiring User Behavior. https://visualmodo.com",
  "Poles, A. (2025). Impact of Social Media Usage on Attention Spans. https://www.scirp.org",
  "Pucker, A. et al. (2024). Digital Eye Strain: Updated Perspectives. https://www.tandfonline.com",
  "Saif, S. (2025). Red notification dot: the psychological manipulation to keep users engaged. https://blog.saif71.com",
  "SalamGuard (2023). The Dopamine Loop. https://salamguard.com",
  "Sharma, Y. and Pothen, S. (2025). Social Media and the Dopamine System. https://ijirt.org",
  "State Bank of Vietnam (2025-2026), as reported by The Investor and Thoi bao Tai chinh Viet Nam. Bank account ownership and cashless payments.",
  "Ta-sinuzzaman, M. (2025). Reinforcement Schedule in the Digital Age. https://www.researchgate.net",
  "The Straits Times (2026). Malaysia requires social media age checks barring under-16 accounts. https://www.straitstimes.com",
  "TNGlobal (4 September 2026). Report on Vietnam's revised draft decree: parents to register and supervise accounts of under-16s. https://technode.global",
  "Tuoi Tre News (2025-2026). Online scams and internet use; draft decree on social media for children. https://news.tuoitre.vn",
  "UNICEF Australia (2026). Social media ban explainer. https://www.unicef.org.au",
  "UnplugWell (2025). Key Findings From the 2025 Global Digital Detox Survey. https://unplugwell.com",
  "UOB (2025). TMRW Smart Insights. https://www.uob.co.th",
  "VnEconomy (2025). HCM City officially restricts mobile phone use during school breaks starting January. https://en.vneconomy.vn",
  "Vnbusiness (2025). MyVIB recognised as the most innovative AI application in digital banking. https://vnbusiness.vn",
];

module.exports = { S, FN, REFS };
