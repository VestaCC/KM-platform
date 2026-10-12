'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Save, CheckCircle } from 'lucide-react'
import ImageUpload from '@/components/admin/image-upload'
import FormField, { TextInput, TextArea } from '@/components/admin/form-field'
import { TableSkeleton } from '@/components/admin/skeletons'

interface SiteSettings {
  id: string
  organization_name: { UZ: string; RU: string; EN: string }
  logo_url: string
  hero_title: { UZ: string; RU: string; EN: string }
  hero_subtitle: { UZ: string; RU: string; EN: string }
  contact_phone: string
  contact_email: string
  address: { UZ: string; RU: string; EN: string }
  google_maps_url: string
  facebook: string
  instagram: string
  telegram: string
  youtube: string
  footer_text: { UZ: string; RU: string; EN: string }
  primary_color: string
  secondary_color: string
}

const defaultSettings: Omit<SiteSettings, 'id'> = {
  organization_name: { UZ: '', RU: '', EN: '' },
  logo_url: '',
  hero_title: { UZ: '', RU: '', EN: '' },
  hero_subtitle: { UZ: '', RU: '', EN: '' },
  contact_phone: '',
  contact_email: '',
  address: { UZ: '', RU: '', EN: '' },
  google_maps_url: '',
  facebook: '',
  instagram: '',
  telegram: '',
  youtube: '',
  footer_text: { UZ: '', RU: '', EN: '' },
  primary_color: '#1a3a6b',
  secondary_color: '#3b82f6',
}

export default function AdminSettingsPage() {
  const [form, setForm] = useState<Omit<SiteSettings, 'id'>>(defaultSettings)
  const [settingsId, setSettingsId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetch = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from('site_settings').select('*').limit(1).single()
      if (data) {
        setSettingsId(data.id)
        setForm({
          organization_name: data.organization_name || defaultSettings.organization_name,
          logo_url: data.logo_url || '',
          hero_title: data.hero_title || defaultSettings.hero_title,
          hero_subtitle: data.hero_subtitle || defaultSettings.hero_subtitle,
          contact_phone: data.contact_phone || '',
          contact_email: data.contact_email || '',
          address: data.address || defaultSettings.address,
          google_maps_url: data.google_maps_url || '',
          facebook: data.facebook || '',
          instagram: data.instagram || '',
          telegram: data.telegram || '',
          youtube: data.youtube || '',
          footer_text: data.footer_text || defaultSettings.footer_text,
          primary_color: data.primary_color || '#1a3a6b',
          secondary_color: data.secondary_color || '#3b82f6',
        })
      }
      setLoading(false)
    }
    fetch()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSaved(false)

    const supabase = createClient()

    if (settingsId) {
      const { error } = await supabase.from('site_settings').update(form).eq('id', settingsId)
      if (error) setError('Failed to save settings.')
      else setSaved(true)
    } else {
      const { data, error } = await supabase.from('site_settings').insert(form).select().single()
      if (error) setError('Failed to save settings.')
      else {
        setSettingsId(data.id)
        setSaved(true)
      }
    }

    setSaving(false)
    if (!error) {
      setTimeout(() => setSaved(false), 3000)
    }
  }

  const updateJsonField = (field: string, lang: string, val: string) =>
    setForm((f: any) => ({ ...f, [field]: { ...f[field], [lang]: val } }))

  if (loading) return <TableSkeleton rows={6} cols={3} />

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
          <p className="text-sm text-gray-500 mt-0.5">Configure your website</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>
        )}
        {saved && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700 inline-flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> Settings saved successfully!
          </div>
        )}

        {/* Organization */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Organization</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <FormField label="Name (UZ)">
              <TextInput value={form.organization_name.UZ} onChange={(e) => updateJsonField('organization_name', 'UZ', e.target.value)} />
            </FormField>
            <FormField label="Name (RU)">
              <TextInput value={form.organization_name.RU} onChange={(e) => updateJsonField('organization_name', 'RU', e.target.value)} />
            </FormField>
            <FormField label="Name (EN)">
              <TextInput value={form.organization_name.EN} onChange={(e) => updateJsonField('organization_name', 'EN', e.target.value)} />
            </FormField>
          </div>
          <ImageUpload
            label="Logo"
            value={form.logo_url}
            onChange={(url) => setForm((f) => ({ ...f, logo_url: url }))}
          />
        </section>

        {/* Contact */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FormField label="Phone">
              <TextInput value={form.contact_phone} onChange={(e) => setForm((f) => ({ ...f, contact_phone: e.target.value }))} placeholder="+998 73 000 00 00" />
            </FormField>
            <FormField label="Email">
              <TextInput type="email" value={form.contact_email} onChange={(e) => setForm((f) => ({ ...f, contact_email: e.target.value }))} placeholder="info@example.com" />
            </FormField>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <FormField label="Address (UZ)">
              <TextArea rows={3} value={form.address.UZ} onChange={(e) => updateJsonField('address', 'UZ', e.target.value)} />
            </FormField>
            <FormField label="Address (RU)">
              <TextArea rows={3} value={form.address.RU} onChange={(e) => updateJsonField('address', 'RU', e.target.value)} />
            </FormField>
            <FormField label="Address (EN)">
              <TextArea rows={3} value={form.address.EN} onChange={(e) => updateJsonField('address', 'EN', e.target.value)} />
            </FormField>
          </div>
          <FormField label="Google Maps URL">
            <TextInput value={form.google_maps_url} onChange={(e) => setForm((f) => ({ ...f, google_maps_url: e.target.value }))} placeholder="https://maps.google.com/..." />
          </FormField>
        </section>

        {/* Social Links */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Social Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Telegram">
              <TextInput value={form.telegram} onChange={(e) => setForm((f) => ({ ...f, telegram: e.target.value }))} placeholder="https://t.me/..." />
            </FormField>
            <FormField label="Instagram">
              <TextInput value={form.instagram} onChange={(e) => setForm((f) => ({ ...f, instagram: e.target.value }))} placeholder="https://instagram.com/..." />
            </FormField>
            <FormField label="Facebook">
              <TextInput value={form.facebook} onChange={(e) => setForm((f) => ({ ...f, facebook: e.target.value }))} placeholder="https://facebook.com/..." />
            </FormField>
            <FormField label="YouTube">
              <TextInput value={form.youtube} onChange={(e) => setForm((f) => ({ ...f, youtube: e.target.value }))} placeholder="https://youtube.com/..." />
            </FormField>
          </div>
        </section>

        {/* Footer */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Footer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Footer Text (UZ)">
              <TextInput value={form.footer_text.UZ} onChange={(e) => updateJsonField('footer_text', 'UZ', e.target.value)} />
            </FormField>
            <FormField label="Footer Text (RU)">
              <TextInput value={form.footer_text.RU} onChange={(e) => updateJsonField('footer_text', 'RU', e.target.value)} />
            </FormField>
            <FormField label="Footer Text (EN)">
              <TextInput value={form.footer_text.EN} onChange={(e) => updateJsonField('footer_text', 'EN', e.target.value)} />
            </FormField>
          </div>
        </section>

        {/* Colors */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Brand Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Primary Color" hint="Used for headers, buttons, and accents">
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={form.primary_color}
                  onChange={(e) => setForm((f) => ({ ...f, primary_color: e.target.value }))}
                  className="w-10 h-10 rounded-lg border border-gray-300 cursor-pointer"
                />
                <TextInput value={form.primary_color} onChange={(e) => setForm((f) => ({ ...f, primary_color: e.target.value }))} className="flex-1" />
              </div>
            </FormField>
            <FormField label="Secondary Color" hint="Used for badges and highlights">
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={form.secondary_color}
                  onChange={(e) => setForm((f) => ({ ...f, secondary_color: e.target.value }))}
                  className="w-10 h-10 rounded-lg border border-gray-300 cursor-pointer"
                />
                <TextInput value={form.secondary_color} onChange={(e) => setForm((f) => ({ ...f, secondary_color: e.target.value }))} className="flex-1" />
              </div>
            </FormField>
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-[#1a3a6b] hover:bg-[#112a52] rounded-lg disabled:opacity-50 transition-colors"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Settings
          </button>
        </div>
      </form>
    </div>
  )
}
