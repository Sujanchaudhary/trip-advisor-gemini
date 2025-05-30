"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Plane,
  Building,
  Ship,
  Car,
  Star,
  Filter,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardPage() {
  // Mock data for charts
  const revenueData = [
    { name: "Jan", hotels: 45000, flights: 32000, cruises: 18000, cars: 12000 },
    { name: "Feb", hotels: 52000, flights: 38000, cruises: 22000, cars: 15000 },
    { name: "Mar", hotels: 48000, flights: 42000, cruises: 25000, cars: 18000 },
    { name: "Apr", hotels: 61000, flights: 45000, cruises: 28000, cars: 20000 },
    { name: "May", hotels: 55000, flights: 48000, cruises: 32000, cars: 22000 },
    { name: "Jun", hotels: 67000, flights: 52000, cruises: 35000, cars: 25000 },
  ];

  const bookingTrends = [
    { name: "Mon", bookings: 120 },
    { name: "Tue", bookings: 145 },
    { name: "Wed", bookings: 165 },
    { name: "Thu", bookings: 180 },
    { name: "Fri", bookings: 220 },
    { name: "Sat", bookings: 280 },
    { name: "Sun", bookings: 195 },
  ];

  const categoryData = [
    { name: "Hotels", value: 45, color: "#3B82F6" },
    { name: "Flights", value: 30, color: "#10B981" },
    { name: "Cruises", value: 15, color: "#F59E0B" },
    { name: "Cars", value: 10, color: "#EF4444" },
  ];

  const recentBookings = [
    {
      id: "BK001",
      customer: "Sarah Johnson",
      type: "Hotel",
      destination: "Paris, France",
      amount: 1250,
      status: "Confirmed",
      date: "2024-06-15",
    },
    {
      id: "BK002",
      customer: "Mike Chen",
      type: "Flight",
      destination: "Tokyo, Japan",
      amount: 890,
      status: "Pending",
      date: "2024-06-14",
    },
    {
      id: "BK003",
      customer: "Emma Wilson",
      type: "Cruise",
      destination: "Caribbean",
      amount: 2100,
      status: "Confirmed",
      date: "2024-06-14",
    },
    {
      id: "BK004",
      customer: "David Brown",
      type: "Car Rental",
      destination: "Los Angeles, CA",
      amount: 320,
      status: "Confirmed",
      date: "2024-06-13",
    },
  ];

  const topDestinations = [
    { name: "Paris, France", bookings: 1250, revenue: 125000 },
    { name: "Tokyo, Japan", bookings: 980, revenue: 98000 },
    { name: "New York, USA", bookings: 875, revenue: 87500 },
    { name: "London, UK", bookings: 720, revenue: 72000 },
    { name: "Rome, Italy", bookings: 650, revenue: 65000 },
  ];

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,345,678</div>
            <p className="text-xs text-muted-foreground">
              +12.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Bookings
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15,234</div>
            <p className="text-xs text-muted-foreground">
              +8.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89,432</div>
            <p className="text-xs text-muted-foreground">
              +15.3% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Conversion Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.24%</div>
            <p className="text-xs text-muted-foreground">
              +0.5% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="hotels" fill="#3B82F6" />
                <Bar dataKey="flights" fill="#10B981" />
                <Bar dataKey="cruises" fill="#F59E0B" />
                <Bar dataKey="cars" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Booking Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={bookingTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="#3B82F6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="bookings" className="space-y-6">
        <TabsList>
          <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
          <TabsTrigger value="destinations">Top Destinations</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Bookings</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        {booking.type === "Hotel" && (
                          <Building className="h-5 w-5" />
                        )}
                        {booking.type === "Flight" && (
                          <Plane className="h-5 w-5" />
                        )}
                        {booking.type === "Cruise" && (
                          <Ship className="h-5 w-5" />
                        )}
                        {booking.type === "Car Rental" && (
                          <Car className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{booking.customer}</h4>
                        <p className="text-sm text-gray-600">
                          {booking.type} • {booking.destination}
                        </p>
                        <p className="text-xs text-gray-500">{booking.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${booking.amount}</p>
                      <Badge
                        variant={
                          booking.status === "Confirmed"
                            ? "default"
                            : "secondary"
                        }
                        className={
                          booking.status === "Confirmed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {booking.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="destinations">
          <Card>
            <CardHeader>
              <CardTitle>Top Destinations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topDestinations.map((destination, index) => (
                  <div
                    key={destination.name}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium">{destination.name}</h4>
                        <p className="text-sm text-gray-600">
                          {destination.bookings} bookings
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        ${destination.revenue.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">Revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      Average Booking Value
                    </span>
                    <span className="text-lg font-bold">$1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      Customer Satisfaction
                    </span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-lg font-bold">4.6</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      Repeat Customers
                    </span>
                    <span className="text-lg font-bold">68%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Mobile Bookings</span>
                    <span className="text-lg font-bold">42%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
