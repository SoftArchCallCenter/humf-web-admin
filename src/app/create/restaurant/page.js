"use client"
import Navbar from "@/components/navbar"
import { useRouter } from "next/navigation";
import { getUserId } from "@/logic/user"
import { useEffect, useState } from "react"
import { addRestaurant } from "@/logic/restaurant";

export default function Home() {
  const router = useRouter();
  const [userId, setUserId] = useState(null)
  const [profile_url, setProfile] = useState(null)

  useEffect(() => {
  	const userId = getUserId(router)
    setUserId(userId)
    const profile = sessionStorage.getItem("profile_url")
    setProfile(profile)
  },[])

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    openTime: undefined,
    closeTime: undefined,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
		e.preventDefault()
    addRestaurant({userId, ...formData}).then(({err, result}) => {
      if (!err){
        console.log(result)
        router.push("/kitchen")
      }
    })
  };

  return (
    <main className="min-h-screen flex-col justify-between">
      <Navbar showFull = {false} profile_url = {profile_url}/>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-sky-300">
            Add your restaurant
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-sky-200">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium leading-6 text-sky-200">
                Address
              </label>
              <div className="mt-2">
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="open_time" className="block text-sm font-medium leading-6 text-sky-200">
                Open Time
              </label>
              <div className="mt-2">
                <input
                  id="open_time"
                  name="openTime"
                  type="time"
                  required
                  value={formData.openTime}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="close_time" className="block text-sm font-medium leading-6 text-sky-200">
                Close Time
              </label>
              <div className="mt-2">
                <input
                  id="close_time"
                  name="closeTime"
                  type="time"
                  required
                  value={formData.closeTime}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}