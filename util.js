/**
 * Computes the distance between two points.
 * @param {number} x1 
 * @param {number} y1 
 * @param {number} z1 
 * @param {number} x2 
 * @param {number} y2 
 * @param {number} z2 
 */

function distance(x1, y1, z1, x2=0, y2=0, z2=0) {
  let x = x2 - x1;
  let y = y2 - y1;
  let z = z2 - z1;
  return Math.round(Math.sqrt(x*x + y*y + z*z));
}


/**
* @param {string} id       identifer you want to use to track canvas element.
* @param {number} height   height of the image canvas.
* @param {number} width    width of the image canvas.
* @param {object} elem     The element you want to attach the canvas to.
**/

function createCanvas(id, height, width, elem=document.body) {
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');
  canvas.id = id;
  ctx.canvas.height = height;
  ctx.canvas.width = width;
  elem.appendChild(canvas);
  return ctx;
}