import './sass/index.scss';
var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
};

refs.input.addEventListener('input', debounce(onEventInput, DEBOUNCE_DELAY));

function onEventInput(e) {
  e.preventDefault();
  const value = e.target.value;

  fetchCountries(value)
    .then(renderCountriesCard)
    .catch(error => console.error(error));
}

function fetchCountries(value) {
  return fetch(
    `https://restcountries.com/v2/name/${value}?fields=name,official,capital,population,flags,languages`
  ).then(response => {
    return response.json();
  });
}

function renderCountriesCard(countries) {
  const markup = countries
    .map(({ name, capital, population, flags, languages }) => {
      const values = Object.values(languages);
      return `<li>
    <svg><use href="${flags.svg}"></use></svg> ${name}
  </li>
  <li>Capital: ${capital}</li>
  <li>Population: ${population}</li>
  <li>Languages: ${languages.map(({ name }) => name)}</li>`;
    })
    .join('');
  refs.list.innerHTML = markup;
}
