// Import necessary components and icons
import Sidebar from "../../../components/sidebar/Sidebar";
import { useState } from 'react';
import { Dashboard } from "../../../components/dashboard/Dashboard";
import { useAppDispatch, useAppSelector } from "../../../hooks/useTypedSelectors";

import { RxDashboard } from 'react-icons/rx';
import { LuUser2 } from 'react-icons/lu';
import { MdOutlineReportGmailerrorred } from 'react-icons/md';
import { MdOutlinePayments } from 'react-icons/md';
import { MdOutlineFeedback } from 'react-icons/md';
import { CgMenuLeft } from "react-icons/cg";
import { BsGraphUpArrow } from "react-icons/bs";


import { useDebounce } from 'use-debounce';

import "./Home.css";


import { IconType } from "react-icons";
import { searchUser } from "../../../services/adminAPI";
import { Users } from "../../../typings/user/userTypes";
import { SearchBox } from "../../../components/searchbox/searchBox";
import { AdminPayment } from "../Payment/Payment";
import { ListUser } from "../ListUsers/ListUsers";
import { ReportUser } from "../ReportUser/ReportUser";
import { ListFeedback } from "../ListFeedbacks/ListFeedbacks";
import Sales from "../Sales/Sales";



export function Home() {
    const [showTable, setShowTable] = useState(false);
    const [showDashboard, setShowDashboard] = useState(true);
    const [showAdminPayment, setShowAdminPayment] = useState(false);
    const [showReportUser, setShowReportUser] = useState(false);
    const [showFeedbacks, setShowFeedbacks] = useState(false);
    const [showSales, setShowSales] = useState(false);

    const [search, setSearch] = useState("");
    const [searchUserData, setSearchUserData] = useState<Users[]>([]);
    const [value] = useDebounce(searchUserData, 1000);

    const [sidebarToggle, setSidebarToggle] = useState(true)


    const dispatch = useAppDispatch();

    const selector = useAppSelector((state) => state.admin);

    const email = selector?.admin?.payload?.data.email;
    
    const items:Array<{name: string, icon: IconType}> = [
        { name: "Dashboard", icon: RxDashboard },
        { name: "Users", icon: LuUser2 },
        { name: "Report Request", icon: MdOutlineReportGmailerrorred },
        { name: "Payment", icon: MdOutlinePayments },
        { name: "Feedback", icon: MdOutlineFeedback },
        { name: "Sales", icon: BsGraphUpArrow },
    ];

    const handleSidebarItemClick = (itemName: string) => {
    
        if (itemName === "Users") {
            setShowTable(true);
        } else {
            setShowTable(false);
        }

        if (itemName === "Dashboard") {
            setShowDashboard(true);
        }else{
            setShowDashboard(false);
        }

        if (itemName === "Payment") {
            setShowAdminPayment(true);
        } else {
            setShowAdminPayment(false);
        }

        if (itemName === "Report Request") {
            setShowReportUser(true);
        } else {
            setShowReportUser(false);
        }

        if (itemName === "Feedback") {
            setShowFeedbacks(true);
        } else {
            setShowFeedbacks(false);
        }

        if (itemName === "Sales") {
            setShowSales(true);
        } else {
            setShowSales(false);
        }
    };

    const handleSearch = async(text: string) => {
        if(text.trim() != ""){
            setSearch(text);
            const response = await dispatch(searchUser(search));
            if (response.payload) {
                setSearchUserData(response.payload.data);
            }
        }else{
            setSearch(text);
            setSearchUserData([]);
        }
    }

    function showSidebar() {
        setSidebarToggle(!sidebarToggle)
    }
    
    
    return (
        <div className="flex overflow-hidden font-rubik h-[100vh]">
            {/* Pass necessary props to the Sidebar component */}
        
            <div className={`bg-white transition-transform duration-300 ease-in-out ${sidebarToggle ? "fixed translate-x-0" : "fixed -translate-x-full"} md:hidden w-[70vw] h-[100vh] z-10`}>
                <CgMenuLeft className="text-2xl text-black ml-10 mt-5 block md:hidden" onClick={showSidebar}/>
                <Sidebar
                    role="user"
                    items={items}
                    onClickItem={handleSidebarItemClick} 
                />
            </div>

            <div className="hidden md:flex">
                <Sidebar 
                    role="admin"
                    items={items}
                    onClickItem={handleSidebarItemClick} 
                />     
            </div>

            <div className="w-full h-[100vh] flex flex-col items-center bg-[#a17c441a]">

                <div className="nav min-h-[10vh] w-full gap-10 z-0 flex items-center justify-between px-3 md:px-8">

                    <CgMenuLeft className="text-2xl rounded-full text-black ml-4 mt-5 block md:hidden" onClick={showSidebar}/>

                    {/* search box component */}
                    <SearchBox handleSearch={handleSearch} search={search} setSearch={setSearch}/>

                    <div className="flex gap-6">
                        <div className="toggle flex items-center">
                            <input type="checkbox" />
                            <label></label>
                        </div>

                        <div className="relative profile h-16 w-16 md:h-14 md:w-14 rounded-full" style={{ backgroundImage: "url(../../src/assets/images/profile.png)", backgroundSize: "cover", backgroundPosition: "center" }}>
                            <div className="bg-[#f4f4f4] email px-3 py-1 rounded-md absolute top-14 right-0 text-[#737171] text-[13px]">{email}</div>
                        </div>
                    </div>
                </div>


                <div className="flex flex-col w-full overflow-y-scroll">
                    {
                        showDashboard &&
                        <Dashboard/>
                    }
                    {
                        showTable && 
                        <ListUser value={value}/>
                    }
                    {
                        showAdminPayment && 
                        <AdminPayment/>
                    }
                    {
                        showReportUser && 
                        <ReportUser value={value}/>
                    }
                    {
                        showFeedbacks && 
                        <ListFeedback/>
                    }

                    {
                        showSales && 
                        <Sales/>
                    }

                </div>
            </div>

        </div>
    )
}
