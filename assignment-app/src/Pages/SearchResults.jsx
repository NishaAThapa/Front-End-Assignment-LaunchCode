import React from 'react';

function SearchResults({ data, loading }) {
  if (loading) {
    return <p>Loading Records...</p>;
  }

  return (
    <div>
      {data.length > 0 ? (
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
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default SearchResults;
