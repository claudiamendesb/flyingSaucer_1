//Topic 1.1 
//Object orientation revisted
//part one

//declare the variables and then introduces then on the function setup


//create the flying saucer variable
var flying_saucer;


function setup()
{
    createCanvas(800,600);
    noStroke();

    //by using this opject one I do not need the previus ones
    flying_saucer = {
        x: 300,
        y: 150,
        width: 250,
        height: 75,
        window_width: 0.5,
        window_height: 1.2,
        base_height: 0.50,
        num_lights: 20,
        brightness: []
    }

    for(var i = 0; i < flying_saucer.num_lights; i++)
    {
        flying_saucer.brightness.push(( i * 10) %255 );
    }
}

function draw()
{
    background(50,0,80);
    
    //draw the ground
    fill(0,50,0);
    rect(0,height - 100, width, 100);
    
    //draw the flying saucer
    fill(175,238,238);
    arc(flying_saucer.x,flying_saucer.y,flying_saucer.width /2,flying_saucer.height * 2,PI,TWO_PI)
    fill(150);
    arc(flying_saucer.x,flying_saucer.y,flying_saucer.width,flying_saucer.height,PI,TWO_PI);
    fill(50);
    arc(flying_saucer.x,flying_saucer.y,flying_saucer.width,flying_saucer.height/2,0,PI);

    flying_saucer.x += random(-2, 2) //movement horizontal
    flying_saucer.y += random(-1, 1) //movement vertical

    //draw the lights
    fill(255);
    var incr = flying_saucer.width / 10 + 2;
    for (var i = 0; i < 10; i++)
    {
        fill(255, flying_saucer.brightness[i]);
        ellipse(flying_saucer.x - flying_saucer.width/2 + incr * i, flying_saucer.y, 5);
        flying_saucer.brightness[i] += 1;
        flying_saucer.brightness[i] = flying_saucer.brightness[i] % 255;
    }
    
}