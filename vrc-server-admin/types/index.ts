export * from './state';

export interface Person {
  id: number;
  first_name: string;
  last_name: string;
  contact: Contact;
  gender: string;
  ip_address: string;
  avatar: string;
  address: Address;
}

export interface Slide {
  sdid: string;
  count: number;
}

export interface VRCSlideEvent{
  id: number;
  slides: Array<Slide>;
  name: string;
}

export interface Contact {
  email: string;
  phone: string;
}

export interface Address {
  city: string;
  country: string;
  postalCode: string;
  state: string;
  street: string;
}
