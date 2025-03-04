import { useState } from 'react'; 

function Search() {
  const [filterType, setFilterType] = useState('');
  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

      // Handle non-200 responses (e.g., 404, 500, etc.)
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Error fetching data');
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(`Error fetching data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Search Dataset</h2>
      <div className="row">
        <div className="col-md-3">
          <select
            className="form-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">Select Filter Type</option>
            <option value="gender">Gender</option>
            <option value="operatingSystem">Operating System</option>
            <option value="model">Model</option>
            <option value="behaviorClass">Behavior Class</option>
          </select>
        </div>
        <div className="col-md-5">
          <input
            className="form-control"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter keyword"
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary" onClick={fetchData}>
            Search
          </button>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && data.length > 0 && (
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
      )}
    </div>
  );
}

export default Search;
