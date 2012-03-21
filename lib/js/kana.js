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
    set: function(newValue) {
      this.romaji = newValue;
      this.parser = new Kana.RomajiParser(newValue);
      this.parser.parse();
    },
    getTranslated: function() {
      return String.fromCharCode.apply(this, _(this.parser.getResult()).map(function(syl) {
        return Kana.index[syl] + Kana.base.hiragana
      }));
    },

    stringify: function() {
      var translated = this.getTranslated();
      var rest = this.parser.getRest();

      return translated + rest;
    },
    htmlize: function() {
      var translated = this.getTranslated();
      var rest = this.parser.getRest();

      var result = "<span>" + translated;
      if(rest.length > 0) {
        result += "<u>" + rest + "</u>";
      }
      result += "</span>";
      return result;
    }
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

  return Kana;
})();
