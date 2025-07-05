
import React, { useState, useRef, useCallback } from 'react';
import { MathKeyboard } from './components/MathKeyboard';
import { DrawingCanvas } from './components/DrawingCanvas';
import { SolutionDisplay } from './components/SolutionDisplay';
import { solveEquation } from './services/geminiService';
import { Solution } from './types';
import { TypeIcon, PencilIcon, BrainCircuitIcon } from './components/icons';

type InputMode = 'text' | 'draw';

const App: React.FC = () => {
  const [equation, setEquation] = useState<string>('y = x^2 + 3x - 4');
  const [solution, setSolution] = useState<Solution | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [inputMode, setInputMode] = useState<InputMode>('text');

  const canvasRef = useRef<{ getCanvasData: () => string | null; clearCanvas: () => void }>(null);

  const handleSolve = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setSolution(null);

    let drawingDataUrl: string | null = null;
    if (inputMode === 'draw') {
      drawingDataUrl = canvasRef.current?.getCanvasData() || null;
      if (!drawingDataUrl) {
          setError('The drawing canvas is empty. Please draw an equation.');
          setIsLoading(false);
          return;
      }
    }

    try {
      const result = await solveEquation(equation, drawingDataUrl);
      setSolution(result);
    } catch (e: unknown) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [equation, inputMode]);

  const handleKeyPress = (key: string) => {
    setEquation((prev) => prev + key);
  };
  
  const handleClear = () => {
    if (inputMode === 'draw') {
      canvasRef.current?.clearCanvas();
    }
    setEquation('');
    setSolution(null);
    setError(null);
  }

  return (
    <div className="min-h-screen bg-brand-primary flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <header className="w-full max-w-6xl text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-brand-text flex items-center justify-center gap-3">
          <BrainCircuitIcon className="w-10 h-10 text-brand-cyan" />
          AI Math Solver
        </h1>
        <p className="text-brand-light mt-2">Solve, learn, and visualize complex math problems.</p>
      </header>

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-brand-secondary rounded-lg shadow-2xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
             <div className="flex bg-brand-primary rounded-lg p-1">
                <button
                  onClick={() => setInputMode('text')}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
                    inputMode === 'text' ? 'bg-brand-accent text-white' : 'text-brand-light hover:bg-brand-accent/50'
                  }`}
                >
                  <TypeIcon className="w-4 h-4" />
                  Type
                </button>
                <button
                  onClick={() => setInputMode('draw')}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
                    inputMode === 'draw' ? 'bg-brand-accent text-white' : 'text-brand-light hover:bg-brand-accent/50'
                  }`}
                >
                  <PencilIcon className="w-4 h-4" />
                  Draw
                </button>
              </div>
          </div>
         
          <div className="flex-grow">
            {inputMode === 'text' ? (
              <textarea
                value={equation}
                onChange={(e) => setEquation(e.target.value)}
                placeholder="e.g., f(x) = sin(x) * x"
                className="w-full h-32 p-3 bg-brand-primary border-2 border-brand-accent rounded-md resize-none focus:outline-none focus:border-brand-cyan text-lg"
              />
            ) : (
              <DrawingCanvas ref={canvasRef} />
            )}
          </div>
          
          {inputMode === 'text' && <MathKeyboard onKeyPress={handleKeyPress} />}

           <div className="flex items-center justify-between mt-6">
             <button
              onClick={handleClear}
              className="px-6 py-3 bg-brand-light/30 text-brand-light font-bold rounded-lg hover:bg-brand-light/50 transition-colors"
            >
              Clear
            </button>
            <button
              onClick={handleSolve}
              disabled={isLoading}
              className="px-8 py-3 bg-brand-cyan text-brand-primary font-bold rounded-lg hover:bg-sky-400 transition-transform transform hover:scale-105 disabled:bg-brand-accent disabled:cursor-not-allowed"
            >
              {isLoading ? 'Solving...' : 'Solve Equation'}
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-brand-secondary rounded-lg shadow-2xl p-6">
          <SolutionDisplay solution={solution} isLoading={isLoading} error={error} />
        </div>
      </main>
    </div>
  );
};

export default App;
