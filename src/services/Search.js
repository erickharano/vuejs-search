import http from '../http-common';

class SearchService {
    find(text) {
        return http.get(`/search?text=${text}`);
    }
}

export default new SearchService();