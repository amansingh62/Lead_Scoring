// Function to calculate rule-based score for a given lead and offer
// Returns a number between 0 and 50
export const scoreRules = (lead, offer) => {
  let score = 0;

  // ----------------------------
  // 1. Role relevance (max 20 points)
  // ----------------------------
  const role = lead.role?.toLowerCase() || "";   // safely convert role to lowercase for comparison

  // If the role matches decision-maker keywords → +20
  if (/head|vp|ceo|founder|director|manager/.test(role)) score += 20; 

  // If the role matches influencer / senior roles → +10
  else if (/lead|senior|architect|engineer/.test(role)) score += 10;

  // ----------------------------
  // 2. Industry match (max 20 points)
  // ----------------------------
  const industry = lead.industry?.toLowerCase(); // normalize industry
  const icp = offer.ideal_use_cases.map((i) => i.toLowerCase()); // normalize offer's target industries

   // Exact match with ICP → +20
  if (icp.includes(industry)) score += 20;

   // Partial match (industry contains ICP keyword) → +10
  else if (icp.some((i) => industry?.includes(i))) score += 10;

  // ----------------------------
  // 3. Data completeness (max 10 points)
  // ----------------------------
  // If all important fields are filled in → +10
  if (lead.name && lead.role && lead.company && lead.industry && lead.location && lead.linkedin_bio) {
    score += 10;
  }

  // Final rule score (0 - 50)
  return score;
};
