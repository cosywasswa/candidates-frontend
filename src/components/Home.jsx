import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  const name = user?.data?.fullName;
  const parts = name?.trim().split(" ");
  const userName = parts[0];
  const message = `Hello,  ${userName}`;

  if (isLoading) {
    return (
      <div className="bg-slate-200 w-screen h-screen flex justify-center items-center">
        <h2 className="text-2xl">Loading data ...</h2>
      </div>
    );
  }

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
      <h1 className="text-2xl md:text-4xl text-center pt-10">
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
