import { SidebarNav } from '@/components/sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'

export default function ProjectLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <div className="flex h-screen">
                <SidebarNav />
                <main className="flex-1 p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </SidebarProvider>
    )
}

