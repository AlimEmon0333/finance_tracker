import React, { useState } from 'react'
import logo from "../../assets/logo.png";
import { toast, ToastContainer } from 'react-toastify'
import { TextField } from '@mui/material';
import Loading from '../../components/loading';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditEntrie = () => {
    const [loading, setLoading] = useState();
    const location = useLocation();
    const navigate = useNavigate()
    const { entry } = location.state;
    const entry_id = entry.entry_id
    const [expenseData, setExpenseData] = useState({
        "amount": "",
        "category": ""
    });
    const handleExpenseChange = (key, val) => {
        setExpenseData((prevData) => ({
            ...prevData,
            [key]: val
        }))
    }
    const handleExpenseUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('amount', expenseData.amount);
        formData.append('category', expenseData.category);
        try {
            const response = await axios.post(`http://localhost:8000/api/updateExpenseEntrie/${entry_id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            setLoading(false);
            navigate("/")
        } catch (error) {
            setLoading(false);
            if (error.response) {
                toast.error(error.response.data.error || "Entry failed!");
            } else if (error.request) {
                toast.error("Network error, please try again later.");
            } else {
                toast.error("An unexpected error occurred.");
            }
        }
    }
    const [incomeData, setIncomeData] = useState({
        "amount": "",
    });
    const handleIncomeChange = (key, val) => {
        setIncomeData((prevData) => ({
            ...prevData,
            [key]: val
        }))
    }
    const handleIncomeUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('amount', incomeData.amount);
        try {
            const response = await axios.post(`http://localhost:8000/api/updateIncomeEntrie/${entry_id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            setLoading(false);
            navigate("/")
        } catch (error) {
            setLoading(false);
            if (error.response) {
                toast.error(error.response.data.error || "Entry failed!");
            } else if (error.request) {
                toast.error("Network error, please try again later.");
            } else {
                toast.error("An unexpected error occurred.");
            }
        }
    }
    return (
        <div>
            <div>
                <ToastContainer position="bottom-right" />
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="w-full max-w-md px-8 py-6 space-y-8 bg-white rounded-lg shadow-lg">
                        <div className="text-center">
                            <div className="flex justify-center">
                                <img src={logo} alt="Logo" />
                            </div>
                            <h2 className="text-3xl font-extrabold text-[#232829]">
                                Edit Your Entry
                            </h2>
                            <p className="mt-2 text-sm text-gray-600">
                                Join us to manage your finances with ease
                            </p>
                        </div>
                        <form className="mt-8 space-y-2">
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div className="py-1">
                                    <TextField
                                        type="number"
                                        label="Expense"
                                        variant="filled"
                                        color="success"
                                        className="w-full"
                                        onChange={entry.entry_type === "expense" ? (e) => handleExpenseChange("amount", e.target.value) : (e) => handleIncomeChange("amount", e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="py-1">
                                    {entry.entry_type === "expense" ?
                                        <TextField
                                            type="text"
                                            label="Category"
                                            variant="filled"
                                            color="success"
                                            className="w-full"
                                            onChange={(e) => handleExpenseChange("category", e.target.value)}
                                            required
                                        /> : ""
                                    }
                                </div>
                            </div>
                            <div>
                                {loading ? (
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-1 px-4 border-transparent rounded-md text-white bg-[#2bb44a] hover:bg-[#2bb44b83] transition-all duration-300"
                                        aria-label="Loading"
                                    >
                                        <Loading />
                                    </button>
                                ) : (
                                    <div>
                                        {entry.entry_type === "expense" ?
                                            <button
                                                type="submit"
                                                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#2bb44a] hover:bg-[#2bb44b83] focus:outline-none transition-all duration-300"
                                                onClick={handleExpenseUpdate}
                                            >
                                                Edit
                                            </button> : <button
                                                type="submit"
                                                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#2bb44a] hover:bg-[#2bb44b83] focus:outline-none transition-all duration-300"
                                                onClick={handleIncomeUpdate}
                                            >
                                                Edit
                                            </button>
                                        }
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditEntrie
