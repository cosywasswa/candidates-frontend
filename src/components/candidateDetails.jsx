import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const candidateDetails = () => {
    const [candidate, setCandidate] = useState({})
    const [description, setDescription] = useState("")
  const { candidateId } = useParams();
  const baseURL = "https://candidates-api-yrca.onrender.com/api/candidates";
  const fetchCandidate = async (id) => {
    try{
const response = await axios.get(`${baseURL}/${candidateId}`);
setCandidate(response.data.data)
    return response.data;
    }catch(error){
        return error?.message
    }
  };
  useEffect(()=>{
    fetchCandidate(candidateId)
  }, [])
  useEffect(()=>{
    if(candidate.tier === 0){
        setDescription('Beginner')
    }else if(candidate.tier === 1){setDescription('CRUD Developer')

    }else if(candidate.tier === 2){setDescription('Full-Stack Next.js Developer')
        
    }else if(candidate.tier === 3){setDescription('Multi-Framework Developer')
        
    }else if(candidate.tier === 4){setDescription('Advanced Full-Stack Developer')
        
    }
  })

  return (
  <main className="min-h-screen bg-slate-100 p-10 flex justify-center">
      <div className="bg-white w-full max-w-2xl p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">{candidate.name}</h1>

        <p><strong>Tier:</strong> {candidate.tier}</p>
        <p><strong>Email:</strong> {candidate.email}</p>
        <p><strong>Contact:</strong> {candidate.contact}</p>
         <p className="pt-3"><strong>Description:</strong> {description}</p>

        <div className="mt-4">
          <strong>Skills:</strong>
          <ul className="list-disc ml-6 mt-2">
            {candidate?.skills?.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          <strong>Created:</strong> {new Date(candidate.createdAt).toLocaleString()}
        </p>
      </div>
    </main>)
};

export default candidateDetails;
