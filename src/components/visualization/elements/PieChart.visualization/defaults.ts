import Highcharts from 'highcharts'

export const defaultOptions = {
  chart: {
    type: 'pie',
  },
  title: {
    text: '',
  },
  plotOptions: {
    series: {
      borderWidth: 0,
      colorByPoint: true,
      type: 'pie',
      size: '100%',
      innerSize: '80%',
      dataLabels: {
        enabled: true,
        crop: false,
        distance: '-10%',
        style: {
          fontWeight: 'bold',
          fontSize: '16px',
        },
        connectorWidth: 0,
      },
    },
    pie: {
      allowPointSelect: false,
      dataLabels: {
        enabled: true,
        format: '<b>{point.percentage:.1f}%</b> ',
        distance: 10,
        style: {
          color: 'white',
          fontSize: '1rem',
        },
      },
      showInLegend: true,
    },
    labels: {
      style: {
        color: 'white',
      },
    },
  },

  legend: {
    enabled: true,
    labelFormatter: function () {
      const o: any = this
      return `<span style="color:  "white" }">${o.name}</span>`
    },
    itemStyle: {
      color: 'white',
    },
  },

  series: [],
  tooltip: {
    enabled: false,
    backgroundColor: 'white',
    style: {
      color: 'white',
      fontSize: '1rem',
    },
    formatter: function (): string {
      const o: any = this
      return `<b>${o.point.name}</b>: (${Math.round(o.percentage * 100) / 100}%)` as string
    },
  },
}
