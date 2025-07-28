import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GiftBoxCatalog from "./components/GiftBoxCatalog";
import ProductPage from "./components/ProductPage";
import CheckoutPage from "./components/CheckoutPage";
import { Toaster } from "./components/ui/toaster";
import { CartProvider } from "./components/CartContext";

function App() {
  useEffect(() => {
    // Set default SEO meta tags
    document.title = "Ottawa Gift Boxes | Premium Gift Baskets & Boxes Delivery Ottawa, Ontario";
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Premium gift boxes and baskets delivered throughout Ottawa, Ontario. Same-day delivery available. Perfect for corporate gifts, special occasions, birthdays, and celebrations. Local Ottawa artisans and quality products.";

    // Add or update keywords meta tag
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = "Ottawa gift boxes, Ottawa gift baskets, Ottawa gift delivery, same day delivery Ottawa, corporate gifts Ottawa, premium gift boxes Ontario, custom gift baskets, personalized gifts Ottawa, luxury gift boxes Canada";

    // Add Open Graph meta tags for social sharing
    const ogTags = [
      { property: 'og:title', content: 'Ottawa Gift Boxes | Premium Gift Baskets Delivery' },
      { property: 'og:description', content: 'Premium gift boxes and baskets delivered throughout Ottawa, Ontario. Same-day delivery available.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.origin },
      { property: 'og:site_name', content: 'Ottawa Gift Boxes' },
      { property: 'og:locale', content: 'en_CA' }
    ];

    ogTags.forEach(tag => {
      let metaTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', tag.property);
        document.head.appendChild(metaTag);
      }
      metaTag.content = tag.content;
    });

    // Add Twitter Card meta tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Ottawa Gift Boxes | Premium Gift Baskets Delivery' },
      { name: 'twitter:description', content: 'Premium gift boxes and baskets delivered throughout Ottawa, Ontario. Same-day delivery available.' }
    ];

    twitterTags.forEach(tag => {
      let metaTag = document.querySelector(`meta[name="${tag.name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.name = tag.name;
        document.head.appendChild(metaTag);
      }
      metaTag.content = tag.content;
    });

    // Add canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = window.location.origin;

    // Add JSON-LD structured data for better SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Ottawa Gift Boxes",
      "description": "Premium gift boxes and baskets delivered throughout Ottawa, Ontario",
      "url": window.location.origin,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Ottawa",
        "addressRegion": "Ontario",
        "addressCountry": "Canada"
      },
      "telephone": "(613) 555-4438",
      "email": "hello@ottawagiftboxes.ca",
      "priceRange": "$45-$200",
      "paymentAccepted": "Cash, Credit Card",
      "currenciesAccepted": "CAD",
      "openingHours": [
        "Mo-Fr 09:00-18:00",
        "Sa-Su 10:00-16:00"
      ],
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": 45.4215,
          "longitude": -75.6972
        },
        "geoRadius": "50000"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Gift Boxes & Baskets",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Premium Gift Boxes",
              "description": "Curated luxury gift boxes for all occasions"
            }
          }
        ]
      }
    };

    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);

  }, []);

  return (
    <CartProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<GiftBoxCatalog />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </div>
    </CartProvider>
  );
}

export default App;