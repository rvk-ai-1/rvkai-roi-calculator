export interface CalculatorState {
  // Shared / General
  monthlyInboundCalls: number;
  monthlyAdmissions: number;
  avgNetPatientRevenue: number;

  // Missed Calls (Ella)
  missedCallRate: number; // e.g., 0.1 for 10%

  // Outbound Lost Opportunity (Juliana)
  qualifiedLeadsPercent: number; // e.g., 0.25 for 25%
  callsPerLead: number;
  deadLeadConversionRate: number; // e.g., 0.001

  // Alumni Re-Admission (Sophy)
  alumniDatabaseSize: number;
  alumniEligibleRate: number; // New: Percentage of alumni eligible
  callsPerAlumni: number;
  alumniConversionRate: number; // e.g., 0.005

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
  
  qualifiedLeadsPercent: 0.25,
  callsPerLead: 4,
  deadLeadConversionRate: 0.001,
  
  alumniDatabaseSize: 1000,
  alumniEligibleRate: 0.5, // Default 50%
  callsPerAlumni: 4,
  alumniConversionRate: 0.005,
  
  annualAssessments: 3000,
  minutesPerAssessment: 20, // Default 20 minutes
  assessmentsHandledRate: 1.0, // Default 100%
  hourlyRate: 30,
};