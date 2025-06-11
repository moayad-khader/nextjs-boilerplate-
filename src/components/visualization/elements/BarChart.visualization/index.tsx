import {memo, useMemo} from 'react'
import {defaultOptions} from '@/components/visualization/elements/BarChart.visualization/defaults'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import type {IVisualizationProps} from '@/lib/factories/visualization.factory/types'

export const BarChart = memo(({visualization_configuration}: IVisualizationProps) => {
  const options = useMemo(() => {
    return {
      ...defaultOptions,
      xAxis: {
        ...defaultOptions.xAxis,
        categories: visualization_configuration.categories,
      },
      series: visualization_configuration,
    }
  }, [visualization_configuration])

  return (
    <div className="relative h-full">
      <HighchartsReact highcharts={Highcharts} options={options} containerProps={{style: {height: '99%'}}} />
    </div>
  )
})
