import { renderCountryDetails } from "./dom-utils.js"

export const renderDetail = () => {
  const searchParams = new URLSearchParams(window.location.search)
  const countryCode = searchParams.get('country')

  if (!countryCode || countryCode === "undefined") {
    window.location.href = "/"
  }

  const API_URL_DETAIL = `https://restcountries.com/v3.1/alpha/${countryCode}`
  let country;

  fetch(API_URL_DETAIL)
      .then((res) => res.json())
      .then(([country]) => {

            if (!country) {
              goBackToDashboard();
            }
        console.log(country)

        country = {
                capital: country.capital && country.capital[0],
                population: country.population.toLocaleString(),
                nativeName: Object.values(country.name.nativeName)[0].official,
                name: country.name.common,
                code: country.cioc,
                region: country.region,
                subregion: country.subregion,
                flagUrl: country.flags.png,
                currencies: Object.values(country.currencies).map((currency) => currency.name).join(", "),
                languages: Object.values(country.languages).join(', '),
                tld: country.tld[0],
                borders: country.borders
              }
            return renderCountryDetails(country)
            });
}

const goBackToDashboard = () => {
  window.location.href = "/";
}
