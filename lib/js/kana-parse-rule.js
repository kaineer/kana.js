//
//
//
Kana.ParseRule = (function() {
  //
  var ParseRule = function(regexp, options) {
    this.regexp  = regexp;
    this.options = options;

    return this;
  };

  // TODO: cover with tests, then split into more methods
  _.extend(ParseRule.prototype, {
    accepts: function(buffer) {
      this.matches = buffer.getSource().match(this.regexp);
      return this.matches;
    }, // accepts
    handle: function(buffer) {
      var i, syllables;

      if(_.isFunction(this.options.handle)) {
        this.options.handle(buffer);
      } else {
        // push syllables
        if(_.isFunction(this.options.push)) {
          syllables = this.options.push(buffer.getSource());
          if(_.isString(syllables)) {
            buffer.push(syllables);
          } else if(_.isArray(syllables)) {
            _(syllables).each(function(syllable) {
              buffer.push(syllable);
            });
          }
        } else if(_.isString(this.options.push)) {
          buffer.push(this.options.push);
        }

        // drop chars from buffer
        if(_.isNumber(this.options.drop)) {
          buffer.drop(this.options.drop);
        }
      }
    }  // handle
  });

  return ParseRule;
});