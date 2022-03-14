/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import pluginId from '../../pluginId';

/**
 *
 * Initializer
 *
 */
function Initializer({ updatePlugin }) {
  const ref = useRef();
  ref.current = updatePlugin;

  useEffect(() => {
    ref.current(pluginId, 'isReady', true);
  }, []);

  return null;
}

Initializer.propTypes = {
  updatePlugin: PropTypes.func.isRequired,
};

export default Initializer;
