/*
  var rule = new Kana.ParseRule(/regexp/, {
    :handle => function(buffer) { ... },
    :drop   => <char number | function>,
    :push   => <string | function>
  });


*/

describe("Kana.ParseRule", function() {
  //
  var rule;
  var buffer;
  var ruleClass = Kana.ParseRule;
  var bufferClass = Kana.ParseBuffer;
  var tryRule = function(rule, string) {
    var buffer = new bufferClass(string);
    return rule.accepts(buffer);
  };

  //
  describe("#accepts", function() {
    beforeEach(function() {
      rule = new ruleClass(/^A$/);
    });

    it("should accept 'A' string", function() {
      expect(tryRule(rule, "A")).toBeTruthy();
    });

    it("should not accept 'B' string", function() {
      expect(tryRule(rule, "B")).not.toBeTruthy();
    });

    describe("when accepted", function() {
      beforeEach(function() {
        tryRule(rule, "A");
      });

      it("should contain matches array", function() {
        expect(_.isArray(rule.matches)).toBeTruthy();
      });

      it("should contain matches with first element equal to matched fragment", function() {
        expect(rule.matches[0]).toEqual("A");
      });
    });
  });

  //
  describe("#handle", function() {

  });
});
