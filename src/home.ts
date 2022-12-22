import { Utils } from "./utils.js";

type PokemonGender = 'male' | 'female';

interface Pokemon {
  id: number;
  gender: PokemonGender;
  name: string;
  level: number;
  life: {
    current: number;
    total: number;
  }
}

const ennemyPokemon: Pokemon = {
  gender: 'male',
  name: 'Pikachu',
  level: 5,
  id: 25,
  life: {
    current: 20,
    total: 30,
  }
}

const playerPokemon: Pokemon = {
  gender: 'female',
  name: 'Bulbizarre',
  level: 1,
  id: 1,
  life: {
    current: 10,
    total: 19,
  }
}

function getPokemonImgFromId(id: number, isBack: boolean) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon${isBack ? '/back' : ''}/${id}.png`;
}

function createPokemonAndInfoBox(isEnnemy: boolean, pokemon: Pokemon) {
  let container: HTMLElement = document.querySelector(isEnnemy ? 'header' : 'footer')!;

  const classes = ['pokemon-and-info-container'];
  classes.push(isEnnemy? 'ennemy-pokemon-and-info-container' : 'player-pokemon-and-info-container');
  const pokemonInfoContainer = Utils.createNewElement('div', classes, container, null, false);
  createPokemonInfoBox(isEnnemy, pokemon, pokemonInfoContainer);
  createPokemonContainer(getPokemonImgFromId(pokemon.id, !isEnnemy), pokemonInfoContainer, isEnnemy);
}

function createPokemonContainer(imgUrl: string, container: HTMLElement, appendToContainer = true) {
  const pokemonContainer = Utils.createNewElement('div', ['pokemon-container'], container, null, appendToContainer);
  const pokemonImg = Utils.createNewElement('img', ['pokemon-img'], pokemonContainer);
  pokemonImg.setAttribute('src', imgUrl);
  pokemonImg.setAttribute('alt', 'pokemon');
}

function createPokemonInfoBox(isEnnemy: boolean, pokemon: Pokemon, container: HTMLElement) {
  const pokemonInfoClasses = ['pokemon-info'];
  pokemonInfoClasses.push(isEnnemy? 'ennemy-pokemon-info' : 'player-pokemon-info');
  const pokemonInfo = Utils.createNewElement('div', pokemonInfoClasses, container);

  const pokemonInfoHeader = Utils.createNewElement('div', ['pokemon-info-header'], pokemonInfo);
  const pokemonTitle = Utils.createNewElement('div', ['pokemon-title'], pokemonInfoHeader);
  const pokemonName = Utils.createNewElement('div', ['pokemon-name'], pokemonTitle, pokemon.name);

  const genderElt = createGenderSVG(pokemon.gender === 'male');
  pokemonTitle.appendChild(genderElt);

  const pokemonLevelContainer = Utils.createNewElement('div', ['pokemon-level-container'], pokemonInfoHeader);
  pokemonLevelContainer.textContent = `lvl ${pokemon.level}`;

  const pokemonLifeInfo = Utils.createNewElement('div', ['pokemon-life-info'], pokemonInfo);
  const pokemonLifePointsContainer = Utils.createNewElement('div', ['pokemon-life-points-container'], pokemonLifeInfo);
  
  const pokemonLifePoints = Utils.createNewElement('span', ['pokemon-life-points'], pokemonLifePointsContainer, pokemon.life.current.toString());
  const pokemonLifePointsSeparator = Utils.createNewElement('span', ['pokemon-life-points-separator'], pokemonLifePointsContainer, ' / ');
  const pokemonLifePointsTotal = Utils.createNewElement('span', ['pokemon-life-points-total'], pokemonLifePointsContainer, pokemon.life.total.toString());

  const pokemonLifeBarContainer = Utils.createNewElement('div', ['pokemon-life-bar-container'], pokemonLifeInfo);
  const pokemonLifeBar = Utils.createNewElement('div', ['pokemon-life-bar'], pokemonLifeBarContainer);
  const pokemonLifePercent = pokemon.life.current / pokemon.life.total * 100;
  pokemonLifeBar.style.width = pokemonLifePercent + '%';
}

function createGenderSVG(isMale: boolean = true) {
  const svgElt = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgElt.classList.add('pokemon-gender');
  svgElt.classList.add(isMale ? 'pokemon-gender-male' : 'pokemon-gender-female');
  svgElt.setAttribute('width', '24');
  svgElt.setAttribute('height', '24');
  svgElt.setAttribute('viewBox', '0 0 24 24');

  const pathElt = document.createElementNS("http://www.w3.org/2000/svg", "path");
  if (isMale) {
    pathElt.setAttribute('d', 'M21 9c0-4.97-4.03-9-9-9s-9 4.03-9 9c0 4.632 3.501 8.443 8 8.941v2.059h-3v2h3v2h2v-2h3v-2h-3v-2.059c4.499-.498 8-4.309 8-8.941zm-16 0c0-3.86 3.14-7 7-7s7 3.14 7 7-3.14 7-7 7-7-3.14-7-7z');
  } else {
    pathElt.setAttribute('d', 'M16 2v2h3.586l-3.972 3.972c-1.54-1.231-3.489-1.972-5.614-1.972-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-2.125-.741-4.074-1.972-5.614l3.972-3.972v3.586h2v-7h-7zm-6 20c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z');
  }
  
  svgElt.appendChild(pathElt);
  return svgElt;
}

createPokemonAndInfoBox(true, ennemyPokemon);

createPokemonAndInfoBox(false, playerPokemon);

