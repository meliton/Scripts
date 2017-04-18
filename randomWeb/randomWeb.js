/*
Name:     randomWeb.js
Language: javascript
Date:     April 12, 2017

todo: add random extension, ie. .com, .org, 

*/


function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
 
function odd(num) { return num % 2;} // is number odd 

var vowels     = ["a", "a", "e", "e", "e", "i", "o", "o", "u", "y"];
var consonants = ["c", "d", "f", "h", "l", "m", "n", "r", "s", "t"];
var randWeb    = "";

function newWord() {
  var x = 0;
  var str1 = ".com";
  randWeb += "";
  while (x < random(3, 12)) {
     if (odd(x) == 1) {
       randWeb += vowels[random(0, vowels.length-1)];
     } else {
       randWeb += consonants[random(0, vowels.length-1)];
     }
     x ++;
  }
  print("Random website generator: " + randWeb + ".com");
//  print(randWeb + ".com");
}
newWord();
