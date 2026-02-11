import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout.jsx'
import apiClient from '../api/client.js'

function Login() {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({ email: '', password: '' })
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setIsSubmitting(true)

    try {
      const response = await apiClient.post(
        '/auth/login',
        {
          email: formValues.email.trim(),
          password: formValues.password,
        },
        { skipAuth: true }
      )

      if (response?.data?.token) {
        localStorage.setItem('authToken', response.data.token)
      }

      navigate('/projects')
    } catch (error) {
      const message = error?.response?.data?.message || 'Login failed. Please try again.'
      setErrorMessage(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Welcome Back. Start Strong."
      description="Access your dashboard with a focused, minimal login experience."
    >
      <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.9)] backdrop-blur">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-50">Login</h2>
            <p className="mt-2 text-sm text-slate-300">Use your email and password to continue.</p>
          </div>
          <span className="rounded-full border border-amber-300/30 bg-amber-400/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-amber-200">
            Member
          </span>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-200" htmlFor="login-email">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder="you@studio.com"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-amber-300/60 focus:outline-none focus:ring-2 focus:ring-amber-300/30"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-200" htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-amber-300/60 focus:outline-none focus:ring-2 focus:ring-amber-300/30"
            />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border-white/20 bg-slate-900 text-amber-300 focus:ring-amber-300/40" />
              Remember me
            </label>
            <button type="button" className="text-amber-200/80 hover:text-amber-200">
              Forgot password?
            </button>
          </div>
          {errorMessage ? <p className="text-xs text-rose-200">{errorMessage}</p> : null}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-amber-300 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-200"
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
          <p className="text-xs text-slate-400">
            New here?{' '}
            <Link to="/signup" className="text-amber-200 hover:text-amber-100">
              Create an account.
            </Link>
          </p>
        </form>
      </section>
    </AuthLayout>
  )
}

export default Login
