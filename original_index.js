const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

async function start() {
    console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
    
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
    
    let userRangeLow =  await ask("Please set the starting number range for the game. It can be any number greater than 1. For example: 1 to 100 or 26 to 100.\n");
    console.log(`The range for the game will be ${userRangeLow} to 100.`);
    let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
    console.log('You entered: ' + secretNumber);  

    let rangeHigh = 100;
    let rangeLow = Number(userRangeLow);
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
} // closes async start function 