using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HammingApi.Migrations
{
    public partial class AddCorrectColumnToAttemptTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Correct",
                table: "Attempts",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Correct",
                table: "Attempts");
        }
    }
}
