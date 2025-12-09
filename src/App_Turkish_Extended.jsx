import { useState } from 'react';
import {
  Search, User, ShoppingBag, Heart, X, Check, Shield, BadgeCheck,
  ChevronLeft, Plus, Minus, Star, MapPin, Clock, Instagram, ArrowRight,
  Filter, LayoutGrid, Trash2, Tag, CreditCard, Truck, Package,
  FileText, Phone, Mail, MessageCircle, ChevronDown, ChevronUp,
  Settings, LogOut, Edit, Home, Store, HelpCircle, Info
} from 'lucide-react';

// ============================================
// MOCK DATA - TURKISH VERSION
// ============================================

const IMAGES = {
  fashion1: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
  fashion2: 'https://images.unsplash.com/photo-1550614000-4b9519e09d5c?w=800&q=80',
  bag: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
  sneakers: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
  portrait: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
  hero: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80',
  portrait2: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
  portrait3: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  fashion3: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
  fashion4: 'https://images.unsplash.com/photo-1485968579169-a6b7c4452c8f?w=800&q=80',
  fashion5: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
  lifestyle1: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
  lifestyle2: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80',
};

const MOCK_BOUTIQUES = [
  { id: 1, name: 'NOIR Studio', handle: '@noirstudio', avatar: IMAGES.portrait, banner: IMAGES.fashion1, bio: 'Modern kadın için özenle seçilmiş minimalist moda. Los Angeles merkezli.', followers: '124B', location: 'Los Angeles, CA', verified: true, styles: ['Minimalist', 'Luxury'] },
  { id: 2, name: 'Vintage Vault', handle: '@vintagevault', avatar: IMAGES.portrait2, banner: IMAGES.fashion2, bio: '70-90\'lardan otantik vintage parçalar. Her parçanın bir hikayesi var.', followers: '89B', location: 'Brooklyn, NY', verified: true, styles: ['Vintage', 'Retro'] },
  { id: 3, name: 'Street Culture', handle: '@streetculture', avatar: IMAGES.portrait3, banner: IMAGES.fashion3, bio: 'Underground streetwear koleksiyonları. Sadece sınırlı sayıda.', followers: '256B', location: 'Tokyo, JP', verified: true, styles: ['Streetwear', 'Y2K'] },
  { id: 4, name: 'The Edit', handle: '@theedit', avatar: IMAGES.portrait, banner: IMAGES.lifestyle1, bio: 'Haftalık olarak seçilen öncü parçalar. Sürdürülebilir lüks.', followers: '67B', location: 'London, UK', verified: true, styles: ['Luxury', 'Sustainable'] },
  { id: 5, name: 'Y2K Archive', handle: '@y2karchive', avatar: IMAGES.portrait2, banner: IMAGES.fashion4, bio: '2000\'lerin en iyi modasını geri getiriyoruz.', followers: '198B', location: 'Miami, FL', verified: true, styles: ['Y2K', 'Vintage'] },
  { id: 6, name: 'Minimal Theory', handle: '@minimaltheory', avatar: IMAGES.portrait3, banner: IMAGES.fashion5, bio: 'Az çoktur. Gardırobunuz için zamansız esaslar.', followers: '45B', location: 'Copenhagen, DK', verified: false, styles: ['Minimalist'] },
  { id: 7, name: 'Hype Central', handle: '@hypecentral', avatar: IMAGES.portrait, banner: IMAGES.lifestyle2, bio: 'En son çıkanlar ve işbirlikleri için kaynağınız.', followers: '312B', location: 'New York, NY', verified: true, styles: ['Streetwear', 'Luxury'] },
  { id: 8, name: 'Boho Dreams', handle: '@bohodreams', avatar: IMAGES.portrait2, banner: IMAGES.hero, bio: 'Gezginler ve hayalperestler için özgür ruhlu moda.', followers: '78B', location: 'Austin, TX', verified: false, styles: ['Bohemian', 'Vintage'] },
];

const MOCK_PRODUCTS = [
  { id: 1, name: 'Oversize Keten Blazer', price: 1890, originalPrice: 2490, image: IMAGES.fashion1, boutiqueId: 1, category: 'Dış Giyim', styles: ['Minimalist', 'Luxury'], isNew: true, isSoldOut: false },
  { id: 2, name: 'Vintage Denim Ceket', price: 1450, originalPrice: null, image: IMAGES.fashion2, boutiqueId: 2, category: 'Dış Giyim', styles: ['Vintage', 'Streetwear'], isNew: false, isSoldOut: false },
  { id: 3, name: 'Kapitone Deri Çanta', price: 3200, originalPrice: 4000, image: IMAGES.bag, boutiqueId: 1, category: 'Aksesuar', styles: ['Luxury', 'Minimalist'], isNew: true, isSoldOut: false },
  { id: 4, name: 'Retro Runner Ayakkabı', price: 1750, originalPrice: null, image: IMAGES.sneakers, boutiqueId: 3, category: 'Ayakkabı', styles: ['Streetwear', 'Y2K'], isNew: false, isSoldOut: false },
  { id: 5, name: 'İpek Askılı Elbise', price: 2250, originalPrice: 2750, image: IMAGES.fashion3, boutiqueId: 4, category: 'Elbise', styles: ['Minimalist', 'Luxury'], isNew: true, isSoldOut: false },
  { id: 6, name: 'Y2K Kelebek Crop Top', price: 680, originalPrice: null, image: IMAGES.fashion4, boutiqueId: 5, category: 'Üst', styles: ['Y2K', 'Vintage'], isNew: false, isSoldOut: true },
  { id: 7, name: 'Kısa Paçalı Kargo Pantolon', price: 950, originalPrice: 1200, image: IMAGES.fashion5, boutiqueId: 3, category: 'Alt', styles: ['Streetwear'], isNew: false, isSoldOut: false },
  { id: 8, name: 'Kaşmir Triko Kazak', price: 2850, originalPrice: null, image: IMAGES.lifestyle1, boutiqueId: 6, category: 'Triko', styles: ['Minimalist'], isNew: true, isSoldOut: false },
  { id: 9, name: 'Platform Combat Bot', price: 2100, originalPrice: 2800, image: IMAGES.sneakers, boutiqueId: 7, category: 'Ayakkabı', styles: ['Streetwear', 'Y2K'], isNew: false, isSoldOut: false },
  { id: 10, name: 'Bohem Uzun Etek', price: 1350, originalPrice: null, image: IMAGES.lifestyle2, boutiqueId: 8, category: 'Alt', styles: ['Bohemian', 'Vintage'], isNew: true, isSoldOut: false },
  { id: 11, name: 'Omuz Çantası', price: 1950, originalPrice: 2500, image: IMAGES.bag, boutiqueId: 4, category: 'Aksesuar', styles: ['Luxury'], isNew: false, isSoldOut: false },
  { id: 12, name: 'Vintage Band Tişört', price: 850, originalPrice: null, image: IMAGES.fashion2, boutiqueId: 2, category: 'Üst', styles: ['Vintage', 'Streetwear'], isNew: false, isSoldOut: false },
];

const STYLE_OPTIONS = ['Streetwear', 'Minimalist', 'Vintage', 'Y2K', 'Luxury', 'Bohemian', 'Sustainable', 'Retro'];

// This file is too long to complete in one response. Let me update the actual App.jsx file instead with all pages properly integrated.
