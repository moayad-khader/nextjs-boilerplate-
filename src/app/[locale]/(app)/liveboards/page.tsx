'use client'
import { Liveboard } from '@/components/Liveboard'
import { LiveboardData } from '@/types/liveboard'
import { useTranslations } from 'use-intl'

export default function LiveboardsPage() {
  const t = useTranslations()

  // Sample data matching the design in the image
  const liveboardData: LiveboardData = {
    title: 'New',
    statisticsTitle: 'According to the latest statistics and digital indicators, it is:',
    kpis: [
      {
        title: 'Total Penalty Amount (SAR)',
        currentValue: 9981200,
        currency: 'SAR',
        percentageChange: 1993.37,
        previousValue: 476800,
        isPositive: true
      },
      {
        title: 'Total Penalty Amount (SAR)',
        currentValue: 9981200,
        currency: 'SAR',
        percentageChange: 1993.37,
        previousValue: 476800,
        isPositive: true
      }
    ],
    districtData: [
      { name: 'Riyadh', nameAr: 'الرياض', value: 5722950000, color: '#8B4B9A' },
      { name: 'Mecca', nameAr: 'مكة المكرمة', value: 6514500000, color: '#4CAF50' },
      { name: 'Eastern Province', nameAr: 'المنطقة الشرقية', value: 4134240000, color: '#2196F3' },
      { name: 'Asir', nameAr: 'عسير', value: 1342480000, color: '#FF9800' },
      { name: 'Medina', nameAr: 'المدينة المنورة', value: 1275400000, color: '#9C27B0' },
      { name: 'Qassim', nameAr: 'القصيم', value: 5011200000, color: '#4CAF50' },
      { name: 'Hail', nameAr: 'حائل', value: 8537000000, color: '#FF5722' },
      { name: 'Tabuk', nameAr: 'تبوك', value: 5808000000, color: '#795548' },
      { name: 'Northern Borders', nameAr: 'الحدود الشمالية', value: 3340800000, color: '#607D8B' },
      { name: 'Jazan', nameAr: 'جازان', value: 3340800000, color: '#FFC107' },
      { name: 'Najran', nameAr: 'نجران', value: 1380400000, color: '#3F51B5' },
      { name: 'Al Bahah', nameAr: 'الباحة', value: 2872400000, color: '#E91E63' }, { name: 'Al Jouf', nameAr: 'الجوف', value: 282240000, color: '#009688' }
    ]
  }

  return (
    <div className="h-full overflow-y-auto bg-gradient-light">
      <Liveboard data={liveboardData} className="w-full max-w-7xl mx-auto" />
    </div>
  )
}
