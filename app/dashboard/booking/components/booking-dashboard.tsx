"use client";

import { useState } from "react";
import {
  Calendar,
  DollarSign,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Plane,
  Building,
  Ship,
  Car,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Booking {
  id: string;
  bookingNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    avatar?: string;
  };
  service: {
    type: "Hotel" | "Flight" | "Cruise" | "Car Rental";
    name: string;
    details: string;
    location: string;
  };
  dates: {
    checkIn: string;
    checkOut: string;
    duration: number;
  };
  guests: number;
  amount: {
    subtotal: number;
    taxes: number;
    total: number;
  };
  status: "Confirmed" | "Pending" | "Cancelled" | "Completed";
  paymentStatus: "Paid" | "Pending" | "Refunded" | "Failed";
  createdAt: string;
  lastModified: string;
  notes?: string;
}

export default function DashboardBookings() {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");

  // Mock booking data
  const bookings: Booking[] = [
    {
      id: "1",
      bookingNumber: "TRP-2024-001234",
      customer: {
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        phone: "+1 (555) 123-4567",
      },
      service: {
        type: "Hotel",
        name: "The Grand Palace Hotel",
        details: "Deluxe Room with City View",
        location: "Paris, France",
      },
      dates: {
        checkIn: "2024-06-15",
        checkOut: "2024-06-18",
        duration: 3,
      },
      guests: 2,
      amount: {
        subtotal: 1200,
        taxes: 180,
        total: 1380,
      },
      status: "Confirmed",
      paymentStatus: "Paid",
      createdAt: "2024-06-01T10:30:00Z",
      lastModified: "2024-06-01T10:30:00Z",
      notes: "Customer requested late checkout",
    },
    {
      id: "2",
      bookingNumber: "TRP-2024-001235",
      customer: {
        name: "Mike Chen",
        email: "mike.chen@email.com",
        phone: "+1 (555) 234-5678",
      },
      service: {
        type: "Flight",
        name: "Air France AF123",
        details: "Economy Class, JFK → CDG",
        location: "New York → Paris",
      },
      dates: {
        checkIn: "2024-06-20",
        checkOut: "2024-06-20",
        duration: 1,
      },
      guests: 1,
      amount: {
        subtotal: 750,
        taxes: 120,
        total: 870,
      },
      status: "Pending",
      paymentStatus: "Pending",
      createdAt: "2024-06-02T14:15:00Z",
      lastModified: "2024-06-02T14:15:00Z",
    },
    {
      id: "3",
      bookingNumber: "TRP-2024-001236",
      customer: {
        name: "Emma Wilson",
        email: "emma.wilson@email.com",
        phone: "+1 (555) 345-6789",
      },
      service: {
        type: "Cruise",
        name: "7-Day Caribbean Cruise",
        details: "Royal Caribbean - Symphony of the Seas",
        location: "Fort Lauderdale → Caribbean",
      },
      dates: {
        checkIn: "2024-07-15",
        checkOut: "2024-07-22",
        duration: 7,
      },
      guests: 4,
      amount: {
        subtotal: 3200,
        taxes: 480,
        total: 3680,
      },
      status: "Confirmed",
      paymentStatus: "Paid",
      createdAt: "2024-05-28T09:45:00Z",
      lastModified: "2024-05-28T09:45:00Z",
      notes: "Family vacation, requested connecting cabins",
    },
    {
      id: "4",
      bookingNumber: "TRP-2024-001237",
      customer: {
        name: "David Brown",
        email: "david.brown@email.com",
        phone: "+1 (555) 456-7890",
      },
      service: {
        type: "Car Rental",
        name: "BMW 3 Series",
        details: "Premium Sedan, Automatic",
        location: "Los Angeles, CA",
      },
      dates: {
        checkIn: "2024-06-25",
        checkOut: "2024-06-30",
        duration: 5,
      },
      guests: 1,
      amount: {
        subtotal: 400,
        taxes: 60,
        total: 460,
      },
      status: "Cancelled",
      paymentStatus: "Refunded",
      createdAt: "2024-06-03T16:20:00Z",
      lastModified: "2024-06-04T11:30:00Z",
      notes: "Customer cancelled due to change in travel plans",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Confirmed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "Pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "Cancelled":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getServiceIcon = (type: string) => {
    switch (type) {
      case "Hotel":
        return <Building className="h-4 w-4" />;
      case "Flight":
        return <Plane className="h-4 w-4" />;
      case "Cruise":
        return <Ship className="h-4 w-4" />;
      case "Car Rental":
        return <Car className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      booking.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesService =
      serviceFilter === "all" ||
      booking.service.type.toLowerCase() === serviceFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesService;
  });

  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Bookings
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bookings.length}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {bookings.filter((b) => b.status === "Confirmed").length}
            </div>
            <p className="text-xs text-muted-foreground">Active bookings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {bookings.filter((b) => b.status === "Pending").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting confirmation
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {bookings
                .reduce((sum, booking) => sum + booking.amount.total, 0)
                .toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">From all bookings</p>
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
                  placeholder="Search bookings, customers, or booking numbers..."
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
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="hotel">Hotels</SelectItem>
                <SelectItem value="flight">Flights</SelectItem>
                <SelectItem value="cruise">Cruises</SelectItem>
                <SelectItem value="car rental">Car Rentals</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Bookings ({filteredBookings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{booking.bookingNumber}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{booking.customer.name}</div>
                      <div className="text-sm text-gray-500">
                        {booking.customer.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getServiceIcon(booking.service.type)}
                      <div>
                        <div className="font-medium">
                          {booking.service.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.service.location}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {new Date(booking.dates.checkIn).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.dates.duration} days
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">${booking.amount.total}</div>
                    <div className="text-sm text-gray-500">
                      {booking.paymentStatus}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(booking.status)}
                      <Badge className={getStatusBadgeColor(booking.status)}>
                        {booking.status}
                      </Badge>
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
                        <DropdownMenuItem
                          onClick={() => setSelectedBooking(booking)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Booking
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Cancel Booking
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

      {/* Booking Details Modal */}
      <Dialog
        open={!!selectedBooking}
        onOpenChange={() => setSelectedBooking(null)}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>
              {selectedBooking?.bookingNumber} • Created on{" "}
              {selectedBooking &&
                new Date(selectedBooking.createdAt).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-6">
              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Name
                      </label>
                      <p className="text-lg">{selectedBooking.customer.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Email
                      </label>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <p>{selectedBooking.customer.email}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Phone
                      </label>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <p>{selectedBooking.customer.phone}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Guests
                      </label>
                      <p className="text-lg">{selectedBooking.guests} guests</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Service Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Service Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Service Type
                      </label>
                      <div className="flex items-center space-x-2">
                        {getServiceIcon(selectedBooking.service.type)}
                        <p className="text-lg">
                          {selectedBooking.service.type}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Service Name
                      </label>
                      <p className="text-lg">{selectedBooking.service.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Details
                      </label>
                      <p>{selectedBooking.service.details}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Location
                      </label>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <p>{selectedBooking.service.location}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Booking Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Dates & Duration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Check-in
                        </label>
                        <p className="text-lg">
                          {new Date(
                            selectedBooking.dates.checkIn
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Check-out
                        </label>
                        <p className="text-lg">
                          {new Date(
                            selectedBooking.dates.checkOut
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Duration
                        </label>
                        <p className="text-lg">
                          {selectedBooking.dates.duration} days
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${selectedBooking.amount.subtotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxes & Fees:</span>
                        <span>${selectedBooking.amount.taxes}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t pt-2">
                        <span>Total:</span>
                        <span>${selectedBooking.amount.total}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>Payment Status:</span>
                        <Badge
                          className={
                            selectedBooking.paymentStatus === "Paid"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {selectedBooking.paymentStatus}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Notes */}
              {selectedBooking.notes && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{selectedBooking.notes}</p>
                  </CardContent>
                </Card>
              )}

              {/* Actions */}
              <div className="flex justify-end space-x-4">
                <Button variant="outline">Edit Booking</Button>
                <Button variant="outline">Send Confirmation</Button>
                <Button variant="destructive">Cancel Booking</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
