//
//
//
describe("Kana.ParseBuffer", function() {
  var source;
  var buffer;
  var bufferClass = Kana.ParseBuffer;
  var returnValue;

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

  describe("with syllables pushed", function() {
    beforeEach(function() {
      source = "";
      buffer = new bufferClass(source);
      returnValue = buffer.push("NA", "ZE");
    });

    it("should contain array with pushed syllables", function() {
      expect(buffer.getSyllables()).toEqual(["NA", "ZE"]);
    });

    it("should chain push method", function() {
      expect(returnValue).toEqual(buffer);
    });
  });

  describe("with characters dropped", function() {
    beforeEach(function() {
      source = "xxxaaa";
      buffer = new bufferClass(source);
      returnValue = buffer.drop(3);
    });

    it("should drop all three x-es", function() {
      expect(buffer.getSource()).toEqual("aaa");
    });

    it("should chain drop method", function() {
      expect(returnValue).toEqual(buffer);
    })
  });
});
