import { useState } from "react";
import { Shield, Menu, X} from 'lucide-react';
import { NavLink } from "react-router";
import { logOutApi } from "../../API/logOutApi";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, setUser, loading } = useAuth();
    const logOutUser = async() => {
        const user = await logOutApi();
        if(user) setUser(null);
    }
    return ( 
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <NavLink to="/">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                VaultGuard
              </span>
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                Features
              </a>
              <a href="#security" className="text-gray-600 hover:text-gray-900 transition-colors">
                Security
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                Pricing
              </a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
                About
              </a>
            </div>

            {/* Desktop Auth Buttons */}
            {!user ? 
            <div className="hidden md:flex items-center space-x-4">
              <NavLink to= "/login">
              <button className="text-gray-600 hover:text-gray-900 transition-colors">
                Log In
              </button>
              </NavLink>
              <NavLink to="/signup">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200">
                Sign Up
              </button>
              </NavLink>
            </div> 
            :
            <div>
              <button onClick={logOutUser} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200s">
                Log Out</button>
            </div>}
            

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-100 bg-white">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#features" className="block px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors">
                  Features
                </a>
                <a href="#security" className="block px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors">
                  Security
                </a>
                <a href="#pricing" className="block px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors">
                  Pricing
                </a>
                <a href="#about" className="block px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors">
                  About
                </a>
                <div className="pt-4 pb-2 space-y-2">
                  <NavLink to = "/login" >
                  <button className="w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors">
                    Log In
                    </button>
                  </NavLink>
                  <NavLink to="/signup">
                  <button className= "w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors">
                    Sign Up
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
     );
}

export default Navbar;