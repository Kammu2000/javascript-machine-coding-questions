class Accordion {
  constructor(parentSelector, title, content) {
    this.container = document.querySelector(parentSelector);
    this.init(title, content);
  }

  init(title, content) {
    // state, props, variables
    this.title = title;
    this.content = content;

    this.render();
  }

  // event handlers
  handleClick = () => {
    this.accordionContent.classList.toggle("accordion__content--active");
    this.accordionIcon.classList.toggle("accordion__icon--active");
    return;
  };

  // component rendering
  getAccordion() {
    const container = document.createElement("section");
    container.setAttribute("class", "accordion");

    const header = document.createElement("header");
    header.setAttribute("class", "accordion__header");

    const heading = document.createElement("p");
    heading.innerText = `${this.title}`;

    const icon = document.createElement("span");
    icon.setAttribute("class", "accordion__icon");

    const content = document.createElement("main");
    content.setAttribute("class", "accordion__content");
    content.innerText = `${this.content}`;

    header.append(heading, icon);
    container.append(header, content);

    header.addEventListener("click", this.handleClick);

    return container;
  }

  render() {
    this.accordion = this.getAccordion();
    this.accordionContent = this.accordion.querySelector(".accordion__content");
    this.accordionIcon = this.accordion.querySelector(".accordion__icon");

    this.container.append(this.accordion);
  }
}

const data = [
  {
    title: "HTML",
    content:
      "Ramdom text mdom text mdom text mdom text mdom text mdom text mdom text mdom text mdom text mdom text mdom text mdom text mdom text mdom text ",
  },
  {
    title: "CSS",
    content:
      "CSS releated messages text mdom text mdom text mdom text mdom text mdom text mdom text mdom text ",
  },
  {
    title: "Javascript",
    content:
      "Javascript text mdom text mdom text mdom text mdom text mdom text mdom text mdom text mdom text mdom text mdom text mdom text ",
  },
];

data.forEach(
  (item) => new Accordion(".app__content", item.title, item.content)
);
