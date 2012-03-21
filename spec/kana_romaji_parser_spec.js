//
describe("Kana.RomajiParser", function() {
  var parser;
  var expected;

  var suffix = "";

  var parse = function(string) {
    var parser = new Kana.RomajiParser(string);
    parser.parse();
    return parser;
  };

  describe("parsing correct romaji", function() {
    var cases = [
      // Mostly imported from ruby test suite
      {input: "fu",           expected: ["FU"],                         comment: "separate rule"},
      {input: "sakana",       expected: ["SA", "KA", "NA"],             comment: "simple case"},
      {input: "shojo",        expected: ["SHI", "yo", "JI", "yo"],      comment: "vowel after shi/ji"},
      {input: "shi",          expected: ["SHI"],                        comment: "separate rule"},
      {input: "aji",          expected: ["A", "JI"]},
      {input: "azi",          expected: ["A", "JI"]},
      {input: "dorobou",      expected: ["DO", "RO", "BO", "U"],        comment: "long vowel as u"},
      {input: "dorobo:",      expected: ["DO", "RO", "BO", "U"],        comment: "long vowel as :"},
      {input: "foruku",       expected: ["FU", "o", "RU", "KU"],        comment: "fu+vowel as in katakana"},
      {input: "ookii",        expected: ["O", "O", "KI", "I"],          comment: "long oo"},
      {input: "onna",         expected: ["O", "N", "NA"],               comment: "double n"},
      {input: "chotto",       expected: ["CHI", "yo", "tsu", "TO"],     comment: "double t"},
      {input: "isshoni",      expected: ["I", "tsu", "SHI", "yo", "NI"], comment: "double S & shi + vowel"},
      {input: "etchi",        expected: ["E", "tsu", "CHI"],            comment: "double t, side A"},
      {input: "ecchi",        expected: ["E", "tsu", "CHI"],            comment: "double t, side B"},
      {input: "kon'ya",       expected: ["KO", "N", "YA"],              comment: "n before vowels needs apostrophee"},
      {input: "nyobou",       expected: ["NI", "yo", "BO", "U"]},
      {input: "enpitsu",      expected: ["E", "N", "PI", "TSU"]},
      {input: "patexi",       expected: ["PA", "TE", "i"],              comment: "little vowel"},
      {input: "axtsu",        expected: ["A", "tsu"],                   comment: "little tsu"}
    ];

    _(cases).each(function(theCase) {
      describe(theCase.input +
          (theCase.comment ? " -- " + theCase.comment : ""), function() {
        beforeEach(function() {
          parser = parse(theCase.input);
          expected = theCase.expected;
        });

        it("should return " + JSON.stringify(theCase.expected), function() {
          expect(parser.getResult()).toEqual(expected);
        });

        it("should empty buffer source", function() {
          expect(parser.buffer.getSource()).toEqual("");
        });

        it("should have 'success' state", function() {
          expect(parser.getState()).toEqual("success");
        });
      });
    });
  });

  describe("parsing partial romaji - \"sak\"", function() {
    beforeEach(function() {
      parser = parse("sak");
    });

    it("should return [\"SA\"]", function() {
      expect(parser.getResult()).toEqual(["SA"]);
    });

    it("should keep K in buffer", function() {
      expect(parser.buffer.getSource()).toEqual("K");
    });

    it("should have 'failure' state", function() {
      expect(parser.getState()).toEqual("failure");
    });
  });
});
