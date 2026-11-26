import { Navigate } from "react-router-dom";
import { useAuth } from "../auth.jsx";
import Records from "../components/Records.jsx";

const fields = [
  { name: "firstname", label: "First name", required: true },
  { name: "lastname", label: "Last name", required: true },
  { name: "phone", label: "Contact number", type: "tel" },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "message", label: "Message", type: "textarea" },
];

// Contact messages sent through the Contact form. Signed-in users can read them; the Admin can also edit and delete.
export default function Messages() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/signin" replace />;
  return (
    <Records title="Contact messages" resource="contacts" fields={fields} renderItem={(c) => (
      <>
        <h2>{c.firstname} {c.lastname}</h2>
        <p>{c.email}{c.phone && ` · ${c.phone}`}</p>
        <p>{c.message}</p>
      </>
    )} />
  );
}
