const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_TIMEOUT = process.env.REACT_APP_API_TIMEOUT || 10000;



// API call with timeout
const fetchWithTimeout = async (url, options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

// API service object
export const apiService = {
  // Get all blogs
  getBlogs: async () => {
    try {
      const response = await fetchWithTimeout(`${API_BASE_URL}/posts`);

      console.log('response', response)
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - Server respond nahi kar raha');
      }
      throw new Error(error.message || 'Failed to fetch blogs');
    }
  },

  // Get single blog by ID
  getBlogById: async (id) => {
    try {
      const response = await fetchWithTimeout(`${API_BASE_URL}/posts/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch blog');
    }
  },

  // Get blogs with pagination
  getBlogsPaginated: async (page = 1, limit = 10) => {
    try {
      const response = await fetchWithTimeout(
        `${API_BASE_URL}/posts?_page=${page}&_limit=${limit}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch blogs');
    }
  },
};