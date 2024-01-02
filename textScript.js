var playButton = document.getElementById("playButton");

function reposition(elementId, left, top) {
  const element = document.getElementById(elementId);
  element.style.left = left;
  element.style.top = top;
}
function handleClick(event) {
  reposition("introWindow", "36%", "-70%");
}

playButton.addEventListener("click", handleClick);

setTimeout(function () {
  reposition("introWindow", "36%", "15%");
}, 200);
