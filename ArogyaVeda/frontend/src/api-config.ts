/// <reference types="vite/client" />
// Central API Configuration for Deployment Readiness
// When deploying to Azure, you can change 'http://127.0.0.1:8000' to your VM's public IP or domain.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/api/user/login/`,
  REGISTER: `${API_BASE_URL}/api/user/register/`,
  PREDICT: `${API_BASE_URL}/api/prediction/predict/`,
  DASHBOARD: `${API_BASE_URL}/api/prediction/dashboard-data/`,
  CHAT: `${API_BASE_URL}/api/prediction/chat/`,
};

export default API_BASE_URL;
