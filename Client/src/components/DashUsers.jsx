import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { Modal, Table, Button } from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { FaCheck, FaTimes } from 'react-icons/fa';
export default function DashUsers() {
     const { currentUser } = useSelector(state => state.user)
     const [users, setUsers] = useState([])
     const [showMore, setShowMore] = useState(true)
     const [showModal, setShowModal] = useState(false)
     const [userIdToDelete, setUserIdToDelete] = useState('')
     useEffect(() => {
          const fetchUsers = async () => {
               try {
                    const res = await fetch(`/api/user/getusers`)
                    const data = await res.json()
                    if (res.ok) {
                         setUsers(data.users)
                         if (data.users.length < 9) {
                              setShowMore(false)
                         }
                    }
               } catch (error) {
                    console.log(error.message)
               }
          }
          if (currentUser.isAdmin) {
               fetchUsers()
          }
     }, [currentUser])
     const handleShowMore = async () => {
          const startIndex = users.length;
          try {
               const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
               const data = await res.json();
               if (res.ok) {
                    setUsers((prev) => [...prev, ...data.users]);
                    if (data.users.length < 9) {
                         setShowMore(false);
                    }
               }
          } catch (error) {
               console.log(error.message);
          }
     }

     const handleDeleteUser = async () => {
          try {
               const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
                    method: 'DELETE'
               })
               const data = await res.json()
               if (res.ok) {
                    setUsers((prev) => prev.filter(user => user._id !== userIdToDelete))
                    setShowModal(false)
               } else {
                    console.log(data.message)
               }
          } catch (error) {
               console.log(error.message);
          }
      }
     return (
          <div className='table-auto w-full overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
               {currentUser.isAdmin && users.length > 0 ? (
                    <>
                         <Table hoverable className="shadow-md">
                              <Table.Head>
                                   <Table.HeadCell>Date created</Table.HeadCell>
                                   <Table.HeadCell>User Image</Table.HeadCell>
                                   <Table.HeadCell>Username</Table.HeadCell>
                                   <Table.HeadCell>Email</Table.HeadCell>
                                   <Table.HeadCell>Admin</Table.HeadCell>
                                   <Table.HeadCell>Delete</Table.HeadCell>
                              </Table.Head>
                              {users.map((user) => (
                                   <Table.Body key={user._id} className="divide-y">
                                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                             <Table.Cell>
                                                  {new Date(user.createdAt).toDateString()}
                                             </Table.Cell>
                                             <Table.Cell>
                                                  <img src={user.profilePicture} alt={user.username} className="w-10 h-10 object-cover rounded-full" />
                                             </Table.Cell>
                                             <Table.Cell>
                                                  {user.username}
                                             </Table.Cell>
                                             <Table.Cell>
                                                  {user.email}
                                             </Table.Cell>
                                             <Table.Cell>
                                                  {user.isAdmin ? (<FaCheck  className='text-green-500'/>) : (<FaTimes className='text-red-500'/>)}
                                             </Table.Cell>
                                             <Table.Cell>
                                                  <span onClick={() => {
                                                       setShowModal(true)
                                                       setUserIdToDelete(user._id)
                                                  }}
                                                       className="text-red-500 font-medium cursor-pointer hover:underline">
                                                       Delete
                                                  </span>
                                             </Table.Cell>
                                        </Table.Row>
                                   </Table.Body>
                              ))}
                         </Table>
                         {
                              showMore &&
                              <button onClick={handleShowMore} className="w-full text-teal-500 self-center text-sm p-7">
                                   Show more
                              </button>
                         }
                    </>
               ) : (<p className="text-center">You have no users yet!</p>)
               }
               <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
                    <Modal.Header />
                    <Modal.Body>
                         <div className="text-center">
                              < HiOutlineExclamationCircle className="h-14 w-14 mx-auto mb-4 text-gray-400 dark:text-gray-200" />
                              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure to delete this user?.</h3>
                         </div>
                    </Modal.Body>
                    <div className="flex justify-center gap-4 m-3">
                         <Button color='failure' onClick={handleDeleteUser}>Yes, I&apos;m sure</Button>
                         <Button onClick={() => setShowModal(false)} color='gray'>No,censle</Button>
                    </div>
               </Modal>
          </div>
     )
}