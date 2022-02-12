var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStart = false;
var level = 0;
$(document).keypress(function() {
  if (gameStart == false) {
    nextSequence();
    gameStart = true;
  }

});
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  $("#" + randomChosenColor).fadeOut(50).fadeIn(50);
  playSound(randomChosenColor);
  $("h1").text("Level " + level);
  gamePattern.push(randomChosenColor);
  userClickedPattern = [];
  level++;
}
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  if(gameStart)
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("success");
    if(userClickedPattern.length == gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  }
  else {
    console.log("wrong");
    gameReset();
  }
}
function gameReset() {
  level = 0;
  gamePattern = [];
  gameStart = false;
  var lossSound = new Audio("sounds/wrong.mp3");
  lossSound.play();
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 500);
  setTimeout(function() {
    $("h1").text("Press Any Key to Restart");
  }, 500);
}
