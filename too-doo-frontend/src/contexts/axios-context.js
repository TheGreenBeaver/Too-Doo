import { createContext, useContext, useEffect, useRef } from 'react';
import useErrorHandler from '../hooks/use-error-handler';
import axios from 'axios';
import { API_ROOT } from '../util/constants';
import useClearPath from '../hooks/use-clear-path';
import { getOrigin } from '../util/misc';
import { getHeaders } from '../util/auth';


const Context = createContext({
  api: () => ({ call: () => {}, cancel: () => {} })
});

function useAxios() {
  return useContext(Context);
}

function AxiosContext({ children }) {
  const instance = useRef(axios.create({
    baseURL: `${getOrigin()}${API_ROOT}`
  }));
  const CancelToken = useRef(axios.CancelToken);
  const tokens = useRef({});
  const nextId = useRef(1);

  const handleBackendError = useErrorHandler();

  const clearPathname = useClearPath();

  function cancelById(id) {
    tokens.current[id]?.canceler();
    delete tokens.current[id];
  }

  function api(endpointConfig, ...other) {
    const { url, method, withAuth, cancelOnPathChange } = endpointConfig;
    const urlIsCalculated = typeof url === 'function';
    const theUrl = urlIsCalculated ? url(...other) : url;
    // Omit the args used for url calculation
    const optionsArgIdx = (urlIsCalculated ? url.length : 0) + !!method.withData;
    const specificOptions = other[optionsArgIdx];

    const cancelId = `${theUrl}-${nextId.current++}`;
    const requestOptions = {
      ...specificOptions,
      cancelToken: new CancelToken.current(canceler => {
        tokens.current[cancelId] = { canceler, cancelOnPathChange };
      })
    };
    if (withAuth) {
      requestOptions.headers = getHeaders(specificOptions?.headers);
    }
    const requestArgs = [requestOptions];
    if (method.withData) {
      // Provided data
      requestArgs.unshift(other[optionsArgIdx - 1]);
    }

    return {
      call: () => instance.current[method.name](theUrl, ...requestArgs)
        .then(r => r.data)
        .catch(e => {
          if (!axios.isCancel(e) && !handleBackendError(e)) {
            throw e;
          }
        }),
      cancel: () => cancelById(cancelId)
    }
  }

  // Cancel all pending requests when the app is closed
  useEffect(() => {
    return () => {
      for (const id of Object.keys(tokens.current)) {
        cancelById(id);
      }
    };
  }, []);

  useEffect(() => {
    for (const id of Object.keys(tokens.current)) {
      if (tokens.current[id].cancelOnPathChange) {
        cancelById(id);
      }
    }
  }, [clearPathname]);

  return (
    <Context.Provider value={{ api }}>
      {children}
    </Context.Provider>
  )
}

export default AxiosContext;
export { useAxios };