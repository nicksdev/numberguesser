
// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min,max),
    guessesLeft = 3;


// UI Elements\
const   game = document.querySelector('#game'),
        minNum = document.querySelector('.min-num'),
        maxNum = document.querySelector('.max-num'),
        guessBtn = document.querySelector('#guess-btn'),
        guessInput = document.querySelector('#guess-input'),
        message = document.querySelector('.message');


// Assign UI Min and Max
minNum.textContent = min;
maxNum.textContent = max;


// Play Again Event Listener
game.addEventListener('mousedown', function(e) {
   if(e.target.className === 'play-again'){
       window.location.reload();
   }
});




//Listen for Guess
guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);

    //Validate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage('Please enter a number between ' + min + ' and ' + max, 'red');
    }
    //Check if Won
    if (guess === winningNum) {
        //Game Over Won
        gameOver(true, winningNum + ' is correct, You Win!');
    } else {
        // Wrong Number
        guessesLeft  -= 1;

        if(guessesLeft === 0){
            //Game Over
            gameOver(false, 'Game Over, you lost. The correct number was ' + winningNum);
        } else {
            //Game continues - answer wrong
            // Change border color
            guessInput.style.borderColor = 'red';
            // Set Message wrong answer
            setMessage(guess + ' is not correct, ' + guessesLeft + ' guesses left', 'red');
            //Clear Input
            guessInput.value = '';
        }
    }
});


// Game Over
function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';

    //Disable Input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = color;
    // Set Message winning
    setMessage(msg, color);

    // Play again?
    guessBtn .value = 'Play Again';
    guessBtn.className += 'play-again';


}

function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

// Set Message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}