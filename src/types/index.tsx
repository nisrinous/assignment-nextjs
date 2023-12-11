export type UserData = {
  role: "user" | "admin";
  name: string;
  email: string;
  password: string;
  address: string;
  phonenumber: string;
  referral: string;
  like: number[];
  expired_subs: string;
};

export type NewsData = {
  isPremium: boolean;
  title: string;
  desc: string;
  image: string;
  created_at: string;
  updated_at: string;
  category: string[];
  like: number;
};
