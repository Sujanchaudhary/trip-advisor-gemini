import { Search, Globe, Menu, User, Heart, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function Header() {
  return (
    <header className="border-b bg-white">
      {/* Top bar */}
      <div className="border-b bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex h-10 items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Get the app</span>
              <span className="text-gray-600">Help</span>
            </div>
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8">
                    <Globe className="h-4 w-4 mr-1" />
                    USD
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>USD - US Dollar</DropdownMenuItem>
                  <DropdownMenuItem>EUR - Euro</DropdownMenuItem>
                  <DropdownMenuItem>GBP - British Pound</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8">
                    <Globe className="h-4 w-4 mr-1" />
                    English
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>English</DropdownMenuItem>
                  <DropdownMenuItem>Español</DropdownMenuItem>
                  <DropdownMenuItem>Français</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-xl font-bold text-gray-900">TripAdvisor</span>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Where to?"
                className="pl-10 pr-4 h-12 rounded-full border-2 border-gray-200 focus:border-green-500"
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-red-500">3</Badge>
            </Button>

            {/* Favorites */}
            <Button variant="ghost" size="sm">
              <Heart className="h-5 w-5" />
            </Button>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span className="hidden md:inline">John</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>My Profile</DropdownMenuItem>
                <DropdownMenuItem>My Trips</DropdownMenuItem>
                <DropdownMenuItem>Reviews</DropdownMenuItem>
                <DropdownMenuItem>Photos</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Account Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t">
        <div className="container mx-auto px-4">
          <nav className="flex h-12 items-center space-x-8 overflow-x-auto">
            <Link
              href="/hotels"
              className="whitespace-nowrap text-sm font-medium text-green-600 border-b-2 border-green-600 pb-3"
            >
              Hotels
            </Link>
            <Link href="/things-to-do" className="whitespace-nowrap text-sm font-medium text-gray-600 hover:text-gray-900 pb-3">
              Things to do
            </Link>
            <Link href="/restaurants" className="whitespace-nowrap text-sm font-medium text-gray-600 hover:text-gray-900 pb-3">
              Restaurants
            </Link>
            <Link href="/flights" className="whitespace-nowrap text-sm font-medium text-gray-600 hover:text-gray-900 pb-3">
              Flights
            </Link>
            <Link href="#" className="whitespace-nowrap text-sm font-medium text-gray-600 hover:text-gray-900 pb-3">
              Vacation Rentals
            </Link>
            <Link href="#" className="whitespace-nowrap text-sm font-medium text-gray-600 hover:text-gray-900 pb-3">
              Cruises
            </Link>
            <Link href="#" className="whitespace-nowrap text-sm font-medium text-gray-600 hover:text-gray-900 pb-3">
              Rental Cars
            </Link>
            <Link href="#" className="whitespace-nowrap text-sm font-medium text-gray-600 hover:text-gray-900 pb-3">
              Travel Forums
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
