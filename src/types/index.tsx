export type UserData = {
  id: string;
  role: "user" | "admin";
  membership: "premium" | "basic";
  name: string;
  username: string;
  email: string;
  password: string;
  address: string;
  phonenumber: string;
  referral: string;
  like: number[];
  expired_subs: string;
};

export type NewsData = {
  id: string;
  isPremium: boolean;
  title: string;
  desc: string;
  image: string;
  created_at: string;
  updated_at: string;
  category: string;
  like: number;
  share: number;
};

export type NewsDetail = {
  title: string;
  desc: string;
  image: string;
  isPremium: boolean;
  newsId: string;
  created_at: string;
  updated_at: string;
};

export type TransactionData = {
  id: number;
  user: string;
  type: 1 | 12;
  transaction_date: string;
  status: "processing" | "completed" | "canceled";
  transaction_completed_date: string;
  total_paid: 9 | 99;
};
