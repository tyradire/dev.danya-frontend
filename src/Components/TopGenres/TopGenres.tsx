import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

export default function TopGenres(): ReactElement {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const collectionData = useSelector((state: RootState) => state.collection)
  const collectionGenres = collectionData.genres.map(genre=>genre.genre);
  const collectionTopGenres = collectionData.genres.map(genre=>genre.genre).slice(0,12)
  console.log(collectionData.genres.map(genre=>genre.count).slice(12))
  const data = {
    labels: [...collectionData.genres.map(genre=>genre.genre).slice(0,12), 'прочее'],
    datasets: [
      {
        label: 'Просмотрено',
        data: [...collectionData.genres.map(genre=>genre.count).slice(0,12), collectionData.genres.map(genre=>genre.count).slice(12).reduce((acc, number) => acc + number)],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  console.log(collectionData.genres)

  return (
    <>
      <Pie data={data} />
      <div className="top-genres">
      </div>
    </>
    
  )
} 