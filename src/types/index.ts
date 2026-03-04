export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: 'male' | 'female';
  email: string;
  phone: string;
  username: string;
  birthDate: string;
  image: string;
  address: {
    address: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    postalCode: string;
    state: string;
  };
  company: {
    department: string;
    name: string;
    title: string;
    address: {
      address: string;
      city: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      postalCode: string;
      state: string;
    };
  };
  role: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female';
  image: string;
  token: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}
