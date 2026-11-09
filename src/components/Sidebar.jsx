import { Activity, BarChart3, ChevronLeft, ChevronRight, LayoutDashboard, Package2, Settings2, Timer, X } from 'lucide-react';
import { useTranslation } from '../i18n.jsx';

const links = [
  { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'Inventory', label: 'Medicine inventory', icon: Package2 },
  { id: 'Expiry tracker', label: 'Expiry tracker', icon: Timer },
  { id: 'Reports', label: 'Reports', icon: BarChart3 },
  { id: 'Settings', label: 'Settings', icon: Settings2 },
];

export function Sidebar({ page, setPage, collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const { t } = useTranslation();
  return <>
    {mobileOpen && <button className="mobile-scrim" aria-label={t('Close menu')} onClick={() => setMobileOpen(false)} />}
    <aside className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''} ${mobileOpen ? 'sidebar-mobile-open' : ''}`}>
      <div className="brand-row">
        <div className="brand-mark"><Activity size={22} strokeWidth={2.6} /></div>
        {!collapsed && <div className="brand-copy"><strong>medsave</strong><span>{t('CARE, ORGANIZED')}</span></div>}
        <button className="icon-button mobile-close" aria-label={t('Close menu')} onClick={() => setMobileOpen(false)}><X size={18} /></button>
      </div>
      <div className="nav-caption">{t('WORKSPACE')}</div>
      <nav className="side-nav" aria-label={t('WORKSPACE')}>
        {links.map(({ id, label, icon: Icon }) => <button key={id} title={collapsed ? t(label) : undefined} aria-label={t(label)} className={`nav-item ${page === id ? 'active' : ''}`} aria-current={page === id ? 'page' : undefined} onClick={() => { setPage(id); setMobileOpen(false); }}>
          <Icon size={19} strokeWidth={1.9} /><span>{t(label)}</span>{page === id && <i />}
        </button>)}
      </nav>
      {!collapsed && <div className="sidebar-note"><div className="note-icon"><Activity size={18} /></div><strong>{t('Stay ahead of expiry')}</strong><p>{t('Keep your inventory safe and up to date.')}</p><button onClick={() => { setPage('Expiry tracker'); setMobileOpen(false); }}>{t('View expiry tracker')} <ChevronRight size={14} /></button></div>}
      <div className="sidebar-bottom">
        <div className="profile-avatar">AR</div>
        {!collapsed && <div className="profile-copy"><strong>{t('Alex Rivera')}</strong><span>{t('Workspace owner')}</span></div>}
        <button className="collapse-button" aria-label={t(collapsed ? 'Expand sidebar' : 'Collapse sidebar')} onClick={() => setCollapsed(!collapsed)}>{collapsed ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}</button>
      </div>
    </aside>
  </>;
}

