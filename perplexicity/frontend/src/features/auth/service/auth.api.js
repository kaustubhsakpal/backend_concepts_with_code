import axios from "axios";
const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URI}/api/auth`,
  withCredentials: true,
});

async function handleapi(apicall) {
  try {
    const response = await apicall;
    return response.data;
  } catch (err) {
    throw { error: err.response?.data?.message || "api call failed" };
  }
}

export async function register({ username, email, password }) {
  return handleapi(api.post("/register", { username, email, password }));
}

export async function login({ username, email, password }) {
  return handleapi(api.post("/login", { username, email, password }));
}

export async function getme() {
  return handleapi(api.get("/get-me"));
}
