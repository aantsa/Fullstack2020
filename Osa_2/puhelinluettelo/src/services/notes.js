import axios from 'axios'
const baseUrl = "http://localhost:3002/persons";
const herokuUrl = "https://infinite-plateau-87631.herokuapp.com/api/persons";

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newPerson => {
  return axios.post(baseUrl, newPerson)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update,
  delete: deletePerson,
}