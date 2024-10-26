import axios from "../api";

const LandingVideos = {
  async getVideos() {
    try {
      const response = await axios.get(`/videos/`);
      return {
        results: response.data.results,
        count: response.data.count,
      };
    } catch (error) {
      throw error.response || new Error("Unknown error");
    }
  },

  async getVideosId(id) {
    try {
      const response = await axios.get(`/videos/${id}/`); 
      return response.data;
    } catch (error) {
      throw error.response || new Error("Unknown error");
    }
  },
};

export default LandingVideos;
