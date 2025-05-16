export type UserDetail = {
  uid: string;
  email: string;
  name?: string; // Optional field
  member?: boolean;
  // Thêm các trường khác nếu cần
} | null;