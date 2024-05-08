import { Sidebar } from 'flowbite-react'
import { useEffect, useState } from 'react'
import {
     HiAnnotation,
     HiArrowCircleRight,
     HiDocumentText,
     HiOutlineUserGroup,
     HiUser,
     HiChartPie
} from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'
import { signoutSuccess } from '../redux/User/userSlice'
import { useDispatch, useSelector } from 'react-redux'
export default function DashSidebar() {
     const location = useLocation()
     const [tab, setTab] = useState('')
     const [subTab, setSubTab] = useState('')
     const { currentUser } = useSelector(state => state.user)
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
                    <Sidebar.ItemGroup className='flex flex-col gap-1'>
                         <Link to='/dashboard?tab=profile' as="a">
                              <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin ? 'Admin' : 'User'} labelColor="dark" as="div">
                                   Profile
                              </Sidebar.Item>
                         </Link>
                         {currentUser.isAdmin &&
                              <>
                                   <Link to="/dashboard?tab=dash" as="a">
                                        <Sidebar.Item active={tab === 'dash' || !tab} icon={HiChartPie} as="div">
                                             Dashboard
                                        </Sidebar.Item>
                                   </Link>
                                   <Link to="/dashboard?tab=posts" as="a">
                                        <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText} as="div">
                                             Posts
                                        </Sidebar.Item>
                                   </Link>
                                   <Link to="/dashboard?tab=users" as="a">
                                        <Sidebar.Item active={tab === 'users'} icon={HiOutlineUserGroup} as="div">
                                             Users
                                        </Sidebar.Item>
                                   </Link>
                                   <Link to="/dashboard?tab=comments" as="a">
                                        <Sidebar.Item active={tab === 'comments'} icon={HiAnnotation} as="div">
                                             Comments
                                        </Sidebar.Item>
                                   </Link>
                              </>
                         }
                         <Sidebar.Item icon={HiArrowCircleRight} className='cursor-pointer' onClick={handleSignOut}>
                              Sign out
                         </Sidebar.Item>
                    </Sidebar.ItemGroup>
               </Sidebar.Items>
          </Sidebar>
     )
}
