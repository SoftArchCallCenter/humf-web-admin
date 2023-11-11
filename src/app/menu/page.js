"use client"
import Navbar from "@/components/navbar"
import { deleteMenu, getAllMenuByRestaurant } from "@/logic/menu";
import { getResId } from "@/logic/restaurant";
import { getUserId } from "@/logic/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [menuList, setMenuList] = useState(null)

  useEffect(() => {
		const userId = getUserId(router)
    const resId = getResId(router)

    getAllMenuByRestaurant(resId).then(({err, result}) => {
			if(err){
				console.log("error")
				setMenuList(null)
			} else {
				console.log(result)
				setMenuList(result.Menu)
			}
		})

  },[])

  const handleRemoveMenu = (menuId) => {
    console.log(menuId)
    deleteMenu(menuId).then(({err, result}) => {
      if (err){
				console.log("error")
			} else {
				location.reload();
			}
    })
  }

  const showmenuList = (menuList) => {
    if (menuList){
      return (
        <>
        {
          menuList.map((menu, index) => {
            return (
              <li key= {menu.id}>
                <div className="px-4 py-5 sm:px-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{menu.name}</h3>
                    <p className="text-sm font-medium text-gray-500">Price: <span className="text-green-600">{menu.price}</span></p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-500 break-all">Description: <span className="text-green-600">{menu.description}</span></p>
                    <a className="pl-1 font-medium text-red-600 hover:text-red-800" onClick={() => handleRemoveMenu(menu.id)}>Remove</a>
                  </div>
                </div>
              </li>
            )
          })
        }
        </>
      )
    } else {
      return (
        <li>
          <div>
            <h2 className="my-6 flex justify-center text-xl text-black font-bold">No Menu Item</h2>
          </div>
        </li>
      )
    }
  }

  return (
    <main className="min-h-screen flex-col justify-between">
      <Navbar />
      <div className="text-right relative">
        <a href="/create/menu" className="bg-blue-700 hover:bg-blue-900 text-gray-50 px-4 py-2 rounded absolute top-4 right-[5%] sm:right-[10%] md:right-[15%] lg:right-[20%] flex items-center">
          <svg className="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 7h12M7 1v12" />
          </svg>
          Add Menu
        </a>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <ul className="rounded-lg bg-white shadow overflow-hidden sm:rounded-md max-w-sm mx-auto mt-16">
          {showmenuList(menuList)}  
        </ul>
      </div>
    </main>
  );
}
