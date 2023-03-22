import React from 'react';
import {BsFuelPumpDiesel, BsCurrencyRupee} from 'react-icons/bs'
function ViewTransaction() {
    return ( 
        <>
            <section>
            <h2 className="text-lg font-semibold mb-12 text-gray-700 capitalize">
          Journey Details
        </h2>
        <div className='flex flex-wrap'>
        <div className='w-full lg:w-1/2 '>
            <div className='grid grid-cols-2 gap-y-5 '>
                <div className=' md:col-span-1'>
                    <p className='text-sm text-gray-400'>Customer Name</p>
                    <p className='text-sm font-medium'>John Doe</p>
                </div>
                <div className=' md:col-span-1'>
                    <p className='text-sm text-gray-400'>Mobile No.</p>
                    <p className='text-sm font-medium'>846544846</p>
                </div>
                <div className=' md:col-span-1'>
                    <p className='text-sm text-gray-400'>From Date</p>
                    <p className='text-sm font-medium'>14/02/23</p>
                </div>
                <div className=' md:col-span-1'>
                    <p className='text-sm text-gray-400'>To Date</p>
                    <p className='text-sm font-medium'>14/02/23</p>
                </div>
                <div className=' md:col-span-1'>
                    <p className='text-sm text-gray-400'>Start location</p>
                    <p className='text-sm font-medium'>Mumbai</p>
                </div>
                <div className=' md:col-span-1'>
                    <p className='text-sm text-gray-400'>End location</p>
                    <p className='text-sm font-medium'>Panvel</p>
                </div>
                <div className='col-span-2 md:col-span-1 grid-cols-2'>
                    <div className='col-span-1'>
                    <p className='text-sm text-gray-400'>Rate /km.</p>
                    <p className='text-sm font-medium flex items-center'>35 <BsCurrencyRupee/></p>
                    </div>
                    <div>
                    <p className='text-sm text-gray-400'>Rate /km.</p>
                    <p className='text-sm font-medium flex items-center'>35 <BsCurrencyRupee/></p>
                    </div>
                </div>
                <div className="col-span-1">
                    <p className='text-sm text-gray-400'>Driver allowance.</p>
                    <p className='text-sm font-medium flex items-center'>35 <BsCurrencyRupee/></p>
                </div>
                <div className='col-span-2 md:col-span-1 '>
                    <p className='text-sm text-gray-400 mb-2'> Fuel Details</p>
                    <div className='flex space-x-10'>
                    <div className='flex'>
                        <BsFuelPumpDiesel className='mr-2'/>
                        <p className='text-sm font-medium'>CNG</p>
                    </div>
                    <div className='flex'>
                        
                        <p className='text-sm font-medium'>35 kgs</p>
                    </div>
                    <div className='flex'>
                        
                        <p className='flex items-center text-sm font-medium'>65
                        <BsCurrencyRupee/>
                        <span>/kg</span>
                        </p>
                    </div>
                    </div>
                </div>
                
            </div>
        </div>
        <div className='w-full lg:w-1/2 p-5 px-10'>
            Map
        </div>
        </div>
            </section>
        </>
     );
}

export default ViewTransaction;