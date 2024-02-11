import React, { useEffect } from 'react';
import 'apexcharts';
import ApexCharts from 'react-apexcharts';
import "../../css/style2.css";

const Chart = () => {
    // BAR CHART
    const barChartOptions = {
        series: [
            {
                data: [10, 8, 6, 4, 2],
            },
        ],
        chart: {
            type: 'bar',
            height: 350,
            toolbar: {
                show: false,
            },
        },
        colors: ['#246dec', '#cc3c43', '#367952', '#f5b74f', '#4f35a1'],
        plotOptions: {
            bar: {
                distributed: true,
                borderRadius: 4,
                horizontal: false,
                columnWidth: '40%',
            },
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        xaxis: {
            categories: ['Laptop', 'Phone', 'Monitor', 'Headphones', 'Camera'],
        },
        yaxis: {
            title: {
                text: 'Count',
            },
        },
    };

    // AREA CHART
    const areaChartOptions = {
        series: [
            {
                name: 'Purchase Orders',
                data: [31, 40, 28, 51, 42, 109, 100],
            },
            {
                name: 'Sales Orders',
                data: [11, 32, 45, 32, 34, 52, 41],
            },
        ],
        chart: {
            height: 350,
            type: 'area',
            toolbar: {
                show: false,
            },
        },
        colors: ['#4f35a1', '#246dec'],
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
        },
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        markers: {
            size: 0,
        },
        yaxis: [
            {
                title: {
                    text: 'Purchase Orders',
                },
            },
            {
                opposite: true,
                title: {
                    text: 'Sales Orders',
                },
            },
        ],
        tooltip: {
            shared: true,
            intersect: false,
        },
    };

    // useEffect(() => {
    //     // Render Bar Chart
    //     const barChart = new ApexCharts(document.querySelector("#bar-chart"), barChartOptions);
    //     barChart.render();

    //     // Render Area Chart
    //     const areaChart = new ApexCharts(document.querySelector("#area-chart"), areaChartOptions);
    //     areaChart.render();

    //     // Cleanup function to destroy charts when the component is unmounted
    //     return () => {
    //         barChart.destroy();
    //         areaChart.destroy();
    //     };
    // }, []);
    const barChartSeries = [
        {
          data: [10, 8, 6, 4, 2],
        },
      ];
    
      const areaChartSeries = [
        {
          name: 'Purchase Orders',
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: 'Sales Orders',
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ];
    
      return (
        <div className="grid-container">
          <main className="main-container">
            <div className="charts">
              <div className="charts-card">
                <p className="chart-title">Top 5 Products</p>
                <ApexCharts options={barChartOptions} series={barChartSeries} type="bar" height={350} />
              </div>
              <div className="charts-card">
                <p className="chart-title">Purchase and Sales Orders</p>
                <ApexCharts options={areaChartOptions} series={areaChartSeries} type="area" height={350} />
              </div>
            </div>
          </main>
        </div>
      );
    };
    
export default Chart;
