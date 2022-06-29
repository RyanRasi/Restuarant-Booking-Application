using Microsoft.EntityFrameworkCore;
using Restuarant_Site.Controllers;
//using Restuarant_Site.Migrations;
using Restuarant_Site.Models;

namespace Restuarant_Site.Data
{
    public class RestaurantContext : DbContext
    {

        public RestaurantContext(DbContextOptions<RestaurantContext> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<Coupon> Coupons { get; set; }
        public DbSet<Booking> Bookings { get; set; }

    }
}