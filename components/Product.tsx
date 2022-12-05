import { ShoppingCartIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import React from 'react'
import { urlFor } from '../sanity';
import {useDispatch} from "react-redux"
import { addToBasket } from '../redux/basketSlice';
import toast from "react-hot-toast";


interface Props {
    product: Product;
}

function Product({ product }: Props) {
    
    const dispatch = useDispatch()
    const addItemToBasket = () => {
        dispatch(addToBasket(product));

        toast.success(`${product.title} added to basket`, {
            position: "bottom-center",
          });
    };
    return (
    <div className='flex flex-col w-[320px] md:w-[400px] h-fit md:h-[500px]  bg-white select-none hover:shadow-xl sha !rounded-xl space-y-3 '>
        <div className='px-4 py-4'>
            <p className='text-2xl font-medium'>{product.title}</p>
        </div>
        <div className='w-full relative h-64 md:h-full bg-white px-8 md:px-10 rounded-xl py-4'>
            <Image src={urlFor(product.image[0]).url()} alt='/' layout='fill' objectFit='contain' />
        </div>
        <div className='justify-between bg-[#35383c] space-x-3 items-center rounded-b-xl flex flex-1 px-4 py-4'>
            <div className='text-white text-xl font-0 space-y-2'>
                <p>From ${product.price}.00</p>
            </div>
            <div className='items-center text-white rounded-full cursor-pointer justify-center flex flex-shrink-0 w-16 md:w-[70px] h-16 md:h-[70px] bg-gradient-to-r from-pink-300 to-blue-500'
                onClick={addItemToBasket}>
                    {/* shop */}
                <ShoppingCartIcon className='text-white h-8 w-8' />
            </div>
        </div>
    </div>
  )
}

export default Product