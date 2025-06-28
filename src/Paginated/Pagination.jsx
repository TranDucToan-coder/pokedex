const Paginate = (data, page, limit) => {
    if (!Array.isArray(data)) {
        console.error("Error: Data is not an array!", data);
        return { totalPages: 0, paginated: [] };
    }

    const totalPages = Math.ceil(data.length / limit);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginated = data.slice(startIndex, endIndex);

    return { totalPages, paginated }; 
};

export default Paginate;
