'use client'

import { use } from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"

interface ProjectDetails {
  id: string
  ideaTitle: string
  dateCreated: string
  ideaDescription: string
}

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const [project, setProject] = useState<ProjectDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch('http://localhost:5000/getProjectDetails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: resolvedParams.id }),
        })
        const result = await response.json()
        if (result.success) {
          setProject(result.project)
        } else {
          setError(result.error || 'Failed to fetch project details')
          setTimeout(() => router.push('/dashboard'), 3000)
        }
      } catch (err) {
        setError('An error occurred while fetching project details')
        setTimeout(() => router.push('/dashboard'), 3000)
      } finally {
        setLoading(false)
      }
    }

    fetchProjectDetails()
  }, [resolvedParams.id, router])

  if (loading) {
    return <div className="min-h-screen w-full bg-gray-900 text-gray-100 p-8 flex justify-center items-center">Loading...</div>
  }

  if (error) {
    return (
      <div className="min-h-screen w-full bg-gray-900 text-gray-100 p-8 flex flex-col justify-center items-center">
        <div>Error: {error}</div>
        <div>Redirecting to dashboard...</div>
      </div>
    )
  }

  if (!project) {
    return null
  }

  return (
    <div className="min-h-screen w-full bg-gray-900 text-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{project.ideaTitle}</h1>
        <p className="text-gray-400 mb-2">Project ID: {project.id}</p>
        <p className="text-gray-400 mb-4">Created on: {project.dateCreated}</p>
        <h2 className="text-xl font-semibold mb-2">Description:</h2>
        <p className="text-gray-200 mb-6 whitespace-pre-wrap">{project.ideaDescription}</p>
        <Button onClick={() => router.push('/dashboard')} className="bg-blue-600 hover:bg-blue-700 text-white">
          Back to Dashboard
        </Button>
      </div>
    </div>
  )
}

