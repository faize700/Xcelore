// src/pages/AdminPanel.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, createUser, updateUser, deleteUser } from '../services/api';
import { setUsers, addUser, editUser, removeUser } from '../store/actions/userActions';
import UserForm from '../components/UserForm';
import UserTable from '../components/UserTable';
import Pagination from '../components/Pagination';
import Search from '../components/Search';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await getUsers({ page, limit, search });
        dispatch(setUsers(data.users));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [dispatch, page, limit, search]);

  const handleCreate = async (user) => {
    try {
      const { data } = await createUser(user);
      dispatch(addUser(data));
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleUpdate = async (id, user) => {
    try {
      const { data } = await updateUser(id, user);
      dispatch(editUser(data));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      dispatch(removeUser(id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <Search value={search} onChange={setSearch} />
      <UserForm onSubmit={handleCreate} />
      <UserTable users={users} onUpdate={handleUpdate} onDelete={handleDelete} />
      <Pagination
        currentPage={page}
        totalItems={users.length}
        itemsPerPage={limit}
        onPageChange={setPage}
      />
    </div>
  );
};

export default AdminPanel;
