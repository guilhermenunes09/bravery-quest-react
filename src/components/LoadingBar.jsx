import { useRecoilState } from "recoil";
import { loadingState } from "../store/recoil";

const LoadingBar = () => {
  const [loading, setLoading] = useRecoilState(loadingState);

  return (
    <>
      <div className={ loading ? 'loading-bar' : ''}>
        
      </div>
    </>
  )
}

export default LoadingBar;
