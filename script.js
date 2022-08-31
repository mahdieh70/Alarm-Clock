"use strict";

const clock = document.getElementById("clock");
const minute = document.getElementById("minute");
const hour = document.getElementById("hour");
const container = document.querySelector(".container");
const setAlarm = document.getElementById("setAlarm");
const amPm = document.getElementById("amPm");

let alarmTime;
let isRunning;
let ringTone = new Audio("./ringtone/Ringtone Alarm Drama.mp3");

//show current time
setInterval(showTime, 1000);

function showTime() {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  let session = "AM";

  if (h == 0) {
    h = 12;
  }

  if (h > 12) {
    h = h - 12;
    session = "PM";
  }

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  let currentTime = `${h}:${m}:${s} ${session}`;
  clock.innerHTML = currentTime;
  if (alarmTime == `${h}:${m} ${session}`) {
    ringTone.play();
    ringTone.loop = false;
  }
}

showTime();

//make minute option
let minuteDigit = [];
for (let i = 0; i < 60; i++) {
  let minOption = document.createElement("option");
  if (i < 10) {
    minuteDigit.push("0" + i);
  } else {
    minuteDigit.push(i);
  }
  minOption.value = minuteDigit[i];
  minOption.text = minuteDigit[i];
  minute.appendChild(minOption);
}

//make hour option
let hourDigit = [];
for (let i = 0; i < 13; i++) {
  let hrOption = document.createElement("option");
  if (i < 10) {
    hourDigit.push("0" + i);
  } else {
    hourDigit.push(i);
  }
  hrOption.value = hourDigit[i];
  hrOption.text = hourDigit[i];
  hour.appendChild(hrOption);
}

//alarm clock will fire when  setAlarm button click
setAlarm.addEventListener("click", () => {
  if (isRunning) {
    alarmTime = "";
    ringTone.pause();
    setAlarm.textContent = "Set Alarm";
    isRunning = false;
  } else {
    isRunning = true;
    let time = `${hour.value}:${minute.value} ${amPm.value}`;
    alarmTime = time;
    setAlarm.textContent = "clear Alarm";
    if (
      time.includes("Hours") ||
      time.includes("Minutes") ||
      time.includes("AM/PM")
    ) {
      return alert("select a valid time to set Alarm");
    }
  }
});
