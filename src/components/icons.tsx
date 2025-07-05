
import React from 'react';

export const Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  />
);

export const TypeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path d="M4 7V4h16v3" />
    <path d="M9 20h6" />
    <path d="M12 4v16" />
  </Icon>
);

export const PencilIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </Icon>
);

export const EraserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21H7Z" />
        <path d="m5 12 5 5" />
        <path d="m14 4 6 6" />
    </Icon>
);

export const LoaderIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </Icon>
);

export const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </Icon>
);

export const XCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
    </Icon>
);

export const BrainCircuitIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="M12 5a3 3 0 1 0-5.993.25" />
        <path d="M12 5a3 3 0 1 1 5.993.25" />
        <path d="M15 12a3 3 0 1 0-5.993.25" />
        <path d="M15 12a3 3 0 1 1 5.993.25" />
        <path d="M9 12a3 3 0 1 0-5.993.25" />
        <path d="M9 12a3 3 0 1 1 5.993.25" />
        <path d="M12 19a3 3 0 1 0-5.993.25" />
        <path d="M12 19a3 3 0 1 1 5.993.25" />
        <path d="M12 12v7" />
        <path d="M12 5V2" />
        <path d="M6.007 12.25H3" />
        <path d="M17.993 12.25H21" />
        <path d="m4.227 7.523-1.92-1.92" />
        <path d="m19.773 7.523 1.92-1.92" />
        <path d="m4.227 16.977-1.92 1.92" />
        <path d="m19.773 16.977 1.92 1.92" />
    </Icon>
);
