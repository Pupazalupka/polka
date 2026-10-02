import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { Notice } from '../components/Notice/Notice';
import { Status } from '../components/Status';
import './ComponentsPage.scss';

export const ComponentsPage = () => {
  return (
    <>
      <div className={'component-page'}>
        <Icon
          type={'added'}
          styleWidth={'50px'}
        />
        <Icon
          type={'book-ohra'}
          styleWidth={'50px'}
        />
        <Icon
          type={'plus'}
          styleWidth={'50px'}
        />
        <Icon
          type={'polka-bordo'}
          styleWidth={'50px'}
        />
        <Icon
          type={'progress'}
          styleWidth={'50px'}
        />
        <Icon
          type={'save'}
          styleWidth={'50px'}
        />
        <div />
        <Button
          type={'added'}
          label={'Добавить книгу'}
          icon={'plus'}
          iconWidth='13px'
          onClick={() => console.log('добавлено')}
        />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <Status
          type={'abandoned'}
          size={'s'}
        />
        <Status
          type={'abandoned'}
          size={'m'}
        />
        <Status
          type={'abandoned'}
          size={'l'}
        />
        <div />
        <Status
          type={'read'}
          size={'s'}
        />
        <Status
          type={'read'}
          size={'m'}
        />
        <Status
          type={'read'}
          size={'l'}
        />
        <Status
          type={'reading-now'}
          size={'s'}
        />
        <Status
          type={'reading-now'}
          size={'m'}
        />
        <Status
          type={'reading-now'}
          size={'l'}
        />
        <div />
        <Status
          type={'want-read'}
          size={'s'}
        />
        <Status
          type={'want-read'}
          size={'m'}
        />
        <Status
          type={'want-read'}
          size={'l'}
        />
        <div className={'component-page__notice'}>
          <Notice
            type={'error'}
            message={'Ошибка'}
          />
        </div>
        <div/>
        <div className={'component-page__notice'}>
          <Notice
            type={'info'}
            message={'Информация'}
          />
        </div>
      </div>
    </>
  )
};