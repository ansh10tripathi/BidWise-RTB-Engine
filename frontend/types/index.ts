export interface RTBData {
  clicks: number
  conversions: number
  score: number
  remaining_budget: number
}

export interface KPIData {
  clickDifference: number
  conversionDifference: number
  scoreDifference: number
  budgetEfficiency: number
}

export interface ChartData {
  name: string
  clicks: number
  score: number
}

export interface BudgetData {
  name: string
  value: number
}