import './LineGraphTrend.css';
import React from 'react';
import Plot from 'react-plotly.js';
import { getAllBookingsByStatus, getAllBookings } from '../../../services/booking-services';
import { useEffect, useState } from 'react';
import { convertFetchedDataToPlotData } from '../../../utils/figure-utils/line-graph-trend-utils';
import COLOURS from '../../../constants/COLOURS';

const LineGraphTrend = ({ status }) => {
    const [dailyBookingsTrendData, seDailyBookingsTrendData] = useState({});

    useEffect(() => {
        if (status === "BOTH") {
            getAllBookings(successRes => seDailyBookingsTrendData(convertFetchedDataToPlotData(successRes)));
        } else if (status === "PENDING") {
            getAllBookingsByStatus(status, successRes => seDailyBookingsTrendData(convertFetchedDataToPlotData(successRes)));
        } else if (status === "DONE") {
            getAllBookingsByStatus(status, successRes => seDailyBookingsTrendData(convertFetchedDataToPlotData(successRes)));
        }
    }, [status]);

    let allData;
    let layout;
    if (dailyBookingsTrendData.dates) {
        if (status === "PENDING") {
            allData = [{
                x: dailyBookingsTrendData.dates,
                y: dailyBookingsTrendData.counts,
                type: "scatter",
                mode: 'lines',
                marker: { color: COLOURS.primary }
            }];
        }

        if (status === "DONE") {
            allData = [{
                x: dailyBookingsTrendData.dates,
                y: dailyBookingsTrendData.counts,
                type: "scatter",
                mode: 'lines',
                marker: { color: COLOURS.tertiary }
            }];
        }
        if (status === "BOTH") {
            allData = [{
                x: dailyBookingsTrendData.dates.filter((_, idx) => dailyBookingsTrendData.status[idx] === "PENDING"),
                y: dailyBookingsTrendData.counts.filter((_, idx) => dailyBookingsTrendData.status[idx] === "PENDING"),
                type: "scatter",
                mode: 'lines',
                marker: { color: COLOURS.primary }
            },
            {   
                x: dailyBookingsTrendData.dates.filter((_, idx) => dailyBookingsTrendData.status[idx] === "DONE"),
                y: dailyBookingsTrendData.counts.filter((_, idx) => dailyBookingsTrendData.status[idx] === "DONE"),
                type: "scatter",
                mode: 'lines',
                marker: { color: COLOURS.secondary }
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
                    text: 'Dates',
                    font: {
                        family: 'Courier New, monospace',
                        size: 18,
                        color: '#7f7f7f'
                    }
                },
                type: "date",
                tickformat: '%d/%m',

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
                style={{ width: "100%", height: "100%" }}
            />
        </>


    );
};

export default LineGraphTrend;