const API = {
    key: '28545575-c63076a40237c8f3b0a7ed946',
    url: 'https://pixabay.com/api/',
    other: 'image_type=photo&orientation=horizontal&per_page=12'
};

function fetchImages(name, page) {
    return fetch(`${API.url}?q=${name}&page=${page}&key=${API.key}&${API.other}`).then(response => response.json(),
    );
};

const api = {
    fetchImages,
};

export default api;