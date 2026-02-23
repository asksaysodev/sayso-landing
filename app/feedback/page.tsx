'use client';

import { useState, useEffect } from 'react';
import SaysoNavbar from '@/components/landing/SaysoNavbar';
import { Footer } from '@/components/landing/Footer';
import { CannyBoard } from '@/components/CannyBoard';

type TabType = 'feedback' | 'bugs' | 'roadmap';

export default function FeedbackPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState<{ id: string; name: string; email: string; avatarURL?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('feedback');

  // Check if already authenticated via session storage
  useEffect(() => {
    const storedAuth = sessionStorage.getItem('feedback-auth');
    const storedUser = sessionStorage.getItem('feedback-user');

    if (storedAuth === 'true' && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch (e) {
        console.error('Failed to parse stored user:', e);
      }
    }
  }, []);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Send password to API for verification
      const response = await fetch('/api/feedback/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Invalid password. Please try again.');
        setPassword('');
        setIsLoading(false);
        return;
      }

      const data = await response.json();

      // Store authentication in session storage
      sessionStorage.setItem('feedback-auth', 'true');
      sessionStorage.setItem('feedback-user', JSON.stringify(data.user));

      setUser(data.user);
      setIsAuthenticated(true);
      setPassword('');
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Auth error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SaysoNavbar />

      {/* Main Content */}
      <main className="flex-1 pt-8 md:pt-16">
        {!isAuthenticated ? (
          // Password Screen
          <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
            <div className="flex flex-col items-center justify-center min-h-[600px]">
              {/* Header */}
              <div className="mb-12 text-center max-w-md">
                <h1 className="font-comic text-4xl md:text-5xl text-[#1D4871] tracking-wide mb-4">
                  Feature Requests & Feedback
                </h1>
                <p className="text-base md:text-lg text-[#1D4871]/70 leading-relaxed">
                  Share your ideas to help us build the features you need most.
                </p>
              </div>

              {/* Password Form Card */}
              <div className="w-full max-w-sm">
                <div className="bg-white rounded-2xl v2-comic-border v2-comic-shadow p-8">
                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-bold text-[#1D4871] mb-3"
                      >
                        Enter Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setError('');
                        }}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-xl border-2 border-[#D7DEE1] text-[#1D4871] placeholder-[#1D4871]/40 focus:outline-none focus:border-[#2367EE] focus:ring-2 focus:ring-[#2367EE]/20 transition-all"
                        disabled={isLoading}
                      />
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3 mt-4">
                        <p className="text-sm text-red-700 font-medium">{error}</p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading || !password}
                      className="w-full mt-6 px-6 py-3 rounded-full bg-[#2367EE] text-white font-bold text-base v4-hero-glow border-2 border-[#1D4871] hover:bg-[#1e5ad8] disabled:opacity-50 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-[#2367EE] focus:ring-offset-2"
                    >
                      {isLoading ? 'Verifying...' : 'Access Feedback Board'}
                    </button>
                  </form>

                  {/* Hint */}
                  <p className="text-xs text-[#1D4871]/50 text-center mt-6">
                    Password required to access the feedback board
                  </p>
                </div>
              </div>

              {/* Decorative Badge */}
              <div className="mt-12 flex items-center gap-2">
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-[#2367EE]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-[#1D4871]/60">
                  Password protected
                </span>
              </div>
            </div>
          </div>
        ) : (
          // Tabs & Canny Boards
          user ? (
            <div className="w-full h-full flex flex-col">
              {/* Tab Navigation */}
              <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8 w-full flex flex-wrap gap-3">
                {[
                  { id: 'feedback' as TabType, label: 'Feature Requests', icon: '💡' },
                  { id: 'bugs' as TabType, label: 'Report a Bug', icon: '🐛' },
                  { id: 'roadmap' as TabType, label: 'Roadmap', icon: '🗺️' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 rounded-full font-bold text-sm md:text-base transition-all v2-comic-btn border-2 ${
                      activeTab === tab.id
                        ? 'bg-[#2367EE] text-white border-[#1D4871] v4-hero-glow'
                        : 'bg-white text-[#1D4871] border-[#1D4871] hover:bg-[#F4F4F5]'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Board Container - Full Screen */}
              <div className="flex-1 w-full">
                {activeTab === 'feedback' && (
                  <CannyBoard
                    user={user}
                    basePath="/feedback"
                    boardToken={process.env.NEXT_PUBLIC_CANNY_BOARD_TOKEN || ''}
                  />
                )}
                {activeTab === 'bugs' && (
                  <CannyBoard
                    user={user}
                    basePath="/feedback"
                    boardToken={process.env.NEXT_PUBLIC_CANNY_BUGS_TOKEN || ''}
                  />
                )}
                {activeTab === 'roadmap' && (
                  <CannyBoard
                    user={user}
                    basePath="/feedback"
                    boardToken={process.env.NEXT_PUBLIC_CANNY_ROADMAP_TOKEN || ''}
                  />
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-screen">
              <p className="text-[#1D4871]">Loading...</p>
            </div>
          )
        )}
      </main>

      <Footer />
    </div>
  );
}
