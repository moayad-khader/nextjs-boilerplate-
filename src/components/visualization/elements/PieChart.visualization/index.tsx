import {memo, useMemo} from 'react'
import {defaultOptions} from '@/components/visualization/elements/PieChart.visualization/defaults'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import type {IVisualizationProps} from '@/lib/factories/visualization.factory/types'

export const PieChart = memo(({visualization_configuration}: IVisualizationProps) => {
  const options = useMemo(() => {
    return {
      ...defaultOptions,
      series: visualization_configuration.series,
    }
  }, [visualization_configuration])

  return (
    <div className="relative h-full">
      <HighchartsReact highcharts={Highcharts} options={options} containerProps={{style: {height: '99%'}}} />
    </div>
  )
})
