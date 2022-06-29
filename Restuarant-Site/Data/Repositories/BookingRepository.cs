using Restuarant_Site.Models;

namespace Restuarant_Site.Data.Repositories
{
    public class BookingRepository : ICrudRepository<Booking, int>
    {
        private readonly RestaurantContext _bookingContext;
        public BookingRepository(RestaurantContext bookingContext)
        {
            _bookingContext = bookingContext ?? throw new
            ArgumentNullException(nameof(bookingContext));
        }
        public void Add(Booking element)
        {
            _bookingContext.Bookings.Add(element);
        }
        public void Delete(int id)
        {
            var item = Get(id);
            if (item is not null) _bookingContext.Bookings.Remove(Get(id));
        }
        public bool Exists(int id)
        {
            return _bookingContext.Bookings.Any(u => u.Id == id);
        }
        public Booking Get(int id)
        {
            return _bookingContext.Bookings.FirstOrDefault(u => u.Id == id);
        }
        public IEnumerable<Booking> GetAll()
        {
            return _bookingContext.Bookings.ToList();
        }
        public bool Save()
        {
            return _bookingContext.SaveChanges() > 0;
        }
        public void Update(Booking element)
        {
            _bookingContext.Update(element);
        }
    }
}
