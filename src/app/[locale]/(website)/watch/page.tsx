'use client'

import { AppSpin } from '@/common/AppSpin'
import { VideoPlayer } from '@/components/VideoPlayer/VideoPlayer'
import { useEffect, useState } from 'react'

export default function WatchPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) return <AppSpin />

  return (
    <div className="mt-20">
      <VideoPlayer />
    </div>
  )
}
