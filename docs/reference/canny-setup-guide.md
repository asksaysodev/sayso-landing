# Canny.io Feedback Board Setup Guide

## Overview
Your feedback board has been integrated with a password-protected page at `/feedback`. This setup includes:
- ✅ Password-protected login screen (matches V4 design)
- ✅ Canny board embedded with SSO authentication
- ✅ Reusable CannyBoard component
- ✅ JWT token generation for Canny SSO
- ⏳ Ready to connect to Supabase when available

## Files Created

### Environment Configuration
- **`.env.local`** - Store your Canny credentials here (DO NOT commit to git)

### Libraries
- **`lib/canny.ts`** - JWT token generation with HS256 signing
- **`lib/auth.ts`** - Password verification & mock user data

### Components
- **`components/CannyBoard.tsx`** - Reusable Canny board component

### Routes
- **`app/feedback/page.tsx`** - Main feedback page with password form
- **`app/api/feedback/auth/route.ts`** - API endpoint for password verification

---

## Setup Instructions

### Step 1: Get Your Canny Credentials

1. Go to [Canny.io Dashboard](https://app.canny.io)
2. Click **Settings** → **Security** → **Custom Credentials**
3. You'll see:
   - **App ID** (e.g., `abc123def456...`)
   - **Private Key** (for SSO - labeled as "Security API Key")

### Step 2: Update `.env.local`

Open `c:\sayso\sayso_landing_page\.env.local` and fill in:

```env
# Get these from Canny Dashboard → Settings → Security
NEXT_PUBLIC_CANNY_APP_ID=YOUR_CANNY_APP_ID_HERE
CANNY_PRIVATE_KEY=YOUR_CANNY_SECURITY_API_KEY_HERE

# Password is already set to "Franco"
FEEDBACK_PAGE_PASSWORD=Franco
```

**⚠️ IMPORTANT:** Never commit `.env.local` to git. It's already in `.gitignore` (add if needed).

### Step 3: Configure Canny Board Settings

1. In Canny Dashboard → **Board Settings**
2. Under **Embedded Widget** → **Configure**:
   - Set **Domain** to your site domain (e.g., `sayso.app`)
   - Ensure **SSO** is enabled
   - Optional: Configure email notifications

### Step 4: Test the Feedback Page

1. Start your dev server: `npm run dev`
2. Navigate to `http://localhost:3000/feedback`
3. Enter password: **Franco**
4. You should see the Canny feedback board load

---

## How It Works

### Flow Diagram

```
User visits /feedback
         ↓
Sees password form (styled with V4 design)
         ↓
Submits password → POST /api/feedback/auth
         ↓
Server verifies password
         ↓
Server generates JWT token using CANNY_PRIVATE_KEY
         ↓
Returns ssoToken to client
         ↓
Client stores token in sessionStorage
         ↓
CannyBoard component loads Canny SDK
         ↓
Identifies user using ssoToken
         ↓
Renders feedback board inside /feedback page
```

### Key Features

✅ **Password Protected** - Simple password gate until Supabase is ready
✅ **V4 Branding** - Matches your landing page design system
- Comic borders & shadows
- Primary color: #2367EE (bright blue)
- Typography: Bangers font for headings
- Yellow accents (#FFDE59)

✅ **SSO Enabled** - Users auto-identified without re-entering info
✅ **Session-based** - Password stored in sessionStorage (cleared on browser close)
✅ **Reusable Component** - `<CannyBoard />` can be used anywhere

---

## Component Usage

### Using CannyBoard in Other Pages

```tsx
'use client';

import { CannyBoard } from '@/components/CannyBoard';

export default function MyFeedbackPage() {
  const ssoToken = 'your-jwt-token-here';

  return (
    <div>
      <CannyBoard ssoToken={ssoToken} basePath="/feedback" />
    </div>
  );
}
```

### Customization

You can customize the theme and color in `CannyBoard.tsx`:

```tsx
window.Canny('render', {
  target: '#canny-board',
  basePath: basePath,
  theme: 'auto',  // or 'light', 'dark'
  primaryColor: '#2367EE', // Change to your brand color
});
```

---

## Future: Supabase Integration

When you're ready to connect Supabase:

1. Replace `mockFeedbackUser` in `lib/auth.ts` with real user data from Supabase session
2. Update the password form to Supabase authentication
3. Remove `FEEDBACK_PAGE_PASSWORD` from `.env.local`
4. Use the existing JWT generation code as-is

Example:
```tsx
// In lib/auth.ts (future)
import { createClient } from '@supabase/supabase-js';

export async function getFeedbackUser(session: Session) {
  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    avatarURL: session.user.avatar_url,
  };
}
```

---

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_CANNY_APP_ID` | Yes | From Canny Settings → Security |
| `CANNY_PRIVATE_KEY` | Yes | Security API Key from Canny |
| `FEEDBACK_PAGE_PASSWORD` | Yes | Password to access /feedback page |

---

## Troubleshooting

### "Canny board not loading"
1. Check that `NEXT_PUBLIC_CANNY_APP_ID` is correct in `.env.local`
2. Verify your domain is added in Canny Board Settings
3. Check browser console for errors (F12 → Console)

### "Invalid password" error
1. Verify `.env.local` has correct `FEEDBACK_PAGE_PASSWORD`
2. Make sure you're using the exact password (case-sensitive)
3. Restart dev server after changing `.env.local`

### "SSO token error"
1. Check that `CANNY_PRIVATE_KEY` is correctly set
2. Ensure the private key is the full value (no truncation)
3. Verify it's the "Security API Key" not something else

---

## File Structure

```
sayso_landing_page/
├── .env.local                          ← Your credentials (DO NOT COMMIT)
├── package.json                        ← jsonwebtoken added
│
├── lib/
│   ├── canny.ts                        ← JWT generation
│   └── auth.ts                         ← Password verification
│
├── components/
│   └── CannyBoard.tsx                  ← Reusable board component
│
└── app/
    ├── feedback/
    │   └── page.tsx                    ← Main feedback page
    └── api/
        └── feedback/
            └── auth/
                └── route.ts            ← Password verification API
```

---

## Next Steps

1. ✅ Update `.env.local` with your Canny credentials
2. ✅ Test at `http://localhost:3000/feedback`
3. ⏳ When ready, integrate with Supabase auth
4. ⏳ Add link to feedback board in navbar (optional)

---

Need help? Check the comments in each file for more details!
