import stringSimilarity from "string-similarity";

export function getMatchScore(lost, found) {
  let score = 0;

  const nameScore = stringSimilarity.compareTwoStrings(
    lost.lItemName.toLowerCase(),
    found.fItemName.toLowerCase()
  );
  score += nameScore * 40;

  const descScore = stringSimilarity.compareTwoStrings(
    lost.lDescription.toLowerCase(),
    found.fDescription.toLowerCase()
  );
  score += descScore * 40;

  const hintScore = stringSimilarity.compareTwoStrings(
    lost.lverificationHint.toLowerCase(),
    found.fverificationHint.toLowerCase()
  );
  score += hintScore * 10;

  const locScore = stringSimilarity.compareTwoStrings(
    lost.lLocation.toLowerCase(),
    found.fLocation.toLowerCase()
  );
  score += locScore * 10;

  console.log("Scores => Name:", nameScore, "Desc:", descScore, "Hint:", hintScore, "Loc:", locScore, "Total:", score);

  return score;
}
