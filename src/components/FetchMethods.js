const getFetch = async (path) => {
    let response = await fetch(`${process.env.REACT_APP_API_URL}/${path}`);
    return await response.json();
}
const postFecth = async (path, body) => {
    let response = await fetch(`${process.env.REACT_APP_API_URL}/${path}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    return await response.json();
}
module.exports.fetchMethods = {
    getFetch,
    postFecth,
}