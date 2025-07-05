
import React, { useRef, useEffect, useImperativeHandle, forwardRef, useState } from 'react';
import { EraserIcon } from './icons';

export const DrawingCanvas = forwardRef((props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const getContext = (): CanvasRenderingContext2D | null => {
    const canvas = canvasRef.current;
    return canvas ? canvas.getContext('2d') : null;
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const ctx = getContext();
    if (!ctx) return;
    
    const pos = e.nativeEvent instanceof MouseEvent 
      ? { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }
      : { x: e.nativeEvent.touches[0].clientX - canvasRef.current!.offsetLeft, y: e.nativeEvent.touches[0].clientY - canvasRef.current!.offsetTop };

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const ctx = getContext();
    if (!ctx) return;

    const pos = e.nativeEvent instanceof MouseEvent 
        ? { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }
        : { x: e.nativeEvent.touches[0].clientX - canvasRef.current!.offsetLeft, y: e.nativeEvent.touches[0].clientY - canvasRef.current!.offsetTop };

    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    const ctx = getContext();
    if (!ctx) return;
    ctx.closePath();
    setIsDrawing(false);
  };
  
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = getContext();
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // set background to black
      ctx.fillStyle = '#1B263B';
      ctx.fillRect(0,0, canvas.width, canvas.height);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = getContext();
    if (!ctx) return;
    
    // Set canvas size based on container
    const container = canvas.parentElement;
    if(container){
        canvas.width = container.clientWidth;
        canvas.height = 200; // fixed height
    }

    ctx.strokeStyle = '#E0E1DD';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    clearCanvas();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useImperativeHandle(ref, () => ({
    getCanvasData: () => {
      const canvas = canvasRef.current;
      if (!canvas) return null;
      return canvas.toDataURL('image/png');
    },
    clearCanvas: () => clearCanvas(),
  }));

  return (
    <div className='relative w-full h-[200px]'>
        <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="bg-brand-accent/30 rounded-md cursor-crosshair w-full h-full"
        />
    </div>
  );
});
