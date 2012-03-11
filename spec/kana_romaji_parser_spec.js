//
describe("Kana.RomajiParser", function() {
  var parser;
  var expected;

  var parse = function(string) {
    var parser = new Kana.RomajiParser(string);
    parser.parse();
    return parser;
  };

  describe("parsing correct romaji", function() {
    var cases = [
      // Single simple syllable
      {input: "sa", expected: ["SA"]},
      {input: "ki", expected: ["KI"]},
      {input: "go", expected: ["GO"]},

      // Vowel syllable
      {input: "a",  expected: ["A"]},

      // x* - lower case syllables
      {input: "xa", expected: ["a"]},
      {input: "xtsu", expected: ["tsu"]},

      {input: ":",     expected: ["U"]},
      {input: "n'",    expected: ["N"]},

      // Multiply syllables
      {input: "sakana", expected: ["SA", "KA", "NA"]},
      {input: "mikan",  expected: ["MI", "KA", "N"]},

      // NYA
      {input: "nya",    expected: ["NI", "ya"]}
    ];

    _(cases).each(function(theCase) {
      describe(theCase.input.toUpperCase(), function() {
        beforeEach(function() {
          parser = parse(theCase.input);
          expected = theCase.expected;
        });

        it("should return " + JSON.stringify(theCase.expected), function() {
          expect(parser.getResult()).toEqual(expected);
        });

        it("should empty buffer source", function() {
          expect(parser.buffer.getSource()).toEqual("");
        })
      });
    });
  });
});
