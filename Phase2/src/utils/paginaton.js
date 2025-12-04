export function paginate({ page = 1, limit = 10, totalItems }) {
    // Ensure page & limit are numbers and not negative
    page = Math.max(1, Number(page));
    limit = Math.max(1, Number(limit));
  
    const totalPages = Math.ceil(totalItems / limit);
    const skip = (page - 1) * limit;
  
    return {
      page,
      limit,
      skip,
      totalPages,
      totalItems,
    };
  }
  