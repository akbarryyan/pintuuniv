import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    // Fetch payment methods with their accounts
    const paymentMethodsQuery = `
      SELECT 
        pm.id,
        pm.name,
        pm.type,
        pm.icon,
        pm.color,
        pm.qr_code,
        pm.logo,
        pm.is_active,
        pm.is_popular
      FROM payment_methods pm
      WHERE pm.is_active = 1
      ORDER BY pm.is_popular DESC, pm.id ASC
    `;

    const paymentMethodsResult = await query(paymentMethodsQuery);
    const paymentMethods = Array.isArray(paymentMethodsResult)
      ? paymentMethodsResult
      : [];

    // Fetch payment accounts for each method
    const paymentAccountsQuery = `
      SELECT 
        pa.id,
        pa.payment_method_id,
        pa.name,
        pa.account,
        pa.account_name,
        pa.is_active
      FROM payment_accounts pa
      WHERE pa.is_active = 1
      ORDER BY pa.payment_method_id, pa.id
    `;

    const paymentAccountsResult = await query(paymentAccountsQuery);
    const paymentAccounts = Array.isArray(paymentAccountsResult)
      ? paymentAccountsResult
      : [];

    // Group accounts by payment method
    const methodsWithAccounts = paymentMethods.map((method: any) => {
      const accounts = paymentAccounts.filter(
        (account: any) => account.payment_method_id === method.id
      );

      return {
        id: method.id,
        name: method.name,
        type: method.type,
        icon: method.icon,
        color: method.color,
        qr_code: method.qr_code,
        logo: method.logo,
        is_active: Boolean(method.is_active),
        is_popular: Boolean(method.is_popular),
        accounts: accounts.map((account: any) => ({
          id: account.id,
          name: account.name,
          account: account.account,
          account_name: account.account_name,
          is_active: Boolean(account.is_active),
        })),
      };
    });

    return NextResponse.json({
      success: true,
      data: methodsWithAccounts,
    });
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch payment methods",
      },
      { status: 500 }
    );
  }
}
