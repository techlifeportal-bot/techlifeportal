'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AdminPage() {
  const [session, setSession] = useState<any>(null)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  async function sendMagicLink() {
    setLoading(true)
    setMessage(null)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/admin`,
      },
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Magic link sent. Check your email.')
    }

    setLoading(false)
  }

  async function signOut() {
    await supabase.auth.signOut()
    window.location.reload()
  }

  // -----------------------------
  // NOT LOGGED IN → LOGIN SCREEN
  // -----------------------------
  if (!session) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-6 rounded border w-full max-w-sm">
          <h1 className="text-xl font-semibold mb-4">
            Admin Login
          </h1>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-3 py-2 w-full mb-3"
          />

          <button
            onClick={sendMagicLink}
            disabled={loading || !email}
            className="bg-black text-white px-4 py-2 w-full"
          >
            {loading ? 'Sending…' : 'Send Magic Link'}
          </button>

          {message && (
            <p className="text-sm mt-3 text-gray-600">{message}</p>
          )}
        </div>
      </main>
    )
  }

  // -----------------------------
  // LOGGED IN → ADMIN PANEL
  // -----------------------------
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          Admin — AI Draft Approval
        </h1>

        <button
          onClick={signOut}
          className="text-sm text-red-600 underline"
        >
          Sign out
        </button>
      </div>

      <div className="bg-white p-4 rounded border">
        <p className="text-sm text-gray-600">
          You are authenticated. Admin tools will load here.
        </p>

        {/* Future admin UI goes here */}
      </div>
    </main>
  )
}
