import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../features/common/headerSlice';
import Select from 'react-select';
import axios from 'axios';

function InternalPage() {
    const dispatch = useDispatch();
    const [currentDate, setCurrentDate] = useState('');
    const [transaction_details, setTransaction_details] = useState([{ product_id: '', price_per_unit: "", quantity: "" }]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/products');
                const productsOptions = response.data.data.map(product => ({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                }));
                setProducts(productsOptions);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
            // const productData = [
            //     { id: '1', name: 'Product A', price: 10000 },
            //     { id: '2', name: 'Product B', price: 15000 },
            //     { id: '3', name: 'Product C', price: 20000 },
            // ];
            // setProducts(productData);
        };

        fetchProducts();
        setCurrentDate(new Date().toISOString().split('T')[0]);
    }, []);

    const handleItemChange = (index, field, value) => {
        const newItems = [...transaction_details];
        if (field === 'product_id') {
            if (newItems.some((item, i) => i !== index && item.product_id === value)) {
                alert('Produk ini sudah dipilih sebelumnya.');
                return;
            }
            const selectedProduct = products.find(product => product.id === value);
            newItems[index].product_id = value;
            newItems[index].price_per_unit = selectedProduct.price;
            // newItems[index].totalPrice = selectedProduct.price * newItems[index].quantity;
        } else if (field === 'quantity') {
            newItems[index].quantity = value;
            // newItems[index].totalPrice = newItems[index].productPrice * value;
        }
        setTransaction_details(newItems);
    };

    const addItem = () => {
        setTransaction_details([...transaction_details, { product_id: '', price_per_unit: "", quantity: "" }]);
    };

    useEffect(() => {
        dispatch(setPageTitle({ title: "Kasir Toko" }));
    }, []);

    const validateForm = () => {
        // if (!selectedCustomer.trim()) {
        //     alert('Selected pelanggan tidak boleh kosong');
        //     return false;
        // }
        for (const item of transaction_details) {
            if (!item.product_id || !item.quantity) {
                alert('Pastikan produk dan jumlah pesanan terisi');
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const transactionData = {
            membership_id: selectedCustomer,
            date: currentDate,
            transaction_details,
        };

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(transactionData),
            });

            if (response.ok) {
                console.log(transactionData)
                alert('Transaksi berhasil disimpan.');
                setTransaction_details([{ product_id: '', price_per_unit: "", quantity: "" }]);
            } else {
                throw new Error('Gagal menyimpan transaksi.');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/memberships');
                const customerOptions = response.data.data.map(membership => ({
                    value: membership.id,
                    label: `${membership.name} (${membership.id})`
                }));
                setCustomers(customerOptions);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };
        fetchCustomers();
    }, []);
    const handleSelectChange = (selectedOption) => {
        setSelectedCustomer(selectedOption);
        console.log('Selected customer:', selectedOption);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="bg-base-100 p-6 rounded shadow-lg">
                <div className="mb-4">
                    <label className="block mb-2">Tanggal</label>
                    <input
                        type="date"
                        value={currentDate}
                        onChange={(e) => setCurrentDate(e.target.value)}
                        className="w-full p-2 border bg-base-100 rounded"
                        readOnly
                    />
                </div>

                <div className="w-full">
                    <label className="block mb-2">Pilih Pelanggan Membership</label>
                    <Select
                        value={selectedCustomer}
                        onChange={handleSelectChange}
                        options={customers}
                        isSearchable
                        placeholder="Cari Pelanggan Membership"
                    />
                </div>

                {transaction_details.map((item, index) => (
                    <div key={index} className="mb-4 border-t pt-4">
                        <div className="mb-4">
                            <label className="block mb-2">Nama Produk</label>
                            <select
                                value={item.product_id}
                                onChange={(e) => handleItemChange(index, 'product_id', e.target.value)}
                                className="w-full p-2 border bg-base-100 rounded"
                            >
                                <option value="">Pilih Produk</option>
                                {products.map((product) => (
                                    <option key={product.id} value={product.id}>
                                        {product.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2">Harga Item</label>
                            <input
                                type="text"
                                value={item.price_per_unit.toLocaleString('id-ID')}
                                readOnly
                                className="w-full p-2 border bg-base-100 rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2">Jumlah Pesanan</label>
                            <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                                className="w-full p-2 border bg-base-100 rounded"
                                min="1"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2">Total Harga</label>
                            <input
                                type="text"
                                value={(item.price_per_unit * item.quantity).toLocaleString('id-ID')}
                                readOnly
                                className="w-full p-2 border bg-base-100 rounded"
                            />
                        </div>
                    </div>
                ))}

                <div className='flex flex-row space-x-6 pt-4'>
                    <button
                        type="button"
                        onClick={addItem}
                        className="w-full bg-green-500 text-white rounded hover:bg-green-600 px-2 py-3"
                    >
                        Tambah Item
                    </button>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white rounded hover:bg-blue-600 px-2 py-3"
                    >
                        Simpan Transaksi
                    </button>
                </div>
            </form>
        </div>
    );
}

export default InternalPage;

