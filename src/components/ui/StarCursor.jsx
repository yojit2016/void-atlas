import { useEffect } from 'react'

export default function StarCursor() {
  useEffect(() => {
    const cursor = document.createElement('div')
    
    cursor.style.width='12px'
    cursor.style.height='12px'
    cursor.style.borderRadius='999px'
    cursor.style.position='fixed'
    cursor.style.background='white'
    cursor.style.boxShadow='0 0 30px rgba(255,255,255,0.9)'
    cursor.style.pointerEvents = 'none'
    cursor.style.zIndex = '9999'
    cursor.style.transform = 'translate(-50%, -50%)'

    document.body.appendChild(cursor)

    const moveCursor = (e) => {
      cursor.style.left = `${e.clientX}px`
      cursor.style.top = `${e.clientY}px`
    }

    document.addEventListener('mousemove', moveCursor)
    return () => { 
      document.removeEventListener('mousemove', moveCursor)
      document.body.removeChild(cursor)
    }
  }, [])

  return null
}