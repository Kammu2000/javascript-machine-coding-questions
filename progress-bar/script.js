class ProgressBar {
  constructor(parentSelector) {
    this.container = document.querySelector(parentSelector);
    this.init();
  }

  init() {
    // state & variables
    this.width = 0;
    this.intervalId = null;

    // rendering
    this.render();

    // side effects after component mounting
    // this.startProgress();
  }

  // event handlers
  startProgress = () => {
    this.intervalId = setInterval(() => {
      this.width += 5;
      this.progressBarProgress.style.width = `${this.width}%`;

      if (this.width == 100) {
        this.stopProgress();
        this.controlBtn.disabled = true;
      }
    }, 1000);

    this.controlBtn.innerText = "Stop";
    return;
  };

  stopProgress = () => {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.controlBtn.innerText = "Start";
    return;
  };

  handleProgress = () => {
    if (this.intervalId) {
      this.stopProgress();
    } else this.startProgress();
  };

  // components & their rendering logic
  getProgressBar() {
    const container = document.createElement("div");
    container.setAttribute("class", "progress-bar__container");

    const parent = document.createElement("div");
    parent.setAttribute("class", "progress-bar");

    const child = document.createElement("div");
    child.setAttribute("class", "progress-bar__progress");

    const button = document.createElement("button");
    button.setAttribute("class", "progress-bar__control-btn");
    button.innerText = "Start";

    button.addEventListener("click", this.handleProgress);

    parent.append(child);
    container.append(parent, button);

    return container;
  }

  render() {
    // elements
    this.progressBar = this.getProgressBar();
    this.progressBarProgress = this.progressBar.querySelector(
      ".progress-bar__progress"
    );
    this.controlBtn = this.progressBar.querySelector(
      ".progress-bar__control-btn"
    );

    this.container.append(this.progressBar);
  }
}

// elements
const addBtn = document.querySelector(".app__add-btn");

// event listeners
addBtn.addEventListener("click", () => {
  new ProgressBar(".app__content");
});
