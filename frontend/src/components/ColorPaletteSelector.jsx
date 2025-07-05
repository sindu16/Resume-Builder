import React from 'react';

const palettes = [
  { id: 'blue', themeColor: '#0d6efd', textColor: '#ffffff' },
  { id: 'purple', themeColor: '#6f42c1', textColor: '#ffffff' },
  { id: 'green', themeColor: '#198754', textColor: '#ffffff' },
  { id: 'dark', themeColor: '#343a40', textColor: '#ffffff' },
];

const ColorPaletteSelector = ({ selected, onSelect }) => {
  return (
    <div className="d-flex flex-wrap gap-3 mt-3">
      {palettes.map((p) => (
        <div
          key={p.id}
          className={`rounded-circle border ${selected.id === p.id ? 'border-3 border-primary' : ''}`}
          style={{
            width: '40px',
            height: '40px',
            backgroundColor: p.themeColor,
            cursor: 'pointer',
          }}
          onClick={() => onSelect(p)}
        />
      ))}
    </div>
  );
};

export default ColorPaletteSelector;
