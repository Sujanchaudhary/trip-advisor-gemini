import {
  Search,
  Star,
  MapPin,
  Calendar,
  Users,
  ArrowRight,
  Plane,
  Building,
  Utensils,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Main() {
  const popularDestinations = [
    {
      name: "Paris",
      country: "France",
      image: "/placeholder.svg?height=200&width=300",
      reviews: "1.2M",
    },
    {
      name: "Tokyo",
      country: "Japan",
      image: "/placeholder.svg?height=200&width=300",
      reviews: "890K",
    },
    {
      name: "New York",
      country: "USA",
      image: "/placeholder.svg?height=200&width=300",
      reviews: "2.1M",
    },
    {
      name: "London",
      country: "UK",
      image: "/placeholder.svg?height=200&width=300",
      reviews: "1.8M",
    },
    {
      name: "Rome",
      country: "Italy",
      image: "/placeholder.svg?height=200&width=300",
      reviews: "950K",
    },
    {
      name: "Barcelona",
      country: "Spain",
      image: "/placeholder.svg?height=200&width=300",
      reviews: "780K",
    },
  ];

  const featuredHotels = [
    {
      name: "The Ritz Paris",
      location: "Paris, France",
      rating: 4.8,
      reviews: 2847,
      price: "$450",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Park Hyatt Tokyo",
      location: "Tokyo, Japan",
      rating: 4.7,
      reviews: 1923,
      price: "$380",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "The Plaza Hotel",
      location: "New York, USA",
      rating: 4.6,
      reviews: 3421,
      price: "$520",
      image: "/placeholder.svg?height=200&width=300",
    },
  ];

  const travelCategories = [
    {
      icon: Building,
      title: "Hotels",
      description: "Find the perfect place to stay",
      color: "bg-blue-500",
    },
    {
      icon: Utensils,
      title: "Restaurants",
      description: "Discover amazing dining",
      color: "bg-red-500",
    },
    {
      icon: Camera,
      title: "Things to do",
      description: "Explore attractions & activities",
      color: "bg-green-500",
    },
    {
      icon: Plane,
      title: "Flights",
      description: "Book your next adventure",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Your trip starts here
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Search prices for hotels, flights and rental cars. Get inspired by
              real traveler reviews.
            </p>

            {/* Search Widget */}
            <div className="bg-white rounded-lg p-6 shadow-xl max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Where to?"
                    className="pl-10 h-12 text-gray-900"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Check-in"
                    className="pl-10 h-12 text-gray-900"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Check-out"
                    className="pl-10 h-12 text-gray-900"
                  />
                </div>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Guests"
                    className="pl-10 h-12 text-gray-900"
                  />
                </div>
              </div>
              <Button className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Plan your perfect trip
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {travelCategories.map((category, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow cursor-pointer"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-600">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Popular destinations</h2>
            <Button variant="outline" className="flex items-center">
              See all <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularDestinations.map((destination, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="relative">
                  <picture>
                    <img
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      className="w-full h-48 object-cover"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{destination.name}</h3>
                    <p className="text-sm opacity-90">{destination.country}</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600">
                    {destination.reviews} reviews
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured hotels</h2>
            <Button variant="outline" className="flex items-center">
              See all <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredHotels.map((hotel, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                <picture>
                  <img
                    src={hotel.image || "/placeholder.svg"}
                    alt={hotel.name}
                    className="w-full h-48 object-cover"
                  />
                </picture>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{hotel.name}</h3>
                    <Badge
                      variant="secondary"
                      className="text-green-700 bg-green-100"
                    >
                      {hotel.price}/night
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{hotel.location}</p>
                  <div className="flex items-center">
                    <div className="flex items-center mr-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm font-medium">
                        {hotel.rating}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">
                      ({hotel.reviews} reviews)
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Inspiration */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Travel inspiration
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="overflow-hidden">
              <div className="relative">
                <picture>
                  <img
                    src="/placeholder.svg?height=300&width=600"
                    alt="Travel inspiration"
                    className="w-full h-64 object-cover"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    Best beaches in Europe
                  </h3>
                  <p className="text-sm opacity-90">
                    Discover pristine coastlines and crystal-clear waters
                  </p>
                </div>
              </div>
            </Card>
            <Card className="overflow-hidden">
              <div className="relative">
                <picture>
                  <img
                    src="/placeholder.svg?height=300&width=600"
                    alt="Travel inspiration"
                    className="w-full h-64 object-cover"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    Hidden gems in Asia
                  </h3>
                  <p className="text-sm opacity-90">
                    Explore off-the-beaten-path destinations
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
