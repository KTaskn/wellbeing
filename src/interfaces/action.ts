export default interface Action {
    id: number
    label: string
    required_time?: number
    required_cost?: number
    wellbeing_long?: number
    wellbeing_short?: number
    score?: number
}