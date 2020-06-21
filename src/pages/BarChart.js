import React, { useEffect } from 'react';
import {
  Tooltip,
  ChartProvider, XAxis, YAxis, BarSeries, Rectangle
} from 'rough-charts';

//const colors = ["#9c27b0", "#ff9800", "#f44336", "#4caf50", "#00acc1", "#e91e63"]
//const fillStyles = ['hachure', 'solid', 'zigzag', 'cross-hatch', 'dots', 'sunburst', 'dashed', 'zigzag-line']

function BarChart(props){
    const { data, xChartPos } = props;

    const getSVG = () => {
      var svg = document.querySelectorAll('svg')
      svg[svg.length-1].setAttributeNS(null, "font-family", "'Patrick Hand', cursive")
      return svg[svg.length-1];
    }

    const addTextToSVG = (chartsvg, x, y, fontSize, content) => {
      var newText = document.createElementNS("http://www.w3.org/2000/svg","text");
        newText.id = "GHUcgnpr_0"
        newText.setAttributeNS(null,"x", x);     
        newText.setAttributeNS(null,"y",y);
        newText.setAttributeNS(null,"font-family","'Patrick Hand', cursive"); 
        newText.setAttributeNS(null,"font-size", fontSize);
        newText.innerHTML = content
        chartsvg.appendChild(newText);
    }

    useEffect(() => {
      
      var chartsvg = getSVG();
      while(chartsvg.lastChild){
        if(chartsvg.childNodes.length === 1)
          break;
        chartsvg.lastChild.remove();
      }

      var newtitle = document.getElementsByName('title')[0].value;
      if(newtitle !== ''){
        addTextToSVG(chartsvg, xChartPos-(newtitle.length/2*9), 390, "24", newtitle)
      }
    })

    return(
    <ChartProvider
        height={400}
        data={data}
        margin={{
          top: 70,
          bottom: 70
        }}
    >
        <YAxis/>
        <XAxis dataKey="name" />
        <BarSeries
          dataKey="value"
        >
          {
            (item, itemProps, index) => (
              <Rectangle
                key={index}
                {...itemProps}
                options={{
                  ...itemProps.options,
                  fill: data[index].color,
                  fillStyle: data[index].fillStyle,
                }}
              />
            )
          }
        </BarSeries>
        <Tooltip/>
    </ChartProvider>
    )
}

export default BarChart