"use client"
import Navbar from "@/components/navbar"
import { useEffect, useState } from "react"

export default function Home() {
	const [restaurant, setRestaurant] = useState(null)

	useEffect(() => {
		const {userId} = JSON.parse(sessionStorage.getItem('user'))
		
		async function getRestaurant() {
			const res = undefined
			// const res = {
			// 	id: 2,
			// 	name: "res2",
			// 	openTime: "10:00",
			// 	closeTime: "20:00",
			// 	address: "",
			// 	createAt: null,
			// 	updateAt: null
			// } // get restaurant with getRes(:userId) to apiGateway
			return res
		}

		getRestaurant().then((res) => {
			console.log(res)
			setRestaurant(res)
		}).catch((error) => {
			console.log(error)
			setRestaurant(null)
		})
	})

	const homePage = (restaurant) => {
		if (restaurant) {
			return (
				<div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
					
				</div>
			)
		} else {
			return (
				<div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
					<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">There is no restaurant</h5>
					<p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Please add your restaurant before using the website.</p>
					<a href="/create/restaurant" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
						Add restaurant
						<svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
						</svg>
					</a>
				</div>
			)
		} 
	}
	return (
		<main className="min-h-screen flex-col justify-between">
			<Navbar showFull = {restaurant}/>
			<div className="mt-10 flex items-center justify-center">
				{homePage(restaurant)}
			</div>
		</main>
		
	)
}