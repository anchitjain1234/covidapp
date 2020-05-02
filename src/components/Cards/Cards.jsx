import React from "react";
import {Card, CardContent, Typography, Grid} from "@material-ui/core";
import CountUp from "react-countup";
import cx from "classnames";

import styles from './Cards.module.css';

const processData = (Global, Countries, Date, country) => {
    if (country === undefined || country === "") {
        return {
            confirmed: Global.TotalConfirmed,
            recovered: Global.TotalRecovered,
            deaths: Global.TotalDeaths,
            lastUpdate: Date
        };
    }

    for (let i = 0; i < Countries.length; i++) {
        let countryInfo = Countries[i];
        if (countryInfo.Slug === country) {
            return {
                confirmed: countryInfo.TotalConfirmed,
                recovered: countryInfo.TotalRecovered,
                deaths: countryInfo.TotalDeaths,
                lastUpdate: countryInfo.Date
            }
        }
    }

    return {
        confirmed: 0,
        recovered: 0,
        deaths: 0,
        lastUpdate: new window.Date()
    };
}

const Cards = (data) => {
    if (data.data === undefined || Object.keys(data.data).length === 0) {
        return 'Loading ...';
    }
    const processedData = processData(data.data.Global, data.data.Countries, data.data.Date, data.country);
    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify={"center"}>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
                    <CardContent>
                        <Typography color={"textSecondary"} gutterBottom>Infected</Typography>
                        <Typography variant={"h5"}>
                            <CountUp start={0} end={processedData.confirmed} duration={2.5} separator={","} />
                        </Typography>
                        <Typography color={"textSecondary"}>{new Date(processedData.lastUpdate).toDateString()}</Typography>
                        <Typography variant={"body2"}>Number of active cases for COVID-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
                    <CardContent>
                        <Typography color={"textSecondary"} gutterBottom>Recovered</Typography>
                        <Typography variant={"h5"}>
                            <CountUp start={0} end={processedData.recovered} duration={2.5} separator={","} />
                        </Typography>
                        <Typography color={"textSecondary"}>{new Date(processedData.lastUpdate).toDateString()}</Typography>
                        <Typography variant={"body2"}>Number of recoveries from COVID-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
                    <CardContent>
                        <Typography color={"textSecondary"} gutterBottom>Deaths</Typography>
                        <Typography variant={"h5"}>
                            <CountUp start={0} end={processedData.deaths} duration={2.5} separator={","} />
                        </Typography>
                        <Typography color={"textSecondary"}>{new Date(processedData.lastUpdate).toDateString()}</Typography>
                        <Typography variant={"body2"}>Number of deaths caused COVID-19</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards;