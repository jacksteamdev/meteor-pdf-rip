import React from 'react'

import PrivateHeader from './PrivateHeader'
import Editor from './Editor'

export default (props) => {
  return (
    <div>
      <PrivateHeader title={'PDF Ripper'} />
      <div className='page-content'>
        <div className='page-content__sidebar'>
          Sidebar component
        </div>
        <div className='page-content__main'>
          <Editor />
        </div>
      </div>
    </div>
  )
}
