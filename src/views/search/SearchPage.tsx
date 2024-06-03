import { ReactElement, useEffect, useState } from "react";
import './search.scss';
import { useSearchFilmsQuery } from '../../store/films/api.kinopoisk';
import Loader from "../../Components/Loader/Loader";
import FilmItems from "../../Components/FilmItems/FilmItems";

export default function SearchPage({isMobileDevice}: {isMobileDevice: boolean}): ReactElement {

  const [searchQuery, setSearchQuery] = useState<string>(localStorage.getItem('JSONFilmsQuery') || '');
  const [testQuery, setTestQuery] = useState<string>(searchQuery);
  const [resetDisabled, setResetDisabled] = useState<boolean>(searchQuery.length < 1);

  const {isSuccess, isLoading, data: fetchedFilmsData} = useSearchFilmsQuery(testQuery, {
    skip: testQuery.length < 1
  });

  function searchMovie(event: React.FormEvent): void {
    event.preventDefault();
    setTestQuery(searchQuery);
  }

  function searchReset() {
    setTestQuery('');
    setSearchQuery('');
    localStorage.setItem('JSONFilmsQuery', '')
  }
  
  useEffect(() => {
    if (!isSuccess) return;
    localStorage.setItem('JSONFilmsQuery', searchQuery)
  }, [isSuccess]);

  useEffect(() => {
    setTestQuery(searchQuery);
  }, [])

  useEffect(() => {
    setResetDisabled(searchQuery.length < 1);
  }, [searchQuery])

  console.log(searchQuery, searchQuery.length < 1)

  return (
    <div className="search">
      <form action="" className="search__form" onSubmit={searchMovie}>
        <button className="search__reset-btn" type="reset" onClick={searchReset} disabled={resetDisabled}></button>
        <input type='text' value={searchQuery} className="search__input" onChange={(e) => setSearchQuery(e.target.value)}/>
        <button className="search__submit-btn" type="submit"></button>
      </form>
      {
        isLoading ? <Loader /> : <FilmItems data={fetchedFilmsData || []} isMobileDevice={isMobileDevice} />
      }
    </div>
  )
}