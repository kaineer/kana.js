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
      // Mostly imported from ruby test suite
      {input: "fu",           expected: ["FU"]},
      {input: "sakana",       expected: ["SA", "KA", "NA"]},
      {input: "shojo",        expected: ["SHI", "yo", "JI", "yo"]},
      {input: "shi",          expected: ["SHI"]},
      {input: "aji",          expected: ["A", "JI"]},
      {input: "azi",          expected: ["A", "JI"]},
      {input: "dorobou",      expected: ["DO", "RO", "BO", "U"]},
      {input: "dorobo:",      expected: ["DO", "RO", "BO", "U"]},
      {input: "foruku",       expected: ["FU", "o", "RU", "KU"]},
      {input: "ookii",        expected: ["O", "O", "KI", "I"]},
      {input: "onna",         expected: ["O", "N", "NA"]},
      {input: "chotto",       expected: ["CHI", "yo", "tsu", "TO"]},
      {input: "isshoni",      expected: ["I", "tsu", "SHI", "yo", "NI"]},
      {input: "etchi",        expected: ["E", "tsu", "CHI"]},
      {input: "ecchi",        expected: ["E", "tsu", "CHI"]},
      {input: "kon'ya",       expected: ["KO", "N", "YA"]},
      {input: "nyobou",       expected: ["NI", "yo", "BO", "U"]},
      {input: "enpitsu",      expected: ["E", "N", "PI", "TSU"]},
      {input: "patexi",       expected: ["PA", "TE", "i"]},
      {input: "axtsu",        expected: ["A", "tsu"]}
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
