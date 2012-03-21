//
//
//
describe("Kana", function() {
  var kana;

/*
  beforeEach(function() {
    this.addMatchers({
      toHaveMethod: function(methodName) {
        return typeof(this.actual[methodName]) == "function";
      }
    });
  });

  describe("initialized without parameters", function() {
    beforeEach(function() {
      kana = new Kana();
    });

    it("should respond to stringify", function() {
      // expect(typeof(kana.stringify)).toEqual("function");
      expect(kana).toHaveMethod("stringify");
    });

    it("should respond to htmlize", function() {
      expect(kana).toHaveMethod("htmlize");
    });

    it("should respond to set", function() {
      expect(kana).toHaveMethod("set");
    })
  });

  describe("initialized with romaji", function() {
    beforeEach(function() {
      kana = new Kana({romaji: "sakana"});
    });

    it("should keep romaji", function() {
      expect(kana.romaji).toEqual("sakana");
    });
  });

  describe("set new value after initialization", function() {
    var setValue = "nori";

    beforeEach(function() {
      kana = new Kana();
      kana.set(setValue);
    });

    it("should keep new value", function() {
      expect(kana.romaji).toEqual(setValue);
    });
  });

  describe("standard kana tests", function() {
    var cases = {
      a: "\u3041",
      A: "\u3042",
      I: "\u3044",
      U: "\u3046"
    };

    _(cases).each(function(e, k) {
      it("should translate " + k + " into " + e, function() {
        kana.set(k);
        expect(kana.stringify()).toEqual(e);
      });
    });
  });
*/
});
