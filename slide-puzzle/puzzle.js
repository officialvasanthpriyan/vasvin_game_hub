var gridRows = 3; // Number of rows (3x3)
var gridCols = 3; // Number of columns

var selectedTile; // The currently dragged tile (not the blank tile)
var emptyTile; // The blank tile

var moveCount = 0; // Number of moves

// The initial order of the tiles (excluding the blank one)
var tileOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];

window.onload = function() {
  for (let row = 0; row < gridRows; row++) { // Iterate through rows
    for (let col = 0; col < gridCols; col++) { // Iterate through columns
      let newTile = document.createElement("img");

      // Create a unique ID for each tile
      newTile.id = row.toString() + "-" + col.toString();

      // Set the tile image from the tileOrder array
      newTile.src = tileOrder.shift() + ".jpg";

      // Add drag-and-drop event listeners
      newTile.addEventListener("dragstart", onDragStart);
      newTile.addEventListener("dragover", onDragOver);
      newTile.addEventListener("dragenter", onDragEnter);
      newTile.addEventListener("dragleave", onDragLeave);
      newTile.addEventListener("drop", onDrop);
      newTile.addEventListener("dragend", onDragEnd);

      // Append the tile to the board
      document.getElementById("board").appendChild(newTile);
    }
  }
};

// Drag start event handler
function onDragStart() {
  selectedTile = this; // Store the tile being dragged
}

// Drag over event handler
function onDragOver(e) {
  e.preventDefault(); // Allow the drop by preventing the default behavior
}

// Drag enter event handler
function onDragEnter(e) {
  e.preventDefault(); // Allow the drop by preventing the default behavior
}

// Drag leave event handler
function onDragLeave() {
  // Handle any specific behavior when a dragged tile leaves another tile
}

// Drop event handler
function onDrop() {
  emptyTile = this; // The tile where the dragged tile is dropped
}

// Drag end event handler
function onDragEnd() {
  // Only swap if the empty tile is dropped on an adjacent tile
  if (!emptyTile.src.includes("3.jpg")) {
    return; // Ensure we can only swap with the blank tile (3.jpg)
  }

  let currentPos = selectedTile.id.split("-"); // Split the tile's coordinates
  let row1 = parseInt(currentPos[0]);
  let col1 = parseInt(currentPos[1]);

  let targetPos = emptyTile.id.split("-"); // Get the position of the empty tile
  let row2 = parseInt(targetPos[0]);
  let col2 = parseInt(targetPos[1]);

  // Check if the tiles are adjacent (up, down, left, right)
  let isAdjacent =
    (row1 === row2 && Math.abs(col2 - col1) === 1) || // Left or Right
    (col1 === col2 && Math.abs(row2 - row1) === 1); // Up or Down

  if (isAdjacent) {
    let selectedTileImage = selectedTile.src;
    let emptyTileImage = emptyTile.src;

    // Swap the images of the selected and empty tiles
    selectedTile.src = emptyTileImage;
    emptyTile.src = selectedTileImage;

    // Increment the move count and display it
    moveCount += 1;
    document.getElementById("turns").innerText = moveCount;
  }
}