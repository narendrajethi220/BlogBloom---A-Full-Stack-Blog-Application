import React from 'react'
import { assets, footer_data } from '../assets/assets'
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3'>
        <div className='flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500'>
            <div>
              <img src={assets.IconBlog} alt='logo' className='w-32 sm:w-20'/>
              <p className='max-w-[350px] mt-2'>
                Powered by passion and purpose. <br/>BlogBloom is where stories grow, voices rise, and ideas find their place.
              </p>
            </div>
            <div className='flex flex-wrap justify-between w-full md:w-[45%] gap-5'>
               {footer_data.map((section,index)=>(
                <div key={index}>
                     <h3 className='font-semibold text-base text-gray-900 md:mb-5 mb-2'>{section.title}</h3>
                     <ul className='text-sm space-y-1'>
                      {section.links.map((link,id)=>(
                        <li key={id}>
                          <a href='#' className='hover:underline transition'>{link}</a>
                        </li>
                      ))}
                     </ul>
                </div>
               ))}
               <div>
                <h3 className='font-semibold text-base text-gray-900 md:mb-5 mb-2'>
                  Follow
                </h3>
                <ul className='space-y-1'>
                  <li className='flex gap-5'>
                    <a href='#' className='hover:underline transition text-xl' ><FaLinkedin /></a>
                    <a href='#' className='hover:underline transition text-xl' ><FaGithub /></a>
                    <a href='#' className='hover:underline transition text-xl' ><FaInstagram /></a>
                  </li>
                </ul>
               </div>
              
            </div>
        </div>
        <p className='py-4 text-center text-sm md:text-base text-gray-500'>
          Copyright 2025 © BlogBloom - All Right Reserved.
        </p>
    </div>
  )
}

export default Footer