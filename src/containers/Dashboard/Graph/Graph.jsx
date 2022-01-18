const Graph = () => {
  return (
    <div className="row">
      <div className="col-md-7 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="clearfix">
              <h4 className="card-title float-left">
                Visit And Resumes Statistics
              </h4>
              <div
                id="visit-sale-chart-legend"
                className="rounded-legend legend-horizontal legend-top-right float-right"
              ></div>
            </div>
            <canvas id="visit-sale-chart" className="mt-4"></canvas>
          </div>
        </div>
      </div>
      <div className="col-md-5 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Traffic Sources</h4>
            <canvas id="traffic-chart"></canvas>
            <div
              id="traffic-chart-legend"
              className="rounded-legend legend-vertical legend-bottom-left pt-4"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Graph;
