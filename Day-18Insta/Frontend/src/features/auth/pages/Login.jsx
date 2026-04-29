import React, { useState } from 'react'
import '../style/form.scss'
import { Link } from 'react-router'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'


const Login = () => {

    const { user, loading, handleLogin } = useAuth()

    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")

    const navigate = useNavigate()
    
    function handleSubmit(e) {
        e.preventDefault()

    }
  return (
    <main>
      <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit} >
                    <input onInput={(e) => { setUsername(e.target.value) }}
                        type="text"
                        name='username'
                        placeholder='Enter username' />
                    <input onInput={(e) => { setPassword(e.target.value) }}
                        type="password"
                        name='password'
                        placeholder='Enter password' />
                    <button type='submit'>Login</button>
                </form>
                <p>Don't have an account? <Link className='toggleAuthForm' to="/register">Register</Link></p>
            </div>
    </main>
  )
}

export default Login