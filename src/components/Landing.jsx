import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { NavLink } from "react-router-dom";

const Landing = () => {
  const [skills, setSkills] = useState([]);
  const [name, setName] = useState("");
  const [email, SetEmail] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSkillChange = (skill) => {
    setSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((item) => item !== skill)
        : [...prev, skill]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "https://candidates-api-yrca.onrender.com/api/candidates";
    setLoading(true);
    try {
      const response = await axios.post(url, {
        name,
        email,
        contact,
        skills,
      });

      if (!response) {
        toast.error("Error while submiting Info");
      }
      setLoading(false);

      toast.success("Registered successfuly");
      setName("");
      setContact("");
      SetEmail("");
      setSkills([]);
      return response.data;
    } catch (error) {
      toast.error("Failed to register", error?.message);
      return error?.message;
    }
  };

  return (
    <main className="bg-slate-200 w-screen h-full py-2">
      <header className="w-screen">
        <nav className=" bg-black h-12">
          <ul className="flex w-screen px-10 h-12 items-center justify-between text-white">
            <li>
              <h3>DesisHub</h3>
            </li>
            <li>
              <NavLink to="/login">Admin Login</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <section className="w-screen">
        <h1 className="pt-10 lg:text-4xl text-center">
          Candidate Registration System
        </h1>
        <p className="pt-2 text-2xl text-center">
          Please Fill below sections to register
        </p>
        <form
          className="flex flex-col gap-5 pt-5 w-1/2 mx-auto"
          onSubmit={handleSubmit}
        >
          <p className="text-xl font-semibold">Personal Information</p>
          <div className="flex gap-2 login-div text-lg">
            <label htmlFor="name" className="w-20">
              Name
            </label>
            <input
              type="text"
              placeholder="name"
              className="bg-white px-2 rounded-sm outline-none w-1/2"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex gap-2 login-div text-lg">
            <label htmlFor="email" className="w-20">
              Email
            </label>
            <input
              type="text"
              placeholder="email"
              className="bg-white px-2 rounded-sm outline-none w-1/2"
              required
              value={email}
              onChange={(e) => SetEmail(e.target.value)}
            />
          </div>
          <div className="flex gap-2 login-div text-lg">
            <label htmlFor="contact" className="w-20">
              Contact
            </label>
            <input
              type="text"
              placeholder="contact"
              className="bg-white px-2 rounded-sm outline-none w-1/2"
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          <p className="text-xl font-semibold">Skills Assesment</p>
          <p className="text-lg">Please check all what applies to you</p>
          <section className="flex flex-col gap-2">
            {[
              "Knows HTML, CSS, and basic JavaScript",
              "Has basic knowledge of Next.js or React",
              "Can build a CRUD app with Next.js using server actions or API routes",
              "Can work with databases",
              "Can build an authenticated CRUD app with Next.js",
              "Can deploy applications",
              "Knows basics of Express/Hono OR has no knowledge of backend frameworks to build authenticated CRUD APIs",
              "Can build authenticated CRUD apps with Next.js",
              "Can build authenticated CRUD APIs with Express/Hono (with documentation)",
              "OR can build authenticated CRUD apps with Laravel",
              "Proficient in Next.js, Express, Laravel and Hono",
              "Knows Golang and can build simple APIs with Go",
            ].map((item, index) => (
              <label key={index} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={skills.includes(item)}
                  onChange={() => handleSkillChange(item)}
                  className="mt-1"
                />
                <span className="text-lg">{item}</span>
              </label>
            ))}
          </section>
          <div className="pb-10">
            <button
              className="bg-gray-500 text-white px-4 py-1 text-lg rounded-md"
              type="submit"
            >
              {loading ? "Registering" : "Register"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Landing;
