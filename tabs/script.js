const data = [
  {
    title: "HTML",
    content:
      "HTML text mdom text mdom text mdom text mdom text mdom text mdom text mdom text mdom text mdom text mdom text mdom text mdom text mdom text ",
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

class Tabs {
  constructor(parentSelector, data) {
    this.container = document.querySelector(parentSelector);
    this.init(data);
  }

  init(data) {
    // state, props & variables
    this.data = data;
    this.activeId = 0;

    // rendering part
    this.render();
  }

  // event handlers
  handleClick = (e) => {
    if (!e.target.classList.contains("tabs__tab-btn")) return;

    const tabId = Number(e.target.dataset.index);
    this.activeId = tabId;
    this.tabsContent.innerText = this.data[this.activeId].content;
    return;
  };

  // component rendering
  getTab(title, idx) {
    const tab = document.createElement("button");
    tab.setAttribute("class", "tabs__tab-btn");
    tab.setAttribute("data-index", idx);
    tab.innerText = title;

    return tab;
  }

  getTabs() {
    const tabsContainer = document.createElement("div");
    tabsContainer.setAttribute("class", "tabs__container");

    const tabsHeader = document.createElement("div");
    tabsHeader.setAttribute("class", "tabs__header");

    const tabs = this.data.map((tab, idx) => this.getTab(tab.title, idx));

    const tabContent = document.createElement("div");
    tabContent.setAttribute("class", "tabs__content");
    tabContent.innerText = this.data[this.activeId].content;

    tabsHeader.append(...tabs);
    tabsContainer.append(tabsHeader, tabContent);

    tabsHeader.addEventListener("click", this.handleClick);

    return tabsContainer;
  }

  render() {
    this.tabs = this.getTabs();
    this.tabsContent = this.tabs.querySelector(".tabs__content");

    this.container.append(this.tabs);
  }
}

new Tabs(".app__content", data);
