import Head from 'next/head'
import React from 'react'
import Header from '../components/Header'
import {useRouter} from "next/router"
import {ChevronDownIcon} from '@heroicons/react/solid'
import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import Button from "../components/Button"
import {selectBasketItems, selectBasketTotal} from '../redux/basketSlice'
import CheckoutProduct from '../components/CheckoutProduct'
import Stripe from "stripe";
import { fetchPostJSON } from "../utils/api-helpers";
import getStripe from '../utils/getStripe'




function Checkout() {
    const items = useSelector(selectBasketItems)
    const router = useRouter();
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState(
        {} as { [key: string]: Product[] }
      );
      const basketTotal = useSelector(selectBasketTotal);
      const [loading, setLoading] = useState(false)

      useEffect(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item._id] = results[item._id] ||  []).push(item);

            return results;
        }, {} as {[key: string]: Product[]});

        setGroupedItemsInBasket(groupedItems)
      }, [items]);

      const createCheckoutSession = async () => {
        setLoading(true)

        const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON("/api/checkout_sessions", {
            items: items,
        })

        if ((checkoutSession as any).statusCode === 500){
            console.error((checkoutSession as any).message);
            return;
        }

        //redirect to checkout 

        const stripe = await getStripe()
        const {error} = await stripe!.redirectToCheckout({

            sessionId: checkoutSession.id,
        })

        console.warn(error.message);

        setLoading(false )
      }

  return (
    <div className='bg-[#E7ECEE] overflow-hidden min-h-screen'>
      <Head>
        <title>Bag - Apple</title>
        <link rel="stylesheet" href="/favicon.ico" />
      </Head>
      <Header />
      <main className='pb-24 mx-auto max-w-5xl'>
        <div className='px-5'>
            <h1 className='font-semibold text-3xl lg:text-4xl my-4'>{items.length > 0 ? 'Review your bag' : 'Your bag is empty'}</h1>
            <p className='my-4'>Free delivery and free returns</p>
            {items.length === 0 && (
                <Button title='Continue Shopping' onClick={() => router.push('/')} />
            )}
        </div>
        {items.length > 0 && (
            <div className='mx-5 md:mx-8'>
                {Object.entries(groupedItemsInBasket).map(([key, items]) => (
                    <CheckoutProduct key={key} items={items} id={key} />
                ))}

                <div className='ml-auto mt-6 max-w-3xl my-12'>
                    <div className='divide-y divide-gray-300'>
                        <div className='pb-4'>
                            <div className='justify-between flex'>
                                <p>Subtotal</p>
                                <p>${basketTotal}.00</p>
                            </div>
                            <div className='justify-between flex'>
                                <p>Shipping</p>
                                <p>FREE</p>
                            </div>
                            <div className='justify-between flex'>
                                <div className='gap-x-1 flex flex-col lg:flex-row'>
                                    Estimated tax for:{""}
                                    <p className='cursor-pointer flex hover:underline text-blue-500 items-end'>
                                        Enter area code
                                        <ChevronDownIcon className='w-6 h-6' />
                                    </p>
                                </div>
                                <p>$ -</p>
                            </div>
                        </div>

                        <div className='text-xl font-semibold pt-4 flex justify-between'>
                            <h4>Total</h4>
                            <h4>${basketTotal}.00</h4>
                        </div>
                    </div>

                    <div className='space-y-4 my-14'>
                        <h4 className='font-semibold text-xl'>How would you like to check out?</h4>
                        <div className='flex flex-col md:flex-row gap-4'>
                            <div className='rounded-xl text-center order-2 flex flex-1 flex-col p-8 py-12 bg-gray-200 items-center'>
                                <h4 className='flex flex-col font-semibold text-xl mb-4'>
                                    <span>Pay Monthly</span>
                                    <span>with Apple Card</span>
                                    <span>$283.16/month at 0% APR<sup className="-top-1">◊</sup></span>
                                </h4>
                                <Button title='Pay Monthly with Apple Card' />
                                <p className='text-[13px] mt-2 max-w-[240px]'>$0.00 due today. including applicable full-price items, down payment, shipping and taxes.</p>
                            </div>

                            <div className='rounded-xl py-12 p-8 space-y-8 md:order-2 items-center flex flex-1 flex-col bg-gray-200 '>
                                <h4 className='font-semibold flex flex-col text-xl mb-4'> 
                                    Pay in full
                                    <span>
                                        CAD ${basketTotal}.00
                                    </span>
                                </h4>
                                <Button noIcon title='Check Out' width='w-full' loading={loading} onClick={createCheckoutSession} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </main>
    </div>
  )
}

export default Checkout
