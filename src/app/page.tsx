"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [newPayment, setNewPayment] = useState(0);
  let [summary, setSummary] = useState(0);

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const [newDate, setNewDate] = useState(
    `${year}/${month}/${day}/${hour}:${minute}.${second}`
  );

  const paymentChange = (e: any) => setNewPayment(e.target.value);
  const dateChange = (e: any) => setNewDate(e.target.value);

  const [payments, setPayments] = useState([
    {
      id: "null",
      date: "null",
      payment: 0,
    },
  ]);

  const addPayment = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    setNewDate(`${year}/${month}/${day}/${hour}:${minute}.${second}`);
    if (newPayment === undefined || Number(newPayment) <= 0) return;
    const newPaymentItem = {
      id: new Date().getTime().toString(),
      date: newDate,
      payment: newPayment,
    };
    summary += Number(newPayment);
    setSummary(summary);
    setPayments([...payments, newPaymentItem]);
    setNewPayment(0);
  };

  useEffect(() => {
    const savedPayments = localStorage.getItem("pay");
    if (savedPayments && savedPayments.length > 0) {
      setPayments(JSON.parse(savedPayments));
    }
  }, []);

  useEffect(() => {
    if (payments.length > 0 && payments[0].id === "null") {
      const savedPayments = localStorage.getItem("pay");
      if (savedPayments && savedPayments.length > 0) {
        setPayments(JSON.parse(savedPayments));
        return;
      }
      setPayments([]);
      return;
    }

    localStorage.setItem("pay", JSON.stringify(payments));
  }, [payments]);

  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-4xl font-bold text-center text-teal-600 mb-10">
        家計簿アプリ
      </h1>
      <div className="flex justify-center mb-10">
        <input
          type="date"
          className="mr-5 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
          onChange={dateChange}
        />
        <input
          type="number"
          placeholder="payment"
          className="text-black h-8 border-2 border-gray-400 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
          onChange={paymentChange}
          value={newPayment}
        />
        <button
          className="bg-teal-500 text-white rounded-md shadow-md w-20 ml-5 p-2 hover:bg-teal-600 transition"
          onClick={addPayment}
        >
          Submit
        </button>
      </div>
      <div className="flex justify-center">
        <table className="border-collapse border-2 border-gray-400 w-4/5 shadow-lg rounded-lg">
          <caption className="mb-5 text-lg font-semibold">
            Expenses Table
          </caption>
          <thead className="w-full text-center bg-yellow-300">
            <tr>
              <th scope="col" className="border-2 border-gray-400 w-1/5 p-2">
                Date
              </th>
              <th scope="col" className="border-2 border-gray-400 w-2/5 p-2">
                Payment
              </th>
            </tr>
          </thead>
          <tbody className="border-gray-400">
            {payments.map((item, index) =>
              item.id !== "null" ? (
                <tr key={item.id} className="border-gray-400">
                  <td className="border-2 border-gray-400 p-2">{item.date}</td>
                  <td className="border-2 border-gray-400 p-2">
                    {item.payment}
                  </td>
                </tr>
              ) : null
            )}
            <tr className="bg-green-400">
              <td className="border-2 border-gray-400 p-2">Total</td>
              <td className="border-2 border-gray-400 p-2">{summary}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
