function Home() {
  return (
    <div className="container">
      <h1 className="mt-4">Mobile Device Usage & User Behavior Dataset</h1>
      <p>
        This dataset provides a comprehensive analysis of mobile device usage patterns and user behavior classification. 
        It contains <strong>700 samples</strong> of user data, including metrics such as app usage time, screen-on time, 
        battery drain, and data consumption. Each entry is categorized into one of five user behavior classes, 
        ranging from light to extreme usage, allowing for insightful analysis and modeling.
      </p>

      <h3>Key Features:</h3>
      <ul>
        <li><strong>User ID:</strong> Unique identifier for each user.</li>
        <li><strong>Device Model:</strong> Model of the user&apos;s smartphone.</li>
        <li><strong>Operating System:</strong> The OS of the device (iOS or Android).</li>
        <li><strong>App Usage Time:</strong> Daily time spent on mobile applications, measured in minutes.</li>
        <li><strong>Screen On Time:</strong> Average hours per day the screen is active.</li>
        <li><strong>Battery Drain:</strong> Daily battery consumption in mAh.</li>
        <li><strong>Number of Apps Installed:</strong> Total apps available on the device.</li>
        <li><strong>Data Usage:</strong> Daily mobile data consumption in megabytes.</li>
        <li><strong>Age:</strong> Age of the user.</li>
        <li><strong>Gender:</strong> Gender of the user (Male or Female).</li>
        <li><strong>User Behavior Class:</strong> Classification of user behavior based on usage patterns (1 to 5).</li>
      </ul>
    </div>
  );
}

export default Home;
