export default function fuzzySearch(query: string, text: string, limit: number): boolean {
  // convert query and match to lowercase
  text = text.toLowerCase();
  query = query.toLowerCase();

  // direct Match
  if (text.includes(query)) return true;

  //allow one character off
  let mismatches: number = 0; //mismatch counter
  let i: number = 0,
    j: number = 0; //initializing trackers for current text and query iterations

  //setting loop to span through all text and query characters

  while (i < text.length && j < query.length) {
    // if there's a mismatch
    if (text[i] !== query[j]) {
      mismatches++;

      //nested if to end function is mismatches has grown past a particular number(limit)

      if (mismatches > limit) return false;
      j++; //if the mismatches is still within the rate of limit, skip the current query, assuming it's a mistake and move on to the next
    } else {
      i++, j++;
    } //if there was no error, move over to the next text and query character (iteration)
  }
  return true; //if our guard within the loop couldn't stop our search return true
}


