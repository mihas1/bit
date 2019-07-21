import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addLatestBlock, addBlocks, setCurrentPage, setCurrentSearchResult} from './redux';
import Chart from './modules/Chart';
import ListWithPagination from './modules/ListWithPagination';
import Popup from './modules/Popup';
import Blocks from './modules/Blocks';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.getTransactionByHashInput = React.createRef();
    this.getBlocksByHeightInput = React.createRef();
  }

  componentDidMount() {
    this.getLatestBlock();
    this.getBlocksForDay();
  }

  getLatestBlock() {
    const {addLatestBlockAction} = this.props;

    fetch('https://blockchain.info/latestblock?cors=true')
      .then((response) => response.json())
      .then((block) => {
        addLatestBlockAction(block);
      });
  }

  getBlocksForDay() {
    const date = new Date();
    const dateForAPI = new Date(`${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`).getTime();
    
    fetch(`https://blockchain.info/blocks/${dateForAPI}?format=json&cors=true`)
      .then(response => response.json())
      .then(json => {
        this.props.addBlocksAction(json.blocks);
      })
  }

  getTransactionByHash(tx_hash) {
    fetch(`https://blockchain.info/rawtx/${tx_hash}?format=json&cors=true`)
      .then((response) => response.json())
      .then((transaction) => {
        this.props.setCurrentSearchResultAction(transaction);
      });
  }

  getBlocksByHeight(blockHeight) {
    fetch(`https://blockchain.info/block-height/${blockHeight}?format=json&cors=true`)
      .then((response) => response.json())
      .then((blocks) => {
        this.props.setCurrentSearchResultAction(blocks);
      });
  }

  navbarItemClickHandler(pageName) {
    if (this.props.currentPage !== pageName) {
      this.props.setCurrentPageAction(pageName);
    }
  }

  render() {
    const {mainPageLatestItems, latestBlock, pageList, currentPage, blocks, currentSearchResult, setCurrentSearchResultAction} = this.props;

    const pages = pageList.map((page) => {
      return (
        <li
          key={page.title}
          className={`nav-item ${currentPage === page.title ? 'active' : ''} with-hover`}
          onClick={() => this.navbarItemClickHandler(page.title)}
        >
          <a className={'nav-link'} onClick={e => e.preventDefault()}>{page.title}</a>
        </li>
      )
    });

    return (
      <div className='App container-fluid'>
        <nav className='navbar navbar-expand navbar-light bg-light mb-2'>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav mr-auto'>
              {pages}
            </ul>

            <form className='form-inline my-2 my-lg-0' onSubmit={(e) => {e.preventDefault(); this.getBlocksByHeight(this.getBlocksByHeightInput.current.value);}}>
              <input className='form-control mr-sm-2' ref={this.getBlocksByHeightInput} name={'getBlocksByHeight'} placeholder={'Block height'}/>
            </form>

            <form className='form-inline my-2 my-lg-0' onSubmit={(e) => {e.preventDefault(); this.getTransactionByHash(this.getTransactionByHashInput.current.value);}}>
              <input className='form-control mr-sm-2' ref={this.getTransactionByHashInput} name={'getTransactionByHash'} placeholder={'Transaction hash'}/>
            </form>
          </div>
        </nav>
        <div className='row'>
          {currentPage === 'Main' ?
            <>
              <div className='col-12 col-md-6'>
                <div className='row'>
                  <div className='latestTransactions col-md-6 mb-2'>
                    <div className='font-weight-bold mb-2'>{mainPageLatestItems} latest transactions</div>
                    <ListWithPagination
                      list={(latestBlock && latestBlock.txIndexes) || []}
                      keyToRender={''}
                      itemsPerPage={mainPageLatestItems}
                      currentPage={0}
                      setNewPage={() => false}
                      showPagination={false}
                    />
                  </div>
                  <div className='latestBlocks col-md-6 mb-2'>
                    <div className='font-weight-bold mb-2'>{mainPageLatestItems} latest blocks</div>
                    <ListWithPagination
                      list={blocks || []}
                      keyToRender={'hash'}
                      itemsPerPage={mainPageLatestItems}
                      currentPage={0}
                      setNewPage={() => false}
                      showPagination={false}
                    />
                  </div>
                </div>
              </div>
              <div className={'col-12 col-md-6'}>
                <Chart />
              </div>
            </>
            :
            <>
              <Blocks />
            </>
          }
          {
            (Object.keys(currentSearchResult).length || currentSearchResult.length)
            &&
            <Popup json={currentSearchResult} clickHandler={() => setCurrentSearchResultAction({})}/>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    latestBlock: store.latestBlock,
    blocks: store.blocks,
    mainPageLatestItems: store.mainPageLatestItems,
    currentPage: store.currentPage,
    pageList: store.pageList,
    transactionsPerPage: store.transactionsPerPage,
    transactionCurrentPage: store.transactionCurrentPage,
    currentSearchResult: store.currentSearchResult
  }
};

const mapDispatchToProps = dispatch => ({
  addLatestBlockAction: block => dispatch(addLatestBlock(block)),
  addBlocksAction: blocks => dispatch(addBlocks(blocks)),
  setCurrentPageAction: currentPage => dispatch(setCurrentPage(currentPage)),
  setCurrentSearchResultAction: currentSearchResult => dispatch(setCurrentSearchResult(currentSearchResult))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
