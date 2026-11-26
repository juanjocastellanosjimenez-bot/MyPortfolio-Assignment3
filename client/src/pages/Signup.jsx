import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as api from "../api.js";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.signup(form);
      navigate("/signin"); // new accounts always get the "user" role
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="narrow">
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <label>Name<input name="name" value={form.name} onChange={handleChange} required /></label>
        <label>Email<input name="email" type="email" value={form.email} onChange={handleChange} required /></label>
        <label>Password (min. 6 characters)<input name="password" type="password" minLength={6} value={form.password} onChange={handleChange} required /></label>
        {error && <p className="error" role="alert">{error}</p>}
        <button className="btn" type="submit">Create account</button>
      </form>
      <p>Already registered? <Link to="/signin">Sign in</Link></p>
    </section>
  );
}
