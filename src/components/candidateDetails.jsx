import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";

const candidateDetails = () => {
  const [candidate, setCandidate] = useState({});
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { candidateId } = useParams();
  const baseURL = "https://candidates-api-yrca.onrender.com/api/candidates";

  const fetchCandidate = async (candidateId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/${candidateId}`);
      setCandidate(response.data.data);
      setLoading(false);
      return response.data;
    } catch (error) {
      return error?.message;
    }
  };
  useEffect(() => {
    fetchCandidate(candidateId);
  }, []);
  useEffect(() => {
    if (candidate.tier === 0) {
      setDescription("Beginner");
    } else if (candidate.tier === 1) {
      setDescription("CRUD Developer");
    } else if (candidate.tier === 2) {
      setDescription("Full-Stack Next.js Developer");
    } else if (candidate.tier === 3) {
      setDescription("Multi-Framework Developer");
    } else if (candidate.tier === 4) {
      setDescription("Advanced Full-Stack Developer");
    }
  });

  if(loading){
    return(
      <div className="bg-slate-200 w-screen h-screen flex justify-center items-center">
        <h2 className="text-2xl">Loading data ...</h2>
      </div>
    )
  }

  return (
    <main className="w-screen min-h-screen bg-slate-100 flex flex-col items-center pb-10">
      <header className="w-screen pb-5">
        <nav className=" bg-black h-12">
          <ul className="flex w-screen px-10 h-12 items-center justify-between text-white">
            <li>
              <h3>DesisHub</h3>
            </li>
            <li>
              <NavLink to="/home">Home</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <div className="bg-white w-full max-w-2xl p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">{candidate.name}</h1>

        <p>
          <strong>Tier:</strong> {candidate.tier}
        </p>
        <p>
          <strong>Email:</strong> {candidate.email}
        </p>
        <p>
          <strong>Contact:</strong> {candidate.contact}
        </p>
        <p className="pt-3">
          <strong>Description:</strong> {description}
        </p>

        <div className="mt-4">
          <strong>Skills:</strong>
          <ul className="list-disc ml-6 mt-2">
            {candidate?.skills?.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          <strong>Created:</strong>{" "}
          {new Date(candidate?.createdAt).toLocaleString()}
        </p>
      </div>
    </main>
  );
};

export default candidateDetails;
