export interface GraphData {
  name: string
  messages: number
  responses: number
}

export interface MessageGraph {
  graphType: number
  graphData: GraphData[]
}

export interface Message {
  graph?: MessageGraph
}
