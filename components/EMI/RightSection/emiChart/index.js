import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

function EmiChart({ principal, interestPayable,emi }) {
  // You can dynamically calculate the percentage based on principal or interestPayable if needed
  const speedValue = Math.min((emi * 12 / principal) * 100, 100);  // The current value to display, example: 30%
   const data = {
    labels: [], // No labels necessary
    datasets: [
      {
        data: [speedValue, 100 - speedValue],  // The first value is the filled portion, the second is the empty
        backgroundColor: ['#F37021', '#EAE9E9'], // Orange and gray to match the image
        borderWidth: 0, // Remove border for a cleaner look
      },
    ],
  };

  const options = {
    rotation: -90, // Start angle (top)
    circumference: 180, // Half-circle
    cutout: '80%', // Makes the chart more of a gauge instead of a full doughnut
    plugins: {
      tooltip: { enabled: false }, // Disable tooltips
      legend: { display: false }, // Disable legend
    },
  };

  return (
    <div className="relative mx-auto w-[270px] text-center">
      {/* Doughnut Chart */}
      <Doughnut data={data} options={options} /> 
      <div
        style={{
          position: 'absolute',
          top: '60%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '16px',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        Monthly EMI <br />
        ₹ {emi.toLocaleString('en-IN')}
      </div>

      {/* Display the min and max values */}
      <div style={{ position: 'absolute', top: '80%', left: '0%', fontSize: '14px' }}>₹0</div>
      <div style={{ position: 'absolute', top: '80%', right: '0%', fontSize: '14px' }}>{principal.toLocaleString('en-IN')}</div>
    </div>
  );
}

export default EmiChart;
