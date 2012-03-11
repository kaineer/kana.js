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
    // N in kin'yobi
    addRule(/^N\'/, {push: 'N'}).
    // KYO, RYA, NYO etc
    addRule(/^([KGNHBPMR])(Y[AUO])/, {
      push: function(matches) {
        return [
          matches[1] + "I",
          matches[2].toLowerCase()
        ];
      }
    }).
    // N before not vowel
    addRule(/^N([^AIUEO]|\s|$)/, { push: "N" }).
    addRule(/^[KGSNM][AIUEO]/);

  var stepParse = function(buffer) {
    var rule = Parser.getRule(buffer);
    if(rule) {
      rule.handle(buffer);
      return true;
    } else {
      return false;
    }
  };

  _.extend(Parser.prototype, {
    parse: function() {
      while(this.buffer.getSource() != "") {
        if(!stepParse(this.buffer)) {
          break;
        }
      }
      return this;
    },
    getResult: function() {
      return this.buffer.getSyllables();
    }
  });


  return Parser;
})();
