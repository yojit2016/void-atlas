import { useState, useEffect } from 'react'
import mockSpaceData from '../data/mockSpaceData'

export default function useCosmicData() {
  const [data, setData] = useState([])

  useEffect(() => {
    // placeholder for async fetch
    setData(mockSpaceData)
  }, [])

  return { data }
}
