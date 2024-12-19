'use client'

import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function SelectQuestionsPage() {
  const router = useRouter()
  const params = useParams()
  const projectId = params.projectId as string

  useEffect(() => {
    fetch(`http://localhost:5000/api/last-completed-stage/${projectId}`)
      .then(response => response.json())
      .then(data => {
        let lastCompletedStage = data.lastCompletedStage
        if (lastCompletedStage < 0) {
          router.push(`/project/videoTitle/${projectId}`.replace('/undefined', ''))
        } else if (lastCompletedStage >= 1)  {
          const nextStage = lastCompletedStage + 1
          const routes = ['/project/videoTitle', '/project/selectQuestions', '/project/selectSources', '/project/script', '/project/script']
          console.log(routes, nextStage, routes[nextStage])
          router.push(`${routes[nextStage]}/${projectId}`.replace('/undefined', ''))
        }
      })
      .catch(error => console.error('Error fetching last completed stage:', error))
  }, [projectId, router])

  return (
    <div>
      <h1>Select Questions</h1>
      {/* Add your form or content here */}
    </div>
  )
}

