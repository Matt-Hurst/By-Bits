import axios from "axios";

const URL = "http://localhost:3001/";

export const userLogin = async (username, password) => {
  const { data } = await axios.post(`${URL}login`, {
    username,
    password,
  }, {
    withCredentials: true
  });
  return data;
};

export const getUserPolicy = async () => {
  const { data } = await axios(`${URL}`, {
      withCredentials: true
    }
  );
  return data;
};
