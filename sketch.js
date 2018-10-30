var segmentCount = 128;
var radius;

function preload() {
  colorData = loadJSON('assets/colors.json');
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  if (width < height) {
    radius = width/4;
  } else {
    radius = height/4;
  }

  for (var i = 0; i < colorData.colors.length; i++) {
    var hsb = RGBtoHSV(
      colorData.colors[i].rgb[0],
      colorData.colors[i].rgb[1],
      colorData.colors[i].rgb[2]
    )
    console.log(colorData.colors[i].name + " " + hsb.h*360)
  }
}

function draw() {
  background('white');

  angleMode(RADIANS);
  colorMode(HSB, 360,1,1);

  var angleStep = floor(360/segmentCount);

  beginShape(TRIANGLE_FAN);
    vertex(width/2,height/2);
    for(var angle =0; angle <= 360; angle += angleStep){
      var vx = width/2 + cos(radians(angle))* radius;
      var vy = height/2 + sin(radians(angle))* radius;
      vertex(vx, vy);
      fill(angle, 1, 1);
      stroke(angle,1,1);
    }
  endShape();

  fill('white');
  noStroke();
  ellipse(width/2,height/2,2*radius-30);

  for (var i = 0; i < colorData.colors.length; i++) {
    var hsb = RGBtoHSV(
      colorData.colors[i].rgb[0],
      colorData.colors[i].rgb[1],
      colorData.colors[i].rgb[2]
    );


    angleMode(DEGREES);
    var angle = hsb.h * 360;

    if (mouseX > width/2 + (radius) * cos(angle) &&
        mouseX < width/2 + (radius + 20) * cos(angle) &&
        mouseY > height/2 + (radius) * sin(angle) &&
        mouseY < height/2 + (radius + 20) * sin(angle)) {
      colorMode(RGB);
      fill(0);

      textAlign(CENTER);
      textSize(20);
      text(colorData.colors[i].name, width/2, height/2-30);
      textAlign(RIGHT);
      textSize(14);
      text("Red: " + colorData.colors[i].rgb[0], width/2-40, height/2);
      text("Green: " + colorData.colors[i].rgb[1], width/2+40, height/2);
      text("Blue: " + colorData.colors[i].rgb[2], width/2+100, height/2);
      text("Hue: " + Math.round(hsb.h *100), width/2-90, height/2+30);
      text("Saturation: " + Math.round(hsb.s *100), width/2+20, height/2+30);
      text("Brightness: " + Math.round(hsb.v *100), width/2+130, height/2+30);
    }

    colorMode(HSB,1,1,1);
    fill(hsb.h, hsb.s, hsb.v);
    textSize(14);

    ellipse(
      width/2 + (radius + 10) * cos(angle),
      height/2 + (radius + 10) * sin(angle),
      10
    );
    push();
    translate(
      width/2 + (radius + 20) * cos(angle),
      height/2 + (radius + 20) * sin(angle)
    );
    rotate(angle);
    if (angle > 90 && angle < 270) {
      textAlign(RIGHT);
      scale(-1, -1);
    } else {
      textAlign(LEFT);
    }
    text(colorData.colors[i].name, 0, 0);
    pop();
  }
}

function RGBtoHSV(r, g, b) {
    if (arguments.length === 1) {
        g = r.g, b = r.b, r = r.r;
    }
    var max = Math.max(r, g, b), min = Math.min(r, g, b),
        d = max - min,
        h,
        s = (max === 0 ? 0 : d / max),
        v = max / 255;

    switch (max) {
        case min: h = 0; break;
        case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
        case g: h = (b - r) + d * 2; h /= 6 * d; break;
        case b: h = (r - g) + d * 4; h /= 6 * d; break;
    }

    return {
        h: h,
        s: s,
        v: v
    };
}
