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
    console.log("Starting time: " + time);
    console.time("Math.random");
    for (var x = 0; x < amnt.value; x++) {
      for (var i = deck.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
      }
    }
    var duration = console.timeEnd("Math.random");
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
      console.log("Ending time: " + newTime);
      start.innerHTML = "Starting time: " + time;
      dur.innerHTML = "Duration: " + duration;
      end.innerHTML = "Ending time: " + newTime;
    } else {
      console.log("Error occurred!");
    }
  }
});

rand_Xor.addEventListener("click", () => {
  let amnt = document.getElementById("amount");
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
    console.log("Starting time: " + time);
    console.time("Xorshift");
    // The Xorshift algorithm
    for (var x = 0; x < amnt.value; x++) {
      for (var i = deck.length - 1; i > 0; i--) {
        var j = Math.floor(xorshift.random() * (i + 1));
        var temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
      }
    }
    console.timeEnd("Xorshift");
    if (deck.length === 52) {
      now = new Date();
      time =
        now.getHours() +
        ":" +
        now.getMinutes() +
        ":" +
        now.getSeconds() +
        ":" +
        now.getMilliseconds();
      console.log("Ending time: " + time);
    } else {
      console.log("Error occurred!");
    }
  }
});
