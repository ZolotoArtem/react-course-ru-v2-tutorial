import React from 'react'
import { Add } from './components/Add'
import { News } from './components/News'
import './App.css'

class App extends React.Component {
  state = {
    news: null,
    isLoading: false,
  }
  handleAddNews = data => {
    if (data.bigText.toLowerCase().indexOf('pubg') !== -1) {
      data.bigText = 'SPAM'
    }
    const nextNews = [data, ...this.state.news]
    this.setState({ news: nextNews })
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    fetch('http://localhost:3000/data/newsData.json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ news: data, isLoading: false })
      })
  }

  render() {
    const { news, isLoading } = this.state

    return (
      <React.Fragment>
        <Add onAddNews={this.handleAddNews} />
        <h3>Новости</h3>
        {isLoading && <p>Загружаю...</p>}
        {Array.isArray(news) && <News data={this.state.news} />}
      </React.Fragment>
    )
  }
}

export default App
