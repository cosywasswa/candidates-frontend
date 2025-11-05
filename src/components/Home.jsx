import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import  CSVDownload  from 'react-json-to-csv';
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  ArcElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { useUser } from "./authentication/context";
import { fetchCandidates } from "./redux/candidateSlice";

const Home = () => {
  const [searchTier, setSearchTier] = useState("");
  const { candidates, isLoading } = useSelector(
    (store) => store.candidatesData
  );
  const { user } = useUser();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCandidates());
  }, []);

  const candidatesArr = candidates?.data || [];

  const filteredCandidates = candidatesArr.filter((candidate) =>
    candidate.tier.toString().includes(searchTier)
  );
  
  const userName = user?.data?.fullName?.split(" ")?.[0] || "User";
  const message = `Hello,  ${userName}`;

  if (isLoading) {
    return (
      <div className="bg-slate-200 w-screen h-screen flex justify-center items-center">
        <h2 className="text-2xl">Loading data ...</h2>
      </div>
    );
  }

  const formatedArr = candidatesArr.map((c, index)=>({
    id: index + 1,
    name: c.name,
    contact: c.contact,
    email: c.email,
    tier: c.tier

  }))
  let tier0Count = 0;
  let tier1Count = 0;
  let tier2Count = 0;
  let tier3Count = 0;
  let tier4Count = 0;

  for(let i=0; i<candidatesArr.length; i++){
    if(candidatesArr[i].tier === 0){
      tier0Count ++
    }else if(candidatesArr[i].tier === 1){
      tier1Count ++
    }else if(candidatesArr[i].tier ===2){
      tier2Count ++
    }else if(candidatesArr[i].tier === 3){
      tier3Count ++
    } else tier4Count ++
  }

  const data = {
    labels: ["Tier0", "Tier1", "Tier2","Tier3", "Tier4"],
    datasets: [
      {
        label: "Distribution",
        data: [
          tier0Count,
          tier1Count,
          tier2Count,
          tier3Count,
          tier4Count
        ],
        backgroundColor: ["#3B82F6", "#227C9D", "#00D97E", "#8A2BE2", "#F6BD60"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Tier Distribution" },
    },
  };

  return (
    <main className="bg-slate-200 w-screen min-h-screen flex flex-col pb-10">
      <header className="w-screen">
        <nav className=" bg-black h-12">
          <ul className="flex w-screen px-10 h-12 items-center justify-between text-white">
            <li>
              <h3>DesisHub</h3>
            </li>
            <li>
              <h3>{message}</h3>
            </li>
          </ul>
        </nav>
      </header>
      <h1 className="text-2xl md:text-4xl text-center pt-10 font-semibold">
        Candidate Categorization Platform
      </h1>
      <div className="pt-5">
        <input
          type="text"
          placeholder="search by tier"
          className="outline-none bg-white rounded-2xl px-2 relative left-14 md:left-44 top-5 w-60"
          value={searchTier}
          onChange={(e) => setSearchTier(e.target.value)}
        />
      </div>
      <section className="flex justify-between items-center px-28">
      {candidatesArr?.length > 0 ? (
      <div className="relative left-0 top-8 md:top-0 md:left-18">
        <CSVDownload data={formatedArr} filename="candidates.csv" className="bg-white px-2 rounded-lg font-bold">
          Download CSV
        </CSVDownload>
      </div>):""
      }
      <div className="hidden lg:flex md:flex w-60 h-60">
        <Pie data={data} options={options} />
      </div>
      </section>

      <section className="flex flex-col items-center gap-6 pt-10">
        {filteredCandidates.length > 0 ? (
          filteredCandidates.map((candidate) => (
            <Link
              key={candidate._id}
              to={`/home/${candidate._id}`}
              className="flex justify-between items-center w-3/4 bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="flex gap-2 w-1/2">
                <p className="font-bold">Name:</p>
                <span>{candidate.name}</span>
              </div>

              <div className="flex gap-2 w-1/2 justify-end">
                <p className="font-bold">Tier:</p>
                <span>{candidate.tier}</span>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 mt-4">
            No candidates found for this tier.
          </p>
        )}
      </section>
    </main>
  );
};

export default Home;
