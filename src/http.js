class EasyHttp {
    async get(url) {
        const response = await fetch(url);
        const data = await response.json();

        return data;
    }

    async post(url, body_data) {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body_data),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });

        const data = await response.json();
        return data;
    }
    
    async put(url, body_data) {
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(body_data),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });

        const data = await response.json();
        return data;
    }
    
    async delete(url) {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });

        const data = await 'Deleted Resource...';
        return data;
    }
}

export const http = new EasyHttp();

