import Chart from 'react-apexcharts'; 

export default function Reports(props) {

    const series=  [{
        name: 'Bench Employee',
        data: props.candidateList ? props.candidateList : []
      }];
 
      const options =  {
          chart: {
            type: 'bar',
            height: 550
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: true,
            }
          },
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: props.TlList ? props.TlList :[]
          }
        };
      
   
    return (
        <div id="chart">
            <Chart options={options} series={series} type="bar" height={550} />
        </div>
    )
}