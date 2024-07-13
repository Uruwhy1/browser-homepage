// Get current time and format
function getTime() {
  let date = new Date(),
    min = date.getMinutes(),
    sec = date.getSeconds(),
    hour = date.getHours();

  setBackground(hour, min);

  return (
    "" +
    (hour < 10 ? "0" + hour : hour) +
    ":" +
    (min < 10 ? "0" + min : min) +
    ":" +
    (sec < 10 ? "0" + sec : sec)
  );
}

window.onload = () => {
  setupBookmarks();
  // Set up the clock
  document.getElementById("clock").innerHTML = getTime();
  // Set clock interval to tick clock
  setInterval(() => {
    document.getElementById("clock").innerHTML = getTime();
  }, 100);
};

function setBackground(hour, minutes) {
  const isDawnTime = hour === 17 || (hour === 18 && minutes <= 20);

  if (isDawnTime) {
    document.documentElement.classList.add("dawn");
  } else {
    document.documentElement.classList.remove("dawn");
  }
}
