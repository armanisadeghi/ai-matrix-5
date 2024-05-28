import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_AIMATRIX_URL || 'http://localhost:3000'

export const fetchTotalData = async (endpoint: string): Promise<any[]> => {
    try {
        const response = await axios.get(`${baseURL}${endpoint}`);
        const formattedApis = response.data;
        return formattedApis;
    } catch (error) {
        console.error('Failed to fetch data', error);
        return []; // Return empty array on error
    }
};

export const createData = async (endpoint: string, param: any): Promise<void> => {
    try {
        const response = await axios.post(`${baseURL}${endpoint}`, param);
        console.log('Data added successfully.', response.data);
    } catch (error) {
        console.error('Failed to add data', error);
    }
}

export const fetchOneDataById = async (endpoint: string, id: number): Promise<any> => {
    try {
        const response = await axios.get(`${baseURL}${endpoint}/${id}/`);
        const formattedData = response.data;
        return formattedData;
    } catch (error) {
        console.error('Failed to fetch one data', error);
        return null; // Return empty array on error
    }
}

export const updateDataById = async (endpoint: string, id: number, param: any): Promise<void> => {
    try {
        const response = await axios.put(`${baseURL}${endpoint}/${id}/`, param);
        console.log('Data updated successfully.', response.data)
    } catch (err) {
        console.error(`Failed to update data by id`, err);
    }
}

export const deleteDataById = async (endpoint: string, id: number): Promise<void> => {
    try {
        const response = await axios.delete(`${baseURL}${endpoint}/${id}`);
        console.log('Data deleted successfully.', response.data)
    } catch (err) {
        console.error(`Failed to delete data by id`, err);
    }
}