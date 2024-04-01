import { Sidebar } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { HiArrowCircleRight, HiUser } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'

export default function DashSidebar() {
     const location = useLocation()
     const [tab, setTab] = useState('')
     const [subTab, setSubTab] = useState('')
     useEffect(() => {
          const urlPrams = new URLSearchParams(location.search)
          const tabFromUrl = urlPrams.get('tab')
          if (tabFromUrl) {
               setTab(tabFromUrl)
          }

     }, [location.search])
     return (
          <Sidebar className='w-full md:56'>
               <Sidebar.Items>
                    <Sidebar.ItemGroup>
                         <Link to='/dashboard?tab=profile' as="a">
                              <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={"User"} labelColor="dark">
                                   Profile
                              </Sidebar.Item>
                         </Link>
                         <Sidebar.Item icon={HiArrowCircleRight} className='cursor-pointer'>
                              Sign out
                         </Sidebar.Item>
                    </Sidebar.ItemGroup>
               </Sidebar.Items>
          </Sidebar>
     )
}
