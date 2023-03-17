import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
function MainContainer() {
    return ( <>
        <div className="drawer drawer-mobile grid-cols-5">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content col-span-5 lg:col-span-4">
    {/* <!-- Page content here --> */}
    <Navbar/>
  </div> 
  <div className="drawer-side col-span-5 md:col-span-2 lg:col-span-1">
    <label for="my-drawer-2" className="drawer-overlay"></label> 
    <Sidebar/>
  
  </div>
</div>
    </> );
}

export default MainContainer;