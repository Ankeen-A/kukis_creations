import React from 'react';
import NoSsr from './NoSsr';

import Image from 'next/image';

const Footer = () => {
  return (
    <div className="footer-container">
      <p className="icons">
        <NoSsr>
          <a href="https://www.instagram.com/kukiscreationsdotcom/" target="_blank" rel="noopener noreferrer">
            <svg width="30" height="30" viewBox="0 0 875 874" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.562592" y="6.34982" width="867.611" height="867.611" rx="198.311" transform="rotate(-0.392319 0.562592 6.34982)" fill="url(#paint0_linear_1_14)" />
              <rect x="129.097" y="133.135" width="612.286" height="609.807" rx="142.536" transform="rotate(-0.392319 129.097 133.135)" stroke="white" stroke-width="61.9722" />
              <rect x="281.341" y="283.309" width="309.861" height="309.861" rx="154.931" transform="rotate(-0.392319 281.341 283.309)" stroke="white" stroke-width="61.9722" />
              <circle cx="621.968" cy="249.99" r="30.9861" transform="rotate(-0.392319 621.968 249.99)" fill="white" />
              <defs>
                <linearGradient id="paint0_linear_1_14" x1="806.51" y1="61.3224" x2="49.4312" y2="816.134" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#8000FF" />
                  <stop offset="0.544134" stop-color="#D50087" />
                  <stop offset="1" stop-color="#FFD600" />
                </linearGradient>
              </defs>
            </svg>
          </a>
          <a href="https://www.etsy.com/shop/KUKIsCREATIONSdotcom/" target="_blank" rel="noopener noreferrer">
            <Image src="/etsy.svg" alt="Etsy logo" width={50} height={45} />
          </a>
        </NoSsr>
      </p>
    </div>
  )
}

export default Footer;