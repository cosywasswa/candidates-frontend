import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "./authentication/context";
import { fetchCandidates } from "./redux/candidateSlice";

const Home = () => {
  const [tierDescription, setTierDescription] = useState("")
  const {candidates} = useSelector((store) => store.candidatesData);
  const { user } = useUser();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCandidates());
  }, []);

  console.log('candidates', candidates)
  const candidatesArr = candidates?.data

  return (
   <main className="bg-slate-200 w-screen min-h-screen flex flex-col">
  <h1 className="text-lg md:text-4xl text-center pt-10">
    Candidate Categorization Platform
  </h1>

  <section className="flex flex-col items-center gap-6 pt-20">
    {candidates?.data &&
      candidates?.data.map((candidate) => (
        
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

       
      ))}
  </section>
</main>

  );
};

export default Home;
