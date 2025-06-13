import React from 'react';
import { IconGrid, IconData } from './components/IconGrid';

// Sample icon data
const sampleIcons: IconData[] = [
  { unicode: '😀', label: 'Grinning Face', category: 'emoji' },
  { unicode: '🎉', label: 'Party Popper', category: 'celebration' },
  { unicode: '⭐', label: 'Star', category: 'shapes' },
  { unicode: '🚀', label: 'Rocket', category: 'transport' },
  { unicode: '💡', label: 'Light Bulb', category: 'objects' },
  { unicode: '🌟', label: 'Glowing Star', category: 'nature' },
  { unicode: '🔥', label: 'Fire', category: 'nature' },
  { unicode: '💎', label: 'Gem Stone', category: 'objects' },
  { unicode: '🎯', label: 'Direct Hit', category: 'objects' },
  { unicode: '🌈', label: 'Rainbow', category: 'nature' },
  // Add more icons as needed
];

function App() {
  const handleIconClick = (icon: IconData) => {
    console.log('Icon clicked:', icon);
    // Handle icon selection
  };

  return (
    <div className="App">
      <IconGrid 
        icons={sampleIcons}
        onIconClick={handleIconClick}
        searchable={true}
      />
    </div>
  );
}

export default App;
