import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout.jsx'
import apiClient from '../api/client.js'

function Signup() {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({ name: '', email: '', password: '' })
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
      await apiClient.post(
        '/auth/signup',
        {
          name: formValues.name.trim(),
          email: formValues.email.trim(),
          password: formValues.password,
        },
        { skipAuth: true }
      )

      navigate('/login')
    } catch (error) {
      const message = error?.response?.data?.message || 'Signup failed. Please try again.'
      setErrorMessage(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Start Tracking in Minutes."
      description="Create your profile and build your next streak with confidence."
    >
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-950/70 to-slate-900/90 p-8 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.9)]">
        <div className="absolute right-6 top-6 h-20 w-20 animate-[float_7s_ease-in-out_infinite] rounded-2xl border border-cyan-200/20 bg-cyan-400/10" />
        <div className="absolute bottom-8 left-8 h-16 w-16 animate-[float_9s_ease-in-out_infinite] rounded-full border border-lime-200/30 bg-lime-300/10" />

        <div className="relative">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-50">Sign Up</h2>
              <p className="mt-2 text-sm text-slate-300">Create your profile and start tracking.</p>
            </div>
            <span className="rounded-full border border-cyan-200/30 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-cyan-200">
              New
            </span>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200" htmlFor="signup-name">
                Full Name
              </label>
              <input
                id="signup-name"
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                placeholder="Alex Morgan"
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-300/60 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200" htmlFor="signup-email">
                Email
              </label>
              <input
                id="signup-email"
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                placeholder="you@studio.com"
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-300/60 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200" htmlFor="signup-password">
                Password
              </label>
              <input
                id="signup-password"
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                placeholder="Create a secure password"
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-300/60 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
              />
            </div>
            {errorMessage ? <p className="text-xs text-rose-200">{errorMessage}</p> : null}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl border border-cyan-200/40 bg-cyan-400/20 px-4 py-3 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/70 hover:bg-cyan-400/30"
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
            <p className="text-xs text-slate-400">
              By signing up, you agree to our <span className="text-cyan-200">terms</span> and{' '}
              <span className="text-cyan-200">privacy policy</span>.
            </p>
            <p className="text-xs text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="text-cyan-200 hover:text-cyan-100">
                Sign in here.
              </Link>
            </p>
          </form>
        </div>
      </section>
    </AuthLayout>
  )
}

export default Signup
