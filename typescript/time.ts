function getTime() {
  const date = new Date();
  const min: number = date.getMinutes();
  const sec: number = date.getSeconds();
  const hour: number = date.getHours();

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

  let clockElement = document.getElementById("clock");

  if (clockElement) {
    clockElement.innerHTML = getTime();

    setInterval(() => {
      clockElement.innerHTML = getTime();
    }, 100);
  }
};
