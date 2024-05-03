const emojis = ['🌟', '🎉', '💡', '🍕', '🚀', '🎨','🌟', '🎉', '💡', '🍕', '🚀', '🎨','💻','💻','😊','😊'];
const timeDelay = 600;
var shuf_emojis = emojis.sort(() => 0.5 - Math.random());
document.getElementById("button").addEventListener("click", function() {
  window.location.reload();
});

function createGameBoard() {
 for (var i = 0; i < emojis.length; i++){
   let box = document.createElement('div');
   box.classList.add('item');
   box.textContent = shuf_emojis[i];
   box.addEventListener('click', clickedCard);
   document.querySelector('.game').appendChild(box)
}}

function clickedCard() {
  const clickedElement = event.target; // Get the clicked element (assuming you have an event listener attached)
  clickedElement.classList.add('boxOpen');  // Add "boxOpen" to the clicked element
  setTimeout(checkMatch,timeDelay);
}

function checkMatch() {
 const openBoxes = document.querySelectorAll('.boxOpen'); // Get all elements with "boxOpen"
 // Check if there are at least 2 open boxes
 if (openBoxes.length >1 ) {
   const firstBox = openBoxes[0]; // Get the first open box
   const secondBox = openBoxes[1]; // Get the second open box

   if (firstBox.innerHTML === secondBox.innerHTML) {
     // Match found, handle it here
     firstBox.classList.add('boxMatch');
     secondBox.classList.add('boxMatch');

     firstBox.classList.remove('boxOpen');
     secondBox.classList.remove('boxOpen');

     // Check if win
     if (document.querySelectorAll('.boxMatch').length === emojis.length) {
       alert('Congratulations! You win.');
     }
    } else {
     // No match then remove the class boxOpen
     setTimeout(() => {
       firstBox.classList.remove('boxOpen');
       secondBox.classList.remove('boxOpen');
     }, timeDelay);
   }
 }
}
createGameBoard();


