import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ListWithPagination extends Component {
  render() {
    const {list, keyToRender, itemsPerPage, currentPage, showPagination, setNewPage} = this.props;

    const from = currentPage * itemsPerPage;
    const to = from + itemsPerPage;
    const listToRender = list.slice(from, to).map(item => 
      <div className={'list-group-item text-break'} key={keyToRender ? item[keyToRender] : item}>
        {keyToRender ? item[keyToRender] : item}
      </div>
    );

    const pagesNumber = Math.ceil(list.length / itemsPerPage);
    let paginationToRender = [];

    for (let i = 0; i < pagesNumber; i++) {
      paginationToRender.push(
        <li className={`page-item ${currentPage === i ? 'active' : ''}`} key={i} onClick={() => setNewPage(i)}>
          <a className={'page-link'} href={'#'} onClick={e => e.preventDefault()}>
            {i + 1}
          </a>
        </li>
      )
    }

    return (
      <>
        <ul className={'list-group mb-2'}>
          {list.length && listToRender}
        </ul>
        {showPagination && (
            <ul className={'pagination pagination-sm mb-2'}>
              {paginationToRender}
            </ul>
          )
        }
      </>
    );
  }
}

ListWithPagination.propTypes = {
  list: PropTypes.array,
  keyToRender: PropTypes.string,
  itemsPerPage: PropTypes.number,
  currentPage: PropTypes.number,
  setNewPage: PropTypes.func,
  showPagination: PropTypes.bool
}

export default ListWithPagination;
