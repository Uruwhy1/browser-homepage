// Global timerInterval variable
let timerInterval;
let keyUsed = false;

document.addEventListener("DOMContentLoaded", () => {
  // Check if there's a timer in localStorage and start it
  const storedTimer = localStorage.getItem("timer");
  if (storedTimer) {
    const remainingTime = parseInt(storedTimer, 10) - new Date().getTime();
    if (remainingTime > 0) {
      startCountdown(
        Math.floor(remainingTime / 3600000),
        Math.floor((remainingTime % 3600000) / 60000),
        Math.floor((remainingTime % 60000) / 1000)
      );
    } else {
      localStorage.removeItem("timer");
    }
  }

  // DOM elements
  const timerContainer = document.querySelector(".timer-modal-container");
  const timerForm = document.querySelector(".timer-modal");
  const timeInput = document.getElementById("timeInput");
  const clock = document.querySelector("#clock");
  const hoursElement = document.querySelector(".hours");
  const minutesElement = document.querySelector(".minutes");
  const secondsElement = document.querySelector(".seconds");

  document.addEventListener("keyup", (e) => {
    if (e.key === "Escape" && timerContainer.style.display === "flex") {
      keyUsed = false;
      fadeOutModal(timerContainer);
    }
  });

  // Event listeners
  timeInput.addEventListener("keyup", updateDisplay);
  timeInput.addEventListener("keydown", (e) => {
    if (!keyUsed) {
      keyUsed = true;
      timeInput.value = "";
    }

    if (
      timeInput.value.length == 6 &&
      e.key !== "Backspace" &&
      e.key !== "Enter"
    ) {
      e.preventDefault();
    }
  });

  timerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    keyUsed = false;
    const timeParts = timeInput.value.replace(/\D/g, "");
    let hours = "",
      minutes = "",
      seconds = "";

    if (timeParts.length <= 2) {
      seconds = timeParts.padStart(2, "0");
    } else if (timeParts.length <= 4) {
      seconds = timeParts.slice(-2).padStart(2, "0");
      minutes = timeParts.slice(0, -2).padStart(2, "0");
    } else {
      seconds = timeParts.slice(-2).padStart(2, "0");
      minutes = timeParts.slice(-4, -2).padStart(2, "0");
      hours = timeParts.slice(0, -4).padStart(2, "0");
    }

    startCountdown(hours, minutes, seconds);

    fadeOutModal(timerContainer);
  });

  clock.addEventListener("click", () => {
    fadeInModal(timerContainer);
    timeInput.focus();

    timeInput.value = "05m 00s";
    hoursElement.textContent = "00";
    minutesElement.textContent = "05";
    secondsElement.textContent = "00";

    minutesElement.classList.remove("inactive");
    hoursElement.classList.add("inactive");
  });

  function startCountdown(hours, minutes, seconds) {
    // Validate input
    hours = parseInt(hours, 10) || 0;
    minutes = parseInt(minutes, 10) || 0;
    seconds = parseInt(seconds, 10) || 0;

    // If there's an existing interval, clear it
    if (timerInterval !== undefined) {
      clearInterval(timerInterval);
    }

    // Calculate the countdown date
    seconds = seconds + 1;
    const countDownDate =
      new Date().getTime() + (hours * 3600 + minutes * 60 + seconds) * 1000;

    // Store the countdown date in localStorage
    localStorage.setItem("timer", countDownDate);

    // Function to update the display
    function updateTimer() {
      const now = new Date().getTime();
      const distance = countDownDate - now;
      // If the countdown is over, clear the interval and remove the timer from localStorage
      if (distance < 1000) {
        stopTimer();
      }

      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      let displayText = "";
      if (hours > 0) displayText += `${hours}h `;
      if (minutes > 0) displayText += `${minutes}m `;
      displayText += `${seconds}s`;

      const timerElement = document.querySelector("#timer p");
      if (!timerElement) {
        const timeStuffContainer = document.querySelector(
          ".time-stuff-container"
        );

        const newTimerElement = document.createElement("div");
        newTimerElement.id = "timer";
        newTimerElement.classList.add("container-card");

        const timerText = document.createElement("p");
        newTimerElement.appendChild(timerText);
        timeStuffContainer.appendChild(newTimerElement);

        newTimerElement.addEventListener("click", () => {
          stopTimer();
        });
      }

      document.querySelector("#timer p").innerHTML = displayText;
    }

    // Update the countdown immediately
    updateTimer();

    /* Update again (countdown starts one second bigger, 
  but it immediately goes below that) */
    setTimeout(() => {
      updateTimer();
    }, 10);

    timerInterval = setInterval(updateTimer, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
    localStorage.removeItem("timer");
    setTimeout(() => {
      document.querySelector("#timer").remove();
    }, 0);

    const audio = new Audio("./assets/Lego Yoda Death Sound.mp3");
    audio.play();
    return;
  }

  // Function to update the time display
  function updateDisplay() {
    const input = timeInput.value.replace(/\D/g, ""); // Remove non-numeric characters
    const length = input.length;

    if (length > 6) {
      return;
    }

    let hours;
    let minutes;
    let seconds;

    if (length <= 2) {
      seconds = input.padStart(2, "0");
      minutesElement.textContent = "00";
      hoursElement.textContent = "00";

      minutesElement.classList.add("inactive");
      hoursElement.classList.add("inactive");
    } else if (length <= 4) {
      seconds = input.slice(-2).padStart(2, "0");
      minutes = input.slice(0, -2).padStart(2, "0");
      hoursElement.textContent = "00";

      minutesElement.classList.remove("inactive");
      hoursElement.classList.add("inactive");
    } else {
      seconds = input.slice(-2).padStart(2, "0");
      minutes = input.slice(-4, -2).padStart(2, "0");
      hours = input.slice(0, -4).padStart(2, "0");

      minutesElement.classList.remove("inactive");
      hoursElement.classList.remove("inactive");
    }

    if (hours) hoursElement.textContent = `${hours} `;
    if (minutes) minutesElement.textContent = `${minutes}`;
    if (seconds) secondsElement.textContent = `${seconds}`;
  }
});

function fadeOutModal(modal) {
  modal.style.animation = "fadeOut 0.3s forwards";
  setTimeout(() => {
    modal.style.animation = "";
    modal.style.display = "none";
  }, 300);
}

function fadeInModal(modal) {
  modal.style.display = "flex";
  modal.style.animation = "fadeIn 0.3s forwards";

  setTimeout(() => {
    modal.style.animation = "";
  }, 300);
}
