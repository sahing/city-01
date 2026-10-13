// Core mock data and models for IntercityWheels platform

export interface RouteOption {
  id: string;
  from: string;
  to: string;
  distanceKm: number;
  durationText: string;
  via: string;
}

export interface VehicleOption {
  id: string;
  title: string;
  subtitle: string;
  capacity: string;
  luggage: string;
  features: string[];
  basePrice: number;
  discountPrice: number;
  image: string;
  tag?: string;
  perKmPostBase?: number;
}

export interface BerthSeat {
  id: string;
  deck: 'lower' | 'upper';
  row: number;
  col: number; // 0 (left window), 1 (aisle space/label), 2 (right aisle), 3 (right window)
  type: 'regular' | 'ladies' | 'senior' | 'locked' | 'booked';
  fare: number;
  label: string;
  subText?: string;
}

export interface FormFieldConfig {
  id: string;
  label: string;
  type: 'phone' | 'text' | 'counter' | 'switch' | 'boolean' | 'conditional_text' | 'select';
  subLabel: string;
  required: boolean;
  locked?: boolean;
  badge?: string;
  badgeType?: 'default' | 'mandatory' | 'conditional' | 'fee';
  conditionalOn?: { field: string; value: string };
  options?: string[];
  defaultValue?: any;
}

export interface WorkflowRule {
  id: string;
  title: string;
  status: 'active' | 'inactive';
  conditionText: string;
  actionText: string;
}

export interface AuctionLead {
  id: string;
  code: string;
  from: string;
  to: string;
  pickupDetail: string;
  dropDetail: string;
  distanceKm: number;
  duration: string;
  scheduledTime: string;
  vehicleCategory: string;
  customerBudget: number;
  currentLowestBid: number;
  targetRangeMin: number;
  targetRangeMax: number;
  bidsCount: number;
  closesInSeconds: number;
  isUrgent?: boolean;
}

export interface KycDocument {
  id: string;
  name: string;
  badge: string;
  docNumber?: string;
  validity?: string;
  status: 'verified' | 'approved' | 'action_needed' | 'pending';
  errorNotice?: string;
  icon: string;
}

export const INITIAL_VEHICLES: VehicleOption[] = [
  {
    id: 'prime-sedan',
    title: 'Prime Sedan',
    subtitle: 'Dzire / Etios',
    capacity: '4 seats',
    luggage: '2 bags',
    features: ['Tolls included', 'Free cancellation', 'AC'],
    basePrice: 2690,
    discountPrice: 2450,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7-NOuH4DDjMQxSQuKQgHQ9k557X9ij4yEsyiLBUE4ZX7o8aH9OD1RrHrGwV60NYWxPAyryJbUw9fPUgahyIuUBt5DI3cAmDJDWYbbCY6Veie11C29-5OoS774cWJU2X4HW0HNuJUpA4EARrzPv5tQGfy8J4q43ZBqxqHBu1qtW2AWl9FUYn3xycqDp0nj7-HQqOMxvtm_KJXenbgbUveYyR-wDTvfg6m4ua_Vh-QxAgxygYOMbJsuwQ',
    perKmPostBase: 13
  },
  {
    id: 'spacious-suv',
    title: 'Spacious SUV',
    subtitle: 'Ertiga / Carens',
    capacity: '6 seats',
    luggage: '4 bags',
    features: ['All Tolls & Taxes Included', 'Dual AC', 'Extra Legroom'],
    basePrice: 3280,
    discountPrice: 3130,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD23HZneDLxRMxAyJXP3I1UGwc82H5SzoxrvEDFpHAw40reDs91ePnu9K5UViAhTMhagXXHyW1vraKENTksb5T-lh4N42dqDbo5ryqScmKGk5xOwJ8hEZSRKnKiF0DAcKGHlho882zIp0oedLXRs8r2Z70Hk19mmzi1FUif_oD-Hso_h9DdZMKmAxcN0PbrQI7xDTrg5AEoiCbfFZBB6chSHl4LRnv7nflsWjN86NthJW_Svy7sKoOG6A',
    tag: 'Best Value Choice',
    perKmPostBase: 15
  },
  {
    id: 'innova-crysta',
    title: 'Executive Crysta',
    subtitle: 'Innova Crysta',
    capacity: '7 seats',
    luggage: '5 bags',
    features: ['Luxury Recliner', 'FastTag Included', 'Top-Rated Pilot'],
    basePrice: 4450,
    discountPrice: 4300,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPplDWB1aiDulZnccr1mJufguPnW4U18qSfx5gF5vWK2SuBcZGb5H3MW6SBJCkBehgMMvQPmPeEd1QRIH_x9NLSyUQGo9AyvCrVdHey4TjRRekmJd3BHVyevB-HQv_KAW4Ow2GlYegLM2uYrMqgmsRyoKF0ZhwSX6G79W5fZge3Oa7sJYtD5emCeca3LovHPDTQEcJpiF7dauOxmJQKF0y-bt1MrAR0XUfPCPgP6s1d6SYbHS_WiqJOg',
    perKmPostBase: 18
  }
];

export const INITIAL_BERTHS: BerthSeat[] = [
  // Lower Deck
  { id: 'L1', deck: 'lower', row: 1, col: 0, type: 'locked', fare: 0, label: 'L1 (Crew)', subText: 'Crew' },
  { id: 'L2', deck: 'lower', row: 1, col: 2, type: 'ladies', fare: 850, label: '♀ L2', subText: 'Ladies' },
  { id: 'L3', deck: 'lower', row: 1, col: 3, type: 'booked', fare: 850, label: 'L3', subText: 'Booked' },
  { id: 'L4', deck: 'lower', row: 2, col: 0, type: 'regular', fare: 850, label: 'L4', subText: 'Window' },
  { id: 'L5', deck: 'lower', row: 2, col: 2, type: 'regular', fare: 850, label: 'L5', subText: 'Aisle' },
  { id: 'L6', deck: 'lower', row: 2, col: 3, type: 'regular', fare: 850, label: 'L6', subText: '₹850' },
  { id: 'L7', deck: 'lower', row: 3, col: 0, type: 'senior', fare: 850, label: '♿ L7', subText: 'Senior' },
  { id: 'L8', deck: 'lower', row: 3, col: 2, type: 'senior', fare: 850, label: '♿ L8', subText: 'Senior' },
  { id: 'L9', deck: 'lower', row: 3, col: 3, type: 'regular', fare: 850, label: 'L9', subText: '₹850' },
  { id: 'L10', deck: 'lower', row: 4, col: 0, type: 'regular', fare: 850, label: 'L10', subText: '₹850' },
  { id: 'L11', deck: 'lower', row: 4, col: 2, type: 'regular', fare: 850, label: 'L11', subText: '₹850' },
  { id: 'L12', deck: 'lower', row: 4, col: 3, type: 'booked', fare: 850, label: 'L12', subText: 'Sold' },
  { id: 'L13', deck: 'lower', row: 5, col: 0, type: 'regular', fare: 850, label: 'L13', subText: '₹850' },
  { id: 'L14', deck: 'lower', row: 5, col: 2, type: 'regular', fare: 850, label: 'L14', subText: '₹850' },
  { id: 'L15', deck: 'lower', row: 5, col: 3, type: 'regular', fare: 850, label: 'L15', subText: '₹850' },

  // Upper Deck
  { id: 'U1', deck: 'upper', row: 1, col: 0, type: 'regular', fare: 950, label: 'U1', subText: '₹950' },
  { id: 'U2', deck: 'upper', row: 1, col: 2, type: 'ladies', fare: 950, label: '♀ U2', subText: 'Ladies' },
  { id: 'U3', deck: 'upper', row: 1, col: 3, type: 'booked', fare: 950, label: 'U3', subText: 'Booked' },
  { id: 'U4', deck: 'upper', row: 2, col: 0, type: 'regular', fare: 950, label: 'U4', subText: '₹950' },
  { id: 'U5', deck: 'upper', row: 2, col: 2, type: 'regular', fare: 950, label: 'U5', subText: '₹950' },
  { id: 'U6', deck: 'upper', row: 2, col: 3, type: 'regular', fare: 950, label: 'U6', subText: '₹950' },
  { id: 'U7', deck: 'upper', row: 3, col: 0, type: 'regular', fare: 950, label: 'U7', subText: '₹950' },
  { id: 'U8', deck: 'upper', row: 3, col: 2, type: 'regular', fare: 950, label: 'U8', subText: '₹950' },
  { id: 'U9', deck: 'upper', row: 3, col: 3, type: 'regular', fare: 950, label: 'U9', subText: '₹950' },
  { id: 'U10', deck: 'upper', row: 4, col: 0, type: 'regular', fare: 950, label: 'U10', subText: '₹950' },
  { id: 'U11', deck: 'upper', row: 4, col: 2, type: 'regular', fare: 950, label: 'U11', subText: '₹950' },
  { id: 'U12', deck: 'upper', row: 4, col: 3, type: 'booked', fare: 950, label: 'U12', subText: 'Sold' },
  { id: 'U13', deck: 'upper', row: 5, col: 0, type: 'regular', fare: 950, label: 'U13', subText: '₹950' },
  { id: 'U14', deck: 'upper', row: 5, col: 2, type: 'regular', fare: 950, label: 'U14', subText: '₹950' },
  { id: 'U15', deck: 'upper', row: 5, col: 3, type: 'regular', fare: 950, label: 'U15', subText: '₹950' }
];

export const INITIAL_LEADS: AuctionLead[] = [
  {
    id: 'lead-1',
    code: '#AU-8831',
    from: 'Mumbai Airport (T2)',
    to: 'Pune Kothrud',
    pickupDetail: 'Terminal 2 Chhatrapati Shivaji',
    dropDetail: 'Paud Rd, Kothrud',
    distanceKm: 162,
    duration: '3h 30m',
    scheduledTime: '11:30 PM Tonight',
    vehicleCategory: 'SUV Prime',
    customerBudget: 3600,
    currentLowestBid: 3400,
    targetRangeMin: 3250,
    targetRangeMax: 3350,
    bidsCount: 4,
    closesInSeconds: 98,
    isUrgent: true
  },
  {
    id: 'lead-2',
    code: '#AU-8832',
    from: 'Thane West',
    to: 'Nashik City',
    pickupDetail: 'Ghodbunder Road Junction',
    dropDetail: 'College Road, Nashik',
    distanceKm: 140,
    duration: '3h 10m',
    scheduledTime: 'Tomorrow 06:00 AM',
    vehicleCategory: 'SUV',
    customerBudget: 4200,
    currentLowestBid: 3950,
    targetRangeMin: 3800,
    targetRangeMax: 4000,
    bidsCount: 2,
    closesInSeconds: 420
  },
  {
    id: 'lead-3',
    code: '#AU-8833',
    from: 'Noida Sec 62',
    to: 'Agra Cantt',
    pickupDetail: 'Electronic City Metro',
    dropDetail: 'Taj Nagri Phase 2',
    distanceKm: 195,
    duration: '3h 25m',
    scheduledTime: 'Today 08:30 PM',
    vehicleCategory: 'Sedan',
    customerBudget: 3500,
    currentLowestBid: 3200,
    targetRangeMin: 3100,
    targetRangeMax: 3300,
    bidsCount: 5,
    closesInSeconds: 210
  }
];

export const INITIAL_WORKFLOW_FIELDS: FormFieldConfig[] = [
  {
    id: 'field-phone',
    label: 'Mobile Number',
    type: 'phone',
    subLabel: 'Primary contact • System locked',
    required: true,
    locked: true,
    badge: 'Phone',
    badgeType: 'mandatory'
  },
  {
    id: 'field-name',
    label: 'Full Name',
    type: 'text',
    subLabel: 'Min 3, Max 60 characters',
    required: true,
    badge: 'Text'
  },
  {
    id: 'field-flight',
    label: 'Flight Number',
    type: 'conditional_text',
    subLabel: 'Alphanumeric string (delay tracking)',
    required: false,
    badge: 'Conditional',
    badgeType: 'conditional',
    conditionalOn: { field: 'journeyType', value: 'airport_transfer' }
  },
  {
    id: 'field-luggage',
    label: 'Luggage Count',
    type: 'counter',
    subLabel: 'Numeric • Default 1, max 6 bags',
    required: false,
    badge: 'Counter',
    defaultValue: 3
  },
  {
    id: 'field-pet',
    label: 'Pet Travelling',
    type: 'switch',
    subLabel: 'Toggle • Injects sanitation add-on',
    required: false,
    badge: '+₹200 Fee',
    badgeType: 'fee',
    defaultValue: false
  },
  {
    id: 'field-wheelchair',
    label: 'Wheelchair Assistance',
    type: 'boolean',
    subLabel: 'Filters accessible cab inventory',
    required: false,
    badge: 'Boolean',
    defaultValue: false
  }
];

export const INITIAL_WORKFLOW_RULES: WorkflowRule[] = [
  {
    id: 'rule-1',
    title: 'Round Trip Schedule Enforcement',
    status: 'active',
    conditionText: 'IF Service Type == "Round Trip"',
    actionText: 'THEN Require Return Date & Pickup Time'
  },
  {
    id: 'rule-2',
    title: 'High-Value Risk Guard & Pre-Approval',
    status: 'active',
    conditionText: 'IF Total Fare > ₹10,000',
    actionText: 'THEN Flag Ops Pre-Approval & Escrow Hold'
  },
  {
    id: 'rule-3',
    title: 'Night Travel Safety Checklist',
    status: 'active',
    conditionText: 'IF Departure between 11:00 PM – 05:00 AM',
    actionText: 'THEN Enforce Dual-OTP & Emergency Contact Verification'
  }
];

export const INITIAL_KYC_DOCS: KycDocument[] = [
  {
    id: 'doc-dl',
    name: 'Commercial Driving License',
    badge: 'Transport Badge',
    docNumber: 'MH-14-2018-00928',
    validity: 'Valid till 14 Mar 2029',
    status: 'verified',
    icon: 'badge'
  },
  {
    id: 'doc-rc',
    name: 'Registration Certificate (RC)',
    badge: 'Commercial White Plate',
    docNumber: 'MH 12 QX 4492',
    validity: 'Toyota Innova Crysta',
    status: 'approved',
    icon: 'directions_car'
  },
  {
    id: 'doc-permit',
    name: 'Commercial Permit & Fitness',
    badge: 'Action Needed',
    status: 'action_needed',
    errorNotice: 'RTO Official Stamp Blurred. The regional transport authority round stamp is unreadable on current scan.',
    icon: 'warning'
  },
  {
    id: 'doc-pcc',
    name: 'Police Clearance Certificate (PCC)',
    badge: 'Pending',
    status: 'pending',
    docNumber: 'Submitted 3 hours ago',
    validity: 'Verification ETA: ~6 hours',
    icon: 'local_police'
  }
];
