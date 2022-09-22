var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickerPattern = [];
var level = 0;
var start = false;

$(".container").addClass("visible-div");

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play();
}

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * buttonColours.length);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    $("#level-title").text("Level " + level);

    level++;
}

function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");

    setTimeout(function () {
        $("." + currentColor).removeClass("pressed");
    }, 100)
}

function startOver() {
    level = 0;
    start = false;
    gamePattern = [];
    userClickerPattern = [];
}

function checkAnswer(currentLevel) {
    if (userClickerPattern[currentLevel] === gamePattern[currentLevel]) {

        if (userClickerPattern.length === gamePattern.length) {

            setTimeout(() => {
                nextSequence();
            }, 1000);

            userClickerPattern = [];
        }

    } else {
        var audio = new Audio("sounds/wrong.mp3")
        audio.play();

        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)

        startOver();
    }
}

$(document).keydown(function () {
    if (start === false) {
        $(".container").removeClass("visible-div");
        nextSequence();
        start = true;
    }
})

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickerPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickerPattern.length - 1);
})






