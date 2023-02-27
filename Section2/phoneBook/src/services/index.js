import axios from 'axios';
const base_url = '/api/persons';

const getAll = () => {
  const request = axios.get(base_url);
  return request.then(res => res.data)
}

const create = newObj => {
  const request = axios.post(base_url, newObj);
  return request.then(res => res.data)
}

const update = (id, newObj) => {
  const request = axios.put(`${base_url}/${id}`, newObj)
  return request.then(res => res.data)
}

const remove = id => {
  const request = axios.delete(`${base_url}/${id}`)
  return request.then(res => res.data)
}

const services = {
  getAll,
  create,
  update,
  remove,
}

export default services;