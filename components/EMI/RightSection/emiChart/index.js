import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

function EmiChart({ principal = 1, interestPayable = 1, emi = 0 }) {
  const [safePrincipal, setSafePrincipal] = useState(principal || 1);
  const [safeEmi, setSafeEmi] = useState(emi || 0);

  useEffect(() => {
    setSafePrincipal(principal || 1);
    setSafeEmi(emi || 0);
  }, [principal, emi]);

  const speedValue = Math.min((safeEmi * 12) / safePrincipal * 100, 100);

  const data = {
    labels: [],
    datasets: [
      {
        data: [speedValue, 100 - speedValue],
        backgroundColor: ["#F37021", "#EAE9E9"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    animation: false, // Fully disable animations to prevent zoom shifting
    rotation: -90,
    circumference: 180,
    cutout: "80%",
    responsive: true,
    maintainAspectRatio: false,
    devicePixelRatio: 2, // Higher pixel precision to prevent float errors
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
    },
  };

  return (
    <div
      className="relative mx-auto w-[270px] h-[270px] min-w-[270px] min-h-[270px] text-center"
      style={{
        willChange: "transform",
        transform: "scale(1)", // Lock rendering scale
      }}
    >
      {/* Doughnut Chart */}
      <Doughnut data={data} options={options} />

      {/* Centered EMI text */}
      <div
        className="absolute left-1/2"
        style={{
          top: "calc(50% - 1px)", // Prevent subpixel jumps
          transform: "translateX(-50%)",
          fontSize: "16px",
          fontWeight: "bold",
          textAlign: "center",
          height: "50px",
        }}
      >
        Monthly EMI <br />
        ₹ {safeEmi.toLocaleString("en-IN")}
      </div>

      {/* Min and Max values */}
      <div className="absolute bottom-4 left-2 text-sm">₹0</div>
      <div className="absolute bottom-4 right-2 text-sm">
        ₹{safePrincipal.toLocaleString("en-IN")}
      </div>
    </div>
  );
}

export default EmiChart;
