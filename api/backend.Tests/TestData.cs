using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;
using backend.Utils;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace backend.Tests
{
    public static class TestData
    {
        public static readonly HammingCode NO_ERROR_HC = new HammingCode()
        {
            Id = 5,
            Code = new Byte[] { (byte)43, (byte)178 },
            ExerciseCode = new Byte[] { (byte)43, (byte)178 },
            ErrorType = HammingUtilities.TransmissionErrorType.NoError
        };

        public static readonly HammingCode ONE_BIT_FLIPPED_HC = new HammingCode()
        {
            Id = 5,
            Code = new Byte[] { (byte)43, (byte)178 },
            ExerciseCode = new Byte[] { (byte)172, (byte)95 },
            ErrorType = HammingUtilities.TransmissionErrorType.OneBitFlipped,
            FlippedBit = 10
        };

        public static readonly HammingCode TWO_ERRORS_HC = new HammingCode()
        {
            Id = 5,
            Code = new Byte[] { (byte)172, (byte)127 },
            ExerciseCode = new Byte[] { (byte)44, (byte)95 },
            ErrorType = HammingUtilities.TransmissionErrorType.TwoBitsFlipped
        };

        public static readonly List<HammingCode> TEST_HAMMING_CODES = new() { NO_ERROR_HC, ONE_BIT_FLIPPED_HC, TWO_ERRORS_HC };

        public static async Task<AppDbContext> GetTestDbContext()
        {
            var db = new AppDbContext(CreateOptions());
            await db.Database.EnsureDeletedAsync();
            await db.Database.EnsureCreatedAsync();

            await db.HammingCodes.AddRangeAsync(TEST_HAMMING_CODES);

            await db.SaveChangesAsync();

            return db;
        }

        private static DbContextOptions<AppDbContext> CreateOptions()
        {
            var connection = new SqliteConnection("Filename=:memory:");
            connection.Open();

            var builder = new DbContextOptionsBuilder<AppDbContext>();
            builder.UseSqlite(connection);

            builder.ConfigureWarnings(x => x.Ignore(Microsoft.EntityFrameworkCore.Diagnostics.RelationalEventId.AmbientTransactionWarning));

            return builder.Options;
        }

    }
}