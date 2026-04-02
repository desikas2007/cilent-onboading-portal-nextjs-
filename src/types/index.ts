export type OnboardingStatus =
  | 'Onboarding Completed'
  | 'Onboarding In Progress'
  | 'Data Pending With Client'
  | 'Draft Preparation (WIP)'
  | 'Draft Submitted'
  | 'Proceed to File'
  | 'Filing In Progress'
  | 'Filing Completed'
  | 'Soft Copy Sent'
  | 'Signed Copy Sent'
  | 'Physical Copy Sent';

export interface Client {
  id: string;
  clientName: string;
  panNumber: string;
  dob: string;
  assessmentYear: string;
  status: OnboardingStatus;
  remarks?: string;
  onboardDate: string;
  updatedDate: string;
}

export interface ClientDetail {
  panNumber: string;
  dateOfBirth: string;
  proprietaryConcernName?: string;
  clientName: string;
  assessmentYear: string;
  financialYear: string;
}

export interface UploadedDocument {
  name: string;
  size: string;
  status: 'ready' | 'pending' | 'processing';
  file?: File;
}

export interface TDSRecord {
  deductorName: string;
  section: string;
  amountPaid: number;
  tdsAmount: number;
  status: 'Matched' | 'Mismatched' | 'Pending';
}

export interface TDSSummary {
  totalTDSPanBase: number;
  totalTDSForm26AS: number;
  netVariance: number;
  quarterlyBreakdown: QuarterlyTDS[];
  tdsRecords: TDSRecord[];
}

export interface QuarterlyTDS {
  quarter: string;
  form26AS: number;
  tdsBooks: number;
  aisReceived: number;
  difference: number;
  reconciliationStatus: 'Matched' | 'Pending';
}

export interface BankAccount {
  bankName: string;
  accountNo: string;
  totalCredits: number;
  totalDebits: number;
  closingBalance: number;
}

export interface BankDetails {
  accounts: BankAccount[];
  overallNarrative: string;
}

export interface BusinessExpenses {
  rentAndRates: number;
  salariesAndWages: number;
  electricityAndWater: number;
  additionalExpenses: { label: string; amount: number }[];
}

export interface Loan {
  id: string;
  loanType: string;
  category: string;
  providerName: string;
  loanStartMonth: string;
  principalAmount: number;
  monthlyEMI: number;
  rateOfInterest: number;
  tenureYears: number;
  outstandingBalance: number;
  isActive: boolean;
}

export interface LoanDetails {
  hasLoans: boolean;
  loans: Loan[];
}

export interface LoanSummaryMonth {
  month: string;
  period: number;
  emi: number;
  principalPaid: number;
  interestPaid: number;
  closingBalance: number;
}

export interface OnboardingFormData {
  clientDetail: Partial<ClientDetail>;
  uploadedDocuments: {
    form26AS?: UploadedDocument;
    formTIS?: UploadedDocument;
    formAIS?: UploadedDocument;
  };
  tdsSummary: Partial<TDSSummary>;
  bankDetails: Partial<BankDetails>;
  businessExpenses: Partial<BusinessExpenses>;
  loanDetails: Partial<LoanDetails>;
}

export interface DashboardStats {
  onboardingCompleted: number;
  onboardingInProgress: number;
  dataPendingWithClient: number;
  draftPreparationWIP: number;
  draftSubmitted: number;
  proceedToFile: number;
  filingInProgress: number;
  filingCompleted: number;
  softCopySent: number;
  signedCopySent: number;
  physicalCopySent: number;
}
