import React, { Component } from 'react';

import Layout from './Components/Layout/Layout.js';
import MainBox from './Containers/MainBox/MainBox.js'
class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <MainBox/>
        </Layout>
      </div>
    );
  }
}

export default App;
