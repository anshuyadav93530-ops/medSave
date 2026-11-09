import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight, MoreHorizontal, Pencil, Search, Trash2 } from 'lucide-react';
import { daysUntil, expiryStatus, formatDate } from '../utils';
import { StatusBadge } from './Shared';
import { useTranslation } from '../i18n.jsx';

const PAGE_SIZE = 8;
const columns = [
  { key: 'name', label: 'Medicine name' }, { key: 'category', label: 'Category' }, { key: 'batch', label: 'Batch number' },
  { key: 'quantity', label: 'Quantity' }, { key: 'expiryDate', label: 'Expiry date' }, { key: 'status', label: 'Expiry status' },
];

export function MedicineTable({ medicines, onEdit, onDelete, filter, onFilterChange }) {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState({ key: 'expiryDate', direction: 'asc' });
  const [page, setPage] = useState(1);
  const [menuId, setMenuId] = useState('');
  const results = useMemo(() => {
    const term = query.toLowerCase().trim();
    return medicines.filter((medicine) => (!term || `${medicine.name} ${medicine.batch} ${medicine.category}`.toLowerCase().includes(term)) && (filter === 'All statuses' || expiryStatus(medicine.expiryDate) === filter))
      .sort((a, b) => {
        const valueA = sort.key === 'status' ? daysUntil(a.expiryDate) : a[sort.key];
        const valueB = sort.key === 'status' ? daysUntil(b.expiryDate) : b[sort.key];
        return (typeof valueA === 'number' ? valueA - valueB : String(valueA).localeCompare(String(valueB))) * (sort.direction === 'asc' ? 1 : -1);
      });
  }, [medicines, query, filter, sort]);
  useEffect(() => setPage(1), [filter]);
  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visible = results.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const changeSort = (key) => { setSort((current) => current.key === key ? { key, direction: current.direction === 'asc' ? 'desc' : 'asc' } : { key, direction: 'asc' }); setPage(1); };
  const sortIcon = (key) => sort.key !== key ? <ArrowUpDown size={13} /> : sort.direction === 'asc' ? <ArrowUp size={13} /> : <ArrowDown size={13} />;

  return <div className="table-card"><div className="table-toolbar"><div className="search-box"><Search size={17} /><input aria-label={t('Search medicines')} placeholder={t('Search medicine or batch...')} value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} /><kbd>⌘ K</kbd></div><select aria-label={t('Filter by expiry status')} className="filter-select" value={filter} onChange={(event) => { onFilterChange(event.target.value); setPage(1); }}>{['All statuses', 'Healthy', 'Expiring soon', 'Expired'].map((status) => <option key={status} value={status}>{t(status)}</option>)}</select><span className="result-count">{t('{count} medicines', { count: results.length })}</span></div>
    <div className="table-wrap"><table className="inventory-table"><thead><tr>{columns.map(({ key, label }) => <th key={key}><button aria-label={`${t('Sort by')} ${t(label)}`} onClick={() => changeSort(key)}>{t(label)}{sortIcon(key)}</button></th>)}<th><span className="sr-only">{t('Actions')}</span></th></tr></thead><tbody>
      {visible.map((medicine) => { const status = expiryStatus(medicine.expiryDate); return <tr key={medicine.id}><td><div className="medicine-name-cell"><span className="medicine-avatar">{medicine.name.slice(0, 1).toUpperCase()}</span><div><strong>{medicine.name}</strong><span>{medicine.storage || t('No storage instructions')}</span></div></div></td><td><span className="category-pill">{medicine.category}</span></td><td className="batch-cell">{medicine.batch}</td><td><strong>{medicine.quantity}</strong><span className="unit-label"> {t('units')}</span></td><td><div className="date-cell">{formatDate(medicine.expiryDate)}{status !== 'Healthy' && <small>{daysUntil(medicine.expiryDate) < 0 ? t('{days}d ago', { days: Math.abs(daysUntil(medicine.expiryDate)) }) : t('{days}d left', { days: daysUntil(medicine.expiryDate) })}</small>}</div></td><td><StatusBadge status={status} /></td><td><div className="row-actions"><button className="icon-button row-more" aria-label={`${t('Actions')} ${medicine.name}`} onClick={() => setMenuId(menuId === medicine.id ? '' : medicine.id)}><MoreHorizontal size={19} /></button>{menuId === medicine.id && <div className="row-menu"><button onClick={() => { onEdit(medicine); setMenuId(''); }}><Pencil size={15} /> {t('Edit')}</button><button className="delete-option" onClick={() => { onDelete(medicine); setMenuId(''); }}><Trash2 size={15} /> {t('Delete')}</button></div>}</div></td></tr>; })}
      {!visible.length && <tr><td colSpan="7"><div className="empty-state"><Search size={25} /><strong>{t('No medicines found')}</strong><span>{t('Try a different search or filter.')}</span></div></td></tr>}
    </tbody></table></div>
    <div className="table-footer"><span>{t('Showing {start}–{end} of {total} medicines', { start: results.length ? (currentPage - 1) * PAGE_SIZE + 1 : 0, end: Math.min(currentPage * PAGE_SIZE, results.length), total: results.length })}</span><div className="pagination"><button aria-label={t('Previous page')} disabled={currentPage <= 1} onClick={() => setPage(currentPage - 1)}><ChevronLeft size={16} /></button><span>{t('Page {page} of {total}', { page: currentPage, total: pageCount })}</span><button aria-label={t('Next page')} disabled={currentPage >= pageCount} onClick={() => setPage(currentPage + 1)}><ChevronRight size={16} /></button></div></div>
  </div>;
}
