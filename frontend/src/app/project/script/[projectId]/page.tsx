'use client'

import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function ScriptPage() {
  const router = useRouter()
  const params = useParams()
  const projectId = params.projectId as string

  useEffect(() => {
    fetch(`http://localhost:5000/api/last-completed-stage/${projectId}`)
      .then(response => response.json())
      .then(data => {
        const lastCompletedStage = data.lastCompletedStage
        if ( lastCompletedStage < 2) {
          const routes = ['/project/videoTitle', '/project/selectQuestions', '/project/selectSources', '/project/script', '/project/script']
          router.push(`${routes[lastCompletedStage + 1]}/${projectId}`.replace('/undefined', ''))
        }
      })
      .catch(error => console.error('Error fetching last completed stage:', error))
  }, [projectId, router])

  return (
    <div>
      <h1>Script</h1>
      {/* Add your form or content here */}
    </div>
  )
}

