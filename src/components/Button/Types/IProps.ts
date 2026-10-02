export interface IProps {
  classNameButton?: string,
  onClick: () => void,
  label: string,
  icon?: 'polka-bordo' | 'progress' | 'save' | 'added' | 'book-ohra' | 'plus',
  type: 'default' | 'added';
  iconWidth?: string;
}