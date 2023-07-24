import { Result } from 'antd'
import React from 'react'
import pokeball from './pokeball.png';

const EmptyPokemon = () => {
  return (
    <div className='flex items-center justify-center p-10 mt-10 bg-white lg:mt-0'>
      <Result
          icon={
            <center>
              <div style={{ width: '200px', height: '200px', opacity: 0.8}}> 
                <img
                  src={pokeball}
                  alt='pokeball icon'
                  className='object-contain w-full h-full'
                />
              </div>
            </center>
          }
          title={<p className='text-gray-500'>No Pokemon Data...</p>}
      />
    </div>
  )
}

export default EmptyPokemon