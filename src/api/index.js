import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';
const url2 = 'https://api.covid19api.com';

export const fetchData = async () => {
    try {
        const {data} = await axios.get(`${url2}/summary`);
        return data;
    } catch (e) {
        console.log(e);
        return undefined;
    }
}

const fetchDailyData = async () => {
    try {
        const {data} = await axios.get(`${url}/daily`);

        return data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            recovered: 0,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate
        }));
    } catch (e) {

    }
}

export const fetchDailyDataForCountry = async (country) => {
    try {
        if (!country) {
            return fetchDailyData();
        }
        const {data} = await axios.get(`${url2}/dayone/country/${country}`);


        const fetchedData = data.map((dailyData) => ({
            confirmed: dailyData.Confirmed,
            deaths: dailyData.Deaths,
            recovered: dailyData.Recovered,
            date: dailyData.Date
        }));

        fetchedData.pop();
        let processedData = [];

        for (let i = 0; i < fetchedData.length; i++) {
            if (processedData.length === 0) {
                processedData.push(fetchedData[i]);
                continue;
            }
            const curr = fetchedData[i], comp = processedData[processedData.length - 1];
            if (comp.date === curr.date) {
                comp.confirmed += curr.confirmed;
                comp.recovered += curr.recovered;
                comp.deaths += curr.deaths;
            } else {
                processedData.push(fetchedData[i]);
            }
        }

        return processedData;
    } catch (e) {

    }
}

export const fetchCountries = async () => {
    try {
        const {data} = await axios.get(`${url2}/countries`);
        const fetchedCountires = data.map((country) => ({
            name: country.Country,
            slug: country.Slug
        }));
        return fetchedCountires.sort((a, b) => a.name.localeCompare(b.name));
    } catch (e) {

    }
}