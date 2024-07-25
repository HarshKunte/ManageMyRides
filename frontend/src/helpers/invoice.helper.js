import moment from "moment";
import { isAuthenticated } from "./auth.helper";
import { config } from "../config";
import axios from "axios";
const API = config.REACT_APP_DB_API

export const createInvoice = async (transactionId) =>{
  const token = isAuthenticated()
  const config = {headers:{Authorization: `Bearer ${token}`}}
  return await axios.post(`${API}/invoice/${transactionId}`,transactionId, config)
}

export const deleteInvoiceHelper = async (id) =>{
  const token = isAuthenticated()
  const config = {headers:{Authorization: `Bearer ${token}`}}
  return await axios.delete(`${API}/invoice/${id}`, config)
}

export const getInvoices = async (limit, skipCount) =>{
  const token = isAuthenticated()
  const config = {headers:{Authorization: `Bearer ${token}`}}
  return await axios.get(`${API}/invoices/${limit}/${skipCount}`, config)
}

export const getFilteredInvoices = async (startDate, endDate, limit, skipCount) =>{
  const token = isAuthenticated()
  const config = {headers:{Authorization: `Bearer ${token}`}}
  return await axios.get(`${API}/invoices/filter/${startDate}/${endDate}/${limit}/${skipCount}`, config)
}

export const generateInvoiceData = (user, transaction) => {
  const data = {
    id: transaction.invoice_id,
    date: transaction.invoice_date,
    user_name: user.name,
    user_mobile: user.mobile,
    user_email: user.email,
    company_name: user.company_name,
    vehicle_number: user.vehicle_number,

    customer_name: transaction.customer_name,
    customer_mobile: transaction.customer_mobile,
    total: transaction.total_bill,
    from_date:moment(transaction.from_date).utc().format("DD-MM-YYYY"),
    to_date:moment(transaction.to_date).utc().format("DD-MM-YYYY"),
    from_location: transaction.from_address,
    to_location: transaction.to_address,
    charged_lumpsum: transaction.charged_lumpsum,
    items: [
      {
        sno: 1,
        desc: "No. of days",
        qty: transaction.no_of_days,
      },
      {
        sno: 2,
        desc: "Total Kms",
        qty: transaction.total_kms,
      },
      {
        sno: 3,
        desc: "Driver allowance (Rs.)",
        qty: transaction.driver_allowance,
      },
      {
        sno: 4,
        desc: "Toll (Rs.)",
        qty: transaction.toll_amt,
      },
      {
        sno: 5,
        desc: "GST (Rs.)",
        qty: transaction.tax_amt,
      },
      {
        sno: 6,
        desc: "Lumpsum amount charged (Rs.)",
        qty: transaction.total_bill,
      },
      {
        sno: 7,
        desc: "Advance paid (Rs.)",
        qty: transaction.total_bill - transaction.pending_payment_amt,
      },
      {
        sno: 8,
        desc: "Pending amount (Rs.)",
        qty: transaction.pending_payment_amt,
      },
    ],

  };

  return data;
};
