import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, CreditCard, Truck, Shield, Lock, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { useToast } from '../hooks/use-toast';
import { useCart } from './CartContext';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { cart, clearCart, getCartItemCount } = useCart();
  
  // Form states
  const [formData, setFormData] = useState({
    // Contact Information
    email: '',
    phone: '',
    
    // Shipping Address
    firstName: '',
    lastName: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    province: 'Ontario',
    postalCode: '',
    country: 'Canada',
    
    // Billing Address
    sameAsShipping: true,
    billingFirstName: '',
    billingLastName: '',
    billingCompany: '',
    billingAddress1: '',
    billingAddress2: '',
    billingCity: '',
    billingProvince: 'Ontario',
    billingPostalCode: '',
    billingCountry: 'Canada',
    
    // Payment
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    
    // Additional
    deliveryInstructions: '',
    marketingOptIn: false,
    termsAccepted: false
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal >= 100 ? 0 : 15.99;
  const hst = (subtotal + shipping) * 0.13;
  const total = subtotal + shipping + hst;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Contact validation
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    
    // Shipping validation
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.address1) newErrors.address1 = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';
    
    // Payment validation
    if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    if (!formData.cvv) newErrors.cvv = 'CVV is required';
    if (!formData.cardName) newErrors.cardName = 'Cardholder name is required';
    
    // Terms validation
    if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms and conditions';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: "Order Placed Successfully! 🎉",
        description: `Thank you ${formData.firstName}! Your order #${Date.now()} for $${total.toFixed(2)} has been placed. You'll receive a confirmation email shortly.`,
        variant: "default",
      });
      
      clearCart();
      navigate('/', { replace: true });
      
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an issue processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-color--accent--coconut to-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="mb-8">
            <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-text--text-light mb-4">Your cart is empty</h2>
            <p className="text-text--text-subtle-light mb-8">Add some beautiful gift boxes to get started!</p>
            <Button 
              onClick={() => navigate('/')}
              style={{ backgroundColor: 'var(--accent--ui-accent)', color: 'var(--text--text-dark)' }}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-color--accent--coconut to-white">
      {/* Header */}
      <header className="bg-white border-b border-color--accent--line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="text-text--base hover:text-accent--ui-accent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Shop
              </Button>
              <div className="h-6 w-px bg-color--accent--line"></div>
              <h1 className="text-2xl font-bold" style={{ color: 'var(--accent--ui-accent)', fontFamily: 'Dbsharpgroteskvariable Vf, Arial, sans-serif' }}>
                Ottawa Gift Boxes
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="w-4 h-4 text-green-600" />
              <span className="text-sm text-text--text-subtle-light">Secure Checkout</span>
            </div>
          </div>
        </div>
      </header>

      {/* Checkout Progress */}
      <div className="bg-white border-b border-color--accent--line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm">1</div>
              <span className="text-sm font-medium text-green-600">Cart</span>
            </div>
            <div className="w-16 h-px bg-green-600"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-accent--ui-accent text-white flex items-center justify-center text-sm">2</div>
              <span className="text-sm font-medium" style={{ color: 'var(--accent--ui-accent)' }}>Checkout</span>
            </div>
            <div className="w-16 h-px bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-sm">3</div>
              <span className="text-sm text-gray-600">Confirmation</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Forms */}
          <div className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span>Contact Information</span>
                    <Badge variant="outline" className="text-xs">Required</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={errors.email ? 'border-red-500' : ''}
                        placeholder="your@email.com"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={errors.phone ? 'border-red-500' : ''}
                        placeholder="(613) 555-0123"
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Truck className="w-5 h-5" />
                    <span>Shipping Address</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={errors.firstName ? 'border-red-500' : ''}
                      />
                      {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={errors.lastName ? 'border-red-500' : ''}
                      />
                      {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address1">Address *</Label>
                    <Input
                      id="address1"
                      value={formData.address1}
                      onChange={(e) => handleInputChange('address1', e.target.value)}
                      className={errors.address1 ? 'border-red-500' : ''}
                      placeholder="123 Main Street"
                    />
                    {errors.address1 && <p className="text-red-500 text-xs mt-1">{errors.address1}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="address2">Apartment, suite, etc. (Optional)</Label>
                    <Input
                      id="address2"
                      value={formData.address2}
                      onChange={(e) => handleInputChange('address2', e.target.value)}
                      placeholder="Apartment, suite, unit, building, floor, etc."
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className={errors.city ? 'border-red-500' : ''}
                        placeholder="Ottawa"
                      />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <Label htmlFor="province">Province</Label>
                      <Select value={formData.province} onValueChange={(value) => handleInputChange('province', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Ontario">Ontario</SelectItem>
                          <SelectItem value="Quebec">Quebec</SelectItem>
                          <SelectItem value="British Columbia">British Columbia</SelectItem>
                          <SelectItem value="Alberta">Alberta</SelectItem>
                          <SelectItem value="Manitoba">Manitoba</SelectItem>
                          <SelectItem value="Saskatchewan">Saskatchewan</SelectItem>
                          <SelectItem value="Nova Scotia">Nova Scotia</SelectItem>
                          <SelectItem value="New Brunswick">New Brunswick</SelectItem>
                          <SelectItem value="Newfoundland and Labrador">Newfoundland and Labrador</SelectItem>
                          <SelectItem value="Prince Edward Island">Prince Edward Island</SelectItem>
                          <SelectItem value="Northwest Territories">Northwest Territories</SelectItem>
                          <SelectItem value="Nunavut">Nunavut</SelectItem>
                          <SelectItem value="Yukon">Yukon</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Postal Code *</Label>
                      <Input
                        id="postalCode"
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange('postalCode', e.target.value.toUpperCase())}
                        className={errors.postalCode ? 'border-red-500' : ''}
                        placeholder="K1A 0A6"
                      />
                      {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5" />
                    <span>Payment Information</span>
                    <Shield className="w-4 h-4 text-green-600" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="card"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                      />
                      <Label htmlFor="card">Credit/Debit Card</Label>
                    </div>
                    <div className="flex space-x-2">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/3/39/PayPal_logo.svg" alt="PayPal" className="h-6" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="cardNumber">Card Number *</Label>
                    <Input
                      id="cardNumber"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                      className={errors.cardNumber ? 'border-red-500' : ''}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                    {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date *</Label>
                      <Input
                        id="expiryDate"
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                        className={errors.expiryDate ? 'border-red-500' : ''}
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                      {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV *</Label>
                      <Input
                        id="cvv"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value)}
                        className={errors.cvv ? 'border-red-500' : ''}
                        placeholder="123"
                        maxLength={4}
                      />
                      {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="cardName">Cardholder Name *</Label>
                    <Input
                      id="cardName"
                      value={formData.cardName}
                      onChange={(e) => handleInputChange('cardName', e.target.value)}
                      className={errors.cardName ? 'border-red-500' : ''}
                      placeholder="John Doe"
                    />
                    {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                  </div>
                </CardContent>
              </Card>

              {/* Additional Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Additional Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="deliveryInstructions">Delivery Instructions (Optional)</Label>
                    <Textarea
                      id="deliveryInstructions"
                      value={formData.deliveryInstructions}
                      onChange={(e) => handleInputChange('deliveryInstructions', e.target.value)}
                      placeholder="Special delivery instructions, gate codes, etc."
                      className="min-h-[80px]"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="marketingOptIn"
                        checked={formData.marketingOptIn}
                        onCheckedChange={(checked) => handleInputChange('marketingOptIn', checked)}
                      />
                      <Label htmlFor="marketingOptIn" className="text-sm">
                        I'd like to receive email updates about new products and special offers
                      </Label>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="termsAccepted"
                        checked={formData.termsAccepted}
                        onCheckedChange={(checked) => handleInputChange('termsAccepted', checked)}
                        className={errors.termsAccepted ? 'border-red-500' : ''}
                      />
                      <Label htmlFor="termsAccepted" className="text-sm">
                        I accept the <a href="#" className="text-accent--ui-accent underline">Terms of Service</a> and <a href="#" className="text-accent--ui-accent underline">Privacy Policy</a> *
                      </Label>
                    </div>
                    {errors.termsAccepted && <p className="text-red-500 text-xs">{errors.termsAccepted}</p>}
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Order Summary</span>
                  <Badge variant="outline">{getCartItemCount()} items</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex space-x-3 py-3 border-b border-color--accent--line last:border-b-0">
                      <img 
                        src={item.images[0]} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.name}</h4>
                        <p className="text-xs text-text--text-subtle-light">
                          Delivery: {item.deliveryDate}
                        </p>
                        <p className="text-xs text-text--text-subtle-light">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Totals */}
                <div className="space-y-2 pt-4 border-t border-color--accent--line">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping:</span>
                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-xs text-green-600">🎉 You qualified for free shipping!</p>
                  )}
                  <div className="flex justify-between text-sm">
                    <span>HST (13%):</span>
                    <span>${hst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-color--accent--line">
                    <span>Total:</span>
                    <span style={{ color: 'var(--accent--ui-accent)' }}>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <Button 
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="w-full py-3 text-lg font-semibold transition-all duration-200 transform hover:scale-105"
                  style={{ 
                    backgroundColor: 'var(--color--identity--red)',
                    color: 'var(--text--text-dark)'
                  }}
                >
                  {isProcessing ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    `Complete Order - $${total.toFixed(2)}`
                  )}
                </Button>

                {/* Security Info */}
                <div className="bg-color--accent--coconut p-3 rounded-lg text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">Secure Payment</span>
                  </div>
                  <p className="text-xs text-text--text-subtle-light">
                    Your payment information is encrypted and secure. We never store your credit card details.
                  </p>
                </div>

                {/* Delivery Info */}
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Truck className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-600">Delivery Information</p>
                      <p className="text-xs text-blue-600">
                        Orders placed before 2 PM are eligible for same-day delivery in Ottawa area. 
                        Standard delivery is 1-2 business days.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;