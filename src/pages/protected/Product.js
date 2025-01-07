import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import axios from "axios";

function InternalPage() {
    const dispatch = useDispatch();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get("http://127.0.0.1:8000/products", {
                params: {
                    limit: pageSize,
                    offset: (currentPage - 1) * pageSize,
                },
            });
            setProducts(response.data.data);
        } catch (err) {
            setError("Gagal mengambil data produk.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        dispatch(setPageTitle({ title: "Product List" }));
        fetchProducts();
    }, [currentPage]);

    // Fungsi untuk mengatur navigasi halaman
    const handleNextPage = () => setCurrentPage((prevPage) => prevPage + 1);
    const handlePreviousPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

    return (
        <div className="bg-base-100 p-6 rounded shadow-lg">
            {/* <h1 className="text-xl font-bold mb-4">Product List</h1> */}

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Product ID</th>
                                <th>Product Name</th>
                                <th>Product Description</th>
                                <th>Product Stock</th>
                                <th>Product Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.stock}</td>
                                    <td>£ {product.price.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="flex justify-between mt-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="btn btn-outline btn-sm"
                >
                    Previous
                </button>
                <span>Page {currentPage}</span>
                <button
                    onClick={handleNextPage}
                    className="btn btn-outline btn-sm"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default InternalPage;
