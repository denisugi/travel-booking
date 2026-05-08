<header class="bg-white shadow-sm sticky top-0 z-50">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
            {{-- Logo --}}
            <a href="{{ route('home') }}" class="flex items-center gap-2">
                <span class="text-2xl font-bold text-blue-600">{{ config('app.name') }}</span>
            </a>

            {{-- Desktop Navigation --}}
            <div class="hidden md:flex items-center gap-8">
                <a href="{{ route('home') }}" class="text-gray-700 hover:text-blue-600 font-medium {{ request()->routeIs('home') ? 'text-blue-600' : '' }}">
                    Home
                </a>
                <a href="{{ route('packages.index') }}" class="text-gray-700 hover:text-blue-600 font-medium {{ request()->routeIs('packages.*') ? 'text-blue-600' : '' }}">
                    Packages
                </a>
                <a href="{{ route('blog.index') }}" class="text-gray-700 hover:text-blue-600 font-medium {{ request()->routeIs('blog.*') ? 'text-blue-600' : '' }}">
                    Blog
                </a>
                <a href="{{ route('contact') }}" class="text-gray-700 hover:text-blue-600 font-medium {{ request()->routeIs('contact') ? 'text-blue-600' : '' }}">
                    Contact
                </a>
            </div>

            {{-- Auth Links --}}
            <div class="hidden md:flex items-center gap-4">
                @auth
                    <div class="relative" x-data="{ open: false }" @click.away="open = false" @keydown.escape="open = false">
                        <button @click="open = !open" class="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                            <span>{{ auth()->user()->name }}</span>
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div x-show="open" x-transition class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1"
                             style="display: none;">
                            <a href="{{ route('dashboard') }}" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                Dashboard
                            </a>
                            <a href="{{ route('profile') }}" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                Profile
                            </a>
                            <a href="{{ route('bookings.index') }}" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                My Bookings
                            </a>
                            <hr class="my-1">
                            <form action="{{ route('logout') }}" method="POST">
                                @csrf
                                <button type="submit" class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    Logout
                                </button>
                            </form>
                        </div>
                    </div>
                @else
                    <a href="{{ route('login') }}" class="text-gray-700 hover:text-blue-600 font-medium">Login</a>
                    <a href="{{ route('register') }}" class="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                        Sign Up
                    </a>
                @endauth
            </div>

            {{-- Mobile Menu Button --}}
            <button class="md:hidden p-2 text-gray-700" @click="mobileMenu = !mobileMenu">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </div>

        {{-- Mobile Menu --}}
        <div x-show="mobileMenu" class="md:hidden py-4 border-t" style="display: none;">
            <div class="flex flex-col gap-4">
                <a href="{{ route('home') }}" class="text-gray-700 hover:text-blue-600 font-medium">Home</a>
                <a href="{{ route('packages.index') }}" class="text-gray-700 hover:text-blue-600 font-medium">Packages</a>
                <a href="{{ route('blog.index') }}" class="text-gray-700 hover:text-blue-600 font-medium">Blog</a>
                <a href="{{ route('contact') }}" class="text-gray-700 hover:text-blue-600 font-medium">Contact</a>
                <hr>
                @auth
                    <a href="{{ route('dashboard') }}" class="text-gray-700 hover:text-blue-600 font-medium">Dashboard</a>
                    <a href="{{ route('bookings.index') }}" class="text-gray-700 hover:text-blue-600 font-medium">My Bookings</a>
                    <form action="{{ route('logout') }}" method="POST">
                        @csrf
                        <button type="submit" class="text-gray-700 hover:text-blue-600 font-medium">Logout</button>
                    </form>
                @else
                    <a href="{{ route('login') }}" class="text-gray-700 hover:text-blue-600 font-medium">Login</a>
                    <a href="{{ route('register') }}" class="text-blue-600 font-medium">Sign Up</a>
                @endauth
            </div>
        </div>
    </nav>
</header>
