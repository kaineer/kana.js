//
//
//
describe("Kana", function() {
  var kana;

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

  describe("translate fully entered kana", function() {
    var setValue = "sakana";

    beforeEach(function() {
      kana = new Kana();
      kana.set(setValue);
    });

    it("should return \u3055\u304b\u306a", function() {
      expect(kana.stringify()).toEqual("\u3055\u304b\u306a");
    });

    it("should return <span>\u3055\u304b\u306a</span>", function() {
      expect(kana.htmlize()).toEqual("<span>\u3055\u304b\u306a</span>");
    })
  });

  describe("translate partially entered kana", function() {
    var setValue = "sak";

    beforeEach(function() {
      kana = new Kana();
      kana.set(setValue);
    });

    it("should return \u3055k", function() {
      expect(kana.stringify()).toEqual("\u3055k");
    });

    it("should return <span>\u3055<u>k</u></span>", function() {
      expect(kana.htmlize()).toEqual("<span>\u3055<u>k</u></span>");
    })
  });
});
