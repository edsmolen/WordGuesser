'use strict';

let words;

async function loadWords() {
  const response = fetch("https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt");
   if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const body = await response.text();
  const result = new set();
  body.split("\n").forEach(line => set.add(line));
  return result;
}

async function initOnce() {
  words = await loadWords();
  alert("loaded " + words.size() + " words.");
}
