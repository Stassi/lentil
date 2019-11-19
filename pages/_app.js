import React from 'react'
import NextApp from 'next/app'
import App from '../components/App'

export default class MyApp extends NextApp {
  componentDidMount () {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render = () => <App {...this.props} />
}
