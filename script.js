'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

let scores;
let currentScore;
let activePlayer;
let playing;

const init = function () {
  //Starting condition
  score0El.textContent = 0;
  score1El.textContent = 0;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  dice.classList.add('hidden');
  document.querySelector('.player--0').classList.remove('player--winner');

  document.querySelector('.player--1').classList.remove('player--winner');

  document.querySelector('.player--1').classList.remove('player--active');

  document.querySelector(`.player--0`).classList.add('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  activePlayer = activePlayer === 1 ? 0 : 1;
  console.log(`active player in switcher is ${activePlayer}`);
  currentScore = 0;
};

//Rolling dice functionnality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //Generate a random number
    let number = Math.trunc(Math.random() * 6) + 1;
    //Display dice
    dice.src = `dice-${number}.png`;
    dice.classList.remove('hidden');

    //Checked dice value. if 1 switch to next player else add to the current score
    if (number === 1) {
      //switch player
      console.log(`active player is ${activePlayer}`);
      switchPlayer();
    } else {
      currentScore += number;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

//Holding current score functionnality
btnHold.addEventListener('click', function () {
  if (playing) {
    //Update total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      console.log(`Player ${activePlayer + 1} wins`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player-active');
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      currentScore = 0;

      //Finish the game
      playing = false;
      dice.classList.add('hidden');
    } else {
      //Switching player
      console.log(`active player is ${activePlayer}`);
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
