var canvas = document.getElementById("hola");
var ctx = canvas.getContext("2d");		
var input = "";


function othername() {
input = document.getElementById("userInput").value;    
} 

var instrucciones = "toca dos cartas y encuentra las que son iguales"+  "\n" + "si lo logras, podrás escuchar si signoficado en francés" 

console.log(canvas.width);
console.log(canvas.height);
//obtener el ancho de la pantalla
canvas.width = 60
function draw() {      			
	ctx.fillStyle = 'white';
	ctx.font = "17pt Serif";
	ctx.fillText("¡Hola! "+  input + instrucciones, 0, 20); 
}
draw();