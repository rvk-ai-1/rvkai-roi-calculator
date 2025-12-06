export interface CalculatorState {
  // Shared / General
  monthlyInboundCalls: number;
  monthlyAdmissions: number;
  avgNetPatientRevenue: number;

  // Missed Calls (Ella)
  missedCallRate: number; // e.g., 0.1 for 10%

  // Outbound Lost Opportunity (Juliana)
  qualifiedOpportunitiesPercent: number; // e.g., 0.25 for 25%
  lostOpportunityConversionRate: number; // e.g., 0.006 for 0.6%

  // Alumni Re-Admission (Sophy)
  alumniDatabaseSize: number;
  alumniContactsPerMonth: number; // Contacts per month
  alumniConversionRate: number; // e.g., 0.005 for 0.5%

  // Assessments (Connie)
  annualAssessments: number;
  minutesPerAssessment: number; // Changed from hours to minutes
  assessmentsHandledRate: number; // New: Percentage of calls handled by agent
  hourlyRate: number;
}

export const DEFAULT_STATE: CalculatorState = {
  monthlyInboundCalls: 3300,
  monthlyAdmissions: 100,
  avgNetPatientRevenue: 13000,
  
  missedCallRate: 0.1,

  qualifiedOpportunitiesPercent: 0.25,
  lostOpportunityConversionRate: 0.006, // 0.6% conversion on lost opportunities

  alumniDatabaseSize: 1000,
  alumniContactsPerMonth: 200, // Contacts per month
  alumniConversionRate: 0.005, // 0.5% - 5 admits per 1000 alumni
  
  annualAssessments: 3000,
  minutesPerAssessment: 20, // Default 20 minutes
  assessmentsHandledRate: 1.0, // Default 100%
  hourlyRate: 30,
};