'use client'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'

const data = [
  {name: 'A', value: 1},
  {name: 'B', value: 2},
  {name: 'C', value: 3},
  {name: 'D', value: 4},
  {name: 'E', value: 5},
]

export default function RechartsDemo() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  )
}
