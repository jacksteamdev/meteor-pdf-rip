import React, { Component } from 'react'

import pdfText from '../api/pdfText/pdfText'

export default class TextList extends Component {
  state = {
    text: []
  }
  async componentDidMount () {
    const pages = await pdfText()
    const text = pages[1].map((line) => {
      const segments = line.map(segments => segments.text)
      return segments.join(' ')
    })

    this.setState({ text })
  }
  render () {
    const list = this.state.text.map((t, i) => <p key={i}>{t}</p>)

    return (
      <div>
        {list.length > 0 ? list : 'Loading PDF...'}
      </div>
    )
  }
}
