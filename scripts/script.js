const selectedCards = {
  firstCard: null,
  secondCard: null,
  count: 0,
};

let lock = false;

document.querySelectorAll(".cards").forEach((card) => {
  card.addEventListener("click", () => {
    if (lock) return;
    flipCard(card);

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
    console.log("match");
    selectedCards.firstCard = null;
    selectedCards.secondCard = null;
    lock = false;
  } else {
    setTimeout(() => {
      unflipCard(selectedCards.firstCard);
      unflipCard(selectedCards.secondCard);
      selectedCards.firstCard = null;
      selectedCards.secondCard = null;
      lock = false;
    }, 1000);
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
  const values = generateValues();

  // Assign the values to the cards
  for (let i = 1; i <= 16; i++) {
    const card = document.getElementById(`card${i}`);

    card.setAttribute("data-value", values[i - 1].link);
  }
};
start();
