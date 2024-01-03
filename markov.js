/** Textual markov chain generator. */

const _ = require('lodash');

class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns object of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains() {
    // make a new object
    const chains = {};

    // need to iterate over an input
    // add current word to object as key
    // add next word as a value in an array or null if end of input

    for (let i = 0; i < this.words.length; i++) {
      const currentWord = this.words[i];
      const nextWord = this.words[i + 1] || null;

      // check if word exists
      if (currentWord in chains) {
        chains[currentWord].push(nextWord);
      } else {
        chains[currentWord] = [nextWord];
      }
    }

    return chains;
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {
    let currentWord = this.words[0] || null;
    const markovStory = [currentWord];

    while (currentWord !== null) {
      let nextWord = _.sample(this.chains[currentWord]);
      markovStory.push(nextWord);
      currentWord = nextWord;
    }

    return markovStory.join(' ').trim();
  }
}

module.exports = {
  MarkovMachine
};