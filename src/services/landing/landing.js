import axios from '../api'

const LandingService = {
    async getNavbar() {
        try {
            const response = await axios.get(`/categories/`);
            return {
                results: response.data.results,
                count: response.data.count
            };
        } catch (error) {
            throw error.response || new Error('Unknown error');
        }
    },
    async getTopNews() {
        try {
            const response = await axios.get(`/articles-top/`);
            return {
                results: response.data.results,
                count: response.data.count
            };
        } catch (error) {
            throw error.response || new Error('Unknown error');
        }
    },
    async getArticles(searchQuery = '') {
        try {
            const response = await axios.get(`/articles/?search=${searchQuery}`);
            return {
                results: response.data.results,
                count: response.data.count
            };
        } catch (error) {
            throw error.response || new Error('Unknown error');
        }
    },
    
}

export default LandingService
