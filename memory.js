//Global Variables

//Time that increments in the game
var timerId = 0,
    time = 0;

//arrays with letters in them.
var lettersSmall  = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E'],
    lettersMedium = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E',
                     'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J'],
    lettersLarge  = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E',
                     'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J',
                     'K', 'K', 'L', 'L', 'M', 'M', 'N', 'N', 'O', 'O',
                     'P', 'P', 'Q', 'Q', 'R', 'R', 'S', 'S', 'T', 'T'];

//array of letters. will change based on size of game.
var matchedletters = [];

//last card/letter you clicked on. comes from the letter divs.
var lastId = '',
    lastCard = '',
    counter = 0;

//Code In Here gets executed once code is ready. ie hovering, clicking events//
$(function() {
  $("#controls").children().bind("click", clickHandler);
});

function clickHandler() {
    if (this.id === "small") {
      chosenLetters = lettersSmall;
    } else if (this.id === "medium") {
      chosenLetters = lettersMedium;
    } else {
      chosenLetters = lettersLarge;
    }
    var shuffledArray = _.shuffle(chosenLetters);
    startGame(shuffledArray);
    startTime();
    updateTime();
    cardClick(shuffledArray);
    $("#controls").children().unbind("click");
    $("#controls").children().css('cursor', 'default');
}

// Initializes the game and creates the board
function startGame(lettersArray) {
  $.each(lettersArray, function(index, value) {
    var game = $("div#game");
    var div = document.createElement("div");
    var letter = document.createElement("span");
    $(letter).text(value);
    $(div).append(letter);
    $(div).attr("id", index);
    $(div).addClass("card");
    $(game).append(div);
    $(letter).hide();
  });
}

// Flips a card and checks for a match
function cardClick(lettersArray) {
  $(".card").click(function() {
    var currentId = $(this).attr('id');
    $(this).children().fadeIn('fast');
    counter += 1;
    // first attempt
    if (counter % 2 !== 0) {
      lastId = currentId;
      lastCard = $(this).children().text();
    } else {
    // second attempt
      secondAttemptCheckMatch($(this), lettersArray);
    }
  });
}

function secondAttemptCheckMatch(thisCard, lettersArray) {
  var currentId = thisCard.attr('id');
  if (thisCard.children().text() === lastCard && currentId !== lastId) {
    hovering(thisCard);
    matchedletters.push(currentId, lastId);
    checkWin(lettersArray);
  } else {
    // failed attempt
    lastIdTag = "#" + lastId;
    thisCard.children().delay(500).fadeOut();
    $(lastIdTag).children().delay(640).fadeOut();
  }
}

//Add hoverclass to cards.
function hovering(thisCard) {
  lastIdTag = "#" + lastId;
  thisCard.addClass("hover");
  $(lastIdTag).addClass("hover");
  thisCard.off('click');
  $(lastIdTag).off('click');
  thisCard.css('cursor', 'default');
  $(lastIdTag).css('cursor', 'default');
}

//Start the timer
function startTime() {
  $("#timer").text("Counting: " + time + " sec");
}

//Increment the timer and display the new time
function updateTime() {
  timerId = setInterval(function() {
    time += 1;
    $("#timer").text("Counting: " + time + " sec");
  }, 1000);
}

function checkWin(lettersArray) {
  if (lettersArray.length === matchedletters.length) {
    clearInterval(timerId);
    $("#game").children().addClass("won");
    $("#footer").append("<button class='btn' id='restart'>Restart Game</button>");
    $("#restart").click(function() {
        restartGame();
    });
  }
}

function restartGame() {
  $("#controls").children().bind("click", clickHandler);
  $("#controls").children().css("cursor", "pointer");
  $("#game").empty();
  $("#restart").remove();
  time = 0;
  matchedletters = [];
  startTime();
}