import React, { Component } from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'

export class Login extends Component {
  static propTypes = {
    loginWithPassword: PropTypes.func.isRequired
  }
  state = {
    error: ''
  }
  onSubmit = (e) => {
    e.preventDefault()
    const email = this.refs.email.value.trim()
    const password = this.refs.password.value.trim()

    this.props.loginWithPassword({email}, password, (err) => {
      if (err) {
        this.setState({error: 'Unable to login. Check email and password.'})
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
          <h1>Login</h1>

          {error ? <p>{error}</p> : undefined}

          <form onSubmit={this.onSubmit} noValidate className='boxed-view__form'>
            <input type='email' ref='email' name='email' placeholder='Email' />
            <input type='password' ref='password' name='password' placeholder='Password' />
            <button className='button'>Login</button>
          </form>
          <Link to='/signup'>Need an account?</Link>
        </div>
      </div>
    )
  }
}

export default createContainer(() => {
  return {
    loginWithPassword: Meteor.loginWithPassword
  }
}, Login)
