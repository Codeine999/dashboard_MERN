import axios from "axios";
import { http } from 'utils'



export const getAllAdmin = async (authtoken = '') => {
  try {
    const response = await http.get('/user/alladmin');
    const data = response.data.map((adminUser) => ({
      ...adminUser,
      avatarUrl: adminUser.file ? `${process.env.REACT_APP_BASE_URL}/${adminUser.file.replace('image/', '')}` : null,
    }));
    return data;

  } catch (error) {
    console.log('getAllAdminerror')
    throw error;
  }
};

export const changeRole = async (authtoken, data) => {
  try {
    await http.post('/user/change-role', { data })
  } catch (error) {
    console.log(error)
  }
}

export const currentUser = async (authtoken = null) => {
  const _res = await http.post('/user/currentUser')
  if (_res.status !== 200) return null
  return _res
}

export const DeleteUser = async (id, authtoken) => {
  await axios.delete(process.env.REACT_APP_BASE_URL + '/user/delete/' + id, {
    headers: {
      authtoken,
    },
  });
};