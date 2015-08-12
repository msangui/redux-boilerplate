import axios from 'axios';

export function getWiki(title) {
    return axios
        .get('https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' + title)
        .then((response) => {
            return Object
                .keys(response.data.query.pages)
                .map((pageId) => Object.assign({id: Date.now()}, response.data.query.pages[pageId]));
        })
}

