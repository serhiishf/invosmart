import { CSSProperties } from 'react';
import { countries, CountryType } from 'constants/countries';

const suggestedCountries = countries.filter((country) => country.suggested === true);

export const textExamples = {
  longText:
    "A very long text value that exceeds the typical length to test the input handling and see how it manages overflow and performance. This should be long enough to trigger any potential issues with long input values. Furthermore, adding additional sentences helps to better evaluate the system's capability to process and manage extensive text input without compromising performance or causing any unexpected behavior. By doing so, we can ensure that the system remains robust and reliable, even when faced with unusually large amounts of data. This also allows us to identify any potential bottlenecks or inefficiencies in the handling of extensive text inputs. Consequently, it's essential to extend this text further to cover a wide range of scenarios and edge cases that might arise during real-world usage. Moreover, this extended text serves as a valuable test case for developers to refine and optimize their systems, ensuring seamless user experiences regardless of input size. The goal is to create a highly efficient and scalable system that can gracefully manage and process long text inputs without degradation in performance. Testing with such comprehensive and lengthy text inputs is a crucial step in achieving this objective. By thoroughly evaluating the system's response to this extended text, we gain insights into its capacity to handle large-scale inputs, thereby reinforcing its reliability and robustness in diverse use cases. This approach ensures that all potential issues are addressed, paving the way for a more resilient and effective system that meets users needs and expectations in various demanding scenarios.",
};

export const optionExamples = {
  withoutIcon: {
    citiesLongList: [
      { label: 'Tallinn', value: 'Tallinn' },
      { label: 'Tartu', value: 'Tartu' },
      { label: 'Narva', value: 'Narva' },
      { label: 'Pärnu', value: 'Pärnu' },
      { label: 'Kohtla-Järve', value: 'Kohtla-Järve' },
      { label: 'Viljandi', value: 'Viljandi' },
      { label: 'Rakvere', value: 'Rakvere' },
      { label: 'Sillamäe', value: 'Sillamäe' },
      { label: 'Maardu', value: 'Maardu' },
      { label: 'Kuressaare', value: 'Kuressaare' },
      { label: 'Võru', value: 'Võru' },
      { label: 'Valga', value: 'Valga' },
      { label: 'Jõhvi', value: 'Jõhvi' },
      { label: 'Haapsalu', value: 'Haapsalu' },
      { label: 'Paide', value: 'Paide' },
      { label: 'Keila', value: 'Keila' },
      { label: 'Kiviõli', value: 'Kiviõli' },
      { label: 'Türi', value: 'Türi' },
      { label: 'Elva', value: 'Elva' },
      { label: 'Saue', value: 'Saue' },
      { label: 'Põlva', value: 'Põlva' },
      { label: 'Tõrva', value: 'Tõrva' },
      { label: 'Paldiski', value: 'Paldiski' },
      { label: 'Laagri', value: 'Laagri' },
      { label: 'Rapla', value: 'Rapla' },
      { label: 'Jõgeva', value: 'Jõgeva' },
      { label: 'Saku', value: 'Saku' },
      { label: 'Mustvee', value: 'Mustvee' },
      { label: 'Otepää', value: 'Otepää' },
      { label: 'Kehra', value: 'Kehra' },
    ],
    citiesShortList: [
      { label: 'Elva', value: 'Elva' },
      { label: 'Tallinn', value: 'Tallinn' },
      { label: 'Kehra', value: 'Kehra' },
    ],
    oneCityFromLongList: { label: 'Kuressaare', value: 'Kuressaare' },
    oneCityFromShortList: { label: 'Tallinn', value: 'Tallinn' },
  },
  withIcon: {
    allCountries: prepareCountryOptions(countries),
    suggestedCountries: prepareCountryOptions(suggestedCountries),
    oneCountry: {
      value: 'FI',
      label: 'Finland',
      icon: (
        <img
          loading="lazy"
          srcSet={`https://flagcdn.com/w40/ee.png 2x`}
          src={`https://flagcdn.com/w20/ee.png`}
          alt=""
        />
      ),
    },
  },
};

export const styleData: { [key: string]: CSSProperties } = {
  flexColumn: { display: 'flex', flexDirection: 'column', gap: '2rem' },
  flexRow: { display: 'flex', flexDirection: 'row', gap: '2rem' },
  button: {
    height: '40px',
    padding: '10px',
    border: '1px solid grey',
  },
};

function prepareCountryOptions(countries: readonly CountryType[]) {
  return countries.map((country) => {
    return {
      label: country.label,
      value: country.code,
      icon: (
        <img
          loading="lazy"
          srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
          src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
          alt=""
        />
      ),
    };
  });
}
