
"use client"

import ModeToggle from "./toggleThemeButton"


const Navbar = () => {
  return (
    <nav className="border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div className="text-xl font-bold tracking-tight">
          Chat App
        </div>

        {/* Right side */}
        <ModeToggle />

      </div>
    </nav>
  )
}

export default Navbar
