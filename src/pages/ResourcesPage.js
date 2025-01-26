import React from "react";
import { motion } from "framer-motion";
import {
  Book,
  FileText,
  Video,
  Download,
  ArrowRight,
  BookOpen,
  Presentation,
  GraduationCap,
  BarChart, // Changed from ChartBar to BarChart
  Leaf
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";

const ResourcesPage = () => {
  const resources = [
    {
      category: "Waste Management Guides",
      items: [
        {
          title: "Agricultural Waste Management Basics",
          description: "Learn the fundamentals of sustainable waste management",
          icon: <Book className="w-6 h-6" />,
          type: "Guide",
          duration: "15 min read"
        },
        {
          title: "Composting Techniques",
          description: "Step-by-step guide to efficient composting",
          icon: <Leaf className="w-6 h-6" />,
          type: "Tutorial",
          duration: "20 min read"
        }
      ]
    },
    {
      category: "Supply Chain Optimization",
      items: [
        {
          title: "Route Optimization Guide",
          description: "Maximize efficiency in waste collection routes",
          icon: <BarChart className="w-6 h-6" />, // Changed from ChartBar to BarChart
          type: "Technical Guide",
          duration: "25 min read"
        },
        {
          title: "Transportation Cost Reduction",
          description: "Strategies for minimizing transportation costs",
          icon: <Presentation className="w-6 h-6" />,
          type: "Case Study",
          duration: "10 min read"
        }
      ]
    },
    {
      category: "Market Intelligence",
      items: [
        {
          title: "Waste to Value Guide",
          description: "Converting agricultural waste into valuable products",
          icon: <GraduationCap className="w-6 h-6" />,
          type: "Course",
          duration: "30 min"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50 to-teal-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold text-green-600 mb-2 block">RESOURCES</span>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4 pb-1">
            Learning Center
          </h1>
          <p className="text-green-700/80 max-w-2xl mx-auto">
            Comprehensive resources for agricultural waste management, supply chain optimization, and sustainable practices
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-8">
          <input
            type="search"
            placeholder="Search resources..."
            className="w-full max-w-md mx-auto block px-4 py-2 rounded-xl border border-green-100 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Resource Categories */}
        {resources.map((category, idx) => (
          <motion.div
            key={idx}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-semibold text-green-800 mb-6">{category.category}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="group"
                >
                  <Card className="border border-green-100 hover:shadow-lg transition-all duration-300">
                    <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                        {item.icon}
                      </div>
                      <div className="ml-4 flex-1">
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <span className="text-xs text-green-600">{item.type} • {item.duration}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                      <Button 
                        variant="ghost" 
                        className="text-green-600 hover:text-green-700 p-0 flex items-center"
                      >
                        Learn More <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Call to Action */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white text-center mt-12"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Implement These Practices?</h3>
          <p className="mb-6">Join our platform and start optimizing your agricultural waste management today</p>
          <Button
            variant="outline"
            className="bg-white text-green-600 hover:bg-green-50"
          >
            Get Started Now
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ResourcesPage;
