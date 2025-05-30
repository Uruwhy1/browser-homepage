// this is all globally scoped because of some issues with bundling and stuff

const root = document.documentElement;
let flipButton: HTMLElement | null = null;
let heads: HTMLElement | null = null;
let tails: HTMLElement | null = null;

document.addEventListener("DOMContentLoaded", () => {
  tails = document.querySelector(".side-a") as HTMLElement;
  heads = document.querySelector(".side-b") as HTMLElement;
  flipButton = document.querySelector(".coin-flip") as HTMLElement;
});

function startCoinSequence() {
  const result = flipCoin();

  if (heads) heads.style.animation = "none";
  if (tails) tails.style.animation = "none";
  if (flipButton) flipButton.style.animation = "none";

  animation(result);
}

function flipCoin() {
  const random = Math.random();
  return random < 0.5 ? "Heads" : "Tails";
}

function toggleElem(elem: HTMLElement, bool: boolean) {
  if (bool) {
    elem.style.display = "flex";
  } else {
    elem.style.display = "none";
  }
  elem.style.animation = "appear 0.2s linear";
}

function animation(result: string) {
  setTimeout(() => {
    if (!heads || !tails || !flipButton) return;
    heads.style.animation = "";
    tails.style.animation = "";

    toggleElem(flipButton, true);

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
  }, 3010); // end

  setTimeout(() => {
    if (!heads || !tails || !flipButton) return;
    flipButton.style.animation = "dissapear 0.2s linear forwards";
  }, 4510); // 1.5 after end

  setTimeout(() => {
    if (!heads || !tails || !flipButton) return;
    toggleElem(flipButton, false);
    root.style.setProperty("--coin-shadow", "#fff");
  }, 4710); // 1.7 after end
}
