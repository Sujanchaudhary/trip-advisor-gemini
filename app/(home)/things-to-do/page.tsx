import { Search, Star, MapPin, Clock, Users, Camera, Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ThingsToDoPage() {
  const activities = [
    {
      id: 1,
      name: "Eiffel Tower Skip-the-Line Tour",
      category: "Attractions & Landmarks",
      location: "7th Arrondissement, Paris",
      rating: 4.8,
      reviews: 12847,
      price: 45,
      duration: "2-3 hours",
      image: "/placeholder.svg?height=200&width=300",
      highlights: ["Skip-the-line access", "Professional guide", "Small group"],
      availability: "Available today",
    },
    {
      id: 2,
      name: "Seine River Cruise with Dinner",
      category: "Cruises & Water Tours",
      location: "Seine River, Paris",
      rating: 4.6,
      reviews: 8923,
      price: 89,
      duration: "2.5 hours",
      image: "/placeholder.svg?height=200&width=300",
      highlights: ["3-course dinner", "Live music", "City views"],
      availability: "Book ahead",
    },
    {
      id: 3,
      name: "Louvre Museum Guided Tour",
      category: "Museums & Exhibitions",
      location: "1st Arrondissement, Paris",
      rating: 4.7,
      reviews: 15621,
      price: 65,
      duration: "3 hours",
      image: "/placeholder.svg?height=200&width=300",
      highlights: ["Mona Lisa viewing", "Expert guide", "Small groups"],
      availability: "Limited spots",
    },
  ]

  const categories = [
    "Attractions & Landmarks",
    "Museums & Exhibitions",
    "Tours & Experiences",
    "Food & Drink",
    "Outdoor Activities",
    "Entertainment & Nightlife",
    "Shopping",
    "Transportation",
    "Classes & Workshops",
    "Cruises & Water Tours",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input placeholder="Paris, France" className="pl-10 h-12" />
            </div>
            <Input type="date" className="h-12" defaultValue="2024-06-15" />
            <div className="relative">
              <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input placeholder="2 travelers" className="pl-10 h-12" />
            </div>
          </div>
          <Button className="mt-4 bg-green-600 hover:bg-green-700">
            <Search className="h-5 w-5 mr-2" />
            Search experiences
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className="w-80 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Filters</h3>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Category</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <input type="checkbox" id={category} className="rounded" />
                        <label htmlFor={category} className="text-sm">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="space-y-2">
                    {["Free", "Under $25", "$25 - $50", "$50 - $100", "Over $100"].map((price) => (
                      <div key={price} className="flex items-center space-x-2">
                        <input type="checkbox" id={price} className="rounded" />
                        <label htmlFor={price} className="text-sm">
                          {price}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Duration</h4>
                  <div className="space-y-2">
                    {["Under 1 hour", "1-3 hours", "3-6 hours", "6+ hours", "Multi-day"].map((duration) => (
                      <div key={duration} className="flex items-center space-x-2">
                        <input type="checkbox" id={duration} className="rounded" />
                        <label htmlFor={duration} className="text-sm">
                          {duration}
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
                <h1 className="text-2xl font-bold">Things to do in Paris</h1>
                <p className="text-gray-600">Showing 1-10 of 2,847 experiences</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select className="border rounded px-3 py-2 text-sm">
                  <option>Recommended</option>
                  <option>Price (low to high)</option>
                  <option>Price (high to low)</option>
                  <option>Highest rated</option>
                  <option>Most popular</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {activities.map((activity) => (
                <Card key={activity.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="flex">
                    <div className="relative">
                      <img
                        src={activity.image || "/placeholder.svg"}
                        alt={activity.name}
                        className="w-64 h-48 object-cover"
                      />
                      <Badge className="absolute top-2 left-2 bg-green-600">{activity.availability}</Badge>
                    </div>
                    <CardContent className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{activity.name}</h3>
                          <p className="text-gray-600 text-sm mb-1">{activity.category}</p>
                          <p className="text-gray-500 text-xs mb-3">{activity.location}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center mb-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="font-medium">{activity.rating}</span>
                            <span className="text-gray-600 text-sm ml-1">({activity.reviews})</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {activity.highlights.map((highlight) => (
                          <Badge key={highlight} variant="secondary" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex justify-between items-end">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-gray-500" />
                            <span className="text-sm text-gray-600">{activity.duration}</span>
                          </div>
                          <div className="flex items-center">
                            <Camera className="h-4 w-4 mr-1 text-gray-500" />
                            <span className="text-sm text-gray-600">Photo opportunities</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center justify-end mb-2">
                            <span className="text-sm text-gray-600 mr-1">From</span>
                            <span className="text-2xl font-bold text-green-600">${activity.price}</span>
                            <span className="text-sm text-gray-600 ml-1">per person</span>
                          </div>
                          <Button className="bg-green-600 hover:bg-green-700">
                            <Ticket className="h-4 w-4 mr-2" />
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
