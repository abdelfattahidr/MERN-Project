import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import { HiInformationCircle, HiOutlineExclamationCircle } from "react-icons/hi";
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux'
import { app } from '../firebase'
import {
     getDownloadURL,
     getStorage,
     ref,
     uploadBytesResumable,
} from 'firebase/storage';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
     updateState,
     updateSuccess,
     updateFailure,
     deleteUserStart,
     deleteUserSuccess,
     deleteUserFailure,
     signoutSuccess
} from '../redux/User/userSlice'
import { useDispatch } from 'react-redux'
export default function DashProfile() {
     const { currentUser, error } = useSelector((state) => state.user)
     const [imageFaile, setImageFaile] = useState(null)
     const [imageFaileUrl, setImageFaileUrl] = useState(null)
     const filePickerRef = useRef()
     const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null)
     const [imageFileUploadError, setImageFileUploadError] = useState(null);
     const [imageFileUploading, setImageFileUploading] = useState(false);
     const [updateUserSuccess, setUpdateUserSuccess] = useState(null)
     const [updateUserError, setUpdateUserError] = useState(null)
     const [formData, setFormData] = useState({})
     const [showModal, setShowModal] = useState(false)
     const dispatch = useDispatch()
     const handleImageChange = (e) => {
          const file = e.target.files[0]
          if (file) {
               setImageFaile(file)
               setImageFaileUrl(URL.createObjectURL(file))
          }
     }
     useEffect(() => {
          if (imageFaile) {
               upLoadImageFile()
          }
     }, [imageFaile])
     const upLoadImageFile = async () => {
          // service firebase.storage {
          //      match /b/{bucket}/o {
          //        match /{allPaths=**} {
          //          allow read;
          //          allow write: if
          //          request.resource.size <2* 1024 * 1024 &&
          //          request.resource.contentType.matches('image/.*')
          //        }
          //      }
          //    }
          setImageFileUploading(true);
          setImageFileUploadError(null);
          const storage = getStorage(app)
          const fileName = new Date().getTime() + imageFaile.name
          const storageRef = ref(storage, fileName)
          const uploadTask = uploadBytesResumable(storageRef, imageFaile)
          uploadTask.on('state_changed',
               (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    setImageFileUploadProgress(progress.toFixed(0))
               }, (error) => {
                    setImageFileUploadError('Could not upload image (File must be less than 2MB)')
                    setImageFileUploadProgress(null)
                    setImageFaile(null)
                    setImageFaileUrl(null)
                    setImageFileUploading(false)
               }, () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                         setImageFaileUrl(downloadURL)
                         setFormData({ ...formData, profilePicture: downloadURL })
                         setImageFileUploading(false)
                    })
               }
          )
     }

     const handleChange = (e) => {
          setFormData({ ...formData, [e.target.id]: e.target.value })
     }

     const handleSubmit = async (e) => {
          e.preventDefault()
          setUpdateUserError(null)
          setUpdateUserSuccess(null)
          if (Object.keys(formData).length === 0) {
               setUpdateUserError('No change made')
               return
          }
          if (imageFileUploading) {
               setImageFileUploadError('please wait for image is upload')
               return
          }
          try {
               dispatch(updateState())
               const res = await fetch(`/api/user/update/${currentUser._id}`, {
                    method: 'PUT',
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData),
               })
               const data = await res.json()
               if (!res.ok) {
                    dispatch(updateFailure(data.message))
                    setImageFileUploadError(data.message)
               } else {
                    dispatch(updateSuccess(data))
                    setUpdateUserSuccess('Profile updated successfully')
               }
          } catch (error) {
               dispatch(updateFailure(error.message))
               setImageFileUploadError(error.message)
          }
     }
     const handleDeleteUser = async () => {
          setShowModal(false)
          try {
               dispatch(deleteUserStart())
               const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                    method: 'DELETE',
               })
               const data = await res.json()
               if (!res.ok) {
                    dispatch(deleteUserFailure(data.message))
               } else {
                    dispatch(deleteUserSuccess(data))
               }
               setTimeout(() => {
                    window.location.reload()
               })
          } catch (error) {
               dispatch(deleteUserFailure(error.message))
          }
     }
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
          <div className='max-w-lg mx-auto p-3 w-full'>
               <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
               <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <input type='file' accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden />
                    <div
                         className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
                         onClick={() => filePickerRef.current.click()}
                    >
                         {imageFileUploadProgress && (
                              <CircularProgressbar
                                   value={imageFileUploadProgress || 0}
                                   text={`${imageFileUploadProgress}%`}
                                   strokeWidth={5}
                                   styles={{
                                        root: {
                                             width: '100%',
                                             height: '100%',
                                             position: 'absolute',
                                             top: 0,
                                             left: 0,
                                        },
                                        path: {
                                             stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`,
                                        },
                                   }}
                              />
                         )}
                         <img
                              src={imageFaileUrl || currentUser.profilePicture}
                              alt='user'
                              className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileUploadProgress &&
                                   imageFileUploadProgress < 100 &&
                                   'opacity-60'
                                   }`}
                         />
                    </div>
                    {imageFileUploadError &&
                         <Alert className='mt-5 bg-red-500 text-white rounded font-medium' color='failure' icon={HiInformationCircle}>
                              {imageFileUploadError}
                         </Alert>}
                    <TextInput type='text' id='username' defaultValue={currentUser.username} onChange={handleChange} />
                    <TextInput type='email' id='email' defaultValue={currentUser.email} onChange={handleChange} />
                    <TextInput type='password' id='password' placeholder={"password"} onChange={handleChange} />
                    <Button type='submit' gradientDuoTone={'purpleToBlue'} outline>
                         <span>Update</span>
                    </Button>
               </form>
               <div className='text-red-500 flex justify-between mt-5'>
                    <span onClick={() => setShowModal(true)} className='cursor-pointer'> Delete Account </span>
                    <span onClick={handleSignOut} className='cursor-pointer'> Sing Out </span>
               </div>
               {updateUserSuccess && (<Alert className='mt-5 bg-green-500 text-white rounded font-medium' color='success' icon={HiInformationCircle}>
                    {updateUserSuccess}
               </Alert>)}
               {updateUserError && (<Alert className='mt-5 bg-red-500 text-white rounded font-medium' color='failure' icon={HiInformationCircle}>
                    {updateUserError}
               </Alert>)}
               {error && (<Alert className='mt-5 bg-red-500 text-white rounded font-medium' color='failure' icon={HiInformationCircle}>
                    {error}
               </Alert>)}
               <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
                    <Modal.Header />
                    <Modal.Body>
                         <div className="text-center">
                              < HiOutlineExclamationCircle className="h-14 w-14 mx-auto mb-4 text-gray-400 dark:text-gray-200" />
                              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure to delete your account?.</h3>
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
