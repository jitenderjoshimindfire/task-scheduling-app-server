const calculateTaskFlags = (dueDate) => {
  const now = new Date();
  const due = new Date(dueDate);
  const next24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  return {
    isOverdue: due < now,
    dueSoon: due >= now && due <= next24h,
  };
};

module.exports = calculateTaskFlags;
