// All calls to the Express backend live here. The JWT is read from localStorage and sent as a Bearer token.
const BASE = import.meta.env.VITE_API_URL || "";

export const getToken = () => localStorage.getItem("token");

async function request(path, { method = "GET", body } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (getToken()) headers.Authorization = `Bearer ${getToken()}`;
  const res = await fetch(BASE + path, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

export const signin = (credentials) => request("/auth/signin", { method: "POST", body: credentials });
export const signout = () => request("/auth/signout");
export const signup = (user) => request("/api/users", { method: "POST", body: user });

// resource is "contacts", "projects" or "qualifications"
export const list = (resource) => request(`/api/${resource}`);
export const create = (resource, item) => request(`/api/${resource}`, { method: "POST", body: item });
export const update = (resource, id, item) => request(`/api/${resource}/${id}`, { method: "PUT", body: item });
export const remove = (resource, id) => request(`/api/${resource}/${id}`, { method: "DELETE" });
