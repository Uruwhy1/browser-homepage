// Variable to hold the reference to the interval
let timerInterval;

// Function to start the countdown
function startCountdown(minutes) {
  // Validate input
  if (isNaN(minutes) || minutes <= 0) {
    alert("Please enter a valid number of minutes.");
    return;
  }

  // Clear any existing interval
  if (timerInterval) {
    clearInterval(timerInterval);
  }

  // Set the date we're counting down to
  const currentDate = new Date();
  const countDownDate = addMinutes(currentDate, minutes);

  // Update the countdown every 1 second
  timerInterval = setInterval(() => {
    // Get the current time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distance = countDownDate.getTime() - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="timer"
    let displayText = "";

    if (days > 0) displayText += `${days}d `;
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

// Function to add minutes to a date
function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

// DOM elements
const timerContainer = document.querySelector(".timer-modal-container");
const timerForm = document.querySelector(".timer-modal");
const minutesInput = document.querySelector(".timer-modal input");
const clock = document.querySelector("#clock");

// Event listeners
timerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  startCountdown(minutesInput.value);
  minutesInput.value = "";
  timerContainer.style.display = "none";
});

clock.addEventListener("click", () => {
  timerContainer.style.display = "flex";
  minutesInput.focus();
});

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("keyup", (e) => {
    if (e.key === "Escape" && timerContainer.style.display === "flex") {
      timerContainer.style.display = "none";
    }
  });
});
