import { Gender, GenderInput } from "../models/Gender";

const genderTransformer = {
  genderInputToGender(genderInput: GenderInput): Gender {
    return genderInput.toUpperCase() === "M" ? Gender.M : Gender.F;
  },
};

export default genderTransformer;
