const getFetch = async (path) => {
    let response = await fetch(`${process.env.REACT_APP_API_URL}/${path}`);
    return await response.json();
}

module.exports.fetchMethods = {
    getFetch,
}