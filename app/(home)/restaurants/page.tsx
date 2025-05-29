import { Search, Star, MapPin, Filter, Clock, DollarSign, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function RestaurantsPage() {
  const restaurants = [
    {
      id: 1,
      name: "Le Bernardin",
      cuisine: "French Fine Dining",
      location: "8th Arrondissement, Paris",
      rating: 4.9,
      reviews: 3247,
      priceRange: "$$$$",
      image: "/placeholder.svg?height=200&width=300",
      openNow: true,
      reservations: "Available today",
      specialties: ["Seafood", "Wine Pairing", "Michelin Star"],
    },
    {
      id: 2,
      name: "Bistro Paul Bert",
      cuisine: "Traditional French",
      location: "11th Arrondissement, Paris",
      rating: 4.6,
      reviews: 1923,
      priceRange: "$$$",
      image: "/placeholder.svg?height=200&width=300",
      openNow: true,
      reservations: "Book ahead",
      specialties: ["Steak Frites", "Wine Bar", "Local Favorite"],
    },
    {
      id: 3,
      name: "L'As du Fallafel",
      cuisine: "Middle Eastern",
      location: "Marais, Paris",
      rating: 4.4,
      reviews: 5621,
      priceRange: "$",
      image: "/placeholder.svg?height=200&width=300",
      openNow: false,
      reservations: "Walk-in only",
      specialties: ["Falafel", "Quick Bites", "Street Food"],
    },
  ]

  const cuisineTypes = [
    "French",
    "Italian",
    "Asian",
    "Mediterranean",
    "American",
    "Mexican",
    "Indian",
    "Japanese",
    "Thai",
    "Greek",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input placeholder="Paris, France" className="pl-10 h-12" />
            </div>
            <Input type="date" className="h-12" defaultValue="2024-06-15" />
            <Input type="time" className="h-12" defaultValue="19:00" />
            <div className="relative">
              <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input placeholder="2 people" className="pl-10 h-12" />
            </div>
          </div>
          <Button className="mt-4 bg-green-600 hover:bg-green-700">
            <Search className="h-5 w-5 mr-2" />
            Find restaurants
          </Button>
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

                {/* Cuisine Type */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Cuisine</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {cuisineTypes.map((cuisine) => (
                      <div key={cuisine} className="flex items-center space-x-2">
                        <input type="checkbox" id={cuisine} className="rounded" />
                        <label htmlFor={cuisine} className="text-sm">
                          {cuisine}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Price</h4>
                  <div className="space-y-2">
                    {["$", "$$", "$$$", "$$$$"].map((price) => (
                      <div key={price} className="flex items-center space-x-2">
                        <input type="checkbox" id={price} className="rounded" />
                        <label htmlFor={price} className="text-sm">
                          {price} {price === "$" && "(Under $15)"}
                          {price === "$$" && "($15-30)"}
                          {price === "$$$" && "($30-60)"}
                          {price === "$$$$" && "(Over $60)"}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Features</h4>
                  <div className="space-y-2">
                    {["Reservations", "Outdoor Seating", "Delivery", "Takeout", "Good for Groups", "Romantic"].map(
                      (feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <input type="checkbox" id={feature} className="rounded" />
                          <label htmlFor={feature} className="text-sm">
                            {feature}
                          </label>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold">Restaurants in Paris</h1>
                <p className="text-gray-600">Showing 1-10 of 8,247 restaurants</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select className="border rounded px-3 py-2 text-sm">
                  <option>Best match</option>
                  <option>Highest rated</option>
                  <option>Most reviews</option>
                  <option>Price (low to high)</option>
                  <option>Distance</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {restaurants.map((restaurant) => (
                <Card key={restaurant.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="flex">
                    <img
                      src={restaurant.image || "/placeholder.svg"}
                      alt={restaurant.name}
                      className="w-64 h-48 object-cover"
                    />
                    <CardContent className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{restaurant.name}</h3>
                          <p className="text-gray-600 text-sm mb-1">{restaurant.cuisine}</p>
                          <p className="text-gray-500 text-xs mb-3">{restaurant.location}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center mb-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="font-medium">{restaurant.rating}</span>
                            <span className="text-gray-600 text-sm ml-1">({restaurant.reviews})</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <DollarSign className="h-4 w-4 text-green-600 mr-1" />
                            <span>{restaurant.priceRange}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {restaurant.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex justify-between items-end">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span className={`text-sm ${restaurant.openNow ? "text-green-600" : "text-red-600"}`}>
                              {restaurant.openNow ? "Open now" : "Closed"}
                            </span>
                          </div>
                          <span className="text-sm text-gray-600">{restaurant.reservations}</span>
                        </div>
                        <div className="space-x-2">
                          <Button variant="outline">View Menu</Button>
                          <Button className="bg-green-600 hover:bg-green-700">Reserve</Button>
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
