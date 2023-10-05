import axios from "axios";


export const register = async (data, token) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "authtoken": token, 
    },
  };
  return await axios.post(process.env.REACT_APP_BASE_URL + "/auth/register", data, config);
};

export const login = async (user) => {
  return await axios.post(process.env.REACT_APP_BASE_URL + '/auth/login',
    user, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}


