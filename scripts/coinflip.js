document.addEventListener("DOMContentLoaded", () => {
  const flipButton = document.querySelector(".coin-flip");
  const heads = document.querySelector(".side-b");
  const tails = document.querySelector(".side-a");

  let lastWinner = "Heads";

  flipButton.addEventListener("click", startCoinSequence);

  function startCoinSequence() {
    const result = flipCoin();
    lastWinner = result;

    // Reset animation
    heads.style.animation = "none";
    tails.style.animation = "none";
    flipButton.style.animation = "none";

    // Call the animation function
    animation(result);
  }

  function flipCoin() {
    const random = Math.random();
    return random < 0.5 ? "Heads" : "Tails";
  }

  function tailsFlip(result) {
    if (result == "Tails") {
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

  function toggleCenterElem(elem, shouldCenter) {
    if (shouldCenter) {
      elem.style.width = "100vw";
      elem.style.height = "100vh";
      elem.style.right = "0";
      elem.style.top = "0";

      elem.style.backdropFilter = "brightness(20%)";

      heads.style.height = "300px";
      heads.style.width = "300px";
      tails.style.height = "300px";
      tails.style.width = "300px";
    } else {
      elem.style.width = "";
      elem.style.height = "";
      elem.style.right = "";
      elem.style.top = "";

      elem.style.backdropFilter = "";

      heads.style.height = "";
      heads.style.width = "";
      tails.style.height = "";
      tails.style.width = "";
    }
    elem.style.animation = "appear 0.2s linear";
  }

  function animation(result) {
    setTimeout(() => {
      heads.style.animation = "";
      tails.style.animation = "";

      toggleCenterElem(flipButton, true); // Center the flipButton
      headsFlip(result);

      heads.style.animation = "flip 0.7s 2 linear";
      tails.style.animation = "flip 0.7s 2 linear";
    }, 10); // start

    setTimeout(() => {
      tailsFlip(result);
    }, 360); // half/2 duration

    setTimeout(() => {
      headsFlip(result);
    }, 710); // half duration

    setTimeout(() => {
      tailsFlip(result);
    }, 1060); // half+(half/2) duration

    setTimeout(() => {
      headsFlip(result);
    }, 1410); // end

    setTimeout(() => {
      flipButton.style.animation = "dissapear 0.2s linear forwards";
    }, 2110); // 0.3 before end

    setTimeout(() => {
      toggleCenterElem(flipButton, false);
    }, 2510); // end + 1 second
  }

  // have to repeat a bit of code here as I can't import statements due to firefox security limitations :(
  const searchInput = document.getElementById("searchInput");
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      if (searchInput.value.toLowerCase() == "flip") {
        startCoinSequence();
        searchInput.value = "";
        return;
      }
    }
  });
});
