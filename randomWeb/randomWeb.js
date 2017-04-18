/*
Name:     randomWeb.js
Language: javascript
Date:     April 17, 2017

Fixed: add random extension, ie. .com, .org, .net 

*/


function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
 
function odd(num) { return num % 2;} // is number odd 

var vowels     = ["a", "a", "e", "e", "e", "i", "o", "o", "u", "y"];
var consonants = ["c", "d", "f", "h", "l", "m", "n", "r", "s", "t"];
var TLDsuffix =  [".com", ".com", ".net", ".org"];
var randWeb    = "";

function newWord() {
  var x = 0;
  randWeb += "";
  while (x < random(3, 12)) {
     if (odd(x) === 1) {
       randWeb += vowels[random(0, vowels.length-1)];
     } else {
       randWeb += consonants[random(0, vowels.length-1)];
     }
     x ++;
  }
   var y = 0;  // initialize y
   y = (random(0,3));    // random number between 0 and 3 for TLD
  
  //console.log("Random website generator: " + randWeb + TLDsuffix[y]);
    print("Random website generator: " + randWeb + TLDsuffix[y]); // for CLI 
}
newWord();
