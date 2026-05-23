import { redirect } from 'next/navigation'

// Redirects / request to dashboard
function page() {
  return (
    redirect("/dashboard")
  )
}

export default page