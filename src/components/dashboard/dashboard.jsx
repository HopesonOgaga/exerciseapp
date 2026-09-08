import React from 'react'
import { DashboardNav } from './dashboardnav'
import { UserNavProfile } from './usernavprofile'
import Footer from '../../constant/footer'
import { Search } from './search'

export const  Dashboard = () => {
  return (
    <section>
      <DashboardNav></DashboardNav>
      <UserNavProfile></UserNavProfile>
      <Search></Search>
      {/* <Footer></Footer> */}
    </section>
  )
}
