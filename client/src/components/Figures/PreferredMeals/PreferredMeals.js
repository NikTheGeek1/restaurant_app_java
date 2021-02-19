import './PreferredMeals.css';
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import COLOURS from '../../../constants/COLOURS';
import { convertFetchedDataToPlotData } from '../../../utils/figure-utils/customer-preferred-meals';
const PreferredMeals = ({ rawCustomerData, customer }) => {
    const [polishedData, setPolishedData] = useState({});
    useEffect(() => {
        setPolishedData(convertFetchedDataToPlotData(rawCustomerData, customer));
    }, [customer, rawCustomerData])

    let allData;
    let layout;
    if (Object.keys(polishedData).length && customer) {
        console.log(polishedData, 'PreferredMeals.js', 'line: ', '15');
        allData = [{
            labels: polishedData.items,
            values: polishedData.counts,
            type: "pie",
            marker: { color: COLOURS.primary }
        }];
        layout = {
            showlegend: false,
            plot_bgcolor: COLOURS.gray2,
            paper_bgcolor: "#FFF3",
            autosize: true,
            xaxis: {
                showticklabels: false,

                tickfont: {
                    family: 'Old Standard TT, serif',
                    size: 15,
                    color: 'black'
                },
                tickcolor: COLOURS.secondary,

                title: {
                    text: 'Customers',
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
                b: 30,
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

export default PreferredMeals;