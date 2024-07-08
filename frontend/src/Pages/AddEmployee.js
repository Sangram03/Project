import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styles from './AddEmployee.module.css';

const AddEmployee = () => {
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [internalNumber, setInternalNumber] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/staff', {
                name,
                department,
                internalNumber,
            });
            if (response.status === 201) {
                alert('Employee added successfully');
                history.push('/admin/dashboard'); // Redirect to the dashboard after successful addition
            }
        } catch (error) {
            console.error('Error adding new employee:', error);
            alert('Failed to add employee');
        }
    };

    return (
        <div className={styles['add-employee-container']}>
            <h2>Add Employee</h2>
            <form onSubmit={handleSubmit} className={styles['add-employee-form']}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                />
                <input
                    type="text"
                    name="internalNumber"
                    placeholder="Internal Number"
                    value={internalNumber}
                    onChange={(e) => setInternalNumber(e.target.value)}
                    required
                />
                <button type="submit" className={styles['submit-button']}>Add</button>
            </form>
        </div>
    );
};

export default AddEmployee;