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
    <div className='flex flex-col w-[320px] md:w-[400px] h-fit md:h-[500px] bg-[#35383c]  select-none  rounded-xl space-y-3 p-8 md:p-10 '>
        <div className='w-full relative h-64 md:h-72'>
            <Image src={urlFor(product.image[0]).url()} alt='/' layout='fill' objectFit='contain' />
        </div>
        <div className='justify-between space-x-3 items-center flex flex-1'>
            <div className='text-white text-xl md:text-2xl space-y-2'>
                <p>{product.title}</p>
                <p>{product.price}</p>
            </div>
            <div className='items-center rounded-full cursor-pointer justify-center flex flex-shrink-0 w-16 md:w-[70px] h-16 md:h-[70px] bg-gradient-to-r from-pink-500 to-violet-500'
            onClick={addItemToBasket}>
                <ShoppingCartIcon className='text-white h-8 w-8' />
            </div>
        </div>
    </div>
  )
}

export default Product