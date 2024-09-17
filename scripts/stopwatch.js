document.addEventListener("DOMContentLoaded", () => {
  let interval;

  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      if (searchInput.value.toLowerCase() == "stopwatch") {
        startStopwatch();
        searchInput.value = "";
        return;
      }
    }
  });

  function startStopwatch() {
    const timeStuffContainer = document.querySelector(".time-stuff-container");

    const newTimerElement = document.createElement("div");
    newTimerElement.id = "stopwatch";
    newTimerElement.classList.add("container-card");

    const timerText = document.createElement("p");
    newTimerElement.appendChild(timerText);
    timeStuffContainer.appendChild(newTimerElement);

    newTimerElement.addEventListener("click", () => {
      endStopwatch(newTimerElement);
    });

    const startTime = Date.now();
    interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const seconds = Math.floor((elapsedTime / 1000) % 60);
      const minutes = Math.floor((elapsedTime / 1000 / 60) % 60);
      const hours = Math.floor(elapsedTime / 1000 / 60 / 60);

      let displayText = "";
      if (hours > 0) displayText += `${hours}h `;
      if (minutes > 0) displayText += `${minutes}m `;
      displayText += `${seconds}s`;

      timerText.innerHTML = displayText;
      console.log(displayText);
    }, 100);
  }

  function endStopwatch(elem) {
    clearInterval(interval);
    elem.style.animation = "fadeOut 0.5s linear";
    setTimeout(() => {
      elem.remove();
    }, 500);
  }
});
