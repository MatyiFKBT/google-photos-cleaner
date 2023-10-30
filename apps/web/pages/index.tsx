import Head from "next/head"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Layout } from "@/components/layout"
import { Button, buttonVariants } from "@/components/ui/button"
import { signIn, signOut, useSession } from "next-auth/react"
export default function IndexPage() {
  const { data: session } = useSession()
  return (
    <Layout>
      <Head>
        <title>Next.js</title>
        <meta
          name="description"
          content="Google Photos clean up tool built with Next.js and Tailwind CSS"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Clean-up your Google Photos library with this{" "}
            <br className="hidden sm:inline" />
            <span className="text-sky-600 dark:text-sky-500">
              Free and Open Source tool
            </span>
          </h1>
          <p className="max-w-[700px] text-lg text-slate-700 dark:text-slate-400 sm:text-xl">
            {siteConfig.description}
          </p>
        </div>
        {session ? (
          <div className="flex gap-4">
            <Link href="/dashboard" className={buttonVariants({ size: "lg" })}>
              Dashboard
            </Link>
            <Button
              variant={'outline'}
              size={'lg'}
              onClick={() => { signOut() }}
            >
              Logout
            </Button>
          </div>
        ) : (
          <>
            <div className="flex gap-4">
              <Button
                variant={'outline'}
                size={'lg'}
                onClick={() => {
                  signIn('google')
                }}
              >
                Login with Google
              </Button>
            </div>
          </>
        )}
    </Layout>
  )
}
