import React from 'react';

import PanelContent from './PanelContent';

export default function ContentSettings({ view }) {
  return (
    <PanelContent>
      {JSON.stringify(view)}
    </PanelContent>
  );
}
