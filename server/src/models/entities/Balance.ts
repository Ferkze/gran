export enum Period {
	DAY = 'day',
	WEEK = 'week',
	MONTH = 'month',
	QUARTER = 'quarter',
	SEMESTER = 'semester',
	YEAR = 'year'
}

export interface Balance {
	start: Date
	finish: Date
	credits: number
	debits: number
	balance: number
}