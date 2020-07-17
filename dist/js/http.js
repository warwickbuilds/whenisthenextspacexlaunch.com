class HTTP {
    async get(url) {
        // await will resolve promise from fetch(url)
        const response = await fetch(url);
        // await will resolve promise from response.json()
        const resData = await response.json();
        return resData;
    }

    // async post(url, data) {
    //     const response = await fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     })
    //     const resData = await response.json();
    //     return resData;
    // }

    // async put(url, data) {
    //     const response = await fetch(url, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     })
    //     const resData = await response.json();
    //     return resData;
    // }

    // async delete(url) {
    //     const response = await fetch(url, {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-type': 'application/json'
    //         }
    //     })
    //     const resData = await 'Record Deleted';
    //     return resData;
    // }
}