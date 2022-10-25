import { useState } from "react";

import Plot from 'react-plotly.js';

import samples from '../samples.json'
import ccle_expression from '../ccle_expression.json'

const Waterfall = () => {
    var x: string[] = []
    var y: number[] = []
    var samplesFilterd = samples.filter((sample) => sample.lineage === 'lung')
    
    samplesFilterd.map((sample) => {
        var ccle_expressionFiltered = ccle_expression.filter((expression) => expression.DepMap_ID === sample.DepMap_ID && expression.gene_symbol === 'KRAS')
        y.push(ccle_expressionFiltered[0]?.expression_value)
        x.push(sample.DepMap_ID)
    })

    return(
        <>
            <Plot
                data={[
                    {
                        x: x,
                        y: y,
                        type: 'bar',
                    },
                ]}
                layout={ {xaxis: {type:'category'}, yaxis: {type: 'linear'}, title: 'Lung Expression'} }
            />
        </>
    )
}

export default Waterfall;