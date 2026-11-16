
let noiseScale = 0.003;
let time = 0;
let particles = [];
let particleCount = 1000;
let bgGraphics; 


let flock;
let fishImg;
let foodList = [];


let spacing = 40;
let elements = 50;
let seaColors;
let coralColors;
let algaeColors;

let canvasFormat;

function preload() {
  fishImg = loadImage('fish.png', () => {}, () => {
    console.log("fish.png not found, using procedural fallback if needed.");
  });
}

function centreCanvas() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  canvasFormat.position(x, y);
}

function windowResized() {
  centreCanvas();
}

function setup() {
  canvasFormat = createCanvas(1000, 600);
  centreCanvas();

  bgGraphics = createGraphics(1000, 600);
  bgGraphics.background(4, 25, 55);

  for (let i = 0; i < particleCount; i++) {
    particles.push(createVector(random(width), random(height)));
  }

  flock = new Flock();
  for (let i = 0; i < 60; i++) {
    let b = new Boid(random(width), random(height));
    flock.addBoid(b);
  }

  seaColors = [
    color(105, 125, 110),
    color(125, 140, 118),
    color(78, 110, 106),
    color(88, 135, 130),
    color(140, 155, 130)
  ];

  coralColors = [
    color(190, 135, 145),
    color(175, 95, 108),
    color(130, 140, 185),
    color(190, 125, 80),
    color(150, 95, 185),
    color(195, 175, 115)
  ];

  algaeColors = [
    color(190, 135, 145),  
    color(130, 140, 185),  
    color(190, 125, 80),   
    color(88, 135, 130),   
    color(140, 155, 130),  
    color(150, 95, 145)    
  ];
}

function draw() {
  updateAndRenderFlowField();

  background(23, 77, 98);
  image(bgGraphics, 0, 0);

  renderUnderwaterGarden();

  fill(140, 75, 45);
  noStroke();
  for (let i = foodList.length - 1; i >= 0; i--) {
    ellipse(foodList[i].x, foodList[i].y, 6, 6);
  }

  flock.run(foodList);
}

function updateAndRenderFlowField() {
  bgGraphics.noStroke();
  bgGraphics.fill(4, 25, 55, 12); 
  bgGraphics.rect(0, 0, bgGraphics.width, bgGraphics.height);

  for (let p of particles) {
    let n = noise(p.x * noiseScale, p.y * noiseScale, time);
    let angle = n * TWO_PI * 4;
    let v = p5.Vector.fromAngle(angle);
    v.mult(1.2);

    let particleSize = random(1, 2.2);
    let blue = map(n, 0, 1, 200, 220);
    let green = map(n, 0, 1, 90, 150);

    bgGraphics.noStroke();
    bgGraphics.fill(30, green, blue, 50);
    bgGraphics.circle(p.x, p.y, particleSize);

    p.add(v);

    if (p.x < 0 || p.x > bgGraphics.width || p.y < 0 || p.y > bgGraphics.height) {
      p.x = random(bgGraphics.width);
      p.y = random(bgGraphics.height);
    }
  }
  time += 0.003;
}

function renderUnderwaterGarden() {
  noStroke();


  fill(18, 50, 58);
  rectMode(CENTER);
  rect(width / 2, 585, width, 30);
  rectMode(CORNER);

  fill(150, 195, 190, 180);
  for (let i = 0; i < 18; i++) {
    let bx = (i * 53) % width;
    let by = height - ((frameCount * 1.2 + i * 75) % height);
    let bubbleSize = map(sin(radians(frameCount * 2 + i * 20)), -1, 1, 3, 9);
    circle(bx, by, bubbleSize);
  }

  for (let i = 0; i < 4; i++) {
    let spiralX = 180 + i * 215;
    let currentNoiseSway = (noise(spiralX * 0.01, time) - 0.5) * 25;
    let spiralY = 430 + currentNoiseSway;

    stroke(seaColors[i % seaColors.length]);
    strokeWeight(2);
    noFill();

    push();
    translate(spiralX, spiralY);
    rotate(sin(time * 2 + i) * 0.25);

    beginShape();
    for (let a = 0; a < TWO_PI * 1.5; a += 0.1) {
      let r = a * 2.2;
      vertex(cos(a) * r, sin(a) * r);
    }
    endShape();
    pop();
  }

  noStroke();

  for (let i = 0; i < 12; i++) {
    let y = i * 18;
    let sway = sin(time * 10 + i * 0.25) * 12;
    fill(seaColors[0]);
    push();
    translate(115 + sway, 545 - y);
    rotate(sin(time * 10 + i * 0.25) * 0.2);
    ellipse(-10, 0, 22, 9);
    ellipse(10, -4, 22, 9);
    pop();
  }

  for (let i = 0; i < 13; i++) {
    let y = i * 18;
    let sway = sin(time * 8.5 + i * 0.3) * 14;
    fill(seaColors[i % seaColors.length]);
    push();
    translate(885 + sway, 545 - y);
    rotate(sin(time * 8.5 + i * 0.3) * 0.25);
    ellipse(-10, 0, 24, 10);
    ellipse(10, -4, 24, 10);
    pop();
  }

  push();
  translate(300, 515);
  for (let i = 0; i < elements; i++) {
    fill(coralColors[i % coralColors.length]);
    push();
    let fanNoise = noise(300 * noiseScale, i * 0.1, time) - 0.5;
    let angle = map(i, 0, elements - 1, -1.3, 1.3);
    rotate(angle + fanNoise * 0.2);
    ellipse(0, -35, 8, 35);
    pop();
  }
  fill(195, 175, 115);
  circle(0, 0, 16);
  pop();

  push();
  translate(700, 520);
  for (let i = 0; i < elements; i++) {
    fill(coralColors[i % coralColors.length]);
    push();
    let fanNoise = noise(700 * noiseScale, i * 0.1, time) - 0.5;
    let angle = map(i, 0, elements - 1, -1.4, 1.4);
    rotate(angle + fanNoise * 0.2);
    ellipse(0, -32, 7, 32);
    pop();
  }
  fill(195, 175, 115);
  circle(0, 0, 15);
  pop();

  for (let x = 40; x <= width - 40; x += spacing) {
    for (let y = 0; y <= height; y += spacing) {
      let wave = sin(x * 0.05 + time * 2) - cos(y * 0.05);
      let csize = map(wave, -1, 1, 2, 9);
      if (y > 510 && y < 570 && x > 160 && x < 840) {
        fill(coralColors[(x + y) % coralColors.length]);
        circle(x, y, csize);
      }
    }
  }

  push();
  translate(500, 535);
  for (let i = 0; i < elements; i++) {
    fill(coralColors[i % coralColors.length]);
    push();
    let fanNoise = noise(500 * noiseScale, i * 0.1, time) - 0.5;
    let angle = map(i, 0, elements - 1, -1.5, 1.5);
    rotate(angle + fanNoise * 0.2);
    ellipse(0, -45, 9, 45);
    pop();
  }
  fill(195, 175, 115);
  circle(0, 0, 18);
  pop();

  for (let i = 0; i < 28; i++) {
    let x = 220 + i * 20;
    let localNoise = noise(x * noiseScale, time) - 0.5;
    let y = 555 + localNoise * 15;
    fill(seaColors[i % seaColors.length]);
    ellipse(x, y, 9, 16);
  }

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 11 - i * 3; j++) {
      let y = j * (18 + i * 2);
      let sway = sin(time * 10 + j * 0.25 + i) * (9 + i * 3);
      fill(seaColors[(j + i) % seaColors.length]);
      push();
      translate(140 + i * 80 + sway, 540 - y);
      rotate(sin(time * 10 + j * 0.25 + i) * 0.2);
      ellipse(-9, 0, 22 - i * 5, 9 - i * 2);
      ellipse(9, -3, 22 - i * 5, 9 - i * 2);
      pop();
    }
  }

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 12 - i * 3; j++) {
      let y = j * (17 + i * 2);
      let sway = sin(time * 8.5 + j * 0.3 + i) * (12 + i * 4);
      fill(seaColors[(j + i + 2) % seaColors.length]);
      push();
      translate(760 + i * 75 + sway, 540 - y);
      rotate(sin(time * 8.5 + j * 0.3 + i) * 0.25);
      ellipse(-10, 0, 24 - i * 6, 10 - i * 2);
      ellipse(10, -4, 24 - i * 6, 10 - i * 2);
      pop();
    }
  }

  for (let i = 0; i < 6; i++) {
    let spiralX = 100 + i * 155;
    let currentNoiseSway = (noise(spiralX * 0.01, time + 10) - 0.5) * 30;
    let spiralY = 350 + currentNoiseSway;

    stroke(algaeColors[i % algaeColors.length]);
    strokeWeight(2);
    noFill();

    push();
    translate(spiralX, spiralY);
    rotate(sin(time * 2 + i) * 0.2);

    beginShape();
    for (let a = 0; a < TWO_PI * 1.5; a += 0.1) {
      let r = a * 2.2;
      vertex(cos(a) * r, sin(a) * r);
    }
    endShape();
    pop();
  }

  noStroke();
}

function mousePressed() {
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= 565) {
    foodList.push(createVector(mouseX, mouseY));
  }
}

function Flock() {
  this.boids = [];
}

Flock.prototype.run = function (foodList) {
  for (let i = 0; i < this.boids.length; i++) {
    this.boids[i].run(this.boids, foodList);
  }
};

Flock.prototype.addBoid = function (b) {
  this.boids.push(b);
};

function Boid(x, y) {
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(random(-1, 1), random(-1, 1));
  this.position = createVector(x, y);
  this.r = 1.0;
  this.maxSpeed = 2.2;
  this.maxForce = 0.15;
  this.currentTheta = 0;
}

Boid.prototype.run = function (boids, foodList) {
  this.flock(boids, foodList);
  let wallForce = this.boundaries(40);
  this.applyForce(wallForce);
  this.update();
  this.render();
};

Boid.prototype.applyForce = function (force) {
  this.acceleration.add(force);
};

Boid.prototype.calculateCurrent = function () {
  let n = noise(this.position.x * noiseScale, this.position.y * noiseScale, time);
  let angle = n * TWO_PI * 4;
  let currentForce = p5.Vector.fromAngle(angle);
  currentForce.mult(0.6);
  return currentForce;
};

Boid.prototype.flock = function (boids, foodList) {
  let sep = this.separate(boids);
  let ali = this.align(boids);
  let coh = this.cohesion(boids);
  let foodSearch = this.eatFood(foodList);
  let currentDrift = this.calculateCurrent();

  sep.mult(2.0);
  ali.mult(0.8);
  coh.mult(0.5);
  foodSearch.mult(5.0); 
  currentDrift.mult(1.0);

  this.applyForce(sep);
  this.applyForce(ali);
  this.applyForce(coh);
  this.applyForce(foodSearch);
  this.applyForce(currentDrift);
};

Boid.prototype.update = function () {
  this.velocity.add(this.acceleration);
  this.velocity.limit(this.maxSpeed);
  this.position.add(this.velocity);
  this.acceleration.mult(0);

  this.position.x = constrain(this.position.x, 20, width - 20);
  this.position.y = constrain(this.position.y, 20, 565);
};

Boid.prototype.seek = function (target) {
  let desired = p5.Vector.sub(target, this.position);
  desired.normalize();
  desired.mult(this.maxSpeed);
  let steer = p5.Vector.sub(desired, this.velocity);
  steer.limit(this.maxForce);
  return steer;
};

Boid.prototype.render = function () {
  let targetTheta = this.velocity.heading();
  
  let diff = targetTheta - this.currentTheta;
  while (diff < -PI) diff += TWO_PI;
  while (diff > PI) diff -= TWO_PI;
  this.currentTheta += diff * 0.15;

  push();
  translate(this.position.x, this.position.y);
  rotate(this.currentTheta);
  
  imageMode(CENTER);
  if (fishImg && fishImg.width > 0) {
    image(fishImg, 0, 0, 42, 32);
  } else {
    fill(130, 160, 180);
    noStroke();
    ellipse(0, 0, 36, 18);
    triangle(-12, 0, -22, -10, -22, 10);
  }
  pop();
};

Boid.prototype.boundaries = function (d) {
  let desired = null;

  if (this.position.x < d) {
    desired = createVector(this.maxSpeed, this.velocity.y);
  } else if (this.position.x > width - d) {
    desired = createVector(-this.maxSpeed, this.velocity.y);
  }

  if (this.position.y < d) {
    desired = createVector(this.velocity.x, this.maxSpeed);
  } else if (this.position.y > 565 - d) {
    desired = createVector(this.velocity.x, -this.maxSpeed);
  }

  if (desired !== null) {
    desired.normalize();
    desired.mult(this.maxSpeed);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce * 2.5);
    return steer;
  }
  return createVector(0, 0);
};

Boid.prototype.inFieldOfView = function (otherPos) {
  let toOther = p5.Vector.sub(otherPos, this.position);
  let angle = p5.Vector.angleBetween(this.velocity, toOther);
  return angle < PI * 0.75;
};

Boid.prototype.eatFood = function (foodList) {
  if (foodList.length === 0) return createVector(0, 0);

  let closestDist = Infinity;
  let closestIndex = -1;

  for (let i = 0; i < foodList.length; i++) {
    let d = p5.Vector.dist(this.position, foodList[i]);
    if (d < closestDist) {
      closestDist = d;
      closestIndex = i;
    }
  }

  if (closestIndex !== -1) {
    if (closestDist < 15) {
      foodList.splice(closestIndex, 1);
      return createVector(0, 0);
    }
    return this.seek(foodList[closestIndex]);
  }

  return createVector(0, 0);
};

Boid.prototype.separate = function (boids) {
  let desiredSeparation = 25; 
  let steer = createVector(0, 0);
  let count = 0;

  for (let i = 0; i < boids.length; i++) {
    let other = boids[i];
    let d = p5.Vector.dist(this.position, other.position);
    
    if (d > 0 && d < desiredSeparation) {
      let diff = p5.Vector.sub(this.position, other.position);
      diff.normalize();
      diff.div(d);
      steer.add(diff);
      count++;
    }
  }

  if (count > 0) {
    steer.div(count);
  }

  if (steer.mag() > 0) {
    steer.normalize();
    steer.mult(this.maxSpeed);
    steer.sub(this.velocity);
    steer.limit(this.maxForce * 1.5);
  }

  return steer;
};

Boid.prototype.align = function (boids) {
  let neighbordist = 50;
  let sum = createVector(0, 0);
  let count = 0;

  for (let i = 0; i < boids.length; i++) {
    let other = boids[i];
    let d = p5.Vector.dist(this.position, other.position);
    
    if (d > 0 && d < neighbordist && this.inFieldOfView(other.position)) {
      sum.add(other.velocity);
      count++;
    }
  }

  if (count > 0) {
    sum.div(count);
    sum.normalize();
    sum.mult(this.maxSpeed);
    let steer = p5.Vector.sub(sum, this.velocity);
    steer.limit(this.maxForce);
    return steer;
  } else {
    return createVector(0, 0);
  }
};

Boid.prototype.cohesion = function (boids) {
  let neighbordist = 50;
  let sum = createVector(0, 0);
  let count = 0;
  
  for (let i = 0; i < boids.length; i++) {
    let other = boids[i];
    let distVal = p5.Vector.dist(this.position, other.position);
    
    if (distVal > 0 && distVal < neighbordist && this.inFieldOfView(other.position)) {
      sum.add(other.position);
      count++;
    }
  }

  if (count > 0) {
    sum.div(count);
    return this.seek(sum);
  } else {
    return createVector(0, 0);
  }
};