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

      it("first matches element should be equal to matched fragment", function() {
        expect(rule.matches[0]).toEqual("A");
      });
    });
  });

  //
  describe("#handle", function() {
    //
    // Simple rule just with regexp
    //
    describe("/^BA/", function() {
      beforeEach(function() {
        rule = new ruleClass(/^BA/);
        buffer = new bufferClass("BAXXX");
        rule.accepts(buffer);

        spyOn(buffer, "push");
        spyOn(buffer, "drop");

        rule.handle(buffer);
      });

      it("should push BA to buffer", function() {
        expect(buffer.push).toHaveBeenCalledWith("BA");
      });

      it("should drop 2 characters from source", function() {
        expect(buffer.drop).toHaveBeenCalledWith(2);
      });
    });

    describe("/^(B)BA/", function() {
      beforeEach(function() {
        rule = new ruleClass(/^(B)BA/);
        buffer = new bufferClass("BBAXXX");
        rule.accepts(buffer);

        spyOn(buffer, "push");
        spyOn(buffer, "drop");

        rule.handle(buffer);
      });

      it("should push B to buffer", function() {
        expect(buffer.push).toHaveBeenCalledWith("B");
      });

      it("should drop 1 character from buffer", function() {
        expect(buffer.drop).toHaveBeenCalledWith(1);
      });
    });

    describe("/^A/, :push => 'CD'", function() {
      beforeEach(function() {
        rule = new ruleClass(/^A/, {"push": "CD"});
        buffer = new bufferClass("ABEF");
        rule.accepts(buffer);

        spyOn(buffer, "push");
        spyOn(buffer, "drop");

        rule.handle(buffer);
      });

      it("should push CD to buffer", function() {
        expect(buffer.push).toHaveBeenCalledWith("CD");
      });

      it("should drop 1 character from buffer", function() {
        expect(buffer.drop).toHaveBeenCalledWith(1);
      });
    });

    describe("/^([AB])x([CD])/, :push => function() { ... }", function() {
      beforeEach(function() {
        rule = new ruleClass(/^([AB])x([CD])/, {"push": function(matches) {
          return matches[1] + matches[2];
        }});
        buffer = new bufferClass("AxDFOOBAR");
        rule.accepts(buffer);

        spyOn(buffer, "push");
        spyOn(buffer, "drop");

        rule.handle(buffer);
      });

      it("should push AD to buffer", function() {
        expect(buffer.push).toHaveBeenCalledWith("AD");
      });

      it("should drop 3 characters from buffer", function() {
        expect(buffer.drop).toHaveBeenCalledWith(3);
      });
    });
  });
});
