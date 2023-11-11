"use client"
import Navbar from "@/components/navbar"
import { useRouter } from "next/navigation";
import { getResId } from "@/logic/restaurant"
import { useEffect, useState } from "react"
import { createMenu } from "@/logic/menu";

export default function Home() {
  const router = useRouter();
  const [resId, setResId] = useState(null)

	useEffect(() => {
		const resId = getResId(router)
    setResId(resId)
	},[])

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
		e.preventDefault()
    console.log(formData)
    createMenu({resId, ...formData}).then((result) => {
      if (!result.err){
        console.log(result.result)
        router.push("/menu")
      }
    })
  };

	return (
		<main className="min-h-screen flex-col justify-between">
			<Navbar showFull = {false}/>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-sky-300">
            Add menu
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
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-sky-200">
                  Description
                </label>
              <div className="mt-2">
                <input
                  id="description"
                  name="description"
                  type="text"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
                <label htmlFor="price" className="block text-sm font-medium leading-6 text-sky-200">
                  Price
                </label>
              <div className="mt-2">
                <input
                  id="price"
                  name="price"
                  type="number"
                  required
                  value={formData.price}
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
                Add menu
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            <a href="/menu" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Back to menu
            </a>
          </p>
        </div>
      </div>
		</main>
		
	)
}