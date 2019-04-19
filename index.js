var image = "./flower.png";

var img = new Image();
img.src = image;
var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');

var canvas2 = document.getElementById('canvas2');
ctx2 = canvas2.getContext('2d');

img.onload = function() {
  draw(this);
}
 
function distance(x1, y1, z1, x2=0, y2=0, z2=0) {
  let x = x2 - x1;
  let y = y2 - y1;
  let z = z2 - z1;
  return Math.round(Math.sqrt(x*x + y*y + z*z));
}

function draw(img) {
  ctx.drawImage(img, 0, 0);
  img.style.display = 'none';

  //Source data
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data1 = imageData.data;

  //Recreation data
  var drawingData = ctx2.getImageData(0, 0, canvas.width, canvas.height);
  var data2 = drawingData.data;
  
  var replicate_random = function() {
    for (let i = 0; i < data2.length; i += 4) {
      let new_r = Math.floor(Math.random() * 255);
      let new_g = Math.floor(Math.random() * 255);
      let new_b = Math.floor(Math.random() * 255);

      //Calculate previous color-distance
      let distance1 = distance(data1[i], data1[i+1], data1[i+2],
                               data2[i], data2[i+1], data2[i+2]);
      
      //Calculate new color-distance
      let distance2 = distance(data1[i], data1[i+1], data1[i+2],
                               new_r, new_g, new_b);

      
      if( distance2 < distance1 ) {
        data2[i]   = new_r;
        data2[i+1] = new_g;
        data2[i+2] = new_b;
        data2[i+3] = 255;
      }
    }

    ctx2.putImageData(drawingData, 0, 0);
    setTimeout(iterate, 10);
  };

  var bubbleSort = function() {

    let n = 1;

    var sort = function() {
  
      for (let i = 0; i < data1.length - (n * 4); i += 4) {
  
        d1 = distance(data1[i], data1[i+1], data1[i+2]);
        d2 = distance(data1[i+4], data1[i+5], data1[i+6]);
  
        if(d2 < d1) {
          //Create copy so we don't lose the data
          let temp = [data1[i], data1[i+1], data1[i+2]];
  
          //swap first point with second.
          data1[i] = data1[i+4];
          data1[i+1] = data1[i+5];
          data1[i+2] = data1[i+6];
  
          //swap second point with original first point
          data1[i+4] = temp[0];
          data1[i+5] = temp[1];
          data1[i+6] = temp[2];
          
        }
      }

      n++;
      ctx2.putImageData(imageData, 0, 0);
    };
    
    setInterval(sort, 0);
    
  };

  var combSort = function() {
    let gap = data1.length;
    let shrink = 1.33;
    let sorted = false;

    while( !sorted ) {
      debugger;
      //update the gap for next comb
      if(gap > 12) gap = (Math.floor( gap/shrink ) + 3) & ~0x03; //Make sure the gap is a multiple of 4;
      if(gap <= 12 && gap > 4) {gap -= 4}
      else if( gap <= 4 ) {
        gap = 4;
        sorted = true;
      }

      ctx2.putImageData(imageData, 0, 0);
      
      let i = 0
      while( i + gap < data1.length ) {

        d1 = distance(data1[i], data1[i+1], data1[i+2]);
        d2 = distance(data1[i+gap], data1[i+gap+1], data1[i+gap+2]);
  
        if(d2 < d1) {
          //Create copy so we don't lose the data
          let temp = [data1[i], data1[i+1], data1[i+2]];
  
          //swap first point with second.
          data1[i] = data1[i+gap];
          data1[i+1] = data1[i+gap+1];
          data1[i+2] = data1[i+gap+2];
  
          //swap second point with original first point
          data1[i+gap] = temp[0];
          data1[i+gap+1] = temp[1];
          data1[i+gap+2] = temp[2];
          
        }
        
        i += 4;
        
      }
    }
  };

  var btn = document.getElementById('func');
  btn.addEventListener('click', combSort);
}
