using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Restuarant_Site.Migrations.Coupon
{
    public partial class finalCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Calories",
                table: "Coupons");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "Coupons",
                newName: "Discount");

            migrationBuilder.RenameColumn(
                name: "Item",
                table: "Coupons",
                newName: "Code");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Discount",
                table: "Coupons",
                newName: "Price");

            migrationBuilder.RenameColumn(
                name: "Code",
                table: "Coupons",
                newName: "Item");

            migrationBuilder.AddColumn<string>(
                name: "Calories",
                table: "Coupons",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
