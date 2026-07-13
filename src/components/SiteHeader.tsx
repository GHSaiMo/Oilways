import { Menu, X } from 'lucide-react'
import { useState } from 'react'

type SiteHeaderProps = {
  deepRead: boolean
  onDeepReadChange: (value: boolean) => void
}

const navItems = [
  ['一桶油', '#journey'],
  ['霍尔木兹专题', '#hormuz-dossier'],
  ['原油与炼厂', '#crude-refinery'],
  ['市场结构', '#market-mechanics'],
  ['数据长图', '#historical-data'],
  ['历史周期', '#oil-history'],
  ['投资框架', '#investing'],
]

export function SiteHeader({ deepRead, onDeepReadChange }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="油脉首页">
        <span className="brand-mark" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="brand-name">油脉</span>
        <span className="brand-en">OILWAYS</span>
      </a>

      <nav className="desktop-nav" aria-label="主要导航">
        {navItems.map(([label, href]) => (
          <a href={href} key={href}>
            {label}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <div className="mode-switch" aria-label="阅读深度">
          <button
            className={!deepRead ? 'is-active' : ''}
            type="button"
            onClick={() => onDeepReadChange(false)}
          >
            叙事
          </button>
          <button
            className={deepRead ? 'is-active' : ''}
            type="button"
            onClick={() => onDeepReadChange(true)}
          >
            深读
          </button>
        </div>
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? '关闭导航' : '打开导航'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="mobile-nav" aria-label="移动端导航">
          {navItems.map(([label, href]) => (
            <a href={href} key={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
