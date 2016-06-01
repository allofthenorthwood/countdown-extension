(function(exports) {

// From http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
var hexToRgb = function(hex) {
  // Expand shorthand form (e.g. '03F') to full form (e.g. '0033FF')
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
  ] : null;
};

var printHexToRgba = function(hex, a) {
  var rgb = hexToRgb(hex);
  return 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + a + ')';
};

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */
var rgbToHsl = function(rgb) {
  var r = rgb[0] / 255;
  var g = rgb[1] / 255;
  var b = rgb[2] / 255;

  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }

  return [h, s, l];
};

var findDarkestColorIdx = function(colors) {
  var darkest = {
    idx: 0,
    lightness: 255,
  };
  for (var i = 0; i < colors.length; i++) {
    var color = colors[i];
    var lightness = rgbToHsl(hexToRgb(color))[2];
    if (lightness < darkest.lightness) {
      darkest = {
        idx: i,
        lightness: lightness,
      };
    }
  }
  return darkest.idx;
}


exports.colorHelpers = {
  findDarkestColorIdx: findDarkestColorIdx,
  rgbToHsl: rgbToHsl,
  printHexToRgba: printHexToRgba,
  hexToRgb: hexToRgb,
};

}(globalModules));