import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const options = {
  plugins: {
    title: {
      display: false,
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

export function Stackbarchart({ labels = [], datasets = [], type = "bar" }) {
  const data = {
    labels,
    datasets: datasets.map((dataset, index) => ({
      type: dataset.type || type,
      label: dataset.label || `Dataset ${index + 1}`,
      data: dataset.data || [],
      borderColor: dataset.borderColor || "#01b2ac",
      backgroundColor: dataset.backgroundColor || "#01b2ac",
      stack: dataset.stack,
      fill: dataset.type === "line" ? false : true,
    })),
  };

  return type === "line" ? <Line options={options} data={data} /> : <Bar options={options} data={data} />;
}

