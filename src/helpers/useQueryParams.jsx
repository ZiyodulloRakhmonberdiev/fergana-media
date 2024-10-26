import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

/**
 * Custom hook to manage query parameters in the URL.
 * 
 * @returns {Object} The current query parameters and functions to update them.
 */
const useQueryParams = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Function to parse query parameters from the URL
  const parseQueryParams = useCallback(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);

  // Get the current query parameters
  const getQueryParams = () => {
    const params = parseQueryParams();
    const queryParams = {};
    for (const [key, value] of params.entries()) {
      queryParams[key] = value;
    }
    return queryParams;
  };

  // Function to update query parameters
  const updateQueryParams = (newParams) => {
    const params = parseQueryParams();
    for (const key in newParams) {
      if (newParams[key] === undefined || newParams[key] === null) {
        params.delete(key); // Remove parameter if value is undefined or null
      } else {
        params.set(key, newParams[key]); // Update or add parameter
      }
    }
    navigate({ search: params.toString() });
  };

  return { queryParams: getQueryParams(), updateQueryParams };
};

export default useQueryParams;
