import { projects as showcase } from "../data.js";
import Img from "../components/Img.jsx";
import Records from "../components/Records.jsx";

const fields = [
  { name: "title", label: "Title", required: true },
  { name: "firstname", label: "First name", required: true },
  { name: "lastname", label: "Last name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "completion", label: "Completion date", type: "date", required: true },
  { name: "description", label: "Description", type: "textarea" },
];

export default function Projects() {
  return (
    <Records title="Projects" resource="projects" fields={fields} renderItem={(p) => {
      const image = showcase.find((s) => s.title === p.title)?.image; // reuse the Assignment 1 picture when the title matches
      return (
        <>
          {image && <Img src={image} alt={p.title} />}
          <h2>{p.title}</h2>
          <p>{p.description}</p>
          <p className="dates">Completed {new Date(p.completion).toLocaleDateString()}</p>
          <p>{p.firstname} {p.lastname} · {p.email}</p>
        </>
      );
    }} />
  );
}
