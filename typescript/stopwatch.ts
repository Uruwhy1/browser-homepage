document.addEventListener("DOMContentLoaded", () => {
  const inputSearch = document.getElementById(
    "searchInput"
  ) as HTMLInputElement;
  let interval: number | undefined;

  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && inputSearch) {
      if (inputSearch.value.toLowerCase() === "stopwatch") {
        startStopwatch();
        inputSearch.value = "";
        return;
      }
    }
  });

  function startStopwatch(): void {
    const existingStopwatch = document.getElementById("stopwatch");
    if (existingStopwatch) {
      endStopwatch(existingStopwatch);
    }

    const timeStuffContainer = document.querySelector(".time-stuff-container");
    const newTimerElement = document.createElement("div");
    newTimerElement.id = "stopwatch";
    newTimerElement.classList.add("container-card");

    newTimerElement.setAttribute("tabindex", "0");

    const timerText = document.createElement("p");
    newTimerElement.appendChild(timerText);

    if (timeStuffContainer) {
      timeStuffContainer.appendChild(newTimerElement);

      newTimerElement.addEventListener("click", () => {
        endStopwatch(newTimerElement);
      });

      newTimerElement.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          endStopwatch(newTimerElement);
        }
      });

      const startTime = Date.now();

      if (interval) {
        clearInterval(interval);
      }

      interval = window.setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const seconds = Math.floor((elapsedTime / 1000) % 60);
        const minutes = Math.floor((elapsedTime / 1000 / 60) % 60);
        const hours = Math.floor(elapsedTime / 1000 / 60 / 60);

        let displayText = "";
        if (hours > 0) displayText += `${hours}h `;
        if (minutes > 0) displayText += `${minutes}m `;
        displayText += `${seconds}s`;

        timerText.innerHTML = displayText;
      }, 1000);
    }
  }

  function endStopwatch(elem: HTMLElement): void {
    if (interval) {
      clearInterval(interval);
      interval = undefined;
    }

    elem.style.animation = "fadeOut 0.5s linear";
    setTimeout(() => {
      elem.remove();
    }, 500);
  }
});
