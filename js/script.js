//script.js

const timeStep = 2; // in seconds

class BubbleSort {
  constructor() {
    this.arrayToSort = [];
    for (let i = 0; i < 18; i++) {
      this.arrayToSort.push(Math.floor(Math.random() * 101));
    }
  }

  swap(index1, index2) {
    let temp = this.arrayToSort[index1];
    this.arrayToSort[index1] = this.arrayToSort[index2];
    this.arrayToSort[index2] = temp;
  }

  async sort() {
    this.printArray();

    for (let i = 0; i < this.arrayToSort.length - 1; i++) {
      let swapped = false;
      for (let j = 0; j < this.arrayToSort.length - 1 - i; j++) {
        if (this.arrayToSort[j] > this.arrayToSort[j + 1]) {
          this.swap(j, j + 1);
          swapped = true;
          this.printArray();
          await new Promise((resolve) => setTimeout(resolve, timeStep * 1000));
        }
      }
      if (!swapped) {
        break;
      }
    }
    console.log("done sorting!");
  }

  printArray() {
    console.log(this.arrayToSort);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const algoDiv = document.getElementById("data");
  const computedStyle = window.getComputedStyle(algoDiv);
  const myBubbleSort = new BubbleSort();
  let array = myBubbleSort.arrayToSort;
  array.forEach((element, index) => {
    let elementDiv = document.createElement("div");
    elementDiv.classList.add("number-div");
    elementDiv.style.width =
      parseInt(computedStyle.width) / array.length -
      elementDiv.style.marginLeft +
      "px";
    elementDiv.style.height = "100%";
    elementDiv.style.backgroundColor = "black";
    algoDiv.appendChild(elementDiv);
  });
});
