using static backend.Utils.HammingUtilities;

namespace backend.Models
{
    public class HammingCodeExercise
    {
        public int Id { get; set; }
        public char[] ExerciseCodeCharacters { get; set; }

        public HammingCodeExercise(int id, byte[] code)
        {
            Id = id;
            ExerciseCodeCharacters = CodeToCharArray(code);
        }
    }
}