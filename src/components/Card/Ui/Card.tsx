import { Status } from "../../Status";
import type { IProps } from "../Types";
import { useState } from "react";

import './Card.scss';

export const Card = (props: IProps) => {
  const [rating, setRating] = useState(() => {
    const saved = localStorage.getItem(`rating_${props.book.id}`);
    return saved ? Number(saved) : 0;
  });
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    localStorage.setItem(`rating_${props.book.id}`, String(newRating));
  };

  return (
    <div className={'card'}>
      <div className={'card__image'}>
        <img src={props.book.image} alt={props.book.title} />
      </div>
      <div className={'card__info'}>
        <h3 className={'card__title'}>{props.book.title}</h3>
        <p className={'card__author'}>{props.book.author}</p>
        <div
          className="card__rating"
          role="group"
          aria-label="Оценка книги"
          onMouseLeave={() => setHoveredRating(0)}
        >
          {Array.from({ length: 5 }, (_, index) => {
            const value = index + 1;
            const isActive = value <= (hoveredRating || rating);

            return (
              <button
                key={value}
                type="button"
                className={`card__star ${isActive ? 'card__star--active' : ''}`}
                aria-label={`${value} из 5`}
                aria-pressed={rating === value}
                onMouseEnter={() => setHoveredRating(value)}
                onFocus={() => setHoveredRating(value)}
                onBlur={() => setHoveredRating(0)}
                onClick={() => handleRatingChange(value)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.25l2.98 6.04 6.66.97-4.82 4.7 1.14 6.63L12 17.46 6.04 20.6l1.14-6.63-4.82-4.7 6.66-.97L12 2.25z" />
                </svg>
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: '20px' }}>
          <Status
            type={props.type}
            size={'xs'}
          />
          <div className={'card__progress'}>
            <div className={'card__progress_value'} style={{ width: `${props.book.progress}%` }}>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};