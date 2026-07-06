export type MarketOverlay = {
  /** Property-type pills shown above the facts, with one selected. */
  propertyTypes: string[];
  selectedType: string;
  /** Two-column market facts (rendered as bullets). */
  facts: { label: string; value: string }[];
  /** L90D price trend direction, rendered with an arrow. */
  trend: 'up' | 'down';
};

export const CONVERSATION_CYCLES = [
  {
    leadType: 'B' as const,
    leadLabel: 'Buyer',
    location: { zip: '33131', city: 'Miami, FL' },
    // Legacy market list used by the 'glass' widget variant (product showcase).
    marketData: [
      { label: 'Average Days on Market of zip', value: '58' },
      { label: 'Last 90 days price trend', value: 'Up' },
      { label: 'Average Price ft2 of zip', value: '$682' },
      { label: 'Inventory level', value: 'Balanced' },
    ],
    // Richer overlay used by the 'app' widget variant (hero), modeled on the
    // real Sayso market panel.
    marketOverlay: {
      propertyTypes: ['Single Family', 'Multi-Family', 'Condo'],
      selectedType: 'Condo',
      facts: [
        { label: 'Median Price', value: '$640,000' },
        { label: 'Median Price / Sq Ft', value: '$682' },
        { label: 'Median Days on Market', value: '58' },
        { label: 'New Listings', value: '24' },
        { label: 'Market', value: 'Balanced' },
      ],
      trend: 'up',
    } satisfies MarketOverlay,
    buyerMessage: "We love downtown Brickell, walkable and right on the bay.",
    sellerMessage: "Brickell is a great pick. What draws you there?",
    saysoPrompt:
      "It sounds like a condo in downtown Brickell would put you right by the water and the restaurants you mentioned. What would living there change for you day to day?",
    locationChip: 'Looking in downtown Brickell, Miami',
  },
  {
    leadType: 'S' as const,
    leadLabel: 'Seller',
    location: { zip: '90401', city: 'Santa Monica, CA' },
    marketData: [
      { label: 'Average Days on Market of zip', value: '41' },
      { label: 'Last 90 days price trend', value: 'Up' },
      { label: 'Average Price ft2 of zip', value: '$1,180' },
      { label: 'Inventory level', value: 'Low' },
    ],
    marketOverlay: {
      propertyTypes: ['Single Family', 'Multi-Family', 'Condo'],
      selectedType: 'Single Family',
      facts: [
        { label: 'Median Price', value: '$1,750,000' },
        { label: 'Median Price / Sq Ft', value: '$1,180' },
        { label: 'Median Days on Market', value: '41' },
        { label: 'New Listings', value: '14' },
        { label: 'Market', value: "Seller's" },
      ],
      trend: 'up',
    } satisfies MarketOverlay,
    buyerMessage: "Our place is two blocks from the Third Street Promenade.",
    sellerMessage: "That location is in demand. What's prompting the move?",
    saysoPrompt:
      "Selling near the Third Street Promenade puts you in one of Santa Monica's strongest pockets. What's making you think about moving now, and what would the next place need to have?",
    locationChip: 'Listing near the Third Street Promenade, Santa Monica',
  },
];
