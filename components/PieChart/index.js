import React, { useEffect, useState } from "react";

const PieChart = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Return null if not yet on the client-side
  }

  const ReactApexChart = require("react-apexcharts").default;

  const chartData = {
    series: [100, 90, 10],
    options: {
      chart: {
        type: "donut",
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        colors: ["#F37021"],
      },
      plotOptions: {
        pie: {
          donut: {
            size: 80,
            labels: {
              show: true,
              name: {
                show: false,
              },
              value: {
                fontSize: 100,
                offsetY: -30,
              },
              total: {
                showAlways: true,
                show: true,
                fontSize: 80,
                formatter: (w) => {
                  const { seriesTotals = {} } = w.globals;
                  const sum = seriesTotals.reduce((a, b) => a + b, 0);
                  const avg = sum / seriesTotals.length || 0;
                  return `${Math.round(avg)}%`;
                },
              },
            },
          },
          startAngle: -90,
          endAngle: 90,
          offsetY: 10,
        },
      },
      grid: {
        padding: {
          bottom: -80,
        },
      },
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <div className="App flex ">
      <div className="flex-1 ml-10">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="donut"
        />
      </div>

      <div className="ml-10 flex flex-col justify-center">
        <ul className="list-disc list-inside">
          <li>
            <span className="text-gray-700">Principal Amount</span>
            <span className="font-bold block">₹ 3,40,000</span>
          </li>
          <li>
            <span className="text-gray-700">Total Amount</span>
            <span className="font-bold block">₹ 3,52,090</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PieChart;
