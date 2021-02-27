
//alert("hello");

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function() {
  
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
  
});

$(".btn").click(function() {
  
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  
  playSound(userChosenColour);
  animatePress(userChosenColour);
  
  checkAnswer(userClickedPattern.length-1);
  
});

function checkAnswer(currentLevel){

//if the recent user answer is the same as the game pattern
    if (gamePattern[cucurrentLevel] === userClickedPattern[cucurrentLevel]) {
      
      console.log("success");
      
      if (userClickedPattern.length === gamePattern.length){
        
        setTimeout(function () {
          nextSequence();
        }, 1000);
        
      }
  
    } else {
      
      console.log("wrong");
      
      playSound("wrong");
      
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      
      $("#level-title").text("Game Over, Press Any Key to Restart");
      
      startOver();
      
    }
      
}

//to indicate color
function nextSequence(){
  
  userClickedPattern = [];
  
  level++;
  
  $("#level-title").text("Level " + level);
  
  var randomNumber = Math.floor(Math.random() * 4); //random no 0-3
  
  var randomChosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);
   
  
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor){
  
  //to add a pressed class
  $("#" + currentColor).addClass("pressed");
  
  //to remove the pressed class
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
  
}

function playSound(name) {
  
  //to add sound
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
  
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
