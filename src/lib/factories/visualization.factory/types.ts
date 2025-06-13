import {type FC} from 'react'

export type VisualizationTypes = 'line' | 'bar' | 'pie'

export interface Yaxis {
  name: string
  data: number[]
}

export interface IVisualizationConfiguration {
  title: string
  categories: string[]
  series: Yaxis[]
}

export interface Props {
  visualization_type: VisualizationTypes
  className?: string
  title: string
  visualization_configuration: IVisualizationConfiguration
}

export interface IVisualizationProps {
  visualization_configuration: IVisualizationConfiguration
}

export type IVisualizationComponent = FC<IVisualizationProps>
