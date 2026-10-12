const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Simple in-memory cache to make pull requests efficient
const cache = new Map<string, { data: any, timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const method = options.method || 'GET';
  
  // Create a cache key based on URL and body for POST requests
  const cacheKey = `${method}:${url}:${options.body ? options.body : ''}`;

  if (method === 'GET' || method === 'POST') {
    const cachedResponse = cache.get(cacheKey);
    if (cachedResponse && Date.now() - cachedResponse.timestamp < CACHE_TTL) {
      return cachedResponse.data;
    }
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  const data = await response.json();
  
  // Cache successful responses
  if (method === 'GET' || method === 'POST') {
    cache.set(cacheKey, { data, timestamp: Date.now() });
  }
  
  return data;
}

// Example specific endpoint function (as requested)
export async function calculateScore(data: any) {
  return fetchApi('/api/calculate-score', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
