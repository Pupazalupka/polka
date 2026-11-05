declare module '*.svg?react' {
  import * as React from 'react';
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

declare module 'react-awesome-stars-rating' {
  import { Component } from 'react';

  interface ReactStarsRatingProps {
    value?: number;
    onChange?: (value: number) => void;
    isEdit?: boolean;
    isHalf?: boolean;
    count?: number;
    size?: number;
    starGap?: number;
    className?: string;
    primaryColor?: string;
    secondaryColor?: string;
    isArrowSubmit?: boolean;
  }

  export default class ReactStarsRating extends Component<ReactStarsRatingProps> {}
}