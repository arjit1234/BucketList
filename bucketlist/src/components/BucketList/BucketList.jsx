import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './style.css'

const BucketList = () => {
    const navigate = useNavigate();
    const [buckets, setBuckets] = useState([]);

    const fetchBuckets = async () => {
        try {
            const response = await axios.get('/api/home'); // Assuming your backend is running on port 3000
            setBuckets(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchBuckets();
    }, []);

    const handleOpenModal = () => {
        document.getElementById('myModal').style.display = 'block';
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

        const searchParams = new URLSearchParams();
        searchParams.append('topic', topic);
        searchParams.append('startDate', startDate);
        searchParams.append('endDate', endDate);
        searchParams.append('timeframe', timeframe);

        // navigate(`/api/add?${searchParams.toString()}`);
        try {
            await axios.get(`/api/add?topic=${topic}&startDate=${startDate}&endDate=${endDate}&timeframe=${timeframe}`);
            fetchBuckets(); // Update the bucket list after adding
            navigate('/'); // Navigate back to the home page
        } catch (error) {
            console.log(error);
        }
        document.getElementById('myModal').style.display = 'none';
        
    };

    const handleDeleteBucket = (id) => {
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
                navigate('/')
            }
        });
    };

    const handleEditBucket = (item) => {
        document.getElementById('edit_topic').value = item.topic;
        document.getElementById('edit_start_date').value = new Date(item.startDate).toISOString().split('T')[0];
        document.getElementById('edit_end_date').value = new Date(item.endDate).toISOString().split('T')[0];

        const itemId = item._id; // Get the id from the item object
        console.log(itemId);
    // Set the data-id attribute of the editBucketForm to the itemId
        document.getElementById('editBucketForm').setAttribute('data-id', itemId);
    
        document.getElementById('editModal').style.display = 'block';
    };
    

    const handleCloseEditModal =  () => {
        document.getElementById('editModal').style.display = 'none';
    };
    const handleEditBucketFormSubmit = async (event) => {
        event.preventDefault();
        
        const topic = document.getElementById('edit_topic').value;
        const startDate = document.getElementById('edit_start_date').value;
        const endDate = document.getElementById('edit_end_date').value;
        const itemId = document.getElementById('editBucketForm').getAttribute('data-id');
        console.log(`/api/edit/${itemId}`, { topic, startDate, endDate })
        try {
            await axios.put(`/api/edit/${itemId}`, { topic, startDate, endDate });
            fetchBuckets();
            navigate('/');
        } catch(error) {
            console.log(error);
        }
    
        document.getElementById('editModal').style.display = 'none';
    };

    return (
        <div>
            <h1>Buckets</h1>
            <button type="button" className="btn btn-success" onClick={handleOpenModal}>Add to Bucket List</button>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Course Name</th>
                        <th scope="col">From</th>
                        <th scope="col">To</th>
                        <th scope="col">TimeFrame</th>
                        <th scope="colspan-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {buckets.map(item => (
                        <tr key={item._id}>
                            <td>{item.topic}</td>
                            <td>{item.startDate}</td>
                            <td>{item.endDate}</td>
                            <td>{item.timeframe} Day</td>
                            <td>
                            <button type="button" className="btn btn-secondary edit-bucket" onClick={() => handleEditBucket(item)} data-id={item._id}>
                                <i className="far fa-edit"></i>
                            </button>
                            </td>
                            <td>
                                <button type="button" className="btn btn-danger delete-bucket" onClick={() => handleDeleteBucket(item._id)}>
                                    <i className="fa fa-trash" aria-hidden="true"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={handleCloseModal}>&times;</span>
                    <h2>Add to Bucket List</h2>
                    <form id="bucketListForm" className="modal-form" onSubmit={handleBucketListFormSubmit}>
                        <label htmlFor="topic">Topic:</label>
                        <input type="text" id="topic" name="topic" required />
                        <label htmlFor="start_date">Start Date:</label>
                        <input type="date" id="start_date" name="start_date" className="form-control" required />
                        <label htmlFor="end_date">End Date:</label>
                        <input type="date" id="end_date" name="end_date" className="form-control" required />
                        <br />
                        <button type="submit">Add</button>
                    </form>
                </div>
            </div>
            <div id="editModal" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={handleCloseEditModal}>&times;</span>
                    <h2>Edit Bucket Item</h2>
                    <form id="editBucketForm" className="modal-form" onSubmit={handleEditBucketFormSubmit} data-id="">
                        <label htmlFor="edit_topic">Topic:</label>
                        <input type="text" id="edit_topic" name="edit_topic" required />
                        <label htmlFor="edit_start_date">Start Date:</label>
                        <input type="date" id="edit_start_date" name="edit_start_date" className="form-control" required />
                        <label htmlFor="edit_end_date">End Date:</label>
                        <input type="date" id="edit_end_date" name="edit_end_date" className="form-control" required />
                        <br />
                        <button type="submit">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BucketList;
