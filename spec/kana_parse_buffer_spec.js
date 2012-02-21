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

  describe("slice result", function() {
    beforeEach(function() {
      source = "abcdefghi";
      buffer = new bufferClass(source);
      returnValue = buffer.slice(3, 3);
    });

    it("should return source slice", function() {
      expect(returnValue).toEqual("def");
    });

    it("should not change buffer source", function() {
      expect(buffer.getSource()).toEqual(source);
    });
  });

  describe("combine calls", function() {
    beforeEach(function() {
      source = "SAKANA";
      buffer = new bufferClass(source);
      (function(buffer) {
        buffer.push(buffer.slice(0, 2)).drop(2);
      })(buffer);
    });

    it("should push a syllable", function() {
      expect(buffer.getSyllables()).toEqual(["SA"]);
    });

    it("should drop first characters", function() {
      expect(buffer.getSource()).toEqual("KANA");
    })
  });
});
