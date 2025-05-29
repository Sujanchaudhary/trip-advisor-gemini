import {
  Search,
  Star,
  MapPin,
  SlidersHorizontal,
  Heart,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";

export default function HotelsPage() {
  const hotels = [
    {
      id: 1,
      name: "The Grand Palace Hotel",
      location: "Downtown Paris, France",
      rating: 4.8,
      reviews: 2847,
      price: 450,
      originalPrice: 520,
      image: "/placeholder.svg?height=200&width=300",
      amenities: ["Free WiFi", "Pool", "Spa", "Restaurant"],
      distance: "0.2 km from city center",
      availability: "Last 2 rooms",
    },
    {
      id: 2,
      name: "Boutique Hotel Lumière",
      location: "Montmartre, Paris, France",
      rating: 4.6,
      reviews: 1923,
      price: 320,
      originalPrice: 380,
      image: "/placeholder.svg?height=200&width=300",
      amenities: ["Free WiFi", "Restaurant", "Bar"],
      distance: "1.5 km from city center",
      availability: "Available",
    },
    {
      id: 3,
      name: "Hotel Moderne",
      location: "Latin Quarter, Paris, France",
      rating: 4.4,
      reviews: 3421,
      price: 280,
      originalPrice: 320,
      image: "/placeholder.svg?height=200&width=300",
      amenities: ["Free WiFi", "Gym", "Business Center"],
      distance: "0.8 km from city center",
      availability: "Available",
    },
  ];

  const amenities = [
    "Free WiFi",
    "Swimming Pool",
    "Spa",
    "Restaurant",
    "Bar",
    "Gym",
    "Parking",
    "Pet Friendly",
    "Business Center",
    "Room Service",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input placeholder="Paris, France" className="pl-10 h-12" />
            </div>
            <Input type="date" className="h-12" defaultValue="2024-06-15" />
            <Input type="date" className="h-12" defaultValue="2024-06-18" />
            <Input placeholder="2 guests" className="h-12" />
            <Button className="h-12 bg-green-600 hover:bg-green-700">
              <Search className="h-5 w-5 mr-2" />
              Search
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
                  <SlidersHorizontal className="h-5 w-5 mr-2" />
                  Filters
                </h3>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Price per night</h4>
                  <Slider
                    defaultValue={[100, 500]}
                    max={1000}
                    step={10}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>$100</span>
                    <span>$500+</span>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Star rating</h4>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center space-x-2">
                        <Checkbox id={`stars-${stars}`} />
                        <label
                          htmlFor={`stars-${stars}`}
                          className="flex items-center text-sm"
                        >
                          {Array.from({ length: stars }).map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                          <span className="ml-2">
                            {stars} star{stars !== 1 ? "s" : ""}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Amenities</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox id={amenity} />
                        <label htmlFor={amenity} className="text-sm">
                          {amenity}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Clear all filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold">Hotels in Paris</h1>
                <p className="text-gray-600">
                  Showing 1-10 of 1,247 properties
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select className="border rounded px-3 py-2 text-sm">
                  <option>Best value</option>
                  <option>Price (low to high)</option>
                  <option>Price (high to low)</option>
                  <option>Guest rating</option>
                  <option>Distance</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {hotels.map((hotel) => (
                <Card
                  key={hotel.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="flex">
                    <div className="relative">
                      <img
                        src={hotel.image || "/placeholder.svg"}
                        alt={hotel.name}
                        className="w-64 h-48 object-cover"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardContent className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">
                            {hotel.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">
                            {hotel.location}
                          </p>
                          <p className="text-gray-500 text-xs mb-3">
                            {hotel.distance}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center mb-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="font-medium">{hotel.rating}</span>
                            <span className="text-gray-600 text-sm ml-1">
                              ({hotel.reviews})
                            </span>
                          </div>
                          {hotel.availability === "Last 2 rooms" && (
                            <Badge variant="destructive" className="text-xs">
                              {hotel.availability}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {hotel.amenities.slice(0, 4).map((amenity) => (
                          <Badge
                            key={amenity}
                            variant="secondary"
                            className="text-xs"
                          >
                            {amenity}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex justify-between items-end">
                        <div className="flex items-center space-x-2">
                          <Wifi className="h-4 w-4 text-green-600" />
                          <Car className="h-4 w-4 text-blue-600" />
                          <Utensils className="h-4 w-4 text-orange-600" />
                          <Dumbbell className="h-4 w-4 text-purple-600" />
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-500 line-through text-sm">
                              ${hotel.originalPrice}
                            </span>
                            <span className="text-2xl font-bold text-green-600">
                              ${hotel.price}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">
                            per night
                          </p>
                          <Link href={`/hotels/${hotel.id}`}>
                            <Button className="bg-green-600 hover:bg-green-700">
                              View Deal
                            </Button>
                          </Link>{" "}
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <div className="flex space-x-2">
                <Button variant="outline" disabled>
                  Previous
                </Button>
                <Button variant="outline" className="bg-green-600 text-white">
                  1
                </Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
