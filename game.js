var buttonColors = ['red','blue','green','yellow'];

var gamePattern = [];

var userClickedPattern = [];
var level = 0;

function nextSequence(){
  $('#level-title').text('Level ' + level);
  var randomNumber = Math.floor(Math.random() * (4 - 0)) + 0;
//  console.log(randomNumber);
  var randomChosenColor = buttonColors[randomNumber];
//  console.log(randomChosenColor);
  gamePattern.push(randomChosenColor);
//  console.log(gamePattern);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  level++;
}

var keyPressed = false;



$(document).keydown(function(){
  if(keyPressed === false){
    setTimeout(function () {
      nextSequence();
      keyPressed = true;
      $('#level-title').text('Level ' + 0);
    }, 600);
  }
});

function check(){
  var con = true;
  for(i = 0;i < userClickedPattern.length;i++){
    if(userClickedPattern[i] != gamePattern[i]){
      con = false;
      break;
    }
  }
  if(con === false){
    $('body').addClass('red');
    setTimeout(function () {
      $('body').removeClass('red');
    }, 100);
    playSound('wrong');
    keyPressed = false;
    gamePattern.length = 0;
    userClickedPattern.length = 0;
    level = 0;
    $('h1').text('Game Over, Press Any Key To Restart');
  }
  else{
    if(userClickedPattern.length === gamePattern.length){
      userClickedPattern.length = 0;
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
    else{

    }
  }
}

function playSound(color){
  var sound = new Audio('sounds/' + color + ".mp3");
  sound.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass('pressed');
  setTimeout(function(){
    $("#" + currentColor).removeClass('pressed');
  },100);
}


$('.btn').on('click',function(){
     var userChosenColor = this.id;
     userClickedPattern.push(userChosenColor);
    // console.log(userClickedPattern);
     animatePress(userChosenColor);
     playSound(userChosenColor);
     check();
});
