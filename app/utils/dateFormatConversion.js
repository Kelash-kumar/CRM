
export const  formatDateTime = (dateInString) => {
    if (!dateInString) return null;
    
    const parsedDate = new Date(dateInString);
    if (isNaN(parsedDate.getTime())) {
      throw new ApiError(400, `Invalid date format for ${dateInString}`);
    }
    
    return parsedDate.toISOString().slice(0, 19).replace("T", " ");
  };
  