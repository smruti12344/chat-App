import React from 'react'
import { Outlet } from 'react-router-dom'

export default function HomePage() {
  return (
    <div>
      home page
      <section>
      <Outlet/>
      </section>
    </div>
  )
}
