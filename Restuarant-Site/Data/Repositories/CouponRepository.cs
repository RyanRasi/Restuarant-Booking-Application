using Restuarant_Site.Models;

namespace Restuarant_Site.Data.Repositories
{
    public class CouponRepository : ICrudRepository<Coupon, int>
    {
        private readonly RestaurantContext _couponContext;
        public CouponRepository(RestaurantContext couponContext)
        {
            _couponContext = couponContext ?? throw new
            ArgumentNullException(nameof(couponContext));
        }
        public void Add(Coupon element)
        {
            _couponContext.Coupons.Add(element);
        }
        public void Delete(int id)
        {
            var item = Get(id);
            if (item is not null) _couponContext.Coupons.Remove(Get(id));
        }
        public bool Exists(int id)
        {
            return _couponContext.Coupons.Any(u => u.Id == id);
        }
        public Coupon Get(int id)
        {
            return _couponContext.Coupons.FirstOrDefault(u => u.Id == id);
        }
        public IEnumerable<Coupon> GetAll()
        {
            return _couponContext.Coupons.ToList();
        }
        public bool Save()
        {
            return _couponContext.SaveChanges() > 0;
        }
        public void Update(Coupon element)
        {
            _couponContext.Update(element);
        }
    }
}
