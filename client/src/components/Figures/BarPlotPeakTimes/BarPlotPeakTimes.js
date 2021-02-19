import './BarPlotPeakTimes.css';
import React from 'react';
import Plot from 'react-plotly.js';
import { getAllBookings } from '../../../services/booking-services';

import { useEffect, useState } from 'react';
import { convertFetchedDataToPlotData } from '../../../utils/figure-utils/bar-plot-peak-times-utils';
import COLOURS from '../../../constants/COLOURS';

const BarPlotPeakTimes = ({ peakTimesType }) => {
    const [rawData, setRawData] = useState({});
    const [dailyBookingsData, seDailyBookingsData] = useState({});

    useEffect(() => {
        getAllBookings(successRes => setRawData(successRes));
    }, []);

    useEffect(() => {
        if (Object.keys(rawData).length) {
            seDailyBookingsData(convertFetchedDataToPlotData(rawData));
        }
    }, [peakTimesType, rawData])

    let allData;
    let layout;
    if (Object.keys(dailyBookingsData).length) {
        if (peakTimesType === "DATES") {

            allData = [{
                x: dailyBookingsData.dates.dates,
                y: dailyBookingsData.dates.counts,
                type: "bar",
                marker: { color: COLOURS.primary }
            }];
        } else if (peakTimesType === "DAYS"){    
            allData = [{
                x: dailyBookingsData.days.days,
                y: dailyBookingsData.days.counts,
                type: "bar",
                marker: { color: COLOURS.primary }
            }];
        } else {
            allData = [{
                x: dailyBookingsData.hours.times,
                y: dailyBookingsData.hours.counts,
                type: "bar",
                marker: { color: COLOURS.primary }
            }];
        }

        layout = {
            plot_bgcolor: COLOURS.gray2,
            paper_bgcolor: "#FFF3",
            autosize: true,
            xaxis: {
                tickfont: {
                    family: 'Old Standard TT, serif',
                    size: 15,
                    color: 'black'
                },
                tickcolor: COLOURS.secondary,
                ticklen: 5,
                tickwidth: 4,
                title: {
                    text: peakTimesType === "HOURS" ? 'Hours of day' : peakTimesType === "DATES" ? 'Days of month' : 'Days of week',
                    font: {
                        family: 'Courier New, monospace',
                        size: 18,
                        color: '#7f7f7f'
                    }
                },
                type: peakTimesType !== "DATES" && 'dates',
                tickformat: peakTimesType === "HOURS" ? '%H:%M' : peakTimesType !== "DATES" && '%d',

            },
            yaxis: {
                tickfont: {
                    family: 'Old Standard TT, serif',
                    size: 15,
                    color: 'black'
                },
                tickcolor: COLOURS.secondary,
                ticklen: 5,
                tickwidth: 4,
                title: {
                    text: 'Bookings',
                    font: {
                        family: 'Courier New, monospace',
                        size: 18,
                        color: '#7f7f7f'
                    }
                }
            },
            margin: {
                l: 50,
                r: 20,
                b: 50,
                t: 20,
                pad: 0
            },
        };
    }



    return (
        <>
            <Plot
                data={allData}
                layout={layout}
                useResizeHandler={true}
                style={{ width: "100%", height: "100%", minWidth: "100%" }}
            />
        </>


    );
};


export default BarPlotPeakTimes;