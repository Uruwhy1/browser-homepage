document.addEventListener("DOMContentLoaded", () => {
  const flipButton = document.querySelector(".coin-flip");
  const heads = document.querySelector(".side-b");
  const tails = document.querySelector(".side-a");

  let lastWinner = "Heads";

  flipButton.addEventListener("click", () => {
    const result = flipCoin();
    lastWinner = result;

    // Reset animation
    heads.style.animation = "none";
    tails.style.animation = "none";

    setTimeout(() => {
      heads.style.animation = "";
      tails.style.animation = "";

      headsFlip(result)

      heads.style.animation = "flipHeads 0.7s 2 linear";
      tails.style.animation = "flipTails 0.7s 2 linear";
    }, 10); // start

    setTimeout(() => {
      tailsFlip(result)
    }, 360); // half/2 duration

    setTimeout(() => {
      headsFlip(result)
    }, 710); // half duration

    setTimeout(() => {
      tailsFlip(result)
    }, 1060); // half+(half/2) duration

    setTimeout(() => {
      headsFlip(result)
    }, 1410); // end
  });

  function flipCoin() {
    const random = Math.random();
    return random < 0.5 ? "Heads" : "Tails";
  }

  function tailsFlip() {
    if (lastWinner == "Tails") {
      heads.style.zIndex = "99";
      tails.style.zIndex = "0";
    } else {
      tails.style.zIndex = "99";
      heads.style.zIndex = "0";
    }
  }

  function headsFlip(result) {
    if (result == "Heads") {
      heads.style.zIndex = "99";
      tails.style.zIndex = "0";
    } else {
      tails.style.zIndex = "99";
      heads.style.zIndex = "0";
    }
  }
});
