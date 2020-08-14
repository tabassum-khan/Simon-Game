var buttonColors = ['green', 'red', 'blue', 'yellow'];

var gamePattern = [];
var userClickedPattern = [];

var start = false;
var level = 0;
var score = 0;
var hs = 0;

$(document).keypress(function () {

    console.log("ON keypress");

    if (!start){
        
        $('h1').css("display", "none");
        $('.title').css("display", "flex");
        $('.score').text("Score: " + score);

        nextSequence();

        start = true;
    }

});


function nextSequence() {

    console.log("NEXT SEQUENCE()");

    userClickedPattern = [];

    $('.level').text("Level: " + ++level);
   
    var rand = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[rand];

    if (gamePattern.length === 0){
        setTimeout(function (){

            gamePattern.push(randomChosenColour);
            playSound(randomChosenColour);
            flash(randomChosenColour);
            
        }, 1000);
    }
    else{
        gamePattern.push(randomChosenColour);
        playSound(randomChosenColour);
        flash(randomChosenColour);
    }

    changeText("PLAY");
    
    console.log("Game Pattern: " + gamePattern);

}

$('.btn').click(function () {

    console.log("ON CLICK");

    var userColor = $(this).attr("id");

    userClickedPattern.push(userColor);
    console.log("User Pattern: " + userClickedPattern);

    playSound(userColor);
    flash(userColor);

    checkAnswer();

});

function checkAnswer(){

    console.log("CHECK ANSWER()");
    
    var l = userClickedPattern.length - 1;
    console.log(l);
    if (userClickedPattern[l] === gamePattern[l]){
        if (userClickedPattern.length === gamePattern.length){
            score += 10;
            $('.score').text("Score: " + score);
            
            setTimeout(function () { 
                nextSequence();
              }, 1000);

            changeText("WATCH"); //will still execute before nextSequence() since it has to wait for 1000ms
        }
    }
    else{
        gameOver();
    }

}

function gameOver(){

    console.log("GAME OVER()");

    $('body').addClass('game-over');
    $('.center').addClass('game-over');
    playSound('wrong');

         setTimeout(function () {
            $("body").removeClass("game-over");
            $(".center").removeClass("game-over");
          }, 200);

    if (score > hs)
        hs = score;

    $('.level').text("Final Score: " + score);
    $('.score').text("Highest Score: " + hs);
    $('h1').css("display", "block"); 
    $('h1').text("Game Over! Press any key to Restart");
    $('.center p').text("SIMON");

    startOver();
}

function startOver(){

    console.log("START OVER()");

    start = false;
    gamePattern = [];
    level = 0;
    score = 0;
}

function flash(color) {

    console.log("FLASH()");

    $('.' + color).addClass('pressed');

    setTimeout(function () {
        $('.' + color).removeClass('pressed');
    }, 200);
}


function playSound(name) {

    console.log("PLAY SOUND()");

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function changeText(text){

    console.log("CHANGE TEXT()");

    $('.center p').text(text);
}