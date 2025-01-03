import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../features/common/headerSlice';

function InternalPage() {
    const dispatch = useDispatch();
    const [currentDate, setCurrentDate] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [items, setItems] = useState([{ productType: '', productPrice: "", quantity: "", totalPrice: "" }]);
    const [products, setProducts] = useState([]);
    const [existingCustomer, setExistingCustomer] = useState(null);
    // const [selectedCustomer, setSelectedCustomer] = useState(null);

    const dummyCustomers = [
        { id: 'C001', name: 'Putu', phone: '081234567890' },
        { id: 'C002', name: 'Made', phone: '082345678901' },
        { id: 'C003', name: 'Nyoman', phone: '083456789012' },
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            const productData = [
                { id: '1', name: 'Product A', price: 10000 },
                { id: '2', name: 'Product B', price: 15000 },
                { id: '3', name: 'Product C', price: 20000 },
            ];
            setProducts(productData);
        };

        fetchProducts();
        setCurrentDate(new Date().toISOString().split('T')[0]);
    }, []);

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        if (field === 'productType') {
            if (newItems.some((item, i) => i !== index && item.productType === value)) {
                alert('Produk ini sudah dipilih sebelumnya.');
                return;
            }
            const selectedProduct = products.find(product => product.id === value);
            newItems[index].productType = value;
            newItems[index].productPrice = selectedProduct.price;
            newItems[index].totalPrice = selectedProduct.price * newItems[index].quantity;
        } else if (field === 'quantity') {
            newItems[index].quantity = value;
            newItems[index].totalPrice = newItems[index].productPrice * value;
        }
        setItems(newItems);
    };

    const addItem = () => {
        setItems([...items, { productType: '', productPrice: "", quantity: "", totalPrice: "" }]);
    };

    useEffect(() => {
        dispatch(setPageTitle({ title: "Kasir Toko" }));
    }, []);

    const validateForm = () => {
        if (!customerName.trim()) {
            alert('ID / Nama pelanggan tidak boleh kosong.');
            return false;
        }
        for (const item of items) {
            if (!item.productType || !item.quantity) {
                alert('Pastikan jenis produk dan jumlah pesanan terisi.');
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const transactionData = {
            date: currentDate,
            pelanggan: customerName,
            items,
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
                setCustomerName('');
                setItems([{ productType: '', productPrice: "", quantity: "", totalPrice: "" }]);
            } else {
                throw new Error('Gagal menyimpan transaksi.');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const handleCustomerSearch = async () => {
        if (!customerName.trim()) {
            setExistingCustomer(null);
            return;
        }

        // try {
        //     const response = await fetch(`https://your-api.com/customers?name=${customerName}`);
        //     if (response.ok) {
        //         const customerData = await response.json();
        //         if (customerData.length > 0) {
        //             setExistingCustomer(customerData[0]);
        //         } else {
        //             setExistingCustomer(null);
        //         }
        //     }
        // } catch (error) {
        //     console.error("Error fetching customer:", error);
        // }
        const foundCustomer = dummyCustomers.find(customer => customer.id.toLowerCase().includes(customerName.toLowerCase()));
        if (foundCustomer) {
            setExistingCustomer(foundCustomer);
        } else {
            setExistingCustomer(null);
        }
    };

    useEffect(() => {
        handleCustomerSearch();
    }, [customerName]);

    // const handleCustomerSelect = (e) => {
    //     const selectedId = e.target.value;
    //     if (selectedId) {
    //         const foundCustomer = dummyCustomers.find(customer => customer.id === selectedId);
    //         setSelectedCustomer(foundCustomer);
    //     } else {
    //         setSelectedCustomer(null);
    //     }
    // };

    // const handleManualCustomerInput = (e) => {
    //     setCustomerName(e.target.value);
    //     setSelectedCustomer(null);
    // };


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

                {/* <div className="mb-4">
                    <label className="block mb-2">ID / Nama Pelanggan</label>
                    <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Masukkan ID atau Nama"
                        className="w-full p-2 border bg-base-100 rounded"
                    />
                </div> */}

                <div className="mb-4">
                    <label className="block mb-2">ID / Nama Pelanggan</label>
                    <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        onBlur={handleCustomerSearch}
                        placeholder="Masukkan ID atau Nama"
                        className="w-full p-2 border bg-base-100 rounded"
                    />
                    {existingCustomer && (
                        <div className="mt-2 text-green-500">
                            Pelanggan ditemukan: {existingCustomer.name}
                        </div>
                    )}
                    {!existingCustomer && customerName && (
                        <div className="mt-2 text-red-500">
                            Pelanggan tidak ditemukan, silakan masukkan secara manual.
                        </div>
                    )}
                </div>

                {/* <div className="mb-4">
                    <label className="block mb-2">ID / Nama Pelanggan</label>
                    <div className="flex space-x-4">
                        <select
                            value={selectedCustomer ? selectedCustomer.id : ''}
                            onChange={handleCustomerSelect}
                            className="w-full p-2 border bg-base-100 rounded"
                            disabled={customerName.trim() !== ''}
                        >
                            <option value="">Pilih Pelanggan Membership</option>
                            {dummyCustomers.map((customer) => (
                                <option key={customer.id} value={customer.id}>
                                    {customer.name} ({customer.phone})
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            value={customerName}
                            onChange={handleManualCustomerInput}
                            placeholder="Masukkan Nama Pelanggan Non-Membership"
                            className="w-full p-2 border bg-base-100 rounded"
                            disabled={selectedCustomer !== null}
                        />
                    </div>
                    {selectedCustomer && (
                        <div className="mt-2 text-green-500">
                            Pelanggan Membership Terpilih: {selectedCustomer.name} ({selectedCustomer.phone})
                        </div>)}
                    {!selectedCustomer && customerName && (
                        <div className="mt-2 text-yellow-500">
                            Pelanggan Non Membership Terpilih : {customerName}
                        </div>
                    )}
                </div> */}

                {items.map((item, index) => (
                    <div key={index} className="mb-4 border-t pt-4">
                        <div className="mb-4">
                            <label className="block mb-2">Jenis Produk</label>
                            <select
                                value={item.productType}
                                onChange={(e) => handleItemChange(index, 'productType', e.target.value)}
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
                                value={item.productPrice.toLocaleString('id-ID')}
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
                                value={item.totalPrice.toLocaleString('id-ID')}
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

