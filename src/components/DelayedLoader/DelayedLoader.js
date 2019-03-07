import React from 'react';

import { Loaders } from 'meiko-lib';
import { debounce } from 'utils/common';

class DelayedLoader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pastDelay: false
    };
    this.timer = null;
  }

  componentDidMount() {
    clearTimeout(this.timer);
    this.timer = debounce(() => this.setState({ pastDelay: true }), 1500);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return <Loaders.Loadables.SimpleLoading {...this.state} />;
  }
}

export default DelayedLoader;
