import { Search, Calendar } from 'lucide-react';
import { CONVERSATIONS } from '../data';
import { ConversationItem } from './ConversationItem';
import type { ConversationTab } from './ConversationTabs';

interface ConversationsProps {
  openId: string | null;
  activeTab: ConversationTab;
  /** Registers each row element so the demo can scroll it into view. */
  setItemRef: (id: string, el: HTMLDivElement | null) => void;
  onToggle: (id: string) => void;
  onTabChange: (tab: ConversationTab) => void;
}

/** The Conversations card: header (search + date) and the collapsible list. */
export function Conversations({ openId, activeTab, setItemRef, onToggle, onTabChange }: ConversationsProps) {
  return (
    <div className="conversations-container">
      <div className="conversations-header">
        <p>Conversations</p>
        <div className="conversations-header-right-content">
          <div className="conv-search">
            <Search size={16} />
            Search conversations...
          </div>
          <div className="conv-date-btn">
            <Calendar size={15} />
            Date
          </div>
        </div>
      </div>

      <div className="conversations-list-container">
        {CONVERSATIONS.map((conv) => (
          <ConversationItem
            key={conv.id}
            ref={(el) => setItemRef(conv.id, el)}
            conversation={conv}
            isOpen={openId === conv.id}
            activeTab={activeTab}
            onToggle={() => onToggle(conv.id)}
            onTabChange={onTabChange}
          />
        ))}
      </div>
    </div>
  );
}
