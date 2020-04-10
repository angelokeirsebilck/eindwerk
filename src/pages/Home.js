import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadPosts, loadPageCount } from '../redux/actions/postsActions';
import Post from '../components/Post/Post';
import ReactPaginate from 'react-paginate';

class Home extends Component {

    componentDidMount() {
        this.props.loadPageCount();
    }

    handlePageClick = data => {
        this.props.loadPosts(this.props.pageCount - data.selected);
      };

    render() {
        const { posts } = this.props;
        let sortedPosts = posts.sort((a,b) =>{
            let dateA = new Date(a.created_at);
            let dateB = new Date(b.created_at);
            return dateB - dateA;
        })
        return (
            <div className="container">
                <ReactPaginate  previousLabel={'previous'}
                                nextLabel={'next'}
                                breakLabel={'...'}
                                breakClassName={'break-me'}
                                pageCount={this.props.pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.handlePageClick}
                                containerClassName={'pagination'}
                                subContainerClassName={'pages pagination'}
                                activeClassName={'active'}>
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
            </div>
        )
    }
}

const MapStateToProps = (state) => {
    return {
        posts: state.posts.posts,
        pageCount : state.posts.pageCount
    }
}

const MapDispatchToProps = (dispatch) => {
    return {
        loadPageCount: () => dispatch(loadPageCount()),
        loadPosts: (pageNumber) => dispatch(loadPosts(pageNumber))
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(Home);
