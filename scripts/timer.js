// Variable to hold the reference to the interval
let timerInterval;

// Function to start the countdown
function startCountdown(hours, minutes, seconds) {
  // Validate input
  hours = parseInt(hours, 10) || 0;
  minutes = parseInt(minutes, 10) || 0;
  seconds = parseInt(seconds, 10) || 0;

  if (hours < 0 || minutes < 0 || seconds < 0) {
    alert(
      "Please enter valid positive numbers for hours, minutes, and seconds."
    );
    return;
  }

  // Clear any existing interval
  if (timerInterval) {
    clearInterval(timerInterval);
  }

  // Convert hours to minutes
  hours = hours * 60;

  // Set the date we're counting down to
  const countDownDate =
    new Date().getTime() + hours * 60000 + minutes * 60000 + seconds * 1000;

  // Update the countdown every 1 second
  timerInterval = setInterval(() => {
    // Get the current time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distance = countDownDate - now;
    if (distance > 24 * 60 * 60000) {
      clearInterval(timerInterval);
      alert("Please do not go over a day.");
      return;
    }

    // Time calculations for hours, minutes, and seconds
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="timer"
    let displayText = "";

    if (hours > 0) displayText += `${hours}h `;
    if (minutes > 0) displayText += `${minutes}m `;

    const timerElement = document.querySelector("#timer p");
    if (!timerElement) {
      const newTimerElement = document.createElement("div");
      newTimerElement.id = "timer";
      newTimerElement.classList.add("container-card");

      const timerText = document.createElement("p");
      newTimerElement.appendChild(timerText);
      document.body.appendChild(newTimerElement);
    }

    document.querySelector("#timer p").innerHTML = displayText + `${seconds}s`;

    // If the countdown is finished, write some text
    if (distance < 0) {
      clearInterval(timerInterval);
      document.querySelector("#timer p").innerHTML = "0s";
    }
  }, 1000);
}

// DOM elements
const timerContainer = document.querySelector(".timer-modal-container");
const timerForm = document.querySelector(".timer-modal");
const hoursInput = document.querySelector(".timer-modal .hours");
const minutesInput = document.querySelector(".timer-modal .minutes");
const secondsInput = document.querySelector(".timer-modal .seconds");
const clock = document.querySelector("#clock");

// Event listeners
timerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  startCountdown(hoursInput.value, minutesInput.value, secondsInput.value);
  hoursInput.value = "";
  minutesInput.value = "";
  secondsInput.value = "";
  timerContainer.style.display = "none";
});

clock.addEventListener("click", () => {
  timerContainer.style.display = "flex";
  hoursInput.focus();
});

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("keyup", (e) => {
    if (e.key === "Escape" && timerContainer.style.display === "flex") {
      timerContainer.style.display = "none";
    }
  });

  hoursInput.value = "";
  minutesInput.value = "";
  secondsInput.value = "";
});

// Function to move focus to the next input
function moveToNextInput(currentInput, nextInput) {
  currentInput.addEventListener("input", () => {
    if (!nextInput) {
      if (currentInput.value.length >= 2) {
        currentInput.blur();
      }
    } else if (currentInput.value.length >= 2) {
      nextInput.focus();
    }
  });
}

// Apply moveToNextInput to each input pair
moveToNextInput(hoursInput, minutesInput);
moveToNextInput(minutesInput, secondsInput);
moveToNextInput(secondsInput);
