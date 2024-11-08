import React, { useEffect } from 'react'
import logo from "../../assets/logo.png"
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FinancialStatusChart from '../../components/financialChart';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};
const Dashboard = () => {
  const [open, setOpen] = React.useState(false);
  const [UserData, setUserData] = React.useState({});
  const [userEntries, setUserEntries] = React.useState([]);
  const [summary, setSummary] = React.useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate()
  const userId = JSON.parse(localStorage.getItem("id"))
  const incomeEntries = userEntries.filter((e) => e.entry_type === "income")
  const expenseEntries = userEntries.filter((e) => e.entry_type === "expense")
  const handleEdit = (entry) => {
    navigate("/editEntrie", { state: { entry } })
  }
  const handleDelete = async (entry_id) => {
    const response = await axios.delete(`http://localhost:8000/api/deleteEntrie/${entry_id}`)
    console.log(response)
    if (response.data.message) {
      navigate("/")
    }
  }
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/getUserData/${userId}`);
        setUserData({ ...response.data.user })  // Handle the response here
      } catch (error) {
        console.error("Error fetching user data:", error);  // Handle errors
      }
    };
    const fetchUserEntries = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/getUserEntries/${userId}`);
        setUserEntries([...response.data.entries])
      } catch (error) {
        console.error("Error fetching user entries:", error);
      }
    }
    const getSummary = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/getSummary/${userId}`);
        setSummary({ ...response.data.summary })
      } catch (error) {
        console.error("Error fetching summary:", error);
      }
    }
    fetchUserData();
    fetchUserEntries();
    getSummary();
  }, [userId]);
  return (
    <div className='bg-[#c8cffd]'>
      <ToastContainer position="bottom-right" />
      <div className='navbar flex items-center justify-between'>
        <div className="logo mx-10">
          <img src={logo} alt="" />
        </div>
        <div className="buttons flex gap-3 mx-10">
          <div>
            <Button variant="contained" onClick={() => navigate("/incomeForm")}>Add Income</Button>
          </div>
          <div>
            <Button variant="contained" onClick={() => navigate("/expenseForm")}>Add Expense</Button>
          </div>
          <div>
            <Button variant="contained" onClick={handleOpen}>Profile</Button>

          </div>
        </div>
      </div>
      <div className='flex justify-around items-center my-5'>
        <div className=" bg-[#231c4a] ps-5 pe-32 rounded-lg py-5 " >
          <h1 className='text-[#c8cffd] text-2xl text-left'>Your Total income</h1>
          <p className='text-[#c8cffd] text-xl text-left'>
            {summary.total_income}
          </p>
        </div>
        <div className="bg-[#231c4a] ps-5 pe-32 rounded-lg py-5" >
          <h1 className='text-[#c8cffd] text-2xl'>Your Total Expense</h1>
          <p className='text-[#c8cffd] text-xl'>
            {summary.total_expenses}
          </p>
        </div>
        <div className="bg-[#231c4a] ps-5 pe-32 rounded-lg py-5" >
          <h1 className='text-[#c8cffd] text-2xl'>Your Balance</h1>
          <p className='text-[#c8cffd] text-xl'>{summary.balance}</p>
        </div>
      </div>
      <div className='flex your mx-auto all Expenses overflow-x-auto w-[80%]'>
        <div className="container mx-auto p-4 ">
          <h2 className="text-2xl font-bold mb-4 text-center text-[#4a5568]">Your Incomes table</h2>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Amount
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {incomeEntries.map((x, i) => {
                  return (
                    <tr key={i} class=" odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700">
                      <td class="px-6 py-4">
                        {x.amount}
                      </td>
                      <td class="px-6 py-4">
                        {new Date(x.date).toLocaleDateString()}
                      </td>
                      <td class="px-6 py-4 flex gap-2">
                        <div className='bg-red-500 rounded-lg cursor-pointer' onClick={() => handleDelete(x.entry_id)}>
                          <DeleteIcon sx={{ color: "#fff" }} />
                        </div>
                        <div className='bg-blue-600 rounded-lg cursor-pointer' onClick={() => handleEdit(x)}>
                          <ModeEditIcon sx={{ color: "#fff" }} />
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="container mx-auto p-4 ">
          <h2 className="text-2xl font-bold mb-4 text-center text-[#4a5568]">Your Expenses table</h2>


          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Amount
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {expenseEntries.map((x, i) => {
                  return (
                    <tr key={i} class=" odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700">
                      <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {x.category}
                      </td>
                      <td class="px-6 py-4">
                        {x.amount}
                      </td>
                      <td class="px-6 py-4">
                        {new Date(x.date).toLocaleDateString()}
                      </td>
                      <td class="px-6 py-4 flex gap-2">
                        <div className='bg-red-500 rounded-lg cursor-pointer' onClick={() => handleDelete(x.entry_id)}>
                          <DeleteIcon sx={{ color: "#fff" }} />
                        </div>
                        <div className='bg-blue-600 rounded-lg cursor-pointer' onClick={() => handleEdit(x)}>
                          <ModeEditIcon sx={{ color: "#fff" }} />
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

        </div>
      </div>
      <div>
        <FinancialStatusChart total_income={summary.total_income} total_expense={summary.total_expenses} balance={summary.balance} />
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className='flex flex-col justify-center items-center'>
              <div>
                <img
                  src={`data:image/jpeg;base64,${UserData.profileimage}`}
                  alt="Profile"
                  style={{ width: 100, height: 100, borderRadius: "50%" }}
                />
              </div>
              <div className='flex flex-col justify-center items-center '>
                <h2 className='font-bold font-sans text-[#231c4a] text-3xl mt-3'>@{UserData.username}</h2>
                <p className='text-2xl text-[#8486f5]'>{UserData.email}</p>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  )
}

export default Dashboard

