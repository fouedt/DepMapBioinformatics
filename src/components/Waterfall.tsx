import { FormEvent, useState } from "react";

import Plot from 'react-plotly.js';

import samples from '../samples.json'
import ccle_expression from '../ccle_expression.json'

const Waterfall = () => {
    const [lineage, setLineage] = useState("lung")
    const [gene_symbol, setGene_symbol] = useState("KRAS")

    var x: string[] = []
    var y: number[] = []
    var samplesFilterd = samples.filter((sample) => sample.lineage === lineage)
    
    samplesFilterd.map((sample) => {
        var ccle_expressionFiltered = ccle_expression.filter((expression) => expression.DepMap_ID === sample.DepMap_ID && expression.gene_symbol === gene_symbol)
        y.push(ccle_expressionFiltered[0]?.expression_value)
        x.push(sample.DepMap_ID)
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return(
        <>
            <form onSubmit={e => {handleSubmit(e)}} >
                <label>lineage</label>
                <input 
                    name= "lineage"
                    type= "text"
                    value= {lineage}
                    onChange= { e => setLineage(e.target.value) }
                />
                <br />
                <label>gene_symbol</label>
                <input 
                    name= "gene_symbol"
                    type= "text"
                    value= {gene_symbol}
                    onChange= { e => setGene_symbol(e.target.value) }
                />
            </form>
            <br />
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