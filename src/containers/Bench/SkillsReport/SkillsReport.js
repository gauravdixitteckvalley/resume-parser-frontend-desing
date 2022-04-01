import React, { useEffect } from 'react';
import Chart from 'react-apexcharts'; 
import { fetchSkillsReports } from '../../../actions/Skills'
import { useSelector, useDispatch } from 'react-redux';
import BlockUI from "../../../components/BlockUI/";

export default function SkillsReport(props) {
  const skills = useSelector(state => state?.skills);
  const dispatch = useDispatch();
  const { blocking,skillsCandidList,skillsList } = skills;
  
  useEffect(() => {
    dispatch(fetchSkillsReports()) // action is called to fetch skills category list

  }, []);// eslint-disable-line react-hooks/exhaustive-deps
    const options =  {
        series: skillsCandidList ? skillsCandidList : [],
        colors: [
          "#ff0000",
          "#ffbf00",
          "#ffff00",
          "#40ff00",
          "#00ffff",
          "#0000ff",
          "#8000ff",
          "#ff00ff",
          "#ff0000",
          "#000000",
          "#008B8B",
          "#006400",
          "#00FFFF",
          "#00BFFF",
          "#2F4F4F",
          "#4B0082",
          "#556B2F",
          "#5F9EA0",
          "#696969",
          "#800000",
          "#8B4513",
          "#BA55D3",
          "#B8860B",
          "#BDB76B",
          "#CD5C5C",
          "#D8BFD8",
          "#F4A460",
          "#FF8C00",
          "#FF69B4",
          "#7B68EE",
          "#98FB98",
          "#BC8F8F",
          "#8B4513",
          "#ADD8E6",
          "#FAFAD2"
         ],
        chart: {
        width: 380,
        type: 'pie',
      },
      labels: skillsList ? skillsList: [],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
      };

    return (
      <>
        <BlockUI blocking={blocking} />
        <div className="donut">
          <Chart options={options} series={options.series} type="pie" width="90%" />
        </div>
      </>
    );
}