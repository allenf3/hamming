using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HammingApi.Migrations
{
    public partial class InsertSampleHammingCode : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "HammingCodes",
                columns: new[] { "Id", "Code" },
                values: new object[] { 1L, "01010101" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "HammingCodes",
                keyColumn: "Id",
                keyValue: 1L);
        }
    }
}
