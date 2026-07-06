import Ledger from "../models/Ledger.js";

export const getLedgers = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const sort = query.sort || "-createdAt";

  const filter = {};

  if (query.memberId) {
    filter.memberId = query.memberId;
  }

  if (query.loanId) {
    filter.loanId = query.loanId;
  }

  if (query.status) {
    filter.status = query.status;
  }

  if (query.transactionType) {
    filter.transactionType = query.transactionType;
  }

  if (query.search) {
    filter.transactionRef = {
      $regex: query.search,
      $options: "i",
    };
  }

  if (query.startDate || query.endDate) {
    filter.createdAt = {};

    if (query.startDate) {
      filter.createdAt.$gte = new Date(query.startDate);
    }

    if (query.endDate) {
      filter.createdAt.$lte = new Date(query.endDate);
    }
  }

  const ledgers = await Ledger.find(filter)
    .populate("memberId")
    .populate("loanId")
    .populate("virtualAccountId")
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const total = await Ledger.countDocuments(filter);

  return {
    ledgers,
    page,
    totalPages: Math.ceil(total / limit),
    total,
  };
};

export const getLedgerById = async (id) => {
  const ledger = await Ledger.findById(id)
    .populate("memberId")
    .populate("loanId")
    .populate("virtualAccountId");

  if (!ledger) {
    throw new Error("Ledger not found");
  }

  return ledger;
};