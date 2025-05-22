class StopWatch {
  constructor(parentSelector) {
    this.container = document.querySelector(parentSelector);
    this.init();
  }

  init() {
    // state, variables
    this.time = 0;
    this.intervalId = null;

    // rendering
    this.render();
  }
  // utils
  getPadAddedTime = (value) => {
    return String(value).padStart(2, "0");
  };

  getFormattedtime = () => {
    const hours = Math.floor(this.time / 3600);
    const mins = Math.floor((this.time - hours * 3600) / 60);
    const seconds = Math.floor(this.time - hours * 3600 - mins * 60);

    return `${this.getPadAddedTime(hours)}:${this.getPadAddedTime(
      mins
    )}:${this.getPadAddedTime(seconds)}`;
  };

  // event handlers
  startTime = () => {
    this.intervalId = setInterval(() => {
      this.time++;
      this.stopWatchTime.innerText = this.getFormattedtime();
    }, 1000);
    return;
  };

  stopTime = () => {
    clearInterval(this.intervalId);
    this.intervalId = null;
    return;
  };

  resetTime = () => {
    this.stopTime();
    this.time = 0;
    this.stopWatchTime.innerText = this.getFormattedtime();
    return;
  };

  handleTime = (e) => {
    if (e.target.innerText === "Start") {
      e.target.innerText = "Stop";

      this.startTime(e);
    } else if (e.target.innerText === "Stop") {
      e.target.innerText = "Start";
      this.stopTime(e);
    } else if (e.target.innerText === "Reset") {
      e.target.previousSibling.innerText = "Start";
      this.resetTime(e);
    }

    return;
  };

  // component rendering
  getControlBtns() {
    const controlBtns = document.createElement("div");
    controlBtns.setAttribute("class", "stop-watch__control-btns");

    const startStopBtn = document.createElement("button");
    startStopBtn.setAttribute("class", "stop-watch__control-btn start-btn");
    startStopBtn.innerText = "Start";
    startStopBtn.addEventListener("click", this.handleTime);

    const resetBtn = document.createElement("button");
    resetBtn.setAttribute("class", "stop-watch__control-btn reset-btn");
    resetBtn.innerText = "Reset";
    resetBtn.addEventListener("click", this.handleTime);

    controlBtns.append(startStopBtn, resetBtn);
    return controlBtns;
  }

  getStopWatch() {
    const stopWatch = document.createElement("section");
    stopWatch.setAttribute("class", "stop-watch");

    const stopWatchTime = document.createElement("p");
    stopWatchTime.setAttribute("class", "stop-watch__time");
    stopWatchTime.innerText = this.getFormattedtime();

    const stopWatchControlBtns = this.getControlBtns();

    stopWatch.append(stopWatchTime, stopWatchControlBtns);
    return stopWatch;
  }

  render() {
    this.stopWatch = this.getStopWatch();
    this.stopWatchTime = this.stopWatch.querySelector(".stop-watch__time");
    this.container.append(this.stopWatch);
    return;
  }
}

new StopWatch(".app__content");
