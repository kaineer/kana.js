//
//
//
Kana.RomajiParser = (function(){
  var Parser = function(source) {
    this.buffer = new Kana.ParseBuffer(source.toUpperCase());
    return this;
  };

  _.extend(Parser, {
    addRule: function(regexp, options) {
      Parser.rules || (Parser.rules = []);
      Parser.rules.push(new Kana.ParseRule(regexp, options));

      return Parser;
    },
    getRule: function(buffer) {
      return _.find(Parser.rules, function(item) {
        var result = item.accepts(buffer);
        return result; // item.accepts(buffer);
      });
    }
  });

  Parser.
    // Lowercase vowels
    addRule(/^X([AIUEO])/, { push: function(matches) { return matches[1].toLowerCase(); } }).
    // Lowercase tsu
    addRule(/^XTSU/, {push: 'tsu'}).
    // Vowels
    addRule(/^[AIUEO]/).
    // : as U replacement
    addRule(/^:/, {push: 'U'}).
    // N in mikan
    addRule(/^N\'/, {push: 'N'}).
    addRule(/^[KGS][AIUEO]/);

  _.extend(Parser.prototype, {
    parse: function() {
      var rule = Parser.getRule(this.buffer);
      if(rule) { rule.handle(this.buffer); }
      return this;
    },
    getResult: function() {
      return this.buffer.getSyllables();
    }
  });


  return Parser;
})();
