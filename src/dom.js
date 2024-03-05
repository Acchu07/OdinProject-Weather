export default function domManipulation(valueToAssign, element) {
  createTextNode(valueToAssign, element);
}

function createTextNode(valueToAssign, element) {
  const textNode = document.createTextNode(valueToAssign);
  element.appendChild(textNode);
  const elementTextValue = element.id;
  if (elementTextValue.includes('_')) {
    const textNodeAdditional = document.createTextNode(
      ` ${extractName(elementTextValue)}`,
    );
    element.appendChild(textNodeAdditional);
  }
}

export function resetInnerText(pWeather) {
  if (pWeather instanceof NodeList) {
    pWeather.forEach((element) => {
      const childTextNodes = element.childNodes;
      while (childTextNodes.length !== 1) {
        element.removeChild(childTextNodes[1]);
      }
    });
    return;
  }

  const childTextNodes = pWeather.childNodes;
  while (childTextNodes.length !== 0) {
    pWeather.removeChild(childTextNodes[0]);
  }
}

function extractName(stringValue) {
  const stringToArray = Array.from(stringValue);
  return stringToArray
    .slice(stringToArray.indexOf('_') + 1)
    .join('')
    .toUpperCase();
}

export function setDomFutureForeCast(data){
    const forecastNodeList = document.querySelectorAll('.forecast');
    forecastNodeList.forEach((article)=>{
        const elementsInArticle = Array.from(article.children);
        elementsInArticle[0].innerText = data.date;
        elementsInArticle[1].innerText = data.day.condition.text;
        elementsInArticle[2].src = data.day.condition.icon;
    });
}
