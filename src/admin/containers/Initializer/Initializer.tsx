import { useEffect, useRef } from 'react';

import pluginId from '../../pluginId';

/**
 *
 * Initializer
 *
 */
const Initializer = ({ updatePlugin }: { updatePlugin: Function }) => {
  const ref = useRef<Function>();
  ref.current = updatePlugin;

  useEffect(() => {
    ref.current?.(pluginId, 'isReady', true);
  }, []);

  return null;
};

export default Initializer;
