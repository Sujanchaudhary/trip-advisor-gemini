import { Star, MapPin, Wifi, Car, Utensils, Dumbbell, Heart, Share, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

export default function HotelDetailPage() {
  const hotel = {
    name: "The Grand Palace Hotel",
    location: "Downtown Paris, France",
    rating: 4.8,
    reviews: 2847,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    amenities: [
      { icon: Wifi, name: "Free WiFi", included: true },
      { icon: Car, name: "Parking", included: true },
      { icon: Utensils, name: "Restaurant", included: true },
      { icon: Dumbbell, name: "Fitness Center", included: true },
    ],
    description:
      "Experience luxury at its finest at The Grand Palace Hotel, located in the heart of Paris. Our elegant rooms and suites offer stunning city views, while our world-class amenities ensure an unforgettable stay.",
  }

  const rooms = [
    {
      type: "Standard Room",
      size: "25 m²",
      beds: "1 Queen Bed",
      guests: 2,
      price: 320,
      originalPrice: 380,
      amenities: ["Free WiFi", "Air Conditioning", "Minibar"],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      type: "Deluxe Room",
      size: "35 m²",
      beds: "1 King Bed",
      guests: 2,
      price: 450,
      originalPrice: 520,
      amenities: ["Free WiFi", "City View", "Minibar", "Balcony"],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      type: "Suite",
      size: "55 m²",
      beds: "1 King Bed + Sofa",
      guests: 4,
      price: 680,
      originalPrice: 750,
      amenities: ["Free WiFi", "City View", "Separate Living Area", "Balcony"],
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const reviews = [
    {
      name: "Sarah M.",
      rating: 5,
      date: "2 days ago",
      title: "Exceptional stay!",
      content:
        "The hotel exceeded all expectations. The staff was incredibly friendly and the room was spotless. The location is perfect for exploring Paris.",
      helpful: 12,
    },
    {
      name: "John D.",
      rating: 4,
      date: "1 week ago",
      title: "Great location",
      content:
        "Wonderful hotel in the heart of Paris. Easy access to all major attractions. The breakfast was excellent.",
      helpful: 8,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Image Gallery */}
      <div className="relative">
        <div className="grid grid-cols-4 gap-2 h-96">
          <div className="col-span-2 row-span-2">
            <img
              src={hotel.images[0] || "/placeholder.svg"}
              alt="Hotel main"
              className="w-full h-full object-cover rounded-l-lg"
            />
          </div>
          <div>
            <img src={hotel.images[1] || "/placeholder.svg"} alt="Hotel room" className="w-full h-full object-cover" />
          </div>
          <div>
            <img
              src={hotel.images[2] || "/placeholder.svg"}
              alt="Hotel amenity"
              className="w-full h-full object-cover rounded-tr-lg"
            />
          </div>
          <div>
            <img src={hotel.images[3] || "/placeholder.svg"} alt="Hotel view" className="w-full h-full object-cover" />
          </div>
          <div className="relative">
            <img
              src={hotel.images[0] || "/placeholder.svg"}
              alt="More photos"
              className="w-full h-full object-cover rounded-br-lg"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-br-lg">
              <Button variant="secondary" className="flex items-center">
                <Camera className="h-4 w-4 mr-2" />
                View all photos
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
                <div className="flex items-center mb-2">
                  <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-gray-600">{hotel.location}</span>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center mr-4">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-semibold">{hotel.rating}</span>
                    <span className="text-gray-600 ml-1">({hotel.reviews} reviews)</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {hotel.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <amenity.icon className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-sm">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="rooms">Rooms</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">About this hotel</h3>
                    <p className="text-gray-700 leading-relaxed">{hotel.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Location</h3>
                    <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">Interactive Map</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="rooms" className="mt-6">
                <div className="space-y-4">
                  {rooms.map((room, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="flex">
                        <img
                          src={room.image || "/placeholder.svg"}
                          alt={room.type}
                          className="w-48 h-32 object-cover"
                        />
                        <CardContent className="flex-1 p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold mb-1">{room.type}</h4>
                              <p className="text-sm text-gray-600 mb-2">
                                {room.size} • {room.beds} • {room.guests} guests
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {room.amenities.map((amenity) => (
                                  <Badge key={amenity} variant="secondary" className="text-xs">
                                    {amenity}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="text-gray-500 line-through text-sm">${room.originalPrice}</span>
                                <span className="text-xl font-bold text-green-600">${room.price}</span>
                              </div>
                              <p className="text-xs text-gray-600 mb-2">per night</p>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                Select
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-6">
                  {reviews.map((review, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold">{review.name}</h4>
                            <div className="flex items-center">
                              <div className="flex">
                                {Array.from({ length: review.rating }).map((_, i) => (
                                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600 ml-2">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <h5 className="font-medium mb-2">{review.title}</h5>
                        <p className="text-gray-700 mb-3">{review.content}</p>
                        <div className="flex items-center text-sm text-gray-600">
                          <span>Helpful ({review.helpful})</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-gray-500 line-through">$520</span>
                    <span className="text-3xl font-bold text-green-600">$450</span>
                  </div>
                  <p className="text-sm text-gray-600">per night</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-sm font-medium">Check-in</label>
                      <Input type="date" defaultValue="2024-06-15" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Check-out</label>
                      <Input type="date" defaultValue="2024-06-18" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Guests</label>
                    <Input placeholder="2 guests" />
                  </div>
                </div>

                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span>$450 × 3 nights</span>
                    <span>$1,350</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes & fees</span>
                    <span>$135</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>$1,485</span>
                  </div>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700 mb-4">Reserve Now</Button>

                <p className="text-xs text-gray-600 text-center">Free cancellation until 24 hours before check-in</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
