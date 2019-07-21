import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addBlocks, setBlockCurrentPage} from '../redux';
import ListWithPagination from './ListWithPagination';

class Blocks extends Component {
  render() {
    const {blocks, blockCurrentPage, blocksPerPage, setBlockCurrentPageAction} = this.props;

    return (
      <div className='col-12 blocks'>
        <div className='font-weight-bold mb-2'>
          Blocks
        </div>
        <ListWithPagination
          list={blocks}
          keyToRender={'hash'}
          itemsPerPage={blocksPerPage}
          currentPage={blockCurrentPage}
          setNewPage={setBlockCurrentPageAction}
          showPagination={true}
        />
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    blocks: store.blocks,
    blocksPerPage: store.blocksPerPage,
    blockCurrentPage: store.blockCurrentPage
  }
};

const mapDispatchToProps = dispatch => ({
  addBlocksAction: blocks => dispatch(addBlocks(blocks)),
  setBlockCurrentPageAction: currentPage => dispatch(setBlockCurrentPage(currentPage))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blocks)
