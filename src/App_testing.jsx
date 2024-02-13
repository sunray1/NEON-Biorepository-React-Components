import React from 'react';

import NeonPage from './lib_components/components/NeonPage/NeonPage';

export default function App() {
  const customFooter = (
    <div />
  );
  return (
    <NeonPage
      customFooter={customFooter}
    >
    </NeonPage>
  );
}
