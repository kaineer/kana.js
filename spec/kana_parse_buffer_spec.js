//
//
//
describe("Kana.ParseBuffer", function() {
  var source;
  var buffer;
  var bufferClass = Kana.ParseBuffer;

  describe("just initialized", function() {
    beforeEach(function() {
      source = "source string";
      buffer = new bufferClass(source);
    });

    it("should contain source just put", function() {
      expect(buffer.getSource()).toEqual(source);
    });

    it("should contain empty syllables array", function() {
      expect(buffer.getSyllables()).toEqual([]);
    });

    it("should not know about parsing result", function() {
      expect(buffer.getResultLabel()).toEqual("unknown");
    })
  });
});
