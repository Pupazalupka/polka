import { useEffect, useState } from "react";
import type { GlobalStats } from "../../../../Types/GlobalStats";
import { getGlobalStats } from "../../../../Api";

import './LandingStats.scss';

export const LandingStats = () => {
  const [stats, setStats] = useState<GlobalStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getGlobalStats()
      .then(setStats)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      });
  }, []);

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!stats) {
    return <div>Загрузка...</div>;
  }

  const number = (value: number) => {
    return value.toLocaleString('ru-RU');
  };
  
  return (
    <>
      <div className={'landing-stats'}>
        <div className={'landing-stats__item'}>
          <div className={'landing-stats__item-number'}>
            {number(stats.readerCount)}
          </div>
          <div className={'landing-stats__item-label'}>
            <span>читателей уже ведут полку</span>
          </div>
        </div>
        <div className={'landing-stats__item'}>
          <div className={'landing-stats__item-number'}>
            {number(stats.saveQuotesCount)}
          </div>
          <div className={'landing-stats__item-label'}>
            <span>цитат уже сохранено</span>
          </div>
        </div>
        <div className={'landing-stats__item'}>
          <div className={'landing-stats__item-number'}>
            {`${number(stats.returnRate)}%`}
          </div>
          <div className={'landing-stats__item-label'}>
            <span>возвращаются к чтению</span>
          </div>
        </div>
      </div>
    </>
  )
}