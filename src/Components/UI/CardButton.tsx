// import { ReactElement } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import likedIcon from '../../assets/images/like-icon-disabled.svg';
// import likedIconActive from '../../assets/images/like-icon-active.svg';
// import './card-button.scss';
// import { RootState } from "../../store/store";
// import { setDefaultStatus, setUnauthorizedStatus } from "../../store/interface/interfaceReducer";

// export default function BackButton({active}: {active: boolean}): ReactElement {

//   const dispatch = useDispatch();

//   const userData = useSelector((state: RootState) => state.user)
//   const interfaceData = useSelector((state: RootState) => state.interface)

//   const handleLikedFilm = () => {
//     if (!userData.isAuth) {
//       if (interfaceData.isOpened) {
//         return;
//       } else {
//         dispatch(setUnauthorizedStatus({status: 'error'}))
//         setTimeout(() => dispatch(setDefaultStatus()), 5000);
//         return;
//       }
//     };
//     setLiked(!active)
//     if (active) {
//       removeFromLikedMovies(id)
//         .then(res => dispatch(removeFilmFromLiked(res?.data.movieId)))
//         .catch(err => console.log(err))
//     } else {
//       addToLikedMovies(id)
//         .then(res => dispatch(addFilmToLiked(res?.data.movieId)))
//         .catch(err => console.log(err))
//       if (collection) return;
//       addToCollectionMovies(id)
//         .then(res => dispatch(addFilmToCollection(res?.data.movieId)))
//         .catch(err => console.log(err))
//     }
//   }

//   return (
//     <button className={liked ? "card-button__fav-btn card-button__fav-btn_active" : "card-button__fav-btn"} onClick={handleLikedFilm}>
//       <img src={liked ? likedIconActive : likedIcon} width="22px" height="22px"/>
//     </button>
//   )
// } 