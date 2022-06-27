using Restuarant_Site.Data.Repositories;
using Restuarant_Site.Models;

namespace Restuarant_Site.Services
{
    public class CouponService : ICrudService<Coupon, int>
    {
        private readonly ICrudRepository<Coupon, int> _couponRepository;
        public CouponService(ICrudRepository<Coupon, int> todoRepository)
        {
            _couponRepository = todoRepository;
        }
        public void Add(Coupon element)
        {
            _couponRepository.Add(element);
            _couponRepository.Save();
        }
        public void Delete(int id)
        {
            _couponRepository.Delete(id);
            _couponRepository.Save();
        }
        public Coupon Get(int id)
        {
            return _couponRepository.Get(id);
        }
        public IEnumerable<Coupon> GetAll()
        {
            return _couponRepository.GetAll();
        }
        public void Update(Coupon old, Coupon newT)
        {
            old.Code = newT.Code;
            old.Type = newT.Type;
            old.Discount = newT.Discount;
            old.Status = newT.Status;
            _couponRepository.Update(old);
            _couponRepository.Save();
        }
    }
}
