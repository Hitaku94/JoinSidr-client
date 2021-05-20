import React, { Component } from 'react'
import LottieControl from './LottieControl'
import data from '../../../animations/404.json'

class NotFound extends Component {
  render() {
    return (
      <div>
        <h2>Hm.... We haven't been that far yet</h2>
        <LottieControl animation={data} width={1000} height={720}/>
      </div>
    )
  }
}

export default NotFound