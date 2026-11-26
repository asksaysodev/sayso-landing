'use client';

import { useEffect } from 'react';

interface CannyUser {
  id: string;
  name: string;
  email: string;
  avatarURL?: string;
}

interface CannyBoardProps {
  user: CannyUser;
  basePath?: string;
  boardToken: string;
}

/**
 * Reusable Canny Feedback Board Component
 * Handles SDK loading and board rendering with user identification
 *
 * Usage:
 * <CannyBoard
 *   user={{ id: 'user-1', name: 'Franco', email: 'franco@sayso.app' }}
 *   basePath="/feedback"
 *   boardToken="your-board-token-here"
 * />
 */
export function CannyBoard({ user, basePath = '/feedback', boardToken }: CannyBoardProps) {
  useEffect(() => {
    let renderTimer: number | undefined;

    // Dynamically load the Canny SDK script
    const script = document.createElement('script');
    script.src = 'https://sdk.canny.io/sdk.js';
    script.async = true;

    script.onload = () => {
      // Initialize Canny with the window object
      if (window && typeof window.Canny !== 'undefined') {
        // Identify user
        window.Canny('identify', {
          appID: process.env.NEXT_PUBLIC_CANNY_APP_ID,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            ...(user.avatarURL && { avatar: user.avatarURL }),
          },
        });

        // Wait a moment for identification to complete, then render
        renderTimer = window.setTimeout(() => {
          // Clear the loading message container before rendering
          const cannyDiv = document.querySelector('[data-canny]');
          if (cannyDiv) {
            cannyDiv.innerHTML = '';
          }
          window.Canny('render', {
            boardToken: boardToken,
            basePath: basePath,
            theme: 'auto',
            primaryColor: '#2367EE', // Sayso brand blue
          });
        }, 100);
      } else {
        console.error('Canny SDK not available');
      }
    };

    script.onerror = () => {
      console.error('Failed to load Canny SDK');
    };

    document.body.appendChild(script);

    return () => {
      window.clearTimeout(renderTimer);
      // Cleanup: remove the script if component unmounts
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [user, basePath, boardToken]);

  return (
    <div
      data-canny
      className="w-full h-full flex items-center justify-center"
      style={{ minHeight: '600px' }}
    >
      <div className="text-[#1D4871] text-lg">Loading feedback board...</div>
    </div>
  );
}

// Extend Window interface to include Canny types
declare global {
  interface Window {
    Canny: (action: string, options?: Record<string, any>) => void;
  }
}
