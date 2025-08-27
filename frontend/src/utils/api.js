const BASE_URL = 'https://fakestoreapi.com';

// Generic API request handler with error handling
const apiRequest = async (url) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(error.message || 'Failed to fetch data');
  }
};

// Products API
export const api = {
  // Get all products
  getProducts: () => apiRequest('/products'),
  
  // Get single product by ID
  getProduct: (id) => apiRequest(`/products/${id}`),
  
  // Get all categories
  getCategories: () => apiRequest('/products/categories'),
  
  // Get products by category
  getProductsByCategory: (category) => apiRequest(`/products/category/${category}`),
  
  // Get limited products (for pagination if needed)
  getLimitedProducts: (limit = 20) => apiRequest(`/products?limit=${limit}`),
};

// Cache management
export const cache = {
  // In-memory cache
  data: new Map(),
  
  // Set cache with expiration (default 5 minutes)
  set: (key, data, ttl = 5 * 60 * 1000) => {
    const expiry = Date.now() + ttl;
    cache.data.set(key, { data, expiry });
  },
  
  // Get from cache if not expired
  get: (key) => {
    const cached = cache.data.get(key);
    if (!cached) return null;
    
    if (Date.now() > cached.expiry) {
      cache.data.delete(key);
      return null;
    }
    
    return cached.data;
  },
  
  // Clear all cache
  clear: () => {
    cache.data.clear();
  }
};

// Cached API requests
export const cachedApi = {
  getProducts: async () => {
    const cacheKey = 'products';
    const cached = cache.get(cacheKey);
    if (cached) return cached;
    
    const data = await api.getProducts();
    cache.set(cacheKey, data);
    return data;
  },
  
  getProduct: async (id) => {
    const cacheKey = `product_${id}`;
    const cached = cache.get(cacheKey);
    if (cached) return cached;
    
    const data = await api.getProduct(id);
    cache.set(cacheKey, data);
    return data;
  },
  
  getCategories: async () => {
    const cacheKey = 'categories';
    const cached = cache.get(cacheKey);
    if (cached) return cached;
    
    const data = await api.getCategories();
    cache.set(cacheKey, data);
    return data;
  },
  
  getProductsByCategory: async (category) => {
    const cacheKey = `category_${category}`;
    const cached = cache.get(cacheKey);
    if (cached) return cached;
    
    const data = await api.getProductsByCategory(category);
    cache.set(cacheKey, data);
    return data;
  }
};