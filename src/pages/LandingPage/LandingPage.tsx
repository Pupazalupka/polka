import { useEffect, useState } from "react";
import { Button, LandingHeader } from "../../components";
import { LandingStats } from "../../components/Landing/LandingStats";
import { getBooksStats } from "../../Api";
import type { BooksState } from "../../Types";
import { Card } from "../../components/Card/Ui/Card";

import './LandingPage.scss';
import { useNavigate } from "react-router";

export const LandingPage = () => {
  const [book, setBook] = useState<BooksState[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getBooksStats()
      .then((data) => setBook(data))
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      });
  }, []);

  return (
    <>
      <div className={'landing-page'}>
        <LandingHeader />
        <div
          className={'landing-page__label'}
        >
          <div className={'landing-page__label-text'}>
            <p>ЧИТАЙТЕ В СВОЁМ РИТМЕ</p>
            <h1>Ваша личная библиотека — в одном месте</h1>
            <h4>Собирайте книги, сохраняйте цитаты и замечайте, как меняется ваш читательский путь.</h4>
            <div className={'landing-page__label-button'}>
              <Button
                type={'added'}
                label={'Начать собирать полку'}
                onClick={() => { }}
                width={'170px'}
              />
            </div>
          </div>
        </div>
        <LandingStats />
        <div className={'landing-page__important'}>
          <h3>МЕНЬШЕ СПИСКОВ — БОЛЬШЕ ЧТЕНИЯ</h3>
          <h2>Всё важное о ваших книгах</h2>
          <h4>Соберите любимое в одном спокойном и красивом пространстве.</h4>
          <div className={'landing-page__list'}>
            <div className={'landing-page__list-item'}>
              <div className={'landing-page__list-item-number'}>01</div>
              <div className={'landing-page__list-item-info'}>
                <p className={'landing-page__list-item-title'}>Полки по статусам</p>
                <p className={'landing-page__list-item-text'}>Понимайте, что читаете сейчас, что уже прочитано и что ждёт своего часа.</p>
              </div>
            </div>
            <div className={'landing-page__list-item'}>
              <div className={'landing-page__list-item-number'}>02</div>
              <div className={'landing-page__list-item-info'}>
                <p className={'landing-page__list-item-title'}>Личный цитатник</p>
                <p className={'landing-page__list-item-text'}>Сохраняйте мысли и фрагменты, к которым хочется вернуться.</p>
              </div>
            </div>
            <div className={'landing-page__list-item'}>
              <div className={'landing-page__list-item-number'}>03</div>
              <div className={'landing-page__list-item-info'}>
                <p className={'landing-page__list-item-title'}>Статистика чтения</p>
                <p className={'landing-page__list-item-text'}>Замечайте свой ритм, любимые жанры и авторов.</p>
              </div>
            </div>
            <div className={'landing-page__list-item'}>
              <div className={'landing-page__list-item-number'}>04</div>
              <div className={'landing-page__list-item-info'}>
                <p className={'landing-page__list-item-title'}>Заметки и оценки</p>
                <p className={'landing-page__list-item-text'}>Фиксируйте впечатления, пока они ещё свежи.</p>
              </div>
            </div>
          </div>
        </div>
        <div className={'landing-page__books'}>
          <h3>ВАША ПОЛКА — ВАШИ ПРАВИЛА</h3>
          <h2>Книги, к которым хочется возвращаться</h2>
          <h4>Создайте свою систему: от «читаю сейчас» до «когда-нибудь потом».</h4>
          <div className={'landing-page__books-list'}>
            {book.map((books) => (
              <Card
                key={books.id}
                type={'want-read'}
                book={books}
              />))}
          </div>
          <div className={'landing-page__books-button'}>
            <Button
              type={'added'}
              label={'Создать свою библиотеку'}
              onClick={() => { navigate('/all-books') }}
              width={'190px'}
            />
          </div>
        </div>
        <div className={'landing-page__footer'}>
          <h2>«Хорошая книга — это мечта, которую <br/>мы держим в руках»</h2>
          <h3>— Нил Гейман</h3>
        </div>
      </div>
    </>
  )
};