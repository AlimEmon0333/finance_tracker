import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import logo from "../../assets/logo.png"
import Loading from '../../components/loading';
import { TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const IncomeForm = () => {
    const userId = JSON.parse(localStorage.getItem("id"))
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        userId: userId,
        amount: "",
    });
    const fillAmonutChange = (key, val) => {
        setData((prevData) => ({
            ...prevData,
            [key]: val
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('amount', data.amount);
        try {
            setLoading(true)
            const response = await axios.post("http://localhost:8000/api/addIncome/", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            setLoading(false)
            toast.success('Income added successfully')
            navigate("/dashboard")
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
                                Add income
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
                                        label="Income"
                                        variant="filled"
                                        color="success"
                                        className="w-full"
                                        required
                                        onChange={(e) => fillAmonutChange("amount", e.target.value)}
                                    />
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
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#2bb44a] hover:bg-[#2bb44b83] focus:outline-none transition-all duration-300"
                                        onClick={handleSubmit}
                                    >
                                        Add Income
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IncomeForm
