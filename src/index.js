import './style.css';
import getCityWeatherInformation, { getCityWeatherForecast, getGiphy } from './logic.js';
import { resetInnerText } from './dom.js';

document
  .querySelector('#search-button')
  .addEventListener('click', searchLocation);

function searchLocation(event) {
  event.preventDefault();
  getCityWeatherInformation(document.querySelector('#search-city').value).then(
    (data) => {
      getGiphy(data);
    },
  );
  getCityWeatherForecast(document.querySelector('#search-city').value);
  resetStuff();
}

function resetStuff() {
  document.querySelector('#search-city').value = '';
  resetInnerText(document.querySelectorAll('#weather-info p'));
  resetInnerText(document.querySelector('#temp_c'));
  resetInnerText(document.querySelector('#place-forecast'));
}
