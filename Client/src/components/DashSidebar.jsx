import { Sidebar } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { HiArrowCircleRight, HiUser } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'
import { signoutSuccess } from '../redux/User/userSlice'
import { useDispatch } from 'react-redux'
export default function DashSidebar() {
     const location = useLocation()
     const [tab, setTab] = useState('')
     const [subTab, setSubTab] = useState('')
     const dispatch = useDispatch()
     useEffect(() => {
          const urlPrams = new URLSearchParams(location.search)
          const tabFromUrl = urlPrams.get('tab')
          if (tabFromUrl) {
               setTab(tabFromUrl)
          }
     }, [location.search])

     const handleSignOut = async () => {
          try {
               const res = await fetch('/api/auth/signout', {
                    method: 'POST',
               })
               const data = await res.json()
               if (!res.ok) {
                    console.log(data.message)
               } else {
                    dispatch(signoutSuccess(data))
               }
          } catch (error) {
               console.log(error.message)
          }
     }

     return (
          <Sidebar className='w-full md:56'>
               <Sidebar.Items>
                    <Sidebar.ItemGroup>
                         <Link to='/dashboard?tab=profile' as="a">
                              <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={"User"} labelColor="dark" as="div">
                                   Profile
                              </Sidebar.Item>
                         </Link>
                         <Sidebar.Item icon={HiArrowCircleRight} className='cursor-pointer' onClick={handleSignOut}>
                              Sign out
                         </Sidebar.Item>
                    </Sidebar.ItemGroup>
               </Sidebar.Items>
          </Sidebar>
     )
}
