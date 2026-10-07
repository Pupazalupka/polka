import { useCallback, useMemo, useState } from "react";
import type { IProps } from "../Types/IProps";

import './Filter.scss';

export const Filter = (props: IProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const size = useMemo(() => {
    switch(props.size) {
      case 's': 
        return '70px';
      case 'm':
        return '90px';
      case 'l':
        return '120px';

      default:
        return '70px';
    }
  }, [props.size]);

  const classNameFilter = useMemo(() => {
    let classes = `filter filter_${props.size}`;
    if (props.classNameFilter) return props.classNameFilter;

    if (isSelected) {
      classes += ' filter_selected';
    }

    if (props.disabled) {
      classes += ' filter_disabled';
    }

    return classes;
  }, [props.classNameFilter, isSelected]);

  const onClickHandler = useCallback(() => {
    if (!props.disabled) {
      setIsSelected(prev => !prev);
    };
  }, [props.disabled]);

  return (
    <>
      <div 
        className={classNameFilter}
        onClick= {onClickHandler}
        style={{
          width: size,
        }}
      >
        <span>{props.label}</span>
      </div>
    </>
  )
};