using System.ComponentModel.DataAnnotations;

namespace Restuarant_Site.Models
{
    public class Coupon
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Code is required")]
        public string? Code { get; set; }

        [Required(ErrorMessage = "Type is required")]
        public string? Type { get; set; }

        [Required(ErrorMessage = "Discount is required")]
        public string? Discount { get; set; }

        [Required(ErrorMessage = "Status is required")]
        public string? Status { get; set; }

    }
}
