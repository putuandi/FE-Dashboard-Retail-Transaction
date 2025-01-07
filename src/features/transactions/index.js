// import moment from "moment"
// import { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { showNotification } from "../common/headerSlice"
// import TitleCard from "../../components/Cards/TitleCard"
// import { RECENT_TRANSACTIONS } from "../../utils/dummyData"
// import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon'
// import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
// import SearchBar from "../../components/Input/SearchBar"

// const TopSideButtons = ({removeFilter, applyFilter, applySearch}) => {

//     const [filterParam, setFilterParam] = useState("")
//     const [searchText, setSearchText] = useState("")
//     const locationFilters = ["Paris", "London", "Canada", "Peru", "Tokyo"]

//     const showFiltersAndApply = (params) => {
//         applyFilter(params)
//         setFilterParam(params)
//     }

//     const removeAppliedFilter = () => {
//         removeFilter()
//         setFilterParam("")
//         setSearchText("")
//     }

//     useEffect(() => {
//         if(searchText == ""){
//             removeAppliedFilter()
//         }else{
//             applySearch(searchText)
//         }
//     }, [searchText])

//     return(
//         <div className="inline-block float-right">
//             <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText}/>
//             {filterParam != "" && <button onClick={() => removeAppliedFilter()} className="btn btn-xs mr-2 btn-active btn-ghost normal-case">{filterParam}<XMarkIcon className="w-4 ml-2"/></button>}
//             <div className="dropdown dropdown-bottom dropdown-end">
//                 <label tabIndex={0} className="btn btn-sm btn-outline"><FunnelIcon className="w-5 mr-2"/>Filter</label>
//                 <ul tabIndex={0} className="dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-52">
//                     {
//                         locationFilters.map((l, k) => {
//                             return  <li key={k}><a onClick={() => showFiltersAndApply(l)}>{l}</a></li>
//                         })
//                     }
//                     <div className="divider mt-0 mb-0"></div>
//                     <li><a onClick={() => removeAppliedFilter()}>Remove Filter</a></li>
//                 </ul>
//             </div>
//         </div>
//     )
// }


// function Transactions(){


//     const [trans, setTrans] = useState(RECENT_TRANSACTIONS)

//     const removeFilter = () => {
//         setTrans(RECENT_TRANSACTIONS)
//     }

//     const applyFilter = (params) => {
//         let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => {return t.location == params})
//         setTrans(filteredTransactions)
//     }

//     // Search according to name
//     const applySearch = (value) => {
//         let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => {return t.email.toLowerCase().includes(value.toLowerCase()) ||  t.email.toLowerCase().includes(value.toLowerCase())})
//         setTrans(filteredTransactions)
//     }

//     return(
//         <>

//             <TitleCard title="Recent Transactions" topMargin="mt-2" TopSideButtons={<TopSideButtons applySearch={applySearch} applyFilter={applyFilter} removeFilter={removeFilter}/>}>

//                 {/* Team Member list in table format loaded constant */}
//             <div className="overflow-x-auto w-full">
//                 <table className="table w-full">
//                     <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Email Id</th>
//                         <th>Location</th>
//                         <th>Amount</th>
//                         <th>Transaction Date</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             trans.map((l, k) => {
//                                 return(
//                                     <tr key={k}>
//                                     <td>
//                                         <div className="flex items-center space-x-3">
//                                             <div className="avatar">
//                                                 <div className="mask mask-circle w-12 h-12">
//                                                     <img src={l.avatar} alt="Avatar" />
//                                                 </div>
//                                             </div>
//                                             <div>
//                                                 <div className="font-bold">{l.name}</div>
//                                             </div>
//                                         </div>
//                                     </td>
//                                     <td>{l.email}</td>
//                                     <td>{l.location}</td>
//                                     <td>${l.amount}</td>
//                                     <td>{moment(l.date).format("D MMM")}</td>
//                                     </tr>
//                                 )
//                             })
//                         }
//                     </tbody>
//                 </table>
//             </div>
//             </TitleCard>
//         </>
//     )
// }


// export default Transactions

import moment from "moment";
import { useEffect, useState } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import SearchBar from "../../components/Input/SearchBar";
import axios from "axios";

const TopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {
    const [filterParam, setFilterParam] = useState("");
    const [searchText, setSearchText] = useState("");

    const showFiltersAndApply = (params) => {
        applyFilter(params);
        setFilterParam(params);
    };

    const removeAppliedFilter = () => {
        removeFilter();
        setFilterParam("");
        setSearchText("");
    };

    useEffect(() => {
        if (searchText === "") {
            removeAppliedFilter();
        } else {
            applySearch(searchText);
        }
    }, [searchText]);

    return (
        <div className="inline-block float-right">
            <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText} />
            {filterParam !== "" && (
                <button
                    onClick={() => removeAppliedFilter()}
                    className="btn btn-xs mr-2 btn-active btn-ghost normal-case"
                >
                    {filterParam}
                    <XMarkIcon className="w-4 ml-2" />
                </button>
            )}
            <div className="dropdown dropdown-bottom dropdown-end">
                <label tabIndex={0} className="btn btn-sm btn-outline">
                    <FunnelIcon className="w-5 mr-2" />
                    Filter
                </label>
            </div>
        </div>
    );
};

function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTransactions = async (limit = 100, offset = 0) => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/transactions", {
                params: { limit, offset },
            });
            const data = response.data.data.slice(0, 100);
            setTransactions(data);
            setFilteredTransactions(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions(); // Fetch dengan batas default
    }, []);

    const removeFilter = () => {
        setFilteredTransactions(transactions);
    };

    const applyFilter = (params) => {
        const filtered = transactions.filter((t) => t.id === params);
        setFilteredTransactions(filtered);
    };

    const applySearch = (value) => {
        const filtered = transactions.filter((t) =>
            t.id.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredTransactions(filtered);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <TitleCard
                title="Recent Transactions"
                topMargin="mt-2"
                TopSideButtons={
                    <TopSideButtons
                        applySearch={applySearch}
                        applyFilter={applyFilter}
                        removeFilter={removeFilter}
                    />
                }
            >
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Transaction Date</th>
                                <th>Transaction ID</th>
                                <th>Customer ID</th>
                                <th>Membership ID</th>
                                <th>Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.map((transaction) => (
                                <tr key={transaction.id}>
                                    <td>{moment(transaction.date).format("D MMM YYYY")}</td>
                                    <td>{transaction.id}</td>
                                    <td>{transaction.customer_id}</td>
                                    <td>{transaction.membership_id}</td>
                                    <td>£ {transaction.total_amount.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </>
    );
}

export default Transactions;

