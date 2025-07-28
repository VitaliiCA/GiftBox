import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

const CartModal = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  updateQuantity, 
  removeFromCart, 
  onCheckout 
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.13; // 13% HST for Ontario
  const grandTotal = subtotal + tax;

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-color--accent--line p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold" style={{ color: 'var(--text--text-light)' }}>
            Your Cart
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="p-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-text--text-light mb-2">Your cart is empty</h3>
              <p className="text-text--text-subtle-light mb-4">Add some beautiful gift boxes to get started!</p>
              <Button 
                onClick={onClose}
                style={{ backgroundColor: 'var(--accent--ui-accent)', color: 'var(--text--text-dark)' }}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <Badge variant="outline" className="text-sm">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                </Badge>
              </div>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="border-color--accent--line">
                    <CardContent className="p-4">
                      <div className="flex space-x-4">
                        {/* Product Image */}
                        <div className="w-20 h-20 flex-shrink-0">
                          <img 
                            src={item.images[0]} 
                            alt={item.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm text-text--text-light mb-1 truncate">
                            {item.name}
                          </h3>
                          <p className="text-xs text-text--text-subtle-light mb-2">
                            {item.deliveryDate || '2025 Jan 2nd'}
                          </p>
                          
                          {/* Price and Quantity */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-sm" style={{ color: 'var(--accent--ui-accent)' }}>
                                {item.quantity} × ${item.price.toFixed(2)}
                              </span>
                            </div>
                            
                            {/* Remove Button */}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-xs text-text--text-subtle-light">Quantity:</span>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                className="h-8 w-8 p-0"
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              
                              <span className="w-8 text-center text-sm font-medium">
                                {item.quantity}
                              </span>
                              
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="mt-6 space-y-4">
                <Card className="border-color--accent--line">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-text--text-subtle-light">Subtotal:</span>
                        <span className="font-medium" style={{ color: 'var(--text--text-light)' }}>
                          ${subtotal.toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-text--text-subtle-light">HST (13%):</span>
                        <span className="font-medium" style={{ color: 'var(--text--text-light)' }}>
                          ${tax.toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="border-t border-color--accent--line pt-3">
                        <div className="flex justify-between">
                          <span className="font-bold text-lg" style={{ color: 'var(--text--text-light)' }}>
                            Grand Total:
                          </span>
                          <span className="font-bold text-lg" style={{ color: 'var(--accent--ui-accent)' }}>
                            ${grandTotal.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button 
                    className="w-full py-3 text-lg font-semibold transition-all duration-200 transform hover:scale-105"
                    style={{ 
                      backgroundColor: 'var(--color--identity--red)',
                      color: 'var(--text--text-dark)'
                    }}
                    onClick={handleCheckout}
                  >
                    CHECKOUT
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full py-3 text-lg font-semibold"
                    onClick={onClose}
                    style={{ 
                      borderColor: 'var(--accent--ui-accent)',
                      color: 'var(--accent--ui-accent)'
                    }}
                  >
                    CONTINUE SHOPPING
                  </Button>
                </div>

                {/* Delivery Info */}
                <Card className="bg-color--accent--coconut border-color--accent--line">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <h4 className="font-semibold text-sm mb-2" style={{ color: 'var(--text--text-light)' }}>
                        🚚 Free Delivery Available
                      </h4>
                      <p className="text-xs text-text--text-subtle-light">
                        Free delivery on orders over $100 throughout Ottawa and surrounding areas. 
                        Same-day delivery available for orders placed before 2 PM.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;