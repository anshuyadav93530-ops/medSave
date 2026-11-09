import { Bell, ChevronDown, Menu, Moon, Plus, Sun } from 'lucide-react';
import { formatDate } from '../utils';
import { useTranslation } from '../i18n.jsx';

const pageDescriptions = {
  Dashboard: 'Here’s what’s happening with your inventory today.',
  Inventory: 'Manage and keep track of all your medicines.',
  'Expiry tracker': 'Stay ahead of medicines nearing their expiry date.',
  Reports: 'Understand your inventory at a glance.',
  Settings: 'Manage your workspace preferences.',
};

export function Topbar({ page, onAdd, onMobileMenu, onAlerts, theme, onToggleTheme }) {
  const { language, setLanguage, t } = useTranslation();
  return <header className="topbar">
    <div className="topbar-left"><MobileMenuButton onClick={onMobileMenu} /><div><div className="breadcrumb">{t('Workspace')} <span>/</span> <b>{t(page)}</b></div><p>{t(pageDescriptions[page])}</p></div></div>
    <div className="topbar-right"><div className="date-chip"><span className="live-dot" /> {formatDate(new Date().toISOString().slice(0, 10))}</div><button className="icon-button notification-button" aria-label={t('Open expiry alerts')} title={t('Open expiry alerts')} onClick={onAlerts}><Bell size={19} /><i /></button><label className="language-control"><span className="sr-only">{t('Language')}</span><select value={language} onChange={(event) => setLanguage(event.target.value)} aria-label={t('Language')}><option value="en">EN</option><option value="hi">हिंदी</option></select></label><button className="icon-button theme-toggle" aria-label={t(theme === 'light' ? 'Dark mode' : 'Light mode')} title={t(theme === 'light' ? 'Dark mode' : 'Light mode')} onClick={onToggleTheme}>{theme === 'light' ? <Moon size={18}/> : <Sun size={18}/>}</button><div className="top-avatar">AR</div><div className="top-user"><span>{t('Alex Rivera')}</span><ChevronDown size={15} /></div><button className="button button-primary top-add" onClick={onAdd}><Plus size={17} /> {t('Add medicine')}</button></div>
  </header>;
}

export function SectionHeading({ eyebrow, title, description, action }) {
  const { t } = useTranslation();
  return <div className="section-heading"><div>{eyebrow && <div className="eyebrow">{t(eyebrow)}</div>}<h2>{t(title)}</h2>{description && <p>{t(description)}</p>}</div>{action}</div>;
}

export function StatCard({ title, value, subtext, icon: Icon, tone, trend, onClick }) {
  const { t } = useTranslation();
  return <button type="button" className="stat-card" onClick={onClick} aria-label={`${t(title)}: ${value}`}><span className={`stat-icon ${tone}`}><Icon size={19} strokeWidth={2} /></span><span className="stat-trend">{trend}</span><span className="stat-label">{t(title)}</span><strong className="stat-value">{value}</strong><span className="stat-subtext">{t(subtext)}</span></button>;
}

export function StatusBadge({ status }) {
  const { t } = useTranslation();
  const key = status === 'Expired' ? 'expired' : status === 'Expiring soon' ? 'soon' : 'healthy';
  return <span className={`status-badge ${key}`}><i />{t(status)}</span>;
}

export function Modal({ title, subtitle, onClose, children, wide = false }) {
  const { t } = useTranslation();
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className={`modal ${wide ? 'modal-wide' : ''}`} role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className="modal-heading"><div><h2 id="modal-title">{t(title)}</h2>{subtitle && <p>{t(subtitle)}</p>}</div><button type="button" className="icon-button modal-close" aria-label={t('Close dialog')} onClick={onClose}>×</button></div>{children}</section></div>;
}

export function MobileMenuButton({ onClick }) {
  const { t } = useTranslation();
  return <button className="icon-button mobile-menu" aria-label={t('Open menu')} onClick={onClick}><Menu size={21} /></button>;
}
