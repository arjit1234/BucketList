import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const BucketList = () => {
    const navigate = useNavigate();
    const [buckets, setBuckets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 6;

    const fetchBuckets = async () => {
        try {
            const response = await axios.get('/api/manage');
            setBuckets(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchBuckets();
    }, []);

    const handleOpenModal = () => {
        document.getElementById('myModal').style.display = 'flex';
    };

    const handleCloseModal = () => {
        document.getElementById('myModal').style.display = 'none';
    };

    const handleWindowClick = (event) => {
        if (event.target === document.getElementById('myModal')) {
            document.getElementById('myModal').style.display = 'none';
        }
    };

    const handleBucketListFormSubmit = async (event) => {
        event.preventDefault();
        const topic = document.getElementById('topic').value;
        const startDate = new Date(document.getElementById('start_date').value);
        const endDate = new Date(document.getElementById('end_date').value);

        const differenceInMilliseconds = endDate.getTime() - startDate.getTime();
        const timeframe = differenceInMilliseconds / (1000 * 3600 * 24);

        try {
            await axios.get(`/api/add?topic=${topic}&startDate=${startDate}&endDate=${endDate}&timeframe=${timeframe}`);
            fetchBuckets();
            navigate('/buckets');
        } catch (error) {
            console.log(error);
        }
        document.getElementById('myModal').style.display = 'none';
    };

    const handleDeleteBucket = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.get(`/api/remove/${id}`);
                fetchBuckets();
                navigate('/buckets')
            }
        });
    };

    const handleEditBucket = (item) => {
        document.getElementById('edit_topic').value = item.topic;
        document.getElementById('edit_start_date').value = new Date(item.startDate).toISOString().split('T')[0];
        document.getElementById('edit_end_date').value = new Date(item.endDate).toISOString().split('T')[0];

        const itemId = item._id;
        document.getElementById('editBucketForm').setAttribute('data-id', itemId);
        document.getElementById('editModal').style.display = 'flex';
    };

    const handleCloseEditModal = () => {
        document.getElementById('editModal').style.display = 'none';
    };

    const handleEditBucketFormSubmit = async (event) => {
        event.preventDefault();
        const topic = document.getElementById('edit_topic').value;
        const startDate = document.getElementById('edit_start_date').value;
        const endDate = document.getElementById('edit_end_date').value;
        const itemId = document.getElementById('editBucketForm').getAttribute('data-id');

        try {
            await axios.put(`/api/edit/${itemId}`, { topic, startDate, endDate });
            fetchBuckets();
            navigate('/buckets')
        } catch (error) {
            console.log(error);
        }

        document.getElementById('editModal').style.display = 'none';
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const filteredBuckets = buckets.filter(bucket =>
        bucket.topic.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const currentBuckets = filteredBuckets.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div>
            <h1 className="text-3xl font-bold">Buckets</h1>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={{ marginRight: '67%' }} onClick={handleOpenModal}>Add to Bucket List</button>
            <input
                type="text"
                placeholder="Search by topic"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-md p-2 mb-4"
            />
            <div className="flex flex-wrap mt-4">
                {currentBuckets.map(item => (
                    <div key={item._id} className="w-full md:w-1/2 lg:w-1/3 p-4">
                        <div className="bg-white rounded-lg shadow-lg p-4">
                            <p className="text-lg font-bold">{item.topic}</p>
                            <p>From: {item.startDate}</p>
                            <p>To: {item.endDate}</p>
                            <p>Timeframe: {item.timeframe} Day</p>
                            <div className="mt-4">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 mr-2 rounded" onClick={() => handleEditBucket(item)}>Edit</button>
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" onClick={() => handleDeleteBucket(item._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center items-center mt-4" style={{ marginBottom: '5%' }}>
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                    Previous
                </button>
                <button
                    disabled={currentBuckets.length < itemsPerPage}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Next
                </button>
            </div>
            <div id="myModal" className="modal hidden fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center" onClick={handleWindowClick}>
                <div className="modal-content bg-white w-full md:w-1/2 lg:w-1/3 p-4 rounded-lg shadow-lg relative">
                    <span className="close cursor-pointer absolute top-0 right-0 p-4" onClick={handleCloseModal}>&times;</span>
                    <h2 className="text-2xl font-bold mb-4">Add to Bucket List</h2>
                    <form className="modal-form" onSubmit={handleBucketListFormSubmit}>
                        <label htmlFor="topic" className="block mb-2">Topic:</label>
                        <input type="text" id="topic" name="topic" className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4" required />
                        <label htmlFor="start_date" className="block mb-2">Start Date:</label>
                        <input type="date" id="start_date" name="start_date" className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4" required />
                        <label htmlFor="end_date" className="block mb-2">End Date:</label>
                        <input type="date" id="end_date" name="end_date" className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4" required />
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add</button>
                    </form>
                </div>
            </div>
            <div id="editModal" className="modal hidden fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center" onClick={handleWindowClick}>
                <div className="modal-content bg-white w-full md:w-1/2 lg:w-1/3 p-4 rounded-lg shadow-lg relative">
                    <span className="close cursor-pointer absolute top-0 right-0 p-4" onClick={handleCloseEditModal}>&times;</span>
                    <h2 className="text-2xl font-bold mb-4">Edit Bucket Item</h2>
                    <form id="editBucketForm" className="modal-form" onSubmit={handleEditBucketFormSubmit}>
                        <label htmlFor="edit_topic" className="block mb-2">Topic:</label>
                        <input type="text" id="edit_topic" name="edit_topic" className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4" required />
                        <label htmlFor="edit_start_date" className="block mb-2">Start Date:</label>
                        <input type="date" id="edit_start_date" name="edit_start_date" className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4" required />
                        <label htmlFor="edit_end_date" className="block mb-2">End Date:</label>
                        <input type="date" id="edit_end_date" name="edit_end_date" className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4" required />
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BucketList;
