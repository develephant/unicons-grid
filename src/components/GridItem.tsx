import React from 'react';
import { Box } from '@primer/react-brand';
import { IconData } from './IconGrid';

export interface GridItemProps {
  icon: IconData;
  onClick: () => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
  tabIndex: number;
  role: string;
  'aria-label': string;
}

export const GridItem: React.FC<GridItemProps> = ({
  icon,
  onClick,
  onKeyDown,
  tabIndex,
  role,
  'aria-label': ariaLabel
}) => {
  return (
    <Box
      className="grid-item"
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={tabIndex}
      role={role}
      aria-label={ariaLabel}
      data-category={icon.category}
    >
      <span className="icon-symbol" aria-hidden="true">
        {icon.unicode}
      </span>
      {icon.label && (
        <span className="sr-only">
          {icon.label}
        </span>
      )}
    </Box>
  );
};
