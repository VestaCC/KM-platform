'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Trash2, Pencil, Loader2, X } from 'lucide-react'
import ImageUpload from '@/components/admin/image-upload'
import ConfirmDialog from '@/components/admin/confirm-dialog'
import EmptyState from '@/components/admin/empty-state'
import FormField, { TextInput, SelectInput } from '@/components/admin/form-field'
import { TableSkeleton } from '@/components/admin/skeletons'
import Image from 'next/image'

interface GalleryItem {
  id: string
  image_url: string
  category: string
  caption: { UZ: string; RU: string; EN: string }
  created_at: string
}

const CATEGORIES = [
  { value: 'Programming', label: 'Programming' },
  { value: 'Arts', label: 'Arts' },
  { value: 'STEM', label: 'STEM' },
  { value: 'Leadership', label: 'Leadership' },
  { value: 'Languages', label: 'Languages' },
  { value: 'Events', label: 'Events' },
  { value: 'Other', label: 'Other' },
]

const emptyForm = {
  image_url: '',
  category: 'Events',
  caption: { UZ: '', RU: '', EN: '' },
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
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
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setError('Failed to load gallery.')
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

  const openEdit = (item: GalleryItem) => {
    setEditingId(item.id)
    setForm({
      image_url: item.image_url || '',
      category: item.category,
      caption: item.caption || { UZ: '', RU: '', EN: '' },
    })
    setShowForm(true)
    setError(null)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.image_url) {
      setError('An image is required.')
      return
    }

    setSaving(true)
    setError(null)

    const supabase = createClient()
    const payload = {
      image_url: form.image_url,
      category: form.category,
      caption: form.caption,
    }

    if (editingId) {
      const { error } = await supabase.from('gallery').update(payload).eq('id', editingId)
      if (error) setError('Failed to update.')
    } else {
      const { error } = await supabase.from('gallery').insert(payload)
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
    await supabase.from('gallery').delete().eq('id', deleteId)
    setDeleteId(null)
    fetchItems()
  }

  const updateCaption = (lang: string, val: string) =>
    setForm((f) => ({ ...f, caption: { ...f.caption, [lang]: val } }))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gallery</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage gallery images</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#1a3a6b] hover:bg-[#112a52] rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Image
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingId ? 'Edit Image' : 'Add Image'}
              </h2>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-5">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>
              )}

              <ImageUpload
                label="Photo"
                value={form.image_url}
                onChange={(url) => setForm((f) => ({ ...f, image_url: url }))}
              />

              <FormField label="Category" required>
                <SelectInput
                  options={CATEGORIES}
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                />
              </FormField>

              <div className="space-y-3">
                <FormField label="Caption (UZ)">
                  <TextInput value={form.caption.UZ} onChange={(e) => updateCaption('UZ', e.target.value)} placeholder="Izoh" />
                </FormField>
                <FormField label="Caption (RU)">
                  <TextInput value={form.caption.RU} onChange={(e) => updateCaption('RU', e.target.value)} placeholder="Подпись" />
                </FormField>
                <FormField label="Caption (EN)">
                  <TextInput value={form.caption.EN} onChange={(e) => updateCaption('EN', e.target.value)} placeholder="Caption" />
                </FormField>
              </div>

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

      {/* Grid */}
      {loading ? (
        <TableSkeleton rows={4} cols={4} />
      ) : items.length === 0 ? (
        <EmptyState
          title="No Gallery Images"
          description="Upload your first image to get started."
          action={
            <button onClick={openCreate} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#1a3a6b] rounded-lg hover:bg-[#112a52]">
              <Plus className="w-4 h-4" /> Add Image
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden group">
              <div className="relative aspect-[4/3]">
                <Image src={item.image_url} alt={item.caption?.UZ || ''} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(item)} className="p-1.5 bg-white/90 hover:bg-white rounded-lg shadow-sm">
                    <Pencil className="w-3.5 h-3.5 text-gray-600" />
                  </button>
                  <button onClick={() => setDeleteId(item.id)} className="p-1.5 bg-white/90 hover:bg-white rounded-lg shadow-sm">
                    <Trash2 className="w-3.5 h-3.5 text-red-500" />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{item.category}</span>
                {item.caption?.UZ && (
                  <p className="text-sm text-gray-600 mt-1.5 truncate">{item.caption.UZ}</p>
                )}
              </div>
            </div>
          ))}
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
