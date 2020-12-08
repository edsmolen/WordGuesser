'use strict';

let words;

async function loadWords() {
  const response = await fetch("https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt");
   if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const body = await response.text();
  const result = new Set(body.split("\n").map(line => line.trim().toUpperCase()));
  return result;
}

async function initOnce() {
  words = await loadWords();
  alert("loaded " + words.size + " words.");
}

// Generate all permutations of the given string.
function permutations(available, minLength = 3) {
  const result = new Set();
  function helper(soFar, available) {
    if (soFar.length >= minLength) {
      result.add(soFar);
    }
    Array.from(available).forEach((next, index) => {
      helper(soFar + next, available.substring(0, index) + available.substring(index+1));
    });
  }
  helper("", available);
  return result;
}

function availableChanged(availableInput) {
  const output = document.getElementById("output");
  output.innerText = "";
  const available = availableInput.value.trim().toUpperCase();
  permutations(available).forEach(string => {
    if (words.has(string)) {
      const div = document.createElement("div");
      div.innerText = string;
      output.appendChild(div);
    }
  });
}
