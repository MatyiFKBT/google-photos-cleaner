import { SiteHeader } from "@/components/site-header"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <SiteHeader />
      <main className="container grid items-center gap-6 pt-6 pb-8 md:py-10">{children}</main>
    </>
  )
}
