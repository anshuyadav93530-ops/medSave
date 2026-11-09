import { useState } from 'react';
import { Save } from 'lucide-react';
import { categories } from '../data';
import { Modal } from './Shared';
import { useTranslation } from '../i18n.jsx';

const emptyMedicine = { name: '', category: '', batch: '', quantity: '', purchaseDate: '', expiryDate: '', storage: '', notes: '', price: '' };

export function MedicineForm({ medicine, onSave, onClose }) {
  const { t } = useTranslation();
  const [form, setForm] = useState(medicine ? { ...medicine, quantity: String(medicine.quantity), price: String(medicine.price ?? '') } : emptyMedicine);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const update = (key, value) => { setForm((current) => ({ ...current, [key]: value })); setErrors((current) => ({ ...current, [key]: '' })); setFormError(''); };

  const submit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = t('Enter a medicine name.');
    if (!form.category) nextErrors.category = t('Choose a category.');
    if (!form.batch.trim()) nextErrors.batch = t('Enter a batch number.');
    if (form.quantity === '' || !Number.isInteger(Number(form.quantity)) || Number(form.quantity) < 0) nextErrors.quantity = t('Enter a whole number of 0 or more.');
    if (!form.purchaseDate) nextErrors.purchaseDate = t('Choose the purchase date.');
    if (!form.expiryDate) nextErrors.expiryDate = t('Choose the expiry date.');
    if (form.purchaseDate && form.expiryDate && form.expiryDate < form.purchaseDate) nextErrors.expiryDate = t('Expiry date must be on or after purchase date.');
    if (form.price !== '' && (!Number.isFinite(Number(form.price)) || Number(form.price) < 0)) nextErrors.price = t('Enter a price of 0 or more.');
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) { setFormError(t('Please correct the highlighted fields and try again.')); return; }
    onSave({ ...form, name: form.name.trim(), batch: form.batch.trim(), quantity: Number(form.quantity), price: Number(form.price || 0), id: medicine?.id });
  };

  const field = (key, label, type = 'text', options) => <label className={`form-field ${errors[key] ? 'has-error' : ''}`} key={key}><span>{t(label)}{!['notes', 'storage', 'price'].includes(key) && <b> *</b>}</span>{options ? <select value={form[key]} onChange={(event) => update(key, event.target.value)}><option value="">{t('Select category')}</option>{options.map((item) => <option key={item} value={item}>{t(item)}</option>)}</select> : type === 'textarea' ? <textarea rows="3" value={form[key]} onChange={(event) => update(key, event.target.value)} placeholder={t(key === 'storage' ? 'e.g. Store below 25°C' : 'Add any additional details')} /> : <input type={type} min={type === 'number' ? '0' : undefined} step={type === 'number' && key === 'price' ? '0.01' : type === 'number' ? '1' : undefined} value={form[key]} onChange={(event) => update(key, event.target.value)} placeholder={key === 'batch' ? t('e.g. PCM-24-081') : undefined} />}{errors[key] && <small>{errors[key]}</small>}</label>;

  return <Modal title={medicine ? 'Edit medicine' : 'Add a medicine'} subtitle={medicine ? 'Update the details for this medicine.' : 'Enter the medicine details to add it to your inventory.'} onClose={onClose} wide><form className="medicine-form" onSubmit={submit} noValidate>
    <div className="form-section-title">{t('Medicine details')}</div><div className="form-grid">{field('name', 'Medicine name')}{field('category', 'Category', 'select', categories)}{field('batch', 'Batch number')}{field('quantity', 'Quantity', 'number')}</div>
    <div className="form-section-title form-section-spaced">{t('Dates and storage')}</div><div className="form-grid">{field('purchaseDate', 'Purchase date', 'date')}{field('expiryDate', 'Expiry date', 'date')}{field('storage', 'Storage instructions')}{field('price', 'Unit purchase price', 'number')}</div>
    {field('notes', 'Notes', 'textarea')}{formError && <div className="form-error-summary" role="alert">{formError}</div>}
    <div className="form-footer"><span><b>*</b> {t('Required fields')}</span><div><button type="button" className="button button-quiet" onClick={onClose}>{t('Cancel')}</button><button className="button button-primary" type="submit"><Save size={16} />{t(medicine ? 'Save changes' : 'Add medicine')}</button></div></div>
  </form></Modal>;
}
