import { useEffect, useState } from "react";
import { IconContext } from "react-icons/lib";
import { MdOutlinePlaylistAddCheckCircle } from "react-icons/md";
import { dashboard_data } from "../../assets/assets";

const Dashboard = () => {
  
  const [dashboarData,setDashboardData]=useState({
    blogs:0,
    comments:0,
    drafts:0,
    recentBlogs:[]
  })

  const fetchDashboard=async()=>{
     setDashboardData(dashboard_data);
  }

  useEffect(()=>{
    fetchDashboard()
  },[])



  return <div className="flex-1 p-4 md:p-10 bg-blue-50/50">

    <div className="flex flex-wrap gap-4">
      <div>
        <IconContext.Provider value={{className:"text-3xl text-primary"}}>
          <MdOutlinePlaylistAddCheckCircle />
          </IconContext.Provider>
          <div>
            <p>{dashboarData.blogs}</p>
          </div>
      </div>
    </div>

  </div>;
};

export default Dashboard;
