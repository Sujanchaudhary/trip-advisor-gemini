"use client"

import { useState, useEffect } from "react"
import { Search, Car, Calendar, MapPin, Users, Fuel, Settings, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface RentalCar {
  id: string
  company: string
  model: string
  category: string
  passengers: number
  bags: number
  transmission: string
  fuelType: string
  price: number
  originalPrice: number
  image: string
  features: string[]
  rating: number
  reviews: number
  mileage: string
  insurance: boolean
  location: string
}

export default function RentalCarsPage() {
  const [cars, setCars] = useState<RentalCar[]>([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useState({
    pickupLocation: "Paris, France",
    pickupDate: "2024-06-15",
    pickupTime: "10:00",
    returnDate: "2024-06-18",
    returnTime: "10:00",
    age: "30",
  })

  const generateMockCars = () => {
    const companies = ["Hertz", "Avis", "Enterprise", "Budget", "Europcar", "Sixt"]
    const models = [
      { name: "Peugeot 208", category: "Economy", passengers: 4, bags: 2 },
      { name: "Volkswagen Golf", category: "Compact", passengers: 5, bags: 3 },
      { name: "BMW 3 Series", category: "Premium", passengers: 5, bags: 4 },
      { name: "Mercedes C-Class", category: "Luxury", passengers: 5, bags: 4 },
      { name: "Ford Transit", category: "Van", passengers: 8, bags: 6 },
      { name: "Renault Clio", category: "Economy", passengers: 4, bags: 2 },
      { name: "Audi A4", category: "Premium", passengers: 5, bags: 4 },
      { name: "Fiat 500", category: "Mini", passengers: 4, bags: 1 },
    ]

    const mockCars: RentalCar[] = []

    for (let i = 0; i < 10; i++) {
      const company = companies[Math.floor(Math.random() * companies.length)]
      const model = models[Math.floor(Math.random() * models.length)]
      const basePrice = 25 + Math.floor(Math.random() * 150)
      const discount = Math.floor(Math.random() * 20)

      mockCars.push({
        id: `car-${i}`,
        company,
        model: model.name,
        category: model.category,
        passengers: model.passengers,
        bags: model.bags,
        transmission: Math.random() > 0.3 ? "Automatic" : "Manual",
        fuelType: Math.random() > 0.8 ? "Electric" : "Petrol",
        price: basePrice - discount,
        originalPrice: basePrice,
        image: "/placeholder.svg?height=200&width=300",
        features: [
          "Air Conditioning",
          "GPS Navigation",
          "Bluetooth",
          "USB Charging",
          "Cruise Control",
          "Parking Sensors",
        ].slice(0, 3 + Math.floor(Math.random() * 3)),
        rating: 4.0 + Math.random() * 1.0,
        reviews: 50 + Math.floor(Math.random() * 500),
        mileage: "Unlimited",
        insurance: Math.random() > 0.5,
        location: "Charles de Gaulle Airport",
      })
    }

    return mockCars.sort((a, b) => a.price - b.price)
  }

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      try {
        // In real implementation, call rental car API here
        const mockData = generateMockCars()
        setCars(mockData)
      } catch (error) {
        console.error("Error fetching cars:", error)
        setCars(generateMockCars())
      }

      setLoading(false)
    }

    fetchCars()
  }, [searchParams])

  const handleSearch = () => {
    setCars([])
    setLoading(true)
    setTimeout(() => {
      setCars(generateMockCars())
      setLoading(false)
    }, 800)
  }

  const calculateDays = () => {
    const pickup = new Date(searchParams.pickupDate)
    const returnDate = new Date(searchParams.returnDate)
    const diffTime = Math.abs(returnDate.getTime() - pickup.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Pick-up location"
                value={searchParams.pickupLocation}
                onChange={(e) => setSearchParams({ ...searchParams, pickupLocation: e.target.value })}
                className="pl-10 h-12"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="date"
                value={searchParams.pickupDate}
                onChange={(e) => setSearchParams({ ...searchParams, pickupDate: e.target.value })}
                className="pl-10 h-12"
              />
            </div>
            <Input
              type="time"
              value={searchParams.pickupTime}
              onChange={(e) => setSearchParams({ ...searchParams, pickupTime: e.target.value })}
              className="h-12"
            />
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="date"
                value={searchParams.returnDate}
                onChange={(e) => setSearchParams({ ...searchParams, returnDate: e.target.value })}
                className="pl-10 h-12"
              />
            </div>
            <Input
              type="time"
              value={searchParams.returnTime}
              onChange={(e) => setSearchParams({ ...searchParams, returnTime: e.target.value })}
              className="h-12"
            />
            <Button onClick={handleSearch} className="h-12 bg-green-600 hover:bg-green-700">
              <Search className="h-5 w-5 mr-2" />
              Search Cars
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className="w-80 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Car className="h-5 w-5 mr-2" />
                  Filters
                </h3>

                {/* Car Category */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Car Category</h4>
                  <div className="space-y-2">
                    {["Mini", "Economy", "Compact", "Premium", "Luxury", "Van"].map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <input type="checkbox" id={category} className="rounded" />
                        <label htmlFor={category} className="text-sm">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rental Company */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Rental Company</h4>
                  <div className="space-y-2">
                    {["Hertz", "Avis", "Enterprise", "Budget", "Europcar"].map((company) => (
                      <div key={company} className="flex items-center space-x-2">
                        <input type="checkbox" id={company} className="rounded" />
                        <label htmlFor={company} className="text-sm">
                          {company}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Features</h4>
                  <div className="space-y-2">
                    {["Air Conditioning", "GPS Navigation", "Automatic", "Bluetooth", "USB Charging"].map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <input type="checkbox" id={feature} className="rounded" />
                        <label htmlFor={feature} className="text-sm">
                          {feature}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold">Rental Cars in {searchParams.pickupLocation}</h1>
                <p className="text-gray-600">
                  {loading ? "Searching..." : `${cars.length} cars found`} • {calculateDays()} days rental
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select className="border rounded px-3 py-2 text-sm">
                  <option>Price (low to high)</option>
                  <option>Price (high to low)</option>
                  <option>Customer rating</option>
                  <option>Car category</option>
                  <option>Rental company</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="w-48 h-32 bg-gray-200 rounded"></div>
                        <div className="flex-1 space-y-4">
                          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {cars.map((car) => (
                  <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="flex">
                      <div className="relative">
                        <img src={car.image || "/placeholder.svg"} alt={car.model} className="w-48 h-32 object-cover" />
                        <Badge className="absolute top-2 left-2 bg-blue-600">{car.category}</Badge>
                      </div>
                      <CardContent className="flex-1 p-6">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-xl font-semibold mb-1">{car.model}</h3>
                            <p className="text-gray-600 text-sm mb-2">{car.company}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                <span>{car.passengers} passengers</span>
                              </div>
                              <div className="flex items-center">
                                <Car className="h-4 w-4 mr-1" />
                                <span>{car.bags} bags</span>
                              </div>
                              <div className="flex items-center">
                                <Settings className="h-4 w-4 mr-1" />
                                <span>{car.transmission}</span>
                              </div>
                              <div className="flex items-center">
                                <Fuel className="h-4 w-4 mr-1" />
                                <span>{car.fuelType}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-gray-500 line-through text-sm">${car.originalPrice}</span>
                              <span className="text-2xl font-bold text-green-600">${car.price}</span>
                            </div>
                            <p className="text-xs text-gray-600">per day</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {car.features.map((feature) => (
                            <Badge key={feature} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {car.insurance && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              <Shield className="h-3 w-3 mr-1" />
                              Insurance included
                            </Badge>
                          )}
                        </div>

                        <div className="flex justify-between items-end">
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">Pick-up: {car.location}</span>
                            <span className="text-sm text-gray-600">{car.mileage} mileage</span>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-600 mb-2">
                              Total: ${car.price * calculateDays()}
                            </div>
                            <Button className="bg-green-600 hover:bg-green-700">Reserve Now</Button>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
