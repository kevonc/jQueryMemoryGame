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
var letters;

//last card/letter you clicked on. comes from the letter divs.
var lastId = '',
    lastCard = '',
    counter = 0;

//Code In Here gets executed once code is ready. ie hovering, clicking events//
$(function() {
  $("#small").click(function() {
    var shuffledArray = _.shuffle(lettersSmall);
    startGame(shuffledArray);
    startTime();
    updateTime();
    cardClick(shuffledArray);
  });
  $("#medium").click(function() {
    var shuffledArray = _.shuffle(lettersMedium);
    startGame(shuffledArray);
    cardClick(shuffledArray);
  });
  $("#large").click(function() {
    var shuffledArray = _.shuffle(lettersLarge);
    startGame(shuffledArray);
    cardClick(shuffledArray);
  });
});

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
    console.log(div);
  });
}

// Flips a card and checks for a match
function cardClick(lettersArray) {
  $(".card").click(function() {
    var currentId = $(this).attr('id');
    $(this).children().fadeIn('fast');
    console.log(this);
    counter += 1;
    // first attempt
    if (counter % 2 !== 0) {
      lastId = currentId;
      lastCard = $(this).children().text();
      console.log("Counter: " + counter);
    } else { // second attempt
      // same letters revealed
      if ($(this).children().text() === lastCard && currentId !== lastId) {
        hovering($(this));
      } else { // failed attempt to match
        lastIdTag = "#" + lastId;
        $(this).children().delay(500).fadeOut();
        $(lastIdTag).children().delay(640).fadeOut();
        lastId = '';
        lastCard = '';
      }
      console.log("Counter: " + counter);
    }
  });
}

//Add hoverclass to cards.
function hovering(thisCard) {
  lastIdTag = "#" + lastId;
  thisCard.addClass("hover");
  $(lastIdTag).addClass("hover");
  thisCard.unbind('click');
  $(lastIdTag).unbind('click');
  thisCard.css('cursor', 'default');
  $(lastIdTag).css('cursor', 'default');
}

//Start the timer
function startTime() {
  $("#timer").text("Counting: " + time + " sec");
}

//Increment the timer and display the new time
function updateTime() {
  setInterval(function() {
    time += 1;
    $("#timer").text("Counting: " + time + " sec");
  }, 1000);
}