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
            Id = 1,
            Code = new Byte[] { (byte)43, (byte)178 },
            ExerciseCode = new Byte[] { (byte)43, (byte)178 },
            ErrorType = HammingUtilities.TransmissionErrorType.NoError
        };

        public static readonly HammingCode ONE_BIT_FLIPPED_HC = new HammingCode()
        {
            Id = 2,
            Code = new Byte[] { (byte)43, (byte)178 },
            ExerciseCode = new Byte[] { (byte)172, (byte)95 },
            ErrorType = HammingUtilities.TransmissionErrorType.OneBitFlipped,
            FlippedBit = 10
        };

        public static readonly HammingCode TWO_ERRORS_HC = new HammingCode()
        {
            Id = 3,
            Code = new Byte[] { (byte)172, (byte)127 },
            ExerciseCode = new Byte[] { (byte)44, (byte)95 },
            ErrorType = HammingUtilities.TransmissionErrorType.TwoBitsFlipped
        };

        public static readonly List<HammingCode> TEST_HAMMING_CODES = new() { NO_ERROR_HC, ONE_BIT_FLIPPED_HC, TWO_ERRORS_HC };

        public static readonly string TEST_USER = "auth0|2345";
        public static readonly string TEST_USER_ADMIN = "auth0|8855";

        public static readonly List<Attempt> TEST_ATTEMPTS = new()
        {
            new Attempt
            {
                AttemptId = 1,
                ExerciseId = 7,
                UserId = "auth0|2345",
                BitSelected = null,
                ActualBit = null,
                NoErrorsSelected = false,
                ActualNoErrors = false,
                TwoErrorsSelected = true,
                ActualTwoErrors = true,
                Correct = true,
                SubmittedOn = new DateTime(2022, 1, 15, 18, 25, 43, 511),
            },
            new Attempt
            {
                AttemptId = 2,
                ExerciseId = 12,
                UserId = "auth0|2345",
                BitSelected = null,
                ActualBit = 3,
                NoErrorsSelected = true,
                ActualNoErrors = false,
                TwoErrorsSelected = false,
                ActualTwoErrors = false,
                Correct = false,
                SubmittedOn = new DateTime(2022, 1, 15, 17, 01, 23, 308),
            },
            new Attempt
            {
                AttemptId = 3,
                ExerciseId = 15,
                UserId = "auth0|2345",
                BitSelected = 7,
                ActualBit = 7,
                NoErrorsSelected = false,
                ActualNoErrors = false,
                TwoErrorsSelected = false,
                ActualTwoErrors = false,
                Correct = true,
                SubmittedOn = new DateTime(2022, 1, 16, 4, 25, 43, 255),
            },
            new Attempt
            {
                AttemptId = 4,
                ExerciseId = 3,
                UserId = null,
                BitSelected = null,
                ActualBit = null,
                NoErrorsSelected = false,
                ActualNoErrors = false,
                TwoErrorsSelected = true,
                ActualTwoErrors = true,
                Correct = true,
                SubmittedOn = new DateTime(2022, 1, 15, 19, 25, 43, 511),
            },
            new Attempt
            {
                AttemptId = 5,
                ExerciseId = 28,
                UserId = null,
                BitSelected = 5,
                ActualBit = null,
                NoErrorsSelected = false,
                ActualNoErrors = false,
                TwoErrorsSelected = false,
                ActualTwoErrors = true,
                Correct = false,
                SubmittedOn = new DateTime(2022, 1, 15, 19, 25, 43, 511),
            },
            new Attempt
            {
                AttemptId = 6,
                ExerciseId = 56,
                UserId = "auth0|8855",
                BitSelected = null,
                ActualBit = null,
                NoErrorsSelected = false,
                ActualNoErrors = false,
                TwoErrorsSelected = true,
                ActualTwoErrors = true,
                Correct = true,
                SubmittedOn = new DateTime(2021, 8, 15, 19, 25, 43, 511),
            }
        };

        public static async Task<AppDbContext> GetTestDbContext()
        {
            var db = new AppDbContext(CreateOptions());
            await db.Database.EnsureDeletedAsync();
            await db.Database.EnsureCreatedAsync();

            await db.HammingCodes.AddRangeAsync(TEST_HAMMING_CODES);
            await db.Attempts.AddRangeAsync(TEST_ATTEMPTS);

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