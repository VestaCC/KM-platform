'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Pencil, Trash2, Loader2, X } from 'lucide-react'
import ImageUpload from '@/components/admin/image-upload'
import ConfirmDialog from '@/components/admin/confirm-dialog'
import EmptyState from '@/components/admin/empty-state'
import FormField, { TextInput, TextArea, SelectInput } from '@/components/admin/form-field'
import { TableSkeleton } from '@/components/admin/skeletons'
import Image from 'next/image'

interface NewsItem {
  id: string
  title: { UZ: string; RU: string; EN: string }
  category: string
  description: { UZ: string; RU: string; EN: string }
  image_url: string
  published_at: string
  created_at: string
}

const CATEGORIES = [
  { value: 'competition', label: 'Competition' },
  { value: 'program', label: 'Program' },
  { value: 'forum', label: 'Forum' },
  { value: 'announcement', label: 'Announcement' },
  { value: 'other', label: 'Other' },
]

const emptyForm = {
  title: { UZ: '', RU: '', EN: '' },
  category: 'announcement',
  description: { UZ: '', RU: '', EN: '' },
  image_url: '',
  published_at: new Date().toISOString().split('T')[0],
}

export default function AdminNewsPage() {
  const [items, setItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchItems = async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('published_at', { ascending: false })

    if (error) {
      setError('Failed to load news.')
    } else {
      setItems(data || [])
    }
    setLoading(false)
  }

  useEffect(() => { fetchItems() }, [])

  const openCreate = () => {
    setEditingId(null)
    setForm(emptyForm)
    setShowForm(true)
    setError(null)
  }

  const openEdit = (item: NewsItem) => {
    setEditingId(item.id)
    setForm({
      title: item.title || { UZ: '', RU: '', EN: '' },
      category: item.category,
      description: item.description || { UZ: '', RU: '', EN: '' },
      image_url: item.image_url || '',
      published_at: item.published_at?.split('T')[0] || new Date().toISOString().split('T')[0],
    })
    setShowForm(true)
    setError(null)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.UZ.trim()) {
      setError('Title (UZ) is required.')
      return
    }

    setSaving(true)
    setError(null)

    const supabase = createClient()
    const payload = {
      title: form.title,
      category: form.category,
      description: form.description,
      image_url: form.image_url,
      published_at: new Date(form.published_at).toISOString(),
    }

    if (editingId) {
      const { error } = await supabase.from('news').update(payload).eq('id', editingId)
      if (error) setError('Failed to update.')
    } else {
      const { error } = await supabase.from('news').insert(payload)
      if (error) setError('Failed to create.')
    }

    setSaving(false)
    if (!error) {
      setShowForm(false)
      fetchItems()
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    const supabase = createClient()
    await supabase.from('news').delete().eq('id', deleteId)
    setDeleteId(null)
    fetchItems()
  }

  const updateTitle = (lang: string, val: string) =>
    setForm((f) => ({ ...f, title: { ...f.title, [lang]: val } }))
  const updateDesc = (lang: string, val: string) =>
    setForm((f) => ({ ...f, description: { ...f.description, [lang]: val } }))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">News</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage news articles</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#1a3a6b] hover:bg-[#112a52] rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" /> Add News
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingId ? 'Edit News' : 'Add News'}
              </h2>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-5">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField label="Title (UZ)" required>
                  <TextInput value={form.title.UZ} onChange={(e) => updateTitle('UZ', e.target.value)} placeholder="Sarlavha" />
                </FormField>
                <FormField label="Title (RU)">
                  <TextInput value={form.title.RU} onChange={(e) => updateTitle('RU', e.target.value)} placeholder="Заголовок" />
                </FormField>
                <FormField label="Title (EN)">
                  <TextInput value={form.title.EN} onChange={(e) => updateTitle('EN', e.target.value)} placeholder="Title" />
                </FormField>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Category" required>
                  <SelectInput
                    options={CATEGORIES}
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  />
                </FormField>
                <FormField label="Publish Date">
                  <TextInput
                    type="date"
                    value={form.published_at}
                    onChange={(e) => setForm((f) => ({ ...f, published_at: e.target.value }))}
                  />
                </FormField>
              </div>

              <div className="space-y-4">
                <FormField label="Description (UZ)">
                  <TextArea rows={3} value={form.description.UZ} onChange={(e) => updateDesc('UZ', e.target.value)} placeholder="Tavsif..." />
                </FormField>
                <FormField label="Description (RU)">
                  <TextArea rows={3} value={form.description.RU} onChange={(e) => updateDesc('RU', e.target.value)} placeholder="Описание..." />
                </FormField>
                <FormField label="Description (EN)">
                  <TextArea rows={3} value={form.description.EN} onChange={(e) => updateDesc('EN', e.target.value)} placeholder="Description..." />
                </FormField>
              </div>

              <ImageUpload
                label="Cover Image"
                value={form.image_url}
                onChange={(url) => setForm((f) => ({ ...f, image_url: url }))}
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 text-sm font-semibold text-white bg-[#1a3a6b] hover:bg-[#112a52] rounded-lg disabled:opacity-50 inline-flex items-center gap-2"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingId ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <TableSkeleton rows={5} cols={5} />
      ) : items.length === 0 ? (
        <EmptyState
          title="No News Yet"
          description="Create your first news article to get started."
          action={
            <button onClick={openCreate} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#1a3a6b] rounded-lg hover:bg-[#112a52]">
              <Plus className="w-4 h-4" /> Add News
            </button>
          }
        />
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Image</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Title</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Category</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Date</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-4 py-3">
                      {item.image_url ? (
                        <div className="w-16 h-10 relative rounded-md overflow-hidden bg-gray-100">
                          <Image src={item.image_url} alt="" fill className="object-cover" sizes="64px" />
                        </div>
                      ) : (
                        <div className="w-16 h-10 rounded-md bg-gray-100" />
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 max-w-[200px] truncate">
                      {item.title?.UZ || item.title?.EN || '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-500 capitalize">{item.category}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(item.published_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button onClick={() => openEdit(item)} className="p-2 hover:bg-blue-50 rounded-lg text-gray-400 hover:text-blue-600 transition-colors">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDeleteId(item.id)} className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
