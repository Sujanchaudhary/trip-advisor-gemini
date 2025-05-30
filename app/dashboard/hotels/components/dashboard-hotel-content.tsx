"use client"

import { useState } from "react"
import {
  Building,
  MapPin,
  Star,
  Bed,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  Globe,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Hotel {
  id: string
  name: string
  location: {
    address: string
    city: string
    country: string
    coordinates: { lat: number; lng: number }
  }
  rating: number
  reviews: number
  category: "Luxury" | "Premium" | "Standard" | "Budget"
  status: "Active" | "Inactive" | "Pending" | "Maintenance"
  rooms: {
    total: number
    available: number
    occupied: number
    maintenance: number
  }
  amenities: string[]
  images: string[]
  contact: {
    phone: string
    email: string
    website: string
  }
  pricing: {
    averageRate: number
    minRate: number
    maxRate: number
  }
  performance: {
    occupancyRate: number
    revenue: number
    bookings: number
  }
  description: string
  checkInTime: string
  checkOutTime: string
  policies: string[]
  createdAt: string
  lastUpdated: string
}

interface RoomType {
  id: string
  name: string
  description: string
  capacity: number
  size: string
  amenities: string[]
  basePrice: number
  totalRooms: number
  availableRooms: number
  images: string[]
}

export default function DashboardHotelsContent() {
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")

  // Mock hotel data
  const hotels: Hotel[] = [
    {
      id: "1",
      name: "The Grand Palace Hotel",
      location: {
        address: "123 Champs-Élysées",
        city: "Paris",
        country: "France",
        coordinates: { lat: 48.8566, lng: 2.3522 },
      },
      rating: 4.8,
      reviews: 2847,
      category: "Luxury",
      status: "Active",
      rooms: {
        total: 150,
        available: 45,
        occupied: 98,
        maintenance: 7,
      },
      amenities: ["Free WiFi", "Pool", "Spa", "Restaurant", "Bar", "Gym", "Concierge", "Room Service"],
      images: ["/placeholder.svg?height=300&width=400"],
      contact: {
        phone: "+33 1 42 86 87 88",
        email: "info@grandpalace.com",
        website: "www.grandpalace.com",
      },
      pricing: {
        averageRate: 450,
        minRate: 320,
        maxRate: 1200,
      },
      performance: {
        occupancyRate: 85,
        revenue: 125000,
        bookings: 234,
      },
      description:
        "Experience luxury at its finest at The Grand Palace Hotel, located in the heart of Paris. Our elegant rooms and suites offer stunning city views.",
      checkInTime: "15:00",
      checkOutTime: "11:00",
      policies: ["No smoking", "Pets allowed with fee", "Cancellation 24h before"],
      createdAt: "2023-01-15T10:30:00Z",
      lastUpdated: "2024-06-01T14:20:00Z",
    },
    {
      id: "2",
      name: "Boutique Hotel Lumière",
      location: {
        address: "45 Rue de Montmartre",
        city: "Paris",
        country: "France",
        coordinates: { lat: 48.8566, lng: 2.3522 },
      },
      rating: 4.6,
      reviews: 1923,
      category: "Premium",
      status: "Active",
      rooms: {
        total: 80,
        available: 25,
        occupied: 52,
        maintenance: 3,
      },
      amenities: ["Free WiFi", "Restaurant", "Bar", "Concierge", "Business Center"],
      images: ["/placeholder.svg?height=300&width=400"],
      contact: {
        phone: "+33 1 45 23 45 67",
        email: "contact@lumiere.com",
        website: "www.lumiere.com",
      },
      pricing: {
        averageRate: 320,
        minRate: 250,
        maxRate: 500,
      },
      performance: {
        occupancyRate: 78,
        revenue: 89000,
        bookings: 156,
      },
      description: "A charming boutique hotel in the artistic Montmartre district with personalized service.",
      checkInTime: "14:00",
      checkOutTime: "12:00",
      policies: ["No smoking", "No pets", "Cancellation 48h before"],
      createdAt: "2023-03-20T09:15:00Z",
      lastUpdated: "2024-05-28T11:45:00Z",
    },
    {
      id: "3",
      name: "Hotel Moderne",
      location: {
        address: "78 Boulevard Saint-Germain",
        city: "Paris",
        country: "France",
        coordinates: { lat: 48.8566, lng: 2.3522 },
      },
      rating: 4.4,
      reviews: 3421,
      category: "Standard",
      status: "Maintenance",
      rooms: {
        total: 120,
        available: 0,
        occupied: 0,
        maintenance: 120,
      },
      amenities: ["Free WiFi", "Restaurant", "Business Center", "Laundry"],
      images: ["/placeholder.svg?height=300&width=400"],
      contact: {
        phone: "+33 1 43 26 97 57",
        email: "info@moderne.com",
        website: "www.moderne.com",
      },
      pricing: {
        averageRate: 280,
        minRate: 200,
        maxRate: 400,
      },
      performance: {
        occupancyRate: 0,
        revenue: 0,
        bookings: 0,
      },
      description: "Modern hotel in the Latin Quarter, currently undergoing renovation.",
      checkInTime: "15:00",
      checkOutTime: "11:00",
      policies: ["No smoking", "Pets allowed", "Flexible cancellation"],
      createdAt: "2022-11-10T16:00:00Z",
      lastUpdated: "2024-06-05T08:30:00Z",
    },
  ]

  const roomTypes: RoomType[] = [
    {
      id: "1",
      name: "Standard Room",
      description: "Comfortable room with city view",
      capacity: 2,
      size: "25 m²",
      amenities: ["Free WiFi", "Air Conditioning", "Minibar", "Safe"],
      basePrice: 320,
      totalRooms: 60,
      availableRooms: 18,
      images: ["/placeholder.svg?height=200&width=300"],
    },
    {
      id: "2",
      name: "Deluxe Room",
      description: "Spacious room with premium amenities",
      capacity: 2,
      size: "35 m²",
      amenities: ["Free WiFi", "City View", "Minibar", "Balcony", "Bathrobe"],
      basePrice: 450,
      totalRooms: 50,
      availableRooms: 15,
      images: ["/placeholder.svg?height=200&width=300"],
    },
    {
      id: "3",
      name: "Executive Suite",
      description: "Luxury suite with separate living area",
      capacity: 4,
      size: "65 m²",
      amenities: ["Free WiFi", "City View", "Separate Living Area", "Balcony", "Premium Amenities"],
      basePrice: 800,
      totalRooms: 25,
      availableRooms: 8,
      images: ["/placeholder.svg?height=200&width=300"],
    },
    {
      id: "4",
      name: "Presidential Suite",
      description: "Ultimate luxury with panoramic views",
      capacity: 6,
      size: "120 m²",
      amenities: ["Free WiFi", "Panoramic View", "Butler Service", "Private Terrace", "Jacuzzi"],
      basePrice: 1200,
      totalRooms: 15,
      availableRooms: 4,
      images: ["/placeholder.svg?height=200&width=300"],
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Inactive":
        return <AlertCircle className="h-4 w-4 text-gray-600" />
      case "Pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "Maintenance":
        return <AlertCircle className="h-4 w-4 text-orange-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Inactive":
        return "bg-gray-100 text-gray-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Maintenance":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "Luxury":
        return "bg-purple-100 text-purple-800"
      case "Premium":
        return "bg-blue-100 text-blue-800"
      case "Standard":
        return "bg-green-100 text-green-800"
      case "Budget":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredHotels = hotels.filter((hotel) => {
    const matchesSearch =
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.location.address.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || hotel.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesCategory = categoryFilter === "all" || hotel.category.toLowerCase() === categoryFilter.toLowerCase()
    const matchesLocation =
      locationFilter === "all" || hotel.location.city.toLowerCase() === locationFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesCategory && matchesLocation
  })

  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hotels</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hotels.length}</div>
            <p className="text-xs text-muted-foreground">+2 new this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Hotels</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hotels.filter((h) => h.status === "Active").length}</div>
            <p className="text-xs text-muted-foreground">Currently operational</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
            <Bed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hotels.reduce((sum, hotel) => sum + hotel.rooms.total, 0)}</div>
            <p className="text-xs text-muted-foreground">Across all properties</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Occupancy</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(hotels.reduce((sum, hotel) => sum + hotel.performance.occupancyRate, 0) / hotels.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Current occupancy rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search hotels, locations, or addresses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="luxury">Luxury</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="budget">Budget</SelectItem>
              </SelectContent>
            </Select>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="paris">Paris</SelectItem>
                <SelectItem value="london">London</SelectItem>
                <SelectItem value="new york">New York</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Hotels Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Hotels ({filteredHotels.length})</CardTitle>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Hotel
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hotel</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Rooms</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHotels.map((hotel) => (
                <TableRow key={hotel.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img
                        src={hotel.images[0] || "/placeholder.svg"}
                        alt={hotel.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-medium">{hotel.name}</div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                          <span>{hotel.rating}</span>
                          <span className="ml-1">({hotel.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{hotel.location.city}</div>
                      <div className="text-sm text-gray-500">{hotel.location.address}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getCategoryBadgeColor(hotel.category)}>{hotel.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{hotel.rooms.total} total</div>
                      <div className="text-sm text-gray-500">
                        {hotel.rooms.available} available • {hotel.rooms.occupied} occupied
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{hotel.performance.occupancyRate}% occupied</div>
                      <div className="text-sm text-gray-500">${hotel.performance.revenue.toLocaleString()} revenue</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(hotel.status)}
                      <Badge className={getStatusBadgeColor(hotel.status)}>{hotel.status}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setSelectedHotel(hotel)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Hotel
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="h-4 w-4 mr-2" />
                          Manage Rooms
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Hotel
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Hotel Details Modal */}
      <Dialog open={!!selectedHotel} onOpenChange={() => setSelectedHotel(null)}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedHotel?.name}</DialogTitle>
            <DialogDescription>
              {selectedHotel?.location.address}, {selectedHotel?.location.city}
            </DialogDescription>
          </DialogHeader>
          {selectedHotel && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="rooms">Rooms</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Hotel Name</label>
                        <p className="text-lg">{selectedHotel.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Category</label>
                        <div className="mt-1">
                          <Badge className={getCategoryBadgeColor(selectedHotel.category)}>
                            {selectedHotel.category}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Rating</label>
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-lg">{selectedHotel.rating}</span>
                          <span className="text-gray-600">({selectedHotel.reviews} reviews)</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Status</label>
                        <div className="flex items-center space-x-2 mt-1">
                          {getStatusIcon(selectedHotel.status)}
                          <Badge className={getStatusBadgeColor(selectedHotel.status)}>{selectedHotel.status}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Contact Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Address</label>
                        <div className="flex items-start space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                          <div>
                            <p>{selectedHotel.location.address}</p>
                            <p className="text-gray-600">
                              {selectedHotel.location.city}, {selectedHotel.location.country}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Phone</label>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <p>{selectedHotel.contact.phone}</p>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Email</label>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <p>{selectedHotel.contact.email}</p>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Website</label>
                        <div className="flex items-center space-x-2">
                          <Globe className="h-4 w-4 text-gray-400" />
                          <p>{selectedHotel.contact.website}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Description */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{selectedHotel.description}</p>
                  </CardContent>
                </Card>

                {/* Policies */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Policies & Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Check-in Time</label>
                        <p className="text-lg">{selectedHotel.checkInTime}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Check-out Time</label>
                        <p className="text-lg">{selectedHotel.checkOutTime}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Policies</label>
                        <ul className="text-sm text-gray-600 mt-1">
                          {selectedHotel.policies.map((policy, index) => (
                            <li key={index}>• {policy}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rooms" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {roomTypes.map((room) => (
                    <Card key={room.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">{room.name}</h3>
                            <p className="text-gray-600 text-sm">{room.description}</p>
                          </div>
                          <Badge variant="outline">${room.basePrice}/night</Badge>
                        </div>
                        <img
                          src={room.images[0] || "/placeholder.svg"}
                          alt={room.name}
                          className="w-full h-32 object-cover rounded-lg mb-4"
                        />
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Capacity:</span>
                            <span>{room.capacity} guests</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Size:</span>
                            <span>{room.size}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Total Rooms:</span>
                            <span>{room.totalRooms}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Available:</span>
                            <span className="text-green-600">{room.availableRooms}</span>
                          </div>
                        </div>
                        <div className="mt-4">
                          <label className="text-sm font-medium text-gray-500">Amenities</label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {room.amenities.slice(0, 3).map((amenity) => (
                              <Badge key={amenity} variant="secondary" className="text-xs">
                                {amenity}
                              </Badge>
                            ))}
                            {room.amenities.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{room.amenities.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="amenities" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Hotel Amenities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {selectedHotel.amenities.map((amenity) => (
                        <div key={amenity} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="performance" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Occupancy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-600">{selectedHotel.performance.occupancyRate}%</div>
                      <p className="text-sm text-gray-600">Current occupancy rate</p>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Occupied:</span>
                          <span>{selectedHotel.rooms.occupied} rooms</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Available:</span>
                          <span>{selectedHotel.rooms.available} rooms</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Maintenance:</span>
                          <span>{selectedHotel.rooms.maintenance} rooms</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-600">
                        ${selectedHotel.performance.revenue.toLocaleString()}
                      </div>
                      <p className="text-sm text-gray-600">This month</p>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Average Rate:</span>
                          <span>${selectedHotel.pricing.averageRate}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Min Rate:</span>
                          <span>${selectedHotel.pricing.minRate}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Max Rate:</span>
                          <span>${selectedHotel.pricing.maxRate}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-purple-600">{selectedHotel.performance.bookings}</div>
                      <p className="text-sm text-gray-600">This month</p>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Rating:</span>
                          <span>{selectedHotel.rating}/5.0</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Reviews:</span>
                          <span>{selectedHotel.reviews}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
