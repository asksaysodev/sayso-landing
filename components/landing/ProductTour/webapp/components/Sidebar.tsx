import Image from 'next/image';
import { Users, Store, Shield, Settings, CreditCard, Download, CircleHelp, Zap } from 'lucide-react';

/** Reproduction of the Sayso web app sidebar. Static; Dashboard is the active item. */
const NAV = [
  { label: 'Dashboard', icon: Users, active: true },
  { label: 'Marketplace', icon: Store },
  { label: 'Admin', icon: Shield },
  { label: 'Settings', icon: Settings },
  { label: 'Subscription', icon: CreditCard },
];

export function Sidebar() {
  return (
    <div className="wa-sidebar">
      <div>
        <Image className="wa-logo" src="/logos/logo-pos-horizontal.png" alt="Sayso" width={90} height={26} />
        <nav className="wa-nav">
          {NAV.map(({ label, icon: Icon, active }) => (
            <div key={label} className="wa-nav-item" data-active={!!active}>
              <Icon size={18} />
              <span>{label}</span>
            </div>
          ))}
        </nav>
      </div>

      <div>
        <div className="wa-launch">
          <Zap size={16} className="mr-2 fill-current" />
          Launch Coach
        </div>
        <div className="wa-download">
          <Download size={15} />
          Download for Mac
        </div>
        <div className="wa-divider" />
        <div className="wa-account">
          <div className="wa-account-icon">AM</div>
          <div>
            <div className="wa-account-name">Alex Morgan</div>
            <div className="wa-account-email">alex.morgan@example.com</div>
          </div>
        </div>
        <div className="wa-divider" />
        <div className="wa-help">
          <CircleHelp size={18} />
          Help Center
        </div>
      </div>
    </div>
  );
}
