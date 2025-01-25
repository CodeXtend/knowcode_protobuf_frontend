import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import {
  Plus,
  Filter,
  Recycle,
  Factory,
  Wind,
  DollarSign,
  AlertTriangle
} from "lucide-react";

export default function Dashboard() {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Calculate total values for quick stats
  const calculateTotals = (data) => {
    return data.reduce((acc, month) => ({
      totalQuantity: (acc.totalQuantity || 0) + (month.totalQuantity || 0),
      totalRevenue: (acc.totalRevenue || 0) + (month.totalRevenue || 0)
    }), { totalQuantity: 0, totalRevenue: 0 });
  };

  // Convert month number to name
  const getMonthName = (monthNum) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[monthNum - 1];
  };

  // Add a number formatting helper
  const formatNumber = (value) => {
    return !value || isNaN(value) ? 0 : value.toLocaleString();
  };

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('https://knowcode-protobuf-backend.vercel.app/api/v1/dashboards/analytics/monthly');
        if (!response.ok) throw new Error('Failed to fetch analytics data');
        
        const result = await response.json();
        if (result.status === 'success') {
          // Transform the data for charts
          const transformedData = result.data.monthlyData.map(item => ({
            month: getMonthName(item.month),
            waste: item.totalQuantity || 0,
            revenue: item.totalRevenue || 0,
            recycled: (item.totalQuantity || 0) * 0.8, // Assuming 80% recycling rate
          }));
          
          setAnalyticsData(transformedData);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching analytics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  // Calculate totals for quick stats
  const totals = calculateTotals(analyticsData);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50 to-teal-50 pt-20"
    >
      <div className="container py-6">
        {/* Header Section */}
        <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Agricultural Waste Management
            </h1>
            <p className="text-green-700/80">Transform waste into sustainable opportunities</p>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <QuickStatCard
            icon={<Recycle />}
            title="Total Waste Collected"
            value={`${formatNumber(totals.totalQuantity)} MT`}
            change="+12%"
            color="green"
          />
          <QuickStatCard
            icon={<Factory />}
            title="Processing Centers"
            value="128"
            subtext="45 Districts"
            color="blue"
          />
          <QuickStatCard
            icon={<Wind />}
            title="CO₂ Emissions Saved"
            value={`${formatNumber(totals.totalQuantity * 0.5)} MT`}
            change="-25%"
            color="emerald"
          />
          <QuickStatCard
            icon={<DollarSign />}
            title="Revenue Generated"
            value={`₹${formatNumber(totals.totalRevenue)}`}
            change="+18%"
            color="purple"
          />
        </motion.div>

        {/* Main Content Grid */}
        <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-7 mt-6">
          {/* Waste Analytics Chart */}
          <Card className="col-span-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Waste Collection Analytics</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analyticsData}>
                    <defs>
                      <linearGradient id="colorWaste" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" stroke="#22c55e" />
                    <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" />
                    <Tooltip 
                      formatter={(value) => {
                        return !value || isNaN(value) ? '0' : value.toLocaleString();
                      }}
                    />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="waste"
                      stroke="#22c55e"
                      fillOpacity={1}
                      fill="url(#colorWaste)"
                      name="Waste (MT)"
                    />
                    <Area
                      yAxisId="right"
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3b82f6"
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                      name="Revenue (₹)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle className="text-green-800">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: "Paddy Straw", quantity: "50 MT", status: "Listed", location: "Punjab" },
                  { type: "Sugarcane Bagasse", quantity: "30 MT", status: "Processing", location: "Maharashtra" },
                  { type: "Corn Stalks", quantity: "45 MT", status: "Collected", location: "Karnataka" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-lg bg-green-50/50 hover:bg-green-100/50 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{item.type}</div>
                      <div className="text-xs text-muted-foreground">{item.quantity}</div>
                    </div>
                    <span className="text-xs font-medium text-green-600">{item.status}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Environmental Impact Section */}
        <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-7 mt-6">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle className="text-green-800">Environmental Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-4 rounded-lg bg-green-50"
                >
                  <h3 className="text-sm font-medium text-green-800">Air Quality Improvement</h3>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="text-2xl font-bold text-green-600">32%</div>
                    <span className="text-xs text-green-600">↑</span>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-4 rounded-lg bg-blue-50"
                >
                  <h3 className="text-sm font-medium text-blue-800">Water Saved</h3>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="text-2xl font-bold text-blue-600">1.2M</div>
                    <span className="text-xs">Liters</span>
                  </div>
                </motion.div>
                <div className="col-span-2 h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="recycled" fill="#22c55e" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle className="text-green-800">AI Predictions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <PredictionCard
                  title="Waste Generation Forecast"
                  prediction="Expected 15% increase in paddy waste next month"
                  confidence={85}
                />
                <PredictionCard
                  title="Optimal Collection Routes"
                  prediction="3 new efficient routes identified"
                  confidence={92}
                />
                <PredictionCard
                  title="Market Price Prediction"
                  prediction="Price increase expected for composted waste"
                  confidence={78}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* New Sections */}
        <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2 mt-6">
          {/* Intelligent Waste Management */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="text-green-800">AI Waste Predictions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-amber-50 rounded-lg flex items-center gap-4">
                <AlertTriangle className="text-amber-500" />
                <div>
                  <h4 className="font-medium">Peak Collection Alert</h4>
                  <p className="text-sm text-muted-foreground">Expected 40% increase in paddy waste next week</p>
                </div>
              </div>
              {/* Add prediction chart component */}
            </CardContent>
          </Card>

          {/* Supply Chain Optimization */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="text-green-800">Route Optimization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Optimal Collection Time</h4>
                    <p className="text-sm text-muted-foreground">Based on farmer availability</p>
                  </div>
                  <Button variant="outline" size="sm">View Routes</Button>
                </div>
                {/* Add route map component */}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Marketplace Integration */}
        <motion.div variants={itemVariants} className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-800">Marketplace Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Latest Listings</h3>
                  {/* Add marketplace listings */}
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium">Active Matches</h3>
                  {/* Add buyer-seller matches */}
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium">Top Rated Sellers</h3>
                  {/* Add ratings and feedback */}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

// New component for Quick Stats
const QuickStatCard = ({ icon, title, value, change, color, subtext }) => (
  <Card className={`border-l-4 border-l-${color}-600`}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className={`text-2xl font-bold text-${color}-600`}>{value}</div>
      {change && <p className="text-xs text-muted-foreground">{change}</p>}
      {subtext && <p className="text-xs text-muted-foreground">{subtext}</p>}
    </CardContent>
  </Card>
);

// TODO: Create PredictionCard component wth ntegrated Progress component
const PredictionCard = ({ title, prediction, confidence }) => (
  <div className="p-4 bg-green-50/50 rounded-lg border border-green-100">
    <h3 className="text-sm font-medium text-green-800">{title}</h3>
    <p className="text-xs text-muted-foreground">{prediction}</p>
    <Progress value={confidence} className="mt-2" />
  </div>
);

