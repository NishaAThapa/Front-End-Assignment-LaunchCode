import { useState } from 'react';

function Search() {
  const [filterType, setFilterType] = useState('');
  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [metrics, setMetrics] = useState(null);

  const fetchData = async () => {
    if (!filterType || !keyword) {
      setError('Please provide both filter type and keyword');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:3000/api/data/search?filterType=${filterType}&keyword=${keyword}`
      );

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Error fetching data');
      }

      const result = await response.json();
      setData(result);
      calculateMetrics(result);
    } catch (err) {
      setError(`Error fetching data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const calculateMetrics = (records) => {
    if (!records.length) return;
    
    const toNumberArray = (arr, key) => arr.map(r => Number(r[key]) || 0);
    
    const avg = (arr) => arr.length ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2) : 0;
    const median = (arr) => {
      if (!arr.length) return 0;
      const sorted = [...arr].sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      return sorted.length % 2 !== 0 ? sorted[mid] : ((sorted[mid - 1] + sorted[mid]) / 2).toFixed(2);
    };
    
    setMetrics({
      appUsage: {
        avg: avg(toNumberArray(records, "App Usage Time (min/day)")),
        median: median(toNumberArray(records, "App Usage Time (min/day)"))
      },
      screenOnTime: {
        avg: avg(toNumberArray(records, "Screen On Time (hours/day)")),
        median: median(toNumberArray(records, "Screen On Time (hours/day)"))
      },
      appsInstalled: {
        avg: avg(toNumberArray(records, "Number of Apps Installed")),
        median: median(toNumberArray(records, "Number of Apps Installed"))
      },
      age: {
        avg: Math.round(avg(toNumberArray(records, "Age"))),
        median: Math.round(median(toNumberArray(records, "Age")))
      }
    });
  };

  return (
    <div className="container">
      <h2>Search Dataset</h2>
      <div className="row mb-3">
        <div className="col-md-3">
          <select className="form-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="">Select Filter Type</option>
            <option value="gender">Gender</option>
            <option value="operatingSystem">Operating System</option>
            <option value="model">Model</option>
            <option value="behaviorClass">Behavior Class</option>
          </select>
        </div>
        <div className="col-md-5">
          <input className="form-control" type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Enter keyword" />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary" onClick={fetchData}>Search</button>
        </div>
      </div>
      
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      
      {!loading && data.length > 0 && (
        <>
          <h3>Displaying {data.length} records</h3>
          <div className="row mt-3">
            {metrics && (
              <>
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
              </>
            )}
          </div>
          <table className="table mt-3">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Device Model</th>
                <th>OS</th>
                <th>App Usage (min/day)</th>
                <th>Screen On Time (hrs/day)</th>
                <th>Battery Drain (mAh)</th>
                <th>Apps Installed</th>
                <th>Data Usage (MB)</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Behavior Class</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item["User ID"]}>
                  <td>{item["User ID"]}</td>
                  <td>{item["Device Model"]}</td>
                  <td>{item["Operating System"]}</td>
                  <td>{item["App Usage Time (min/day)"]}</td>
                  <td>{item["Screen On Time (hours/day)"]}</td>
                  <td>{item["Battery Drain (mAh/day)"]}</td>
                  <td>{item["Number of Apps Installed"]}</td>
                  <td>{item["Data Usage (MB/day)"]}</td>
                  <td>{item["Age"]}</td>
                  <td>{item["Gender"]}</td>
                  <td>{item["User Behavior Class"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default Search;
