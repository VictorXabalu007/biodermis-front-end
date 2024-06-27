


export const getHeaders = () => {


    const token = JSON.parse(sessionStorage.getItem('token') ?? '{}');

    const data = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    return data.headers || '';


}
