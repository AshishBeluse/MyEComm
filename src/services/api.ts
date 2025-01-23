import axios from 'axios';
import Config from '../utils/config';

const apiClient = axios.create({
  baseURL: Config.apiBaseUrl,
  timeout: 10000,
});

export const getProducts = async () => {
  try {
    const response = await apiClient.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export default apiClient;
