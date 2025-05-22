class StarRating {
  constructor(parentSelector) {
    this.container = document.querySelector(parentSelector);
    this.init();
  }

  init() {
    // state, props & variables
    this.totalStars = 5;
    this.hoverId = -1;
    this.activeId = -1;

    // rendering
    this.render();
  }

  // utils
  highLightStars = (starId) => {
    Array.from(this.stars.children).forEach((star, idx) => {
      if (idx <= starId) star.classList.add("star--active");
      else star.classList.remove("star--active");
    });
  };

  // event handlers
  handleMouseOver = (e) => {
    if (!e.target.classList.contains("star")) return;

    const starId = Number(e.target.dataset.index);
    this.hoverId = starId;

    this.highLightStars(this.hoverId);
    return;
  };

  handleMouseOut = (e) => {
    if (!e.target.classList.contains("star")) return;

    this.highLightStars(this.activeId);

    return;
  };

  handleClick = (e) => {
    if (!e.target.classList.contains("star")) return;
    const starId = Number(e.target.dataset.index);
    this.activeId = starId;

    this.highLightStars(this.activeId);

    return;
  };

  // components
  getStar(idx) {
    const button = document.createElement("button");
    button.setAttribute("class", "star");
    button.setAttribute("data-index", idx);
    button.innerText = "★";

    return button;
  }

  getStars() {
    const starsContainer = document.createElement("div");
    starsContainer.setAttribute("class", "stars-container");

    const stars = Array.from({ length: this.totalStars }).map((_, idx) =>
      this.getStar(idx)
    );

    starsContainer.append(...stars);

    starsContainer.addEventListener("mouseover", this.handleMouseOver);
    starsContainer.addEventListener("mouseout", this.handleMouseOut);
    starsContainer.addEventListener("click", this.handleClick);

    return starsContainer;
  }

  render() {
    this.stars = this.getStars();
    this.container.append(this.stars);

    return;
  }
}

new StarRating(".app__content");
