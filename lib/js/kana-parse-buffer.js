//
//
//
Kana.ParseBuffer = (function() {
  // ctor
  var ParseBuffer = function(source) {
    this.source = source;
    this.syllables = [];
    this.result = undefined;
    return this;
  };

  _.extend(ParseBuffer.prototype, {
    // getters
    getSource: function() { return this.source; },
    getSyllables: function() { return this.syllables; },
    getResultLabel: function() {
      if(_.isUndefined(this.result)) {
        return "unknown";
      } else {
        return (this.result ? "success" : "failure");
      }
    },
    push: function() {
      var array = arguments;
      var buffer = this;

      if(array.length == 1 && _.isArray(array[0])) {
        array = array[0];
      }

      _(array).each(function(elt) {
        buffer.syllables.push(elt);
      });

      return this;
    },
    drop: function(count) {
      this.source = this.source.slice(count);
      return this;
    },
    slice: function(start, length) {
      return this.source.slice(start, start + length);
    }
  });

  return ParseBuffer;
})();
