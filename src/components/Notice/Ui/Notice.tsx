import { useMemo, useState } from "react";
import type { IProps } from "../Types/IProps";
import { Icon } from "../../Icon";

import './Notice.scss';

export const Notice = (props: IProps) => {
  const [open, setOpen] = useState<boolean>(false);

  setTimeout(() => {
    setOpen(true);
  }, 3000);

  const label = useMemo(() => {
    switch (props.type) {
      case 'error':
        return 'Ошибка';
      case 'info':
        return 'Информация';
      case 'succes':
        return 'Успешно';
      case 'warning':
        return 'Предупреждение';
    }
  }, [props.type])

  return (
    <>
      <div className={`notice notice_${open ? 'open' : 'close'}`}>
        <div className={`notice__circle notice__circle_${props.type}`} />
        <div className={'notice__message'}>
          <h3>{label}</h3>
          <p>{props.message}</p>
        </div>
        <Icon
          type={'close'}
          styleWidth={'16px'}
          onClick={() => setOpen(false)}
          classNameIcon={'notice__icon'}
        />
      </div>
    </>
  )
};