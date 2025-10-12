// utils/matchFoundItem.js
import PostLost from "../Models/postLostSchema.js";
import { getMatchScore } from "../fuzzyMatch.js";

export async function matchFoundItem(FoundIteam) {
  const lostItems = await PostLost.find({
    lCategory: FoundIteam.fCategory,
    status: "open"
  });

  let bestMatch = null;
  let highestScore = 0;

  for (let lost of lostItems) {
    const score = getMatchScore(lost, FoundIteam);
    if (score > highestScore) {
      highestScore = score;
      bestMatch = lost;
    }
  }

  if (highestScore > 70 && bestMatch) {
    bestMatch.status = "matched";
    FoundIteam.status = "matched";

    await bestMatch.save();
    await FoundIteam.save();

    return { lostItem: bestMatch, FoundIteam, matchScore: highestScore };
  }

  return null; // no strong match
}
