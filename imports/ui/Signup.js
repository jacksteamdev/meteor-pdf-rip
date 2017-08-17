import React, { Component } from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import { Accounts } from 'meteor/accounts-base'
import { createContainer } from 'meteor/react-meteor-data'

export class Signup extends Component {
  static propTypes = {
    createUser: PropTypes.func.isRequired
  }
  state = {
    error: ''
  }
  onSubmit = (e) => {
    e.preventDefault()
    const email = this.refs.email.value.trim()
    const password = this.refs.password.value.trim()

    if (password.length < 8) {
      return this.setState({error: 'Password must be more than 8 characters long'})
    }

    this.props.createUser({ email, password }, (err) => {
      if (err) {
        this.setState({error: err.reason})
      } else {
        this.setState({error: ''})
      }
    })
  }
  render () {
    const {error} = this.state

    return (
      <div className='boxed-view'>
        <div className='boxed-view__box'>
          <h1>Join</h1>

          {error ? <p>{error}</p> : undefined}

          <form onSubmit={this.onSubmit} noValidate className='boxed-view__form' >
            <input type='email' ref='email' name='email' placeholder='Email' />
            <input type='password' ref='password' name='password' placeholder='Password' />
            <button className='button'>Create account</button>
          </form>

          <Link to='/'>Have an account?</Link>
        </div>
      </div>
    )
  }
}

export default createContainer(() => {
  return {
    createUser: Accounts.createUser
  }
}, Signup)
