import axiosInstance from "../utils/axiosInstance"

export const registerUser = async (data: { name: string; email: string; password: string }) => {
  const response = await axiosInstance.post("/register", data);
  return response.data;
};

export const googleAuth = async (googleData:{ name: string; email: string; googleId: string }) => {
  const response = await axiosInstance.post("/google-auth", googleData);
  console.log("bacend response: ", response.data)
  return response.data;
};


export const login = async (data: { email: string; password: string }) => {
  const response = await axiosInstance.post("/login", data,{
  });
  return response.data;
};

export const logoutUser = async () => {
  const response = await axiosInstance.post("/logout");
  return response.data
};

export const getCurrentUser = async () => {
  const response = await axiosInstance.get('/user')
  console.log(response.data)
  return response.data
}

