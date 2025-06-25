import { memo, useMemo } from 'react'
import { defaultOptions } from '@/components/visualization/elements/PieChart.visualization/defaults'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import type { IVisualizationProps } from '@/lib/factories/visualization.factory/types'

export const PieChart = memo(({ visualization_configuration }: IVisualizationProps) => {
  const options = useMemo(() => {
    // Transform series data for pie chart format
    const pieData = visualization_configuration.series.length > 0
      ? visualization_configuration.categories.map((category, index) => ({
        name: category,
        y: visualization_configuration.series[0].data[index] || 0
      }))
      : [];

    return {
      ...defaultOptions,
      series: [{
        name: visualization_configuration.series[0]?.name || 'Data',
        data: pieData
      }],
    }
  }, [visualization_configuration])

  return (
    <div className="relative h-full">
      <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '99%' } }} />
    </div>
  )
})
