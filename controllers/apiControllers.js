const axios = require('axios');

async function fetchDataFromApis(apiUrls) {
    try {
        const requests = apiUrls.map(url => axios.get(url));
        const results = await Promise.all(requests);
        return results.map(result => result.data);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

const urls = ['https://jsonplaceholder.typicode.com/posts', 'https://jsonplaceholder.typicode.com/comments'];
fetchDataFromApis(urls).then(data => console.log(data));


module.exports = { fetchDataFromApis };
