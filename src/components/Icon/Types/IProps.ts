export interface IProps {
  type: 'polka-bordo' | 'progress' | 'save' | 'added' | 'book-ohra' | 'plus' | 'close',
  styleWidth?: string,
  classNameIcon?: string,
  onClick?: () => void,
};