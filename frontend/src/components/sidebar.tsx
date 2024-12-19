'use client'

import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Home, Video, HelpCircle, Book, FileText } from 'lucide-react'
import { cn } from "@/lib/utils"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    useSidebar
} from '@/components/ui/sidebar'

const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Select Video Title', href: '/project/videoTitle', icon: Video },
    { name: 'Select Questions', href: '/project/selectQuestions', icon: HelpCircle },
    { name: 'Select Sources', href: '/project/selectSources', icon: Book },
    { name: 'Script', href: '/project/script', icon: FileText },
]

export function SidebarNav() {
    const pathname = usePathname()
    const params = useParams()
    const [lastCompletedStage, setLastCompletedStage] = useState(-1)
    const { state } = useSidebar()
    const projectId = params.projectId as string | undefined

    useEffect(() => {
        if (projectId) {
            fetch(`http://localhost:5000/api/last-completed-stage/${projectId}`)
                .then(response => response.json())
                .then(data => setLastCompletedStage(data.lastCompletedStage))
                .catch(error => console.error('Error fetching last completed stage:', error))
        }
    }, [projectId])

    const currentStage = menuItems.findIndex(item => pathname.startsWith(item.href)) - 1

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item, index) => {
                                const isActive = pathname.startsWith(item.href)
                                const isDisabled = index > 0 && index - 1 > lastCompletedStage

                                return (
                                    <SidebarMenuItem key={item.href}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                            disabled={isDisabled}
                                            className={cn(
                                                isActive && "bg-accent text-accent-foreground",
                                                isDisabled && "opacity-50 cursor-not-allowed"
                                            )}
                                        >
                                            <Link href={projectId && index > 0 ? `${item.href}/${projectId}` : item.href}>
                                                <item.icon className="mr-2 h-4 w-4" />
                                                {item.name}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

