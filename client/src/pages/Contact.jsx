import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { profile } from "../data.js";
import * as api from "../api.js";

const emptyForm = { firstName: "", lastName: "", phone: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Keep each field in state as the user types.
  const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  // Save the message in MongoDB through the API, then redirect to the Home page.
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await api.create("contacts", { firstname: form.firstName, lastname: form.lastName, phone: form.phone, email: form.email, message: form.message });
      navigate("/", { state: { sender: form.firstName } });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="contact">
      <div className="panel">
        <h1>Contact me</h1>
        <p>{profile.email}</p>
        <p>{profile.phone}</p>
        <p>{profile.location}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <label>First name<input name="firstName" value={form.firstName} onChange={handleChange} required /></label>
        <label>Last name<input name="lastName" value={form.lastName} onChange={handleChange} required /></label>
        <label>Contact number<input name="phone" type="tel" value={form.phone} onChange={handleChange} /></label>
        <label>Email address<input name="email" type="email" value={form.email} onChange={handleChange} required /></label>
        <label>Message<textarea name="message" rows="5" value={form.message} onChange={handleChange} required /></label>
        {error && <p className="error" role="alert">{error}</p>}
        <button className="btn" type="submit">Send message</button>
      </form>
    </section>
  );
}
