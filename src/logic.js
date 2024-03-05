import domManipulation, { setDomFutureForeCast } from './dom';

export default async function getCityWeatherInformation(cityName) {
  const weatherApiURL = `https://api.weatherapi.com/v1/current.json?key=195e2daa2fe348619e533508240303&q=${cityName}`;
  const response = await fetch(weatherApiURL, { mode: 'cors' });
  if (response.ok) {
    const objectData = await response.json();
    assignValuesWeatherInfo(objectData.current);
    assignValuesPlaceForecast(cityName, objectData);
    return objectData;
  }
  alert(
    `Hey The location you entered is either not valid or is not registered on the weatherAPI being used. Please try a Different Location`,
  );
}

function assignValuesWeatherInfo(objectData) {
  const nodePWeather = document.querySelectorAll('#weather-info p');
  nodePWeather.forEach((element) => {
    const idToAssign = element.id;
    const valueToAssign = searchInObject(objectData, idToAssign);
    domManipulation(valueToAssign, element);
  });
}

function searchInObject(objectData, idToAssign) {
  for (let property in objectData) {
    if (idToAssign === property) {
      return objectData[property];
    }
  }
}

function assignValuesPlaceForecast(cityName, objectData) {
  const foreCastFor = document.querySelector('#place-forecast');
  const locationTemperature = document.querySelector('#temp_c');
  const temperatureImage = document.querySelector('#current-temperature');

  domManipulation(objectData.current.temp_c, locationTemperature);
  domManipulation(cityName, foreCastFor);

  temperatureImage.src = objectData.current.condition.icon;
}

export function getCityWeatherForecast(cityName) {
  const weatherApiURL = `https://api.weatherapi.com/v1/forecast.json?key=195e2daa2fe348619e533508240303&q=${cityName}&days=2`;
  fetch(weatherApiURL, { mode: 'cors' })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setDomFutureForeCast(data.forecast.forecastday[0]);
      setDomFutureForeCast(data.forecast.forecastday[1]);
    })
    .catch((error) => {
      console.log(`error occurerd while fetching ${error}`);
    });
}

export function getGiphy(data) {
  const value = data.current.condition.text;
  fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=NxOzlZpYylCtFMi0opBY2FUJffdMS7Hv&s=${value}`,
    { mode: 'cors' },
  )
    .then((data2) => {
      return data2.json();
    })
    .then((data3) => {
      const value = document.querySelector('body');
      const newValue = value.lastElementChild;
      newValue.src = data3.data.images["480w_still"].url;
    });
}
