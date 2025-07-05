
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Solution } from '../types';
import { CheckCircleIcon, XCircleIcon, LoaderIcon } from './icons';

interface SolutionDisplayProps {
  solution: Solution | null;
  isLoading: boolean;
  error: string | null;
}

const LoadingState: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-brand-light">
        <LoaderIcon className="w-12 h-12 animate-spin text-brand-cyan" />
        <p className="mt-4 text-lg">AI is thinking...</p>
        <p className="text-sm">Please wait while we solve the equation.</p>
    </div>
);

const InitialState: React.FC = () => (
     <div className="flex flex-col items-center justify-center h-full text-brand-light p-8 text-center bg-brand-primary/30 rounded-lg">
        <h3 className="text-2xl font-semibold text-brand-text">Awaiting Equation</h3>
        <p className="mt-2">Enter or draw a math problem, and your detailed solution will appear here.</p>
        <p className="mt-4 text-sm">You can solve for variables, graph functions, and get step-by-step breakdowns.</p>
    </div>
);

const ErrorState: React.FC<{ error: string }> = ({ error }) => (
    <div className="flex flex-col items-center justify-center h-full text-red-400 p-8 bg-red-900/20 rounded-lg">
        <XCircleIcon className="w-12 h-12" />
        <h3 className="mt-4 text-xl font-semibold">An Error Occurred</h3>
        <p className="mt-2 text-center">{error}</p>
    </div>
);

export const SolutionDisplay: React.FC<SolutionDisplayProps> = ({ solution, isLoading, error }) => {
  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (!solution) return <InitialState />;

  return (
    <div className="h-full overflow-y-auto space-y-6 pr-2">
      <div>
        <h3 className="text-sm uppercase text-brand-light font-semibold mb-2">Interpreted Equation</h3>
        <p className="text-2xl font-mono bg-brand-primary/50 p-3 rounded-md text-brand-cyan">{solution.interpretedEquation}</p>
      </div>

      <div>
        <h3 className="text-sm uppercase text-brand-light font-semibold mb-2">Solution</h3>
        <p className="text-xl font-bold text-brand-text flex items-center gap-2">
            <CheckCircleIcon className="w-6 h-6 text-green-400" />
            {solution.solution}
        </p>
      </div>

      <div>
        <h3 className="text-sm uppercase text-brand-light font-semibold mb-2">Step-by-Step Guide</h3>
        <ul className="space-y-3">
          {solution.steps.map((step, index) => (
            <li key={index} className="flex items-start gap-3 p-3 bg-brand-primary/50 rounded-md">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 bg-brand-accent text-brand-text rounded-full font-bold text-sm">{index + 1}</span>
              <p className="text-brand-light flex-1">{step}</p>
            </li>
          ))}
        </ul>
      </div>

      {solution.isGraphable && solution.graphData && (
        <div>
          <h3 className="text-sm uppercase text-brand-light font-semibold mb-4">Graph Visualization</h3>
          <div className="w-full h-72 bg-brand-primary/50 p-4 rounded-md">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={solution.graphData.points} margin={{ top: 5, right: 20, left: -10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#415A77" />
                <XAxis dataKey="x" stroke="#E0E1DD" name={solution.graphData.xAxisLabel} label={{ value: solution.graphData.xAxisLabel, position: 'insideBottom', offset: -10, fill: '#E0E1DD' }}/>
                <YAxis stroke="#E0E1DD" name={solution.graphData.yAxisLabel} label={{ value: solution.graphData.yAxisLabel, angle: -90, position: 'insideLeft', fill: '#E0E1DD' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1B263B', border: '1px solid #415A77', color: '#E0E1DD' }}
                  labelStyle={{ color: '#38BDF8', fontWeight: 'bold' }}
                />
                <Legend wrapperStyle={{color: '#E0E1DD'}}/>
                <Line type="monotone" dataKey="y" stroke="#38BDF8" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};
