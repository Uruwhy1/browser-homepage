"use strict";
function getTime() {
    const date = new Date();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    const hour = date.getHours();
    setBackground(hour, min);
    return ("" +
        (hour < 10 ? "0" + hour : hour) +
        ":" +
        (min < 10 ? "0" + min : min) +
        ":" +
        (sec < 10 ? "0" + sec : sec));
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
function setBackground(hour, minutes) {
    const isDawnTime = hour === 18 || hour === 19;
    if (isDawnTime) {
        document.documentElement.classList.add("dawn");
    }
    else {
        document.documentElement.classList.remove("dawn");
    }
}
