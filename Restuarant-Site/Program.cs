using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Restuarant_Site.Data.Repositories;
using Restuarant_Site.Models;
using Restuarant_Site.Services;
using Restuarant_Site.Data;
using Microsoft.Extensions.FileProviders;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Booking Service
builder.Services.AddDbContext<BookingContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<ICrudRepository<Booking, int>, BookingRepository>();
builder.Services.AddScoped<ICrudService<Booking, int>, BookingService>();

// Ingredient Service
builder.Services.AddDbContext<IngredientContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<ICrudRepository<Ingredient, int>, IngredientRepository>();
builder.Services.AddScoped<ICrudService<Ingredient, int>, IngredientService>();

// Product Service
builder.Services.AddDbContext<ProductContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<ICrudRepository<Product, int>, ProductRepository>();
builder.Services.AddScoped<ICrudService<Product, int>, ProductService>();

// Coupon Service
builder.Services.AddDbContext<CouponContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<ICrudRepository<Coupon, int>, CouponRepository>();
builder.Services.AddScoped<ICrudService<Coupon, int>, CouponService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy =>
        {
            policy.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "RestuarantRestAPI",
        Version =
    "v1"
    });
});

var app = builder.Build();

app.UseCors(MyAllowSpecificOrigins);//To EnableCors - CrossOrigin

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
/*

app.UseFileServer(new FileServerOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "Views")),
    RequestPath = "/Views",
    EnableDefaultFiles = true
});
*/
app.UseStaticFiles();

app.UseAuthorization();

app.MapControllers();

app.Run();