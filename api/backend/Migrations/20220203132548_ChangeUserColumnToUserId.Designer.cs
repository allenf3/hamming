﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using backend.Models;

#nullable disable

namespace HammingApi.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20220203132548_ChangeUserColumnToUserId")]
    partial class ChangeUserColumnToUserId
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("backend.Models.Attempt", b =>
                {
                    b.Property<int>("AttemptId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("AttemptId"), 1L, 1);

                    b.Property<int?>("BitSelected")
                        .HasColumnType("int");

                    b.Property<bool>("Correct")
                        .HasColumnType("bit");

                    b.Property<int>("ExerciseId")
                        .HasColumnType("int");

                    b.Property<bool>("NoErrorsSelected")
                        .HasColumnType("bit");

                    b.Property<DateTime>("SubmittedOn")
                        .HasColumnType("datetime2");

                    b.Property<bool>("TwoErrorsSelected")
                        .HasColumnType("bit");

                    b.Property<string>("User")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("AttemptId");

                    b.ToTable("Attempts");
                });

            modelBuilder.Entity("backend.Models.HammingCode", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<byte[]>("Code")
                        .HasColumnType("varbinary(max)");

                    b.Property<int?>("ErrorType")
                        .HasColumnType("int");

                    b.Property<byte[]>("ExerciseCode")
                        .HasColumnType("varbinary(max)");

                    b.Property<int?>("FlippedBit")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("HammingCodes");
                });
#pragma warning restore 612, 618
        }
    }
}
