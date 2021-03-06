import React, {useState, useEffect} from "react";
import {fetchDailyDataForCountry} from "../../api";
import {Line} from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({country}) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyDataForCountry(country));
        };
        fetchAPI();
    }, [country]);

    const lineChart = (
        dailyData.length
            ? (
                <Line
                    data={{
                        labels: dailyData.map(({date}) => date),
                        datasets: [{
                            data: dailyData.map(({confirmed}) => confirmed),
                            label: 'Infected',
                            borderColor: '#3333ff',
                            fill: true
                        }, {
                            data: dailyData.map(({recovered}) => recovered),
                            label: 'Recovered',
                            borderColor: 'rgba(0, 255, 0, 0.5)',
                            fill: true
                        },
                            {
                            data: dailyData.map(({deaths}) => deaths),
                            label: 'Deaths',
                            borderColor: 'rgba(255, 0, 0, 0.5)',
                            fill: true
                        }],
                    }}
                />
            ) : null

    );

    return (
        <div className={styles.container}>
            {lineChart}
        </div>
    )
}

export default Chart;