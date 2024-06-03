import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { SimilarMovie } from "../../models/models";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import './similar-list.scss';
import 'swiper/css';
import 'swiper/css/pagination';

export default function SimilarFilms({similarFilmsData}: {similarFilmsData: SimilarMovie[]|[]}): ReactElement {

  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={10}
      loop={true}
      className="mySwiper"
      breakpoints={{
        1480: {
          slidesPerView: 8,
        },
        1280: {
          slidesPerView: 7,
        },
        1080: {
          slidesPerView: 6,
        },
        880: {
          slidesPerView: 5,
        },
        768: {
          slidesPerView: 4,
        },
        500: {
          slidesPerView: 3,
        }
      }}
    >
      {
        similarFilmsData?.map((film, i) => {
                  if (!film.poster.previewUrl) return;
                  return  <SwiperSlide className="similar-item" key={i}>
                            <NavLink to={`/search/${film.id}`}>
                              <p className="similar-title">{film.name}</p>
                            </NavLink>
                            <img src={film.poster.previewUrl} alt={film.name} className="similar-poster" />
                          </SwiperSlide>
                })
      }
    </Swiper>
  )
} 