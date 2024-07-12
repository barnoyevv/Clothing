import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import React from 'react'
import App from "../App"
import {SignIn, Main, Category, Products, Workers} from "@pages"
const Index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<App/>}>
        <Route index element={<SignIn/>}/>
        <Route path='main/*' element={<Main/>}>
          <Route index element={<Category/>}/>
          <Route path='products' element={<Products/>}/>
          <Route path='workers' element={<Workers/>}/>
        </Route>
      </Route>
    )
  )
  return <RouterProvider router={router}/>
}

export default Index
