// Offers shown on partners.html. Add, edit or remove entries here.
// vertical: "casino" | "betting" | "crypto"      model: "cpa" | "revshare" | "hybrid"
// status:   "active" | "soon" | "paused"          geo: ISO country codes, or "WW" for worldwide
// demo: true shows an "Example" badge — delete the demo entries before launch.
window.AF_OFFERS = [
  { id: 101, name: "Casino Brand A", vertical: "casino", geo: ["DE", "AT", "CH"], model: "cpa", payout: "$250", baseline: "Dep $30", cap: "50 / day", status: "active", demo: true },
  { id: 102, name: "Sportsbook B", vertical: "betting", geo: ["BR"], model: "hybrid", payout: "$60 + 25%", baseline: "Dep $10", cap: "—", status: "active", demo: true },
  { id: 103, name: "Casino Brand C", vertical: "casino", geo: ["CA", "NZ"], model: "revshare", payout: "40%", baseline: "—", cap: "—", status: "active", demo: true },
  { id: 104, name: "Crypto Casino D", vertical: "crypto", geo: ["WW"], model: "cpa", payout: "$150", baseline: "Dep $50", cap: "30 / day", status: "soon", demo: true }
];
