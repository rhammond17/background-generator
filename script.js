var css = document.querySelector("h3");
var color1 = document.querySelector(".color1")
var color2 = document.querySelector(".color2")
var body = document.getElementById("gradient");
var random = document.getElementById("random");

// RGBtoHex converter from css-tricks
function RGBToHex(rgb) {
    // Choose correct separator
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    // Turn "rgb(r,g,b)" into [r,g,b]
    rgb = rgb.substr(4).split(")")[0].split(sep);

    let r = (+rgb[0]).toString(16),
        g = (+rgb[1]).toString(16),
        b = (+rgb[2]).toString(16);

    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;

    return "#" + r + g + b;
}

// Pad function from gist
// https://gist.github.com/endel/321925f6cafa25bbfbde
function zeroPadFront (s, size) {
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
  }

function setGradient() {
    body.style.background = "linear-gradient(to right, " + color1.value + ", " + color2.value + ")";

    // Set the style text
    css.textContent = body.style.background + ";";
}

function setRandomGradient() {
    var randomColor1 = Math.floor(Math.random()*16777215).toString(16);
    var randomColor2 = Math.floor(Math.random()*16777215).toString(16);

    // Fix colors:
    // 1b2c3 -> 01b2c3
    //  f39a -> 00f39a
    if (randomColor1.length < 6) {
        randomColor1 = zeroPadFront(randomColor1, 6);
    }

    if (randomColor2.length < 6) {
        randomColor2 = zeroPadFront(randomColor2, 6);
    }

    color1.value = "#" + randomColor1;
    color2.value = "#" + randomColor2;
    setGradient();
}

function initColors() {
    // Styles contained within a CSS file need to be computed first to retrieve them
    var gradient = getComputedStyle(body).backgroundImage;

    // Extract the linear-gradient rgb values from the computed style
    // This regex assumes the following format:
    // linear-gradient(to right, rgb(255, 0, 0), rgb(255, 255, 0))
    var rgb = gradient.match(/rgb\([0-9, ]*\)/g);

    // Set the inital color values
    color1.value = RGBToHex(rgb[0]);
    color2.value = RGBToHex(rgb[1]);

    // Set the style text
    css.textContent = gradient;
 }

color1.addEventListener("input", setGradient)
color2.addEventListener("input", setGradient)
random.addEventListener("click", setRandomGradient);

initColors();
