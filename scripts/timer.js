// Global variables
let timerInterval;
let keyUsed = false; // to clear the input on first keypress

// These need to be global otherwise they can't be accessed
// (or I could wrap them in an object, or in an function and export them but w/e)
const hoursElement = document.querySelector(".hours");
const minutesElement = document.querySelector(".minutes");
const secondsElement = document.querySelector(".seconds");

document.addEventListener("DOMContentLoaded", () => {
  const timerContainer = document.querySelector(".timer-modal-container");
  const timerForm = document.querySelector(".timer-modal");
  const timeInput = document.getElementById("timeInput");

  // Check and start stored timer if exists
  initializeStoredTimer();

  setupEventListeners(timerContainer, timerForm, timeInput);

  // Handle modal fade in/out
  const clock = document.querySelector("#clock");
  clock.addEventListener("click", () => {
    fadeInModal(timerContainer);
    timeInput.focus();
    resetModalDisplay(hoursElement, minutesElement, secondsElement);
  });
});

function initializeStoredTimer() {
  const storedTimer = localStorage.getItem("timer");
  if (storedTimer) {
    const remainingTime = parseInt(storedTimer, 10) - new Date().getTime();
    if (remainingTime > 0) {
      startCountdownFromRemainingTime(remainingTime);
    } else {
      localStorage.removeItem("timer");
    }
  }
}
function startCountdownFromRemainingTime(remainingTime) {
  startCountdown(
    Math.floor(remainingTime / 3600000),
    Math.floor((remainingTime % 3600000) / 60000),
    Math.floor((remainingTime % 60000) / 1000)
  );
}

function setupEventListeners(timerContainer, timerForm, timeInput) {
  timeInput.addEventListener("keyup", updateDisplay);
  timeInput.addEventListener("keydown", handleTimeInputKeyDown);

  timerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    keyUsed = false;
    const timeParts = extractTimeParts(timeInput.value);
    startCountdown(timeParts.hours, timeParts.minutes, timeParts.seconds);
    fadeOutModal(timerContainer);
  });

  document.addEventListener("keyup", (e) => {
    if (e.key === "Escape" && timerContainer.style.display === "flex") {
      keyUsed = false;
      fadeOutModal(timerContainer);
    }
  });
}

function resetModalDisplay(hoursElement, minutesElement, secondsElement) {
  timeInput.value = "05m 00s";
  hoursElement.textContent = "00";
  minutesElement.textContent = "05";
  secondsElement.textContent = "00";

  minutesElement.classList.remove("inactive");
  hoursElement.classList.add("inactive");
}

// Extract hours, minutes, seconds from user input
function extractTimeParts(input) {
  const timeParts = input.replace(/\D/g, "");
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

  return { hours, minutes, seconds };
}

function startCountdown(hours, minutes, seconds) {
  hours = parseInt(hours, 10) || 0;
  minutes = parseInt(minutes, 10) || 0;
  seconds = parseInt(seconds, 10) || 0;

  clearExistingInterval(); // check for and clear existing coundownds
  const countDownDate = calculateCountDownDate(hours, minutes, seconds);
  localStorage.setItem("timer", countDownDate);

  updateTimer(countDownDate); // update immediately
  timerInterval = setInterval(() => updateTimer(countDownDate), 1000);
}

function calculateCountDownDate(hours, minutes, seconds) {
  return new Date().getTime() + (hours * 3600 + minutes * 60 + seconds) * 1000;
}

function clearExistingInterval() {
  if (timerInterval !== undefined) {
    clearInterval(timerInterval);
  }
}

// Update timer time timing tiiiimeeeeeeee help
function updateTimer(countDownDate) {
  const now = new Date().getTime();
  const distance = countDownDate - now;

  if (distance < 1000) {
    stopTimer();
  } else {
    const { hours, minutes, seconds } = calculateTimeComponents(distance);
    displayTime(hours, minutes, seconds);
  }
}
function calculateTimeComponents(distance) {
  const hours = Math.floor(distance / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  return { hours, minutes, seconds };
}

function displayTime(hours, minutes, seconds) {
  let displayText = "";
  if (hours > 0) displayText += `${hours}h `;
  if (minutes > 0) displayText += `${minutes}m `;
  displayText += `${seconds}s`;

  // Get timer or create one if it does not exist
  const timerElement =
    document.querySelector("#timer p") || createTimerDisplayElement();
  timerElement.innerHTML = displayText;
}

function createTimerDisplayElement() {
  const timeStuffContainer = document.querySelector(".time-stuff-container");
  const newTimerElement = document.createElement("div");
  newTimerElement.id = "timer";
  newTimerElement.classList.add("container-card");

  const timerText = document.createElement("p");
  newTimerElement.appendChild(timerText);
  timeStuffContainer.appendChild(newTimerElement);

  newTimerElement.addEventListener("click", stopTimer);
  return timerText;
}

// Stop the timer
function stopTimer() {
  clearInterval(timerInterval);
  localStorage.removeItem("timer");
  const timerElement = document.querySelector("#timer");
  if (timerElement) {
    timerElement.remove();
  }
  playEndSound();
}

function playEndSound() {
  const audio = new Audio("./assets/Lego Yoda Death Sound.mp3");
  audio.play();
}

// ---------- TIMER CREATION MODAL --------------- //

function handleTimeInputKeyDown(e) {
  // If it is the first time a key gets pressed, clear input
  if (!keyUsed) {
    keyUsed = true;
    timeInput.value = "";
  }

  if (
    timeInput.value.length === 6 &&
    e.key !== "Backspace" &&
    e.key !== "Enter"
  ) {
    e.preventDefault();
  }
}

function updateDisplay() {
  const input = timeInput.value.replace(/\D/g, "");
  if (input.length > 6) return;

  const { hours, minutes, seconds } = extractTimeParts(input);
  updateDisplayElements(hours, minutes, seconds);
}

function updateDisplayElements(hours, minutes, seconds) {
  hoursElement.textContent = hours || "00";
  minutesElement.textContent = minutes || "00";
  secondsElement.textContent = seconds || "00";

  minutesElement.classList.toggle("inactive", !minutes);
  hoursElement.classList.toggle("inactive", !hours);
}

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
