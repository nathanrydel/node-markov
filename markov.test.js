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
    // the hat        VALID
    // the cat the    INVALID  there's no 'cat the' bigram

    expect(machine.chains).toEqual({
      the: ['cat', 'hat'],
      cat: ['in'],
      in: ['the'],
      hat: [null]
    });
  });

  test("getText test with deterministic input/output", function () {
    let machine = new MarkovMachine("The cat is in the hat.");
    expect(machine.getText()).toEqual("The cat is in the hat.");
  });


  test("getText test with random output", function () {
    let machine = new MarkovMachine("the cat in the hat");
    expect(machine.getText()).not.toContain("the cat the");
  });


  test("getText test with empty string input", function () {
    let machine = new MarkovMachine("");
    expect(machine.getText()).toEqual("");
  });




});