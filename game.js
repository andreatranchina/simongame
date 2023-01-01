var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

//start game
$(document).keydown(function() {
    if(started === false){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }//end if
});

//show sequence
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

$("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColor);

}

//user input sequence
$(".btn").on("click", function(event){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

//check answer
function checkAnswer(currentLevel){

    //check if most recent answer is the same as game pattern
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        //check that user has finished their sequence
        if(gamePattern.length === userClickedPattern.length){

            //call nextSequence() after 0.1 seconds
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }//end if
    }//end if

    else{
        console.log("wrong");
        var wrongAudio = new Audio ("sounds/wrong.mp3");
        wrongAudio.play();
        
        $("body").addClass("game-over"); //add class
        
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200); //remove class after 0.2seconds

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

//restart the game
function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

