import React, {Component, useState, useEffect} from 'react';
import Chart from 'react-apexcharts'; 
import { useSelector, useDispatch } from 'react-redux'
import { fetchStatusByResume } from './../../../actions/Dashboard'



const CandidateStatusGraph = (props) => {
    
    const series=  [{
        data: props.statusData
      }];
 
      const options =  {
          chart: {
            type: 'bar',
            height: 350
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: false,
            }
          },
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: props.statusList,
          }
        };
      
   
    return (
        <div id="chart">
            <Chart options={options} series={series} type="bar" height={350} />
        </div>
    )
}
export default CandidateStatusGraph;