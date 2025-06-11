'use client';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import VisualizationFactory from '@/lib/factories/visualization.factory';
import { Props, IVisualizationComponent } from '@/lib/factories/visualization.factory/types';
import React from 'react';
import { Card } from '@/components/ui/card';


function Comp<T>({
  visualization_type,
  visualization_configuration,
  className
}: Props<T>) {
  
  const ChartComponent: IVisualizationComponent = useMemo(
    () => VisualizationFactory.createChart(visualization_type).getChart(),
    [visualization_type, visualization_configuration]
  );

  return (
    <div className={cn('h-full space-y-2 ', className)}>
      <Card className="w-full h-full p-4">
         
          <ChartComponent
            visualization_configuration={visualization_configuration}
          />
        </Card>
    </div>
  );
}

export const Visualization = React.memo(Comp);
