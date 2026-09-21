import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className="w-full mx-auto mt-10 px-4">
      <div className="border border-gray-200 rounded-lg px-12 py-5 flex items-center justify-between">

        {/* Left side */}
        <div className="flex items-center gap-4">

          <img
            src={assets.logo}
            alt="Logo"
            className="w-28"
          />

          <div className="h-6 w-px bg-gray-300"></div>

          <p className="text-xs text-gray-400">
            All right reserved. Copyright @job-portal
          </p>

        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">

          <img
            src={assets.facebook_icon}
            alt="Facebook"
            className="w-7 h-7 cursor-pointer"
          />

          <img
            src={assets.twitter_icon}
            alt="Twitter"
            className="w-7 h-7 cursor-pointer"
          />

          <img
            src={assets.instagram_icon}
            alt="LinkedIn"
            className="w-7 h-7 cursor-pointer"
          />

        </div>

      </div>
    </div>
  )
}

export default Footer