using Restuarant_Site.Models;

namespace Restuarant_Site.Data.Repositories
{
    public class ProductRepository : ICrudRepository<Product, int>
    {
        private readonly RestaurantContext _productContext;
        public ProductRepository(RestaurantContext productContext)
        {
            _productContext = productContext ?? throw new
            ArgumentNullException(nameof(productContext));
        }
        public void Add(Product element)
        {
            _productContext.Products.Add(element);
        }
        public void Delete(int id)
        {
            var item = Get(id);
            if (item is not null) _productContext.Products.Remove(Get(id));
        }
        public bool Exists(int id)
        {
            return _productContext.Products.Any(u => u.Id == id);
        }
        public Product Get(int id)
        {
            return _productContext.Products.FirstOrDefault(u => u.Id == id);
        }
        public IEnumerable<Product> GetAll()
        {
            return _productContext.Products.ToList();
        }
        public bool Save()
        {
            return _productContext.SaveChanges() > 0;
        }
        public void Update(Product element)
        {
            _productContext.Update(element);
        }
    }
}
