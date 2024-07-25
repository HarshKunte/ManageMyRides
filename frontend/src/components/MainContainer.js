import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { toast } from 'react-hot-toast';
import { getUserDataApi } from '../helpers/user.helper';
import Context from '../context/Context';
import Loading from './Loading';
import { logout } from '../helpers/auth.helper';
function MainContainer() {
  const { user, setUser } = useContext(Context);
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      getUserDataApi()
        .then((res) => {
          setUser(res.data.user);
          setIsLoading(false);
        })
        .catch((err) => {
          logout()
          navigate('/login')
          console.log(err);
          toast.error("Failed to receive data");
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }
    return ( <>
        <div className="drawer drawer-mobile grid-cols-5">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content col-span-5 lg:col-span-4">
    {/* <!-- Page content here --> */}
    <Navbar/>
    <section className=''>
    <Outlet/>
    </section>
  </div> 
  <div className="drawer-side col-span-5 md:col-span-2 lg:col-span-1">
    <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
    <Sidebar/>
  
  </div>
</div>
    </> );
}

export default MainContainer;