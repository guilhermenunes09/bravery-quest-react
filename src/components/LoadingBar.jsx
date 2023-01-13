import { useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { loadingState } from "../store/recoil";
import { instance } from "../services/axios";

const LoadingBar = () => {
  const loading = useRecoilValue(loadingState);

  const setLoading = useSetRecoilState(loadingState);


  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use(config => {
      setLoading(true);
      return config;
    });

    const responseInterceptor = instance.interceptors.response.use(response => {
      setLoading(false);
      return response;
    });

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    }
  }, [setLoading]);


  return (
    <>
      <div className={ loading ? 'loading-bar' : ''}>
        
      </div>
    </>
  )
}

export default LoadingBar;
