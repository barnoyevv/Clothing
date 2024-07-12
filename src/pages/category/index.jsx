import { Pagination } from '@mui/material'
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { CategoryModal } from "@modal"
import { CategoryTable } from "@ui"
import { category } from "@service"

const Index = () => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState([])
  const [count, setCount] = useState(0)
  const [params, setParams] = useState({
    page: 1,
    limit: 10
  })
  const getData = async () => {
    const responce = await category.get(params)
    if (responce.status === 200 && responce?.data?.categories) {
      setData(responce?.data?.categories)
      let total = Math.ceil(responce?.data?.total_count / params.limit)
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
      <CategoryModal open={open} handleClose={() => setOpen(false)} />
      <div className='w-full flex justify-end mb-3'>
        <Button variant="contained" onClick={() => setOpen(true)}>Add</Button>
      </div>
      <CategoryTable data={data && data} />
      <Pagination count={count} page={params.page} onChange={handleChange} />
    </>
  )
}

export default Index
