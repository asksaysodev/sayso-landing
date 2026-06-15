/**
 * Fake data for the Web App demo. Mirrors the real Sayso dashboard
 * (Coach Tips, Time Remaining, Activity, Conversations) with invented,
 * on-brand content consistent with the dialer tour's scenarios.
 */

export type LeadType = 'buyer' | 'seller' | null;
export type InsightRating = 'up' | 'down' | null;

export interface DemoInsight {
  time: string;
  message: string;
  rating?: InsightRating;
}

/** topic matches an LPMAMA key: location | price | motivation | agent | mortgage | appointment */
export interface DemoCapture {
  topic: string;
  content: string;
}

export interface DemoPulse {
  city: string;
  state: string;
  zip: string;
  daysOnMarket: string;
  pricePerSqft: string;
  trendLabel: string;
  trendDir: 'up' | 'down' | null;
  market: string;
}

export interface DemoConversation {
  id: string;
  date: string;
  time: string;
  summary: string;
  leadType: LeadType;
  leadName?: string;
  appointmentBooked?: boolean;
  insights: DemoInsight[];
  captures: DemoCapture[];
  pulse?: DemoPulse;
}

export const LPMAMA_CONFIG = [
  { key: 'location', letter: 'L', label: 'Location', color: '#4F508E' },
  { key: 'price', letter: 'P', label: 'Price', color: '#754F8E' },
  { key: 'motivation', letter: 'M', label: 'Motivation', color: '#8E764F' },
  { key: 'agent', letter: 'A', label: 'Agent', color: '#4F7E8E' },
  { key: 'mortgage', letter: 'M', label: 'Mortgage', color: '#4F8E50' },
  { key: 'appointment', letter: 'A', label: 'Appointment', color: '#8B8E4F' },
];

export const CAPTURE_DISPLAY_ORDER = ['location', 'price', 'motivation', 'agent', 'mortgage', 'appointment'];

export const COACH_TIPS = [
  {
    title: 'Appointment Control',
    body: [
      'You are not asking for appointments consistently enough across calls. The average appointment is booked after the 4th or 5th unique ask.',
      'This limits your chances of converting interested prospects into scheduled meetings.',
      'Be sure to ask for the appointment at least four times throughout the call.',
    ],
  },
  {
    title: 'Depth of Motivation',
    body: [
      'You are not digging deep into the emotional motivations of your prospects.',
      'Without understanding their true motivations, you are missing opportunities to connect on a deeper level.',
      'Ask questions that explore why they are looking to move and what their ideal situation entails.',
    ],
  },
];

/** Weekly activity bars (minutes per weekday). */
export const WEEKLY_ACTIVITY = [
  { day: 'M', value: 0 },
  { day: 'T', value: 4 },
  { day: 'W', value: 14 },
  { day: 'T', value: 13 },
  { day: 'F', value: 6 },
  { day: 'S', value: 0 },
  { day: 'S', value: 0 },
];

export const CONVERSATIONS: DemoConversation[] = [
  {
    id: 'c1',
    date: 'Wed, Jun 10',
    time: '8:35 PM',
    summary:
      'San Pedro, moving in 3-4 months, downsizing for smaller mortgage, looking for ocean view condo/townhome, RPV is pricey.',
    leadType: 'buyer',
    leadName: 'Taylor Brooks',
    insights: [
      { time: '8:35 PM', message: 'I get it, just browsing can feel overwhelming at times. What would make this feel more relevant or helpful for you right now?' },
      { time: '8:36 PM', message: 'That makes sense! What would a smaller house provide for you that you currently feel you are missing?' },
      { time: '8:36 PM', message: 'Smaller mortgage payments sound great! Beyond that, what kind of lifestyle changes are you hoping for with a new home?', rating: 'up' },
      { time: '8:37 PM', message: 'Living near the water sounds lovely! When are you hoping to make this happen?', rating: 'down' },
      { time: '8:37 PM', message: 'I understand RPV can be pricey. What essential features are you looking for in your new home near the coast?' },
      { time: '8:38 PM', message: 'I see you are open to options like townhomes or condos! What would need to happen for the timing to make sense for you?' },
      { time: '8:38 PM', message: 'Given your interest in a smaller place with ocean views, how about we schedule a quick call to explore options? Does later today or tomorrow work for you?' },
    ],
    captures: [
      { topic: 'location', content: 'San Pedro, RPV, Long Beach, near the water, near the coast, Ocean View' },
      { topic: 'price', content: 'RPV seems a little more pricey' },
      { topic: 'motivation', content: 'Like to move in the next three months or four months.' },
      { topic: 'agent', content: 'I am not working with anyone yet' },
      { topic: 'mortgage', content: 'Smaller mortgage payments, not having to pay as much' },
      { topic: 'appointment', content: 'Next steps in about three months or four months.' },
    ],
    pulse: {
      city: 'San Pedro',
      state: 'CA',
      zip: '90731',
      daysOnMarket: '38 days',
      pricePerSqft: '$642',
      trendLabel: 'Up',
      trendDir: 'up',
      market: 'Low inventory',
    },
  },
  {
    id: 'c2',
    date: 'Wed, Jun 10',
    time: '8:24 PM',
    summary:
      'Gary, San Pedro, needs more space for kids, looking for 3 bedrooms, 2 baths, decent yard for dogs, concerned about affordability.',
    leadType: 'buyer',
    leadName: 'Gary Mitchell',
    appointmentBooked: true,
    insights: [
      { time: '8:24 PM', message: 'More space for the kids makes total sense. What would the ideal layout look like for your family?' },
      { time: '8:25 PM', message: 'A yard for the dogs is a great priority. How important is that compared to the number of bedrooms?' },
      { time: '8:26 PM', message: 'Affordability is a fair concern. Would it help if I pulled a few options that fit your budget before we meet?', rating: 'up' },
    ],
    captures: [
      { topic: 'location', content: 'San Pedro' },
      { topic: 'price', content: 'Concerned about affordability' },
      { topic: 'motivation', content: 'Needs more space for the kids and dogs' },
      { topic: 'agent', content: 'Not working with another agent' },
      { topic: 'mortgage', content: 'Wants to stay within budget' },
      { topic: 'appointment', content: 'Booked a sit-down for Thursday at 5pm' },
    ],
    pulse: {
      city: 'San Pedro',
      state: 'CA',
      zip: '90731',
      daysOnMarket: '41 days',
      pricePerSqft: '$598',
      trendLabel: '+2%',
      trendDir: 'up',
      market: 'Balanced',
    },
  },
  {
    id: 'c3',
    date: 'Wed, Jun 10',
    time: '8:23 PM',
    summary: "Long Beach, buyer's market, high inventory, no specific property details or concerns discussed.",
    leadType: 'buyer',
    insights: [
      { time: '8:23 PM', message: 'Sounds like you are early in the search. What first got you thinking about making a move?' },
    ],
    captures: [{ topic: 'location', content: 'Long Beach' }],
    pulse: {
      city: 'Long Beach',
      state: 'CA',
      zip: '90802',
      daysOnMarket: '52 days',
      pricePerSqft: '$571',
      trendLabel: 'Down',
      trendDir: 'down',
      market: 'High inventory',
    },
  },
  {
    id: 'c4',
    date: 'Fri, Jun 5',
    time: '8:51 PM',
    summary:
      'Linda, Long Beach, finding a long-term spot near work, looking for two bedrooms with character, flexible timeline.',
    leadType: 'buyer',
    leadName: 'Linda Reyes',
    insights: [
      { time: '8:51 PM', message: 'Character homes have so much charm. What style speaks to you most?' },
      { time: '8:52 PM', message: 'Being close to work is a smart priority. How long a commute feels right to you?' },
    ],
    captures: [
      { topic: 'location', content: 'Long Beach, near work' },
      { topic: 'motivation', content: 'Wants a long-term spot with character' },
      { topic: 'appointment', content: 'Flexible timeline, open to meeting' },
    ],
  },
];
