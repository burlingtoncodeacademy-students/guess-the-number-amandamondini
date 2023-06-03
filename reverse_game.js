const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

async function start() {
console.log("Let's play a game where I (computer) make up a number between 1 and 100 and you (human) try to guess it.")
let startGame = await ask("Are you ready to play? Y or N \n");
if(startGame === "N" || startGame === "n"){
    console.log("Game Ended");
    process.exit()
} else {    
    
    let playAgain = "Y";
    
    while(playAgain === "Y" || playAgain === "y"){

        let secretNumber = Math.floor(Math.random()*100) +1;
        console.log("computer secret number is: " +secretNumber);
        let humanGuess = await ask("What is your first guess? \n");
        playAgain = "";
        
        while(humanGuess != secretNumber){
            if(humanGuess == secretNumber){
                console.log(`You guessed my number correct! It's ${secretNumber}`);
                playAgain = await ask(`Do you want to play again? Y or N \n`);
            } else if (humanGuess < secretNumber){
                humanGuess = await ask(`My number is higher than ${humanGuess}. Guess again. \n`);
            } else if(humanGuess > secretNumber){
                humanGuess = await ask(`My number is lower than ${humanGuess}. Guess again. \n`);
            } else {

            }
        } // closes 2nd while loop

        console.log(`You guessed my number correct! It's ${secretNumber}`);
        playAgain = await ask(`Do you want to play again? Y or N \n`);
    
    } // closes first while loop 

    } // closes else for starting the game 
    console.log("Game Ended");
    process.exit();
} // closes async function