export const CONVERSATION_CYCLES = [
  {
    leadType: 'B' as const,
    leadLabel: 'Buyer',
    location: { zip: '33331', city: 'Miami, FL' },
    marketData: [
      { label: 'Average Days on Market of zip', value: '90' },
      { label: 'Last 90 days price trend', value: 'Up' },
      { label: 'Average Price ft2 of zip', value: '$120' },
      { label: 'Inventory level', value: 'Low' },
    ],
    buyerMessage: "We're thinking about the beach area — great for the schools.",
    sellerMessage: "Got it. Which neighborhoods are you considering?",
    saysoPrompt: "It sounds like that bigger house by the beach could really enhance your family's lifestyle. What would that change bring you that you're missing now?",
    locationChip: 'Location: Near the beach.',
  },
  {
    leadType: 'S' as const,
    leadLabel: 'Seller',
    location: { zip: '90401', city: 'Santa Monica, CA' },
    marketData: [
      { label: 'Average Days on Market of zip', value: '45' },
      { label: 'Last 90 days price trend', value: 'Stable' },
      { label: 'Average Price ft2 of zip', value: '$890' },
      { label: 'Inventory level', value: 'High' },
    ],
    buyerMessage: "I'm not sure if now is the right time to sell...",
    sellerMessage: "What got you thinking about making a move?",
    saysoPrompt: "It is understandable to feel unsure about timing. What got you thinking about moving, and what would that change bring you?",
    locationChip: 'Stage: Considering Listing',
  },
];
