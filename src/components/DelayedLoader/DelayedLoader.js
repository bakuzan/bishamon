import React from 'react';

import debounce from 'ayaka/debounce';
import { SimpleLoading } from 'meiko/Loadable';

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
    return <SimpleLoading {...this.state} />;
  }
}

export default DelayedLoader;
