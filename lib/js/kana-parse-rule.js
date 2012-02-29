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

  var calculateGroupNo = function(rule) {
    if(rule.options && (rule.options.drop || rule.options.push)) {
      return 0;
    } else {
      return rule.matches.length > 1 ? 1 : 0;
    }
  };

  var calculatePush = function(rule) {
    if(rule.options && rule.options.push) {
      // return rule.options.push;
      if(_.isFunction(rule.options.push)) {
        return rule.options.push(rule.matches);
      } else {
        return rule.options.push;
      }
    } else {
      return rule.matches[rule.groupNo];
    }
  };

  var calculateDrop = function(rule) {
    if(rule.matches && (!rule.options || !rule.options.drop)) {
      return rule.matches[rule.groupNo].length;
    } else {
      return 0;
    }
  };

  // TODO: cover with tests, then split into more methods
  _.extend(ParseRule.prototype, {
    accepts: function(buffer) {
      this.matches = buffer.getSource().match(this.regexp);
      if(this.matches) {
        this.groupNo = calculateGroupNo(this);
      }
      return this.matches;
    }, // accepts
    handle: function(buffer) {
//      var i, syllables;
      buffer.push(calculatePush(this));
      buffer.drop(calculateDrop(this));


/*
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
*/
    } // handle
  });

  return ParseRule;
})();
