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

// Add Skeleton Components
const SkeletonCard = () => (
  <div className="bg-white rounded-lg p-4 shadow animate-pulse">
    <div className="flex justify-between items-start">
      <div className="space-y-3 w-full">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="w-8 h-8 bg-gray-200 rounded"></div>
    </div>
  </div>
);

const SkeletonChart = () => (
  <div className="bg-white rounded-lg p-4 shadow animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
    <div className="h-[300px] bg-gray-200 rounded"></div>
  </div>
);

const SkeletonActivity = () => (
  <div className="flex items-center gap-4">
    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
    </div>
  </div>
);

// Add this helper function at the top level
const calculatePredictions = (analyticsData, statsData) => {
  try {
    // Safe calculation helper
    const calculatePercentageChange = (current, previous) => {
      if (!current || !previous || previous === 0) return 0;
      return ((current - previous) / previous * 100).toFixed(1);
    };

    // Get last two months data safely
    const currentMonth = analyticsData[analyticsData.length - 1] || { waste: 0, revenue: 0 };
    const previousMonth = analyticsData[analyticsData.length - 2] || { waste: 0, revenue: 0 };

    // Calculate trends safely
    const wasteGrowth = calculatePercentageChange(currentMonth.waste, previousMonth.waste);
    const revenueTrend = calculatePercentageChange(currentMonth.revenue, previousMonth.revenue);

    // Safe calculations for efficiency
    const totalWaste = statsData?.totalWaste || 0;
    const totalRevenue = statsData?.totalRevenue || 0;
    const revenuePerTon = totalWaste > 0 ? Math.floor(totalRevenue / totalWaste) : 0;

    return {
      wasteForecast: {
        title: "Waste Generation Trend",
        prediction: parseFloat(wasteGrowth) !== 0 
          ? `${wasteGrowth > 0 ? 'Increasing' : 'Decreasing'} trend with ${Math.abs(wasteGrowth)}% ${wasteGrowth > 0 ? 'growth' : 'reduction'} in waste generation`
          : "Stable waste generation pattern",
        confidence: 85
      },
      efficiency: {
        title: "Collection Efficiency",
        prediction: revenuePerTon > 0
          ? `Current revenue per ton is ₹${revenuePerTon.toLocaleString()}, with optimization potential`
          : "Establishing baseline efficiency metrics",
        confidence: 78
      },
      revenue: {
        title: "Revenue Forecast",
        prediction: parseFloat(revenueTrend) !== 0
          ? `${revenueTrend > 0 ? 'Upward' : 'Downward'} trend with ${Math.abs(revenueTrend)}% ${revenueTrend > 0 ? 'increase' : 'decrease'} in revenue`
          : "Stable revenue pattern",
        confidence: 82
      }
    };
  } catch (error) {
    console.error('Prediction calculation error:', error);
    // Fallback predictions if calculation fails
    return {
      wasteForecast: {
        title: "Waste Generation Trend",
        prediction: "Analyzing waste generation patterns",
        confidence: 70
      },
      efficiency: {
        title: "Collection Efficiency",
        prediction: "Calculating efficiency metrics",
        confidence: 70
      },
      revenue: {
        title: "Revenue Forecast",
        prediction: "Analyzing revenue patterns",
        confidence: 70
      }
    };
  }
};

export default function Dashboard() {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [statsData, setStatsData] = useState({
    totalWaste: 0,
    totalRevenue: 0,
    statusBreakdown: {},
    wasteByType: {}
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [predictions, setPredictions] = useState(null);

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
    const fetchData = async () => {
      try {
        const [analyticsResponse, statsResponse] = await Promise.all([
          fetch('https://knowcode-protobuf-backend.vercel.app/api/v1/dashboards/analytics/monthly'),
          fetch('https://knowcode-protobuf-backend.vercel.app/api/v1/dashboards/stats')
        ]);

        if (!analyticsResponse.ok || !statsResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const analyticsResult = await analyticsResponse.json();
        const statsResult = await statsResponse.json();

        if (analyticsResult.status === 'success') {
          const transformedData = analyticsResult.data.monthlyData.map(item => ({
            month: getMonthName(item.month),
            waste: item.totalQuantity || 0,
            revenue: item.totalRevenue || 0,
            recycled: (item.totalQuantity || 0) * 0.8,
          }));
          setAnalyticsData(transformedData);
        }

        if (statsResult.status === 'success') {
          setStatsData(statsResult.data.stats);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Add effect to calculate predictions when data changes
  useEffect(() => {
    if (analyticsData.length > 0 && statsData) {
      const calculatedPredictions = calculatePredictions(analyticsData, statsData);
      setPredictions(calculatedPredictions);
    }
  }, [analyticsData, statsData]);

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

  // Replace the loading state with skeleton UI
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50 to-teal-50 pt-20">
        <div className="container py-6">
          {/* Header Skeleton */}
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          </div>

          {/* Stats Skeleton */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>

          {/* Main Content Skeleton */}
          <div className="grid gap-6 md:grid-cols-7">
            <div className="col-span-4">
              <SkeletonChart />
            </div>
            <div className="col-span-3 bg-white rounded-lg p-4 shadow">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <SkeletonActivity key={i} />
                ))}
              </div>
            </div>
          </div>

          {/* Environmental Impact Skeleton */}
          <div className="grid gap-6 md:grid-cols-7 mt-6">
            <div className="col-span-4">
              <SkeletonChart />
            </div>
            <div className="col-span-3">
              <div className="bg-white rounded-lg p-4 shadow">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
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
            value={`${formatNumber(statsData.totalWaste)} MT`}
            change={`${((analyticsData[analyticsData.length - 1]?.waste || 0) - (analyticsData[analyticsData.length - 2]?.waste || 0)).toFixed(1)}%`}
            color="green"
          />
          <QuickStatCard
            icon={<Factory />}
            title="Processing Centers"
            value={Object.keys(statsData.statusBreakdown).length || 0}
            subtext={`${Object.values(statsData.wasteByType).length} Types`}
            color="blue"
          />
          <QuickStatCard
            icon={<Wind />}
            title="CO₂ Emissions Saved"
            value={`${formatNumber(statsData.totalWaste * 0.5)} MT`}
            change="-25%"
            color="emerald"
          />
          <QuickStatCard
            icon={<DollarSign />}
            title="Revenue Generated"
            value={`₹${formatNumber(statsData.totalRevenue)}`}
            change={`${((analyticsData[analyticsData.length - 1]?.revenue || 0) - (analyticsData[analyticsData.length - 2]?.revenue || 0)).toFixed(1)}%`}
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
                {Object.entries(statsData.wasteByType).slice(0, 3).map(([type, amount], i) => (
                  <motion.div
                    key={type}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-lg bg-green-50/50 hover:bg-green-100/50 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Recycle className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{type}</div>
                      <div className="text-xs text-muted-foreground">{formatNumber(amount)} MT</div>
                    </div>
                    <span className="text-xs font-medium text-green-600">Active</span>
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

          {/* Prediction */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle className="text-green-800">Predictions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predictions ? (
                  <>
                    <PredictionCard
                      title={predictions.wasteForecast.title}
                      prediction={predictions.wasteForecast.prediction}
                      confidence={predictions.wasteForecast.confidence}
                    />
                    <PredictionCard
                      title={predictions.efficiency.title}
                      prediction={predictions.efficiency.prediction}
                      confidence={predictions.efficiency.confidence}
                    />
                    <PredictionCard
                      title={predictions.revenue.title}
                      prediction={predictions.revenue.prediction}
                      confidence={predictions.revenue.confidence}
                    />
                  </>
                ) : (
                  <div className="text-center text-gray-500 py-4">
                    Calculating predictions...
                  </div>
                )}
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

