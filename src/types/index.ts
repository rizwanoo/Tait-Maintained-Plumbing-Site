export interface ServiceItem {
  id: string;
  title: string;
  category: 'plumbing' | 'heating' | 'water_heaters' | 'maintenance';
  badge: string;
  shortDesc: string;
  longDesc: string;
  image: string;
  keyPoints: string[];
  commonIssues: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Water Heaters' | 'Heating' | 'Plumbing' | 'Jobsite';
  image: string;
  description: string;
  locationTag: string;
  featured?: boolean;
}

export interface EducationArticle {
  id: string;
  title: string;
  tag: string;
  teaser: string;
  readTime: string;
  content: {
    overview: string;
    steps: { title: string; desc: string }[];
    proTip: string;
  };
}

export interface BusinessConfig {
  businessName: string;
  tagline: string;
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string;
  whatsappLink: string;
  email: string;
  instagramUrl: string;
  facebookFollowers: string;
  facebookUrl: string;
  serviceArea: string;
  hours: string;
}

export interface BookingFormData {
  serviceType: string;
  urgency: 'routine' | 'urgent' | 'flexible';
  propertyType: 'residential' | 'commercial' | 'rental';
  fullName: string;
  phone: string;
  email: string;
  address: string;
  issueDescription: string;
  preferredDate: string;
  preferredTimeWindow: 'morning' | 'afternoon' | 'evening' | 'anytime';
  contactPreference: 'whatsapp' | 'phone' | 'text' | 'email';
  photoUrls?: string[];
  additionalNotes?: string;
}
