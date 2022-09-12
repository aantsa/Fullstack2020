import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async ({ title, author, url }) => {
  const blog = {
    title: title,
    author: author,
    url: url,
  }

  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const update = async (id, blog) => {
  const res = await axios.put(`${baseUrl}/${id}`, blog)
  return res.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, create, update, setToken, remove }