// import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { setPageTitle } from '../../features/common/headerSlice';

// function Memberships({ onAddMembership }) {
//     const dispatch = useDispatch();
//     const [membershipName, setMembershipName] = useState('');
//     const [membershipPhone, setMembershipPhone] = useState('');
//     const [memberships, setMemberships] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const handleAddMembership = async () => {
//         if (!membershipName || !membershipPhone) {
//             alert('Nama dan nomor telepon harus diisi.');
//             return;
//         }

//         const newMembership = { name: membershipName, phone: membershipPhone };

//         try {
//             setLoading(true);
//             const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(newMembership),
//             });

//             if (!response.ok) {
//                 throw new Error('Gagal menambahkan membership');
//             }

//             const result = await response.json();
//             setMemberships([...memberships, result]); // Assuming the API returns the new membership
//             setMembershipName('');
//             setMembershipPhone('');
//             onAddMembership(result);
//         } catch (error) {
//             setError(error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         dispatch(setPageTitle({ title: "Memberships" }));
//     }, []);

//     return (
//         <div className="bg-base-100 p-6 rounded shadow-lg">
//             <div className="mb-4">
//                 <label className="block mb-2">Nama</label>
//                 <input
//                     type="text"
//                     value={membershipName}
//                     onChange={(e) => setMembershipName(e.target.value)}
//                     placeholder="Masukkan Nama"
//                     className="w-full p-2 border bg-base-100 rounded"
//                 />
//             </div>

//             <div className="mb-4">
//                 <label className="block mb-2">Nomor Telepon</label>
//                 <input
//                     type="text"
//                     value={membershipPhone}
//                     onChange={(e) => setMembershipPhone(e.target.value)}
//                     placeholder="Masukkan Nomor Telepon"
//                     className="w-full p-2 border bg-base-100 rounded"
//                 />
//             </div>

//             <button
//                 type="button"
//                 onClick={handleAddMembership}
//                 className="w-full bg-blue-500 text-white rounded hover:bg-blue-600 px-2 py-3 mb-4"
//             >
//                 Tambah Membership
//             </button>

//             <hr />
//             <div className='mt-4'>
//                 <h3 className="text-md font-bold mb-4">Daftar Memberships:</h3>
//                 <ul>
//                     {memberships.map((membership, index) => (
//                         <li key={index} className="mb-2">
//                             {index + 1}. {membership.name} - {membership.phone}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// }

// export default Memberships;


import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setPageTitle } from '../../features/common/headerSlice';

function Memberships({ onAddMembership }) {
    const dispatch = useDispatch();
    const [membershipName, setMembershipName] = useState('');
    const [membershipPhone, setMembershipPhone] = useState('');
    const [memberships, setMemberships] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMemberships = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://127.0.0.1:8000/memberships');
                setMemberships(response.data.data);
            } catch (error) {
                setError('Gagal memuat data memberships');
            } finally {
                setLoading(false);
            }
        };

        fetchMemberships();
        dispatch(setPageTitle({ title: "Memberships" }));
    }, [dispatch]);

    // Add new membership
    const handleAddMembership = async () => {
        if (!membershipName || !membershipPhone) {
            alert('Nama dan nomor telepon harus diisi.');
            return;
        }

        const newMembership = { name: membershipName, phone: membershipPhone };

        try {
            setLoading(true);
            const response = await axios.post('http://127.0.0.1:8000/memberships', newMembership, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setMemberships([...memberships, response.data]); // Tambahkan data baru ke daftar
            setMembershipName('');
            setMembershipPhone('');
            onAddMembership(response.data);
        } catch (error) {
            setError('Gagal menambahkan membership');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-base-100 p-6 rounded shadow-lg">
            <div className="mb-4">
                <label className="block mb-2">Nama</label>
                <input
                    type="text"
                    value={membershipName}
                    onChange={(e) => setMembershipName(e.target.value)}
                    placeholder="Masukkan Nama"
                    className="w-full p-2 border bg-base-100 rounded"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2">Nomor Telepon</label>
                <input
                    type="text"
                    value={membershipPhone}
                    onChange={(e) => setMembershipPhone(e.target.value)}
                    placeholder="Masukkan Nomor Telepon"
                    className="w-full p-2 border bg-base-100 rounded"
                />
            </div>

            <button
                type="button"
                onClick={handleAddMembership}
                className="w-full bg-blue-500 text-white rounded hover:bg-blue-600 px-2 py-3 mb-4"
            >
                Tambah Membership
            </button>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <hr />
            <div className="mt-4">
                <h3 className="text-md font-bold mb-4">Daftar Memberships:</h3>
                <ul>
                    {memberships.map((membership, index) => (
                        <li key={membership.id} className="mb-2">
                            {index + 1}. {membership.name} - {membership.id}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Memberships;


