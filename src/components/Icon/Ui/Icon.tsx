import type { IProps } from '../Types';
import PolkaBordo from '../img/polka-bordo.svg?react';
import Added from '../img/added.svg?react';
import BookOhra from '../img/book-ohra.svg?react';
import Plus from '../img/plus.svg?react';
import Progress from '../img/progress.svg?react';
import Save from '../img/save.svg?react';

export const Icon = (props: IProps) => {
  const typeIcon = () => {
    switch(props.type) {
      case 'polka-bordo':
        return <PolkaBordo />;
      case 'added':
        return <Added />;
      case 'book-ohra':
        return <BookOhra />;
      case 'plus':
        return <Plus />;
      case 'progress':
        return <Progress />;
      case 'save':
        return <Save />;
      
      default:
        return null;
    }
  };

  return (
    <>
      <div 
        className={props.classNameIcon}
        onClick={() => props.onClick}
        style={{
          fontSize: props.styleWidth,
        }}
      >
        {typeIcon()}
      </div>
    </>
  )
};