import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  let changeableUrl = url;

  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    const cancelToken1 = axios.CancelToken.source();
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl, { cancelToken: cancelToken1.token });

    return { confirmed, recovered, deaths, lastUpdate, cancelToken1 };
  } catch (error) {}
};

export const fetchDailyData = async () => {
  try {
    const cancelToken1 = axios.CancelToken.source();
    const { data } = await axios.get(`${url}/daily`, {
      cancelToken: cancelToken1.token,
    });

    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));

    return modifiedData;
  } catch (error) {}
};

export const fetchCountries = async () => {
  try {
    const cancelToken1 = axios.CancelToken.source();
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`, {
      cancelToken: cancelToken1.token,
    });
    return { cancelToken1, countries: countries.map((country) => country.name)};
  } catch (error) {}
};
