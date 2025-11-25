import { nutrimentsData } from "@/utils/nutrimentsData";
import { useState } from "react"
import { CategoryScale } from 'chart.js';
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { Product } from "@/Type/ProductType";

type PieChartProps = {
  item: Product;
}

export const PieChart = ({ item }: PieChartProps) => { 
  Chart.register(CategoryScale);
  const { data } = nutrimentsData(item);
  
  const [chartData, setChartData] = useState({
    labels: data.map((d) => d.nutriment), 
    datasets: [
      {
        data: data.map((d) => d.value),
        backgroundColor: ["#4DB6AC", "#FFB74D", "#BA68C8"],
        borderColor: "black",
        borderWidth: 0
      }
    ]
  });

  const option = {
    plugins: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const value = context.raw;
            return `${value} g`;
          }
        }
      }
    }
  }

  return (
    <div className="w-[120px] h-[120px]">
      <Pie
        data={chartData}
        options={option}
      />
    </div>
  )
}
