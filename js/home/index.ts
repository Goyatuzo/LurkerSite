/// <reference types="semantic-ui" />

$('.ui .search').search({
    apiSettings: {
        url: '/api/search/names?user={query}'
    },
    minCharacters: 2
});