import axios from 'axios'
import API_URL from '../constants/api'

const baseURL = `${API_URL}/api/posts`

const getAllPosts = async () => {
  const { data } = await axios.get(baseURL)
  return data
}

const createNewPost = async (token, postData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios.post(baseURL, postData, config)
  return data
}

export default {
  getAllPosts,
  createNewPost
}
