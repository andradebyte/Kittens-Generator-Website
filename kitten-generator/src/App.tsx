import Generator from './Generator'
import Header from './Header'
import './App.css'

function App() {
  return (
    <div className="App">
      <Header />
      <div className='GeneratorContainer'>
        <Generator />
      </div>
    </div>
  )
}

export default App
