"use client"
import Navbar from "@/components/navbar"
import { useRouter } from "next/navigation";
import { getResId } from "@/logic/restaurant"
import { getUserId } from "@/logic/user"
import { useEffect, useState } from "react"
import { consumeQueue, acceptOrder } from "@/logic/queue";

export default function Home() {
	const router = useRouter();
	const [currentOrder, setCurrentOrder] = useState(null);
  const [profile_url, setProfile] = useState(null)

	useEffect(() => {
		const userId = getUserId(router)
    const resId = getResId(router)
    const profile = sessionStorage.getItem("profile_url")
    setProfile(profile)
		consumeQueue(resId).then(({err, result}) => {
      // console.log(result)
			if(err){
				console.log("error")
				setCurrentOrder(null)
			} else {
				console.log(result)
				setCurrentOrder(result)
			}
		})
	},[])

  const handleOrder = (accept) => {
    const resId = getResId(router)
    acceptOrder({accept, resId}).then(({err, result}) => {
      if(err){
        console.log("error")
      } else {
        alert(`you ${(accept)?"accept":"decline"} this order`)
        location.reload();
      }
    })
  }

	const showCurrentOrder = (currentOrder) => {
		if (currentOrder){
			return (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <ul className="rounded-lg bg-white shadow overflow-hidden sm:rounded-md max-w-sm mx-auto mt-5">
            {
              currentOrder.menus.map((menu, index) => {
              return (
                <li key= {menu.id}>
                  <div className="px-4 py-5 sm:px-6 border-2 border-b-slate-300">
                    <div className="flex items-center justify-evenly">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">{menu.name}</h3>
                      <p className="text-sm font-medium text-gray-500">Quatity: <span className="text-green-600">{menu.quatity}</span></p>
                    </div>
                  </div>
                </li>
              )
              })
            }
            <li>
              <div className="px-4 py-5 sm:px-6">
                <div className="flex items-center justify-center">
                  <a className="font-medium text-blue-600 hover:text-blue-800" onClick={() => handleOrder(true)}>Accept</a>
                  <a className="pl-10 font-medium text-red-600 hover:text-red-800" onClick={() => handleOrder(false)}>Decline</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
			)
		} else {
			return (
        <div className="mt-10 flex items-center justify-center">
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">There is no current order</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Please wait for customer to order at your restaurant.</p>
            <a href="/kitchen" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Back to kitchen
              <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </a>
          </div>
        </div>
			)
		}
	}

	return (
		<main className="min-h-screen flex-col justify-between">
			<Navbar showFull = {false} profile_url = {profile_url}/>
			{showCurrentOrder(currentOrder)}
		</main>
		
	)
}