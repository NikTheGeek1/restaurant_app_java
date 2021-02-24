import './MostPopularDishes.css';
import React from 'react';
import Plot from 'react-plotly.js';
import { useEffect, useState } from 'react';
import COLOURS from '../../../constants/COLOURS';
import { convertFetchedDataToPlotData } from '../../../utils/figure-utils/popular-dishes';

const MostPopularDishes = ({ rawReceiptData }) => {
    const [polishedData, setPolishedData] = useState({});
    useEffect(() => {
        setPolishedData(convertFetchedDataToPlotData(rawReceiptData));
    }, [rawReceiptData])

    let allData;
    let layout;

    if (Object.keys(polishedData).length) {
        allData = [{
            x: polishedData.items,
            y: polishedData.counts,
            type: "bar",
            marker: { color: COLOURS.secondary }
        }];
        layout = {
            showlegend: false,
            plot_bgcolor: COLOURS.gray2,
            paper_bgcolor: "#FFF3",
            autosize: true,
            xaxis: {
                // showticklabels: false,

                tickfont: {
                    family: 'Old Standard TT, serif',
                    size: 10,
                    color: 'black'
                },
                tickcolor: COLOURS.primary,

                title: {
                    text: 'Dishes',
                    font: {
                        family: 'Courier New, monospace',
                        size: 18,
                        color: '#7f7f7f'
                    }
                }
            },
            yaxis: {
                tickfont: {
                    family: 'Old Standard TT, serif',
                    size: 15,
                    color: 'black'
                },
                tickcolor: COLOURS.primary,
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
                b: 80,
                t: 20,
                pad: 0
            },
        };
    }
    return (
        <Plot
            data={allData}
            layout={layout}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
        />
    );
};

export default MostPopularDishes;