
import Chart from 'react-apexcharts'; 
const CandidateStatusGraph = (props) => {
    
    const series=  [{
        data: props.statusData ? props.statusData :''
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