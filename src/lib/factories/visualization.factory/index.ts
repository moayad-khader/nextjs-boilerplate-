import {type IVisualizationComponent} from '@/lib/factories/visualization.factory/types'
import {BarChart, LineChart, PieChart} from '@/components/visualization/elements'

class Visualization {
  visualization: IVisualizationComponent

  constructor() {
    this.visualization = BarChart
  }

  getChart(): IVisualizationComponent {
    return this.visualization
  }
}

class BarChartVisualization extends Visualization {
  constructor() {
    super()
    this.visualization = BarChart
  }
}

class LineChartVisualization extends Visualization {
  constructor() {
    super()
    this.visualization = LineChart
  }
}

class PieChartVisualization extends Visualization {
  constructor() {
    super()
    this.visualization = PieChart
  }
}

class VisualizationFactory {
  static createChart(visualization_type: string): Visualization {
    switch (visualization_type) {
      case 'bar':
        return new BarChartVisualization()
      case 'line':
        return new LineChartVisualization()
      case 'pie':
        return new PieChartVisualization()
      default:
        return new BarChartVisualization()
    }
  }
}

export default VisualizationFactory
