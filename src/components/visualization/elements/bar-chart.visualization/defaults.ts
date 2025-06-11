import { generateNumberWithCommas } from "@/components/visualization/helper";
 import Highcharts from 'highcharts';

export const defaultOptions: Highcharts.Options = {
  chart: {
    type: "bar",
  },
  title: {
    text: "",
    style: {
      color: "black",
      fontSize: "14px",
    },
  },
  xAxis: {
    categories: [],
    labels: {
      style: {
        color: "black",
      },
    },
    gridLineWidth: 0,
  },
  yAxis: {
    title: {
      text: "",
    },
    labels: {
      style: {
        color: "black",
        // color: '#848484',
      },
    },
    gridLineWidth: 0,
    height: "100%",
  },
  plotOptions: {
    series: {
      borderWidth: 0,
    },
    column: {
      dataLabels: {
        enabled: true,
        verticalAlign: "top",
        color: "black",
        y: -30,
        formatter: function () {
          return generateNumberWithCommas(this.y);
        },
      },
    },
  },
  legend: {
    enabled: true,
    itemStyle: {
      color: "black",
    },
  },
  series: [],
  tooltip: {
    backgroundColor: "black",
    style: {
      color: "white",
    },
  },
};
