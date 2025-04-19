// Topic 1.1 
// Object orientation revisited
// Part two

// Global array to store all flying saucer objects
var flyingSaucers;

// Constructor function to create a FlyingSaucer object
function FlyingSaucer(x, y) {
    this.x = x; // x position
    this.y = y; // y position
    this.width = random(150, 250); // width of the saucer
    this.height = random(75, 125); // height of the saucer
    this.window_width = random(0.65, 0.85); // window width as a percentage of total width
    this.window_height = random(0.75, 1); // window height as a percentage of total height
    this.base_height = random(0.25, 0.5); // base height as a percentage of total height
    this.num_lights = floor(random(5, 25)); // number of lights on the saucer
    this.light_inc = floor(random(5, 10)); // how fast the lights will change brightness
    this.brightnesses = []; // array to store current brightness for each light
    this.beamOn = false; // whether the beam is currently on or off

    // Draw the light beam beneath the saucer
    this.beam = function () {
        if (random() > 0.25) { // 75% chance of drawing the beam when called
            fill(255, 255, 100, 150); // semi-transparent yellow beam
            beginShape();
            vertex(this.x - 25, this.y + this.height * this.base_height * 0.5);
            vertex(this.x + 25, this.y + this.height * this.base_height * 0.5);
            vertex(this.x + 70, height - 100); // ground level
            vertex(this.x - 70, height - 100);
            endShape();
        }
    },

    // Makes the saucer "hover" by slightly changing its position
    this.hover = function () {
        this.x += random(-1, 1);
        this.y += random(-1, 1);   

        // Randomly toggle beam on/off based on probabilities
        if (this.beamOn && random() > 0.996) {
            this.beamOn = false;
        } else if (!this.beamOn && random() > 0.99) {
            this.beamOn = true;
        }
    }

    // Draw the saucer
    this.draw = function () {
        if (this.beamOn) {
            this.beam(); // draw beam if it's on
        }

        // Draw the top window
        fill(175, 238, 238);
        arc(
            this.x,
            this.y,
            this.width * this.window_width,
            this.height * this.window_height,
            PI, TWO_PI
        );

        // Draw the main body
        fill(150);
        arc(
            this.x,
            this.y,
            this.width,
            this.height / 2,
            PI, TWO_PI
        );

        // Draw the base
        fill(50);
        arc(
            this.x,
            this.y,
            this.width,
            this.height * this.base_height,
            0, PI
        );

        // Draw the lights around the base
        var incr = (this.width / (this.num_lights - 1)); 

        for (var i = 0; i < this.num_lights; i++) {
            var x = this.x - this.width / 2 + i * incr;
            fill(this.brightnesses[i]);
            ellipse(x, this.y, 5, 5); // draw each light

            // Update brightness for next frame
            this.brightnesses[i] += this.light_inc;
            if (this.brightnesses[i] > 255) {
                this.brightnesses[i] = 100; // reset brightness when it gets too bright
            }
        }
    }

    // Initialize light brightnesses with a pattern
    for (var i = 0; i < this.num_lights; i++) {
        this.brightnesses.push((i * this.light_inc * 2) % 255);
    }
}


// Setup function runs once at the beginning
function setup() {
    createCanvas(800, 600); // set canvas size
    noStroke(); // turn off outlines for shapes

    flyingSaucers = [];

    // Create 5 flying saucer objects spaced out across the canvas
    for (var i = 0; i < 5; i++) {
        flyingSaucers.push(new FlyingSaucer(100 + i * 150, floor(random(100, 200))));
    }
}

// Draw function runs every frame (around 60 times per second)
function draw() {
    background(50, 0, 80); // dark purple sky

    // Draw the ground
    fill(0, 50, 0);
    rect(0, height - 100, width, 100);

    // Update and draw each flying saucer
    for (var i = 0; i < flyingSaucers.length; i++) {
        flyingSaucers[i].hover(); // update hover movement
        flyingSaucers[i].draw();  // draw the saucer
    }
}
