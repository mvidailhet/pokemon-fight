export class Utils {
  static createSimpleCard(name: string) {
    const cards: HTMLElement = document.querySelector(".cards")!;

    const card = Utils.createNewElement('div', 'card', cards);
    const cardBody = Utils.createNewElement('div', 'card-body', card);
    Utils.createNewElement('h2', 'card-title', cardBody, name);
  }

  static createCard(name: string, imgUrl: string) {
    const cards: HTMLElement = document.querySelector(".cards")!;

    const card = Utils.createNewElement('div', 'card', cards);
    const cardHeader = Utils.createNewElement('div', 'card-header', card);

    const cardImg = Utils.createNewElement('div', 'card-img', cardHeader);
    cardImg.style.backgroundImage = `url(${imgUrl})`;

    const cardBody = Utils.createNewElement('div', 'card-body', card);
    Utils.createNewElement('h2', 'card-title', cardBody, name);
  }

  static createBoulderGradeTitle(title: string) {
    const cards: HTMLElement = document.querySelector(".cards")!;
    Utils.createNewElement('h3', 'boulder-grade-title', cards, title);
  }

  static createBoulderCard(name: string, grade: string, description?: string, imgUrl?: string) {
    const cards: HTMLElement = document.querySelector(".cards")!;

    const card = Utils.createNewElement('div', 'card', cards);
    const cardHeader = Utils.createNewElement('div', 'card-header', card);

    if (imgUrl) {
      const cardImg = Utils.createNewElement('div', 'card-img', cardHeader);
      cardImg.style.backgroundImage = `url(${imgUrl})`;
    }

    const cardBody = Utils.createNewElement('div', 'card-body', card);
    Utils.createNewElement('h2', 'card-title', cardBody, `${name} (${grade})`);

    Utils.createNewElement('p', 'card-description', cardBody, description);
  }

  private static createNewElement(eltName: string, className: string, parent: HTMLElement, innerHTML?: string) {
    const elt = document.createElement(eltName);
    elt.classList.add(className);
    if (innerHTML) elt.innerHTML = innerHTML;
    parent.appendChild(elt);
    return elt;
  }

  private static createTitle(currentExoIndex: number) {
    const title: HTMLElement = document.querySelector("title")!;
    const h1: HTMLElement = document.querySelector("h1")!;

    const text = currentExoIndex === 0 ? "Home" : `Exercice ${currentExoIndex}`;

    title.textContent = text;
    h1.textContent = text;
  }

  static createDescription(description: string, align?: string) {
    const descr: HTMLElement = document.querySelector(".description")!;
    descr.innerHTML = description;
    if (align) descr.style.textAlign = align;
  }

  static initPage(currentExoIndex: number) {
    Utils.createMenu(currentExoIndex);
    Utils.createTitle(currentExoIndex);
  }

  private static createMenu(currentExoIndex: number) {
    const nbExercices = 8;
    const header: HTMLElement = document.querySelector("header")!;

    const list = Utils.createNewElement('ul', 'menu', header);

    for (let i = 1; i <= nbExercices; i++) {
      const listItem = Utils.createNewElement('li', 'menu-item', list);
      if (currentExoIndex === i) listItem.classList.add("selected");

      const link = Utils.createNewElement('a', 'menu-link', listItem, `exo${i}`) as HTMLAnchorElement;
      link.href = `exo${i}.html`;
    }
  }
}
