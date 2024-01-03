const { MarkovMachine } = require("./markov");

describe("Markov Machine Tests", function () {
  test("getChains test", function () {
    let machine = new MarkovMachine("The cat is in the hat.");

    expect(machine.chains).toEqual(
      {
        The: ["cat"],
        cat: ["is"],
        is: ["in"],
        in: ["the"],
        the: ["hat."],
        "hat.": [null]
      }
    );
  });

  test("getChains test with duplicate words", function () {
    let machine = new MarkovMachine("the cat in the hat");

    expect(machine.chains).toEqual({
      the: ['cat', 'hat'],
      cat: ['in'],
      in: ['the'],
      hat: [null]
    });
  })
    ;

  // test("getText test", function () {

  // });
});