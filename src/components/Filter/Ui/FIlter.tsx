import { useMemo, useState } from 'react';
import type { IProps } from '../Types/IProps';
import './Filter.scss';

export const Filter = (props: IProps) => {
  const [internalSelected, setInternalSelected] = useState(false);
  const selected = props.selected ?? internalSelected;
  const width = useMemo(() => {
    switch (props.size) {
      case 's': return '70px';
      case 'm': return '90px';
      case 'l': return '120px';
      default: return '70px';
    }
  }, [props.size]);
  const className = [
    'filter',
    `filter_${props.size}`,
    props.classNameFilter,
    selected && 'filter_selected',
    props.disabled && 'filter_disabled',
  ].filter(Boolean).join(' ');

  const handleClick = () => {
    if (props.disabled) return;
    if (props.selected === undefined) setInternalSelected((current) => !current);
    props.onClick?.();
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      disabled={props.disabled}
      style={{ width }}
      aria-pressed={selected}
    >
      <span>{props.label}</span>
    </button>
  );
};
