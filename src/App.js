import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Post from './Post'

class App extends React.Component {
  state = {
    posts: []
  }

  componentDidMount() {
    const url = process.env.NODE_ENV !== 'production' ? '/posts' : 'https://scary-mummy-76426.herokuapp.com/posts/' 
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({ posts: res })
      })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="BlogBody">
          {this.state.posts.map((post, i) =>
            <Post
              first={i === 0}
              last={i === this.state.posts.length - 1}
              key={post.slug}
              post={post}
            />
          )}
          <Footer />
        </div>
      </div>
    )
  }
}

export default App
