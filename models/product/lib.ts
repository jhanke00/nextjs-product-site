// Types
import { ProductType } from '../../src/type/products';

// Interfaces
import { ProductQueryFiltersInterface } from './type';

// Validators
import validators from './validators';

export default class ProductsMockModelLib {
  private dataset: ProductType[];
  private validators;

  constructor(dataset: ProductType[]) {
    this.dataset = dataset;
    this.validators = validators;
  }

  filterByQuery(queryFilters: ProductQueryFiltersInterface) {
    const queryProperties = Object.keys(queryFilters);

    return this.dataset.filter((product) => {
      let isMatch = true;

      for (const property of queryProperties) {
        if (!this.validators.queryableProperties.includes(property)) {
          continue;
        }

        if (
          !product[property as keyof ProductType]
            .toString()
            .toLocaleLowerCase()
            .includes(queryFilters[property as keyof ProductQueryFiltersInterface]!.toString().toLocaleLowerCase())
        ) {
          isMatch = false;
        }
      }

      return isMatch;
    });
  }
}
