const DEFAULT_COLOR = "#333333";
const DEFAULT_MODE = "color";
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

function setCurrentColor(newColor) {
  currentColor = newColor;
}

function setCurrentMode(newMode) {
  activateButton(newMode);
  currentMode = newMode;
}

function setCurrentSize(newSize) {
  currentSize = newSize;
}

const colorPicker = document.querySelector("#color-picker");
const colorBtn = document.querySelector("#colorbtn");
const rainbowBtn = document.querySelector("#rainbow");
const fillBtn = document.querySelector("#fill");
const eraseBtn = document.querySelector("#eraser");
const clearBtn = document.querySelector("#clear");
const sizeSlider = document.getElementById("sizeSlider");
const sizeValue = document.getElementById("sizeValue");
const container = document.querySelector("#container");

colorPicker.onchange = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode("color");
rainbowBtn.onclick = () => setCurrentMode("rainbow");
fillBtn.onclick = () => fillGrid();
eraseBtn.onclick = () => setCurrentMode("eraser");
clearBtn.onclick = () => reloadGrid();
sizeSlider.onmousemove = (e) =>
  (sizeValue.innerHTML = `${e.target.value} x ${e.target.value}`);
sizeSlider.onchange = (e) => changeSize(e.target.value);

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function changeSize(value) {
  setCurrentSize(value);
  sizeValue.innerHTML = `${value} x ${value}`;
  reloadGrid();
}

function reloadGrid() {
  clearGrid();
  makeGrid(currentSize);
}

function clearGrid() {
  container.innerHTML = "";
}

function makeGrid(size) {
  numCells = size ** 2;
  container.style["grid-template-columns"] = `repeat(${size},auto)`;

  while (numCells > 0) {
    let div = document.createElement("div");
    div.classList.add("grid-item");
    div.addEventListener("mouseover", changeColor);
    div.addEventListener("mousedown", changeColor);
    container.appendChild(div);
    numCells--;
  }
}

function changeColor(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  if (currentMode === "rainbow") {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  } else if (currentMode === "color") {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === "eraser") {
    e.target.style.backgroundColor = "#fefefe";
  }
}

function fillGrid() {
  document.querySelectorAll(".grid-item").forEach((item) => {
    item.style.backgroundColor = currentColor;
  });
}

function activateButton(newMode) {
  if (currentMode === "rainbow") {
    rainbowBtn.classList.remove("active");
  } else if (currentMode === "color") {
    colorBtn.classList.remove("active");
  } else if (currentMode === "eraser") {
    eraseBtn.classList.remove("active");
  } else if (currentMode === "fill") {
    fillBtn.classList.remove("active");
  }

  if (newMode === "rainbow") {
    rainbowBtn.classList.add("active");
  } else if (newMode === "color") {
    colorBtn.classList.add("active");
  } else if (newMode === "eraser") {
    eraseBtn.classList.add("active");
  } else if (newMode === "fill") {
    fillBtn.classList.add("active");
  }
}

window.onload = () => {
  makeGrid(currentSize);
  activateButton(DEFAULT_MODE);
};
