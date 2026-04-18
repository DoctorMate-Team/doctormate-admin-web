export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role?: string;
  status?: string;
  isActive?: boolean;
  phone?: string;
  createdAt?: string;
  lastLogin?: string;
}

export interface PaginatedUsers {
  content: User[];
  pageable?: {
    pageNumber: number;
    pageSize: number;
  };
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
