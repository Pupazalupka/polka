import { useMemo } from 'react';
import type { IProps } from '../Types';
import { Icon } from '../../Icon';

import './Button.scss';

export const Button = (props: IProps) => {
  const classNameButton = useMemo(() => {
    let className = props.classNameButton ? `button ${props.classNameButton}` : 'button';
    
    if (props.type === 'added') {
      className += ` ${className}_added`;
    } 

    return className;
  }, [props.classNameButton]);

  const icon = () => {
    if (props.icon) {
      return (
        <Icon 
          type={props.icon}
          styleWidth={props.iconWidth}
        />
      )
    }
  };

  return (
    <>
      <div 
        className={classNameButton}
        onClick={props.onClick}
      >
        {icon()}
        {props.label}
      </div>
    </>
  )
}