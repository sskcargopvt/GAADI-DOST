export enum UserRole {
  DRIVER = 'DRIVER',
  FLEET_OWNER = 'FLEET_OWNER',
  TRANSPORTER = 'TRANSPORTER',
  CUSTOMER = 'CUSTOMER',
  GUEST = 'GUEST'
}

export enum Language {
  ENGLISH = 'en',
  HINDI = 'hi'
}

export enum Page {
  LOGIN = 'login',
  DASHBOARD = 'dashboard',
  GPS_PANEL = 'gps',
  EMERGENCY = 'emergency',
  BILTY = 'bilty',
  TRUCK_BOOKING = 'booking',
  CALCULATOR = 'calculator',
  ADMIN = 'admin'
}

export interface User {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
}

export interface LoadEstimate {
  estimatedCost: string;
  recommendedTruck: string;
  fuelEstimate: string;
  tollEstimate: string;
  explanation: string;
}

export interface SensorItem {
  id: string;
  name: string;
  price: number;
  description: string;
  icon: string;
}

export interface EmergencyService {
  id: string;
  name: string;
  icon: string;
  eta: string;
}