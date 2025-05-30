"use client"

import { useState, useEffect } from "react"
import { Search, Ship, Calendar, Users, MapPin, Star, Anchor, Waves } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Cruise {
  id: string
  name: string
  cruiseLine: string
  ship: string
  duration: number
  departure: {
    port: string
    city: string
    date: string
  }
  destinations: string[]
  price: number
  originalPrice: number
  rating: number
  reviews: number
  image: string
  highlights: string[]
  cabinType: string
  mealsIncluded: boolean
  activitiesIncluded: string[]
}

export default function CruisesPage() {
  const [cruises, setCruises] = useState<Cruise[]>([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useState({
    destination: "Caribbean",
    departure: "2024-07-15",
    duration: "7",
    passengers: 2,
  })

  const generateMockCruises = () => {
    const cruiseLines = ["Royal Caribbean", "Norwegian", "Carnival", "Princess", "Celebrity", "MSC"]
    const ships = [
      "Symphony of the Seas",
      "Norwegian Bliss",
      "Carnival Vista",
      "Princess Crown",
      "Celebrity Edge",
      "MSC Seaside",
    ]
    const destinations = [
      ["Cozumel", "Jamaica", "Grand Cayman"],
      ["St. Thomas", "St. Maarten", "Barbados"],
      ["Bahamas", "Key West", "Cozumel"],
      ["Barcelona", "Rome", "Naples"],
      ["Santorini", "Mykonos", "Rhodes"],
      ["Alaska", "Juneau", "Ketchikan"],
    ]

    const mockCruises: Cruise[] = []

    for (let i = 0; i < 12; i++) {
      const cruiseLine = cruiseLines[Math.floor(Math.random() * cruiseLines.length)]
      const ship = ships[Math.floor(Math.random() * ships.length)]
      const destinationSet = destinations[Math.floor(Math.random() * destinations.length)]
      const duration = [7, 10, 14][Math.floor(Math.random() * 3)]
      const basePrice = 800 + Math.floor(Math.random() * 2000)
      const discount = Math.floor(Math.random() * 500)

      mockCruises.push({
        id: `cruise-${i}`,
        name: `${duration}-Day ${searchParams.destination} Cruise`,
        cruiseLine,
        ship,
        duration,
        departure: {
          port: "Port Everglades",
          city: "Fort Lauderdale, FL",
          date: searchParams.departure,
        },
        destinations: destinationSet,
        price: basePrice - discount,
        originalPrice: basePrice,
        rating: 4.2 + Math.random() * 0.6,
        reviews: 500 + Math.floor(Math.random() * 3000),
        image: "/placeholder.svg?height=200&width=300",
        highlights: [
          "All meals included",
          "Entertainment shows",
          "Pool deck",
          "Spa & wellness",
          "Kids club",
          "Casino",
        ].slice(0, 3 + Math.floor(Math.random() * 3)),
        cabinType: ["Interior", "Ocean View", "Balcony", "Suite"][Math.floor(Math.random() * 4)],
        mealsIncluded: true,
        activitiesIncluded: ["Pool", "Entertainment", "Gym", "Kids Activities"],
      })
    }

    return mockCruises.sort((a, b) => a.price - b.price)
  }

  useEffect(() => {
    const fetchCruises = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1200))

      try {
        // In real implementation, call cruise API here
        const mockData = generateMockCruises()
        setCruises(mockData)
      } catch (error) {
        console.error("Error fetching cruises:", error)
        setCruises(generateMockCruises())
      }

      setLoading(false)
    }

    fetchCruises()
  }, [searchParams])

  const handleSearch = () => {
    setCruises([])
    setLoading(true)
    setTimeout(() => {
      setCruises(generateMockCruises())
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={searchParams.destination}
                onChange={(e) => setSearchParams({ ...searchParams, destination: e.target.value })}
                className="pl-10 h-12 w-full border rounded-md"
              >
                <option value="Caribbean">Caribbean</option>
                <option value="Mediterranean">Mediterranean</option>
                <option value="Alaska">Alaska</option>
                <option value="Northern Europe">Northern Europe</option>
                <option value="Asia">Asia</option>
              </select>
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="date"
                value={searchParams.departure}
                onChange={(e) => setSearchParams({ ...searchParams, departure: e.target.value })}
                className="pl-10 h-12"
              />
            </div>
            <div className="relative">
              <select
                value={searchParams.duration}
                onChange={(e) => setSearchParams({ ...searchParams, duration: e.target.value })}
                className="h-12 w-full border rounded-md px-3"
              >
                <option value="7">7 days</option>
                <option value="10">10 days</option>
                <option value="14">14 days</option>
                <option value="21">21+ days</option>
              </select>
            </div>
            <div className="relative">
              <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="2 passengers"
                value={`${searchParams.passengers} passenger${searchParams.passengers > 1 ? "s" : ""}`}
                className="pl-10 h-12"
              />
            </div>
            <Button onClick={handleSearch} className="h-12 bg-green-600 hover:bg-green-700">
              <Search className="h-5 w-5 mr-2" />
              Search Cruises
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
                  <Ship className="h-5 w-5 mr-2" />
                  Filters
                </h3>

                {/* Cruise Lines */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Cruise Lines</h4>
                  <div className="space-y-2">
                    {["Royal Caribbean", "Norwegian", "Carnival", "Princess", "Celebrity"].map((line) => (
                      <div key={line} className="flex items-center space-x-2">
                        <input type="checkbox" id={line} className="rounded" />
                        <label htmlFor={line} className="text-sm">
                          {line}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cabin Type */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Cabin Type</h4>
                  <div className="space-y-2">
                    {["Interior", "Ocean View", "Balcony", "Suite"].map((cabin) => (
                      <div key={cabin} className="flex items-center space-x-2">
                        <input type="checkbox" id={cabin} className="rounded" />
                        <label htmlFor={cabin} className="text-sm">
                          {cabin}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Amenities</h4>
                  <div className="space-y-2">
                    {["All meals included", "WiFi", "Spa", "Casino", "Kids club", "Pool deck"].map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <input type="checkbox" id={amenity} className="rounded" />
                        <label htmlFor={amenity} className="text-sm">
                          {amenity}
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
                <h1 className="text-2xl font-bold">{searchParams.destination} Cruises</h1>
                <p className="text-gray-600">{loading ? "Searching..." : `${cruises.length} cruises found`}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select className="border rounded px-3 py-2 text-sm">
                  <option>Best value</option>
                  <option>Price (low to high)</option>
                  <option>Price (high to low)</option>
                  <option>Duration</option>
                  <option>Guest rating</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="w-64 h-48 bg-gray-200 rounded"></div>
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
                {cruises.map((cruise) => (
                  <Card key={cruise.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="flex">
                      <div className="relative">
                        <img
                          src={cruise.image || "/placeholder.svg"}
                          alt={cruise.name}
                          className="w-64 h-48 object-cover"
                        />
                        <Badge className="absolute top-2 left-2 bg-blue-600">
                          <Anchor className="h-3 w-3 mr-1" />
                          {cruise.duration} days
                        </Badge>
                      </div>
                      <CardContent className="flex-1 p-6">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-xl font-semibold mb-1">{cruise.name}</h3>
                            <p className="text-gray-600 text-sm mb-1">
                              {cruise.cruiseLine} • {cruise.ship}
                            </p>
                            <p className="text-gray-500 text-xs mb-2">
                              Departing from {cruise.departure.port}, {cruise.departure.city}
                            </p>
                            <div className="flex items-center mb-3">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                              <span className="font-medium">{cruise.rating.toFixed(1)}</span>
                              <span className="text-gray-600 text-sm ml-1">({cruise.reviews} reviews)</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-gray-500 line-through text-sm">${cruise.originalPrice}</span>
                              <span className="text-2xl font-bold text-green-600">${cruise.price}</span>
                            </div>
                            <p className="text-xs text-gray-600">per person</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="font-medium text-sm mb-2">Destinations:</h4>
                          <div className="flex flex-wrap gap-1">
                            {cruise.destinations.map((dest) => (
                              <Badge key={dest} variant="secondary" className="text-xs">
                                {dest}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {cruise.highlights.map((highlight) => (
                            <Badge key={highlight} className="bg-blue-100 text-blue-800 text-xs">
                              {highlight}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex justify-between items-end">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Waves className="h-4 w-4 mr-1 text-blue-500" />
                              <span className="text-sm text-gray-600">{cruise.cabinType} cabin</span>
                            </div>
                            {cruise.mealsIncluded && (
                              <Badge className="bg-green-100 text-green-800 text-xs">All meals included</Badge>
                            )}
                          </div>
                          <div className="space-x-2">
                            <Button variant="outline">View Details</Button>
                            <Button className="bg-green-600 hover:bg-green-700">Book Now</Button>
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
