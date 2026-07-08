import Member from "../models/Member.js";
import Loan from "../models/Loan.js";
import Ledger from "../models/Ledger.js";

export const getDashboardSummary = async () => {
  const totalMembers = await Member.countDocuments();

  const totalLoans = await Loan.countDocuments();

  const activeLoans = await Loan.countDocuments({
    status: "ACTIVE",
  });

  const paidLoans = await Loan.countDocuments({
    status: "PAID",
  });

  const outstanding = await Loan.aggregate([
    {
      $group: {
        _id: null,
        total: {
          $sum: "$balance",
        },
      },
    },
  ]);

  const repayments = await Ledger.aggregate([
    {
      $match: {
        transactionType: "LOAN_REPAYMENT",
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$amount",
        },
      },
    },
  ]);

  const savings = await Ledger.aggregate([
    {
      $match: {
        transactionType: "SAVINGS",
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$amount",
        },
      },
    },
  ]);

  const recentTransactions = await Ledger.find()
    .sort({ createdAt: -1 })
    .limit(10);

  return {
    totalMembers,
    totalSavings: savings[0]?.total || 0,
    totalLoans,
    activeLoans,
    paidLoans,
    outstandingBalance: outstanding[0]?.total || 0,
    totalRepayments: repayments[0]?.total || 0,
    recentTransactions,
  };
};