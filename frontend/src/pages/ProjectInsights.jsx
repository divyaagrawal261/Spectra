import { useEffect, useMemo, useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Link, useParams } from 'react-router-dom'
import apiClient from '../api/client.js'

const TABS = [
  { id: 'timeline', label: 'Timeline' },
  { id: 'pages', label: 'Pages' },
]

function ProjectInsights() {
  const { projectId } = useParams()
  const [topEvents, setTopEvents] = useState([])
  const [activeEvent, setActiveEvent] = useState('')
  const [activeTab, setActiveTab] = useState(TABS[0].id)
  const [timelineData, setTimelineData] = useState([])
  const [pagesData, setPagesData] = useState([])
  const [isLoadingTop, setIsLoadingTop] = useState(true)
  const [isLoadingEvent, setIsLoadingEvent] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isActive = true

    const loadTopEvents = async () => {
      setIsLoadingTop(true)
      setErrorMessage('')

      try {
        const response = await apiClient.get(`/insights/${projectId}/top-events`)
        const events = Array.isArray(response.data) ? response.data : []
        if (!isActive) {
          return
        }
        setTopEvents(events)
        setActiveEvent(events[0]?._id || '')
      } catch (error) {
        if (!isActive) {
          return
        }
        const message = error?.response?.data?.message || 'Unable to load top events.'
        setErrorMessage(message)
        setTopEvents([])
        setActiveEvent('')
      } finally {
        if (isActive) {
          setIsLoadingTop(false)
        }
      }
    }

    if (projectId) {
      loadTopEvents()
    }

    return () => {
      isActive = false
    }
  }, [projectId])

  useEffect(() => {
    let isActive = true

    const loadEventData = async () => {
      if (!projectId || !activeEvent) {
        setTimelineData([])
        setPagesData([])
        return
      }

      setIsLoadingEvent(true)
      setErrorMessage('')

      try {
        const [timelineResponse, pagesResponse] = await Promise.all([
          apiClient.get(`/insights/${projectId}/event/${activeEvent}/timeline`),
          apiClient.get(`/insights/${projectId}/event/${activeEvent}/pages`),
        ])

        if (!isActive) {
          return
        }

        setTimelineData(Array.isArray(timelineResponse.data) ? timelineResponse.data : [])
        setPagesData(Array.isArray(pagesResponse.data) ? pagesResponse.data : [])
      } catch (error) {
        if (!isActive) {
          return
        }
        const message = error?.response?.data?.message || 'Unable to load event details.'
        setErrorMessage(message)
        setTimelineData([])
        setPagesData([])
      } finally {
        if (isActive) {
          setIsLoadingEvent(false)
        }
      }
    }

    loadEventData()

    return () => {
      isActive = false
    }
  }, [projectId, activeEvent])

  const selectedEvent = useMemo(
    () => topEvents.find((event) => event._id === activeEvent) ?? topEvents[0],
    [activeEvent, topEvents]
  )
  const chartData = activeTab === 'timeline' ? timelineData : pagesData

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-16 h-72 w-72 rounded-full bg-amber-400/20 blur-[80px]" />
        <div className="absolute right-10 top-24 h-64 w-64 rounded-full bg-cyan-400/20 blur-[90px]" />
        <div className="absolute bottom-10 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-lime-400/15 blur-[110px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-14">
        <header className="mb-10">
          <p className="text-sm uppercase tracking-[0.4em] text-amber-300/80">Spectra</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-50 md:text-5xl">Project Insights</h1>
          <p className="mt-3 max-w-2xl text-base text-slate-300 md:text-lg">
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="h-fit rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.9)] backdrop-blur">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Top Events</p>
            <div className="mt-4 flex flex-col gap-3">
              {isLoadingTop ? (
                <p className="text-sm text-slate-300">Loading events...</p>
              ) : null}
              {!isLoadingTop && topEvents.length === 0 ? (
                <p className="text-sm text-slate-300">No events yet.</p>
              ) : null}
              {topEvents.map((event) => {
                const isActive = event._id === activeEvent

                return (
                  <button
                    key={event._id}
                    type="button"
                    onClick={() => setActiveEvent(event._id)}
                    className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition ${
                      isActive
                        ? 'border-amber-300/50 bg-amber-300/10 text-amber-100'
                        : 'border-white/10 bg-slate-950/40 text-slate-200 hover:border-white/20'
                    }`}
                  >
                    <span className="font-semibold">{event._id}</span>
                    <span className="rounded-full border border-white/10 px-2 py-1 text-xs text-slate-300">
                      {event.count}
                    </span>
                  </button>
                )
              })}
            </div>
            {/* <div className="mt-6 border-t border-white/10 pt-4 text-xs text-slate-400">
              Source: /:projectId/top-events
            </div> */}
          </aside>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.9)] backdrop-blur">
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Selected Event</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-50">
                    {selectedEvent?._id || 'Select an event'}
                  </h2>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/40 p-1">
                  {TABS.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.3em] transition ${
                        activeTab === tab.id
                          ? 'bg-amber-300 text-slate-900'
                          : 'text-slate-300 hover:text-slate-100'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {errorMessage ? <p className="text-sm text-rose-200">{errorMessage}</p> : null}

              <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    {activeTab === 'timeline' ? 'Event Timeline' : 'Pages with Event'}
                  </p>
                  <div className="mt-4 h-44 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    {isLoadingEvent ? (
                      <p className="text-sm text-slate-300">Loading chart...</p>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
                          <CartesianGrid stroke="rgba(255,255,255,0.06)" strokeDasharray="4 6" />
                          <XAxis
                            dataKey="_id"
                            tick={{ fill: '#94a3b8', fontSize: 10 }}
                            axisLine={false}
                            tickLine={false}
                          />
                          <YAxis
                            tick={{ fill: '#94a3b8', fontSize: 10 }}
                            axisLine={false}
                            tickLine={false}
                            width={28}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'rgba(2,6,23,0.9)',
                              border: '1px solid rgba(148,163,184,0.25)',
                              borderRadius: '12px',
                              fontSize: '12px',
                              color: '#e2e8f0',
                            }}
                            labelStyle={{ color: '#fcd34d', fontWeight: 600 }}
                            cursor={{ stroke: '#fcd34d', strokeDasharray: '4 6', strokeOpacity: 0.5 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="count"
                            stroke="#fcd34d"
                            strokeWidth={3}
                            dot={{ r: 4, fill: '#fcd34d' }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-400">
                    {chartData.map((item) => (
                      <span key={item._id} className="rounded-full border border-white/10 px-3 py-1">
                        {item._id} · {item.count}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Summary</p>
                  <div className="mt-4 flex flex-col gap-4">
                    {(activeTab === 'timeline' ? timelineData : pagesData).map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3"
                      >
                        <span className="text-sm text-slate-200">{item._id}</span>
                        <span className="text-lg font-semibold text-amber-200">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs text-slate-400">
                {/* <span>
                  Source: /:projectId/event/:eventName{activeTab === 'timeline' ? '/timeline' : '/pages'}
                </span> */}
                <Link to="/projects" className="text-amber-200 hover:text-amber-100">
                  Back to projects
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ProjectInsights
