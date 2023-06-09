import Card from '@/components/Card';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function Restaurants() {

    const router = useRouter();
    const { cityId } = router.query
    const [restaurants, setRestaurants] = useState([])
    const [cityName, setCityName] = useState('')

    useEffect(() => {
        if (cityId !== undefined) {
            fetch(`http://localhost:3000/api/restaurant/city/${cityId}`)
                .then((res) => res.json())
                .then((json) => { setRestaurants(json.data), setCityName(json.data[0].city.name) })

        }
    }, [cityId])

    return (
        <div className='flex flex-row items-center px-10 h-screen w-full'>
            <div className='fixed -z-10'>
                <Image src={"/undraw_chef_cu-0-r.svg"} width={600} height={500} />
            </div>
            <div className='flex flex-col h-full gap-10 items-center justify-center w-full mt-52 mb-10'>
                <h1 className='text-xl font-bold'>{cityName} Şehrindeki Restoranlar :</h1>
                {
                    restaurants.map((restaurant) => (
                        <Link className='w-full md:w-1/2' key={restaurant._id} href={`/restaurant/${restaurant._id}`}><Card name={restaurant.name} address={restaurant.address} /></Link>
                    ))
                }
            </div>
        </div>
    )
}
