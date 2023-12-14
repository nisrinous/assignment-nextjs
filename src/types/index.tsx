export type UserData = {
  id: string;
  role: "user" | "admin";
  member: "premium" | "basic";
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
  id: string;
  isPremium: boolean;
  title: string;
  desc: string;
  image: string;
  created_at: string;
  updated_at: string;
  category: string;
  like: number;
};

export type NewsDetail = {
  title: string;
  desc: string;
  image: string;
  isPrem: boolean;
  newsId: string;
};
