import React from 'react';

function SearchMetrics({ metrics }) {
  if (!metrics) return null;

  return (
    <div className="row mt-3">
      <div className="col-md-3">
        <div className="card text-center p-3">
          <h5 className="card-title">App Usage Time (min/day)</h5>
          <p>Average: {metrics.appUsage.avg}</p>
          <p>Median: {metrics.appUsage.median}</p>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card text-center p-3">
          <h5 className="card-title">Screen On Time (hours/day)</h5>
          <p>Average: {metrics.screenOnTime.avg}</p>
          <p>Median: {metrics.screenOnTime.median}</p>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card text-center p-3">
          <h5 className="card-title">Number of Apps Installed</h5>
          <p>Average: {metrics.appsInstalled.avg}</p>
          <p>Median: {metrics.appsInstalled.median}</p>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card text-center p-3">
          <h5 className="card-title">Age</h5>
          <p>Average: {metrics.age.avg}</p>
          <p>Median: {metrics.age.median}</p>
        </div>
      </div>
    </div>
  );
}

export default SearchMetrics;
