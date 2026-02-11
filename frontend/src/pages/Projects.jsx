import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import apiClient from '../api/client.js'

function Projects() {
  const [copiedId, setCopiedId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isActive = true

    const loadProjects = async () => {
      try {
        const response = await apiClient.get('/projects')
        if (!isActive) {
          return
        }
        setProjects(Array.isArray(response.data) ? response.data : [])
      } catch (error) {
        if (!isActive) {
          return
        }
        const message = error?.response?.data?.message || 'Unable to load projects.'
        setErrorMessage(message)
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    loadProjects()

    return () => {
      isActive = false
    }
  }, [])

  const handleCopy = async (projectId, apiKey) => {
    try {
      await navigator.clipboard.writeText(apiKey)
      setCopiedId(projectId)
      window.setTimeout(() => setCopiedId(null), 1800)
    } catch (error) {
      console.error('Failed to copy api key', error)
    }
  }

  const handleOpenModal = () => setIsModalOpen(true)

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setProjectName('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!projectName.trim()) {
      return
    }

    try {
      const response = await apiClient.post('/projects', { name: projectName.trim() })
      const createdProject = response?.data
      if (createdProject) {
        setProjects((prev) => [createdProject, ...prev])
      }
      handleCloseModal()
    } catch (error) {
      const message = error?.response?.data?.message || 'Unable to create project.'
      setErrorMessage(message)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-16 h-72 w-72 rounded-full bg-amber-400/20 blur-[80px]" />
        <div className="absolute right-10 top-24 h-64 w-64 rounded-full bg-cyan-400/20 blur-[90px]" />
        <div className="absolute bottom-10 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-lime-400/15 blur-[110px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-14">
        <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-amber-300/80">Spectra</p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-50 md:text-5xl">Projects</h1>
            <p className="mt-3 max-w-2xl text-base text-slate-300 md:text-lg">
              Track your active apps, jump into insights, and keep your keys secure.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleOpenModal}
              className="inline-flex items-center gap-2 rounded-2xl border border-amber-300/40 bg-amber-300 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-900 transition hover:bg-amber-200"
            >
              <span className="text-base">+</span>
              Add Project
            </button>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-300">
              <span className="text-amber-200">{projects.length}</span>
              <span>active projects</span>
            </div>
          </div>
        </header>

        {errorMessage ? <p className="mb-4 text-sm text-rose-200">{errorMessage}</p> : null}

        {isLoading ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
            Loading projects...
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => {
            const createdLabel = new Date(project.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })

            return (
              <article
                key={project._id}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.9)] backdrop-blur transition hover:border-white/20"
              >
                <div className="absolute right-6 top-6 h-20 w-20 rounded-2xl border border-cyan-200/20 bg-cyan-400/10 opacity-0 transition group-hover:opacity-100" />

                <div className="relative flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Project</p>
                      <Link
                        to={`/projects/${project._id}/insights`}
                        className="mt-2 block text-2xl font-semibold text-slate-50 transition hover:text-amber-200"
                      >
                        {project.name}
                      </Link>
                    </div>
                    <span className="rounded-full border border-amber-300/30 bg-amber-400/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-amber-200">
                      Live
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Created</p>
                      <p className="mt-2 text-sm text-slate-200">{createdLabel}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">API Key</p>
                      <div className="relative mt-2 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleCopy(project._id, project.apiKey)}
                          className="group/key inline-flex items-center gap-2 rounded-full border border-cyan-200/30 bg-slate-950/60 px-4 py-2 text-xs font-semibold text-cyan-100 transition hover:border-cyan-200/60"
                        >
                          <span className="font-mono text-[11px] tracking-[0.15em] text-slate-200">
                            <span className="hidden group-hover/key:inline">{project.apiKey}</span>
                            <span className="group-hover/key:hidden">••••••••••••••••••••</span>
                          </span>
                          <span className="text-[10px] uppercase tracking-[0.3em] text-cyan-200">
                            {copiedId === project._id ? 'Copied' : 'Copy'}
                          </span>
                        </button>
                        <span className="pointer-events-none absolute -top-8 right-0 hidden rounded-full border border-cyan-200/20 bg-slate-900/90 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-cyan-100 group-hover/key:block">
                          Click to copy
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs text-slate-400">
                    <Link to={`/projects/${project._id}/insights`} className="text-amber-200 hover:text-amber-100">
                      View insights
                    </Link>
                  </div>
                </div>
              </article>
            )
            })}
          </div>
        )}
      </div>

      {isModalOpen ? (
        <div className="fixed inset-0 z-20 flex items-center justify-center px-6">
          <div
            className="absolute inset-0 bg-slate-950/70 backdrop-blur"
            role="button"
            tabIndex={0}
            onClick={handleCloseModal}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                handleCloseModal()
              }
            }}
          />
          <div className="relative z-10 w-full max-w-lg rounded-3xl border border-white/10 bg-slate-950/90 p-8 shadow-[0_30px_90px_-40px_rgba(15,23,42,1)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-amber-300/80">New Project</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-50">Name your project</h2>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-200 transition hover:border-white/20"
              >
                Close
              </button>
            </div>

            <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-200" htmlFor="project-name">
                  Project Name
                </label>
                <input
                  id="project-name"
                  type="text"
                  value={projectName}
                  onChange={(event) => setProjectName(event.target.value)}
                  placeholder="Test App 002"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-amber-300/60 focus:outline-none focus:ring-2 focus:ring-amber-300/30"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-2xl bg-amber-300 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-900 transition hover:bg-amber-200"
              >
                Create Project
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Projects
