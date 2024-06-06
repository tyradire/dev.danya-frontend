import { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import { IFilm } from "../../models/models";
import { useGetFilmsByIdQuery } from "../../store/films/api.kinopoisk";
import { RootState } from "../../store/store";
import './randomizer.scss';

export default function RandomizerPage(): ReactElement {

  const wishData = useSelector((state: RootState) => state.wish)
  const [queryToWishApi, setQueryToWishApi] = useState<string>('&id=' + wishData?.wish?.join('&id=') || '');
  
  const {data: wishFIlmsData, isSuccess: wishIsSuccess} = useGetFilmsByIdQuery(queryToWishApi);

  const [randomList, setRandomList] = useState<any>([]);
  const [randomNumber, setRandomValue] = useState<number>(0);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [film, setFilm] = useState<IFilm>();

  useEffect(() => {
    setQueryToWishApi('&id=' + wishData?.wish?.join('&id='));
  }, [wishData])
  useEffect(() => {
    setRandomList(wishFIlmsData?.map(film => film.id))
  }, [wishIsSuccess])

  const randomStart = () => {
    setRandomValue(Math.floor(Math.random() * randomList.length))
  }

  const randomInterval = () => {
    setButtonDisabled(true);
    const randomAbc = setInterval(randomStart, 100)
    setTimeout(function(){
      clearInterval(randomAbc);
      setFilm(wishFIlmsData?.filter(film => film.id === randomList[randomNumber])[0]);
      setButtonDisabled(false);
    }, 3000)
  }

  return (
    <div className="randomizer-page">
      <div className="randomizer">
        {
          (wishFIlmsData && randomList) && <p className="randomizer__name">{wishFIlmsData?.filter(film => film.id === randomList[randomNumber])[0]?.name}</p>
        }
        { 
          (wishFIlmsData && randomList)
          ? <img className={buttonDisabled ? "randomizer__image randomizer__image_blur" : "randomizer__image"} src={wishFIlmsData?.filter(film => film.id === randomList[randomNumber])[0].poster?.previewUrl} />
          : <Loader />
        }
        <button className="randomizer__button" onClick={randomInterval} disabled={buttonDisabled}>{buttonDisabled ? 'Выбираю...' : 'Выбрать'}</button>
        {
          randomList && <Link className={buttonDisabled ? "randomizer__button randomizer__button_disabled" : "randomizer__button"} to={`/search/${randomList[randomNumber]}`} target="_blank">О фильме</Link>
        }
      </div>
    </div>
  )
} 