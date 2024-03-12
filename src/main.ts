const focusBtn: HTMLElement = document.getElementById("focus")!;
const shortBreakBtn: HTMLElement = document.getElementById("shortBreak")!;
const longBreakBtn: HTMLElement = document.getElementById("longBreak")!;

const playBtn: HTMLElement = document.getElementById("play")!;
const pauseBtn: HTMLElement = document.getElementById("pause")!;
const resetBtn: HTMLElement = document.getElementById("refresh")!;

const timer: HTMLElement = document.getElementById("timer")!;

let set: ReturnType<typeof setInterval>;
let second: number = 59;
let paused: boolean = true;
let minutes: number = 29;
let curType: "focus" | "short" | "long" = "focus";
timer.textContent = `${minutes + 1}:00`;

const appendZero = (value: number): number | string => {
  return value < 10 ? `0${value}` : value;
};

focusBtn.addEventListener("click", () => {
  clearInterval(set);
  curType = "focus";
  focusBtn.classList.add("active-btn");
  shortBreakBtn.classList.remove("active-btn");
  longBreakBtn.classList.remove("active-btn");
  pauseBtn.classList.remove("show");
  playBtn.classList.remove("show");
  resetBtn.classList.remove("show");
  second = 59;
  minutes = 29;
  timer.textContent = `${minutes + 1}:00`;
});

shortBreakBtn.addEventListener("click", () => {
  clearInterval(set);
  curType = "short";
  focusBtn.classList.remove("active-btn");
  shortBreakBtn.classList.add("active-btn");
  longBreakBtn.classList.remove("active-btn");
  pauseBtn.classList.remove("show");
  playBtn.classList.remove("show");
  resetBtn.classList.remove("show");
  second = 59;
  minutes = 4;
  timer.textContent = `${minutes + 1}:00`;
});

longBreakBtn.addEventListener("click", () => {
  clearInterval(set);
  curType = "long";
  focusBtn.classList.remove("active-btn");
  shortBreakBtn.classList.remove("active-btn");
  longBreakBtn.classList.add("active-btn");
  pauseBtn.classList.remove("show");
  playBtn.classList.remove("show");
  resetBtn.classList.remove("show");
  second = 59;
  minutes = 14;
  timer.textContent = `${minutes + 1}:00`;
});

resetBtn.addEventListener("click", () => {
  if (curType === "focus") {
    minutes = 29;
  } else if (curType === "long") {
    minutes = 14;
  } else if (curType === "short") {
    minutes = 4;
  }
  second = 59;
  timer.textContent = `${minutes + 1}:00`;
});

pauseBtn.addEventListener("click", () => {
  paused = true;
  clearInterval(set);
  pauseBtn.classList.remove("show");
  playBtn.classList.remove("hide");
  resetBtn.classList.remove("show");
});

playBtn.addEventListener("click", () => {
  resetBtn.classList.add("show");
  pauseBtn.classList.add("show");
  playBtn.classList.add("hide");
  playBtn.classList.remove("show");
  if (paused) {
    paused = false;
    timer.textContent = `${appendZero(minutes)}:${appendZero(second)}`;
    set = setInterval(() => {
      second--;
      timer.textContent = `${appendZero(minutes)}:${appendZero(second)}`;
      if (second == 0) {
        if (minutes != 0) {
          minutes--;
          second = 60;
        } else {
          clearInterval(set);
        }
      }
    }, 1000);
  }
});
