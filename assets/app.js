let deck = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  49,
  50,
  51,
  52
];

const rand_M = document.getElementById("random_math");
const rand_Xor = document.getElementById("random_xorshift");

rand_M.addEventListener("click", () => {
  console.time("Fisher-Yates");
  let amnt = document.getElementById("amount");
  console.log(amnt.value);
  // The Fisher-Yates algorithm
  for (var x = 0; x < amnt.value; x++) {
    for (var i = deck.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
    }
    console.log("Calculation: " + x + ", Deck: " + deck.length);
  }
  console.timeEnd("Fisher-Yates");
});
