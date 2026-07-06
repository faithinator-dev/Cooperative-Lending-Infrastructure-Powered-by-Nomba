import Ledger from "../models/Ledger.js";

export const getDashboardCharts = async () => {
  const savings = await Ledger.aggregate([
    {
      $match: {
        transactionType: "SAVINGS",
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m",
            date: "$createdAt",
          },
        },
        total: {
          $sum: "$amount",
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  const loans = await Ledger.aggregate([
    {
      $match: {
        transactionType: "LOAN_DISBURSEMENT",
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m",
            date: "$createdAt",
          },
        },
        total: {
          $sum: "$amount",
        },
      },
    },
    {
      $sort: {
        _id: 1,
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
        _id: {
          $dateToString: {
            format: "%Y-%m",
            date: "$createdAt",
          },
        },
        total: {
          $sum: "$amount",
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  return {
    savings,
    loans,
    repayments,
  };
};