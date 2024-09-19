// bookingService.js
export const fetchBookings = async (venue, date) => {
    if (!venue || !date) {
      console.error('Venue or date not provided');
      return;
    }
  
    const formattedDate = date.toLocaleDateString('en-CA');
    const url = `http://localhost:8500/api/getBookings?venue=${encodeURIComponent(venue)}&date=${formattedDate}`;
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  };
  