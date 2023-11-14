"use client"
import Navbar from "@/components/navbar"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
// import { signup } from "@/logic/user"
import { getUserId, uploadImage } from "@/logic/user";
// import Image from 'next/image'

export default function Home() {
  const router = useRouter();
  const [profile_url, setProfile] = useState(null)
  const [userId, setUserId] = useState(null)
  const [selectedFile, setSelectedFile] = useState();
  const [checkFile, setCheckFile] = useState(false);

  useEffect(() => {
    const profile = sessionStorage.getItem("profile_url")
    // console.log("profile: "+profile)
    const userId = getUserId(router)
    setUserId(userId)
    setProfile(profile)
  }, [])

    const imageHandler = (e) => {
      setSelectedFile(e.target.files[0]);
      // setCheckFile(true);
      if(e.target.files[0]){
        setCheckFile(true);
      } else{
        setCheckFile(false);
      }
    } 

    const imagesubmission = (selectedFile,userId) => {
      if (checkFile) {
          alert("Uploading");
          console.log(selectedFile);
          uploadImage(selectedFile,userId).then(({err,result}) => {
            if(err){
              console.log(err)
            } else{
              alert("File Uploaded");
              router.push("/home")
            }
          })
      } else {
          // setCheckFile(true);
          alert("select a file");
      }
    }

    return (
		<main className="min-h-screen flex-col justify-between">
			<Navbar showFull = {true} profile_url = {profile_url}/>
      <div className="mt-10 flex items-center justify-center">
        <div className="p-6 border border-gray-200 rounded-lg shadow bg-gray-800 border-gray-700 flex flex-col items-center justify-center">
          <div style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            backgroundColor: 'transparent',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '3px solid black', 
            }}>
              {selectedFile && 
              <img className= "rounded-full" src= {URL.createObjectURL(selectedFile)} style={{width: '100%', height:'100%', objectFit: 'cover', borderRadius: '50%',}}/>}
          </div>
          <div className="flex items-center justify-center">
          <input type="file" name="file" onChange={imageHandler} className="block w-full mt-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
          </div>
          <div className="flex items-center justify-center">
          <a onClick={() => imagesubmission(selectedFile,userId)}  className="bg-blue-700 hover:bg-blue-900 text-gray-50 mt-3 px-4 py-2 rounded flex items-center">
          Upload
          </a>
          <a href="/home"  className="bg-red-700 hover:bg-red-900 text-gray-50 ms-3 mt-3 px-4 py-2 rounded flex items-center">
          Cancel
          </a>
          </div>
        </div>
      </div>
      
      {/* <div className="w-[320px] grid gap-2 mt-20 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="h-24 cursor-pointer relative flex justify-center items-center border-2 rounded-md bg-blue-700">
              <input type="file" name="file" onChange={imageHandler} className="z-20 opacity-0 cursor-pointer h-full w-full" />
              <div className="absolute flex justify-center items-center gap-2">
                  <img className={`h-10 w-10 rounded-full ${checkFile?'opacity-1':'opacity-0'}`} src={selectedFile ? URL.createObjectURL(selectedFile) : null} />
                  <span className="text-[18px] w-56 truncate">{checkFile?selectedFile.name:'Choose a file'}</span>
              </div>    
          </div>
          <button onClick={imagesubmission} className="w-full h-14 bg-green-600 text-white rounded-md">Upload</button>
      </div> */}
      {/* <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <div>
          <a href="/home" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800">
            Cancel
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </a>
        </div>
      </div> */}
		</main>
	)
};