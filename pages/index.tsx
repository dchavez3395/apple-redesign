import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import Landing from '../components/Landing'
import {Tab} from '@headlessui/react'
import type { GetServerSideProps } from "next";
import { fetchCategories } from '../utils/fetchCategories'
import { fetchProducts } from '../utils/fetchProducts'
import Product from '../components/Product'
import Basket from '../components/Basket'
import  {getSession} from 'next-auth/react'
import type {Session} from 'next-auth'


interface Props{
  categories: Category[]
  products: Product[]
  session: Session | null;
}


const Home = ({categories, products}: Props) => {
  
  const showProducts = (category: number) => {
    return products.filter((product) => product.category?._ref === categories[category]._id)
    .map((product) => <Product product={product} key={product._id} />);
  };

  return (
    <div className="">
      <Head>
        <title>Apple</title>
        <link rel="icon" href="https://freepngimg.com/save/25358-apple-logo-transparent-image/444x506" />
      </Head>
      <Header />

      <Basket />
      <main className='h-[200vh] bg-[#e7ecee] relative'>
        <Landing />
      </main>
      <section className='z-40 min-h-screen bg-[#1b1b1b] -mt-[100vh] relative'>
        <div className='py-16 space-y-10'>
          <h1 className='font-medium tracking-wide text-white text-center text-4xl md:text-5xl'>New Promos</h1>
          <Tab.Group>
            <Tab.List className="flex justify-center">
              {categories.map((category) => (
                <Tab
                  key={category._id}
                  id={category._id}
                  className={({ selected }) =>
                    `whitespace-nowrap rounded-t-lg py-3 px-5 text-sm font-light outline-none md:py-4 md:px-6 md:text-base ${
                      selected
                        ? "borderGradient bg-[#35383C] text-white"
                        : "border-b-2 border-[#35383C] text-[#747474]"
                    }`
                  }
                >
                  {category.title}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mx-auto max-w-fit pt-10 pb-24 sm:px-4">
              <Tab.Panel className="tabPanel">{showProducts(0)}</Tab.Panel>
              <Tab.Panel className="tabPanel">{showProducts(1)}</Tab.Panel>
              <Tab.Panel className="tabPanel">{showProducts(2)}</Tab.Panel>
              <Tab.Panel className="tabPanel">{showProducts(3)}</Tab.Panel>
              <Tab.Panel className="tabPanel">{showProducts(4)}</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </section>
    </div>
  )
}
export default Home


// backend

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const categories = await fetchCategories();
  const products = await fetchProducts();
  const session = await getSession(context)

  return {
    props: {
      categories,
      products,
      session,
    },
  };
};