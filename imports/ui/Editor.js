import React, { Component } from 'react'

import TextList from './TextList'

export default class Editor extends Component {
  render () {
    return (
      <div className='editor'>
        <TextList />
      </div>
    )
  }
}
