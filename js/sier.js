'option strict'

let canvas;
let context;
let pointX = [];
let pointY = [];
let width, height;

window.onload = init;

/*
   Code to draw a Sierpinski Gasket in Javascript, on to the canvas
   By Amarnath S, amarnaths.codeproject@gmail.com, June 2019
*/

function init() {
    canvas = document.getElementById('sier');
    context = canvas.getContext('2d');
    width = canvas.width;
    height = canvas.height;

    let noPoints = 3; // First and last points are the same
    for (let i = 0; i < noPoints; ++i) {
        pointX.push(0.0);
        pointY.push(0.0);
    }
    determineRandomTriangle();
    drawSierpinskiPoints();
}

function determinePoint(index, lowX, highX, lowY, highY) {
    let minX, maxX, minY, maxY;
    minX = width * lowX;
    maxX = width * highX;
    minY = height * lowY;
    maxY = height * highY;
    pointX[index] = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    pointY[index] = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
}

// First, determine the three vertices of the bounding triangle.
// This is a triangle drawn with some amount of randomness. 
function determineRandomTriangle() {
    determinePoint(0, 0.0, 0.99, 0.0, 0.15);
    determinePoint(1, 0.0, 0.15, 0.6, 0.99);
    determinePoint(2, 0.85, 0.99, 0.6, 0.99);
}

// Function to draw the Sierpinski Gasket points. This algorithm is taken from the 
// Graphics book by Angel and Shreiner
function drawSierpinskiPoints() {
    context.save();

    // Starting Point - coefficients chosen at random
    let pt1X = 0.3 * pointX[0] + 0.5 * pointX[1] + 0.2 * pointX[2];
    let pt1Y = 0.3 * pointY[0] + 0.5 * pointY[1] + 0.2 * pointY[2];
    let pt2X, pt2Y;
    context.strokeStyle = "blue";
    context.beginPath();

    let noSierPoints = 100000;
    for (let i = 0; i < noSierPoints; ++i) {
        let j = Math.floor(Math.random() * 3);
        pt2X = (pt1X + pointX[j]) / 2;
        pt2Y = (pt1Y + pointY[j]) / 2;
        context.moveTo(pt2X, pt2Y);
        context.lineTo(pt2X + 1, pt2Y + 1);
        pt1X = pt2X;
        pt1Y = pt2Y;
    }

    context.stroke();
    context.restore();
}