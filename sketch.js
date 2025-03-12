let weatherJSON 
let minPrecip = Infinity
let maxPrecip = -Infinity
let images = {}
let dx
function preload() {
  weatherJSON = loadJSON("https://api.weather.gov/gridpoints/OKX/33,37/forecast")  
}

function setup() {
  createCanvas(600, 400);
  dx = width/(weatherJSON.properties.periods.length+2)
  
  // const fit = (img) => {
  //   img.resize(dx,0)
  //   redraw()
  // }
  
  for( const p of weatherJSON.properties.periods ) {
    minPrecip =min(p.probabilityOfPrecipitation.value, minPrecip)
    maxPrecip = max(p.probabilityOfPrecipitation.value, maxPrecip)
    // if( ! (p.icon in images) ) {
    //   images[p.icon] = loadImage(p.icon, fit) 
    // }    
  }
  noLoop()
}

function draw() {
  background(220);
  let px = dx // dx * (i+1), where i = 0
  let py = map( weatherJSON.properties.periods[0].probabilityOfPrecipitation.value, minPrecip, maxPrecip, 0.8*height, 0.2*height)
  for( let i = 1; i < weatherJSON.properties.periods.length; i++ ) {
    let cx = dx * (i+1)
    let cy = map( weatherJSON.properties.periods[i].probabilityOfPrecipitation.value, minPrecip, maxPrecip, 0.8*height, 0.2*height)
    line(px,py,cx,cy)
    px = cx
    py = cy
    // if( weatherJSON.properties.periods[i].icon in images ) {
    //   image(images[weatherJSON.properties.periods[i].icon],dx*(i+1),height/2)   
    // }    
  }
  text("Days",width/2,height-10)
  text("Probability of Rain",10, height/2)
  // console.log(images)
}

function keyPressed() {
  redraw()
}
