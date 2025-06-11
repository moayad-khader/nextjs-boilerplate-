import Highcharts from "highcharts";

export const defaultOptions: Highcharts.Options = {
  chart: {
    type: "spline"
  },
  title: {
    text: ".",
    style: {
      color: "none",
      fontSize: "14px",
    },
    align: "left",
    verticalAlign: "top",
  },
  subtitle: {
    text: "",
    align: "center",
  },
  xAxis: {
    categories: [],
    labels: {
      style: {
        color: "hsl(var(--normal))",
      },
      formatter: function () {
        const maxLength = 10;
        const label = this.value;
        if (typeof label === "string") {
          return label.length > maxLength
            ? label.slice(0, maxLength) + "..."
            : label;
        }
        return String(label);
      },
    },
    gridLineWidth: 0,
    lineWidth: 0,
  },
  yAxis: {
    title: {
      text: "",
      style: {},
    },
    labels: {
      enabled: true,
      y: 40,
      style: {},
    },
    gridLineWidth: 0,
    height: "100%",
  },
  plotOptions: {
    line: {
      dataLabels: {
        enabled: true,
      },
    },
  },
  legend: {
    enabled: true,
    layout: "horizontal",
    align: "center",
    verticalAlign: "bottom",
    floating: false,
    borderWidth: 0,
    backgroundColor: "white",
    shadow: false,
    itemStyle: {
      color: "hsl(var(--normal))",
      fontSize: "12px",
    },
    margin: 0,
    padding: 0,
    labelFormatter: function () {
      const o = this;
      return `<span style="color: hsl(var(--normal)) }">${o.name}</span>`;
    },
  },
  tooltip: {
    enabled: true,
    backgroundColor: "white",
    style: {
      color: "hsl(var(--normal))",
    },
  },
  series: [],
};
