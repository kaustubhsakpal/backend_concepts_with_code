import { setuser, setloading, seterror } from "../State/auth.state.js";
import { useDispatch, useSelector } from "react-redux";
import { register, login, getme } from "../service/auth.api.js";

export function UseAuth() {
  const dispatch = useDispatch();
  async function registerhandel({ username, email, password }) {
    try {
      dispatch(setloading(true));
      dispatch(seterror(null));
      const data = await register({ username, email, password });
      dispatch(setuser(data.user));
      return data;
    } catch (err) {
      dispatch(seterror(err.error || "Registration failed"));
      throw err;
    } finally {
      dispatch(setloading(false));
    }
  }

  async function handellogin({ email, password }) {
    try {
      dispatch(setloading(true));
      dispatch(seterror(null));
      const data = await login({ email, password });
      dispatch(setuser(data.user));
      return data;
    } catch (err) {
      dispatch(seterror(err.error || "Login failed"));
      throw err;
    } finally {
      dispatch(setloading(false));
    }
  }

  async function handelgetme() {
    try {
      dispatch(setloading(true));
      dispatch(seterror(null));
      const data = await getme();
      dispatch(setuser(data.user));
      return data;
    } catch (err) {
      const message = err.error || "Data fetch failed";
      if (message !== "Unauthorized access - No token provided") {
        dispatch(seterror(message));
      } else {
        dispatch(seterror(null));
      }
      console.log(err);
    } finally {
      dispatch(setloading(false));
    }
  }

  return {
    registerhandel,
    handellogin,
    handelgetme
  };
}
