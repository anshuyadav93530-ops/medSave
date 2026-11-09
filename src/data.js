const day = (offset) => {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + offset);
  return date.toISOString().slice(0, 10);
};

export const categories = ['Analgesic', 'Antibiotic', 'Antihistamine', 'Cardiovascular', 'Diabetes care', 'First aid', 'Supplement'];

export const seedMedicines = [
  { id: 'med-01', name: 'Paracetamol 500 mg', category: 'Analgesic', batch: 'PCM-24-081', quantity: 240, purchaseDate: day(-58), expiryDate: day(240), storage: 'Store below 25°C, keep dry', notes: 'Tablets, 10 × 10 blister packs', price: 0.08 },
  { id: 'med-02', name: 'Amoxicillin 250 mg', category: 'Antibiotic', batch: 'AMX-24-117', quantity: 86, purchaseDate: day(-72), expiryDate: day(5), storage: 'Keep in a cool, dry place', notes: 'Capsules', price: 0.22 },
  { id: 'med-03', name: 'Cetirizine 10 mg', category: 'Antihistamine', batch: 'CTZ-24-064', quantity: 132, purchaseDate: day(-42), expiryDate: day(24), storage: 'Store below 30°C', notes: 'Tablets', price: 0.12 },
  { id: 'med-04', name: 'Metformin 500 mg', category: 'Diabetes care', batch: 'MTF-24-203', quantity: 310, purchaseDate: day(-35), expiryDate: day(365), storage: 'Protect from moisture', notes: 'Extended-release tablets', price: 0.09 },
  { id: 'med-05', name: 'Ibuprofen 200 mg', category: 'Analgesic', batch: 'IBU-23-044', quantity: 54, purchaseDate: day(-220), expiryDate: day(-12), storage: 'Store below 25°C', notes: 'Review expired stock before disposal', price: 0.1 },
  { id: 'med-06', name: 'Loratadine 10 mg', category: 'Antihistamine', batch: 'LOR-24-091', quantity: 98, purchaseDate: day(-29), expiryDate: day(78), storage: 'Keep away from direct sunlight', notes: 'Tablets', price: 0.14 },
  { id: 'med-07', name: 'Amlodipine 5 mg', category: 'Cardiovascular', batch: 'AML-24-312', quantity: 175, purchaseDate: day(-18), expiryDate: day(18), storage: 'Store at room temperature', notes: 'Tablets', price: 0.16 },
  { id: 'med-08', name: 'Vitamin C 500 mg', category: 'Supplement', batch: 'VTC-24-020', quantity: 64, purchaseDate: day(-94), expiryDate: day(2), storage: 'Keep tightly closed', notes: 'Chewable tablets', price: 0.11 },
  { id: 'med-09', name: 'Oral rehydration salts', category: 'First aid', batch: 'ORS-24-533', quantity: 45, purchaseDate: day(-10), expiryDate: day(540), storage: 'Keep sachets sealed and dry', notes: '20.5 g sachets', price: 0.3 },
  { id: 'med-10', name: 'Azithromycin 500 mg', category: 'Antibiotic', batch: 'AZM-23-145', quantity: 22, purchaseDate: day(-300), expiryDate: day(-3), storage: 'Store below 25°C', notes: 'Tablets', price: 0.48 },
  { id: 'med-11', name: 'Omeprazole 20 mg', category: 'Analgesic', batch: 'OMP-24-281', quantity: 119, purchaseDate: day(-15), expiryDate: day(14), storage: 'Protect from moisture and light', notes: 'Delayed-release capsules', price: 0.18 },
  { id: 'med-12', name: 'Insulin glargine 100 IU', category: 'Diabetes care', batch: 'INS-24-076', quantity: 12, purchaseDate: day(-4), expiryDate: day(190), storage: 'Refrigerate at 2–8°C; do not freeze', notes: 'Unopened pens', price: 8.5 },
];

export const initialPreferences = {
  compact: false,
  emailAlerts: true,
  inAppAlerts: true,
  lowStockThreshold: 20,
  currency: 'USD',
  theme: 'light',
};
