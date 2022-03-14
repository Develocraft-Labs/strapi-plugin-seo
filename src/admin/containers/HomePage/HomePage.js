import React, { memo } from 'react';

import pluginId from '../../pluginId';

/*
 *
 * HomePage
 *
 */
function HomePage() {
  return (
    <div>
      <h1>
        {pluginId}
        &apos;s HomePage :)
      </h1>
      <p>Happy coding</p>
    </div>
  );
}

export default memo(HomePage);
