'use client'

import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function SelectSourcesPage() {
  const router = useRouter()
  const params = useParams()
  const projectId = params.projectId as string

  useEffect(() => {
    fetch(`http://localhost:5000/api/last-completed-stage/${projectId}`)
      .then(response => response.json())
      .then(data => {
        let lastCompletedStage = data.lastCompletedStage
        if (lastCompletedStage < 1) {
          router.push(`/project/selectQuestions/${projectId}`.replace('/undefined', ''))
        } else if (lastCompletedStage >= 2) {
          router.push(`/project/script/${projectId}`.replace('/undefined', ''))
        }
      })
      .catch(error => console.error('Error fetching last completed stage:', error))
  }, [projectId, router])

  return (
    <div>
      <h1>Select Sources</h1>
      {/* Add your form or content here */}
    </div>
  )
}

