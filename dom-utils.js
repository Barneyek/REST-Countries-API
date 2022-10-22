const createFlagElement = (country) => {
  const imgContainerElement = document.createElement("div");
  imgContainerElement.classList.add("flag-container")
  const imgElement = document.createElement("img");
  imgContainerElement.width = 160;
  imgContainerElement.height = 98;

  imgElement.src = country.flagUrl;
  imgElement.alt = `${country.name} flag`;
  imgContainerElement.appendChild(imgElement);
  return imgContainerElement;
};

const createInfoElement = (labelName, value) => {
  let infoElement = document.createElement("div");
  infoElement.classList.add("info-element");
  let labelElement = document.createElement("strong");
  let valueElement = document.createElement("p");
  labelElement.innerText = `${labelName}:`;
  valueElement.innerText = value;

  infoElement.appendChild(labelElement);
  infoElement.appendChild(valueElement);
  return infoElement;
};

const createCountryItemElement = (country) => {
  const countryElement = document.createElement("li");
  countryElement.classList.add("country-element")
  const anchorElement = document.createElement("a");
  anchorElement.href = `?country=${country.code}`;
  countryElement.appendChild(createFlagElement(country));

  const infoContainerElement = document.createElement("div");
  infoContainerElement.classList.add("info-container");

  let countryNameElement = document.createElement("strong");
  countryNameElement.innerText = country.name;
  countryNameElement.classList.add("country-name");

  infoContainerElement.appendChild(countryNameElement);
  infoContainerElement.appendChild(
    createInfoElement("Population", country.population)
  );

  infoContainerElement.appendChild(
    createInfoElement("Region", country.region)
  );

  infoContainerElement.appendChild(
    createInfoElement("Capital", country.capital)
  );

  anchorElement.appendChild(infoContainerElement);

  countryElement.appendChild(anchorElement);
  return countryElement;
};

const createListElement = (countries) => {
  const listElement = document.createElement("ul");
  countries.forEach(country => {
    listElement.appendChild(createCountryItemElement(country));
  });
  return listElement;
};

const createDetailButton = (text, link) => {
  const anchorElement = document.createElement("a");
  anchorElement.innerText = text;
  anchorElement.classList.add("detail-button");
  anchorElement.href = link;

  return anchorElement;
};

const createBorderCountriesContainer = (country) => {
  const borderCountriesContainerElement = document.createElement("div");
  borderCountriesContainerElement.classList.add("border-countries-container");

  const labelElement = document.createElement("strong");
  labelElement.innerText = "Border Countries";

  borderCountriesContainerElement.appendChild(labelElement);

  country.borders.forEach((border) => {
    borderCountriesContainerElement.appendChild(createDetailButton(border, `/?country=${border}`));
  });

  return borderCountriesContainerElement;
};

const createDetailElement = (country) => {
  const detailContainerElement = document.createElement('div');

  const flagImgElement = createFlagElement(country);
  const detailContentElement = document.createElement("div");
  detailContainerElement.classList.add("detail-container");
  detailContentElement.classList.add("detail-content");

  const detailRightContentElement = document.createElement("div");
  detailRightContentElement.classList.add("detail-content-info");

  const detailNameElement = document.createElement("strong");
  detailNameElement.innerText = country.name;
  detailNameElement.classList.add("detail-name");

  detailContentElement.appendChild(flagImgElement);
  detailContentElement.appendChild(detailRightContentElement);

  detailRightContentElement.appendChild(detailNameElement);
  const leftColumnElement = document.createElement("div");

  leftColumnElement.appendChild(createInfoElement("Native name", country.nativeName));
  leftColumnElement.appendChild(createInfoElement("Population", country.population));
  leftColumnElement.appendChild(createInfoElement("Region", country.region));
  leftColumnElement.appendChild(createInfoElement("Sub region", country.subregion));
  leftColumnElement.appendChild(createInfoElement("Capital", country.capital));

  const rightColumnElement = document.createElement("div");
  rightColumnElement.appendChild(
    createInfoElement("Top level domain", country.tld)
  );
  rightColumnElement.appendChild(createInfoElement("Currencies", country.currencies));
  rightColumnElement.appendChild(createInfoElement("Languages", country.languages));

  detailRightContentElement.appendChild(leftColumnElement);
  detailRightContentElement.appendChild(rightColumnElement);

  if (country.borders || country.borders.length > 0) {
    detailRightContentElement.appendChild(createBorderCountriesContainer(country));
  }

  detailContainerElement.appendChild(detailContentElement);

  return detailContainerElement;
};

export const renderCountriesList = (countries) => {
  const rootElement = document.querySelector("#app");
  rootElement.innerHTML = "";
  rootElement.appendChild(createListElement(countries));
};

export const renderCountryDetails = (country) => {
  const rootElement = document.querySelector("#app");
  rootElement.innerHTML = "";

  rootElement.appendChild(createDetailButton("Go back", "/"));
  rootElement.appendChild(createDetailElement(country));

};

