// 3 functions: 1. calculateCompatibility() 2. removeMatchingCharacter() 3. resetGame()

function calculateCompatibility() {
  var firstName = document.getElementById("name1").value.toLowerCase(); // Ram kumar
  var secondName = document.getElementById("name2").value.toLowerCase(); // Radha selvi

  if (firstName === "" || secondName === "") {
    document.getElementById("error").textContent = "Please enter both names.";
    document.getElementById("result").textContent = "";
    return;
  }

  // Step 1: Remove spaces manually
  var cleanFirstName = "";
  var cleanSecondName = "";

  for (var i = 0; i < firstName.length; i++) {
    if (firstName[i] !== " ") {
      cleanFirstName += firstName[i]; // ramkumar
    }
  }

  for (var j = 0; j < secondName.length; j++) {
    if (secondName[j] !== " ") {
      cleanSecondName += secondName[j]; // radhaselvi
    }
  }

  // Step 2: Remove common characters
  var remainingFirstName = cleanFirstName;
  var remainingSecondName = cleanSecondName;

  for (var i = 0; i < cleanFirstName.length; i++) {
    var character = cleanFirstName[i];
    if (remainingSecondName.indexOf(character) !== -1) {
      remainingFirstName = removeMatchingCharacter(remainingFirstName, character); // amkumar
      remainingSecondName = removeMatchingCharacter(remainingSecondName, character); // adhaselvi
    }
  }

  // Step 3: Calculate the total number of remaining characters
  var totalCharacters = remainingFirstName.length + remainingSecondName.length; // 5 + 7 = 12

  // Step 4: FLAMES Logic
  var flamesArray = ["F", "L", "A", "M", "E", "S"];
  var index = 0;

  while (flamesArray.length > 1) {
    index = (index + totalCharacters - 1) % flamesArray.length; // Calculate index to remove
    flamesArray.splice(index, 1); // Remove one element
  }

  // Step 5: Map FLAMES letter to relationship
  var relationshipResult;
  if (flamesArray[0] === "F") relationshipResult = "Frameworks (you both love or hate them!)";
  else if (flamesArray[0] === "L") relationshipResult = "Libraries (coding companions!)";
  else if (flamesArray[0] === "A") relationshipResult = "Algorithms (connected by logic!)";
  else if (flamesArray[0] === "M") relationshipResult = "Merge (in sync like code branches!)";
  else if (flamesArray[0] === "E") relationshipResult = "Errors (debugging each other’s flaws!)";
  else if (flamesArray[0] === "S") relationshipResult = "Scripts (partners in coding scripts!)";

  // Step 6: Display the result
  document.getElementById("error").textContent = "";
  document.getElementById("result").textContent = relationshipResult;
}

// Function to remove a specific character from a string
function removeMatchingCharacter(inputString, characterToRemove) {
  var updatedString = "";
  var isCharacterRemoved = false;

  for (var i = 0; i < inputString.length; i++) {
    if (inputString[i] === characterToRemove && !isCharacterRemoved) {
      isCharacterRemoved = true; // Ensure the character is removed only once
    } else {
      updatedString += inputString[i]; // Add remaining characters
    }
  }

  return updatedString;
}

// Function to reset the input fields and result
function resetGame() {
  document.getElementById("error").textContent = "";
  document.getElementById("result").textContent = "";
  document.getElementById("name1").value = "";
  document.getElementById("name2").value = "";
}