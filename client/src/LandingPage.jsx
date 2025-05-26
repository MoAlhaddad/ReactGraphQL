import * as NavigationMenu from '@radix-ui/react-navigation-menu';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <nav className="bg-gray-800 p-4 shadow-md">
        <NavigationMenu.Root className="flex justify-between max-w-7xl mx-auto items-center">
          <div className="text-xl font-bold">OnboardApp</div>
          <NavigationMenu.List className="flex space-x-6">
            <NavigationMenu.Item>
              <NavigationMenu.Link
                className="hover:text-indigo-400 cursor-pointer"
                href="#features"
              >
                Features
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link
                className="hover:text-indigo-400 cursor-pointer"
                href="#about"
              >
                About
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link
                className="hover:text-indigo-400 cursor-pointer"
                href="#contact"
              >
                Contact
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </nav>

      <main className="flex-grow flex flex-col justify-center items-center px-4 text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-6">
          Welcome to OnboardApp
        </h1>
        <p className="text-lg text-gray-300 mb-10">
          Effortlessly onboard new employees, create ID cards, and manage sensitive data securely.
        </p>
        <button className="bg-indigo-600 hover:bg-indigo-700 rounded-md px-8 py-3 font-semibold text-white transition">
          Get Started
        </button>
      </main>

      <footer className="bg-gray-800 text-gray-400 text-center p-4">
        © 2025 OnboardApp — All rights reserved
      </footer>
    </div>
  );
}
