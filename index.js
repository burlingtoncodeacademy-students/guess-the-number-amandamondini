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
  if(startGame == "N" || startGame == "n"){
    console.log("Game Ended.");
    process.exit()
  } else {
    let guess = Math.floor(Math.random() * 100) + 1;
    let userResponse = await ask(`Is your number ${guess}? Y or N \n`)
       while(userResponse == "N" || userResponse == "n" ){
        let range = await ask("Is your number lower or higher? L or H \n")
          if(range == "L" || range == "l"){
            guess = Math.round(guess/2);
            userResponse = await ask(`Is your number ${guess}? Y or N \n`)
          } else {
            guess = Math.round(guess*1.5);
            userResponse = await ask(`Is your number ${guess}? Y or N \n`)
          }

  } // closes while

  console.log("I guessed your number.")

} // closes else 
  process.exit();
} // closes async start function 