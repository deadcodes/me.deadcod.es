import React from 'react';
import DefaultAdmonitionTypes from '@theme-original/Admonition/Types';

function MyCustomAdmonition(props) {
  return (
    <div style={{maxHeight: 0, opacity: 0}}>
      <div>{props.children}</div>
    </div>
  );
}

const AdmonitionTypes = {
  ...DefaultAdmonitionTypes,

  // Add all your custom admonition types here...
  // You can also override the default ones if you want
  'hidden': MyCustomAdmonition,
};

export default AdmonitionTypes;