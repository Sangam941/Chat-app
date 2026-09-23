import React from 'react'
import Search from './Search'
import Profile from './profile'

const SideBar = () => {
  return (
    <aside>
      <Search/>
      <div className="flex cursor-pointer items-center gap-3 rounded-lg p-3 hover:bg-muted">
        <Profile/>
        {/* Name + last message */} 
        <div className="flex flex-col"> <span className="text-sm font-medium"> Sangam Dhami </span> <span className="text-sm text-muted-foreground"> oai k xaa </span> </div>

        </div>
    </aside>
  )
}

export default SideBar
