import 'source-map-support/register';

import { getProductsList } from './src/handlers/getProductsList';
import { getProductsById } from './src/handlers/getProductsById';
import { catalogBatchProcess } from './src/handlers/catalogBatchProcess';

export { getProductsList, getProductsById, catalogBatchProcess };
