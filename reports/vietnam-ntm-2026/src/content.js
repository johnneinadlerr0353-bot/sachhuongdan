// Report text. Written in British English following the ken-writing method:
// claim, mechanism, consequence, condition. House rules: no comma before
// "and" or "but", no long dash, labels on every inference.
// Inline markup: **bold**, [^key] footnote drawn from FN below.

const FN = {
  nso_gdp: "National Statistics Office (NSO), Ministry of Finance, socio-economic report for 2025 (January 2026): GDP growth 8.02%, GDP about USD 514 billion.",
  customs_2025: "Vietnam Customs and NSO, full-year 2025 trade data: exports USD 475.04 billion (+17%); exports to the US USD 153.2 billion.",
  markets_2025: "Customs data for 2025 compiled by Tradeint (2026): China USD 70.45 billion, ASEAN USD 42.75 billion, South Korea USD 28.94 billion, Japan USD 26.77 billion.",
  moit_eu_2025: "Ministry of Industry and Trade (MOIT), as reported by Vietnam News Agency (2026): exports to the EU USD 56.2 billion (+8.6%), imports USD 17.6 billion, surplus USD 38.6 billion in 2025.",
  h1_2026: "NSO, socio-economic situation in June and the first half of 2026 (July 2026): exports USD 266.52 billion (+21%), imports USD 283.17 billion (+33.4%), deficit USD 16.65 billion; imports from China USD 115.2 billion.",
  eu_h1_2026: "MOIT Go Global, EU market bulletin for Q2 2026 (August 2026): exports to the EU USD 31.786 billion in H1 2026 (+16.3%), of which USD 16.72 billion in Q2.",
  gdp_h1_2026: "NSO (July 2026): GDP growth of 8.39% in Q2 2026 and 8.18% in H1 2026; manufacturing value added up 10.23% in H1 2026.",
  moit_eu_2025b: "MOIT (2026): Vietnam is the EU's largest trading partner in ASEAN.",
  unctad_ratio: "UNCTAD, data on non-tariff measures (latest year by country), as compiled in Krungsri Research (2026), Non-Tariff Measures: Impacts and Challenges on ASEAN, Figure 1.",
  krungsri: "Krungsri Research (September 2026), Non-Tariff Measures: Impacts and Challenges on ASEAN. Figures 4 to 6 and Tables 1 and 2 draw on CEIC and Trade Map (2024).",
  unctad_wb: "UNCTAD and World Bank (2018), The Unseen Impact of Non-Tariff Measures: Insights from a New Database. Simple average AVEs for 40 importing and 200 exporting economies.",
  commodities_2025: "NSO and Customs data for 2025 as reported by Vietnam News Agency (January 2026): eight items above USD 10 billion accounted for 70.2% of exports.",
  coffee_2025: "Vietnam Coffee and Cocoa Association (VICOFA) and Customs data for 2025: about 1.6 million tonnes, USD 8.92 billion (+58.8% in value).",
  evfta_util: "Ministry of Industry and Trade data reported in 2026: share of exports to the EU using EVFTA preferential certificates of origin rose from 14.8% in 2020 to 35.1% in 2025.",
  cbam_omnibus: "Regulation (EU) 2025/2083 (CBAM Omnibus), in force 20 October 2025; EY Global Tax Alert (22 October 2025).",
  cbam_downstream: "European Commission proposal COM(2025) 989 of 17 December 2025 to extend CBAM to downstream goods; Mayer Brown (18 December 2025).",
  cbam_markup: "Commission implementing acts on CBAM default values (December 2025), summarised by RMIT Vietnam (January 2026) and MOIT (2026).",
  vsa_2025: "Vietnam Steel Association (VSA) data for 2025 as reported by the WTO Integration Centre of VCCI (2026): 10.06 million tonnes worth USD 6.63 billion; EU about 2.08 million tonnes and close to USD 1.4 billion.",
  vsa_2024: "VNSteel (2025), CBAM and the Vietnamese steel industry: 3.18 million tonnes exported to the EU in 2024.",
  steel_intensity: "Vietstock (November 2025), How Vietnam can ensure greener steel, citing industry estimates: 2.51 tCO2 per tonne of crude steel in Vietnam against a global average of 1.85.",
  crude_2025: "VSA via The Investor (January 2026): crude steel output of 24.7 million tonnes in 2025 (+12%).",
  eu_ad: "Commission Implementing Regulation (EU) 2025/1919 (September 2025): definitive anti-dumping duty of 12.1% on hot-rolled flat products from Vietnam.",
  eu_trq: "Regulation (EU) 2026/1384; Council press release of 13 April 2026; LexisNexis (2026); Kallanish (June 2026) on country allocations.",
  ets_price: "GMK Center (May to July 2026) and Carbon Pulse (July 2026): EUAs above EUR 90/t in January 2026, EUR 74 to 79/t in May 2026; 2026 average of EUR 78.27/t to 31 August 2026.",
  eudr_dates: "Regulation (EU) 2025/2650 amending the EUDR (December 2025); European Commission report COM(2026) 191 of 4 May 2026.",
  eudr_bench: "Commission Implementing Regulation (EU) 2025/1093 on country benchmarking (May 2025); Ministry of Agriculture and Environment (MAE), May 2025.",
  wood_2025: "Vietnam Timber and Forest Products Association data reported by Vietnam News (2026): record exports of USD 17.2 billion for wood and forest products; direct exports to the EU at around 4.8% to 5.2%.",
  rubber_2025: "Vietnam Rubber Association (VRA), December 2025: industry exports about USD 11 billion including processed products and rubberwood; the EU took 7.4% of rubber export value.",
  vrg: "Vietnam Rubber Group (VRG) as reported by Nong nghiep va Moi truong (July 2026): about 10,000 tonnes of EUDR-compliant rubber sold in 2025 and H1 2026 at a premium of USD 120 to 250 per tonne.",
  forest_db: "MAE Forestry and Forest Protection Department action plan on EUDR adaptation, reported by Vietnam News (February 2026).",
  sps_checks: "Regulation (EU) 2019/1793 as amended; Tuoi Tre News (March 2026); Antidumping.vn (2026).",
  sps_alerts: "SPS Vietnam data reported by Tuoi Tre News (March 2026): EU non-compliance alerts fell from 64 in 2024 to 17 in 2025.",
  iuu: "Vietnam News (2026) and VnEconomy (2026) on the fifth EC inspection; Prime Ministerial Decision 1516/QD-TTg of 10 August 2026.",
  seafood_eu: "VASEP data reported by the WTO Integration Centre of VCCI (2026): exports to the EU close to USD 1.2 billion in 2025.",
  gacc: "Vietnam News and VietNamNet (2025): GACC testing for cadmium and auramine O from 10 January 2025; durian exports to China fell 80% in the first half of February 2025.",
  us_tariff: "Executive Order 14257 (April 2025) and Executive Order 14326 (July 2025); EY Vietnam Customs Alert (August 2025).",
  scotus: "US Supreme Court ruling of 20 February 2026 on IEEPA tariffs; White and Case (February 2026); GHY International (2026).",
  mmpa: "NOAA Fisheries comparability findings; Tuoi Tre News (2 January 2026); Federal Register 2026-09429 (12 May 2026).",
  us_h1: "NSO (July 2026): exports to the US USD 86.5 billion in H1 2026; surplus with the US USD 75.3 billion (+21.3%).",
  quality_law: "Law amending the Law on Product and Goods Quality (passed 18 June 2025, effective 1 January 2026); Decree 37/2026/ND-CP (23 January 2026); Vietnam Briefing (2025).",
  taxonomy: "Decision 21/2025/QD-TTg of 4 July 2025, effective 22 August 2025; DFDL (2025).",
  ets_vn: "Decision 232/QD-TTg (2025) on the carbon market and Decision 263/QD-TTg on allowances for 2025 and 2026; ICAP (2025).",
  pdp8: "Decision 768/QD-TTg of 15 April 2025 revising PDP8; Decree 57/2025/ND-CP of 3 March 2025 on direct power purchase agreements.",
  wto_rank: "WTO (April 2026) as reported by VnEconomy: Vietnam ranked 18th among the world's merchandise exporters in 2025.",
  wits: "WITS (2023) and UNCTAD (2024) as cited in Krungsri Research (2026).",
  ppwr: "Regulation (EU) 2025/40 on packaging and packaging waste, applicable from 12 August 2026.",
  flr: "Regulation (EU) 2024/3015 prohibiting products made with forced labour, applicable from 14 December 2027.",
  cbam_art9: "Regulation (EU) 2023/956, Article 9: reduction for the carbon price effectively paid in the country of origin.",
  free_alloc: "Directive 2003/87/EC as amended by Directive (EU) 2023/959, Article 10a(1a): CBAM factor of 97.5% in 2026 falling to zero in 2034.",
};

const S = []; // blocks
const p = (text, o = {}) => S.push({ t: "p", text, ...o });
const h2 = (text) => S.push({ t: "h2", text });
const h3 = (text) => S.push({ t: "h3", text });
const bullets = (items) => S.push({ t: "bullets", items });
const exhibit = (o) => S.push({ t: "exhibit", ...o });
const section = (o) => S.push({ t: "section", ...o });
const glance = (title, items) => S.push({ t: "glance", title, items });
const callout = (text, o = {}) => S.push({ t: "callout", text, ...o });
const table = (o) => S.push({ t: "table", ...o });
const kpis = (items) => S.push({ t: "kpis", items });

// ============================================================ EXECUTIVE SUMMARY
section({ id: "exec", title: "Executive Summary", exec: true });

p("Non-tariff measures (NTMs) have become the main instrument of trade policy in Vietnam's key markets. The European Union (EU) stands out. It applies NTMs to 99% of its import product lines and has turned its climate and land-use goals into border rules through the Carbon Border Adjustment Mechanism (CBAM) and the EU Deforestation Regulation (EUDR). Both bear directly on products that Vietnam sells to Europe.", { exec: true });

p("Among the five largest ASEAN economies Vietnam is the most exposed. Exports to the EU reached USD 56.2 billion in 2025 (10.9% of GDP). They grew by a further 16.3% in the first half of 2026. About four fifths of that trade falls in product groups where NTMs raise costs most. Vietnam also has the highest share of metal products in its exports to the EU (18.8%), which makes it the ASEAN economy most dependent on CBAM-covered goods. Coffee, wood and rubber bring it inside the scope of the EUDR from 30 December 2026.", { exec: true });

p("[Inference] Compliance raises costs at every stage of the chain: upgrading production, measuring and verifying emissions and tracing raw materials to the plot. Applied to 2025 values the NTM-sensitive share of exports to the EU is worth about USD 45.7 billion, or 8.9% of GDP. On today's steel volumes an illustrative CBAM bill rises from about EUR 10 million in 2026 to about EUR 407 million a year at full phase-in in 2034 unless emission intensity falls.", { exec: true });

p("Vietnam has started to adapt. It has amended its product quality law to require digital certification and traceability, launched a pilot carbon market, issued a Green Taxonomy and raised its renewable energy targets. [Inference] The binding constraint has now moved from legislation to delivery. We believe firms will need capital and skills to upgrade production. The Government will need to support them with incentives, clean energy infrastructure and verification systems that the EU recognises.", { exec: true });

kpis([
  ["USD 56.2 bn", "Exports to the EU in 2025 (+8.6%)"],
  ["10.9%", "Exports to the EU as a share of GDP, 2025"],
  ["+16.3%", "Growth of exports to the EU in H1 2026"],
  ["81.4%", "NTM-sensitive share of exports to the EU (2024)"],
  ["18.8%", "Metal products in exports to the EU (2024)"],
  ["25.5%", "Exports to the EU covered by CBAM or EUDR (2024)"],
]);

// ============================================================ INTRODUCTION
section({ id: "intro", title: "Introduction", eyebrow: "01" });

p("Tariffs have fallen for three decades while the rules behind them have multiplied. Since the World Trade Organization (WTO) was founded in 1995 its members have cut barriers to trade through bilateral and multilateral agreements. As a result the global average import tariff fell from around 8% in 2002 to 4% in 2021.[^wits] Over the same period importing economies turned increasingly to NTMs as a substitute instrument. UNCTAD (2024) found that the cost of complying with NTMs has exceeded the cost of tariffs in recent years.");

p("Vietnam's own history follows the same arc. It joined the WTO in 2007. On 1 August 2020 the EU-Vietnam Free Trade Agreement (EVFTA) entered into force and began to remove most EU tariffs on Vietnamese goods. From that point forward exports kept climbing and reached USD 475.0 billion in 2025.[^customs_2025] That placed Vietnam 18th among the world's merchandise exporters.[^wto_rank] As the tariff walls came down a different set of gates went up: standards, certificates, traceability files and carbon accounts.");

p("Tariffs have also returned. Since Donald Trump began his second presidential term in 2025 the United States has raised import duties on most of its partners, Vietnam included. An additional duty of 46% was announced in April 2025 before a rate of 20% took effect in August.[^us_tariff] These tariff costs come on top of NTM compliance costs that were already rising. For Vietnam the two now act together on the same exporters.");

p("Major economies, including the United States, China, Japan and the EU, use NTMs both to protect domestic industry and to raise product standards and pursue sustainability goals. The EU has played a particularly prominent role. It enforces its NTMs under strict requirements and clear timelines with the aim of protecting its market through harmonised quality standards. Because the EU is one of Vietnam's three largest export markets, these measures bear directly on Vietnam's exports and on the wider economy.");

p("This report examines the EU's NTMs and their impact on Vietnam. It builds on the regional study by Krungsri Research (2026), which compared Thailand, Indonesia, the Philippines, Vietnam and Malaysia and found Vietnam the most exposed of the five.[^krungsri] We reinterpret those findings for Vietnam, update the data to 30 June 2026 and explain the mechanisms in more depth. The analysis has three parts: (1) an overview of how the EU applies NTMs, (2) an analysis of their impact on Vietnam and (3) a summary of impact levels and policy responses. It closes with the ABrighter Research view.");

callout("Data cut-off. Figures run to 30 June 2026 unless marked otherwise. Peer comparisons use the 2024 data in Krungsri Research (2026) so that all five economies are measured on the same basis. Derived figures carry the label [Inference] and their arithmetic is set out in Appendix B.");

// ============================================================ OVERVIEW
section({ id: "overview", title: "Overview of the European Union's Non-Tariff Measures Implementation", eyebrow: "02" });

glance("At a glance", [
  "The EU applies NTMs to 99% of its import product lines and 98% of import value, more than China or the United States.",
  "These three markets took 58.9% of Vietnam's exports in 2025, so almost everything Vietnam sells abroad meets an NTM somewhere.",
  "The EU's distinctive feature is breadth: it raises standards across whole product groups and to fixed timelines.",
]);

h2("Defining the measures");
p("**Non-tariff measures** are policy instruments, regulations and requirements other than ordinary tariffs. Their purposes are to regulate imports and exports, to set product standards and to support sustainable development. UNCTAD classifies them into import-related and export-related measures (Appendix A).");
p("Most EU NTMs are import-related and cover a wide range of areas. They include sanitary and phytosanitary (SPS) measures for agricultural trade and technical barriers to trade (TBT) on product standards, which now include CBAM. They also include quotas and rules of origin. Many of these measures protect health, the environment or workers. For an exporter, however, the effect resembles a tax: a product must be tested, certified, documented or redesigned before it can be sold.");

h2("Measuring the reach");
p("The EU is among the economies that apply NTMs most intensively. Two indicators show this. The **frequency ratio** is the share of imported product lines subject to NTMs. For the EU it stands at 99%, which means almost every product entering the EU must meet a non-tariff requirement. China and the United States record 91% and 76%. The **coverage ratio** is the share of import value subject to NTMs. For the EU it stands at 98% against 95% for China and 87% for the United States.[^unctad_ratio]");

exhibit({
  n: 1, img: "ex01_markets.png",
  title: "Close to three fifths of Vietnam's exports go to three markets where NTMs cover most imports",
  notes: "Panel A: shares of total goods exports of USD 475.04 billion in 2025; rest of world is the residual. Panel B: frequency ratio is the share of import product lines subject to NTMs; coverage ratio is the share of import value.",
  source: "Vietnam Customs and NSO (2025); UNCTAD as compiled by Krungsri Research (2026); ABrighter Research",
});

p("The ratios matter for Vietnam because of where it sells. In 2025 the United States took USD 153.2 billion of Vietnamese goods, China USD 70.5 billion and the EU USD 56.2 billion.[^markets_2025] Together these three markets took 58.9% of Vietnam's exports. Vietnam's export model therefore depends on passing the inspections of the three regulators with the densest NTM webs in the world.");

h2("Breadth as the EU's hallmark");
p("Although the two indicators look similar across the three economies, the EU uses NTMs differently in practice. It enforces them across virtually all product categories, whereas the United States and China impose stringent requirements on specific products. The EU also keeps adding new requirements that raise standards across whole product groups. The most important for Vietnam fall in two families.");

table({
  n: "Table 1",
  title: "Three EU measures bear most directly on Vietnam's main exports to Europe",
  head: ["Measure", "Family", "What it requires", "Status at 30 June 2026", "Vietnamese exports in scope"],
  widths: [1750, 900, 2700, 2300, 1988],
  rows: [
    ["Carbon Border Adjustment Mechanism (CBAM)", "TBT", "Importers report embedded emissions and from 2027 buy certificates at the EU carbon price", "Definitive period since 1 Jan 2026; certificates sold from Feb 2027", "Iron and steel, aluminium, cement, fertilisers"],
    ["EU Deforestation Regulation (EUDR)", "TBT", "Due diligence with plot geolocation showing no deforestation after 2020 and legal production", "Applies 30 Dec 2026 (large and medium) and 30 Jun 2027 (micro and small)", "Coffee, wood, rubber, cattle products"],
    ["Maximum residue limits (MRLs) and banned substances", "SPS", "Residue tests and certification along the food chain", "In force; EU moving to hazard-based limits from 2026", "Fruit, vegetables, spices, coffee, seafood"],
  ],
  source: "European Commission; Official Journal of the EU; ABrighter Research",
});

p("**CBAM** puts a carbon price on imports in six carbon-intensive groups so that imported goods face the same carbon cost as goods made in the EU. Importers bear the cost of measurement, reporting and verification (MRV) of greenhouse gas emissions. Producers in exporting countries must invest in cleaner processes, for example by moving steelmaking to electric arc furnaces. The **EUDR** covers seven commodity groups with a high risk of deforestation: cattle, cocoa, coffee, oil palm, rubber, soya and wood. Firms must adjust production and submit due diligence and verification reports.");
p("**SPS measures** set maximum residue limits and ban hazardous chemicals in food and farm products. They raise costs for importers and for every operator along the chain, who must adapt cultivation, testing and certification. Vietnam knows this cost well. The EU checks 50% of consignments of Vietnamese chilli and okra, 30% of dragon fruit and 20% of durian at its border.[^sps_checks] Compliance has improved: EU non-compliance alerts involving Vietnam fell from 64 in 2024 to 17 in 2025.[^sps_alerts] On 29 January 2026 the EU also announced a shift towards hazard-based residue limits, which will tighten the standard further.");

// ============================================================ ANALYSIS
section({ id: "analysis", title: "Analysis of the Impacts of Non-Tariff Measures on Vietnam's Economy", eyebrow: "03" });

glance("At a glance", [
  "EU NTMs reach Vietnam directly through exports and investment and indirectly through imported inputs.",
  "Vietnam's largest exports sit in high-AVE product groups. Its NTM-sensitive exports to the EU equal 8.8% of GDP, more than twice any peer.",
  "Vietnam is the ASEAN economy most dependent on metal exports to the EU (18.8%). Its CBAM adjustment cost is moderate today but rises with every year of phase-in.",
  "EUDR exposure runs mainly through coffee (3.9% of exports to the EU), followed by wood and rubber.",
]);

h2("1. Tracing the transmission");
p("The EU applies its NTMs product by product and not by country of origin. Importers must meet the same standard wherever the goods were made. This is the key difference from tariffs, which are usually set country by country and can be cut through trade agreements. The EVFTA can remove a tariff on Vietnamese goods. It cannot remove a test, a certificate or a carbon account.");
p("As an exporter to the EU, Vietnam faces **direct impacts** through two channels. In the trade channel firms pay additional compliance costs to meet EU requirements, which raises export prices. In the investment channel the cost of adapting to NTMs affects where firms choose to locate production. Vietnam also faces **indirect impacts** through the raw materials and intermediate goods it imports from partners that are themselves affected by NTMs (Exhibit 2).");

exhibit({
  n: 2, img: "ex02_channels.png",
  title: "EU NTMs reach Vietnam through exports, investment and imported inputs",
  notes: "Adapted from Krungsri Research (2026), Figure 2, with Vietnamese data for 2025 and H1 2026. Melt and pour refers to the EU steel rule that assigns origin to the country where the steel was first melted.",
  source: "Krungsri Research (2026) framework adapted for Vietnam by ABrighter Research",
});

p("[Inference] The indirect channel matters more for Vietnam than for most peers. Much of what Vietnam exports is assembled or finished from imported materials: in the first half of 2026 alone it imported USD 115.2 billion of goods from China.[^h1_2026] EU rules increasingly look through the finished product to its inputs. CBAM counts the emissions embedded in steel precursors and the EUDR traces coffee and rubber to the plot. A Vietnamese exporter can therefore fail a requirement because of a supplier it does not control.");
p("[Inference] The first half of 2026 suggests this channel is widening. Imports grew by 33.4% to USD 283.2 billion against export growth of 21%, turning a surplus into a deficit of USD 16.65 billion.[^h1_2026] Most of the increase was machinery, equipment and materials for the factories that export. At the level of the economy this is a sign of investment. At the level of the firm it means more of each export carries an input whose carbon, origin and legality the EU may ask about.");
p("The size of the impact depends on three factors: dependence on exports to the EU, the share of imported raw materials and the flexibility of domestic supply chains. If Vietnam adapts more slowly than its competitors it risks losing export market share and long-term competitiveness. We assess the impact on three dimensions, following Krungsri Research. The first is the product-group impact measured by the ad valorem equivalent (AVE). The second is export exposure to the EU, both overall and by product group. The third is the impact of the two environmental measures, CBAM and the EUDR.");

h2("2. Weighing the products");
p("Agricultural products carry heavier NTM costs than manufactures. UNCTAD and the World Bank (2018) estimated the AVE of NTMs from the price gap between goods subject to NTMs and comparable domestic goods.[^unctad_wb] For agricultural and food products the average AVE reaches about 20%. EU import prices for these goods are therefore around 20% higher than domestic prices because of NTMs. This reflects stricter measures such as quotas, price controls and SPS and TBT requirements. Among manufactures the highest AVEs, at around 8% to 10%, fall on machinery and electronics, motor vehicles and apparel.");
p("On this basis product groups fall into four tiers, from highest to lowest impact. Agricultural and food products sit in the 'Very High' tier. Apparel and textiles, motor vehicles, electronics and machinery form the 'High' tier. Chemicals, metals, rubber and plastics make up the 'Moderate' tier. Minerals, oil and gas sit in the 'Low' tier.");

p("Vietnam's export basket sits largely in the top two tiers. The nine largest export items earned USD 330.8 billion in 2025, or 69.6% of all exports.[^commodities_2025] Electronics, machinery, phones, garments and wood products fall in the 'High' tier. Seafood and coffee fall in the 'Very High' tier. Only footwear and steel sit in the 'Moderate' tier.");

exhibit({
  n: 3, img: "ex03_basket.png",
  title: "Most of Vietnam's export basket sits in product groups where NTMs raise prices most",
  notes: "AVE proxies are simple averages by product group read from UNCTAD and World Bank (2018) as reproduced in Krungsri Research (2026, Figure 3) and mapped to Vietnam's export items by ABrighter Research. Implied cost wedge = 2025 export value x AVE proxy. It indicates scale only and is not an estimate of the cost borne by Vietnamese firms.",
  source: "NSO and Customs (2025); UNCTAD and World Bank (2018); Krungsri Research (2026); ABrighter Research",
});

p("[Inference] Multiplying each item by its AVE gives an implied cost wedge of about USD 23.3 billion, a weighted AVE of 7.0%. The figure needs careful reading. The AVE measures a price gap that importers, exporters and consumers share between them. It shows where NTMs bite and not who bears the bite.");
p("[Inference] Two features stand out. The bright spot is electronics, the largest item at USD 107.8 billion, with one of the lower AVEs in its tier at around 3.9%. Its compliance work is concentrated in large foreign-invested firms that already meet global standards. One must not overlook seafood and coffee, which carry AVEs of 27.3% and 20.8%. These sectors rely on large numbers of smallholders and small processors. The burden per dollar exported is highest exactly where the capacity to comply is lowest.");
p("[Inference] Who pays the wedge depends on bargaining power. A multinational assembler that sells a phone to a European distributor can pass much of the cost on or spread it across many markets. A coffee farmer cannot. Farmers sell to collectors at a price set by the world market, so any extra cost of testing or traceability tends to come back to them as a lower farm-gate price. Without public support for shared testing and traceability, the cost of EU rules would most likely fall on the poorest link in the chain. That is why the response to NTMs is a question of rural incomes and not only of trade.");
p("[Inference] A second shift is under way. Vietnam is trying to raise the domestic content of its electronics exports by bringing local suppliers into the chains of foreign investors. As it succeeds, compliance work that multinationals now absorb will pass to Vietnamese small and medium firms. Higher local content is the right goal. It will also widen the circle of firms that must meet EU standards on their own.");

h2("3. Measuring dependence on Europe");
p("Among the five large ASEAN economies Vietnam depends most on exports to the EU. In 2024 Vietnam sent 12.8% of its exports to the EU, equal to 10.8% of GDP.[^krungsri] The Philippines sends a similar share (11.0%) but that is only 1.7% of its GDP. Measured against the size of the economy, Thailand (4.6% of GDP) and Malaysia (6.0%) are more exposed than the Philippines and Indonesia. Vietnam's exposure is nonetheless almost twice Malaysia's.");
p("National data for 2025 confirm the picture. Exports to the EU rose by 8.6% to USD 56.2 billion while imports rose by 5.4% to USD 17.6 billion.[^moit_eu_2025] The trade surplus with the EU reached a record USD 38.6 billion. Exports to the EU equalled 11.8% of total exports and 10.9% of GDP. The momentum held into 2026: exports to the EU reached USD 31.8 billion in the first half, up 16.3% year on year.[^eu_h1_2026] Vietnam's EU exposure has therefore kept pace with an economy that grew by 8.02% in 2025.[^nso_gdp]");
p("[Inference] The record surplus deserves a second reading. For trade policy it shows the success of the EVFTA. For NTM risk it measures how much Vietnam has to lose. A country that sells USD 3 to the EU for every USD 1 it buys from it has little to offer in return when it asks for flexibility on a rule. Its leverage lies instead in being a reliable and compliant supplier, which is exactly what the new measures test.");

exhibit({
  n: 4, img: "ex04_dependence.png",
  title: "Vietnam's exposure to the EU, measured against GDP, is more than twice that of any ASEAN peer",
  notes: "Bars show 2024 data. NTM-sensitive products are those in the 'Very High' and 'High' AVE tiers. Diamonds show the 2025 update for Vietnam using national data (exports to the EU USD 56.2 billion; total exports USD 475.04 billion; GDP USD 514 billion).",
  source: "Krungsri Research (2026) using CEIC and Trade Map (2024); MOIT and NSO (2025); ABrighter Research",
});

p("Combining export dependence with product structure sharpens the result. Vietnam's NTM-sensitive exports to the EU amount to 8.8% of GDP and 22.1% of its exports of the same products to the world. Malaysia and Thailand follow at 3.8% and 3.3% of GDP. The Philippines and Indonesia are much less affected. [Inference] Vietnam faces the highest risk of impact in the region because it combines the highest dependence on the EU with a basket concentrated in sensitive products.");
p("What Vietnam sends to the EU matters as much as how much. In 2024 81.4% of Vietnam's exports to the EU fell in NTM-sensitive product groups. Electronics and machinery made up 46.5%, other 'High' tier manufactures such as garments, footwear and furniture 24.6% and agri-food 10.2%. Only the Philippines, at 88.4%, had a higher share. National data for 2025 support this structure. Computers and electronics (USD 10.89 billion), machinery (USD 7.42 billion) and phones (USD 6.90 billion) together made up 44.9% of exports to the EU.[^moit_eu_2025]");

exhibit({
  n: 5, img: "ex05_tiers.png",
  title: "About USD 46 billion of Vietnam's exports to the EU falls in NTM-sensitive product groups",
  notes: "Panel A uses 2024 shares. Panel B applies Vietnam's 2024 shares to 2025 exports to the EU of USD 56.2 billion and divides by 2025 GDP of USD 514 billion. It assumes the 2024 product structure held in 2025.",
  source: "Krungsri Research (2026) using Trade Map (2024); MOIT and NSO (2025); ABrighter Research",
});

p("[Inference] Applied to 2025 values this structure puts USD 45.7 billion of exports in NTM-sensitive groups, or 8.9% of GDP. The figure is close to the 8.8% for 2024. As in most ASEAN economies, electronics and machinery account for around half of the total, so the impact of NTMs on Vietnam is likely to be concentrated in that product group. Garments, footwear and furniture then add a further quarter. For these products the next wave of EU rules on product passports and supply-chain due diligence will matter more than tariffs.");

h2("4. Pricing carbon at the border");
p("The EU imposes strict environmental standards on imported goods and these reach Vietnam's main exports and supply chains. We assess the two most important measures in turn.");

h3("CBAM: the rules from 2026");
p("The EU introduced CBAM to give imported goods and goods produced in the EU the same carbon cost. It also aims to prevent carbon leakage, the relocation of production to countries with weaker environmental standards. CBAM covers six product groups: iron and steel, aluminium, cement, fertilisers, electricity and hydrogen. It came into force on 1 January 2026 with plans to extend its scope to other carbon-intensive products in later phases.");
p("The rules for the definitive period were adjusted before it began. The CBAM Omnibus, in force since 20 October 2025, exempts importers that bring in less than 50 tonnes a year of covered goods. It also delays the sale of certificates until February 2027.[^cbam_omnibus] Two further features matter for Vietnam. The charge applies only to the share of emissions no longer covered by free allocation in the EU, which starts at 2.5% in 2026 and reaches 100% in 2034.[^free_alloc] An importer without verified emissions data must use default values with a mark-up of 10% in 2026, 20% in 2027 and 30% from 2028.[^cbam_markup] The design rewards data and penalises its absence.");

h3("CBAM: why Vietnam is exposed");
p("At product level, metal products (HS 72 to 83) are the most affected. Among the five large ASEAN economies Vietnam has the highest dependence on metal exports to the EU at 18.8% of its exports to the bloc. Malaysia (6.6%), Thailand (4.3%), Indonesia (3.6%) and the Philippines (1.2%) follow.[^krungsri] Vietnam is therefore clearly more exposed to CBAM-related risk than its neighbours.");
p("CBAM also raises adjustment costs. Firms must change production to cut emissions and may have to replace imported steel or metal inputs with greener and more expensive ones. Krungsri Research captured this with the CBAM aggregate trade exposure index. The index measures the extra carbon cost, or excess carbon payment, relative to the export value of CBAM-covered products. Indonesia scores highest at 0.0075 because its metal industry spans the whole chain, including carbon-intensive smelting. Vietnam scores 0.0007.");

exhibit({
  n: 6, img: "ex06a_cbam_exposure.png",
  title: "Vietnam depends on metal exports to the EU more than any peer but its adjustment cost is still moderate",
  notes: "Panel A: share of metal products in total exports to the EU. Panel B: additional carbon cost relative to the export value of CBAM-covered products; a higher index means higher adjustment cost.",
  source: "Krungsri Research (2026) using Trade Map (2024) and World Bank",
});

p("[Inference] The two panels tell different stories for a clear reason. Most of Vietnam's metal exports are intermediate and finished products rather than upstream smelter output, so the carbon embedded per dollar exported is lower than Indonesia's. Taking dependence and adjustment cost together, Indonesia is the most affected country and Vietnam follows. Malaysia, Thailand and the Philippines face moderate impacts.");
p("[Inference] That advantage may narrow. On 17 December 2025 the Commission proposed to extend CBAM to about 180 downstream steel and aluminium products and to tighten anti-circumvention rules.[^cbam_downstream] If adopted, the downstream position that protects Vietnam today would bring more of its exports into scope. The emissions gap at home adds to the risk. Industry estimates put the average intensity of Vietnamese steel at 2.51 tonnes of CO2 per tonne against a global average of 1.85.[^steel_intensity] Crude steel output reached a five-year high of 24.7 million tonnes in 2025.[^crude_2025]");

h3("CBAM: sizing the bill");
p("In 2025 Vietnam exported 10.06 million tonnes of steel worth USD 6.63 billion. The EU took about 2.08 million tonnes worth close to USD 1.4 billion, more than a fifth of the total.[^vsa_2025] [Inference] A simple model shows how the CBAM bill on that volume would grow. We take Vietnam's average intensity of 2.51 tonnes and an EU carbon price of EUR 78 per tonne, close to the 2026 average to August.[^ets_price]");

exhibit({
  n: 7, img: "ex06_cbam.png",
  title: "The CBAM bill on Vietnamese steel is small in 2026 but could reach about EUR 400 million a year by 2034",
  notes: "Panel A: 100% minus the CBAM factor under the EU ETS Directive. Panel B is illustrative: 2.08 Mt x emission intensity x EUR 78/t x share in Panel A. It holds volumes, prices and intensity constant and ignores the benchmark-based adjustment for free allocation, so it overstates the bill in the early years.",
  source: "Directive (EU) 2023/959; VSA (2025); industry estimates; GMK Center and Carbon Pulse (2026); ABrighter Research",
});

p("[Inference] In 2026 the bill comes to only about EUR 10 million. It rises to around EUR 198 million in 2030 as EU free allocation halves and to about EUR 407 million a year at full phase-in, or EUR 196 per tonne. Set against the unit value of steel sent to the EU in 2025, about USD 673 per tonne, EUR 196 equals 29% to 35% of the price for any euro-dollar rate between 1.0 and 1.2. Commodity steel margins cannot absorb that.");
p("[Inference] The same model shows the reward for adapting. At the global average intensity the full bill falls to about EUR 300 million. For scrap-based electric arc furnaces (EAF) at about 0.5 tonnes it falls to about EUR 81 million. The gap between EUR 407 million and EUR 81 million is the value of decarbonising. Firms that cannot show verified data would pay on default values that are higher still.");

h2("5. Tracing the forest");
p("The EUDR covers seven groups of commodities and derived products with a high risk of deforestation: cattle, cocoa, coffee, oil palm, rubber, soya and wood. Products must not come from land associated with forest clearance and must be produced in line with land-use, environmental and labour laws. Operators must submit due diligence statements in line with EU requirements. In December 2025 the EU postponed application by one year.[^eudr_dates] It now applies to large and medium operators from 30 December 2026 and to micro and small operators from 30 June 2027. On 4 May 2026 the Commission published a simplification package and confirmed there would be no further delay.");

exhibit({
  n: 8, img: "ex08_eudr.png",
  title: "About USD 3.8 billion of Vietnam's exports to the EU falls under the EUDR, led by coffee",
  notes: "Panel A applies 2024 shares of exports to the EU (coffee 3.9%, wood 1.5%, rubber 1.3%) to 2025 exports to the EU of USD 56.2 billion. Leather made from cattle hides, which is also in scope, is not included.",
  source: "Krungsri Research (2026) using Trade Map (2024); MOIT (2025); European Commission; MAE (2025); ABrighter Research",
});

p("Full application will affect ASEAN exports to differing degrees depending on each country's export structure. Indonesia is likely to be hit hardest because palm oil and timber made up 18.9% and 5.8% of its exports to the EU in 2024. Malaysia follows through palm oil and rubber. Thailand is affected through rubber. **Vietnam is affected mainly through coffee**, which accounts for 3.9% of its exports to the EU, with wood (1.5%) and rubber (1.3%) behind.[^krungsri]");
p("Coffee's weight has grown since 2024. Vietnam exported about 1.6 million tonnes of coffee in 2025 worth a record USD 8.92 billion, up 58.8% in value on higher world prices.[^coffee_2025] Germany, Italy and Spain were the three largest buyers with 13.7%, 7.8% and 7.1% of the total. [Inference] On 2024 shares about USD 2.2 billion of coffee went to the EU in 2025. Wood and forest products earned a record USD 17.2 billion, of which around 5% went directly to the EU.[^wood_2025] The rubber industry earned about USD 11 billion including processed goods. The EU took 7.4% of rubber export value.[^rubber_2025]");
p("[Inference] The coffee price boom changes the economics of compliance. The cost of mapping a plot or filing a due diligence statement does not rise with the price of coffee, yet the export value of the crop it protects rose by almost 60% in 2025. Compliance is therefore cheaper per dollar of sales than at any point in the last decade. If prices fall back before the systems are built, the same work will weigh more heavily on margins. The window to invest is now.");
p("In May 2025 the Commission classified Vietnam as a **low-risk** country.[^eudr_bench] Only about 1% of operators sourcing from Vietnam will be checked. Simplified due diligence applies. [Inference] Low risk does not mean low work. Operators must still collect the geolocation of each plot and evidence of legal production. Two features of Vietnamese supply make this hard. Smallholders supply 63% of raw rubber and most of the coffee. Vietnam also imports raw material: more than 64% of its rubber imports come from Cambodia. Vietnam's low-risk status does not cover land in another country.");
p("The domestic response has begun. The Ministry of Agriculture and Environment (MAE) has asked every province to publish forest boundary maps by 31 December 2026 and to identify coffee, rubber and timber areas at risk.[^forest_db] Provinces in the Central Highlands are piloting deforestation-free coffee with plot polygons uploaded to mobile traceability systems. Early evidence suggests compliance can pay: Vietnam Rubber Group sold about 10,000 tonnes of EUDR-compliant rubber in 2025 and the first half of 2026 at a premium of USD 120 to 250 per tonne.[^vrg]");

h2("6. Combining the two measures");
p("Taking CBAM and the EUDR together, Indonesia is the most affected ASEAN economy ('High'). Products covered by the two measures make up 35.9% of its exports to the EU, mainly palm oil. Vietnam and Malaysia follow with 'Moderate-High' impacts (Table 2). Vietnam has the largest share of metal exports and is therefore more exposed to CBAM, while Malaysia is more affected by the EUDR. Thailand is affected mainly through rubber and metals. The Philippines faces limited impacts from both.");

table({
  n: "Table 2",
  title: "One quarter of Vietnam's exports to the EU falls under CBAM or the EUDR, mostly through metals",
  head: ["Measure", "Product", "Vietnam", "Indonesia", "Malaysia", "Thailand", "Philippines"],
  widths: [1100, 1500, 1408, 1408, 1408, 1408, 1408],
  heat: true,
  rows: [
    ["Exposure level", "", "Moderate-High", "High", "Moderate-High", "Moderate", "Low"],
    ["Share in exports to the EU", "", "25.5%", "35.9%", "22.3%", "11.9%", "2.9%"],
    ["EUDR", "Cocoa", "<0.5%", "2.6%", "1.2%", "<0.5%", "<0.5%"],
    ["EUDR", "Coffee", "3.9%", "1.9%", "<0.5%", "<0.5%", "<0.5%"],
    ["EUDR", "Oil palm", "<0.5%", "18.9%", "9.4%", "<0.5%", "<0.5%"],
    ["EUDR", "Rubber", "1.3%", "3.2%", "3.8%", "6.9%", "0.8%"],
    ["EUDR", "Wood", "1.5%", "5.8%", "1.4%", "0.7%", "0.9%"],
    ["CBAM", "Metal", "18.8%", "3.6%", "6.6%", "4.3%", "1.2%"],
  ],
  source: "Krungsri Research (2026) using Trade Map (2024). Cattle and soya are below 0.5% for all five economies.",
});

// ============================================================ SUMMARY
section({ id: "summary", title: "Summary of Impact Levels and Policy Responses", eyebrow: "04" });

p("The overall impact of NTMs combines three dimensions: (1) overall export exposure to the EU, (2) product-level exposure and (3) exposure to specific measures, namely CBAM and the EUDR. The third dimension carries a lower weight because it covers only certain products and so has a narrower scope. On that basis Vietnam is the only one of the five economies rated 'High' (Table 3).");

table({
  n: "Table 3",
  title: "Vietnam is the only large ASEAN economy rated 'High' for exposure to EU NTMs",
  head: ["Dimension", "Vietnam", "Indonesia", "Thailand", "Malaysia", "Philippines"],
  widths: [2738, 1380, 1380, 1380, 1380, 1380],
  sev: true,
  rows: [
    ["Exposure to EU NTMs", "High", "Moderate-High", "Moderate-High", "Moderate-High", "Moderate"],
    ["1) Overall export exposure (Exhibit 4)", "High", "Moderate", "Moderate", "Moderate", "Moderate"],
    ["2) Product-level exposure (Exhibits 4 and 5)", "High", "Moderate", "Moderate-High", "Moderate", "Moderate-High"],
    ["3) Specific measures: CBAM and EUDR (Table 2)", "Moderate-High", "High", "Moderate", "Moderate-High", "Limited"],
  ],
  source: "Krungsri Research (2026)",
});

bullets([
  "**'High' impact: Vietnam.** It depends on the EU more than any peer, both for exports overall and at product-group level.",
  "**'Moderate-High' impact: Indonesia, Malaysia and Thailand.** Indonesia and Malaysia are more exposed to CBAM and the EUDR. Thailand is affected mainly through rubber and electronics.",
  "**'Moderate' impact: the Philippines.** It relies heavily on electronics exports to the EU but is less affected by the environmental measures.",
]);

h2("Reading Vietnam's rating");
p("[Inference] A 'High' rating describes exposure and not failure. Vietnam is exposed because it has succeeded in the EU market and sells more there relative to its economy than any peer. Table 4 sets out the evidence behind each dimension of the rating and what has changed since 2024.");

table({
  n: "Table 4",
  title: "The evidence behind Vietnam's 'High' rating has strengthened since 2024",
  head: ["Dimension", "Rating", "Evidence in 2024", "Update to June 2026", "What it means for Vietnam [Inference]"],
  widths: [1500, 1150, 2200, 2300, 2488],
  sev: true, sevCol: 1,
  rows: [
    ["1) Overall export exposure", "High", "12.8% of exports and 10.8% of GDP went to the EU", "USD 56.2 bn in 2025 (10.9% of GDP); +16.3% in H1 2026", "Exposure grows with exports; it will not fall unless Vietnam sells less to Europe"],
    ["2) Product-level exposure", "High", "81.4% of exports to the EU NTM-sensitive; 8.8% of GDP", "About USD 45.7 bn NTM-sensitive (8.9% of GDP)", "Electronics and machinery carry the scale; agri-food carries the highest cost per dollar"],
    ["3) CBAM and EUDR", "Moderate-High", "25.5% of exports to the EU in scope; metals 18.8%; coffee 3.9%", "CBAM definitive since Jan 2026; EUDR from 30 Dec 2026; coffee exports a record USD 8.92 bn", "Data quality decides the bill: verified emissions and plot geolocation"],
  ],
  source: "Krungsri Research (2026); MOIT and NSO (2025, 2026); ABrighter Research",
});

p("Beyond the EU, NTMs imposed by other economies are also spreading. They are likely to raise product costs and push firms to change processes and supply chains. Such adjustment needs resources and time. It also needs government support through better regulation and through measures that encourage long-term investment. In this context Vietnam, like its neighbours, has begun to put measures in place to soften the impact of NTMs and strengthen trade competitiveness.");

h2("How Vietnam is responding");
p("ASEAN economies' responses fall into two areas. The first is **investment promotion**. Most have introduced incentives in target industries, which lower adjustment costs and raise competitiveness. Further incentives are still needed to help firms upgrade to meet NTMs and raise environmental standards in key sectors. Indonesia, Thailand and Malaysia stand out in attracting investment, while the Philippines offers relatively limited incentives. The second is **regulatory adjustment and enabling infrastructure**. Thailand and Malaysia have relatively complete infrastructure and policy tools for adjustment and product-standard upgrading. Vietnam and Indonesia show strength in clean-energy investment.");
p("Krungsri Research rated Vietnam's enabling infrastructure 'Medium', behind Thailand and Malaysia. Its investment promotion targets renewable energy, research and development in green technology and a Green Credit Programme of soft loans for green investment. On regulation it highlighted the amendment of product standards legislation to introduce digital certification and require traceability. Table 5 sets out the instruments behind that assessment and the gaps we see.");
p("[Inference] The comparison with neighbours is instructive. Malaysia and Indonesia built national certification schemes for their main EUDR commodity, the Malaysian Sustainable Palm Oil (MSPO) and Indonesian Sustainable Palm Oil (ISPO) standards. Thailand's Cabinet approved an excise carbon tax on high-emission products to offset cross-border carbon price differences. Vietnam has no national certification scheme of the same weight for coffee or rubber and no carbon tax. Its carbon market pilot is the closest equivalent. Here the gap is not of intent but of instruments that a foreign regulator can recognise.");

table({
  n: "Table 5",
  title: "Vietnam has the main instruments in place: delivery capacity is now the constraint",
  head: ["Area", "Instrument and date", "What it does", "Status", "Gap we see [Inference]"],
  widths: [1300, 2300, 2600, 1000, 2438],
  status: true,
  rows: [
    ["Investment: clean energy", "Revised PDP8, Decision 768/QD-TTg (15 Apr 2025)", "Solar target of 46,459 to 73,416 MW and onshore wind of 26,066 to 38,029 MW by 2030", "Under way", "Grid and project speed decide whether exporters get clean power in time"],
    ["Investment: clean energy", "Decree 57/2025/ND-CP on direct power purchase (3 Mar 2025)", "Large users can buy renewable power directly from generators", "In force", "Contract uptake still limited among small exporters"],
    ["Investment: green finance", "Green Taxonomy, Decision 21/2025/QD-TTg (22 Aug 2025)", "Criteria for projects eligible for green credit and green bonds", "In force", "Transition loans for exporters still small in scale"],
    ["Regulation: standards", "Amended Law on Product and Goods Quality (1 Jan 2026); Decree 37/2026/ND-CP", "Risk-based control; compulsory traceability for high-risk goods; digital product passport", "In force", "Data formats not yet aligned with EU product passport rules"],
    ["Regulation: carbon", "Decisions 232 and 263/QD-TTg (2025)", "Pilot carbon market for 110 facilities (power, steel, cement) to 2028; national market from 2029", "Under way", "MRV and price not yet recognised under CBAM"],
    ["Regulation: land use", "MAE action plan on EUDR (2026)", "Provincial forest maps by 31 Dec 2026; risk areas disclosed", "Under way", "Land legality and plot data for smallholders"],
  ],
  source: "Government of Vietnam; MOIT; MAE; Krungsri Research (2026); ABrighter Research",
});

p("[Inference] The ledger is mixed. On paper Vietnam has moved quickly: most of the instruments that EU buyers will ask about now exist in Vietnamese law. In practice the binding constraint has moved from legislation to delivery. Delivery depends on ministries that share data, provinces that map land, laboratories and verifiers that win foreign recognition and banks that price transition risk. The pilot carbon market illustrates the point. Allowances of 243.1 million tCO2e for 2025 and 268.4 million for 2026 have been allocated to 34 power plants, 25 steel mills and 51 cement plants, which together emit about 40% of national emissions.[^ets_vn] Whether this becomes an asset under CBAM depends on how it is measured and verified.");
p("[Inference] The two-column ledger is therefore clear. On the credit side Vietnam has a low-risk EUDR status, a falling rate of food-safety alerts, a growing renewable power base and a legal basis for traceability. On the debit side it has a steel sector with high emission intensity, a smallholder supply base without plot data and verification systems that the EU does not yet recognise. The credit side was mostly built by law and decree. The debit side can only be cleared by investment and by data collected farm by farm and plant by plant.");

// ============================================================ VIEW
section({ id: "view", title: "ABrighter Research View", eyebrow: "05" });

callout("The enforcement of NTMs by Vietnam's main trading partners, particularly the EU and the United States, will continue to intensify. These partners increasingly put environmental, sustainability and safety standards at the centre of trade policy. The impact does not stop at the finished export. It runs through the whole supply chain, from sourcing raw materials to production processes and traceability. It forces firms to adapt at several levels at once. This will raise Vietnam's export costs and may become a structural challenge to its long-term competitiveness.", { strong: true });

p("We would expect the cost to rise in stages rather than in one step. In the second half of 2026 the pressure will fall on steel data and on EUDR commodities. From 2027 CBAM certificates must be bought and the bill grows with each year of phase-in. From 2030 the carbon cost will be large enough to influence where steel and aluminium products are made. The pressure may not be uniform across sectors, as electronics, the largest export, faces fewer immediate obligations than its size suggests.");

p("Vietnam has accelerated its response. However, production restructuring needs an enabling regulatory environment, investment in infrastructure such as clean energy and research and development to advance manufacturing technology. These are the mechanisms that upgrade industries across the supply chain. Several actions are required.");
p("**The first is to treat data as national infrastructure.** CBAM default values are designed to penalise missing data and EUDR checks require geolocation for every plot. The firm with verified data pays less and the firm without it pays more or cannot sell. Government should fund the shared layers, such as forest maps, land records and grid emission factors, while firms fill in their own.");
p("**The second is to price carbon at home in a form the EU recognises.** Under Article 9 of the CBAM Regulation an importer can deduct the carbon price effectively paid in the country of origin.[^cbam_art9] [Inference] Every euro that Vietnamese steelmakers pay into a credible domestic carbon market is a euro that need not be paid in Brussels. The pilot that runs to 2028 should be built from the start with MRV the EU will accept.");
p("**The third is to invest in clean energy and cleaner processes.** [Inference] Our illustrative model shows that moving from Vietnam's average steel intensity to scrap-based EAF cuts the bill at full phase-in from about EUR 407 million to about EUR 81 million a year. Clean power is the precondition, because an EAF running on coal-fired power keeps much of the emissions. The revised PDP8 and direct power purchase under Decree 57/2025 provide the tools.");
p("**The fourth is to build capital and skills in the private sector.** Upgrading production requires capital investment and human capital. The Green Taxonomy gives banks a common language. It should now be linked to transition loans priced on emission intensity and traceability, with priority for the cooperatives and small processors that supply coffee, rubber, wood and seafood.");
p("**The fifth is to strengthen regional cooperation.** Harmonised product standards and integrated verification systems across ASEAN would help the region keep its competitiveness in the EU and in other markets that are expected to expand NTMs. This matters especially for rubber and timber that cross the border from Cambodia and Laos.");

p("[Inference] One bottleneck deserves plain language. Many smallholders will not fail the EU test because they cleared forest. They will fail because nobody has drawn the boundary of their plot or confirmed that they hold the land legally. Paperwork, rather than deforestation, is the most likely reason a Vietnamese coffee bean is turned away in 2027.");

exhibit({
  n: 9, img: "ex13_roadmap.png",
  title: "A three-stage roadmap turns compliance into competitive advantage",
  notes: "Indicative sequencing by ABrighter Research. Each phase builds on the data and capacity of the one before.",
  source: "ABrighter Research",
});

p("The outlook is favourable but conditional. Exports to the EU grew by 16.3% in the first half of 2026 even as the new rules arrived. Success will depend on whether Vietnam can deliver verified data, clean power and credible certification within the next 18 months. It will also depend on whether its firms can find the capital to upgrade. Such efforts matter all the more in a world economy where globalisation and free trade can no longer be taken for granted. As the EU's largest trading partner in ASEAN[^moit_eu_2025b] with a manufacturing base still growing at around 10% a year,[^gdp_h1_2026] Vietnam has everything to play for. The gate is narrow but it is open.");

// ============================================================ REFERENCES (rendered by builder from REFS)
const REFS = [
  "Akin Gump (2026). EU proposes higher tariffs and lower quotas on steel imports. https://www.akingump.com/en/insights/alerts/eu-proposes-higher-tariffs-and-lower-quotas-on-steel-imports-and-plans-to-renegotiate-its-wto-tariff-commitments",
  "Council of the European Union (13 April 2026). Council and European Parliament strike deal to protect EU's steel industry from global overcapacity. https://www.consilium.europa.eu/en/press/press-releases/2026/04/13/",
  "European Commission (4 May 2026). Report on the EU Deforestation Regulation, COM(2026) 191 final. https://environment.ec.europa.eu",
  "EY (22 October 2025). EU adopts CBAM Omnibus Regulation. https://www.ey.com/en_gl/technical/tax-alerts/eu-adopts-cbam-omnibus-regulation",
  "EY Vietnam (August 2025). Customs global trade alert: US additional ad valorem tariffs on Vietnamese goods. https://www.ey.com/en_vn",
  "Eurometal (2025). EU imposes definitive anti-dumping duties on HRC from Japan, Egypt and Vietnam. https://eurometal.net",
  "Federal Register (12 May 2026). Implementation of fish and fish product import provisions of the Marine Mammal Protection Act, 2026-09429. https://www.federalregister.gov",
  "GMK Center (2026). European carbon prices, monthly reports January to July 2026. https://gmk.center/en/",
  "Krungsri Research (September 2026). Non-Tariff Measures: Impacts and Challenges on ASEAN. Bank of Ayudhya.",
  "LexisNexis (2026). EU replaces steel safeguard: new Regulation from 1 July 2026. https://www.lexisnexis.com/en-gb/legal/news",
  "Mayer Brown (18 December 2025). European Commission issues CBAM operational rules and proposes downstream extension of the CBAM scope. https://www.mayerbrown.com",
  "Ministry of Agriculture and Environment of Vietnam (May 2025). Vietnam classified as low risk under the EU Deforestation Regulation. https://en.mae.gov.vn",
  "Ministry of Industry and Trade of Vietnam, Go Global (August 2026). EU market bulletin, Q2 2026. https://goglobal.moit.gov.vn",
  "National Statistics Office of Vietnam (January and July 2026). Socio-economic situation in 2025 and in the first half of 2026. https://www.nso.gov.vn",
  "NOAA Fisheries (2025-2026). MMPA comparability findings. https://www.fisheries.noaa.gov",
  "RMIT University Vietnam (January 2026). High-emission sectors face reckoning as EU carbon tax takes effect. https://www.rmit.edu.vn",
  "UNCTAD (2024). Making sense of non-tariff measures: a user's guide to accessing and analysing the data. https://unctad.org/system/files/official-document/ditctab2024d6_en.pdf",
  "UNCTAD and World Bank (2018). The unseen impact of non-tariff measures: insights from a new database. https://unctad.org/system/files/official-document/ditctab2018d2_en.pdf",
  "Vietnam Briefing (2025). Amended Law on Products and Goods Quality: enhancing traceability and compliance. https://www.vietnam-briefing.com",
  "Vietnam Briefing (2026). US Supreme Court blocks Trump's tariffs: implications for Vietnam-US trade. https://www.vietnam-briefing.com",
  "Vietnam News (2025-2026). Coverage of coffee, wood, durian, IUU and EU trade data. https://vietnamnews.vn",
  "Vietstock (November 2025). How Vietnam can ensure greener steel. https://en.vietstock.vn",
  "White and Case (February 2026). Trump administration imposes 10% Section 122 tariff. https://www.whitecase.com",
  "WTO Integration Centre, VCCI (2026). EU tightens steel imports with 50% out-of-quota duty; Vietnamese seafood in the EU market. https://trungtamwto.vn",
];

module.exports = { S, FN, REFS };
