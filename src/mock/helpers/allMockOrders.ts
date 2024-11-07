import mockOrdersLarge from '@mock/large/orders.json' assert { type: 'json' };
import mockOrdersSmall from '@mock/small/orders.json' assert { type: 'json' };

// Probably the file is way too big and the IDE fails
// so for convience we just cast it
export const allMockOrders = [...(mockOrdersLarge as typeof mockOrdersSmall), ...mockOrdersSmall];
