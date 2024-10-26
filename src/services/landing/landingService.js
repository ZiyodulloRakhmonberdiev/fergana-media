import axios from "../api";

const LandingService = {
  async getNavbar() {
    try {
      const response = await axios.get(`/categories/`);
      return {
        results: response.data.results,
        count: response.data.count,
      };
    } catch (error) {
      throw error.response || new Error("Unknown error");
    }
  },
  async getArticle(id) {
    try {
      const response = await axios.get(`/articles/${id}`);
      return response.data;
    } catch (error) {
      throw error.response || new Error("Unknown error");
    }
  },
  async getAllArticles() {
    try {
      const response = await axios.get(`/articles/`);
      return {
        results: response.data.results,
        count: response.data.count
      };
    } catch (error) {
      throw error.response || new Error("Unknown error");
    }
  },
};

export default LandingService;
