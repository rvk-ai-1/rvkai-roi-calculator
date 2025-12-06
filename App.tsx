import React, { useState } from 'react';
import {
  Calculator,
  BarChart3,
  ChevronDown
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

import { CalculatorState, DEFAULT_STATE } from './types';
import { Input } from './components/Input';
import { ResultRow } from './components/ResultRow';
import { formatCurrency, formatNumber, formatPercent } from './utils';

// Agent avatar images
const AGENT_AVATARS = {
  ella: '/img/Gemini_Generated_Image_3v1lf13v1lf13v1l.jpeg',
  juliana: '/img/Gemini_Generated_Image_su81odsu81odsu81.jpeg',
  sophy: '/img/Gemini_Generated_Image_g5pgzrg5pgzrg5pg.jpeg',
  connie: '/img/Gemini_Generated_Image_p28ulkp28ulkp28u.jpeg',
};

const App: React.FC = () => {
  const [state, setState] = useState<CalculatorState>(DEFAULT_STATE);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set(['ella', 'juliana', 'sophy', 'connie']));

  const toggleCard = (card: string) => {
    setExpandedCards(prev => {
      const next = new Set(prev);
      if (next.has(card)) {
        next.delete(card);
      } else {
        next.add(card);
      }
      return next;
    });
  };

  const handleInputChange = (key: keyof CalculatorState, value: string) => {
    const numValue = parseFloat(value);
    setState(prev => ({
      ...prev,
      [key]: isNaN(numValue) ? 0 : numValue
    }));
  };

  // --- Calculations ---

  // 1. Missed Calls (Ella)
  const conversionRate = state.monthlyInboundCalls > 0 ? state.monthlyAdmissions / state.monthlyInboundCalls : 0;
  const missedCalls = state.monthlyInboundCalls * state.missedCallRate;
  const ellaCallsHandled = missedCalls;
  const ellaAddAdmissions = ellaCallsHandled * conversionRate;
  const ellaMonthlyRevenue = ellaAddAdmissions * state.avgNetPatientRevenue;
  const ellaAnnualRevenue = ellaMonthlyRevenue * 12;

  // 2. Outbound Lost Opportunity (Juliana)
  // Total Calls = from global assumptions (monthlyInboundCalls)
  const totalCalls = state.monthlyInboundCalls;
  // Qualified Opportunities = Total Calls × Qualified %
  const qualifiedOpportunities = totalCalls * state.qualifiedOpportunitiesPercent;
  // Admissions = from global assumptions
  const admissions = state.monthlyAdmissions;
  // Lost Opportunities = Qualified Opportunities - Admissions
  const lostOpportunities = Math.max(0, qualifiedOpportunities - admissions);
  // Outbound Calls by Juliana = Lost Opportunities × 4
  const julianaCallsHandled = lostOpportunities * 4;
  // Additional Admits = 0.6% × Lost Opportunities
  const julianaAddAdmissions = lostOpportunities * state.lostOpportunityConversionRate;
  const julianaMonthlyRevenue = julianaAddAdmissions * state.avgNetPatientRevenue;
  const julianaAnnualRevenue = julianaMonthlyRevenue * 12;

  // 3. Alumni Re-Admission (Sophy)
  // Total Alumni = alumniDatabaseSize (input)
  // Outbound Calls by Connie = alumni × 4
  const sophyOutboundCalls = state.alumniDatabaseSize * 4;
  // Contacts per month = alumniContactsPerMonth (input)
  // For every 200 contacted → 1 admission (or use conversion rate of 0.5%)
  // Formula: 5 admissions for every 1000 in database = 0.5% conversion
  const sophyAddAdmissions = state.alumniDatabaseSize * state.alumniConversionRate;
  const sophyMonthlyRevenue = sophyAddAdmissions * state.avgNetPatientRevenue;
  const sophyAnnualRevenue = sophyMonthlyRevenue * 12;

  // 4. Assessments (Connie)
  // Convert minutes to hours for FTE calculation
  const hoursPerAssessment = state.minutesPerAssessment / 60;
  // Connie only handles a percentage of the total assessments
  const connieAssessmentsHandled = state.annualAssessments * state.assessmentsHandledRate;
  const fteHoursSaved = connieAssessmentsHandled * hoursPerAssessment;
  const connieAnnualSavings = fteHoursSaved * state.hourlyRate; 

  const totalAnnualImpact = ellaAnnualRevenue + julianaAnnualRevenue + sophyAnnualRevenue + connieAnnualSavings;

  // Chart Data - Sorted Largest to Smallest
  const rawChartData = [
    { name: 'Missed Calls (Ella)', value: ellaAnnualRevenue, color: '#3b82f6' },
    { name: 'Outbound Opp (Juliana)', value: julianaAnnualRevenue, color: '#8b5cf6' },
    { name: 'Alumni (Sophy)', value: sophyAnnualRevenue, color: '#f59e0b' },
    { name: 'Assessments (Connie)', value: connieAnnualSavings, color: '#10b981' },
  ];

  const chartData = [...rawChartData].sort((a, b) => b.value - a.value);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-12 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="font-bold text-xl text-slate-900 tracking-tight">RVK<span className="text-blue-600">AI</span></span>
            <div className="h-6 w-px bg-slate-300 mx-2 hidden sm:block"></div>
            <span className="text-slate-500 font-medium hidden sm:inline-block">ROI Calculator</span>
          </div>
          <div className="flex items-center">
             <div className="text-right bg-green-50 px-4 py-2 rounded-lg border border-green-100">
                <p className="text-xs text-green-800 uppercase tracking-wide font-bold">Total Annual Impact</p>
                <p className="text-2xl font-bold text-green-600 leading-none mt-1">{formatCurrency(totalAnnualImpact)}</p>
             </div>
          </div>
        </div>
      </header>

      <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Top Summary & Global Settings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Global Inputs Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 lg:col-span-1 flex flex-col">
             <div className="flex items-center space-x-2 mb-6 pb-4 border-b border-slate-100">
                <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                    <Calculator size={20} />
                </div>
                <h3 className="font-bold text-lg text-slate-800">Global Assumptions</h3>
             </div>
             <div className="space-y-1 flex-1">
               <Input 
                 label="Monthly Inbound Calls" 
                 value={state.monthlyInboundCalls}
                 onChange={(e) => handleInputChange('monthlyInboundCalls', e.target.value)}
               />
               <Input 
                 label="Monthly Admissions" 
                 value={state.monthlyAdmissions}
                 onChange={(e) => handleInputChange('monthlyAdmissions', e.target.value)}
               />
               <Input 
                 label="Avg. Net Patient Revenue" 
                 value={state.avgNetPatientRevenue}
                 onChange={(e) => handleInputChange('avgNetPatientRevenue', e.target.value)}
               />
               <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
                   <ResultRow 
                     label="Current Conversion Rate" 
                     value={formatPercent(conversionRate, 1)}
                     subValue="Admissions / Inbound Calls"
                     highlight
                   />
               </div>
             </div>
          </div>

          {/* Chart Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 lg:col-span-2 flex flex-col">
            <div className="flex items-center space-x-2 mb-4">
               <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                  <BarChart3 size={20} />
               </div>
               <h3 className="font-bold text-lg text-slate-800">Projected Annual Impact</h3>
            </div>
            <div className="flex-1 w-full min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={chartData} 
                  layout="vertical" 
                  margin={{ top: 5, right: 90, left: 40, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" hide />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    width={150} 
                    tick={{fontSize: 12, fill: '#475569', fontWeight: 600}} 
                  />
                  <Tooltip 
                    formatter={(value: number) => [formatCurrency(value), 'Impact']}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    cursor={{fill: '#f1f5f9'}}
                  />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={40}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    <LabelList 
                      dataKey="value" 
                      position="right" 
                      formatter={(val: number) => formatCurrency(val)} 
                      style={{ fill: '#334155', fontSize: '13px', fontWeight: 'bold' }} 
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Calculators - 2x2 Grid with Expandable Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* 1. Missed Calls - Ella */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <button
              onClick={() => toggleCard('ella')}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <img src={AGENT_AVATARS.ella} alt="Ella" className="w-12 h-12 rounded-full object-cover" />
                <div className="text-left">
                  <h3 className="font-bold text-slate-800">Missed Calls</h3>
                  <p className="text-sm text-blue-600">Ella</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-slate-500">Annual Impact</p>
                  <p className="font-bold text-blue-600">{formatCurrency(ellaAnnualRevenue)}</p>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expandedCards.has('ella') ? 'rotate-180' : ''}`} />
              </div>
            </button>
            {expandedCards.has('ella') && (
              <div className="px-4 pb-4 border-t border-slate-100">
                <div className="mt-4 bg-slate-50 p-3 rounded-lg space-y-1">
                  <Input label="Missed/Abandoned Rate" subLabel="Industry avg: 10-30%" value={state.missedCallRate} isPercentage step="0.01" onChange={(e) => handleInputChange('missedCallRate', e.target.value)} />
                </div>
                <div className="mt-3 space-y-1">
                  <ResultRow label="Missed/Abandoned Calls" value={formatNumber(missedCalls)} />
                  <ResultRow label="Recoverable Admissions" value={formatNumber(ellaAddAdmissions, 1)} />
                  <ResultRow label="Monthly Revenue" value={formatCurrency(ellaMonthlyRevenue)} highlight />
                </div>
              </div>
            )}
          </div>

          {/* 2. Outbound Lost Opportunity - Juliana */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <button
              onClick={() => toggleCard('juliana')}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <img src={AGENT_AVATARS.juliana} alt="Juliana" className="w-12 h-12 rounded-full object-cover" />
                <div className="text-left">
                  <h3 className="font-bold text-slate-800">Outbound Lost Opp.</h3>
                  <p className="text-sm text-violet-600">Juliana</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-slate-500">Annual Impact</p>
                  <p className="font-bold text-violet-600">{formatCurrency(julianaAnnualRevenue)}</p>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expandedCards.has('juliana') ? 'rotate-180' : ''}`} />
              </div>
            </button>
            {expandedCards.has('juliana') && (
              <div className="px-4 pb-4 border-t border-slate-100">
                <div className="mt-4 bg-slate-50 p-3 rounded-lg space-y-1">
                  <Input label="Qualified Opportunities %" value={state.qualifiedOpportunitiesPercent} isPercentage step="0.01" onChange={(e) => handleInputChange('qualifiedOpportunitiesPercent', e.target.value)} />
                  <Input label="Conversion Rate" subLabel="0.6% of lost opps" value={state.lostOpportunityConversionRate} isPercentage step="0.001" onChange={(e) => handleInputChange('lostOpportunityConversionRate', e.target.value)} />
                </div>
                <div className="mt-3 space-y-1">
                  <ResultRow label="Total Calls" value={formatNumber(totalCalls)} subValue="From Global Assumptions" />
                  <ResultRow label="# of Qualified Opportunities" value={formatNumber(qualifiedOpportunities)} />
                  <ResultRow label="Admissions" value={formatNumber(admissions)} subValue="From Global Assumptions" />
                  <ResultRow label="# of Lost Opportunities" value={formatNumber(lostOpportunities)} />
                  <ResultRow label="Outbound Calls by Juliana" value={formatNumber(julianaCallsHandled)} subValue="Lost Opps × 4" />
                  <ResultRow label="# of Additional Admits" value={formatNumber(julianaAddAdmissions, 1)} />
                  <ResultRow label="Additional Monthly Revenue" value={formatCurrency(julianaMonthlyRevenue)} highlight />
                </div>
              </div>
            )}
          </div>

          {/* 3. Alumni Re-Admission - Sophy */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <button
              onClick={() => toggleCard('sophy')}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <img src={AGENT_AVATARS.sophy} alt="Sophy" className="w-12 h-12 rounded-full object-cover" />
                <div className="text-left">
                  <h3 className="font-bold text-slate-800">Alumni Re-Admission</h3>
                  <p className="text-sm text-amber-600">Sophy</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-slate-500">Annual Impact</p>
                  <p className="font-bold text-amber-600">{formatCurrency(sophyAnnualRevenue)}</p>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expandedCards.has('sophy') ? 'rotate-180' : ''}`} />
              </div>
            </button>
            {expandedCards.has('sophy') && (
              <div className="px-4 pb-4 border-t border-slate-100">
                <div className="mt-4 bg-slate-50 p-3 rounded-lg space-y-1">
                  <Input label="Total Alumni" value={state.alumniDatabaseSize} onChange={(e) => handleInputChange('alumniDatabaseSize', e.target.value)} />
                  <Input label="Contacts per Month" value={state.alumniContactsPerMonth} onChange={(e) => handleInputChange('alumniContactsPerMonth', e.target.value)} />
                  <Input label="Conversion Rate" subLabel="5 admits per 1000 alumni = 0.5%" value={state.alumniConversionRate} isPercentage step="0.001" onChange={(e) => handleInputChange('alumniConversionRate', e.target.value)} />
                </div>
                <div className="mt-3 space-y-1">
                  <ResultRow label="Total Alumni" value={formatNumber(state.alumniDatabaseSize)} />
                  <ResultRow label="Outbound Calls by Connie" value={formatNumber(sophyOutboundCalls)} subValue="Alumni × 4" />
                  <ResultRow label="Contacts per Month" value={formatNumber(state.alumniContactsPerMonth)} />
                  <ResultRow label="Additional Admissions" value={formatNumber(sophyAddAdmissions, 1)} subValue="0.5% of Total Alumni" />
                  <ResultRow label="Monthly Cash Flow" value={formatCurrency(sophyMonthlyRevenue)} highlight />
                </div>
              </div>
            )}
          </div>

          {/* 4. Assessments - Connie */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <button
              onClick={() => toggleCard('connie')}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <img src={AGENT_AVATARS.connie} alt="Connie" className="w-12 h-12 rounded-full object-cover" />
                <div className="text-left">
                  <h3 className="font-bold text-slate-800">Assessments</h3>
                  <p className="text-sm text-emerald-600">Connie</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-slate-500">Annual Savings</p>
                  <p className="font-bold text-emerald-600">{formatCurrency(connieAnnualSavings)}</p>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expandedCards.has('connie') ? 'rotate-180' : ''}`} />
              </div>
            </button>
            {expandedCards.has('connie') && (
              <div className="px-4 pb-4 border-t border-slate-100">
                <div className="mt-4 bg-slate-50 p-3 rounded-lg space-y-1">
                  <Input label="Annual Assessments" value={state.annualAssessments} onChange={(e) => handleInputChange('annualAssessments', e.target.value)} />
                  <Input label="Time per Assess (Min)" value={state.minutesPerAssessment} step="1" onChange={(e) => handleInputChange('minutesPerAssessment', e.target.value)} />
                  <Input label="% Handled by Connie" value={state.assessmentsHandledRate} isPercentage onChange={(e) => handleInputChange('assessmentsHandledRate', e.target.value)} />
                  <Input label="FTE Hourly Cost ($)" value={state.hourlyRate} onChange={(e) => handleInputChange('hourlyRate', e.target.value)} />
                </div>
                <div className="mt-3 space-y-1">
                  <ResultRow label="Assessments Handled" value={formatNumber(connieAssessmentsHandled)} />
                  <ResultRow label="FTE Hours Saved" value={formatNumber(fteHoursSaved, 1)} />
                  <ResultRow label="Hourly Rate" value={formatCurrency(state.hourlyRate)} />
                </div>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;