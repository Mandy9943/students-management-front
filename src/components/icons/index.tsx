import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
}

export const PlusCircleIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    <line x1="12" y1="8" x2="12" y2="16" stroke={color} strokeWidth="2" />
    <line x1="8" y1="12" x2="16" y2="12" stroke={color} strokeWidth="2" />
  </svg>
);

export const MinusCircleIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    <line x1="8" y1="12" x2="16" y2="12" stroke={color} strokeWidth="2" />
  </svg>
);

export const PencilIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3 21v-3.75L14.81 5.44a1.5 1.5 0 0 1 2.12 0L19.56 8.07a1.5 1.5 0 0 1 0 2.12L7.75 21H3z"
      fill={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M14 3l3 3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="red" />
  </svg>
);

export const TrashIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={color} viewBox="0 0 448 512">
    <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.7 23.7 0 0 0 -21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0 -16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z" />
  </svg>
);
