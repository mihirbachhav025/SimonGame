var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var counter = false;
var level = 0;

$(document).keypress(function() {
  if (counter == false) {
    $("#level-title").text("Level " + level);
    nextSequence();
    counter = true;
  }
});

$(".btn").on("click", function() {
  var userChosenColour = $(this).attr("id"); //vs ths.id if elemnt has no id will return undefined whereas thisid will return random values:stackoverflow
  //  console.log(userChosenColour);
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  // console.log(userCickedPattern);
  playSound(userChosenColour);
  //game logic
  checkAnswer(userClickedPattern.length - 1)
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("suceess");
    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextSequence();
      }, 1000);
    } else {
      console.log("failed");
      playSound(wrong);
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");

      }, 200);
      $("h1").text("Game Over, Press Any Key to Restart");
      startover();
    }
  }
}

function nextSequence() {
  userClickedPattern = [];
  $("h1").text("level   " + level);
  level += 1;
  var randomNumber = Math.floor((Math.random() * 3) + 1);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  // var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  // audio.play();

}



function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed")
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed")
  }, 100);
}




  function startOver() {


    level = 0;
    gamePattern = [];
    counter = false;
  }
