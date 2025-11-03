import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "./authentication/context";
import { fetchCandidates } from "./redux/candidateSlice";

const Home = () => {
  const [searchTier, setSearchTier] = useState("");
  const { candidates } = useSelector((store) => store.candidatesData);
  const { user } = useUser();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCandidates());
  }, []);

  const candidatesArr = candidates?.data || [];

  const filteredCandidates = candidatesArr.filter((candidate) =>
    candidate.tier.toString().includes(searchTier)
  );

  return (
    <main className="bg-slate-200 w-screen min-h-screen flex flex-col">
      <h1 className="text-lg md:text-4xl text-center pt-10">
        Candidate Categorization Platform
      </h1>
      <div className="pt-5">
        <input
          type="text"
          placeholder="search by tier"
          className="outline-none bg-white rounded-2xl px-2 relative left-44 top-5 w-60"
          value={searchTier}
          onChange={(e) => setSearchTier(e.target.value)}
        />
      </div>

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
