import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts'; 
import { fetchSkillsReports } from '../../../actions/Skills'
import { useSelector, useDispatch } from 'react-redux'

export default function SkillsReport(props) {
   // const options = { labels: ["Comedy", "Action", "Romance", "Drama", "SciFi"] };
    //const series = [200, 5, 6, 1, 5]; //our data
    const jobs = useSelector(state => state.job);
    
  const dispatch = useDispatch();
 // const { blocking,jobPostedList } = jobs;
  const [selectedRowId, setSelectedRowId] = useState('');
  
  useEffect(() => {
    dispatch(fetchSkillsReports()) // action is called to fetch skills category list

  }, []);// eslint-disable-line react-hooks/exhaustive-deps
    const options =  {
        series: [44, 55, 13, 43, 22],
        chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
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
      <div className="donut">
        <Chart options={options} series={options.series} type="pie" width="380" />
      </div>
    );
}