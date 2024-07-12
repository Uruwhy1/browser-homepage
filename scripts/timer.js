let timerInterval;

function startCountdown(hours, minutes, seconds) {
  // validate input
  hours = parseInt(hours, 10) || 0;
  minutes = parseInt(minutes, 10) || 0;
  seconds = parseInt(seconds, 10) || 0;

  seconds = seconds + 1;

  if (hours < 0 || minutes < 0 || seconds < 0) {
    alert(
      "Please enter valid positive numbers for hours, minutes, and seconds."
    );
    return;
  }

  if (timerInterval !== undefined) {
    clearInterval(timerInterval);
  }

  const countDownDate =
    new Date().getTime() + (hours * 3600 + minutes * 60 + seconds) * 1000;

  // Function to update the display
  function updateTimer() {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    if (distance > 24 * 60 * 60000) {
      clearInterval(timerInterval);
      alert("Please do not go over a day.");
      return;
    }

    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    let displayText = "";
    if (hours > 0) displayText += `${hours}h `;
    if (minutes > 0) displayText += `${minutes}m `;
    displayText += `${seconds}s`;

    const timerElement = document.querySelector("#timer p");
    if (!timerElement) {
      const newTimerElement = document.createElement("div");
      newTimerElement.id = "timer";
      newTimerElement.classList.add("container-card");

      const timerText = document.createElement("p");
      newTimerElement.appendChild(timerText);
      document.body.appendChild(newTimerElement);
    }

    document.querySelector("#timer p").innerHTML = displayText;

    if (distance < 0) {
      clearInterval(timerInterval);
      timerElement.remove();
    }
  }

  // Update the countdown immediately
  updateTimer();

  /* Update again (countdown starts one second bigger, 
  but it immediately goes below that) */
  setTimeout(() => {
    updateTimer();
  }, 0);

  timerInterval = setInterval(updateTimer, 1000);
}

// DOM elements
const timerContainer = document.querySelector(".timer-modal-container");
const timerForm = document.querySelector(".timer-modal");
const timeInput = document.getElementById("timeInput");
const clock = document.querySelector("#clock");

const hoursElement = document.querySelector(".hours");
const minutesElement = document.querySelector(".minutes");
const secondsElement = document.querySelector(".seconds");

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("keyup", (e) => {
    if (e.key === "Escape" && timerContainer.style.display === "flex") {
      timerContainer.style.display = "none";
    }
  });

  // Event listeners
  timeInput.addEventListener("keyup", updateDisplay);
  timeInput.addEventListener("keydown", (e) => {
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
    timeInput.value = "";
    timerContainer.style.display = "none";
  });

  clock.addEventListener("click", () => {
    // reset elements on click
    hoursElement.innerHTML = "";
    minutesElement.innerHTML = "";
    secondsElement.innerHTML = "00s";

    timerContainer.style.display = "flex";
    timeInput.focus();
  });
});

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
    minutesElement.textContent = "";
    hoursElement.textContent = "";
  } else if (length <= 4) {
    seconds = input.slice(-2).padStart(2, "0");
    minutes = input.slice(0, -2).padStart(2, "0");
    hoursElement.textContent = "";
  } else {
    seconds = input.slice(-2).padStart(2, "0");
    minutes = input.slice(-4, -2).padStart(2, "0");
    hours = input.slice(0, -4).padStart(2, "0");
  }

  if (hours) hoursElement.textContent = `${hours}h`;
  if (minutes) minutesElement.textContent = `${minutes}m`;
  if (seconds) secondsElement.textContent = `${seconds}s`;
}
