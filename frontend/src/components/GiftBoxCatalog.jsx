import React, { useState } from 'react';
import { ShoppingCart, Heart, Search, User, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { useToast } from '../hooks/use-toast';

const GiftBoxCatalog = () => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();

  // Mock gift box products with the beautiful images we obtained
  const products = [
    {
      id: 1,
      name: "Elegant Rose Gold Collection",
      price: 89.00,
      originalPrice: 120.00,
      image: "https://images.unsplash.com/photo-1625552186152-668cd2f0b707?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwxfHxnaWZ0JTIwYm94ZXN8ZW58MHx8fHwxNzUzMTQwMzA5fDA&ixlib=rb-4.1.0&q=85",
      description: "Luxurious gift box with rose gold accents, dried flowers, and premium packaging",
      category: "Premium",
      inStock: true,
      rating: 4.9
    },
    {
      id: 2,
      name: "Golden Celebration Box",
      price: 65.00,
      originalPrice: 85.00,
      image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwyfHxnaWZ0JTIwYm94ZXN8ZW58MHx8fHwxNzUzMTQwMzA5fDA&ixlib=rb-4.1.0&q=85",
      description: "Perfect for celebrations with golden ribbons and festive elements",
      category: "Celebration",
      inStock: true,
      rating: 4.7
    },
    {
      id: 3,
      name: "Surprise Unboxing Experience",
      price: 45.00,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1625552187571-7ee60ac43d2b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwzfHxnaWZ0JTIwYm94ZXN8ZW58MHx8fHwxNzUzMTQwMzA5fDA&ixlib=rb-4.1.0&q=85",
      description: "Transparent design for an exciting unboxing experience with curated surprises",
      category: "Experience",
      inStock: true,
      rating: 4.8
    },
    {
      id: 4,
      name: "Luxury Jewelry Collection",
      price: 150.00,
      originalPrice: 200.00,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBnaWZ0c3xlbnwwfHx8fDE3NTMxMTQ3ODR8MA&ixlib=rb-4.1.0&q=85",
      description: "Premium jewelry gift box with elegant presentation and luxury packaging",
      category: "Luxury",
      inStock: true,
      rating: 4.9
    },
    {
      id: 5,
      name: "Designer Premium Box",
      price: 175.00,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1700142678566-601b048b39db?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBnaWZ0c3xlbnwwfHx8fDE3NTMxMTQ3ODR8MA&ixlib=rb-4.1.0&q=85",
      description: "High-end designer gift box with premium black packaging and luxury appeal",
      category: "Designer",
      inStock: false,
      rating: 5.0
    },
    {
      id: 6,
      name: "Festive Holiday Special",
      price: 55.00,
      originalPrice: 75.00,
      image: "https://images.unsplash.com/photo-1640061511626-9fbba9044f9f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBnaWZ0c3xlbnwwfHx8fDE3NTMxMTQ3ODR8MA&ixlib=rb-4.1.0&q=85",
      description: "Perfect holiday gift with red bow and festive greeting card included",
      category: "Holiday",
      inStock: true,
      rating: 4.6
    }
  ];

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`,
      variant: "default",
    });
  };

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

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleOrder = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is Empty",
        description: "Please add items to your cart before placing an order.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Order Placed Successfully! 🎉",
      description: `Thank you! Your order for $${getCartTotal().toFixed(2)} has been placed.`,
      variant: "default",
    });
    
    // Clear cart after successful order (mock behavior)
    setCart([]);
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
                GiftBox Co.
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-text--base hover:text-accent--ui-accent transition-colors duration-200">Shop</a>
              <a href="#" className="text-text--base hover:text-accent--ui-accent transition-colors duration-200">Collections</a>
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
                <a href="#" className="text-text--base hover:text-accent--ui-accent transition-colors duration-200 py-2">Collections</a>
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
            Curated Gift Boxes
          </h2>
          <p className="text-lg text-text--text-subtle-light max-w-2xl mx-auto">
            Discover our collection of beautifully crafted gift boxes, perfect for every occasion. 
            Each box is thoughtfully curated with premium items.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white border-color--accent--line">
              <CardHeader className="p-0 relative overflow-hidden">
                <div className="aspect-square relative">
                  <img 
                    src={product.image} 
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
                    onClick={() => toggleWishlist(product.id)}
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
                <p className="text-sm text-text--text-subtle-light mb-4">
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
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button 
                  className="w-full transition-all duration-200 transform hover:scale-105"
                  style={{ 
                    backgroundColor: product.inStock ? 'var(--accent--ui-accent)' : 'var(--text--text-subtle-light)',
                    color: 'var(--text--text-dark)'
                  }}
                  disabled={!product.inStock}
                  onClick={() => product.inStock && addToCart(product)}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Cart Summary & Order Section */}
        {cart.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg border border-color--accent--line p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--text--text-light)' }}>
              Your Cart ({getCartItemCount()} items)
            </h3>
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b border-color--accent--line">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium" style={{ color: 'var(--text--text-light)' }}>
                        {item.name}
                      </p>
                      <p className="text-sm text-text--text-subtle-light">
                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold" style={{ color: 'var(--accent--ui-accent)' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-color--accent--line">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-semibold" style={{ color: 'var(--text--text-light)' }}>
                  Total: ${getCartTotal().toFixed(2)}
                </span>
              </div>
              <Button 
                className="w-full py-3 text-lg font-semibold transition-all duration-200 transform hover:scale-105"
                style={{ 
                  backgroundColor: 'var(--color--identity--red)',
                  color: 'var(--text--text-dark)'
                }}
                onClick={handleOrder}
              >
                Place Order
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-surface--background-dark text-text--text-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">GiftBox Co.</h3>
              <p className="text-text--text-subtle-dark">
                Curating the perfect gift boxes for every special moment. Premium quality, thoughtful selection.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-text--text-subtle-dark">
                <li><a href="#" className="hover:text-white transition-colors">Shipping Information</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns & Exchanges</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact & FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <p className="text-text--text-subtle-dark">
                Email: hello@giftboxco.com<br/>
                Phone: (555) 123-4567<br/>
                Follow us on social media
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-color--accent--line text-center text-text--text-subtle-dark">
            <p>&copy; 2025 GiftBox Co. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GiftBoxCatalog;