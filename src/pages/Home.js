import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadPosts, loadPageCount } from '../redux/actions/postsActions';
import Post from '../components/Post/Post';
import ReactPaginate from 'react-paginate';
import Loader from '../components/Loader/Loader';
import './Home.css';

class Home extends Component {

    componentDidMount() {
        this.props.loadPageCount();
    }

    handlePageClick = data => {
        //this.props.loadPosts(this.props.pageCount - data.selected);
        this.props.loadPosts(data.selected + 1);
    };

    render() {
        const { posts } = this.props;
        let sortedPosts = posts.sort((a, b) => {
            let dateA = new Date(a.created_at);
            let dateB = new Date(b.created_at);
            return dateB - dateA;
        })

        const loaderStyle = {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '24px'
        }

        let homeContent =
         <div className="container">
            <ReactPaginate previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={this.props.pageCount}
                pageClassName={'Pagination_item'}
                pageLinkClassName={'Pagination_link'}
                previousClassName={'Pagination_prev'}
                nextClassName={'Pagination_next'}
                previousLinkClassName={'Pagination_prevLink'}
                nextLinkClassName={'Pagination_nextLink'}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                onPageChange={this.handlePageClick}
                containerClassName={'Pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'Pagination_isActive'}>
            </ReactPaginate>
            {sortedPosts.map(p => (
                <Post
                    key={p.id}
                    id={p.id}
                    title={p.title}
                    body={p.body}
                    created_at={p.created_at}
                    updated_at={p.updated_at}
                    user={p.user}
                    comments_count={p.comments_count}
                />
            ))}
        </div>;

        return (
            <div>
                {this.props.postsIsLoading ? <div className="container" style={loaderStyle}><Loader /></div> :
                    homeContent}
            </div>

        )
    }
}

const MapStateToProps = (state) => {
    return {
        posts: state.posts.posts,
        pageCount: state.posts.pageCount,
        postsIsLoading: state.posts.postsIsLoading
    }
}

const MapDispatchToProps = (dispatch) => {
    return {
        loadPageCount: () => dispatch(loadPageCount()),
        loadPosts: (pageNumber) => dispatch(loadPosts(pageNumber))
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(Home);
