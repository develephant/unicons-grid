import React, { useState, useCallback } from 'react';
import { Box, Text, TextInput } from '@primer/react-brand';
import { GridItem } from './GridItem';
import './IconGrid.css';

export interface IconData {
  unicode: string;
  label?: string;
  category?: string;
}

export interface IconGridProps {
  icons: IconData[];
  onIconClick?: (icon: IconData) => void;
  searchable?: boolean;
  className?: string;
}

export const IconGrid: React.FC<IconGridProps> = ({
  icons,
  onIconClick,
  searchable = true,
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIcons = React.useMemo(() => {
    if (!searchTerm) return icons;
    
    return icons.filter(icon => 
      icon.label?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      icon.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [icons, searchTerm]);

  const handleIconClick = useCallback((icon: IconData) => {
    onIconClick?.(icon);
  }, [onIconClick]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent, icon: IconData) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleIconClick(icon);
    }
  }, [handleIconClick]);

  return (
    <Box className={`icon-grid-container ${className}`}>
      {searchable && (
        <Box className="icon-grid-search" paddingBlockEnd={24}>
          <TextInput
            placeholder="Search icons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search icons"
            className="search-input"
          />
        </Box>
      )}
      
      <Box 
        className="grid-container"
        role="grid"
        aria-label={`Icon grid with ${filteredIcons.length} icons`}
      >
        {filteredIcons.map((icon, index) => (
          <GridItem
            key={`${icon.unicode}-${index}`}
            icon={icon}
            onClick={() => handleIconClick(icon)}
            onKeyDown={(event) => handleKeyDown(event, icon)}
            tabIndex={0}
            role="gridcell"
            aria-label={icon.label || `Unicode character ${icon.unicode}`}
          />
        ))}
      </Box>
      
      {filteredIcons.length === 0 && searchTerm && (
        <Box className="no-results" paddingBlockStart={32}>
          <Text as="p" size="300" variant="muted">
            No icons found matching "{searchTerm}"
          </Text>
        </Box>
      )}
    </Box>
  );
};
