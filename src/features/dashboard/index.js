import DashboardStats from './components/DashboardStats'
import AmountStats from './components/AmountStats'
import PageStats from './components/PageStats'

import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import CircleStackIcon from '@heroicons/react/24/outline/CircleStackIcon'
import ShoppingBagIcon from '@heroicons/react/24/outline/ShoppingBagIcon'
import ShoppingCartIcon from '@heroicons/react/24/outline/ShoppingCartIcon'
import CreditCardIcon from '@heroicons/react/24/outline/CreditCardIcon'
import ChartBarIcon from '@heroicons/react/24/outline/ChartBarIcon'
import UserChannels from './components/UserChannels'
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import DashboardTopBar from './components/DashboardTopBar'
import { useDispatch } from 'react-redux'
import { showNotification } from '../common/headerSlice'
import DoughnutChart from './components/DoughnutChart'
import { useState, useEffect } from 'react'

const statsData = [
    { title: "Total Sales", value: "$34,545", icon: <CreditCardIcon className='w-8 h-8' />, description: "Current month" },
    { title: "Total Transaction", value: "500", icon: <ShoppingCartIcon className='w-8 h-8' />, description: "Current month" },
    { title: "Product Sold", value: "100", icon: <ShoppingBagIcon className='w-8 h-8' />, description: "Current month" },
    // {title : "Pending Leads", value : "450", icon : <CircleStackIcon className='w-8 h-8'/>, description : "50 in hot leads"},
    // {title : "Active Users", value : "5.6k", icon : <UsersIcon className='w-8 h-8'/>, description : "↙ 300 (18%)"},
    { title: "New Membership", value: "1,5k", icon: <UsersIcon className='w-8 h-8' />, description: "↗︎ 2300 (22%)" },
]

function Dashboard() {
    const dispatch = useDispatch()

    // const [customerData, setCustomerData] = useState([
    //     { no: 1, name: "Big Spenders", popularity: 80, sales: "$10,000" },
    //     { no: 2, name: "Low Frequent Spenders", popularity: 70, sales: "$8,000" },
    //     { no: 3, name: "Recent Customers", popularity: 90, sales: "$12,000" },
    //     { no: 4, name: "At Risks", popularity: 60, sales: "$7,000" },
    // ]);

    const [customerData, setCustomerData] = useState([]);
    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/customers"); // Replace with your API endpoint
                const data = await response.json();
                setCustomerData(data);
            } catch (error) {
                console.error("Error fetching customer data:", error);
            }
        };
        fetchCustomerData();
    }, []);

    const updateDashboardPeriod = (newRange) => {
        // Dashboard range changed, write code to refresh your values
        dispatch(showNotification({ message: `Period updated to ${newRange.startDate} to ${newRange.endDate}`, status: 1 }))
    }

    return (
        <>
            {/** ---------------------- Select Period Content ------------------------- */}
            <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod} />
            {/** ---------------------- Different stats content 1 ------------------------- */}
            <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
                {
                    statsData.map((d, k) => {
                        return (
                            <DashboardStats key={k} {...d} colorIndex={k} />
                        )
                    })
                }
            </div>

            {/** ---------------------- Different charts ------------------------- */}
            <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <LineChart />
                <BarChart />
            </div>

            {/* Customers Segments */}
            <div className="rounded-lg p-4 mt-10 mb-4 bg-base-100 shadow-xl">
                <h1 className="mb-4 text-lg font-bold">Customer Segments</h1>
                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b border-gray-500">#</th>
                            <th className="px-4 py-2 border-b border-gray-500">Name</th>
                            <th className="px-4 py-2 border-b border-gray-500">Popularity</th>
                            <th className="px-4 py-2 border-b border-gray-500">Sales</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customerData.map((customer, index) => (
                            <tr key={index} className="hover:bg-gray-950 hover:text-white">
                                <td className="px-4 py-2 border-t border-gray-500">{customer.no}</td>
                                <td className="px-4 py-2 border-t border-gray-500">{customer.name}</td>
                                <td className="px-4 py-2 border-t border-gray-500">
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-500 h-2 rounded-full"
                                            style={{ width: `${customer.popularity}%` }}
                                        ></div>
                                    </div>
                                </td>
                                <td className="px-4 py-2 border-t border-gray-500">{customer.sales}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/** ---------------------- Different stats content 2 ------------------------- */}
            {/* <div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6">
                <AmountStats />
                <PageStats />
            </div> */}

            {/** ---------------------- User source channels table  ------------------------- */}
            {/* <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <UserChannels />
                <DoughnutChart />
            </div> */}
        </>
    )
}

export default Dashboard