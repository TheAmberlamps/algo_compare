var xorshift = require("xorshift");

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
  let amnt = document.getElementById("amount");
  let tit = document.getElementById("rando_title");
  let num = document.getElementById("rando_num");
  let start = document.getElementById("rando_start");
  let dur = document.getElementById("rando_dur");
  let end = document.getElementById("rando_end");
  var now = new Date();
  var time =
    now.getHours() +
    ":" +
    now.getMinutes() +
    ":" +
    now.getSeconds() +
    ":" +
    now.getMilliseconds();
  if (amnt.value < 1) {
    alert("Please enter a value between 1 and 10,000.");
  } else if (amnt.value > 10000) {
    alert("Please enter a value between 1 and 10,000.");
  } else {
    var t1 = performance.now();
    for (var x = 0; x < amnt.value; x++) {
      for (var i = deck.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
      }
    }
    var t2 = performance.now();
    if (deck.length === 52) {
      now = new Date();
      newTime =
        now.getHours() +
        ":" +
        now.getMinutes() +
        ":" +
        now.getSeconds() +
        ":" +
        now.getMilliseconds();
      tit.innerHTML = "<p>Math.random shuffle:</p>";
      num.innerHTML = "<p>Number of shuffles: " + amnt.value + "</p>";
      start.innerHTML = "<p>Starting time: " + time + "</p>";
      dur.innerHTML = "<p>Duration: " + (t2 - t1) + "ms</p>";
      end.innerHTML = "<p>Ending time: " + newTime + "</p>";
    } else {
      alert("Error occurred!");
    }
  }
});

rand_Xor.addEventListener("click", () => {
  let amnt = document.getElementById("amount");
  let tit = document.getElementById("xor_title");
  let num = document.getElementById("xor_num");
  let start = document.getElementById("xor_start");
  let dur = document.getElementById("xor_dur");
  let end = document.getElementById("xor_end");
  var now = new Date();
  var time =
    now.getHours() +
    ":" +
    now.getMinutes() +
    ":" +
    now.getSeconds() +
    ":" +
    now.getMilliseconds();
  if (amnt.value < 1) {
    alert("Please enter a value between 1 and 10,000.");
  } else if (amnt.value > 10000) {
    alert("Please enter a value between 1 and 10,000.");
  } else {
    var t1 = performance.now();
    // The Xorshift algorithm
    for (var x = 0; x < amnt.value; x++) {
      for (var i = deck.length - 1; i > 0; i--) {
        var j = Math.floor(xorshift.random() * (i + 1));
        var temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
      }
    }
    var t2 = performance.now();
    if (deck.length === 52) {
      now = new Date();
      newTime =
        now.getHours() +
        ":" +
        now.getMinutes() +
        ":" +
        now.getSeconds() +
        ":" +
        now.getMilliseconds();
      tit.innerHTML = "<p>Xorshift shuffle:</p>";
      num.innerHTML = "<p>Number of shuffles: " + amnt.value + "</p>";
      start.innerHTML = "<p>Starting time: " + time + "</p>";
      dur.innerHTML = "<p>Duration: " + (t2 - t1) + "ms</p>";
      end.innerHTML = "<p>Ending time: " + newTime + "</p>";
    } else {
      alert("Error occurred!");
    }
  }
});
