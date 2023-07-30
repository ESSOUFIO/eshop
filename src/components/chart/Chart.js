import styles from "./Chart.module.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Card from "../card/Card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
};

const Chart = ({ orders }) => {
  //create new array of order status
  const array = orders.map((order) => order.orderStatus);

  const getOrderCount = (arr, status) => {
    return arr.filter((el) => el === status).length;
  };

  const placed = getOrderCount(array, "Order Placed..");
  const processing = getOrderCount(array, "Processing..");
  const shipped = getOrderCount(array, "Shipped..");
  const delivered = getOrderCount(array, "Delivered");

  const data = {
    labels: ["Placed Order", "Processing", "Shipped", "Delivered"],
    datasets: [
      {
        label: "Order count",
        data: [placed, processing, shipped, delivered],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className={styles.charts}>
      <Card cardClass={styles.card}>
        <h3>Order Status Chart</h3>
        <Bar options={options} data={data} />
      </Card>
    </div>
  );
};

export default Chart;
