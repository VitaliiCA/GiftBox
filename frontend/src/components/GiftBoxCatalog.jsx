import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Search, User, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { useToast } from '../hooks/use-toast';
import { mockProducts } from '../mock';
import CartModal from './CartModal';
import { useCart } from './CartContext';

const GiftBoxCatalog = () => {
  const [wishlist, setWishlist] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { cart, addToCart, updateQuantity, removeFromCart, clearCart, getCartItemCount } = useCart();

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
      toast({
        title: "Removed from Wishlist",
        description: "Item has been removed from your wishlist.",
        variant: "default",
      });
    } else {
      setWishlist([...wishlist, productId]);
      toast({
        title: "Added to Wishlist!",
        description: "Item has been added to your wishlist.",
        variant: "default",
      });
    }
  };

  const handleCheckout = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.13;
    const grandTotal = subtotal + tax;
    
    toast({
      title: "Order Placed Successfully! 🎉",
      description: `Thank you! Your order totaling $${grandTotal.toFixed(2)} has been placed. You'll receive a confirmation email shortly.`,
      variant: "default",
    });
    
    clearCart();
    setIsCartOpen(false);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-color--accent--coconut to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-color--accent--line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold" style={{ color: 'var(--accent--ui-accent)', fontFamily: 'Dbsharpgroteskvariable Vf, Arial, sans-serif' }}>
                Ottawa Gift Boxes
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-text--base hover:text-accent--ui-accent transition-colors duration-200">Shop</a>
              <a href="#" className="text-text--base hover:text-accent--ui-accent transition-colors duration-200">Gift Baskets</a>
              <a href="#" className="text-text--base hover:text-accent--ui-accent transition-colors duration-200">Corporate Gifts</a>
              <a href="#" className="text-text--base hover:text-accent--ui-accent transition-colors duration-200">About Us</a>
              <a href="#" className="text-text--base hover:text-accent--ui-accent transition-colors duration-200">Contact</a>
            </nav>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Search className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative"
                onClick={() => setWishlist([])}
              >
                <Heart className={`h-4 w-4 ${wishlist.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                {wishlist.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500">
                    {wishlist.length}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-4 w-4" />
                {getCartItemCount() > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs" style={{ backgroundColor: 'var(--color--identity--red)' }}>
                    {getCartItemCount()}
                  </Badge>
                )}
              </Button>
              
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-color--accent--line">
              <nav className="flex flex-col space-y-2">
                <a href="#" className="text-text--base hover:text-accent--ui-accent transition-colors duration-200 py-2">Shop</a>
                <a href="#" className="text-text--base hover:text-accent--ui-accent transition-colors duration-200 py-2">Gift Baskets</a>
                <a href="#" className="text-text--base hover:text-accent--ui-accent transition-colors duration-200 py-2">Corporate Gifts</a>
                <a href="#" className="text-text--base hover:text-accent--ui-accent transition-colors duration-200 py-2">About Us</a>
                <a href="#" className="text-text--base hover:text-accent--ui-accent transition-colors duration-200 py-2">Contact</a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ 
            color: 'var(--text--text-light)', 
            fontFamily: 'Dbsharpgroteskvariable Vf, Arial, sans-serif' 
          }}>
            Premium Gift Boxes & Baskets
          </h2>
          <p className="text-lg text-text--text-subtle-light max-w-2xl mx-auto mb-6">
            Discover our curated collection of luxury gift boxes and baskets, perfect for every occasion. 
            Delivered fresh to Ottawa and surrounding areas with personalized messages.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-text--text-subtle-light">
            <span className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Free delivery over $100
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>  
              Same-day delivery available
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Personalized gift messages
            </span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockProducts.map((product) => (
            <Card 
              key={product.id} 
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white border-color--accent--line cursor-pointer"
              onClick={() => handleProductClick(product.id)}
            >
              <CardHeader className="p-0 relative overflow-hidden">
                <div className="aspect-square relative">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {product.originalPrice && (
                    <Badge 
                      className="absolute top-3 left-3 text-white"
                      style={{ backgroundColor: 'var(--color--identity--red)' }}
                    >
                      Save ${(product.originalPrice - product.price).toFixed(0)}
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`absolute top-3 right-3 h-8 w-8 p-0 bg-white/90 hover:bg-white ${
                      wishlist.includes(product.id) ? 'text-red-500' : 'text-gray-600'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                  >
                    <Heart className={`h-4 w-4 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
                  </Button>
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="secondary" className="bg-gray-800 text-white">
                        Out of Stock
                      </Badge>
                    </div>
                  )}
                  
                  {/* Image counter if multiple images */}
                  {product.images.length > 1 && (
                    <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
                      1/{product.images.length}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-2">
                  <Badge 
                    variant="outline" 
                    className="text-xs"
                    style={{ borderColor: 'var(--color--accent--line)', color: 'var(--text--text-subtle-light)' }}
                  >
                    {product.category}
                  </Badge>
                </div>
                <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--text--text-light)' }}>
                  {product.name}
                </h3>
                <p className="text-sm text-text--text-subtle-light mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold" style={{ color: 'var(--accent--ui-accent)' }}>
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-text--text-subtle-light line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-text--text-subtle-light">
                    ⭐ {product.rating}
                  </div>
                </div>
                <div className="mt-4 text-xs text-text--text-subtle-light text-center">
                  Click to view details & customize
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-16 bg-white rounded-lg shadow-lg border border-color--accent--line p-8">
          <h3 className="text-2xl font-bold text-center mb-8" style={{ color: 'var(--text--text-light)' }}>
            Why Choose Ottawa Gift Boxes?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color--identity--blue)' }}>
                <ShoppingCart className="w-6 h-6" style={{ color: 'var(--color--identity--on-blue)' }} />
              </div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text--text-light)' }}>Premium Quality</h4>
              <p className="text-sm text-text--text-subtle-light">
                Carefully curated gifts from local Ottawa artisans and premium brands
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color--identity--yellow)' }}>
                <Heart className="w-6 h-6" style={{ color: 'var(--color--identity--on-yellow)' }} />
              </div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text--text-light)' }}>Personalized Touch</h4>
              <p className="text-sm text-text--text-subtle-light">
                Custom gift messages and personalized packaging for every occasion
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color--identity--cyan)' }}>
                <Search className="w-6 h-6" style={{ color: 'var(--color--identity--on-cyan)' }} />
              </div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text--text-light)' }}>Fast Delivery</h4>
              <p className="text-sm text-text--text-subtle-light">
                Same-day and next-day delivery throughout Ottawa and surrounding areas
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface--background-dark text-text--text-dark py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Ottawa Gift Boxes</h3>
              <p className="text-text--text-subtle-dark mb-4">
                Premium gift boxes and baskets delivered fresh throughout Ottawa, Ontario. Perfect for corporate gifts, special occasions, and showing someone you care.
              </p>
              <p className="text-sm text-text--text-subtle-dark">
                Serving Ottawa, Gatineau, Kanata, Orleans, Nepean, and surrounding areas.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-text--text-subtle-dark">
                <li><a href="#" className="hover:text-white transition-colors">Gift Boxes</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Corporate Gifts</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Same-Day Delivery</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Information</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns & Exchanges</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-text--text-subtle-dark">
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Track Your Order</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Corporate Accounts</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Bulk Orders</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="text-text--text-subtle-dark space-y-2">
                <p>📧 hello@ottawagiftboxes.ca</p>
                <p>📞 (613) 555-GIFT (4438)</p>
                <p>📍 Ottawa, Ontario, Canada</p>
                <p>🕒 Mon-Fri: 9AM-6PM<br />Sat-Sun: 10AM-4PM</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-color--accent--line text-center text-text--text-subtle-dark">
            <p>&copy; 2025 Ottawa Gift Boxes. All rights reserved. | Premium gift delivery throughout Ottawa, Ontario</p>
          </div>
        </div>
      </footer>

      {/* Cart Modal */}
      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default GiftBoxCatalog;