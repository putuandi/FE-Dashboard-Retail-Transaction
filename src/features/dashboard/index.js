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
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);


// const statsData = [
//     { title: "Total Sales", value: "Rp 10.172.023", icon: <CreditCardIcon className='w-8 h-8' />, description: "Current year" },
//     { title: "Total Transaction", value: "5.592", icon: <ShoppingCartIcon className='w-8 h-8' />, description: "Current year" },
//     { title: "Product Sold", value: "1.569", icon: <ShoppingBagIcon className='w-8 h-8' />, description: "Current year" },
//     // {title : "Pending Leads", value : "450", icon : <CircleStackIcon className='w-8 h-8'/>, description : "50 in hot leads"},
//     // {title : "Active Users", value : "5.6k", icon : <UsersIcon className='w-8 h-8'/>, description : "↙ 300 (18%)"},
//     { title: "New Membership", value: "2,5k", icon: <UsersIcon className='w-8 h-8' />, description: "↗︎ 2500 (25%)" },
// ]

function Dashboard() {
    const [statsData, setStatsData] = useState([
        {
            title: "Total Sales",
            value: "",
            icon: <CreditCardIcon className='w-8 h-8' />,
            description: "Current year"
        },
        {
            title: "Total Transaction",
            value: "",
            icon: <ShoppingCartIcon className='w-8 h-8' />,
            description: "Current year"
        },
        {
            title: "Product Sold",
            value: "",
            icon: <ShoppingBagIcon className='w-8 h-8' />,
            description: "Current year"
        },
        {
            title: "New Membership",
            value: "",
            icon: <UsersIcon className='w-8 h-8' />,
            description: "↗︎ Increased from last year"
        }
    ]);
    const [dateRange, setDateRange] = useState({
        startDate: '2011-01-01',
        endDate: '2011-12-31',
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/dashboard/metrics', {
                    params: {
                        start_date: dateRange.startDate,
                        end_date: dateRange.endDate,
                    },
                });

                if (response.data.message === 'Dashboard metrics retrieved successfully') {
                    const { total_sales, total_transactions, products_sold, new_memberships } = response.data.data;

                    const updatedStats = statsData.map(stat => {
                        switch (stat.title) {
                            case "Total Sales":
                                return { ...stat, value: `£ ${total_sales.toLocaleString('id-ID')}` };
                            case "Total Transaction":
                                return { ...stat, value: total_transactions.toLocaleString('id-ID') };
                            case "Product Sold":
                                return { ...stat, value: products_sold.toLocaleString('id-ID') };
                            case "New Membership":
                                return { ...stat, value: new_memberships.toLocaleString('id-ID') };
                            default:
                                return stat;
                        }
                    });

                    setStatsData(updatedStats);
                } else {
                    console.error("Unexpected response status:", response.data.status);
                }
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchDashboardData();
    }, []);

    const dispatch = useDispatch()
    // const [selectedAlgorithm, setSelectedAlgorithm] = useState("kmeans");

    // const [clusteringData, setClusteringData] = useState({
    //     kMeans: [],
    //     dbscan: [],
    // });

    // useEffect(() => {
    //     const kMeansData = [
    //         { x: 5, y: 10, cluster: 1 },
    //         { x: 10, y: 20, cluster: 1 },
    //         { x: 15, y: 25, cluster: 2 },
    //         { x: 30, y: 35, cluster: 2 },
    //         { x: 25, y: 30, cluster: 3 },
    //         { x: 40, y: 45, cluster: 3 },
    //     ];

    //     const dbscanData = [
    //         { x: 10, y: 5, cluster: 0 },
    //         { x: 15, y: 10, cluster: 0 },
    //         { x: 30, y: 35, cluster: 1 },
    //         { x: 35, y: 40, cluster: 1 },
    //         { x: 50, y: 55, cluster: 2 },
    //         { x: 60, y: 65, cluster: 2 },
    //     ];

    //     setClusteringData({
    //         kMeans: kMeansData,
    //         dbscan: dbscanData,
    //     });
    // }, []);

    // const kMeansChartData = {
    //     datasets: [
    //         {
    //             label: 'K-Means Clustering',
    //             data: clusteringData.kMeans,
    //             backgroundColor: 'rgba(255, 99, 132, 0.6)',
    //             borderColor: 'rgba(255, 99, 132, 1)',
    //             borderWidth: 1,
    //             pointRadius: 5,
    //         }
    //     ]
    // };

    // const dbscanChartData = {
    //     datasets: [
    //         {
    //             label: 'DBSCAN Clustering',
    //             data: clusteringData.dbscan,
    //             backgroundColor: 'rgba(53, 162, 235, 0.6)',
    //             borderColor: 'rgba(53, 162, 235, 1)',
    //             borderWidth: 1,
    //             pointRadius: 5,
    //         }
    //     ]
    // };

    // const [customerData, setCustomerData] = useState([
    //     { no: 1, name: "Low Value Customers", popularity: 99.12, sales: "Rp 5.643.148" },
    //     { no: 2, name: "Occasuinal Shoppers", popularity: 0.71, sales: "Rp 1.232.694" },
    //     { no: 3, name: "Loyal Customers", popularity: 0.17, sales: "Rp 1.296.181" },
    // ]);

    // const [customerSegmentationDBSCAN, setCustomerSegmentationDBSCAN] = useState([
    //     { no: 1, name: "Low Value Customers", popularity: 53.02, sales: "Rp 4.827.924" },
    //     { no: 2, name: "Occasuinal Shoppers", popularity: 0.76, sales: "Rp 1.579.050" },
    //     { no: 3, name: "Loyal Customers", popularity: 0.047, sales: "Rp 1.107.054" },
    //     { no: 4, name: "Others", popularity: 46.18, sales: "Rp 1.111.420" },
    // ]);

    // const [customerData, setCustomerData] = useState([]);
    // const [customerSegmentationDBSCAN, setCustomerSegmentationDBSCAN] = useState([]);
    // const [evaluationMetricsKMEANS, setEvaluationMetricsKMEANS] = useState({
    //     silhouetteScore: null,
    //     daviesBouldinIndex: null,
    // });
    // const [evaluationMetricsDBSCAN, setEvaluationMetricsDBSCAN] = useState({
    //     silhouetteScore: null,
    //     daviesBouldinIndex: null,
    // });
    const [customerData, setCustomerData] = useState([]);
    const [evaluationMetrics, setEvaluationMetrics] = useState({
        silhouetteScore: null,
        daviesBouldinIndex: null,
    });
    const [selectedAlgorithm, setSelectedAlgorithm] = useState('kmeans');
    const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    //     const fetchSegmentationData = async () => {
    //         try {
    //             const response = await axios.get('http://127.0.0.1:8000/dashboard/segmentation', {
    //                 params: {
    //                     // start_date: dateRange.startDate,
    //                     // end_date: dateRange.endDate,
    //                     // model: selectedAlgorithm.toLowerCase(),
    //                     start_date: "2011-01-01",
    //                     end_date: "2011-01-31",
    //                     model: "kmeans"
    //                 },
    //             });
    //             console.log("ini segmentation:", response.data)
    //             console.log("Start date:", dateRange.startDate);
    //             console.log("End date:", dateRange.endDate);
    //             console.log("Selected Algorithm:", selectedAlgorithm);


    //             if (response.data.status === 'success') {
    //                 const { segmentation } = response.data.data.segmentation;
    //                 const { evaluation } = response.data.data.evaluation;
    //                 const { algorithm } = response.data.data.algorithm;

    //                 // if (selectedAlgorithm === algorithm) {
    //                 //     setCustomerData(
    //                 //         segmentation.map((segment, index) => ({
    //                 //             no: index + 1,
    //                 //             name: segment.rfm_category,
    //                 //             popularity: segment.count,
    //                 //             sales: segment.total_revenue.toLocaleString('id-ID'),
    //                 //         }))
    //                 //     );

    //                 //     setEvaluationMetrics({
    //                 //         silhouetteScore: evaluation.silhouette_score,
    //                 //         daviesBouldinIndex: evaluation.davies_bouldin_index,
    //                 //     });
    //                 // }

    //                 if (algorithm === 'kmeans') {
    //                     setCustomerData(
    //                         segmentation.map((segment, index) => ({
    //                             no: index + 1,
    //                             name: segment.rfm_category,
    //                             popularity: segment.count,
    //                             sales: `Rp ${parseFloat(segment.total_revenue).toLocaleString('id-ID')}`,
    //                         }))
    //                     );

    //                     setEvaluationMetricsKMEANS({
    //                         silhouetteScore: evaluation.silhouette_score,
    //                         daviesBouldinIndex: evaluation.davies_bouldin_index,
    //                     });
    //                 }

    //                 if (algorithm === 'dbscan') {
    //                     setCustomerSegmentationDBSCAN(
    //                         segmentation.map((segment, index) => ({
    //                             no: index + 1,
    //                             name: segment.rfm_category,
    //                             popularity: segment.count,
    //                             sales: `Rp ${parseFloat(segment.total_revenue).toLocaleString('id-ID')}`,
    //                         }))
    //                     );

    //                     setEvaluationMetricsDBSCAN({
    //                         silhouetteScore: evaluation.silhouette_score,
    //                         daviesBouldinIndex: evaluation.davies_bouldin_index,
    //                     });
    //                 }

    //                 console.log("Segmentation data:", segmentation);
    //                 console.log("Evaluation metrics:", evaluation);
    //             }
    //         } catch (error) {
    //             console.error("Error fetching segmentation data:", error);
    //         }
    //     };

    //     fetchSegmentationData();
    // }, []);

    const fetchSegmentationData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://127.0.0.1:8000/dashboard/segmentation', {
                params: {
                    // start_date: "2011-01-01",
                    // end_date: "2011-01-31",
                    start_date: dateRange.startDate,
                    end_date: dateRange.endDate,
                    model: selectedAlgorithm.toLowerCase(),
                },
            });

            if (response.data?.data) {
                const { segmentation, evaluation } = response.data.data;
                const totalCount = segmentation.reduce((total, segment) => total + segment.count, 0);

                setCustomerData(segmentation.map((segment, index) => ({
                    no: index + 1,
                    name: segment.rfm_category,
                    popularity: segment.count,
                    percentage: totalCount > 0 ? ((segment.count / totalCount) * 100).toFixed(2) : "0.00",
                    sales: `£ ${parseFloat(segment.total_revenue).toLocaleString('id-ID')}`,
                })));

                setEvaluationMetrics({
                    silhouetteScore: evaluation.silhouette_score,
                    daviesBouldinIndex: evaluation.davies_bouldin_index,
                });
            }
        } catch (error) {
            console.error("Error fetching segmentation data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSegmentationData();
    }, [selectedAlgorithm]);

    const handleAlgorithmChange = (event) => {
        setSelectedAlgorithm(event.target.value);
    };

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

    // const updateDashboardPeriod = (newRange) => {
    //     dispatch(showNotification({ message: `Period updated to ${newRange.startDate} to ${newRange.endDate}`, status: 1 }))
    // }

    const updateDashboardPeriod = (newRange) => {
        setDateRange({
            startDate: newRange.startDate,
            endDate: newRange.endDate,
        });

        dispatch(showNotification({
            message: `Period updated to ${newRange.startDate} to ${newRange.endDate}`,
            status: 1,
        }));
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

            {/* <div className="mt-10">
                <h2 className="text-lg font-bold">Statistics</h2>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    {statsData.map((stat, index) => (
                        <div key={index} className="p-4 bg-gray-100 rounded shadow flex items-center">
                            {stat.icon}
                            <div className="ml-4">
                                <h3 className="text-md font-semibold">{stat.title}</h3>
                                <p className="text-gray-700">{stat.value}</p>
                                <small className="text-gray-500">{stat.description}</small>
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}

            {/* Customers Segments */}
            {/* <div className="rounded-lg p-4 mt-10 mb-4 bg-base-100 shadow-xl">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-lg font-bold">Customer Segments</h1>
                    <select
                        value={selectedAlgorithm}
                        onChange={handleAlgorithmChange}
                        className="select select-bordered w-36"
                    >
                        <option value="kmeans">K-Means</option>
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
                        {selectedAlgorithm === "kmeans" && (
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

                {selectedAlgorithm === "kmeans" && (
                    <div className="mt-6">
                        <h2 className="text-lg font-bold">K-Means Metric</h2>
                        <p>1. Silhouette Score: <span className="font-bold">{evaluationMetricsKMEANS.silhouetteScore?.toFixed(2)}</span>.</p>
                        <p>2. Davies-Bouldin Index: <span className="font-bold">{evaluationMetricsKMEANS.daviesBouldinIndex?.toFixed(2)}</span>.</p>
                        {/* <div className="mt-4">
                            <h3 className="text-md font-bold">K-Means Clustering Distribution</h3>
                            <div className="mt-2">
                                <div className="w-full h-64 flex items-center justify-center">
                                    <span className="">Graph Placeholder</span>
                                </div>
                            </div>
                        </div> 
                    </div>
                )}
                {selectedAlgorithm === "dbscan" && (
                    <div className="mt-6">
                        <h2 className="text-lg font-bold">DBSCAN Metric :</h2>
                        <p>1. Silhouette Score: <span className="font-bold">{evaluationMetricsDBSCAN.silhouetteScore?.toFixed(2)}</span>.</p>
                        <p>2. Davies-Bouldin Index: <span className="font-bold">{evaluationMetricsDBSCAN.daviesBouldinIndex?.toFixed(2)}</span>.</p>
                        {/* <div className="mt-4">
                            <h3 className="text-md font-bold">DBSCAN Clustering Distribution</h3>
                            <div className="mt-2">
                                <div className="w-full h-64 flex items-center justify-center">
                                    <span className="">Graph Placeholder</span>
                                </div>
                            </div>
                        </div> 
                    </div>
                )}
            </div> */}

            <div className="rounded-lg p-4 mt-10 mb-4 bg-base-100 shadow-xl">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-lg font-bold">Customer Segments</h1>
                    <select
                        value={selectedAlgorithm}
                        onChange={handleAlgorithmChange}
                        className="select select-bordered w-36"
                    >
                        <option value="kmeans">K-Means</option>
                        <option value="dbscan">DBSCAN</option>
                    </select>
                </div>

                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <table className="w-full text-left">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b border-gray-500">#</th>
                                    <th className="px-4 py-2 border-b border-gray-500">Name</th>
                                    <th className="px-4 py-2 border-b border-gray-500">Percentage</th>
                                    <th className="px-4 py-2 border-b border-gray-500">Sales</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customerData.map((customer, index) => (
                                    <tr key={index} className="hover:bg-gray-950 hover:text-white">
                                        <td className="px-4 py-4 border-t border-gray-500">{customer.no}</td>
                                        <td className="px-4 py-4 border-t border-gray-500">{customer.name}</td>
                                        <td className="px-4 py-4 border-t border-gray-500">
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-blue-500 h-2 rounded-full"
                                                    style={{ width: `${customer.percentage}%` }}
                                                >
                                                </div>
                                                <div>
                                                    <p className='mt-[1px] text-start'>{`${customer.percentage} %`}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 border-t border-gray-500">{customer.sales}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="mt-6">
                            <h2 className="text-lg font-bold">Evaluation Metrics</h2>
                            <p>1. Silhouette Score: <span className="font-bold">{evaluationMetrics.silhouetteScore?.toFixed(2)}</span>.</p>
                            <p>2. Davies-Bouldin Index: <span className="font-bold">{evaluationMetrics.daviesBouldinIndex?.toFixed(2)}</span>.</p>
                        </div>
                    </>
                )}
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
            {/* <div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6">
                <div className="rounded-lg p-4 bg-base-100 shadow-xl">
                    <h2 className="text-lg font-bold mb-4">K-Means Clustering</h2>
                    <Scatter data={kMeansChartData} />
                </div>
                <div className="rounded-lg p-4 bg-base-100 shadow-xl">
                    <h2 className="text-lg font-bold mb-4">DBSCAN Clustering</h2>
                    <Scatter data={dbscanChartData} />
                </div>
            </div> */}

            {/** ---------------------- Different charts ------------------------- */}
            {/* <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <LineChart />
                <BarChart />
            </div> */}

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