const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

async function start() {
  console.log("Let's play a guessing game, where one of us makes up a number and the other tries to guess it.");
  console.log("Select 1 or 2 to choose your game:");
  console.log("Option 1: You (human) make up a number and I (computer) try to guess it.");
  let gameOption = await ask("Option 2: I (computer) make up a number and you (human) try to guess it.\n");
  gameOption = Number(gameOption);

  if(gameOption === 1){  

    let startGame = await ask("Are you ready to play? Y or N \n");
    if(startGame === "N" || startGame === "n"){
      console.log("Game Ended.");
      process.exit()

      // ! idk why my not equal conditoinal isn't working 
      // } else if(startGame === !"Y" || startGame === !"y"){
      //   console.log("Invalid Answer. Game ended.");
      //   process.exit()

    } else{

    let playAgain = "Y";

    while(playAgain === "Y" || playAgain === "y"){
    
    let userRangeHigh =  await ask("Please set the high range for the game. It can be any number greater than 1. For example: 1 to 50 or 1 to 250.\n");
    console.log(`The range for the game will be 1 to ${userRangeHigh}.`);
    let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
    console.log('You entered: ' + secretNumber);  

    let rangeHigh = Number(userRangeHigh);
    let rangeLow = 0;
    let numberOfTries = [];
    let guess = Math.round((rangeLow + rangeHigh) / 2);
    let userResponse = await ask(`Is your number ${guess}? Y or N \n`)
    numberOfTries.push(guess);
    playAgain = "";

      while(userResponse === "N" || userResponse === "n" ){
          let rangeModifer = await ask("Is your number lower or higher? L or H \n")
            if(rangeHigh - rangeLow == 1){
              console.log(`Wait a second! How can your number be higher than ${rangeLow} and lower than ${rangeHigh}?`);
              console.log("No cheating allowed. This game has ended.");
              process.exit();
            
            } else if(rangeModifer == "L" || rangeModifer == "l"){
              rangeHigh = guess;
              rangeLow = rangeLow;
              guess = Math.round((rangeLow + rangeHigh) / 2);
              numberOfTries.push(guess);
              userResponse = await ask(`Is your number ${guess}? Y or N \n`)
              
            } else {
              rangeHigh = rangeHigh;
              rangeLow = guess;
              guess = Math.round((rangeLow + rangeHigh) / 2);
              numberOfTries.push(guess);
              userResponse = await ask(`Is your number ${guess}? Y or N \n`)

            } 

      } // closes second while loop where player is responding Y/N, H/L
    
      console.log(`I guessed your number, ${guess}!`);
      console.log(`It took me ${numberOfTries.length} tries to guess your number correctly.`)
      playAgain = await ask(`Do you want to play again? Y or N \n`);

    } // closes second while loop for playing again 

} //closes else for starting the first game 

  console.log("Game Ended");
  process.exit();
} // closes option 1

// ! Starts code for "reverse game" 

else {
  
  let playAgain = "Y";
        
      while(playAgain === "Y" || playAgain === "y"){
  
          let secretNumber = Math.floor(Math.random()*100) +1;
          let numberOfTries = [];
          console.log("Pick a number between 1 and 100.");
          let humanGuess = await ask("What is your first guess? \n");
          numberOfTries.push(humanGuess);
          playAgain = "";
          
          while(humanGuess != secretNumber){
              if(humanGuess == secretNumber){
                  console.log(`You guessed my number correct! It's ${secretNumber}.`);
                  playAgain = await ask(`Do you want to play again? Y or N \n`);
              } else if (humanGuess < secretNumber){
                  humanGuess = await ask(`My number is higher than ${humanGuess}. Guess again. \n`);
                  numberOfTries.push(humanGuess);
              } else if(humanGuess > secretNumber){
                  humanGuess = await ask(`My number is lower than ${humanGuess}. Guess again. \n`);
                  numberOfTries.push(humanGuess);
              } else {
  
              }
          } // closes 2nd while loop
    
            console.log(`You guessed my number correct! It's ${secretNumber}.`);
            console.log(`It took you ${numberOfTries.length} tries to guess correctly.`);
            playAgain = await ask(`Do you want to play again? Y or N \n`);
        
        } // closes first while loop 
    
        } // closes else for starting option 2 game 
        
        console.log("Game Ended");
        process.exit();

} // closes async function 
