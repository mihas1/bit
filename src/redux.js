import Immutable from 'immutable';
import {createStore} from 'redux';

const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const ADD_CHART_DATA = 'ADD_CHART_DATA';
const ADD_LATEST_BLOCK = 'ADD_LATEST_BLOCK';
const ADD_BLOCK = 'ADD_BLOCK';
const SET_BLOCK_CURRENT_PAGE = 'SET_BLOCK_CURRENT_PAGE';
const SET_CURRENT_TRANSACTION = 'SET_CURRENT_TRANSACTION';
const SET_CURRENT_SEARCH_RESULT = 'SET_CURRENT_SEARCH_RESULT';

const initialState = {
  currentPage: 'Main',
  pageList: [{title: 'Main'}, {title: 'Blocks'}],
  chartData: {},
  mainPageLatestItems: 10,
  latestBlock: {},
  currentSearchResult: {},
  transactionsPerPage: 10,
  transactionCurrentPage: 0,
  blocks: [],
  blockCurrentPage: 0,
  blocksPerPage: 10,
  month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
};

export function addChartData(response) {
  return {
    type: ADD_CHART_DATA,
    response
  }
}

export function addLatestBlock(latestBlock) {
  return {
    type: ADD_LATEST_BLOCK,
    latestBlock
  }
}

export function addBlocks(blocks) {
  return {
    type: ADD_BLOCK,
    blocks
  }
}

export function setBlockCurrentPage(blockCurrentPage) {
  return {
    type: SET_BLOCK_CURRENT_PAGE,
    blockCurrentPage
  }
}

export function setCurrentPage(currentPage) {
  return {
    type: SET_CURRENT_PAGE,
    currentPage
  }
}

export function setCurrentTransaction(currentTransaction) {
  return {
    type: SET_CURRENT_TRANSACTION,
    currentTransaction
  }
}

export function setCurrentSearchResult(currentSearchResult) {
  return {
    type: SET_CURRENT_SEARCH_RESULT,
    currentSearchResult
  }
}

function reducers(state = initialState, action) {
  const _state = Immutable.fromJS(state);

  switch (action.type) {
    case ADD_CHART_DATA:
      return _state.set('chartData', action.response).toJS();

    case ADD_LATEST_BLOCK:
      return _state.set('latestBlock', action.latestBlock).toJS();

    case ADD_BLOCK:
      return _state.set('blocks', action.blocks).toJS();

    case SET_BLOCK_CURRENT_PAGE:
      return _state.set('blockCurrentPage', action.blockCurrentPage).toJS();

    case SET_CURRENT_PAGE:
      return _state.set('currentPage', action.currentPage).toJS();

    case SET_CURRENT_TRANSACTION:
      return _state.set('currentTransaction', action.currentTransaction).toJS();

    case SET_CURRENT_SEARCH_RESULT:
        return _state.set('currentSearchResult', action.currentSearchResult).toJS();

    default:
      return state
  }
}

export const store = createStore(reducers);
