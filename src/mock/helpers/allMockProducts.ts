import mockProductsLarge from '@mock/large/products.json' assert { type: 'json' };
import mockProductsSmall from '@mock/small/products.json' assert { type: 'json' };

export const allMockProducts = [...mockProductsLarge, ...mockProductsSmall];
