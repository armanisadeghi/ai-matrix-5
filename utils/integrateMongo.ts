const baseURL = process.env.NEXT_PUBLIC_AIMATRIX_URL || 'http://localhost:3000'

export const fetchData = async (endpoint: string, userId: string): Promise<any> => {
    try {
        const response = await fetch(`${baseURL}${endpoint}?userId=${userId}`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`Http error! status: ${response.status}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Failed to fetch data', error);
    }
};

export const createData = async (endpoint: string, userId: string): Promise<any> => {
    try {
        const response = await fetch(`${baseURL}${endpoint}?userId=${userId}`, {
            method: 'POST'
        });

        if (!response.ok) {
            throw new Error(`Http error! status: ${response.status}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Failed to add data', error);
    }
}

export const updateDataByUid = async (endpoint: string, userId: string, data: any): Promise<void> => {
    try {
        const response = await fetch(`${baseURL}${endpoint}?userId=${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            const responseData = await response.json();

            console.log('Data updated successfully.', responseData);

        } else {
            throw new Error('Failed to update data by id');
        }
    } catch (err) {
        console.error('Failed to update data by id', err);
    }
}

export const deleteDataByUid = async (endpoint: string, userId: string): Promise<void> => {
    try {
        const response = await fetch(`${baseURL}${endpoint}?userId=${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const responseData = await response.json();
            console.log('Data deleted successfully.', responseData);
        } else {
            throw new Error('Failed to delete data by id');
        }
    } catch (err) {
        console.error('Failed to delete data by id', err);
    }
}
