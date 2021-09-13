import { ZodiacEnum } from 'src/users/enums/zodiac.enum';

export const birthDateToZodiac = (birthDate: Date) => {
  const month = birthDate.getMonth() + 1;
  const date = birthDate.getDate();
  console.log(month, date);
  if ((month == 1 && date >= 20) || (month == 2 && date <= 18)) {
    return ZodiacEnum.Aquarius;
  }
  if ((month == 2 && date >= 19) || (month == 3 && date <= 20)) {
    return ZodiacEnum.Pisces;
  }
  if ((month == 3 && date >= 21) || (month == 4 && date <= 19)) {
    return ZodiacEnum.Aries;
  }
  if ((month == 4 && date >= 20) || (month == 5 && date <= 20)) {
    return ZodiacEnum.Taurus;
  }
  if ((month == 5 && date >= 21) || (month == 6 && date <= 21)) {
    return ZodiacEnum.Gemini;
  }
  if ((month == 6 && date >= 22) || (month == 7 && date <= 22)) {
    return ZodiacEnum.Cancer;
  }
  if ((month == 7 && date >= 23) || (month == 8 && date <= 22)) {
    return ZodiacEnum.Leo;
  }
  if ((month == 8 && date >= 23) || (month == 9 && date <= 22)) {
    return ZodiacEnum.Virgo;
  }
  if ((month == 9 && date >= 23) || (month == 10 && date <= 22)) {
    return ZodiacEnum.Libra;
  }
  if ((month == 10 && date >= 23) || (month == 11 && date <= 21)) {
    return ZodiacEnum.Scorpio;
  }
  if ((month == 11 && date >= 22) || (month == 12 && date <= 21)) {
    return ZodiacEnum.Sagittarius;
  }
  if ((month == 12 && date >= 22) || (month == 1 && date <= 19)) {
    return ZodiacEnum.Capricorn;
  }
};
