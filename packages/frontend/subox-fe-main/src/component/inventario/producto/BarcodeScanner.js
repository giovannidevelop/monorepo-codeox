import React, { useState } from 'react';
import BarcodeReader from 'react-barcode-reader';

const BarcodeScanner = ({ onScan }) => {
  const [scannedCode, setScannedCode] = useState('');

  const handleScan = (code) => {
    console.log('Código escaneado:', code);
    setScannedCode(code);
    if (onScan) onScan(code);
  };

  const handleError = (err) => {
    console.error('Error al escanear:', err);
  };

  return (
    <div>
      <h2>Escáner de Código de Barras</h2>
      <BarcodeReader
        onScan={handleScan}
        onError={handleError}
        delay={300}
      />
      <p><strong>Código escaneado:</strong> {scannedCode}</p>
    </div>
  );
};

export default BarcodeScanner;
