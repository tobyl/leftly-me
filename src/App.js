import React from 'react'
import { Route } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Post from './Post'
import Spinner from './Spinner'
import Error404 from './404'

class App extends React.Component {
  state = {
    posts: [],
    loading: true,
    error: false,
  }

  componentDidMount() {
    const url = process.env.NODE_ENV !== 'production' ? 'http://localhost:5000/posts' : 'https://scary-mummy-76426.herokuapp.com/posts/' 
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({ posts: res })
      })
      .catch(err => this.setState({ error: true }))
      .finally(() => this.setState({ loading: false }))
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="BlogBody">
          {this.state.loading && <Spinner />}
          {this.state.error && (
            <div className="FetchError">
              <h4>Unable to fetch posts</h4>
              <p>The API is unable to fetch latest posts, please check back shortly.</p>
            </div>
          )}
          {this.state.posts.map((post, i) =>
            <Post
              first={i === 0}
              last={i === this.state.posts.length - 1}
              key={post.slug}
              post={post}
            />
          )}
          <Route path="/blah" component={Error404} />
          <Footer />
        </div>
      </div>
    )
  }
}

export default App
