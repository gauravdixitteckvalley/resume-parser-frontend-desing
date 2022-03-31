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