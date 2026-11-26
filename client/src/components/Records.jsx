import { useEffect, useState } from "react";
import * as api from "../api.js";
import { useAuth } from "../auth.jsx";

// One reusable CRUD screen. `resource` is the API name, `fields` describes the form, `renderItem` draws one record.
// Everyone can read; only the Admin sees the form and the Edit / Delete buttons.
export default function Records({ title, resource, fields, renderItem }) {
  const { isAdmin } = useAuth();
  const blank = Object.fromEntries(fields.map((f) => [f.name, ""]));
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(blank);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const load = () => api.list(resource).then(setItems).catch((e) => setError(e.message));
  useEffect(() => { load(); }, [resource]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editingId) await api.update(resource, editingId, form);
      else await api.create(resource, form);
      setForm(blank);
      setEditingId(null);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setForm(Object.fromEntries(fields.map((f) => [f.name, f.type === "date" ? (item[f.name] || "").slice(0, 10) : item[f.name] || ""])));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (item) => {
    if (!window.confirm("Delete this record?")) return;
    try { await api.remove(resource, item._id); load(); } catch (err) { setError(err.message); }
  };

  return (
    <section>
      <h1>{title}</h1>
      {error && <p className="error" role="alert">{error}</p>}

      {isAdmin && (
        <form className="panel admin-form" onSubmit={handleSubmit}>
          <h2>{editingId ? "Edit record" : "Add a record"}</h2>
          {fields.map((f) => (
            <label key={f.name}>{f.label}
              {f.type === "textarea"
                ? <textarea name={f.name} rows="3" value={form[f.name]} onChange={handleChange} required={f.required} />
                : <input name={f.name} type={f.type || "text"} value={form[f.name]} onChange={handleChange} required={f.required} />}
            </label>
          ))}
          <div className="actions">
            <button className="btn" type="submit">{editingId ? "Save changes" : "Add"}</button>
            {editingId && <button className="btn ghost" type="button" onClick={() => { setEditingId(null); setForm(blank); }}>Cancel</button>}
          </div>
        </form>
      )}

      {items.length === 0 && <p>No records yet.</p>}
      <div className="grid">
        {items.map((item) => (
          <article key={item._id} className="card">
            {renderItem(item)}
            {isAdmin && (
              <div className="actions">
                <button className="btn ghost" onClick={() => startEdit(item)}>Edit</button>
                <button className="btn ghost" onClick={() => handleDelete(item)}>Delete</button>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
