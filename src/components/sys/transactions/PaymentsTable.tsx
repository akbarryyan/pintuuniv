"use client";

import {
  CreditCard,
  DollarSign,
  Eye,
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  Banknote,
} from "lucide-react";
import { Payment } from "./types";

interface PaymentsTableProps {
  payments: Payment[];
  onViewPayment: (payment: Payment) => void;
  onDownloadInvoice?: (payment: Payment) => void;
  onRetryPayment?: (payment: Payment) => void;
}

export default function PaymentsTable({
  payments,
  onViewPayment,
  onDownloadInvoice,
  onRetryPayment,
}: PaymentsTableProps) {
  const getStatusBadge = (status: Payment["status"]) => {
    const badges = {
      completed: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      failed: "bg-red-100 text-red-800 border-red-200",
      refunded: "bg-gray-100 text-gray-800 border-gray-200",
    };

    const labels = {
      completed: "Berhasil",
      pending: "Pending",
      failed: "Gagal",
      refunded: "Refund",
    };

    const icons = {
      completed: <CheckCircle className="w-3 h-3" />,
      pending: <Clock className="w-3 h-3" />,
      failed: <XCircle className="w-3 h-3" />,
      refunded: <RefreshCw className="w-3 h-3" />,
    };

    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border ${badges[status]}`}
      >
        {icons[status]}
        {labels[status]}
      </span>
    );
  };

  const getMethodBadge = (method: Payment["method"]) => {
    const badges = {
      credit_card: "bg-blue-100 text-blue-800",
      bank_transfer: "bg-purple-100 text-purple-800",
      e_wallet: "bg-orange-100 text-orange-800",
      cash: "bg-gray-100 text-gray-800",
    };

    const labels = {
      credit_card: "Kartu Kredit",
      bank_transfer: "Transfer Bank",
      e_wallet: "E-Wallet",
      cash: "Cash",
    };

    const icons = {
      credit_card: <CreditCard className="w-3 h-3" />,
      bank_transfer: <Banknote className="w-3 h-3" />,
      e_wallet: <DollarSign className="w-3 h-3" />,
      cash: <Banknote className="w-3 h-3" />,
    };

    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${badges[method]}`}
      >
        {icons[method]}
        {labels[method]}
      </span>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">
          Daftar Transaksi
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Menampilkan {payments.length} transaksi
        </p>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pengguna
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaksi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Jumlah
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Metode
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tanggal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {payment.userName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {payment.userEmail}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {payment.transactionId}
                    </div>
                    <div className="text-sm text-gray-500">
                      {payment.description}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      via {payment.gateway}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-gray-900">
                    {formatCurrency(payment.amount)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getMethodBadge(payment.method)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(payment.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(payment.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewPayment(payment)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Lihat Detail"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {payment.status === "completed" && onDownloadInvoice && (
                      <button
                        onClick={() => onDownloadInvoice(payment)}
                        className="text-green-600 hover:text-green-900"
                        title="Download Invoice"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    )}
                    {payment.status === "failed" && onRetryPayment && (
                      <button
                        onClick={() => onRetryPayment(payment)}
                        className="text-orange-600 hover:text-orange-900"
                        title="Retry Payment"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden divide-y divide-gray-200">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="p-4 hover:bg-gray-50 transition-colors"
          >
            {/* Header: User Info and Amount */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-semibold text-gray-900 truncate">
                    {payment.userName}
                  </h4>
                  {getStatusBadge(payment.status)}
                </div>
                <p className="text-xs text-gray-500 truncate">
                  {payment.userEmail}
                </p>
              </div>
              <div className="text-right ml-3">
                <p className="text-lg font-bold text-gray-900">
                  {formatCurrency(payment.amount)}
                </p>
                {getMethodBadge(payment.method)}
              </div>
            </div>

            {/* Transaction Details */}
            <div className="space-y-2 mb-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500">
                  ID Transaksi
                </span>
                <span className="text-xs font-mono text-gray-900">
                  {payment.transactionId}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500">
                  Gateway
                </span>
                <span className="text-xs text-gray-700">{payment.gateway}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500">
                  Tanggal
                </span>
                <span className="text-xs text-gray-700">
                  {formatDate(payment.createdAt)}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-3">
              <p className="text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2">
                {payment.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
              <button
                onClick={() => onViewPayment(payment)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Lihat Detail"
              >
                <Eye className="w-3.5 h-3.5" />
                Detail
              </button>
              {payment.status === "completed" && onDownloadInvoice && (
                <button
                  onClick={() => onDownloadInvoice(payment)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  title="Download Invoice"
                >
                  <Download className="w-3.5 h-3.5" />
                  Invoice
                </button>
              )}
              {payment.status === "failed" && onRetryPayment && (
                <button
                  onClick={() => onRetryPayment(payment)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                  title="Retry Payment"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Retry
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
