const selectedCards = {
  firstCard: null,
  secondCard: null,
  count: 0,
  matchCount: 0,
};

let lock = false;

document.querySelectorAll(".cards").forEach((card) => {
  card.addEventListener("click", () => {
    if (lock) return;
    if (card.getAttribute("data-flipped")) return;
    flipCard(card);
    card.setAttribute("data-flipped", true);

    if (selectedCards.firstCard === null) {
      selectedCards.firstCard = card;
    } else {
      selectedCards.secondCard = card;
    }
    selectedCards.count++;

    if (selectedCards.count === 2) checkMatch();
  });
});

const checkMatch = () => {
  lock = true;

  selectedCards.count = 0;
  if (
    selectedCards.firstCard.getAttribute("data-value") ===
    selectedCards.secondCard.getAttribute("data-value")
  ) {
    selectedCards.matchCount++;
    selectedCards.firstCard.setAttribute("data-flipped", true);
    selectedCards.secondCard.setAttribute("data-flipped", true);
    selectedCards.firstCard = null;
    selectedCards.secondCard = null;
    lock = false;

    if (selectedCards.matchCount == 8) {
      document.getElementById("youWon").classList.remove("hidden");
    }
  } else {
    setTimeout(() => {
      selectedCards.firstCard.removeAttribute("data-flipped");
      selectedCards.secondCard.removeAttribute("data-flipped");
      unflipCard(selectedCards.firstCard);
      unflipCard(selectedCards.secondCard);
      selectedCards.firstCard = null;
      selectedCards.secondCard = null;
      lock = false;
    }, 500);
  }
};

const flipCard = (element) => {
  element.style.transform = "rotateY(180deg)";
  element.style.backgroundImage = `url(${element.getAttribute("data-value")})`;
};

const unflipCard = (element) => {
  element.style.transform = "rotateY(0deg)";
  element.style.backgroundImage = `url(./assets/bg.jpg)`;
};

const start = () => {
  selectedCards.firstCard = null;
  selectedCards.secondCard = null;
  selectedCards.count = 0;
  selectedCards.matchCount = 0;

  for (let i = 1; i <= 16; i++) {
    const card = document.getElementById(`card${i}`);
    card.removeAttribute("data-flipped");
    unflipCard(card);
  }

  const values = generateValues();

  // Assign the values to the cards
  for (let i = 1; i <= 16; i++) {
    const card = document.getElementById(`card${i}`);

    card.setAttribute("data-value", values[i - 1].link);
  }
};
start();

document.getElementById("playAgain").addEventListener("click", () => {
  document.getElementById("youWon").classList.add("hidden");
  start();
});
