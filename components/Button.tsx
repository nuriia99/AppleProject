import React from 'react'

interface Props {
  title: string,
  onClick?: () => void,
  loading?: boolean
}

function Button({ title, loading = false, onClick }: Props) {
  return (
    <a onClick={onClick} className="cursor-pointer relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-md shadow-xl group hover:ring-1 hover:ring-purple-500">
      <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-pink-500 to-violet-500 via-purple-600"></span>
      <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
      <div className="relative text-white text-center">{!loading ? <p >{title}</p> : 'Loading...'}</div>
    </a>
  )
}

export default Button