import axios from "axios";
import { User } from "../contexts/UserContext";
import { API_URLS } from "../urls";

const AUTH_ = "http://localhost:8000/auth/";

export const register = (username: string, email: string, password: string) => {
  return axios.post(API_URLS.auth.signup, {
    username,
    email,
    password,
  });
};

type LoggedUser = {
  access_token: string,
  user: User
}

export const login = (username: string, password: string) => {
  return axios
    .post<LoggedUser>(API_URLS.auth.login, {
      username,
      password,
    })
    .then((response) => {
      console.log("cool repsonse", response)
      return response.data;
    })
};

export const whoami = (token: string) => {
  return axios
    .get<User>(API_URLS.auth.signup, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      console.log("cool repsonse", response)
      return response.data;
    })
  // .catch(e => {
  //   console.log(e)
  // })
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);

  return null;
};