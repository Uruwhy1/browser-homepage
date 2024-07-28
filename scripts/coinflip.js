document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;

  const flipButton = document.querySelector(".coin-flip");
  const heads = document.querySelector(".side-b");
  const tails = document.querySelector(".side-a");

  heads.addEventListener("click", startCoinSequence);
  tails.addEventListener("click", startCoinSequence);

  function startCoinSequence() {
    const result = flipCoin();

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

  function toggleElem(elem, bool) {
    if (bool) {
      elem.style.display = "flex";
    } else {
      elem.style.display = "none";
    }
    elem.style.animation = "appear 0.2s linear";
  }

  function animation(result) {
    setTimeout(() => {
      heads.style.animation = "";
      tails.style.animation = "";

      toggleElem(flipButton, true); // Center the flipButton

      if (result == "Heads") {
        heads.style.zIndex = "1";
        tails.style.zIndex = "0";

        heads.style.animation = "flipFront 3s 1 ease-in";
        tails.style.animation = "flipBack 3s 1 ease-in";
      } else {
        tails.style.zIndex = "1";
        heads.style.zIndex = "0";

        tails.style.animation = "flipFront 3s 1 ease-in";
        heads.style.animation = "flipBack 3s 1 ease-in";
      }
    }, 10); // start

    setTimeout(() => {
      result == "Heads"
        ? root.style.setProperty("--coin-shadow", "var(--green)")
        : root.style.setProperty("--coin-shadow", "var(--red)");
      console.log("xDGJDSMGKJMLDSHGMKJL");
    }, 3010); // end

    setTimeout(() => {
      flipButton.style.animation = "dissapear 0.2s linear forwards";
    }, 3510); // 0.5 after end

    setTimeout(() => {
      toggleElem(flipButton, false);
      root.style.setProperty("--coin-shadow", "#fff");
    }, 3710); // 0.7 after end
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
