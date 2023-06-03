const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

/*
async function start() {
  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  console.log('You entered: ' + secretNumber);
  // Now try and complete the program.
    
  process.exit();
} */


async function start() {
  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  console.log('You entered: ' + secretNumber);
  // Now try and complete the program.
    
  let startGame = await ask("Are you ready to play? Y or N \n");
  if(startGame === "N" || startGame === "n"){
    console.log("Game Ended.");
    process.exit()

     // ?! idk why this isn't working 
  // } else if(startGame != "Y" || startGame != "y"){
  //   console.log("Invalid Answer. Game ended.")
  //   process.exit()

  } else{
    
    let rangeHigh = 100;
    let rangeLow = 1;
    let guess = Math.round((rangeLow + rangeHigh) / 2);
    let userResponse = await ask(`Is your number ${guess}? Y or N \n`)

    while(userResponse == "N" || userResponse == "n" ){
        let rangeModifer = await ask("Is your number lower or higher? L or H \n")
          if(rangeHigh - rangeLow == 1){
            console.log(`Wait a second! How can your number be higher than ${rangeLow} and lower than ${rangeHigh}?`);
            console.log("No cheating allowed. The game has ended.");
            process.exit();
          }
          if(rangeModifer == "L" || rangeModifer == "l"){
            rangeHigh = guess;
            rangeLow = rangeLow;
            guess = Math.round((rangeLow + rangeHigh) / 2);
            userResponse = await ask(`Is your number ${guess}? Y or N \n`)
          } else {
            rangeHigh = rangeHigh;
            rangeLow = guess;
            guess = Math.round((rangeLow + rangeHigh) / 2);
            userResponse = await ask(`Is your number ${guess}? Y or N \n`)
          }
  } // closes while
    console.log(`I guessed your number, ${guess}!`);


  } // closes else for starting the game 

  process.exit();
} // closes async start function 