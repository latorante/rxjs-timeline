import React from 'react';

export interface ProviderState {
}

export interface ProviderProps {
  children?: any;
}

export default class Provider extends React.Component<ProviderProps, ProviderState> {
  static displayName = 'Provider';
  static defaultProps: ProviderProps = {
    children: [],
  };

  state: ProviderState = {
  };

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
