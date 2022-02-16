using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HammingApi.Migrations
{
    public partial class GiveActualAnswerPropertiesToAttempt : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ActualBit",
                table: "Attempts",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "ActualNoErrors",
                table: "Attempts",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "ActualTwoErrors",
                table: "Attempts",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ActualBit",
                table: "Attempts");

            migrationBuilder.DropColumn(
                name: "ActualNoErrors",
                table: "Attempts");

            migrationBuilder.DropColumn(
                name: "ActualTwoErrors",
                table: "Attempts");
        }
    }
}
