export interface ProfileI {
  id?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  addresses?: AddressI[];
}

export interface AddressI {
  id?: string;
  name?: string;
  lat?: string;
  lon?: string;
  street?: string;
  number?: number;
  sector?: string;
  references?: string;
  building?: string;
  apartment?: string;
  floor?: string;
  city?: string;
  address?: string;
}
