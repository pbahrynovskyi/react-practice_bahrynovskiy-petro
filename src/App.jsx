/* eslint-disable jsx-a11y/accessible-emoji */
import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

import cn from 'classnames';

const products = productsFromServer.map(product => {
  const category = categoriesFromServer.find(
    category => category.id === product.categoryId,
  );
  const user = usersFromServer.find(user => user.id === category.ownerId);

  return {
    id: product.id,
    productName: product.name,
    userName: user.name,
    categoryTitle: category.title,
    categoryIcon: category.icon,
  };
});

console.log(`categories - `, categoriesFromServer);
console.log(`users - `, usersFromServer);
console.log(`products - `, products);

function getFilteredProducts(products) {
  return products;
}

export const App = () => {
  const [checkedUserTop, setCheckedUserTop] = useState('All');
  const [inputValue, setInputValue] = useState('');
  const [chosenCategories, setChosenCategories] = useState([]);

  const productsToShow = getFilteredProducts(products);

  console.log(`productsToShow - `, productsToShow);

  const resetAllFilters = () => {
    setCheckedUserTop('All');
    setInputValue('');
    setChosenCategories([]);
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>
            <p className="panel-tabs has-text-weight-bold">
              {[{ name: 'All' }, ...usersFromServer].map(user => (
                <a
                  key={user.name}
                  href="#/"
                  onClick={() => {
                    setCheckedUserTop(user.name);
                  }}
                  className={cn({ 'is-active': checkedUserTop === user.name })}
                >
                  {user.name}
                </a>
              ))}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value="qwe"
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                  />
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                onClick={() => {
                  toggleCategory('all');
                }}
                className={cn('button mr-2 my-1', {
                  'is-success': true,
                  'is-outlined': chosenCategories.length > 0,
                  'is-info': chosenCategories.length === 0,
                })}
              >
                All
              </a>

              {categoriesFromServer.map(category => (
                <a
                  key={category.id}
                  href="#/"
                  onClick={e => {
                    e.preventDefault();
                    toggleCategory(category.id);
                  }}
                  className={cn('button mr-2 my-1', {
                    'is-info': chosenCategories.includes(category.id),
                  })}
                >
                  {category.title}
                </a>
              ))}
            </div>

            <div className="panel-block">
              <a
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={() => {
                  resetAllFilters();
                }}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          <p data-cy="NoMatchingMessage">
            No products matching selected criteria
          </p>

          <table
            data-cy="ProductTable"
            className="table is-striped is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    ID
                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Product
                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-down" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Category
                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-up" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    User
                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              {productsToShow.map(product => {
                return (
                  <tr data-cy="Product">
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      {product.id}
                    </td>

                    <td data-cy="ProductName">{product.productName}</td>
                    <td data-cy="ProductCategory">{`${product.categoryIcon} - ${product.categoryTitle}`}</td>

                    <td
                      data-cy="ProductUser"
                      className={cn({
                        'has-text-link': product.userSex === 'm',
                        'has-text-danger': product.userSex === 'f',
                      })}
                    >
                      {product.userName}
                    </td>
                  </tr>
                );
              })}

              {/* <tr data-cy="Product">
                <td className="has-text-weight-bold" data-cy="ProductId">
                  1
                </td>

                <td data-cy="ProductName">Milk</td>
                <td data-cy="ProductCategory"></td>

                <td data-cy="ProductUser" className="has-text-link">
                  Max
                </td>
              </tr>

              <tr data-cy="Product">
                <td className="has-text-weight-bold" data-cy="ProductId">
                  2
                </td>

                <td data-cy="ProductName">Bread</td>
                <td data-cy="ProductCategory">🍞 - Grocery</td>

                <td data-cy="ProductUser" className="has-text-danger">
                  Anna
                </td>
              </tr>

              <tr data-cy="Product">
                <td className="has-text-weight-bold" data-cy="ProductId">
                  3
                </td>

                <td data-cy="ProductName">iPhone</td>
                <td data-cy="ProductCategory">💻 - Electronics</td>

                <td data-cy="ProductUser" className="has-text-link">
                  Roma
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
