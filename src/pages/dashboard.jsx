import React from "react";
import { Link } from "react-router-dom"; // Ensure you install react-router-dom
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
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../components/ui/avatar";
import { Progress } from "../components/ui/progress";
import {
  Bell,
  Mail,
  Plus,
  Filter,
  ArrowRight,
  Play,
  Pause,
} from "lucide-react";

const analyticsData = [
  { month: "Jan", waste: 4000, recycled: 2400 },
  { month: "Feb", waste: 3000, recycled: 1398 },
  { month: "Mar", waste: 2000, recycled: 9800 },
  { month: "Apr", waste: 2780, recycled: 3908 },
  { month: "May", waste: 1890, recycled: 4800 },
  { month: "Jun", waste: 2390, recycled: 3800 },
];

export default function Dashboard() {
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

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-green-50 to-green-100/50"
    >
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="font-semibold text-green-800">Greenify</span>
            </Link>
            <input
              type="search"
              placeholder="Search waste collection..."
              className="w-[250px] rounded-md border bg-background px-3 py-1 text-sm"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Mail className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>TM</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container py-6">
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-green-900">Agricultural Waste Management</h1>
            <p className="text-muted-foreground">Transform agricultural waste into sustainable opportunities</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="border-green-600 text-green-700">
              <Filter className="mr-2 h-4 w-4" /> Filter Data
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" /> Register Waste
            </Button>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          <Card className="border-l-4 border-l-green-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Waste Collected</CardTitle>
              <ArrowRight className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">350,000 MT</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-yellow-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Collections</CardTitle>
              <ArrowRight className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">128</div>
              <p className="text-xs text-muted-foreground">Across 45 districts</p>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-blue-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recycling Rate</CardTitle>
              <ArrowRight className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">76%</div>
              <p className="text-xs text-muted-foreground">+5% efficiency</p>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-purple-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Carbon Offset</CardTitle>
              <ArrowRight className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">1,250 MT</div>
              <p className="text-xs text-muted-foreground">CO₂ prevented</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-6"
        >
          <Card className="col-span-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Waste Collection Analytics</CardTitle>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
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
                      <linearGradient id="colorRecycled" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="waste"
                      stroke="#22c55e"
                      fillOpacity={1}
                      fill="url(#colorWaste)"
                    />
                    <Area
                      type="monotone"
                      dataKey="recycled"
                      stroke="#3b82f6"
                      fillOpacity={1}
                      fill="url(#colorRecycled)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Latest Marketplace Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: "Paddy Straw", quantity: "50 MT", status: "Listed" },
                  { type: "Corn Stalks", quantity: "30 MT", status: "Processing" },
                  { type: "Sugarcane Waste", quantity: "45 MT", status: "Collected" },
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

        <motion.div
          variants={itemVariants}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-6"
        >
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Environmental Impact</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
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
            </CardContent>
          </Card>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="col-span-3"
          >
            <CardHeader>
              <CardTitle>Time Tracker</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <div className="text-4xl font-bold tabular-nums">01:24:08</div>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline">
                    <Play className="h-4 w-4 text-emerald-600" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Pause className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
