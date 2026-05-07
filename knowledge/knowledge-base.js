// Solar Cenred — Knowledge Base
// Comprehensive knowledge content used by the AI chatbot for accurate, on-brand answers.
// This single template literal is injected into the system prompt at runtime.

const SOLAR_KNOWLEDGE_BASE = `
=========================================================================
SOLAR CENRED — COMPLETE KNOWLEDGE BASE
=========================================================================

COMPANY INFORMATION
-------------------------------------------------------------------------
Solar Cenred Corp. (Philippines)
- SEC Reg. No.: CS202512345
- Mayor's Permit: DVO-BP-102233
- BIR TIN: 004-567-891-000
- Address: Unit 69, 96th Floor, Matina IT Center, Quimpo Blvd., Davao City 8000, Philippines
- Phone: (082) 123-4567
- Hours: Monday–Saturday, 8:00 AM – 5:00 PM PHT

Solar Cenred LLC (United States)
- Registration: TX-BIZ-0012345
- Address: 1234 Capital Drive, Suite 200, Austin, TX 78701
- Phone: (512) 555-0198
- Hours: Monday–Friday, 9:00 AM – 6:00 PM CST

Email: cenredgonzales@gmail.com
Website: https://solarized.bizguro.net
Facebook: facebook.com/zhenpula
LinkedIn: linkedin.com/in/cenredjgonzales

Certifications: DOE Accredited Installer · ERC Compliant · PRC-licensed engineering team
Founded: 2014 (10+ years operating). Over 500 installations and 25+ MW commissioned across the Philippines and the U.S.

=========================================================================
SOLAR SYSTEM TYPES (CORE PRODUCT LINE)
=========================================================================

1. ON-GRID (GRID-TIED) SYSTEM
- Connected directly to the utility grid (e.g., Davao Light, Meralco, Austin Energy).
- Components: solar panels + grid-tie inverter + AC distribution. NO battery.
- Net metering allowed: excess power flows back to the grid for credit.
- Lowest upfront cost. Best ROI. Cannot operate during a blackout (anti-islanding).
- Ideal for: homes/businesses with reliable grid power and stable daytime consumption.

2. OFF-GRID (STANDALONE) SYSTEM
- Fully independent from the utility grid.
- Components: solar panels + charge controller + battery bank + off-grid inverter + (optional) generator.
- Requires significant battery storage sized for autonomy (1–3 days reserve).
- Higher upfront cost; eliminates electricity bill entirely.
- Ideal for: remote farms, mountain cabins, islands, areas without grid access.

3. HYBRID SYSTEM (RECOMMENDED FOR MOST CUSTOMERS)
- Grid-connected with battery backup.
- Components: solar panels + hybrid inverter (e.g., Sol-Ark 12K) + lithium battery bank.
- Operates during grid outages, supports time-of-use optimization, and can do net metering.
- Mid-range upfront cost; best resilience + savings combo.
- Ideal for: areas with frequent brownouts (most of the Philippines), critical loads, work-from-home households.

=========================================================================
EQUIPMENT CATALOG
=========================================================================

SOLAR PANELS
- LONGi Hi-MO 7 575W Mono PERC — 21.5% efficiency, 25-year linear power warranty, 12-year product warranty.
- JinkoSolar Tiger Neo 580W N-type TOPCon — 22.5% efficiency, 30-year warranty.
- JA Solar DeepBlue 4.0 550W — 21.3% efficiency, 25-year warranty.
- Trina Vertex 600W bifacial — for ground-mount/commercial.

INVERTERS
- Sol-Ark 12K Hybrid (12kW continuous, 200% surge) — flagship hybrid, 10-year warranty.
- Sol-Ark 15K-2P — for larger split-phase US installs.
- Victron MultiPlus-II 5kVA — for off-grid stacks.
- Huawei SUN2000 5KTL/10KTL — pure on-grid, optimizer-ready.
- Deye 8K/12K Hybrid — budget hybrid alternative.

BATTERIES
- MUST MH1900 Series LiFePO4 — 100Ah / 200Ah / 300Ah modules, 6,000 cycle life, 10-year warranty.
- Pylontech US5000 4.8 kWh stackable.
- BYD Battery-Box Premium HVS/HVM (high-voltage residential).
- Victron 12.8/200 lithium for off-grid.
Battery chemistry: LiFePO4 only — no lead-acid for new installs (longer life, safer).

CHARGE CONTROLLERS (for off-grid)
- Victron SmartSolar MPPT 150/100 and 250/100.
- EPEVER Tracer-AN MPPT (budget tier).

MOUNTING / RACKING
- Schletter or IronRidge aluminum rails, stainless hardware, EPDM gaskets.
- Roof types supported: trapezoidal metal, corrugated GI, concrete deck, clay tile.
- Ground-mount: galvanized steel, concrete pier or screw-pile foundation.

PROTECTION & MONITORING
- DC isolators, AC breakers, surge protection (Type II).
- Bonded grounding to local code (PEC PH / NEC US).
- WiFi monitoring via Sol-Ark Cloud, SolarMan, or Victron VRM.

=========================================================================
PRICING & COMPUTATION FORMULAS
=========================================================================

Peak sun hours (Philippines avg): 4 hours/day
System efficiency derate: 0.90
Default electricity rate (PH): ₱11 / kWh
Default electricity rate (US): $0.20 / kWh

DAILY CONSUMPTION
  daily_kWh = (monthly_bill / electricity_rate) / 30

SYSTEM SIZE
  system_kW = ceil( (daily_kWh / peak_sun_hours) / efficiency * 10 ) / 10

PANEL COUNT
  panels = ceil( system_kW * 1000 / panel_wattage )    [panel_wattage default 575W]

BATTERY SIZING (hybrid/off-grid)
  battery_kWh = backup_hours * critical_load_kW
  Lithium DoD = 0.90 (use 90% of nameplate kWh)

PRICE ESTIMATES (PHP, turnkey, installed)
  On-grid:   ₱60,000–₱90,000  per kW
  Hybrid:    ₱80,000–₱120,000 per kW
  Off-grid:  ₱100,000–₱160,000 per kW (depends on battery autonomy)

PRICE ESTIMATES (USD, turnkey, installed)
  On-grid:   $1,200–$1,800 per kW
  Hybrid:    $1,500–$2,200 per kW
  Off-grid:  $2,000–$3,000 per kW

ANNUAL SAVINGS
  annual_savings = daily_kWh * 365 * electricity_rate * 0.85    (85% offset assumption)

PAYBACK PERIOD
  payback_years = system_cost / annual_savings    (typical: 4–7 yrs hybrid, 3–5 yrs on-grid)

=========================================================================
22 STANDARD SCENARIOS (REFERENCE QUOTES)
=========================================================================

Scenario 1 — Small Home, On-Grid
  3 kW · 6 panels · ₱220,000 · saves ₱2,500/mo · payback 7 yrs

Scenario 2 — Small Home, Hybrid w/ Backup
  3 kW · 5 kWh battery · ₱340,000 · saves ₱2,800/mo · payback 9 yrs

Scenario 3 — Average Home, On-Grid
  5 kW · 9 panels · ₱360,000 · saves ₱4,200/mo · payback 7 yrs

Scenario 4 — Average Home, Hybrid
  5 kW · 10 kWh battery · ₱520,000 · saves ₱4,800/mo · payback 9 yrs

Scenario 5 — Average Home, Off-Grid
  5 kW · 20 kWh battery · ₱720,000 · saves entire bill · payback 11 yrs

Scenario 6 — Large Home, On-Grid
  8 kW · 14 panels · ₱560,000 · saves ₱7,000/mo · payback 7 yrs

Scenario 7 — Large Home, Hybrid (most popular)
  8 kW · 15 kWh battery · ₱820,000 · saves ₱8,000/mo · payback 8.5 yrs

Scenario 8 — Large Home, Off-Grid
  10 kW · 30 kWh battery · ₱1,150,000 · saves ₱9,500/mo · payback 10 yrs

Scenario 9 — Work-From-Home Household, Hybrid
  6 kW · 10 kWh · ₱620,000 · 8 hrs critical-load backup

Scenario 10 — Davao Townhouse, On-Grid
  4 kW · 7 panels · ₱290,000

Scenario 11 — Cebu Vacation Home, Hybrid
  5 kW · 10 kWh · ₱520,000

Scenario 12 — Mountain Cabin, Off-Grid
  3 kW · 15 kWh · ₱520,000 (no grid available)

Scenario 13 — Island Resort, Off-Grid
  20 kW · 80 kWh · ₱2,800,000

Scenario 14 — Small Sari-Sari Store, On-Grid
  2 kW · ₱160,000 · saves ₱1,800/mo

Scenario 15 — Restaurant w/ Aircon, Hybrid
  10 kW · 20 kWh · ₱1,050,000

Scenario 16 — Office (20 staff), On-Grid
  15 kW · ₱1,000,000 · saves ₱15,000/mo

Scenario 17 — Warehouse / Cold Storage, Hybrid
  30 kW · 60 kWh · ₱2,800,000

Scenario 18 — Manufacturing SME, On-Grid
  50 kW · ₱3,400,000 · saves ₱48,000/mo

Scenario 19 — School / Church Roof, On-Grid
  25 kW · ₱1,800,000

Scenario 20 — Net-Metered Davao Home, On-Grid
  6 kW · ₱430,000 · zero-bill possible w/ net metering

Scenario 21 — Austin TX Home, On-Grid
  8 kW · $14,000 (pre-incentive) · 30% federal ITC = $9,800 net

Scenario 22 — Austin TX Home, Hybrid (storm-resilient)
  10 kW + 20 kWh · $24,000 (pre-incentive) · $16,800 net after ITC

=========================================================================
INSTALLATION PROCESS (4 STEPS)
=========================================================================

1. FREE CONSULTATION & SITE ASSESSMENT
   - 30-min discovery call. Review last 6 months of electricity bills.
   - On-site visit: roof inspection, shade analysis, electrical panel check.
   - Output: technical proposal + binding quote.

2. CUSTOM SYSTEM DESIGN
   - PV layout (PVsyst / Helioscope simulation).
   - Single-line diagram, structural load calculation.
   - Permit application: building permit, electrical permit, ERC net-metering (PH) or interconnection (US).

3. PROFESSIONAL INSTALLATION
   - Typical timeline: 1–3 days residential, 1–2 weeks commercial.
   - Crew: licensed electrician + 2–4 installers. Roof safety harnesses always used.
   - Commissioning: insulation, polarity, ground continuity, inverter test, monitoring setup.

4. ENERGY ENJOYMENT & MONITORING
   - Owner training (15 min walkthrough).
   - Cloud monitoring credentials handed over.
   - Annual maintenance reminder; warranty support throughout.

=========================================================================
WARRANTY TERMS
=========================================================================

PANELS: 12-year product warranty + 25–30-year linear power warranty (≥84.95% at year 25).
INVERTERS: 10 years standard; 15 years extended on Sol-Ark.
BATTERIES (LiFePO4): 10 years OR 6,000 cycles, whichever first. ≥80% capacity retention.
WORKMANSHIP: 5 years on installation labor and waterproofing.
ROOF PENETRATIONS: 10-year leak warranty.
MONITORING: lifetime cloud access while account active.

Exclusions: lightning damage (covered by surge protection device + homeowner insurance), force majeure (typhoon, earthquake), unauthorized modifications, neglected maintenance.

=========================================================================
NET METERING (PHILIPPINES)
=========================================================================

- Eligible utilities: Davao Light, MERALCO, VECO, Cebu Electric Coop, etc.
- Maximum system size: 100 kW under DOE/ERC rules.
- Process: utility application → ERC certificate of compliance → bi-directional meter installed.
- Credits: excess kWh exported are credited at the generation charge rate (~60% of full retail), applied to next bill.
- Approval timeline: 30–60 days post-installation.
- Solar Cenred handles ALL paperwork as part of standard installation.

=========================================================================
GOVERNMENT INCENTIVES & PROGRAMS
=========================================================================

PHILIPPINES
- RA 9513 (Renewable Energy Act): 0% VAT on RE equipment, income tax holiday for developers.
- Net Metering Program (DOE / ERC).
- BOI registration possible for systems above 1 MW (commercial).
- LGU permit fees vary; Davao City has a streamlined process.

UNITED STATES
- Federal Investment Tax Credit (ITC): 30% credit on total system cost (through 2032).
- Texas: property tax exemption on solar; no state income tax credit.
- Local utility rebates vary (Austin Energy offers performance-based rebates).
- MACRS depreciation for commercial.

=========================================================================
TROUBLESHOOTING — COMMON ISSUES
=========================================================================

Q: Why is my system not producing as expected?
- Check for shade (new tree growth, antenna).
- Clean panels (dust, bird droppings reduce output 5–15%).
- Inspect inverter error codes via app.
- Verify that breakers haven't tripped after a brownout.

Q: System shut off during a brownout (on-grid).
- This is BY DESIGN. Anti-islanding protection turns off grid-tied inverters when the grid fails to protect utility workers. Upgrade to hybrid for backup power.

Q: Battery isn't lasting through the night.
- Could be undersized for actual load. Re-evaluate consumption. May need additional battery module.
- Check battery temperature (LiFePO4 derates above 45°C).

Q: Monitoring app shows offline.
- Reset router; verify WiFi password unchanged. Sol-Ark dongle may need re-pairing.

=========================================================================
SUSTAINABILITY & ENVIRONMENTAL IMPACT
=========================================================================

- 1 kW of solar offsets ≈ 1.5 metric tons CO2/year in the Philippines (coal-heavy grid).
- A 5 kW system over 25 years = 187 metric tons CO2 avoided = ~9,000 trees planted.
- Panels are 95% recyclable; Solar Cenred partners with PV Cycle for end-of-life takeback.
- Lithium batteries: closed-loop recycling via supplier programs.

=========================================================================
FREQUENTLY ASKED QUESTIONS (ABRIDGED)
=========================================================================

Q: How long does installation take?
A: 1–3 days for residential systems, 1–2 weeks for commercial. Permits add 30–60 days.

Q: Will solar work during cloudy days or rain?
A: Yes — output drops 30–60% but never to zero. Annual energy yield accounts for weather averages.

Q: Do I need to clean the panels?
A: Light cleaning twice a year recommended. Rain handles most dust.

Q: Can I add more panels later?
A: Yes — design includes headroom in the inverter and conduit so expansion is straightforward.

Q: What happens if I sell my house?
A: Solar typically increases home value 4–6%. Warranty transfers to new owner.

Q: Are there financing options?
A: Yes — Solar Cenred partners with BPI, BDO, and Security Bank for solar loans (PH) and Sunlight Financial / GoodLeap (US). Typical: 0–10% down, 5–10 yr terms.

Q: Do you handle maintenance?
A: Yes — annual maintenance plans available (₱3,500/yr residential). Or pay per visit.

Q: What's the difference between mono and poly panels?
A: Mono PERC and N-type TOPCon are the modern standard — higher efficiency, better low-light performance. Poly is being phased out; we don't install it.

Q: How long do solar panels last?
A: 25–30 years with linear degradation (~0.5%/yr). After year 25, output is still ~85% of original.

Q: Will solar pay for itself?
A: Yes — typical payback is 4–7 years depending on system type and electricity rate. After that, electricity is essentially free for 20+ years.

Q: Is my roof suitable?
A: Most roofs are. South-facing is ideal in the Philippines, but east/west also works. Roof must be structurally sound (we inspect free).

Q: Can I go fully off-grid?
A: Yes, but it costs ~2x a hybrid system due to large battery banks. We recommend hybrid for most customers.

Q: What if the inverter breaks?
A: Covered by 10-year warranty. Sol-Ark replacements ship in 5–10 days. We keep loaner inverters in Davao for critical-load customers.

Q: Why choose Solar Cenred over cheaper competitors?
A: 10+ years experience, DOE/ERC accreditation, permanent local team in Davao for warranty support, and tier-1 equipment only. Cheaper installers often disappear after 2 years; we've been around since 2014.

=========================================================================
END OF KNOWLEDGE BASE
=========================================================================
`;
