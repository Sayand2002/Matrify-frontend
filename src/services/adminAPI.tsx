import axios, { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AdminLoginType } from "../typings/admin/loginType";

const API_URL = "http://localhost:4000/api/admin";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  
    const token = localStorage.getItem("adminAccess");
    console.log('log from request admin api', token);
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


axiosInstance.interceptors.response.use(
  (response) => {

    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem('adminRefresh');
    
    if (error.response.status === 401 && !originalRequest._retry && refreshToken) {
      
      console.log('from response axios');
      
      originalRequest._retry = true;
      try {
        console.log('from try catch response');
        
        const newAccessToken = await getNewAccessToken(refreshToken); 
        localStorage.setItem('adminAccess', newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    console.log('from response error');
    
    return Promise.reject(error);
  }
);


async function getNewAccessToken(refreshToken: string) {
  // Implement your logic to fetch a new access token using the refresh token
  // send a POST request to your backend API with the refresh token
  const response = await axiosInstance.post(`${API_URL}/refresh-token`, { refreshToken },{withCredentials: true});
  console.log("response from refresh token route--------------------",response);
  
  return response.data.accessToken; 
}


export const loginAdminAsync = createAsyncThunk("/api/admin/login", async ({ email, password }:AdminLoginType) => {
  const response: AxiosResponse = await axiosInstance.post(`${API_URL}/login`, {
    email,
    password,
  },{ withCredentials: true });
  
  console.log(response);
  
  return response.data;
});

export const listUser = createAsyncThunk("/api/admin/list-users", async () => {
  const response: AxiosResponse = await axiosInstance.get(`${API_URL}/list-users`,{ withCredentials: true });
  
  console.log(response);
  
  return response.data;
});