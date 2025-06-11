import {memo, useMemo} from 'react'
import {defaultOptions} from '@/components/visualization/elements/line-chart.visualization/defaults'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import type {IVisualizationProps} from '@/lib/factories/visualization.factory/types'

export const LineChart = memo(({visualization_configuration}: IVisualizationProps) => {
  const options = useMemo(() => {
    return {
      ...defaultOptions,
      xAxis: {
        ...defaultOptions.xAxis,
        categories: visualization_configuration.categories,
      },
      series: [
        ...visualization_configuration.series.map((data: any) => {
          return {
            ...data,
          }
        }),
      ],
    }
  }, [visualization_configuration])

  return (
    <div className="relative h-full">
      <HighchartsReact highcharts={Highcharts} options={options} containerProps={{style: {height: '99%'}}} />
    </div>
  )
})
