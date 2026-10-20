import { useState } from 'react'
import { Activity, Bell, ChartNoAxesCombined, ChevronDown, CircleHelp, FileClock, FlaskConical, LayoutDashboard, Menu, Radio, Settings, Shield, SlidersHorizontal, X, Zap } from 'lucide-react'
import type { Page } from './Overview'
import { OverviewDashboard } from './OverviewDashboard'
import { WorkspacePage } from './WorkspacePages'

const navigation: { label: Page; icon: typeof LayoutDashboard }[] = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Live Trading', icon: Radio },
  { label: 'Strategy Builder', icon: SlidersHorizontal },
  { label: 'Backtesting', icon: FlaskConical },
  { label: 'Trade History', icon: FileClock },
  { label: 'Analytics', icon: ChartNoAxesCombined },
  { label: 'Risk Management', icon: Shield },
  { label: 'Connections', icon: Zap },
  { label: 'Settings', icon: Settings },
]

function App() {
  const [page, setPage] = useState<Page>('Overview')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [menu, setMenu] = useState<'profile' | 'notifications' | null>(null)
  function navigate(next: Page) {
    setPage(next)
    setMobileNavOpen(false)
    setMenu(null)
  }

  return <div className="app-shell">
    <aside className={`sidebar ${mobileNavOpen ? 'sidebar-open' : ''}`}>
      <div className="brand-lockup"><div className="brand-symbol" aria-hidden="true"><span /><span /><span /></div><div className="brand-name">kasi<span>trade</span><small>AUTOMATION</small></div><button className="icon-button mobile-close" aria-label="Close menu" onClick={() => setMobileNavOpen(false)}><X size={18} /></button></div>
      <div className="workspace-switcher"><div className="workspace-avatar">K</div><div className="workspace-copy"><strong>My workspace</strong><span>Personal account</span></div><ChevronDown size={15} /></div>
      <div className="nav-caption">WORKSPACE</div><nav className="main-nav" aria-label="Main navigation">{navigation.map(({ label, icon: Icon }, index) => <button key={label} className={`nav-link ${page === label ? 'active' : ''} ${index === 6 ? 'nav-section-break' : ''}`} onClick={() => navigate(label)} aria-current={page === label ? 'page' : undefined}><Icon size={17} strokeWidth={1.8} /><span>{label}</span>{label === 'Connections' && <span className="nav-dot" aria-label="Disconnected" />}</button>)}</nav>
      <div className="sidebar-bottom"><div className="help-card"><div className="help-icon"><CircleHelp size={16} /></div><div><strong>Need a hand?</strong><span>We’re here to help.</span></div><Activity size={14} /></div><div className="sidebar-foot"><span className="sidebar-online-dot" />System status <span className="operational">Operational</span></div><div className="sidebar-version">KASITRADE AUTOMATION <span>v0.1.0</span></div></div>
    </aside>
    {mobileNavOpen && <button className="nav-scrim" aria-label="Close navigation" onClick={() => setMobileNavOpen(false)} />}
    <div className="app-main"><header className="topbar"><div className="topbar-left"><button className="icon-button mobile-menu" aria-label="Open menu" onClick={() => setMobileNavOpen(true)}><Menu size={20} /></button><div className="breadcrumbs"><span>Workspace</span><span className="crumb-slash">/</span><strong>{page}</strong></div></div><div className="topbar-right"><div className="mode-indicator" title="All displayed account values are frontend sample data."><span className="mode-dot" />DEMO MODE</div><div className="connection-pill simulated-connection"><span className="simulated-dot" /> <span>MT5 simulated</span></div><div className="topbar-divider" /><div className="popover-wrap"><button className={`icon-button top-action ${menu === 'notifications' ? 'selected' : ''}`} aria-label="Notifications" onClick={() => setMenu(menu === 'notifications' ? null : 'notifications')}><Bell size={18} /><span className="notification-dot" /></button>{menu === 'notifications' && <div className="popover notification-popover"><strong>You’re all caught up</strong><p>Connection and bot updates will appear here.</p></div>}</div><div className="popover-wrap"><button className="profile-button" onClick={() => setMenu(menu === 'profile' ? null : 'profile')} aria-expanded={menu === 'profile'}><span className="profile-avatar">A</span><span className="profile-name">Account</span><ChevronDown size={14} /></button>{menu === 'profile' && <div className="popover profile-popover"><strong>Personal account</strong><span>Demo workspace · sample data</span><button onClick={() => navigate('Settings')}><Settings size={14} /> Settings</button></div>}</div></div></header>
      <main className="content-area" onClick={() => menu && setMenu(null)}>{page === 'Overview' ? <OverviewDashboard onNavigate={navigate} /> : <WorkspacePage page={page} onNavigate={navigate} />}<footer className="page-footer"><span>© 2026 KasiTrade Automation</span><span><Shield size={13} /> Sample values only</span><button><CircleHelp size={13} /> Help center</button></footer></main>
    </div>
  </div>
}

export default App