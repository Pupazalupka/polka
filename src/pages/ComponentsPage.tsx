import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
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
        <div/>
        <Button 
          type={'added'}
          label={'Добавить книгу'}
          icon={'plus'}
          iconWidth='13px'
          onClick={() => console.log('добавлено')}
        />
      </div>
    </>
  )
};