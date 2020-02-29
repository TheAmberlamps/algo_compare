(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"xorshift":2}],2:[function(require,module,exports){

/**
 * Create a pseudorandom number generator, with a seed.
 * @param {array} seed "128-bit" integer, composed of 4x32-bit
 * integers in big endian order.
 */
function XorShift(seed) {
  // Note the extension, this === module.exports is required because
  // the `constructor` function will be used to generate new instances.
  // In that case `this` will point to the default RNG, and `this` will
  // be an instance of XorShift.
  if (!(this instanceof XorShift) || this === module.exports) {
    return new XorShift(seed);
  }

  if (!Array.isArray(seed) || seed.length !== 4) {
    throw new TypeError('seed must be an array with 4 numbers');
  }

  // uint64_t s = [seed ...]
  this._state0U = seed[0] | 0;
  this._state0L = seed[1] | 0;
  this._state1U = seed[2] | 0;
  this._state1L = seed[3] | 0;
}

/**
 * Returns a 64bit random number as a 2x32bit array
 * @return {array}
 */
XorShift.prototype.randomint = function() {
  // uint64_t s1 = s[0]
  var s1U = this._state0U, s1L = this._state0L;
  // uint64_t s0 = s[1]
  var s0U = this._state1U, s0L = this._state1L;

  // result = s0 + s1
  var sumL = (s0L >>> 0) + (s1L >>> 0);
  resU = (s0U + s1U + (sumL / 2 >>> 31)) >>> 0;
  resL = sumL >>> 0;

  // s[0] = s0
  this._state0U = s0U;
  this._state0L = s0L;

  // - t1 = [0, 0]
  var t1U = 0, t1L = 0;
  // - t2 = [0, 0]
  var t2U = 0, t2L = 0;

  // s1 ^= s1 << 23;
  // :: t1 = s1 << 23
  var a1 = 23;
  var m1 = 0xFFFFFFFF << (32 - a1);
  t1U = (s1U << a1) | ((s1L & m1) >>> (32 - a1));
  t1L = s1L << a1;
  // :: s1 = s1 ^ t1
  s1U = s1U ^ t1U;
  s1L = s1L ^ t1L;

  // t1 = ( s1 ^ s0 ^ ( s1 >> 17 ) ^ ( s0 >> 26 ) )
  // :: t1 = s1 ^ s0
  t1U = s1U ^ s0U;
  t1L = s1L ^ s0L;
  // :: t2 = s1 >> 18
  var a2 = 18;
  var m2 = 0xFFFFFFFF >>> (32 - a2);
  t2U = s1U >>> a2;
  t2L = (s1L >>> a2) | ((s1U & m2) << (32 - a2));
  // :: t1 = t1 ^ t2
  t1U = t1U ^ t2U;
  t1L = t1L ^ t2L;
  // :: t2 = s0 >> 5
  var a3 = 5;
  var m3 = 0xFFFFFFFF >>> (32 - a3);
  t2U = s0U >>> a3;
  t2L = (s0L >>> a3) | ((s0U & m3) << (32 - a3));
  // :: t1 = t1 ^ t2
  t1U = t1U ^ t2U;
  t1L = t1L ^ t2L;

  // s[1] = t1
  this._state1U = t1U;
  this._state1L = t1L;

  // return result
  return [resU, resL];
};

/**
 * Returns a random number normalized [0, 1), just like Math.random()
 * @return {number}
 */
XorShift.prototype.random = function() {
  var t2 = this.randomint();
  // Math.pow(2, -32) = 2.3283064365386963e-10
  // Math.pow(2, -52) = 2.220446049250313e-16
  return t2[0] * 2.3283064365386963e-10 + (t2[1] >>> 12) * 2.220446049250313e-16;
};

// Seed with Math.random() by default to prevent seed collision
function getRandomSeed() {
    return Math.random() * Math.pow(2, 32);
}
module.exports = new XorShift([
  getRandomSeed(),
  getRandomSeed(),
  getRandomSeed(),
  getRandomSeed()
]);

},{}]},{},[1]);
