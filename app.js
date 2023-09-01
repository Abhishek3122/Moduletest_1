// Prevent animation on load
setTimeout(() => {
  document.body.classList.remove("preload");
}, 500);

// DOM
const btnRules = document.querySelector(".rules-btn");
const btnClose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");

const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];
const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");

const playAgainBtn = document.querySelector(".play-again");

const scoreNumber = document.querySelector(".score .score__number");
const aiScoreNumber = document.querySelector('.aiscore .score__number');
let score = parseInt(localStorage.getItem("score") ?? localStorage.setItem('score', 0));
let aiScore = parseInt(localStorage.getItem("aiScore") ?? localStorage.setItem('aiScore', 0));
scoreNumber.innerText = score;
aiScoreNumber.innerText = aiScore;
// Game Logic
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const aichoice = aiChoose();
  displayResults([choice, aichoice]);
  displayWinner([choice, aichoice]);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
        <div class="choice ${results[idx].name}">
          <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
        </div>
      `;
    }, idx * 1000);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());

    if (userWins) {
      resultText.innerText = "you win";
      resultDivs[0].classList.toggle("winner");
      keepScore(1, 0);
      document.querySelector('.next').classList.remove('hidden');
    } else if (aiWins) {
      resultText.innerText = "you lose";
      // resultDivs[1].classList.toggle("winner");
      keepScore(0, 1);
      resultDivs[1].classList.toggle("ai-winner");
      document.querySelector(".next").classList.add("hidden");
    } else {
      resultText.innerText = "draw";
      document.querySelector(".next").classList.add("hidden");
    }
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
  }, 1000);
}
// function displayWinner(results) {
//   setTimeout(() => {
//     const userWins = isWinner(results);
//     const aiWins = isWinner(results.reverse());

//     if (userWins) {
//       resultText.innerText = "you win";
//       resultDivs[0].classList.toggle("winner");
//       keepScore(1, 0);
//     } else if (aiWins) {
//       resultText.innerText = "you lose";
//       // resultDivs[1].classList.toggle("winner");
//       keepScore(0, 1);
//       resultDivs[1].classList.toggle("ai-winner"); 
//     } else {
//       resultText.innerText = "draw";
//     }
//     resultWinner.classList.toggle("hidden");
//     resultsDiv.classList.toggle("show-winner");
//   }, 1000);
// }
// function displayWinner(results) {
//   setTimeout(() => {
//     const userWins = isWinner(results);
//     const aiWins = isWinner(results.reverse());

//     if (userWins) {
//       resultText.innerText = "you win";
//       resultDivs[0].classList.toggle("winner");
//       keepScore(1, 0); // Increase user's score, no change to AI's score
//     } else if (aiWins) {
//       resultText.innerText = "you lose";
//       resultDivs[1].classList.toggle("winner");
//       keepScore(0, 1); // No change to user's score, increase AI's score
//     } else {
//       resultText.innerText = "draw";
//     }
//     resultWinner.classList.toggle("hidden");
//     resultsDiv.classList.toggle("show-winner");
//   }, 1000);
// }




function isWinner(results) {
  return results[0].beats === results[1].name;
}

// function keepScore(point,aipoint) {
//   score += point;
//   scoreNumber.innerText = score;
//   localStorage.setItem("score", score); // Store the score in local storage
// }
function keepScore(userPoint, aiPoint) {
  score += userPoint;
  aiScore += aiPoint;
  scoreNumber.innerText = score;
  aiScoreNumber.innerText = aiScore; // Update the AI's score display
  localStorage.setItem("score", score);
  localStorage.setItem("aiScore", aiScore);
}



// Play Again
playAgainBtn.addEventListener("click", () => {
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
});

// Show/Hide Rules
btnRules.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
btnClose.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});