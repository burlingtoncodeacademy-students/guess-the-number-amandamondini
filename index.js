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

    } else{
    let playAgain = "Y"; // sets playAgain variable to an initial value of Y so we can enter the while loop for playing the game again until the user resets the value
    
    // while loop so that the user can choose to play the game again or not
    while(playAgain === "Y" || playAgain === "y"){
    
    // initial questions for user to set the game up  
    let userRangeHigh =  await ask("Please set the high range for the game. It can be any number greater than 1. For example: 1 to 50 or 1 to 250.\n");
    console.log(`The range for the game will be 1 to ${userRangeHigh}.`);
    let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
    console.log('You entered: ' + secretNumber);  
    
    // setting the initial values to variables used throughout the game and in the second while loop below
    let rangeHigh = Number(userRangeHigh);
    let rangeLow = 0;
    let numberOfTries = []; // empty array that we will later .push() guesses into so that we can keep track of how many gueses the user had
    let guess = Math.round((rangeLow + rangeHigh) / 2); // computer's first guess based on initial high range set by user
    let userResponse = await ask(`Is your number ${guess}? Y or N \n`) 
    numberOfTries.push(guess);
    playAgain = "";  

      // while loop for playing the game where computer guesses the number. Keep guessing while user responds with "N" for if the computer guessed correctly or not
      while(userResponse === "N" || userResponse === "n" ){
          let rangeModifer = await ask("Is your number lower or higher? L or H \n")
            // if statement is the cheat detector which exits the game completley 
            if(rangeHigh - rangeLow == 1){
              console.log(`Wait a second! How can your number be higher than ${rangeLow} and lower than ${rangeHigh}?`);
              console.log("No cheating allowed. This game has ended.");
              process.exit();

            // else if statement for when user respnds that their number is lower than the computer guess. The logic will set the computer guess to be the high-end of the range and make a new guess based off the updated range
            } else if(rangeModifer == "L" || rangeModifer == "l"){
              rangeHigh = guess;
              rangeLow = rangeLow;
              guess = Math.round((rangeLow + rangeHigh) / 2);
              numberOfTries.push(guess);
              userResponse = await ask(`Is your number ${guess}? Y or N \n`)

            // else statement for when user responds that their number is lower than the computer guess. The logic will set the computer guess to be the low-end of the range and make a new guess based off the updated range 
            } else {
              rangeHigh = rangeHigh;
              rangeLow = guess;
              guess = Math.round((rangeLow + rangeHigh) / 2);
              numberOfTries.push(guess);
              userResponse = await ask(`Is your number ${guess}? Y or N \n`)

            } 

      } // closes second while loop where player is responding Y/N, H/L
    
      // logs messages to the user once the while loop has been exited which means the computer has guessed the number
      console.log(`I guessed your number, ${guess}!`);
      console.log(`It took me ${numberOfTries.length} tries to guess your number correctly.`)
      playAgain = await ask(`Do you want to play again? Y or N \n`);

    } // closes second while loop for playing the game again 

} //closes else statement for starting the first game 

  console.log("Game Ended");
  process.exit();
} // closes game option 1 (computer guessing)

// ! Starts code for "reverse game" which is option 2 for the user when they call node index.js

else {
  
  let playAgain = "Y";
      
      // while loop so that the user can choose to play the game again or not  
      while(playAgain === "Y" || playAgain === "y"){
  
          let secretNumber = Math.floor(Math.random()*100) +1; // computer picking a number for the human to guess
          let numberOfTries = []; // empty array that we will later .push() guesses into so that we can keep track of how many gueses the computer had
          console.log("Pick a number between 1 and 100.");
          let humanGuess = await ask("What is your first guess? \n"); // gets the first guess from the human and sets it to the variable humanGuess
          numberOfTries.push(humanGuess);
          playAgain = "";
          
          // starts the while loop for playing the game 
          while(humanGuess != secretNumber){
              // if statement will exit the while loop once the human guesses the computer's secret number and ask human if they want to play again
              if(humanGuess == secretNumber){
                  console.log(`You guessed my number correct! It's ${secretNumber}.`);
                  playAgain = await ask(`Do you want to play again? Y or N \n`);

              // else if statement shows the user a message for when their guess is higher than the computer's secret number
              } else if (humanGuess < secretNumber){
                  humanGuess = await ask(`My number is higher than ${humanGuess}. Guess again. \n`);
                  numberOfTries.push(humanGuess);

              // else if statement shows the user a message for when their guess is lower than the computer's secret number
              } else if(humanGuess > secretNumber){
                  humanGuess = await ask(`My number is lower than ${humanGuess}. Guess again. \n`);
                  numberOfTries.push(humanGuess);
              } else {
  
              }
          } // closes 2nd while loop where the human is guessing and computer is responding higher or lower

            //logs messages to the user once the while loop has exited which means the human guessed the secret Number correctly
            console.log(`You guessed my number correct! It's ${secretNumber}.`);
            console.log(`It took you ${numberOfTries.length} tries to guess correctly.`);
            playAgain = await ask(`Do you want to play again? Y or N \n`);
        
        } // closes first while loop for playing the game again
    
        } // closes else for starting option 2 game (human guessing)
        
        console.log("Game Ended");
        process.exit();

} // closes async function start()
