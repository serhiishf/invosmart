import { CSSProperties } from 'react';
import { countries, CountryType } from 'mocks/shared/countries';

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
    personsWithDetails: [
      {
        value: 'Alice Johnson 1',
        label: 'Alice Johnson',
        details: 'alice.johnson@example.com, 123-456-7890, 123 Elm St, Springfield, 12345, USA',
      },
      {
        value: 'Alice Johnson 2',
        label: 'Alice Johnson',
        details: 'ajohnson@example.net, 987-654-3210, 456 Oak St, Metropolis, 54321, USA',
      },
      {
        value: 'Bob Brown',
        label: 'Bob Brown',
        details: 'bob.brown@example.com, 234-567-8901, 789 Pine St, Smalltown, 23456, USA',
      },
      {
        value: 'Charlie Davis',
        label: 'Charlie Davis',
        details: 'charlie.davis@example.com, 345-678-9012, 101 Maple St, Anytown, 34567, USA',
      },
      {
        value: 'David Evans',
        label: 'David Evans',
        details: 'david.evans@example.com, 456-789-0123, 202 Birch St, Village, 45678, USA',
      },
      {
        value: 'Eve Foster',
        label: 'Eve Foster',
        details: 'eve.foster@example.com, 567-890-1234, 303 Cedar St, Hamlet, 56789, USA',
      },
      {
        value: 'Frank Green',
        label: 'Frank Green',
        details: 'frank.green@example.com, 678-901-2345, 404 Spruce St, Township, 67890, USA',
      },
      {
        value: 'Grace Harris',
        label: 'Grace Harris',
        details: 'grace.harris@example.com, 789-012-3456, 505 Fir St, Borough, 78901, USA',
      },
      {
        value: 'Hank Irwin',
        label: 'Hank Irwin',
        details: 'hank.irwin@example.com, 890-123-4567, 606 Redwood St, City, 89012, USA',
      },
      {
        value: 'Ivy Johnson',
        label: 'Ivy Johnson',
        details: 'ivy.johnson@example.com, 901-234-5678, 707 Willow St, Metropolis, 90123, USA',
      },
      {
        value: 'Jack King',
        label: 'Jack King',
        details: 'jack.king@example.com, 012-345-6789, 808 Poplar St, Springfield, 01234, USA',
      },
      {
        value: 'Karen Lee',
        label: 'Karen Lee',
        details: 'karen.lee@example.com, 123-456-7890, 909 Walnut St, Anytown, 12345, USA',
      },
      {
        value: 'Leo Martin',
        label: 'Leo Martin',
        details: 'leo.martin@example.com, 234-567-8901, 1010 Ash St, Smalltown, 23456, USA',
      },
      {
        value: 'Mia Nelson',
        label: 'Mia Nelson',
        details: 'mia.nelson@example.com, 345-678-9012, 1111 Alder St, Village, 34567, USA',
      },
      {
        value: 'Nina Olsen',
        label: 'Nina Olsen',
        details: 'nina.olsen@example.com, 456-789-0123, 1212 Hickory St, Hamlet, 45678, USA',
      },
      {
        value: 'Oscar Perez',
        label: 'Oscar Perez',
        details: 'oscar.perez@example.com, 567-890-1234, 1313 Cherry St, Township, 56789, USA',
      },
      {
        value: 'Paul Quinn',
        label: 'Paul Quinn',
        details: 'paul.quinn@example.com, 678-901-2345, 1414 Elm St, Borough, 67890, USA',
      },
      {
        value: 'Quinn Roberts',
        label: 'Quinn Roberts',
        details: 'quinn.roberts@example.com, 789-012-3456, 1515 Oak St, City, 78901, USA',
      },
      {
        value: 'Rachel Smith',
        label: 'Rachel Smith',
        details: 'rachel.smith@example.com, 890-123-4567, 1616 Pine St, Metropolis, 89012, USA',
      },
      {
        value: 'Steve Taylor',
        label: 'Steve Taylor',
        details: 'steve.taylor@example.com, 901-234-5678, 1717 Maple St, Springfield, 90123, USA',
      },
      {
        value: 'Tom Underwood',
        label: 'Tom Underwood',
        details: 'tom.underwood@example.com, 012-345-6789, 1818 Birch St, Anytown, 01234, USA',
      },
      {
        value: 'Uma Vance',
        label: 'Uma Vance',
        details: 'uma.vance@example.com, 123-456-7890, 1919 Cedar St, Smalltown, 12345, USA',
      },
      {
        value: 'Victor White',
        label: 'Victor White',
        details: 'victor.white@example.com, 234-567-8901, 2020 Spruce St, Village, 23456, USA',
      },
      {
        value: 'Wendy Xander',
        label: 'Wendy Xander',
        details: 'wendy.xander@example.com, 345-678-9012, 2121 Fir St, Hamlet, 34567, USA',
      },
      {
        value: 'Xander Young',
        label: 'Xander Young',
        details: 'xander.young@example.com, 456-789-0123, 2222 Redwood St, Township, 45678, USA',
      },
      {
        value: 'Yara Zane',
        label: 'Yara Zane',
        details: 'yara.zane@example.com, 567-890-1234, 2323 Willow St, Borough, 56789, USA',
      },
      {
        value: 'Zoe Adams 1',
        label: 'Zoe Adams',
        details: 'zoe.adams@example.com, 678-901-2345, 2424 Poplar St, City, 67890, USA',
      },
      {
        value: 'Zoe Adams 2',
        label: 'Zoe Adams',
        details: 'zadams@example.net, 789-012-3456, 2525 Ash St, Metropolis, 78901, USA',
      },
      {
        value: 'Zoe Adams 3',
        label: 'Zoe Adams',
        details: 'zoe.adams2@example.com, 890-123-4567, 2626 Alder St, Springfield, 89012, USA',
      },
      {
        value: 'Zoe Adams 4',
        label: 'Zoe Adams',
        details: 'z.adams@example.org, 901-234-5678, 2727 Hickory St, Anytown, 90123, USA',
      },
    ],
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
          style={{ width: '20px' }}
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
          style={{ width: '20px' }}
          srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
          src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
          alt=""
        />
      ),
    };
  });
}
