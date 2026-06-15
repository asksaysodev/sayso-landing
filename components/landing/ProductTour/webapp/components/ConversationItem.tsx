import { forwardRef } from 'react';
import { Plus, Minus, UserPlus, SquarePen } from 'lucide-react';
import type { DemoConversation } from '../data';
import { SignalsPill } from './SignalsPill';
import {
  ConversationTabs,
  CueTab,
  SmartCaptureTab,
  PulseTab,
  type ConversationTab,
} from './ConversationTabs';

function initials(name: string) {
  return name.split(' ').filter(Boolean).map((n) => n[0]).slice(0, 2).join('').toUpperCase();
}

interface Props {
  conversation: DemoConversation;
  isOpen: boolean;
  activeTab: ConversationTab;
  onToggle?: () => void;
  onTabChange?: (tab: ConversationTab) => void;
}

/** A single conversation row that expands to the Cue / Smart Capture / Pulse tabs. */
export const ConversationItem = forwardRef<HTMLDivElement, Props>(
  ({ conversation, isOpen, activeTab, onToggle, onTabChange }, ref) => {
    const isSeller = conversation.leadType === 'seller';

    return (
      <div ref={ref} className={`conv-item${isOpen ? ' conv-item-open' : ''}`}>
        <div
          className="conv-head"
          role="button"
          tabIndex={0}
          onClick={onToggle}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onToggle?.();
            }
          }}
        >
          <div className="conv-time-col">
            <span className="conv-date">{conversation.date}</span>
            <span className="conv-time">{conversation.time}</span>
          </div>

          <div className="conv-main">
            <div className="conv-summary">{conversation.summary}</div>
            <div className="conv-meta">
              {conversation.leadType && (
                <span
                  className="conv-lead-chip"
                  style={{
                    color: isSeller ? '#b4530a' : 'var(--sayso-indigo)',
                    background: isSeller ? '#fdf1e7' : '#F2F5FF',
                  }}
                >
                  {isSeller ? 'Seller' : 'Buyer'}
                </span>
              )}
              <span className="conv-meta-sep" />
              {conversation.leadName ? (
                <span className="conv-client-btn">
                  <span className="conv-avatar">{initials(conversation.leadName)}</span>
                  {conversation.leadName}
                  <SquarePen size={11} />
                </span>
              ) : (
                <span className="conv-add-lead">
                  <UserPlus size={13} />
                  Add lead
                </span>
              )}
            </div>
          </div>

          <div className="conv-meter-wrapper">
            <SignalsPill conversation={conversation} />
          </div>

          <span className="conv-toggle">{isOpen ? <Minus size={17} /> : <Plus size={17} />}</span>
        </div>

        {isOpen && (
          <div className="conv-body">
            <ConversationTabs value={activeTab} onChange={onTabChange} />
            <div className="conv-tabbody">
              {activeTab === 'Cue' && <CueTab insights={conversation.insights} />}
              {activeTab === 'Smart Capture' && <SmartCaptureTab conversation={conversation} />}
              {activeTab === 'Pulse' && <PulseTab conversation={conversation} />}
            </div>
          </div>
        )}
      </div>
    );
  },
);

ConversationItem.displayName = 'ConversationItem';
