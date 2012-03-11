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
    } else if(_.isNumber(rule.options.drop)) {
      return rule.options.drop;
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
      buffer.push(calculatePush(this));
      buffer.drop(calculateDrop(this));
    } // handle
  });

  return ParseRule;
})();
