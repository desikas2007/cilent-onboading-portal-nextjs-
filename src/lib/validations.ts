import { z } from 'zod';

export const panSchema = z
  .string()
  .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format. Use 5 letters, 4 digits, 1 letter.');

export const dateOfBirthSchema = z
  .string()
  .refine((date) => {
    const birthDate = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    return age >= 18;
  }, 'You must be at least 18 years old');

export const clientDetailSchema = z.object({
  panNumber: panSchema,
  dateOfBirth: dateOfBirthSchema,
  proprietaryConcernName: z.string().optional(),
  clientName: z.string().min(1, 'Client name is required'),
  assessmentYear: z.string().min(1, 'Assessment year is required'),
});

export const businessExpensesSchema = z.object({
  rentAndRates: z.coerce.number().nonnegative('Rent and rates must be non-negative'),
  salariesAndWages: z.coerce.number().nonnegative('Salaries and wages must be non-negative'),
  electricityAndWater: z.coerce.number().nonnegative('Electricity and water must be non-negative'),
  additionalExpenses: z
    .array(
      z.object({
        label: z.string().min(1, 'Expense label is required'),
        amount: z.coerce.number().nonnegative('Amount must be non-negative'),
      })
    )
    .optional(),
});

export const loanSchema = z.object({
  loanType: z.string().min(1, 'Loan type is required'),
  category: z.string().min(1, 'Category is required'),
  providerName: z.string().min(1, 'Provider name is required'),
  loanStartMonth: z.string().min(1, 'Loan start month is required'),
  principalAmount: z.coerce.number().positive('Principal amount must be positive'),
  monthlyEMI: z.coerce.number().positive('Monthly EMI must be positive'),
  rateOfInterest: z.coerce.number().nonnegative('Rate of interest must be non-negative'),
  tenureYears: z.coerce.number().positive('Tenure must be positive'),
});
