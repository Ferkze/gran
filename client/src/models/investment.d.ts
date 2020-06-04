import { InvestmentType, InvestmentSubType } from './enums'

export interface Investment {
	type: InvestmentType
	name: string
	title?: string
	totalAssets: number
	monthResult: number
	color: number
	quantity: number
}

export interface Asset {
	type: InvestmentSubType
	name: string
	title: string
	totalAsset: number
	quantity: number
}
