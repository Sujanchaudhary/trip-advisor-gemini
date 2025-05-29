"use client"

import { useState, useEffect } from "react"
import { Search, Plane, Filter, Calendar, Users, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Flight {
  id: string
  airline: string
  flightNumber: string
  departure: {
    airport: string
    city: string
    time: string
    date: string
  }
  arrival: {
    airport: string
    city: string
    time: string
    date: string
  }
  duration: string
  price: number
  stops: number
  aircraft: string
}

export default function FlightsPage() {
  const [flights, setFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useState({
    from: "JFK",
    to: "CDG",
    departure: "2024-06-15",
    return: "2024-06-22",
    passengers: 1,
    tripType: "roundtrip",
  })

  // Mock flight data generator (since we need a working example)
  const generateMockFlights = () => {
    const airlines = ["Air France", "Delta", "United", "British Airways", "Lufthansa", "KLM"]
    const aircraftTypes = ["Boeing 777", "Airbus A350", "Boeing 787", "Airbus A380", "Boeing 737"]

    const mockFlights: Flight[] = []

    for (let i = 0; i < 10; i++) {
      const airline = airlines[Math.floor(Math.random() * airlines.length)]
      const flightNumber = `${airline.substring(0, 2).toUpperCase()}${Math.floor(Math.random() * 9000) + 1000}`
      const stops = Math.floor(Math.random() * 3)
      const basePrice = 400 + Math.floor(Math.random() * 800)
      const duration = `${7 + Math.floor(Math.random() * 8)}h ${Math.floor(Math.random() * 60)}m`

      mockFlights.push({
        id: `flight-${i}`,
        airline,
        flightNumber,
        departure: {
          airport: "JFK",
          city: "New York",
          time: `${6 + Math.floor(Math.random() * 12)}:${Math.floor(Math.random() * 60)
            .toString()
            .padStart(2, "0")}`,
          date: searchParams.departure,
        },
        arrival: {
          airport: "CDG",
          city: "Paris",
          time: `${8 + Math.floor(Math.random() * 12)}:${Math.floor(Math.random() * 60)
            .toString()
            .padStart(2, "0")}`,
          date: searchParams.departure,
        },
        duration,
        price: basePrice,
        stops,
        aircraft: aircraftTypes[Math.floor(Math.random() * aircraftTypes.length)],
      })
    }

    return mockFlights.sort((a, b) => a.price - b.price)
  }

  // Simulate API call
  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would call an actual API here
      // For example: Amadeus API, Skyscanner API, or Aviationstack API
      try {
        // Example API call structure:
        // const response = await fetch(`https://api.aviationstack.com/v1/flights?access_key=YOUR_KEY&dep_iata=${searchParams.from}&arr_iata=${searchParams.to}`)
        // const data = await response.json()

        // For now, using mock data
        const mockData = generateMockFlights()
        setFlights(mockData)
      } catch (error) {
        console.error("Error fetching flights:", error)
        // Fallback to mock data
        setFlights(generateMockFlights())
      }

      setLoading(false)
    }

    fetchFlights()
  }, [searchParams])

  const handleSearch = () => {
    // Trigger new search with updated parameters
    setFlights([])
    setLoading(true)
    // In real implementation, this would trigger the API call with new search params
    setTimeout(() => {
      setFlights(generateMockFlights())
      setLoading(false)
    }, 1000)
  }

  const formatDuration = (duration: string) => {
    return duration.replace("h", " hr ").replace("m", " min")
  }

  const getStopsText = (stops: number) => {
    if (stops === 0) return "Nonstop"
    if (stops === 1) return "1 stop"
    return `${stops} stops`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <Tabs
            value={searchParams.tripType}
            onValueChange={(value) => setSearchParams({ ...searchParams, tripType: value })}
          >
            <TabsList className="mb-4">
              <TabsTrigger value="roundtrip">Round trip</TabsTrigger>
              <TabsTrigger value="oneway">One way</TabsTrigger>
              <TabsTrigger value="multicity">Multi-city</TabsTrigger>
            </TabsList>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="From"
                  value={searchParams.from}
                  onChange={(e) => setSearchParams({ ...searchParams, from: e.target.value })}
                  className="pl-10 h-12"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="To"
                  value={searchParams.to}
                  onChange={(e) => setSearchParams({ ...searchParams, to: e.target.value })}
                  className="pl-10 h-12"
                />
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
              {searchParams.tripType === "roundtrip" && (
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="date"
                    value={searchParams.return}
                    onChange={(e) => setSearchParams({ ...searchParams, return: e.target.value })}
                    className="pl-10 h-12"
                  />
                </div>
              )}
              <div className="relative">
                <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="1 passenger"
                  value={`${searchParams.passengers} passenger${searchParams.passengers > 1 ? "s" : ""}`}
                  className="pl-10 h-12"
                />
              </div>
              <Button onClick={handleSearch} className="h-12 bg-green-600 hover:bg-green-700">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </Tabs>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className="w-80 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </h3>

                {/* Stops */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Stops</h4>
                  <div className="space-y-2">
                    {["Nonstop", "1 stop", "2+ stops"].map((stop) => (
                      <div key={stop} className="flex items-center space-x-2">
                        <input type="checkbox" id={stop} className="rounded" />
                        <label htmlFor={stop} className="text-sm">
                          {stop}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Airlines */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Airlines</h4>
                  <div className="space-y-2">
                    {["Air France", "Delta", "United", "British Airways", "Lufthansa"].map((airline) => (
                      <div key={airline} className="flex items-center space-x-2">
                        <input type="checkbox" id={airline} className="rounded" />
                        <label htmlFor={airline} className="text-sm">
                          {airline}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Departure Time */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Departure Time</h4>
                  <div className="space-y-2">
                    {[
                      "Early morning (6AM - 12PM)",
                      "Afternoon (12PM - 6PM)",
                      "Evening (6PM - 12AM)",
                      "Night (12AM - 6AM)",
                    ].map((time) => (
                      <div key={time} className="flex items-center space-x-2">
                        <input type="checkbox" id={time} className="rounded" />
                        <label htmlFor={time} className="text-sm">
                          {time}
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
                <h1 className="text-2xl font-bold">
                  Flights from {searchParams.from} to {searchParams.to}
                </h1>
                <p className="text-gray-600">{loading ? "Searching..." : `${flights.length} flights found`}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select className="border rounded px-3 py-2 text-sm">
                  <option>Best value</option>
                  <option>Price (low to high)</option>
                  <option>Duration (shortest)</option>
                  <option>Departure time</option>
                  <option>Arrival time</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-32"></div>
                          <div className="h-6 bg-gray-200 rounded w-48"></div>
                        </div>
                        <div className="h-8 bg-gray-200 rounded w-24"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {flights.map((flight) => (
                  <Card key={flight.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4">
                              <div className="text-center">
                                <div className="text-2xl font-bold">{flight.departure.time}</div>
                                <div className="text-sm text-gray-600">{flight.departure.airport}</div>
                                <div className="text-xs text-gray-500">{flight.departure.city}</div>
                              </div>

                              <div className="flex-1 px-4">
                                <div className="flex items-center justify-center space-x-2">
                                  <div className="flex-1 border-t border-gray-300"></div>
                                  <div className="text-center">
                                    <Plane className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                                    <div className="text-xs text-gray-600">{formatDuration(flight.duration)}</div>
                                    <div className="text-xs text-gray-500">{getStopsText(flight.stops)}</div>
                                  </div>
                                  <div className="flex-1 border-t border-gray-300"></div>
                                </div>
                              </div>

                              <div className="text-center">
                                <div className="text-2xl font-bold">{flight.arrival.time}</div>
                                <div className="text-sm text-gray-600">{flight.arrival.airport}</div>
                                <div className="text-xs text-gray-500">{flight.arrival.city}</div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="text-sm">
                                <span className="font-medium">{flight.airline}</span>
                                <span className="text-gray-600 ml-2">{flight.flightNumber}</span>
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                {flight.aircraft}
                              </Badge>
                              {flight.stops === 0 && (
                                <Badge className="bg-green-100 text-green-800 text-xs">Nonstop</Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="text-right ml-6">
                          <div className="text-3xl font-bold text-green-600 mb-1">${flight.price}</div>
                          <div className="text-sm text-gray-600 mb-3">per person</div>
                          <Button className="bg-green-600 hover:bg-green-700">Select Flight</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {!loading && flights.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Plane className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No flights found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria or dates.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
