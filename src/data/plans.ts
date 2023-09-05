export interface Plan {
	price: number;
	sizeCache: number;
	sizeFlash: number;
	sizeDisk: number;
}

export const plans: Plan[] = [
	{
		price: 0.0,
		sizeCache: 30,
		sizeFlash: 0,
		sizeDisk: 0,
	},
	{
		price: 10.0,
		sizeCache: 50,
		sizeFlash: 0,
		sizeDisk: 0,
	},
	{
		price: 20.0,
		sizeCache: 100,
		sizeFlash: 100,
		sizeDisk: 100,
	},
	{
		price: 30.0,
		sizeCache: 200,
		sizeFlash: 200,
		sizeDisk: 200,
	},
	{
		price: 40.0,
		sizeCache: 400,
		sizeFlash: 400,
		sizeDisk: 400,
	},
	{
		price: 50.0,
		sizeCache: 800,
		sizeFlash: 800,
		sizeDisk: 800,
	},
	{
		price: 60.0,
		sizeCache: 1000,
		sizeFlash: 1000,
		sizeDisk: 1000,
	},
];
