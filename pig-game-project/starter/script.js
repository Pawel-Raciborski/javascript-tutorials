'use strict';

let currentScore;
let activePlayer;
let playing;
let scores;

// Selecting elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceElement = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;

    //check for rolled 1
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current0El.textContent = currentScore; // TODO change player ture
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function (e) {
  console.log(`Player: ${activePlayer}`);
  if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      // finish game
      playing = false;
      diceElement.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

const init = function () {
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  scores = [0, 0];

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  diceElement.classList.add('hidden');

  current0El.textContent = 0;
  current1El.textContent = 0;

  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');

  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
};
init();

btnNew.addEventListener('click', init);
