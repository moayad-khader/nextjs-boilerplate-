// Types for liveboard data
export interface KPICardData {
  title: string
  currentValue: number
  currency?: string
  percentageChange: number
  previousValue: number
  isPositive?: boolean
  icon?: string
}

export interface DistrictData {
  name: string
  nameAr: string
  value: number
  color: string
}

export interface LiveboardData {
  kpis: KPICardData[]
  districtData: DistrictData[]
  title: string
  statisticsTitle: string
}
