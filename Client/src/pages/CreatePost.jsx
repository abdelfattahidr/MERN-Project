import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { HiInformationCircle } from "react-icons/hi";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar"
import 'react-circular-progressbar/dist/styles.css'

export default function CreatePost() {
     const [file, setFile] = useState(null)
     const [imageUploadProgress, setImageUploadProgress] = useState(null)
     const [imageUploadError, setImageUploadError] = useState(null)
     const [formData, setFormData] = useState({})
     const handleUploadImage = () => {
          try {
               if (!file) {
                    return setImageUploadError('Please select an image to upload')
               }
               const storage = getStorage(app)
               const fileName = new Date().getTime() + '_' + file.name
               const storageRef = ref(storage, fileName)
               const uploadTask = uploadBytesResumable(storageRef, file)
               uploadTask.on('state_changed',
                    (snapshot) => {
                         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                         setImageUploadProgress(progress.toFixed(0))
                    }, (error) => {
                         setImageUploadError('image upload failed')
                         setImageUploadProgress(null)
                    }, () => {
                         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                              setImageUploadProgress(null)
                              setImageUploadError(null)
                              setFormData({ ...formData, image: downloadURL })
                         })
                    })
          } catch (error) {
               setImageUploadError('image upload failed')
               setImageUploadProgress(null)
               console.log(error)
          }
     }
     return (
          <div className='p-3 max-w-3xl mx-auto min-h-screen'>
               <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
               <form className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4 sm:flex-row justify-between">
                         <TextInput
                              id="title"
                              type="text"
                              placeholder="Title"
                              required={true}
                              className="flex-1"
                         />
                         <Select>
                              <option value='uncategorized'>select a category</option>
                              <option value='javascript'>JavaScript</option>
                              <option value='react'>React</option>
                              <option value='nextjs'>NextJs</option>
                         </Select>
                    </div>
                    <div className="flex gap-4 items-center justify-between border-4 border-teal-400 border-dotted p-3">
                         <FileInput type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
                         <Button type="button" gradientDuoTone={'purpleToBlue'} outline onClick={handleUploadImage} disabled={imageUploadProgress}>
                              {
                                   imageUploadProgress ?
                                        <div className="w-16 h-16">
                                             <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
                                        </div> :
                                        'Upload Image'
                              }
                         </Button>
                    </div>
                    {imageUploadError && <Alert className='mt-5 bg-red-500 text-white rounded font-medium' color='failure' icon={HiInformationCircle}>
                         {imageUploadError}
                    </Alert>}
                    {formData.image && <img src={formData.image} alt="image" className="w-full h-72 object-cover" />}
                    <ReactQuill theme="snow" placeholder="Write your post" className="h-72 mb-12" required />
                    <Button type="submit" gradientDuoTone={'purpleToBlue'}>Publish</Button>
               </form>
          </div>
     )
}
