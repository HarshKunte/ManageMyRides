import moment from "moment";

export const generateInvoiceData = (user, transaction) => {
  const data = {
    id: transaction._id,
    user_name: user.name,
    user_mobile: user.mobile,
    user_email: user.email,
    company_name: user.company_name,

    customer_name: transaction.customer_name,
    customer_mobile: transaction.customer_mobile,
    total: transaction.total_bill,
    from_date:moment(transaction.from_date).utc().format("DD-MM-YYYY"),
    to_date:moment(transaction.from_date).utc().format("DD-MM-YYYY"),
    from_location: transaction.from_address,
    to_location: transaction.to_address,
    items: [
      {
        sno: 3,
        desc: "No. of days",
        qty: transaction.no_of_days,
      },
      {
        sno: 4,
        desc: "Total Kms",
        qty: transaction.total_kms,
      },
      {
        sno: 5,
        desc: "Driver allowance (Rs.)",
        qty: transaction.driver_allowance,
      },
      {
        sno: 6,
        desc: "Toll (Rs.)",
        qty: transaction.toll_amt,
      },
      {
        sno: 7,
        desc: "GST (Rs.)",
        qty: transaction.tax_amt,
      },
      {
        sno: 8,
        desc: "Advance paid (Rs.)",
        qty: transaction.total_bill - transaction.pending_payment_amt,
      },
      {
        sno: 9,
        desc: "Pending amount (Rs.)",
        qty: transaction.pending_payment_amt,
      },
    ],

  };

  return data;
};
