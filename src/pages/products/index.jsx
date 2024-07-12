import { Pagination } from '@mui/material'
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ProductModal, UploadFileModal } from "@modal"
import { ProductTable } from "@ui"
import { product } from "@service"

const Index = () => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState([])
  const [count, setCount] = useState(0)
  const [params, setParams] = useState({
    page: 1,
    limit: 10
  })

  const getData = async () => {
    const response = await product.get(params)
    console.log(response);
    if (response.status === 200 && response?.data?.products) {
      setData(response?.data?.products)
      let total = Math.ceil(response?.data?.total_count / params.limit)
      setCount(total)
    }
  }

  useEffect(() => {
    getData()
  }, [params])

  const handleChange = (event, value) => {
    setParams({
      ...params,
      page: value
    })
  };

  return (
    <>
      <UploadFileModal open={open} data={data} handleClose={() => { }} />
      <ProductModal open={open} handleClose={() => setOpen(false)} />
      <div className='w-full flex justify-end mb-3'>
        <Button variant="contained" onClick={() => setOpen(true)}>Add</Button>
      </div>
      <ProductTable data={data} />
      <Pagination count={count} page={params.page} onChange={handleChange} />
    </>
  )
}

export default Index
