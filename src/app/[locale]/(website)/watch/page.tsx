'use client'

import { AppSpin } from '@/common/AppSpin'
import { VideoPlayer } from '@/components/VideoPlayer/VideoPlayer'
import { useEffect, useState } from 'react'

export default function WatchPage() {
  const [loading, setLoading] = useState(true)

  // Video
  const [videoState, setVideoState] = useState({
    playing: true,
    muted: false,
    volume: 0.5,
    played: 0,
    seeking: false,
    Buffer: true,
  })

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
