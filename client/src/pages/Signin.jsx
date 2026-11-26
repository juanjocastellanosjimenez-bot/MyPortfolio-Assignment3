import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth.jsx";

export default function Signin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(form);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="narrow">
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit}>
        <label>Email<input name="email" type="email" value={form.email} onChange={handleChange} required /></label>
        <label>Password<input name="password" type="password" value={form.password} onChange={handleChange} required /></label>
        {error && <p className="error" role="alert">{error}</p>}
        <button className="btn" type="submit">Sign in</button>
      </form>
      <p>No account yet? <Link to="/signup">Sign up</Link></p>
    </section>
  );
}
