import { useState, useCallback, useRef, useEffect } from 'react';
//This from Maximilian Schwarzmuller
//hook is used to handle HTTP requests and manage loading state and errors.
export const useHttpClient = () => {
  //state variable is used to track whether a request is currently loading or not.
  const [isLoading, setIsLoading] = useState(false);
  //state variable is used to store any error that occurs during the HTTP request.
  const [error, setError] = useState();
  //ef is used to keep track of active request controllers for cancellation.
  const activeHttpRequests = useRef([]);
  /* function is a callback that sends an HTTP request using the fetch API. 
  It handles the request, parses the response data, and updates the loading state. 
  If an error occurs, it sets the error state and throws the error.*/
  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });

        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );
  //function is responsible for clearing the error state
  const clearError = () => {
    setError(null);
  };
  /*ook is used to clean up active requests when the component unmounts.
 It aborts any ongoing requests by calling the abort method on each request controller. */
  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
