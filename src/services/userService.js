import axios from 'axios'
import API_URL from '../constants/api'

const baseURL = `${API_URL}/api/users`

const getAllUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios.get(baseURL, config)
  return data
}

const getEditorRole = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios.get(`${baseURL}/editor`, config)
  return data
}

const createNewUser = async (token, userData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios.post(baseURL, userData, config)
  return data
}

export default {
  getAllUsers,
  getEditorRole,
  createNewUser
}
