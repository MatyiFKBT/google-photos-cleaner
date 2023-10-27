import type { AppProps } from "next/app"
import { Inter as FontSans } from "next/font/google"
import { ThemeProvider } from "next-themes"
import { SessionProvider } from "next-auth/react"

import "@/styles/globals.css"
import { trpc } from "@/utils/trpc"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
				:root {
					--font-sans: ${fontSans.style.fontFamily};
				}
			}`}</style>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ThemeProvider>
    </>
  )
}

export default trpc.withTRPC(App)