using Restuarant_Site.Models;

namespace Restuarant_Site.Data.Repositories
{
    public class IngredientRepository : ICrudRepository<Ingredient, int>
    {
        private readonly RestaurantContext _ingredientContext;
        public IngredientRepository(RestaurantContext ingredientContext)
        {
            _ingredientContext = ingredientContext ?? throw new
            ArgumentNullException(nameof(ingredientContext));
        }
        public void Add(Ingredient element)
        {
            _ingredientContext.Ingredients.Add(element);
        }
        public void Delete(int id)
        {
            var item = Get(id);
            if (item is not null) _ingredientContext.Ingredients.Remove(Get(id));
        }
        public bool Exists(int id)
        {
            return _ingredientContext.Ingredients.Any(u => u.Id == id);
        }
        public Ingredient Get(int id)
        {
            return _ingredientContext.Ingredients.FirstOrDefault(u => u.Id == id);
        }
        public IEnumerable<Ingredient> GetAll()
        {
            return _ingredientContext.Ingredients.ToList();
        }
        public bool Save()
        {
            return _ingredientContext.SaveChanges() > 0;
        }
        public void Update(Ingredient element)
        {
            _ingredientContext.Update(element);
        }
    }
}
