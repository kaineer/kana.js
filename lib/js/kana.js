//
//
//
var Kana = window.Kana = (function() {
  //
  var Kana = function(opts) {
    opts || (opts = {});
    this.romaji = opts.romaji;
    return this;
  };

  Kana.base = {
    hiragana: 12353,
    katakana: 12449
  };

  _.extend(Kana.prototype, {
    set: function(newValue) {this.romaji = newValue;},
    stringify: function() {
      return String.fromCharCode(Kana.index[this.romaji] + Kana.base.hiragana);
    },
    htmlize: function() {}
  });

  var kanaIndex = (function() {
    var kanaSource = [
      "a",  "A",  "i",  "I",  "u",  "U",  "e",  "E",  "o",  "O",

      "KA", "GA", "KI",  "GI",  "KU", "GU", "KE", "GE", "KO", "GO",
      "SA", "ZA", "SHI", "JI",  "SU", "ZU", "SE", "ZE", "SO", "ZO",

      "TA", "DA", "CHI", "DZI", "tsu", "TSU", "DZU", "TE", "DE", "TO", "DO",

      "NA", "NI", "NU",  "NE",  "NO",

      "HA", "BA", "PA",  "HI", "BI", "PI",
      "FU", "BU", "PU",  "HE", "BE", "PE",
      "HO", "BO", "PO",

      "MA", "MI", "MU", "ME", "MO",

      "ya", "YA", "yu", "YU", "yo", "YO",

      "RA", "RI", "RU", "RE", "RO",

      "wa", "WA", "WI", "WE", "WO",
      "N"
    ];

    var index = {};
    _(kanaSource).each(function(syl, i) {
      index[syl] = i;
    });
    return index;
  })();

  Kana.index = kanaIndex;

  Kana.ParseBuffer = function(source) {
    this.source = source;
    this.syllables = [];
    this.result = undefined;
    return this;
  };

  _.extend(Kana.ParseBuffer.prototype, {
    getSource: function() {
      return this.source;
    },
    getSyllables: function() {
      return this.syllables;
    },
    getResultLabel: function() {
      if(_.isUndefined(this.result)) {
        return "unknown";
      } else {
        return (this.result ? "success" : "failure");
      }
    },
    push: function() {
      for(i in arguments) {
        this.syllables.push(arguments[i]);
      }
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

  return Kana;
})();
