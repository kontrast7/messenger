import axios from "axios"

const instance = axios.create({
  baseURL: "https://socialmess.herokuapp.com/api/",
})

export const authApi = {
  registerUser: () => {
    return instance.post("")
  },
}
