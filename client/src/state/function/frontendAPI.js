import axios from 'axios'


// export const remove = async (id) =>
//     await axios.delete(process.env.REACT_APP_BASE_URL + '/product/' + id)

// export const create = async (data) =>
//     await axios.post(process.env.REACT_APP_BASE_URL + '/product', data)
    
// export const getdata = async () => {
//     return await axios.get(process.env.REACT_APP_BASE_URL + '/product')
// }
export const readBlog = async (id) => {
    return await axios.get(process.env.REACT_APP_BASE_URL + '/blog/' + id)
}
export const updateBlog = async (id, data) => {
    return await axios.put(process.env.REACT_APP_BASE_URL + '/blog/' + id, data)
}

//frontend.header
export const readHeader = async (id) => {
    return await axios.get(process.env.REACT_APP_BASE_URL + '/update/header/')
    
  };

export const getHeaderByID = async (id) => {
    return await axios.get(process.env.REACT_APP_BASE_URL + '/update/header/' + id)
}
  
  
export const updateHeader = async (id, data) => {
    return await axios.put(process.env.REACT_APP_BASE_URL + '/update/header/' + id, data)
}
