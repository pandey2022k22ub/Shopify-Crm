import React, { useEffect, useState } from "react"
import API from "../api/apiService"
import Navbar from "../components/Navbar"

// rcreating bar chart. pi and dotted one.
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

function DashboardPage() {
  const [metrics, setMetrics] = useState({ totalCustomers: 0, totalOrders: 0, totalRevenue: 0 })
  const [ordersByDate, setOrdersByDate] = useState([])
  const [topCustomers, setTopCustomers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        // fetch metrics
        const res1 = await API.get("/dashboard/metrics")
        setMetrics(res1.data || {})

        // fetch order by date 
        const res2 = await API.get("/dashboard/orders?from=2000-01-01&to=2100-01-01")
        // i was facing issue because i hve not convrted my price to Number!
        const cleanedOrders = (res2.data || []).map((o) => ({
          ...o,
          total_price: Number(o.total_price),
        }))
        setOrdersByDate(cleanedOrders)

        // fetchingg top customers 
        const res3 = await API.get("/dashboard/top-customers")
        const cleanedCustomers = (res3.data || []).map((c) => ({
          ...c,
          totalSpend: Number(c.totalSpend),
        }))
        setTopCustomers(cleanedCustomers)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  //  pie chart color combo
  const pieColors = ["#0074D9", "#AAAAAA", "#FFDC00", "#2ECC40"]

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f7f9fb" }}>
      <Navbar />
      <main style={{ padding: 20, width: "100%" }}>
        <h2 style={{ marginTop: 0 }}>Dashboard</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {/* metric cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              <div style={{ background: "#fff", padding: 12, border: "1px solid #eee" }}>
                <h4>Total Customers</h4>
                <p style={{ fontSize: 24 }}>{metrics.totalCustomers}</p>
              </div>

              <div style={{ background: "#fff", padding: 12, border: "1px solid #eee" }}>
                <h4>Total Orders</h4>
                <p style={{ fontSize: 24 }}>{metrics.totalOrders}</p>
              </div>

              <div style={{ background: "#fff", padding: 12, border: "1px solid #eee" }}>
                <h4>Total Revenue</h4>
                <p style={{ fontSize: 24 }}>{metrics.totalRevenue ?? 0}</p>
              </div>
            </div>

            {/* charts section */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 20,
                marginTop: 30,
              }}
            >
              {/* Line chart for orders by date */}
              <div style={{ background: "#fff", padding: 12, border: "1px solid #eee" }}>
                <h4>Orders by Date</h4>
                <ResponsiveContainer width="100%" height={250}>
                  {ordersByDate.length > 0 ? (
                    <LineChart data={ordersByDate}>
                      <XAxis dataKey="order_date" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="total_price"
                        stroke="#0074D9"
                        strokeWidth={3}
                      />
                    </LineChart>
                  ) : (
                    <p style={{ textAlign: "center", paddingTop: 80 }}>No order data</p>
                  )}
                </ResponsiveContainer>
              </div>

              {/* Bar graphfor top customers */}
              <div style={{ background: "#fff", padding: 12, border: "1px solid #eee" }}>
                <h4>Top Customers by Spend</h4>
                <ResponsiveContainer width="100%" height={250}>
                  {topCustomers.length > 0 ? (
                    <BarChart data={topCustomers}>
                      <XAxis dataKey="customer_id" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="totalSpend" fill="#7FDBFF" />
                    </BarChart>
                  ) : (
                    <p style={{ textAlign: "center", paddingTop: 80 }}>No customer data</p>
                  )}
                </ResponsiveContainer>
              </div>

              {/* Pie (revenue share) */}
              <div style={{ background: "#fff", padding: 12, border: "1px solid #eee" }}>
                <h4>Revenue Distribution (Sample)</h4>
                <ResponsiveContainer width="100%" height={250}>
                  {topCustomers.length > 0 ? (
                    <PieChart>
                      <Pie
                        data={topCustomers}
                        dataKey="totalSpend"
                        nameKey="customer_id"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {topCustomers.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={pieColors[index % pieColors.length]}
                          />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  ) : (
                    <p style={{ textAlign: "center", paddingTop: 80 }}>No revenue data</p>
                  )}
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default DashboardPage
