import React, { useEffect } from 'react';
import {
  Tooltip,
  ChartProvider, Arc, ArcSeries
} from 'rough-charts';
import rough from 'roughjs/dist/rough.umd';

//const colors = ["#9c27b0", "#ff9800", "#f44336", "#4caf50", "#00acc1", "#e91e63"]
//const fillStyles = ['hachure', 'solid', 'zigzag', 'cross-hatch', 'dots', 'sunburst', 'dashed', 'zigzag-line']

function PieChart(props){
    const { data, xChartPos } = props;

    const getSVG = () => {
      var svg = document.querySelectorAll('svg')
      svg[svg.length-1].setAttributeNS(null, "font-family", "'Patrick Hand', cursive")
      return svg[svg.length-1];
    }

    const getValue = (name) => {
      try{
        return document.getElementsByName(name)[0].value;
      } catch(err){
        return '';
      }
    }

    const addTextToSVG = (chartsvg, x, y, fontSize, content) => {
      var newText = document.createElementNS("http://www.w3.org/2000/svg","text");
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

      var rc = rough.svg(chartsvg);
      var mt = 0, mt2 = 0;
      for(var i = 0; i < data.length; ++i){
        var caption = getValue("name" + i);
        var node = '';
        if(i < 5){
          node = rc.rectangle(xChartPos + 250, mt+150-(data.length/2*26), 20, 20, {fill: data[i].color, fillStyle: data[i].fillStyle});
          chartsvg.appendChild(node);
          addTextToSVG(chartsvg, xChartPos+280, mt+165-(data.length/2*26), "18", caption);
          mt += 40;
        } else {
          node = rc.rectangle(xChartPos + 400, mt2+150-(data.length/2*26), 20, 20, {fill: data[i].color, fillStyle: data[i].fillStyle});
          chartsvg.appendChild(node);
          addTextToSVG(chartsvg, xChartPos + 430, mt2+165-(data.length/2*26), "18", caption);
          mt2 += 40;
        }
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
      <ArcSeries
        dataKey="value">
          {(item, itemProps, index) => (
            <Arc
              key={index}
              {...itemProps}
              options={{
                fill: data[index].color,
                fillStyle: data[index].fillStyle
              }}
            />
          )}
        </ArcSeries>
      <Tooltip/>
    </ChartProvider>
    )
}

export default PieChart