// Deliberately different from the main app's key: GitHub Pages user sites
// share one browser-storage origin across every repo hosted under it
// (bencarrigan86-ops.github.io), regardless of the folder in the URL, so
// this must never collide with the real app's storage key.
const KEY = 'grainflow-demo.v1';

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function defaultCommodities() {
  return [
    { name: 'Wheat', angleOfRepose: 24, testWeight: 0.82, nPerTonne: 44 },
    { name: 'Barley', angleOfRepose: 27, testWeight: 0.69, nPerTonne: 34 },
    { name: 'Chickpeas', angleOfRepose: 28, testWeight: 0.76, nPerTonne: 35 },
    { name: 'Faba Beans', angleOfRepose: 25, testWeight: 0.785, nPerTonne: 40 },
    { name: 'Canola', angleOfRepose: 26, testWeight: 0.67, nPerTonne: 0 },
    { name: 'Sorghum', angleOfRepose: 24, testWeight: 0.77, nPerTonne: 0 },
    { name: 'Fallow', angleOfRepose: 0, testWeight: 0, nPerTonne: 0 },
  ].map((c) => ({
    id: uid(),
    mtmPrice: 0,
    openingStock: 0,
    retainedSeed: 0,
    grossMarginCost: 0,
    ...c,
  }));
}

function defaultOverheads() {
  return {
    finance: 0, equipmentRepayments: 0, depreciation: 0, wages: 0, drawings: 0,
    admin: 0, energy: 0, insurance: 0, repairsMaintenance: 0, other: 0,
  };
}

// Nitrogen required per tonne of grain (kg N/t), keyed by normalized commodity
// name — used to backfill existing saves from before this field existed.
const N_PER_TONNE_BY_NAME = {
  wheat: 44,
  barley: 34,
  chickpeas: 35,
  'chick peas': 35,
  'faba beans': 40,
  faba: 40,
};

function backfillNPerTonne(commodities) {
  return (commodities || []).map((c) => {
    if (c.nPerTonne !== undefined) return c;
    const key = String(c.name || '').trim().toLowerCase();
    return { ...c, nPerTonne: N_PER_TONNE_BY_NAME[key] ?? 0 };
  });
}

// DEMO BUILD: seeded with sample data so a first-time visitor sees a
// populated app immediately, instead of an empty one. This is the only
// difference from the real app's source.
function defaultYear() {
  return {
    commodities: [
      { id: 'msoaclr41fqqln', mtmPrice: 340, openingStock: 0, retainedSeed: 20, name: 'Wheat', angleOfRepose: 24, testWeight: 0.82, nPerTonne: 44, grossMarginCost: 120000 },
      { id: 'msoaclr4wmiuqh', mtmPrice: 265, openingStock: 0, retainedSeed: 15, name: 'Barley', angleOfRepose: 27, testWeight: 0.69, nPerTonne: 34, grossMarginCost: 40000 },
      { id: 'msoaclr4mmfx5i', mtmPrice: 720, openingStock: 0, retainedSeed: 10, name: 'Chickpeas', angleOfRepose: 28, testWeight: 0.76, nPerTonne: 35, grossMarginCost: 25000 },
      { id: 'msoaclr4x9ok1n', mtmPrice: 0, openingStock: 0, retainedSeed: 0, name: 'Faba Beans', angleOfRepose: 25, testWeight: 0.785, nPerTonne: 40, grossMarginCost: 0 },
      { id: 'msoaclr4ta45xl', mtmPrice: 0, openingStock: 0, retainedSeed: 0, name: 'Canola', angleOfRepose: 26, testWeight: 0.67, nPerTonne: 0, grossMarginCost: 0 },
      { id: 'msoaclr4iuzus2', mtmPrice: 0, openingStock: 0, retainedSeed: 0, name: 'Sorghum', angleOfRepose: 24, testWeight: 0.77, nPerTonne: 0, grossMarginCost: 0 },
      { id: 'msoaclr4jtyzgd', mtmPrice: 0, openingStock: 0, retainedSeed: 0, name: 'Fallow', angleOfRepose: 0, testWeight: 0, nPerTonne: 0, grossMarginCost: 0 },
    ],
    fields: [
      { id: 'msoactt1a1hbqj', name: 'North Paddock', areaHa: 210, commodityId: 'msoaclr41fqqln', yieldTHa: 4.9, yieldMode: 'estimate', ureaRequiredKgHa: 90, ureaAppliedKgHa: 90, seedVariety: 'Scepter', seedRateKgHa: 65 },
      { id: 'msoactx686ftou', name: 'South Paddock', areaHa: 175, commodityId: 'msoaclr41fqqln', yieldTHa: 5.2, yieldMode: 'estimate', ureaRequiredKgHa: 90, ureaAppliedKgHa: 60, seedVariety: 'Scepter', seedRateKgHa: 65 },
      { id: 'msoacu14yzyr41', name: 'River Block', areaHa: 140, commodityId: 'msoaclr4wmiuqh', yieldTHa: 5.6, yieldMode: 'estimate', ureaRequiredKgHa: 75, ureaAppliedKgHa: 75, seedVariety: 'Spartacus CL', seedRateKgHa: 70 },
      { id: 'msoacu4lhqzjhb', name: 'Home Paddock', areaHa: 95, commodityId: 'msoaclr4mmfx5i', yieldTHa: 2.1, yieldMode: 'estimate', ureaRequiredKgHa: 0, ureaAppliedKgHa: 0, seedVariety: 'Kyabra', seedRateKgHa: 90 },
    ],
    sales: [
      { id: 'msoad38fu5po5n', date: '', commodityId: 'msoaclr41fqqln', grade: 'APW1', buyer: 'CBH', contractNo: 'C-10245', location: 'Wagga Wagga', deliveryStart: '2026-11-15', deliveryEnd: '2026-12-15', tons: 900, tonsDelivered: 400, price: 350, freight: 22, premiumDiscount: 0, leviesPct: 0.0102, tolerancePct: 5, toleranceCapTons: 20, brokerNote: '', notes: '', buyerAbn: '23 456 789 012', buyerAddress: '1 Grain Way, Wagga Wagga NSW' },
      { id: 'msoad3chrx534o', date: '', commodityId: 'msoaclr4wmiuqh', grade: 'F1', buyer: 'Cargill', contractNo: 'C-10301', location: 'Junee', deliveryStart: '2026-12-01', deliveryEnd: '2026-12-31', tons: 400, tonsDelivered: 0, price: 285, freight: 18, premiumDiscount: 0, leviesPct: 0.0102, tolerancePct: 5, toleranceCapTons: 20, brokerNote: '', notes: '', buyerAbn: '34 567 890 123', buyerAddress: '2 Cargill Court, Junee NSW' },
    ],
    storages: [
      { id: 'msoadgd3xpn0t4', kind: 'silo', name: 'Silo 1 (155t)', commodityId: 'msoaclr41fqqln', openingStock: 40, capacityTons: 155, angleOfRepose: null, testWeight: null, radius: 2.95, coneAngle: 35, currentHeight: 4.8, fillState: 'peak', createdAt: 1786430127639 },
      { id: 'msoadgjk4qccfc', kind: 'bunker', name: 'Bunker 1', commodityId: 'msoaclr4wmiuqh', openingStock: 0, capacityTons: null, angleOfRepose: 24, testWeight: null, width: 24, length: 60, tarpOverhangM: 1.5, createdAt: 1786430127872 },
    ],
    movements: [
      { id: 'msoadgrgpr8t2s', date: '2026-11-18', fromType: 'field', fromId: 'msoactt1a1hbqj', toType: 'silo', toId: 'msoadgd3xpn0t4', truckRego: '1ABC234', driver: 'Dave', tons: 22.4, weightStatus: 'final', notes: '', ticketNo: 1 },
    ],
    overheads: {
      finance: 40000, equipmentRepayments: 35000, depreciation: 60000, wages: 45000, drawings: 60000,
      admin: 8000, energy: 18000, insurance: 12000, repairsMaintenance: 30000, other: 5000,
    },
    invoices: [],
  };
}

// Not per-year — the farm's own details barely change season to season, and
// are used to fill in the "Seller" side of a generated sale invoice.
function defaultBusinessDetails() {
  return {
    entityName: 'Grainflow Demo Farm Pty Ltd', abn: '11 222 333 444', ngr: '12345678',
    contactName: 'Sam Grower', phone: '0400 000 000', email: 'demo@example.com',
    address: '123 Sample Road, Wagga Wagga NSW',
    paymentTermsDays: 14,
    bankName: 'Demo Bank', accountName: 'Grainflow Demo Farm Pty Ltd', bsb: '000-000', accountNumber: '00000000',
  };
}

function defaultData() {
  const year = String(new Date().getFullYear());
  return {
    version: 2,
    currentYear: year,
    years: { [year]: defaultYear() },
    businessDetails: defaultBusinessDetails(),
    nextMovementNo: 2, // one seeded movement already uses ticketNo 1
    nextInvoiceNo: 1,
  };
}

// Movement ticket numbers are farm-wide and never reused (not per-year, so
// they stay meaningful across season changes) — assign them to any
// movement that predates this field, in date order, without colliding with
// numbers already assigned.
function backfillMovementNos(result) {
  const used = new Set();
  Object.values(result.years).forEach((y) => {
    (y.movements || []).forEach((m) => { if (m.ticketNo) used.add(m.ticketNo); });
  });
  let next = Number(result.nextMovementNo) || 1;
  const unnumbered = [];
  Object.values(result.years).forEach((y) => {
    (y.movements || []).forEach((m) => { if (!m.ticketNo) unnumbered.push(m); });
  });
  unnumbered
    .sort((a, b) => (a.date || '').localeCompare(b.date || ''))
    .forEach((m) => {
      while (used.has(next)) next++;
      m.ticketNo = next;
      used.add(next);
      next++;
    });
  result.nextMovementNo = next;
  return result;
}

// Bring an older single-season save (or one missing fields we've since added)
// up to the current {version, currentYear, years} shape without losing data.
function migrate(parsed) {
  if (parsed && parsed.years && typeof parsed.years === 'object') {
    const result = {
      version: 2,
      currentYear: parsed.currentYear && parsed.years[parsed.currentYear] ? parsed.currentYear : Object.keys(parsed.years)[0],
      years: Object.fromEntries(
        Object.entries(parsed.years).map(([y, yd]) => {
          const merged = { ...defaultYear(), ...yd };
          return [y, {
            ...merged,
            commodities: backfillNPerTonne(merged.commodities),
            overheads: { ...defaultOverheads(), ...(yd.overheads || {}) },
          }];
        })
      ),
      businessDetails: { ...defaultBusinessDetails(), ...(parsed.businessDetails || {}) },
      nextMovementNo: parsed.nextMovementNo,
      nextInvoiceNo: parsed.nextInvoiceNo || 1,
    };
    return backfillMovementNos(result);
  }
  // Old flat shape: { commodities, fields, sales, storages, movements }
  if (parsed && (parsed.commodities || parsed.fields || parsed.sales || parsed.storages)) {
    const year = String(new Date().getFullYear());
    const merged = { ...defaultYear(), ...parsed };
    const result = {
      version: 2,
      currentYear: year,
      years: { [year]: {
        ...merged,
        commodities: backfillNPerTonne(merged.commodities),
        overheads: { ...defaultOverheads(), ...(parsed.overheads || {}) },
      } },
      businessDetails: defaultBusinessDetails(),
      nextMovementNo: parsed.nextMovementNo,
      nextInvoiceNo: 1,
    };
    return backfillMovementNos(result);
  }
  return defaultData();
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultData();
    return migrate(JSON.parse(raw));
  } catch (e) {
    console.error('Failed to load data, resetting.', e);
    return defaultData();
  }
}

let data = load();
const listeners = new Set();

function current() {
  return data.years[data.currentYear];
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save data', e);
    alert('Could not save — your device storage may be full. Try removing a movement photo and saving again.');
    return;
  }
  listeners.forEach((fn) => fn(data));
}

export const db = {
  subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  get() {
    return current();
  },

  // --- seasons / years ---
  getYears() {
    return Object.keys(data.years).sort();
  },
  getCurrentYear() {
    return data.currentYear;
  },
  setCurrentYear(year) {
    if (!data.years[year]) return false;
    data.currentYear = year;
    persist();
    return true;
  },
  renameYear(oldYear, newYear) {
    const label = String(newYear || '').trim();
    if (!label || !data.years[oldYear]) return false;
    if (label === oldYear) return true;
    if (data.years[label]) return false;
    data.years[label] = data.years[oldYear];
    delete data.years[oldYear];
    if (data.currentYear === oldYear) data.currentYear = label;
    persist();
    return true;
  },
  /**
   * Start a new year, seeded from the currently active one: fields and
   * storages carry over their setup (name, area/geometry, commodity) but
   * have their season data (yield, urea, seed, current level, opening
   * stock) reset. Commodities carry over their physical properties (angle
   * of repose, test weight, N required per tonne) but reset MTM price /
   * opening stock / retained seed / gross margin cost. Overheads reset to
   * zero. Sales, movements, and invoices start empty.
   */
  createYear(year) {
    const label = String(year || '').trim();
    if (!label || data.years[label]) return false;
    const src = current();

    const idMap = new Map();
    const commodities = src.commodities.map((c) => {
      const id = uid();
      idMap.set(c.id, id);
      return {
        id,
        name: c.name,
        angleOfRepose: c.angleOfRepose,
        testWeight: c.testWeight,
        nPerTonne: c.nPerTonne,
        mtmPrice: 0,
        openingStock: 0,
        retainedSeed: 0,
        grossMarginCost: 0,
      };
    });
    const mapCommodity = (oldId) => (oldId && idMap.has(oldId) ? idMap.get(oldId) : null);

    const fields = src.fields.map((f) => ({
      id: uid(),
      name: f.name,
      areaHa: f.areaHa,
      commodityId: mapCommodity(f.commodityId),
      yieldTHa: 0,
      yieldMode: 'estimate',
      ureaRequiredKgHa: 0,
      ureaAppliedKgHa: 0,
      seedVariety: '',
      seedRateKgHa: 0,
    }));

    const storages = src.storages.map((s) => ({
      id: uid(),
      kind: s.kind,
      name: s.name,
      commodityId: mapCommodity(s.commodityId),
      radius: s.radius,
      coneAngle: s.coneAngle,
      width: s.width,
      capacityTons: s.capacityTons,
      angleOfRepose: s.angleOfRepose,
      testWeight: s.testWeight,
      tarpOverhangM: s.tarpOverhangM,
      currentHeight: 0,
      length: 0,
      fillState: 'peak',
      openingStock: 0,
      createdAt: Date.now(),
    }));

    data.years[label] = { commodities, fields, storages, sales: [], movements: [], overheads: defaultOverheads(), invoices: [] };
    data.currentYear = label;
    persist();
    return true;
  },
  deleteYear(year) {
    const years = Object.keys(data.years);
    if (years.length <= 1 || !data.years[year]) return false;
    delete data.years[year];
    if (data.currentYear === year) data.currentYear = Object.keys(data.years).sort().slice(-1)[0];
    persist();
    return true;
  },

  // --- commodities ---
  upsertCommodity(commodity) {
    const c = current();
    if (commodity.id) {
      const idx = c.commodities.findIndex((x) => x.id === commodity.id);
      if (idx >= 0) c.commodities[idx] = { ...c.commodities[idx], ...commodity };
    } else {
      c.commodities.push({
        mtmPrice: 0, openingStock: 0, retainedSeed: 0, grossMarginCost: 0, ...commodity, id: uid(),
      });
    }
    persist();
  },
  deleteCommodity(id) {
    current().commodities = current().commodities.filter((c) => c.id !== id);
    persist();
  },

  // --- fields (production) ---
  upsertField(field) {
    const c = current();
    if (field.id) {
      const idx = c.fields.findIndex((f) => f.id === field.id);
      if (idx >= 0) c.fields[idx] = { ...c.fields[idx], ...field };
    } else {
      c.fields.push({ ...field, id: uid() });
    }
    persist();
  },
  deleteField(id) {
    current().fields = current().fields.filter((f) => f.id !== id);
    persist();
  },

  // --- sales ---
  upsertSale(sale) {
    const c = current();
    if (sale.id) {
      const idx = c.sales.findIndex((s) => s.id === sale.id);
      if (idx >= 0) c.sales[idx] = { ...c.sales[idx], ...sale };
    } else {
      c.sales.push({ ...sale, id: uid() });
    }
    persist();
  },
  deleteSale(id) {
    current().sales = current().sales.filter((s) => s.id !== id);
    persist();
  },

  // --- storages (silos / bunkers) ---
  upsertStorage(storage) {
    const c = current();
    if (storage.id) {
      const idx = c.storages.findIndex((s) => s.id === storage.id);
      if (idx >= 0) c.storages[idx] = { ...c.storages[idx], ...storage };
    } else {
      c.storages.push({ ...storage, id: uid(), createdAt: Date.now() });
    }
    persist();
  },
  deleteStorage(id) {
    current().storages = current().storages.filter((s) => s.id !== id);
    persist();
  },

  // --- movements (truck tickets) ---
  upsertMovement(movement) {
    const c = current();
    if (movement.id) {
      const idx = c.movements.findIndex((m) => m.id === movement.id);
      if (idx >= 0) c.movements[idx] = { ...c.movements[idx], ...movement };
    } else {
      c.movements.push({ ...movement, id: uid(), ticketNo: data.nextMovementNo });
      data.nextMovementNo += 1;
    }
    persist();
  },
  deleteMovement(id) {
    current().movements = current().movements.filter((m) => m.id !== id);
    persist();
  },

  // --- invoices (per season, tied to a sale) ---
  getInvoicesForSale(saleId) {
    return current().invoices.filter((inv) => inv.saleId === saleId);
  },
  /**
   * Create an invoice from a snapshot the caller has already computed
   * (lines + totals) — invoiced amounts stay fixed even if the sale's price
   * or the business's details are edited later. Assigns the next farm-wide
   * invoice number and starts as outstanding.
   */
  createInvoice(invoice) {
    const inv = { ...invoice, id: uid(), invoiceNo: data.nextInvoiceNo, status: 'outstanding', paidDate: null };
    data.nextInvoiceNo += 1;
    current().invoices.push(inv);
    persist();
    return inv;
  },
  setInvoiceStatus(id, status) {
    const c = current();
    const idx = c.invoices.findIndex((inv) => inv.id === id);
    if (idx < 0) return;
    c.invoices[idx] = { ...c.invoices[idx], status, paidDate: status === 'paid' ? new Date().toISOString().slice(0, 10) : null };
    persist();
  },
  /** Overwrite an existing invoice's lines/totals (editing which loads, custom items, or amounts) without touching its number or paid status. */
  updateInvoice(id, patch) {
    const c = current();
    const idx = c.invoices.findIndex((inv) => inv.id === id);
    if (idx < 0) return;
    c.invoices[idx] = { ...c.invoices[idx], ...patch };
    persist();
  },
  deleteInvoice(id) {
    current().invoices = current().invoices.filter((inv) => inv.id !== id);
    persist();
  },

  // --- overheads (farm-wide, per season) ---
  getOverheads() {
    return current().overheads;
  },
  updateOverheads(patch) {
    current().overheads = { ...current().overheads, ...patch };
    persist();
  },

  // --- business details (not per-year — used to fill in a sale invoice) ---
  getBusinessDetails() {
    return data.businessDetails;
  },
  updateBusinessDetails(patch) {
    data.businessDetails = { ...data.businessDetails, ...patch };
    persist();
  },

  exportJSON() {
    return JSON.stringify(data, null, 2);
  },
  importJSON(json) {
    data = migrate(JSON.parse(json));
    persist();
  },
  resetAll() {
    data = defaultData();
    persist();
  },
};

export { uid };
