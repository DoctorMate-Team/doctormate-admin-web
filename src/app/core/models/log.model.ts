export interface Log {
  id: string;
  level: 'info' | 'warning' | 'error';
  module: string;
  message: string;
  createdAt: string;
}
