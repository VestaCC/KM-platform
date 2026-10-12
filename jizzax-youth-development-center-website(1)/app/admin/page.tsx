'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Newspaper, ImageIcon, CalendarDays } from 'lucide-react'
import { DashboardCardSkeleton } from '@/components/admin/skeletons'

interface DashboardData {
  newsCount: number
  galleryCount: number
  eventsCount: number
  recentNews: any[]
  recentEvents: any[]
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()

      const [newsRes, galleryRes, eventsRes, recentNewsRes, recentEventsRes] = await Promise.all([
        supabase.from('news').select('id', { count: 'exact', head: true }),
        supabase.from('gallery').select('id', { count: 'exact', head: true }),
        supabase.from('events').select('id', { count: 'exact', head: true }),
        supabase.from('news').select('*').order('created_at', { ascending: false }).limit(3),
        supabase.from('events').select('*').order('event_date', { ascending: true }).limit(3),
      ])

      setData({
        newsCount: newsRes.count || 0,
        galleryCount: galleryRes.count || 0,
        eventsCount: eventsRes.count || 0,
        recentNews: recentNewsRes.data || [],
        recentEvents: recentEventsRes.data || [],
      })
      setLoading(false)
    }

    fetchData()
  }, [])

  const statCards = data
    ? [
        { label: 'News Articles', count: data.newsCount, icon: Newspaper, color: '#3b82f6' },
        { label: 'Gallery Images', count: data.galleryCount, icon: ImageIcon, color: '#10b981' },
        { label: 'Events', count: data.eventsCount, icon: CalendarDays, color: '#f59e0b' },
      ]
    : []

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Overview of your website content</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <DashboardCardSkeleton key={i} />)
          : statCards.map((card) => {
              const Icon = card.icon
              return (
                <div
                  key={card.label}
                  className="bg-white rounded-xl border border-gray-200 p-6 flex items-center gap-4"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${card.color}15` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: card.color }} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{card.count}</p>
                    <p className="text-sm text-gray-500">{card.label}</p>
                  </div>
                </div>
              )
            })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent News */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent News</h2>
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : data?.recentNews.length === 0 ? (
            <p className="text-sm text-gray-400 py-4 text-center">No news articles yet</p>
          ) : (
            <div className="space-y-3">
              {data?.recentNews.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Newspaper className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.title?.UZ || item.title?.EN || 'Untitled'}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h2>
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : data?.recentEvents.length === 0 ? (
            <p className="text-sm text-gray-400 py-4 text-center">No upcoming events</p>
          ) : (
            <div className="space-y-3">
              {data?.recentEvents.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <CalendarDays className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.title?.UZ || item.title?.EN || 'Untitled'}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(item.event_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
