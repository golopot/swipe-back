const container = document.createElement("div");
container.className = "swipe-back-container";

const leftArrow = document.createElement("div");
leftArrow.className = "swipe-back-left-arrow";
container.appendChild(leftArrow);
document.body.appendChild(container);

let position = 0;
let freezeUntil = 0;
const postitionScale = 4;
let fadeDelay = 500;

let timeoutHandle = 0;

function resetPosition() {
  position = 0;
}

function handleWheel(event) {
  if (event.deltaY !== 0) {
    freezeUntil = Date.now() + 50;
    return;
  }

  if (Date.now() < freezeUntil) {
    return;
  }
  position -= event.deltaX;
  if (position < 0) {
    position = 0;
  }
  if (position > 150 * postitionScale) {
    position = 150 * postitionScale;
  }
  leftArrow.style.left = `${
    -110 + Math.min(position, 120 * postitionScale) / postitionScale
  }px`;

  leftArrow.classList.remove("transition");

  window.setTimeout(() => {
    leftArrow.classList.add("transition");
  }, 200);

  window.clearTimeout(timeoutHandle);
  timeoutHandle = window.setTimeout(resetPosition, fadeDelay);

  if (position >= 130 * postitionScale) {
    console.log("go back");
    window.history.back();
  }
}

document.addEventListener("wheel", handleWheel);
