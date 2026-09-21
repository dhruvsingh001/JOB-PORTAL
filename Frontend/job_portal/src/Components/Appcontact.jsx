import React from 'react'
import { assets } from '../assets/assets'

const Appcontact = () => {
  return (
    <div>
      <div className="max-w-5xl mx-auto mt-10 px-4 mb-20">
        <div className="bg-purple-50 rounded-lg px-12 py-8 flex items-center justify-between">

          {/* Left side */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 leading-tight">
              download mobile app for<br />
              better experience
            </h2>

            <div className="flex gap-3 mt-6">
              <img
                src={assets.play_store}
                alt="Google Play"
                className="w-32 h-auto cursor-pointer"
              />

              <img
                src={assets.app_store}
                alt="App Store"
                className="w-32 h-auto cursor-pointer"
              />
            </div>
          </div>

          {/* Right side */}
          <div>
            <img
              src={assets.app_main_img}
              alt="Mobile App"
              className="w-48 h-auto object-contain"
            />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Appcontact