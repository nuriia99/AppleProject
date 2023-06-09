import React, {useState} from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Landing from '../components/Landing';
import { Tab } from '@headlessui/react'
import { GetServerSideProps } from 'next';
import { fetchCategories } from '../utils/fetchCategories';
import { fetchProducts } from '../utils/fetchProducts';
import Product from '../components/Product';
import { getSession } from 'next-auth/react';
import type { Session } from 'next-auth';



interface Props {
  categories: Category[],
  products: Product[],
  session: Session | null
}


export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const categories = await fetchCategories()
  const products = await fetchProducts()
  const session = await getSession(context)

  return {
    props: {
      categories,
      products,
      session
    },
  }
}



export default function Home({categories, products} : Props) {

  const showProducts = (category: number) => {
    return products.filter(p => p.category._ref === categories[category]._id).map((p) => <Product product={p} id={p._id}/>)
  }


  return (
    <div>
      <Head>
        <title>Apple Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <main className="relative h-[200vh] bg-[#E7ECEE]">
        <Landing />
      </main>
        <section className='relative z-40 -mt-[100vh] min-h-screen bg-[#1B1B1B]'>
          <div>
            <h1 className='text-center text-white font-medium text-4xl lg:text-5xl py-14'>
              New promos
            </h1>
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
            </Tab.Panels>
          </Tab.Group>
          </div>
        </section>
    </div>
  )
}


