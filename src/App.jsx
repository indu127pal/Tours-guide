import { useEffect, useState } from "react";
import Loading from './Loading';
import Tours from './Tours';

const url = 'https://course-api.com/react-tours-project';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tours, setTours] = useState([])

  // remove tours
  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  }
  // fetch tours data
  const fetchTours = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const tours = await res.json();
      console.log(tours); 
      setTours(tours);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchTours()
  }, [])

  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    )
  }
  // Refresh 
  if (tours.length === 0) {
    return <main>
      <div className="title">
        <h2>no tour left</h2>
        <button type="button" className="btn" onClick={fetchTours}>
          Refresh
        </button>
      </div>
    </main>
  }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  )
};
export default App;