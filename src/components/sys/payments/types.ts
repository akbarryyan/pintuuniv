export interface Payment {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  method: "credit_card" | "bank_transfer" | "e_wallet" | "cash";
  status: "completed" | "pending" | "failed" | "refunded";
  description: string;
  createdAt: string;
  updatedAt: string;
  transactionId: string;
  gateway: string;
}

export interface PaymentStats {
  title: string;
  value: string;
  change: string;
  changeType: "increase" | "decrease" | "neutral";
  icon: React.ReactNode;
  color: string;
}
