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
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const statsData = [
    { title: "Total Sales", value: "Rp 16.344.044", icon: <CreditCardIcon className='w-8 h-8' />, description: "Current year" },
    { title: "Total Transaction", value: "11.592", icon: <ShoppingCartIcon className='w-8 h-8' />, description: "Current year" },
    { title: "Product Sold", value: "1.569", icon: <ShoppingBagIcon className='w-8 h-8' />, description: "Current year" },
    // {title : "Pending Leads", value : "450", icon : <CircleStackIcon className='w-8 h-8'/>, description : "50 in hot leads"},
    // {title : "Active Users", value : "5.6k", icon : <UsersIcon className='w-8 h-8'/>, description : "↙ 300 (18%)"},
    { title: "New Membership", value: "2,5k", icon: <UsersIcon className='w-8 h-8' />, description: "↗︎ 2500 (25%)" },
]

function Dashboard() {
    const dispatch = useDispatch()
    const [selectedAlgorithm, setSelectedAlgorithm] = useState("kMeans");

    const [clusteringData, setClusteringData] = useState({
        kMeans: [],
        dbscan: [],
    });

    useEffect(() => {
        const kMeansData = [
            { x: 5, y: 10, cluster: 1 },
            { x: 10, y: 20, cluster: 1 },
            { x: 15, y: 25, cluster: 2 },
            { x: 30, y: 35, cluster: 2 },
            { x: 25, y: 30, cluster: 3 },
            { x: 40, y: 45, cluster: 3 },
        ];

        const dbscanData = [
            { x: 10, y: 5, cluster: 0 },
            { x: 15, y: 10, cluster: 0 },
            { x: 30, y: 35, cluster: 1 },
            { x: 35, y: 40, cluster: 1 },
            { x: 50, y: 55, cluster: 2 },
            { x: 60, y: 65, cluster: 2 },
        ];

        setClusteringData({
            kMeans: kMeansData,
            dbscan: dbscanData,
        });
    }, []);

    const kMeansChartData = {
        datasets: [
            {
                label: 'K-Means Clustering',
                data: clusteringData.kMeans,
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                pointRadius: 5,
            }
        ]
    };

    const dbscanChartData = {
        datasets: [
            {
                label: 'DBSCAN Clustering',
                data: clusteringData.dbscan,
                backgroundColor: 'rgba(53, 162, 235, 0.6)',
                borderColor: 'rgba(53, 162, 235, 1)',
                borderWidth: 1,
                pointRadius: 5,
            }
        ]
    };

    const [customerData, setCustomerData] = useState([
        { no: 1, name: "Low Value Customers", popularity: 99.12, sales: "Rp 5.643.148" },
        { no: 2, name: "Occasuinal Shoppers", popularity: 0.71, sales: "Rp 1.232.694" },
        { no: 3, name: "Loyal Customers", popularity: 0.17, sales: "Rp 1.296.181" },
    ]);

    const [customerSegmentationDBSCAN, setCustomerSegmentationDBSCAN] = useState([
        { no: 1, name: "Others", popularity: 55.98, sales: "Rp 1.111.420" },
        { no: 2, name: "Recent Customers", popularity: 13.05, sales: "Rp 579.050" },
        { no: 3, name: "Frequent Customers", popularity: 12.48, sales: "Rp 1.277.964" },
        { no: 4, name: "Best Customers", popularity: 9.97, sales: "Rp 1.827.924" },
        { no: 5, name: "Big Spenders", popularity: 4.40, sales: "Rp 465.964" },
        { no: 6, name: "Loyal Customers", popularity: 2.50, sales: "Rp 107.054" },
        { no: 7, name: "Noise", popularity: 1.64, sales: "Rp 2.802.645" },
    ]);

    // const [customerData, setCustomerData] = useState([]);
    // useEffect(() => {
    //     const fetchCustomerData = async () => {
    //         try {
    //             const response = await fetch("http://localhost:3000/api/customers"); // Replace with your API endpoint
    //             const data = await response.json();
    //             setCustomerData(data);
    //         } catch (error) {
    //             console.error("Error fetching customer data:", error);
    //         }
    //     };
    //     fetchCustomerData();
    // }, []);

    const updateDashboardPeriod = (newRange) => {
        // Dashboard range changed, write code to refresh your values
        dispatch(showNotification({ message: `Period updated to ${newRange.startDate} to ${newRange.endDate}`, status: 1 }))
    }

    const handleAlgorithmChange = (e) => {
        setSelectedAlgorithm(e.target.value);
    };

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

            {/* Customers Segments */}
            <div className="rounded-lg p-4 mt-10 mb-4 bg-base-100 shadow-xl">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-lg font-bold">Customer Segments</h1>
                    <select
                        value={selectedAlgorithm}
                        onChange={handleAlgorithmChange}
                        className="select select-bordered w-36"
                    >
                        <option value="kMeans">K-Means</option>
                        <option value="dbscan">DBSCAN</option>
                    </select>
                </div>
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
                        {selectedAlgorithm === "kMeans" && (
                            customerData.map((customer, index) => (
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
                            ))
                        )}
                        {selectedAlgorithm === "dbscan" && (
                            customerSegmentationDBSCAN.map((customer, index) => (
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
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {/* {selectedAlgorithm === "kMeans" && (
                <div className="rounded-lg p-4 bg-base-100 shadow-xl mt-4">
                    <h2 className="text-lg font-bold mb-4">K-Means Clustering</h2>
                    <Scatter data={kMeansChartData} />
                </div>
            )}
            {selectedAlgorithm === "dbscan" && (
                <div className="rounded-lg p-4 bg-base-100 shadow-xl mt-4">
                    <h2 className="text-lg font-bold mb-4">DBSCAN Clustering</h2>
                    <Scatter data={dbscanChartData} />
                </div>
            )} */}

            {/* Clustering Charts */}
            <div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6">
                <div className="rounded-lg p-4 bg-base-100 shadow-xl">
                    <h2 className="text-lg font-bold mb-4">K-Means Clustering</h2>
                    <Scatter data={kMeansChartData} />
                </div>
                <div className="rounded-lg p-4 bg-base-100 shadow-xl">
                    <h2 className="text-lg font-bold mb-4">DBSCAN Clustering</h2>
                    <Scatter data={dbscanChartData} />
                </div>
            </div>

            {/** ---------------------- Different charts ------------------------- */}
            <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <LineChart />
                <BarChart />
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