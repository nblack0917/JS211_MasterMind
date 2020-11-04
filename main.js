'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
let guessNum  = 0;

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
    letters.splice(randomIndex, 1)
    // console.log(letters)
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = (guess) =>  {
  // your code here
  let guessArray = guess.split('');
  // console.log(guessArray)
  let solutionArray = solution.split('');
  // console.log(solutionArray)
  let correctLetterLocations = 0;
  let correctLetters = 0;
  for (let i = 0; i < 4; i++) {
    if (guessArray[i] == solutionArray[i]) {
      correctLetterLocations++
      solutionArray[i] = null
      // console.log(solutionArray)
    }
  }
  for (let x = 0; x < 4; x++) {
    let targetIndex = solutionArray.indexOf(guessArray[x])
    // console.log(guessArray[x])
    // console.log(targetIndex)
    if (targetIndex > -1) {
      correctLetters++
      // console.log(solution)
      // console.log(guess)
      solutionArray[targetIndex] = null;
      // console.log(solutionArray)
    }
  }
  let hint = correctLetterLocations + "-" + correctLetters
  guessNum++
  board.push(`Guess #${guessNum}: ${guess}: ${hint}`)
  return hint
}

const mastermind = (guess) => {
  // solution = 'abcd'; // Comment this out to generate a random solution
  // your code here
  if (guess == solution) {
    console.log('You guessed it!')
    return 'You guessed it!'
  } else if (board.length < 10) {
    console.log(`Guess again.`)
  } else {
    console.log(`You ran out of turns! The solution was ${solution}. Otherwise, return 'Guess again.`)
  }
  console.log(generateHint(guess))
}

const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}