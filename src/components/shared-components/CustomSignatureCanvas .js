import React, { useRef, useEffect } from 'react';
import ReactSignatureCanvas from 'react-signature-canvas';

const CustomSignatureCanvas = React.forwardRef((props, ref) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current.querySelector('canvas');
      if (canvas) {
        const context = canvas.getContext('2d', { willReadFrequently: true });
        console.log('Canvas context:', context); // Verify the context is set correctly
      }
    }
  }, []);

  return (
    <ReactSignatureCanvas
      {...props}
      ref={canvasRef}
      canvasProps={{
        ...props.canvasProps,
        className: "bg-white !w-full h-[200px]",
      }}
    />
  );
});

export default CustomSignatureCanvas;
