import '../assets/style/style.scss';

//Patron de colores
let colors=['red','blue','green','yellow'];




//patron del juego
let gameP = []; //creamos un arreglo para guardar el patron del juego
//patron de click
let gameClicksP=[];

//Funcion para iniciar el juego
let start = false;
let level = 0;

//Evento para registrar tecla y que inicie el juego
$(document).keydown(function(){
  if(!start){
   $('#level-title').text('Level ' + level);
   start=true;
   nextSequence();
}
});
//Evento al que el usuario le dio click
$('.container__row__btn').click(function (){
  let userColor =$(this).attr('id');
 gameClicksP.push(userColor);

 playSound(userColor); 

  //llamar a la funcion
  animateClick(userColor);
   //llamar a la funcion 
   checkAnswer(gameClicksP.length -1);
});
//funcion para crear secuencia del juego
function nextSequence() {
  //reiniciar clicks
  gameClicksP=[];
  //actualizar nivel
  level++
  $('#level-title').text('Level ' + level);
   
  //numeros aleatorios
  let numerosAleatorios = Math.random()*4;
  numerosAleatorios =Math.floor(numerosAleatorios);//redondea los numeros aleatorios

  
  //usar numero aleatorio para llamar el boton selecionado
  let randomColor;
  randomColor =colors[numerosAleatorios];
   //Almacenar el numero en el patron
  //agrega elementos 
  gameP.push(randomColor);
  //fade es una animacion de jquery para aparecer y desaparecer segun el tiempo dado
  $('#' + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);

  //llamar el sonido
  playSound(randomColor);
  
}

//Funcion para confirmar los clicks del usuario
function checkAnswer(currentLevel) {

  if (gameP[currentLevel]===gameClicksP[currentLevel])
  {
    if (gameP.length===gameClicksP.length) {
      setTimeout(()=>{
        nextSequence();
      },500) 
    }
  }else{
    //mostrar sonido de error
    playSound('wrong')
//Click para finalizar juego
    $('body').addClass('game-over');


      //cambiar titulo para poder reiniciar
    $('#level-title').text('Game Over, Please restart!');
     //quitar clase agregada
  setTimeout(() =>{
    $('body').removeClass('game-over');
  },400)
  
   
    //llamar funcion para reiniciar el juego 
    startOver();

  }
  
}



//funcion para emular sonido
function playSound(color){
  let audio = new Audio('../assets/sounds/' + color + '.mp3');
  audio.play();
}
//funcion para animar el click
function animateClick(userColor) {
  $('#' + userColor).addClass('pressed');
  //quitar clase agregada
  setTimeout(() =>{
    $('#' + userColor).removeClass('pressed');
  },100)
  
}

//Funcion para reiniciar el juego
 function startOver() {
  level = 0;
  gameP = [];
  start = false;
 }