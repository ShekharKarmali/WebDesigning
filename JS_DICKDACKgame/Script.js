console.log("Welcome to my first little project!!!!!!")

// document.querySelector('.dice').style.display = 'block';



var activePlayer, gamePlaying, currentScore, globalScore, Max;

init();

/**    Final Score input function   **/

document.querySelector('.final-score').addEventListener('click',function () {
    Max =document.querySelector('#target-score').value;
});

/***************    Start of Event Function    *************/

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        document.querySelector('#dice-1').style.display = 'block';
        document.querySelector('#dice-2').style.display = 'block';

        let dice1 = Math.floor(Math.random() * 6 + 1);
        document.querySelector('#dice-1').src = 'picture/dice-' + dice1 + '.png';

        let dice2 = Math.floor(Math.random() * 6 + 1);
        document.querySelector('#dice-2').src = 'picture/dice-' + dice2 + '.png';

        if (dice1 == 6 && dice2 === 6) {
            init();
        } else if (dice1 !== 1 && dice2 !== 1) {
            currentScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = currentScore;
        } else {
            document.querySelector('#target-score').value=0;
            nextPlayer();
        }
    }
});


/**   Next Function  */

function nextPlayer() {

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    globalScore = [0, 0];


    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';
}


/****************     Hold Function  ****************/

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        globalScore[activePlayer] += currentScore;
        document.querySelector('#score-' + activePlayer).textContent = globalScore[activePlayer];

        if (globalScore[activePlayer] >= Max) {
            document.querySelector('#name-' + activePlayer).textContent = "Winner!";
            document.querySelector('#dice-1').style.display = 'none';
            document.querySelector('#dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }
    }
});

/**************   New Game Button function *************/

document.querySelector('.btn-new').addEventListener('click', function () {
    gamePlaying = true;
    init();
});


function init() {

    gamePlaying = true;
    activePlayer = 0;
    globalScore = [0, 0];
    currentScore = 0;
    Max = 100;

    // document.querySelector('#target-score').value=0;
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
