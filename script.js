const canvas = document.getElementById('canvas');

//Setting Canvas to 2D
const context = canvas.getContext('2d');

//FullScreen the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Resizes Canvas when window widht and height resizes
window.addEventListener('resize',()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

//All Water Drops will be stored here
let waterDropsArray = [];

//All Water Particles will be stored here
let waterParticlesArray = [];


//Function for Water Drops
function WaterDrops() {
    
    this.x = Math.floor(((window.innerWidth/2) - 140) + Math.floor(Math.random()* window.innerWidth / 6));
    this.y = 180;

    this.size = 5;

    //Speed of moving the water drops of Y axis
    let speedArray = [10,8.9,8,11,10.5,7,9,15,11.7,10.7,10.1,15.4,11.1,12,12.54];
    let speedY = speedArray[Math.floor(Math.random()* speedArray.length)];

    //Updates Drop Position on Y axis (Falling down)
    this.update = ()=>{
        this.y += speedY
    }

    //Renders the Drop on Canvas
    this.draw = ()=>{
        context.fillStyle = 'white';
        context.beginPath();
        context.arc(this.x,this.y,this.size,0,Math.PI * 2);
        context.fill();
    }
}


//Function for Water Particles (Dropped)
function WaterParticles(x) {
    
    this.x = x;
    this.y = window.innerHeight - 100;

    this.size = Math.random() * 3 + 2;

    //Speed of moving the water drops of Y axis
    let speedX = Math.random()*3 - 1.5;
    let speedY = Math.random() - 1.5;

    //Updates Drop Position on Y axis (Falling down)
    this.update = ()=>{
        this.y += speedY;
        this.x += speedX;
        if (this.size > .2) {
            this.size -= .1;
        }
    }

    //Renders the Water Particle on Canvas
    this.draw = ()=>{
        context.fillStyle = 'white';
        context.beginPath();
        context.arc(this.x,this.y,this.size,0,Math.PI * 2);
        context.fill();
    }
}


//Function to update and draw every water object in water particles array using For Loop
function renderWaterParticles() {
    for (let i = 0; i < waterParticlesArray.length; i++) {
        waterParticlesArray[i].draw(); //Render the drop on the canvas
        waterParticlesArray[i].update(); //Update the position on the canvas
        if (waterParticlesArray[i].size <= .2) {
            waterParticlesArray.splice(i,1);
            i--;
        }
    }
}

//Function to update and draw every water object in water drops array using For Loop
function renderWaterDrops() {
    for (let i = 0; i < waterDropsArray.length; i++) {
        waterDropsArray[i].draw(); //Render the drop on the canvas
        waterDropsArray[i].update(); //Update the position on the canvas
        if (waterDropsArray[i].y >= window.innerHeight - 100) {
            for (let index = 0; index < 12; index++) {
                waterParticlesArray.push(new WaterParticles(waterDropsArray[i].x))
                
            }
            waterDropsArray.splice(i,1);

            i--;
        }
    }
}


//Animate Function
function animate() {
    context.fillStyle = 'rgba(24,28,31,1)';
    context.fillRect(0,0,canvas.width,canvas.height);
    context.fillStyle = 'white';
    //Bottom Line
    context.beginPath();
    context.rect(window.innerWidth / 4,window.innerHeight - 100, window.innerWidth / 2,4);
    context.fill();

    renderWaterDrops();
    renderWaterParticles();
    requestAnimationFrame(animate);
}


animate();

//Interval to render water drops 
setInterval(() => {
    for (let i = 0; i < 3; i++) {
        waterDropsArray.push(new WaterDrops())
    }
}, 200);

