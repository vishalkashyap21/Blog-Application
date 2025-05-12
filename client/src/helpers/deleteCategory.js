export const deleteData = async (endpoint) => {
  const c = confirm("Are you sure to delete this data");

  if (c) {
    try {
      const response = await fetch(endpoint, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return true;
    } catch (error) {
      console.log(error)
    }
  } else {
    return false;
  }
};



  
