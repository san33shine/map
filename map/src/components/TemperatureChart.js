import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const TemperatureChart = ({temperatureDay, minTempArray, maxTempArray}) => {

    const data = {
      labels: temperatureDay, 
      datasets: [
        {
          label: 'Min Temperature Chart',
          data: minTempArray, 
          fill: true, 
          backgroundColor: 'rgba(0, 255, 255, 1)',
          pointRadius: 0,
        },
        {
            label: 'MaxTemperature Chart',
            data: maxTempArray, 
            fill: true, 
            backgroundColor: 'rgba(0, 255, 255, 0.5)',
            pointRadius: 0,
          },
      ],
    };
  
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 20,  
          right: 20,
          top: 20,  
          bottom: 20 
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Max and Min Temperature Chart',
          font: {
            size: 24, 
          },
        },
        legend: {
          display: false, 
        },
      },
      scales: {
        x: {
          grid: {
            display: false, 
          },
        },
        y: {
          beginAtZero: false, 
          grid: {
              display: false,   
          },
        },
      },
    };
  
    return (
      <div style={{ width: '100%', height: '100%'}}>
        <Line data={data} options={options} />
      </div>
    );
  };

export default TemperatureChart