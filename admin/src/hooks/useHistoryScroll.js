import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const useHistoryScroll = () => {
  const history = useHistory();
  useEffect(() => {
    const unlisten = history.listen((location, action) => {
      if (action === "POP") {
        // dont scroll on back
        return;
      }
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, [history]);
};

export default useHistoryScroll;
