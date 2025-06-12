import { type FC } from 'react';

export type VisualizationTypes = 'line' | 'bar' | 'pie';

export interface IVisualizationConfiguration<T> {
  title: string;
  categories: string[];
  series: T[];
}


export interface Props<T> {
  visualization_type: VisualizationTypes;
  className?: string;
  title: string;
  visualization_configuration: IVisualizationConfiguration<T>;
}


export interface IVisualizationProps {
  visualization_configuration: IVisualizationConfiguration<any>;
}

export type IVisualizationComponent = FC<IVisualizationProps>;
