import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = obj => {
  const request = axios.post(baseUrl, obj)
  return request.then(response => response.data)
}

const update = (id, updatePerson) => {
  const request = axios.put(`${baseUrl}/${id}`, updatePerson)
  return request.then(response => response.data)
}

const deleteById = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(response => response.data)
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update,
  deleteById: deleteById
}