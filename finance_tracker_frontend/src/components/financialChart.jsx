import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the necessary elements for Chart.js
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const FinancialStatusChart = ({ total_income, total_expense, balance }) => {
    const balanceColor = balance >= 0 ? '#4caf50' : '#f44336';

    const barChartData = {
        labels: ['Total Income', 'Total Expense', 'Balance'],
        datasets: [
            {
                label: 'Financial Status',
                data: [total_income, total_expense, balance],
                backgroundColor: ['#231c4a', '#8486f5', balanceColor],
            },
        ],
    };
    const pieChartData = {
        labels: ['Total Income', 'Total Expense', 'Balance'],
        datasets: [
            {
                data: [total_income, total_expense, balance],
                backgroundColor: ['#231c4a', '#8486f5', balanceColor],
            },
        ],
    };

    return (
        <div className="container flex mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4 text-center text-[#4a5568]">Financial Status</h2>

            {/* Bar Chart */}
            <div className="mb-8 w-[50%]">
                <h3 className="text-xl font-semibold mb-2 text-center">Bar Chart - Financial Overview</h3>
                <Bar key="financial-bar-chart" data={barChartData} />
            </div>

            {/* Pie Chart */}
            <div className='w-[50%]'>
                <h3 className="text-xl font-semibold mb-2 text-center">Pie Chart - Financial Overview</h3>
                <Pie key="financial-pie-chart" data={pieChartData} />
            </div>
        </div>
    );
};

export default FinancialStatusChart;
