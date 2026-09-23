
import Navbar from "@/components/Navbar"
import Login from "./signup/page"
import SideBar from "@/components/SideBar"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <SideBar/>
      </main>
    </div>
  )
}