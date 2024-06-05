import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const ManageRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({
    number: '',
    type: '',
    accommodation: '',
    status: '',
    price: '',
    image: null
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/rooms');
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleStatusChange = (e) => {
    setFormData({ ...formData, status: e.target.value });
  };

  const handleEdit = (room) => {
    setEditingRoom(room._id);
    setFormData({
      number: room.number,
      type: room.type,
      accommodation: room.accommodation,
      status: room.status,
      price: room.price,
      image: null
    });
  };

  const handleDelete = async (roomId) => {
    try {
      await axios.delete(`http://localhost:5001/api/rooms/${roomId}`);
      fetchRooms();
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    try {
      await axios.put(`http://localhost:5001/api/rooms/${editingRoom}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setEditingRoom(null);
      setFormData({
        number: '',
        type: '',
        accommodation: '',
        status: '',
        price: '',
        image: null
      });
      fetchRooms();
    } catch (error) {
      console.error('Error updating room:', error);
    }
  };

  return (
    <>
      <div className="container-xxl position-relative bg-white d-flex p-0">
        <Sidebar />
        <div className="content">
          <Header />
          <div className="container-fluid pt-4 px-4">
            <div className="bg-light rounded h-100 p-4">
              <h3 className="mb-4">Manage Rooms</h3>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">Number</th>
                      <th scope="col">Type</th>
                      <th scope="col">Accommodation</th>
                      <th scope="col">Status</th>
                      <th scope="col">Price</th>
                      <th scope="col">Image</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rooms.map((room, index) => (
                      <tr key={room._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{room.number}</td>
                        <td>{room.type}</td>
                        <td>{room.accommodation}</td>
                        <td>
                          {editingRoom === room._id ? (
                            <select
                              className="form-select"
                              value={formData.status}
                              onChange={handleStatusChange}
                            >
                              <option value="available">Available</option>
                              <option value="occupied">Occupied</option>
                              <option value="cleaning">Cleaning</option>
                            </select>
                          ) : (
                            room.status
                          )}
                        </td>
                        <td>{room.price}</td>
                        <td>
                          {room.image && <img src={`http://localhost:5001/uploads/${room.image}`} alt="Room" style={{ width: '50px', height: '50px' }} />}
                        </td>
                        <td>
                          <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(room)}>
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(room._id)}>
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {editingRoom && (
                <div className="mt-4">
                  <h3>Edit Room</h3>
                  <form onSubmit={handleUpdate}>
                    <div className="form-floating mb-3">
                      <input
                        type="number"
                        className="form-control"
                        id="floatingNumber"
                        placeholder="Room Number"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="floatingNumber">Room Number</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingType"
                        placeholder="Room Type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="floatingType">Room Type</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingAccommodation"
                        placeholder="Accommodation"
                        name="accommodation"
                        value={formData.accommodation}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="floatingAccommodation">Accommodation</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingStatus"
                        placeholder="Status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="floatingStatus">Status</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="number"
                        className="form-control"
                        id="floatingPrice"
                        placeholder="Price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="floatingPrice">Price</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="file"
                        className="form-control"
                        id="floatingImage"
                        placeholder="Image"
                        name="image"
                        onChange={handleImageChange}
                      />
                      <label htmlFor="floatingImage">Image</label>
                    </div>
                    <button type="submit" className="btn btn-primary py-3 w-100 mb-4">Update Room</button>
                  </form>
                </div>
              )}
            </div>
          </div>
          <Footer />
        </div>
        <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></a>
      </div>
    </>
  );
};

export default ManageRoom;
