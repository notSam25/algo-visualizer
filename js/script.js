//script.js

const algoDiv = document.getElementById("data");
const timeStep = 0.2; // in seconds
const arraySize = 20;
const maxNumber = 100;

// Class that sorts and array via BubbleSort algorithm
class BubbleSort {
  // Constructor that sets the array to random numbers
  constructor() {
    this.arrayToSort = [];
    for (let i = 0; i < arraySize; i++) {
      this.arrayToSort.push(Math.floor(Math.random() * (maxNumber + 1)));
    }
  }

  // Function that swaps two elements in an array
  swap(index1, index2) {
    let temp = this.arrayToSort[index1];
    this.arrayToSort[index1] = this.arrayToSort[index2];
    this.arrayToSort[index2] = temp;
  }

  // Function that implements the BubbleSort algorithm
  async sort() {
    for (let i = 0; i < this.arrayToSort.length - 1; i++) {
      let swapped = false;
      for (let j = 0; j < this.arrayToSort.length - i - 1; j++) {
        if (this.arrayToSort[j] > this.arrayToSort[j + 1]) {
          // render the current state of the array
          render(this.arrayToSort, i, j);

          this.swap(j, j + 1);
          swapped = true;

          // Delay the sorting algo so a person can perceive the process on screen
          await new Promise((resolve) => setTimeout(resolve, timeStep * 1000));
        }
      }
      if (!swapped) {
        break;
      }

      // Render the final output
      render(this.arrayToSort, -1, -1);
    }
  }
}

// Function that renders the current progress of the array sorting
function render(array, curPosition, swapPosition) {
  if (!algoDiv) {
    console.error("Failed to find algoDiv element");
    return;
  }

  // remove any previous artifacts so we can only render the most up-to-date data
  const elementsToRemove = algoDiv.getElementsByClassName("number-div");
  Array.from(elementsToRemove).forEach(function (element) {
    element.parentNode.removeChild(element);
  });

  // iterate over all of the array elements
  array.forEach((element, index) => {
    // create the div for the number
    let elementDiv = document.createElement("div");
    elementDiv.classList.add("number-div");

    // style the div's height and color
    elementDiv.style.width = `${algoDiv.clientWidth / array.length}px`;
    elementDiv.style.height = `${(array[index] / Math.max(...array)) * 100}%`;
    elementDiv.style.backgroundColor = "black";

    // create the text for the number
    let elementParagraph = document.createElement("p");
    elementParagraph.textContent = element;

    // color the current position and swap position elements differently
    if (index === curPosition && curPosition !== -1) {
      elementDiv.style.backgroundColor = "green";
      elementParagraph.style.color = "green";
    } else if (index === swapPosition && swapPosition !== -1) {
      elementDiv.style.backgroundColor = "red";
      elementParagraph.style.color = "red";
    }

    // finalize and append the number-div
    elementDiv.appendChild(elementParagraph);
    algoDiv.appendChild(elementDiv);
  });
}

// On page load, create the bubble sort algo
document.addEventListener("DOMContentLoaded", () => {
  new BubbleSort().sort();
});
