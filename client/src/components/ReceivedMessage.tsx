import React from 'react'
import { generateLogo } from '../lib/utils'

const ReceivedMessage: React.FC = () => {
    return (
        <div className='w-full flex mb-3'>
            <div className='flex flex-column align-items-center'>
                <span className="flex justify-content-center align-items-center p-3 surface-300 border-circle text-indigo-400 mr-2">
                    {generateLogo("Mevlüt Can")}
                </span>
                <span className='mt-1'>09:32</span>
            </div>
            <div className='w-full max-w-25rem flex flex-column px-4 pt-2 pb-3 surface-200 border-round-xl border-noround-left border-round-bottom-xl'>
                <span className='text-xs text-700'>Mevlüt Can Tuna</span>
                <span className='text-md text-900'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum obcaecati consequuntur accusantium repudiandae dolorem soluta qui modi optio fuga sit!</span>
            </div>
        </div >
    )
}

export default ReceivedMessage