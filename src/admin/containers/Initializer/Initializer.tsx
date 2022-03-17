/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

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

Initializer.propTypes = {
  updatePlugin: PropTypes.func.isRequired,
};

export default Initializer;
