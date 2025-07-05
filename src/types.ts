
export interface Point {
  x: number;
  y: number;
}

export interface GraphData {
  points: Point[];
  xAxisLabel: string;
  yAxisLabel:string;
}

export interface Solution {
  solution: string;
  steps: string[];
  interpretedEquation: string;
  isGraphable: boolean;
  graphData: GraphData | null;
}
