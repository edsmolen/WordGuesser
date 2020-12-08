'use strict';

let words;

async function loadWords() {
  const response = await fetch("https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt");
   if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const body = await response.text();
  const result = new Set(body.split("\n"));
  return result;
}

async function initOnce() {
  words = await loadWords();
  alert("loaded " + words.size + " words.");
}
