import { Link, useNavigate } from "react-router";
import { Icon } from "../../../Icon";
import './LandingHeader.scss';
import { Button } from "../../../Button";

export const LandingHeader = () => {
  const navigationLinks = useNavigate();

  return (
    <>
      <div className={'landing-header'}>
        <div className={'landing-header__logo'}>
          <Icon 
            type={'polka-bordo'}
            styleWidth={'21px'}
          />
          <span>Полка</span>
        </div>
        <div className={'landing-header__navigation'}>
          <Link to={'/library'}>Библиотека</Link>
          <Link to={'/quote-library'}>Цитатник</Link>
          <Link to={'/reading-statistics'}>Статистика</Link>
          <Button 
            type={'added'}
            onClick={() => {navigationLinks('/all-books')}}
            label={'Добавить книгу'}
            icon={'plus'}
            width={'140px'}
            iconWidth={'13px'}
          />
        </div>
      </div>
    </>
  )
};