import { useMemo } from "react";
import type { IProps } from "../Types/IProps";

import './Status.scss';

export const Status = (props: IProps) => {

  const classNameStatus = useMemo(() => {
    return `status status_${props.size} status_${props.type}`;
  }, [props.type, props.size]);

  const size = useMemo(() => {
    switch(props.size) {
      case 'xs':
        return '70px';
      case 's':
        return '115px';
      case 'm':
        return '135px';
      case 'l': 
        return '160px';
    }
  }, [props.size]);

  const label = useMemo(() => {
    switch(props.type) {
      case 'abandoned':
        return 'Заброшено';
      case 'read':
        return 'Прочитано';
      case 'reading-now': 
        return 'Читаю сейчас';
      case 'want-read':
        return 'Хочу прочитать';
    }
  }, [props.type]);
  
  return (
    <>
      <div
        className={classNameStatus}
        style={{
          width: size,
        }}
      >
        {label}
      </div>
    </>
  )
};