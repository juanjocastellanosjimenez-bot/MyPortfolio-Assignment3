import Records from "../components/Records.jsx";

const fields = [
  { name: "title", label: "Qualification", required: true },
  { name: "firstname", label: "First name", required: true },
  { name: "lastname", label: "Last name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "completion", label: "Completion date", type: "date", required: true },
  { name: "description", label: "Description", type: "textarea" },
];

export default function Education() {
  return (
    <Records title="Education" resource="qualifications" fields={fields} renderItem={(q) => (
      <>
        <h2>{q.title}</h2>
        <p>{q.description}</p>
        <p className="dates">Completed {new Date(q.completion).toLocaleDateString()}</p>
        <p>{q.firstname} {q.lastname} · {q.email}</p>
      </>
    )} />
  );
}
