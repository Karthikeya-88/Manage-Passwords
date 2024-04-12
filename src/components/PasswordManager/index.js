import {Component} from 'react'
import {v4} from 'uuid'

import './index.css'

class PasswordManager extends Component {
  state = {
    isTrue: false,
    website: '',
    username: '',
    password: '',
    savedPasswordsList: [],
    isShow: false,
  }

  onAddPassword = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const initialValue = website.slice(0, 1).toUpperCase()
    const newPassword = {
      id: v4(),
      initial: initialValue,
      websiteName: website,
      userName: username,
      enterPassword: password,
    }

    this.setState(prevState => ({
      savedPasswordsList: [...prevState.savedPasswordsList, newPassword],
      website: '',
      username: '',
      password: '',
      searchInput: '',
    }))
  }

  onCheckBox = e => {
    if (e.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  deletePassword = passwordId => {
    const {savedPasswordsList} = this.state
    const newList = savedPasswordsList.filter(
      eachPassword => eachPassword.id !== passwordId,
    )
    const caseOf = newList.length !== 0
    this.setState({savedPasswordsList: newList, isTrue: caseOf})
  }

  searchInputValue = event => {
    this.setState({searchInput: event.target.value})
  }

  websiteName = event => {
    this.setState({website: event.target.value})
  }

  userName = event => {
    this.setState({username: event.target.value})
  }

  enterPassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {
      website,
      username,
      password,
      savedPasswordsList,
      searchInput,
      isShow,
    } = this.state

    let {isTrue} = this.state

    const newList = savedPasswordsList.filter(eachPassword =>
      eachPassword.websiteName
        .toLowerCase()
        .includes(searchInput.toLowerCase()),
    )
    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }
    return (
      <div className='ultimateBg'>
        <img
          src='https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png'
          alt='app logo'
          className='appLogo'
        />
        <div className='bg'>
          <form className='form' onSubmit={this.onAddPassword}>
            <h1 className='firstHeading'>Add New Password</h1>
            <div className='webNamePass'>
              <img
                src='https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png'
                alt='website'
                className='formImage'
              />
              <hr />
              <input
                placeholder='Enter Website'
                onChange={this.websiteName}
                value={website}
                type='text'
              />
            </div>
            <div className='webNamePass'>
              <img
                src='https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png'
                alt='username'
                className='formImage'
              />
              <hr />
              <input
                placeholder='Enter Username'
                onChange={this.userName}
                value={username}
                type='text'
              />
            </div>
            <div className='webNamePass'>
              <img
                src='https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png'
                alt='password'
                className='formImage'
              />
              <hr />
              <input
                placeholder='Enter Password'
                onChange={this.enterPassword}
                value={password}
                type='password'
              />
            </div>
            <button type='submit' className='addBtn'>
              Add
            </button>
          </form>
          <img
            src='https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png'
            alt='password manager'
            className='PasswordManager'
          />
        </div>
        <div className='bgPasswordStore'>
          <div className='passwordSearch'>
            <div className='passwordCount'>
              <h1 className='yourPasswords'>Your Passwords</h1>
              <p className='passwordCounttext'>{newList.length}</p>
            </div>
            <div className='searchInput'>
              <img
                src='https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png'
                alt='search'
                className='searchIcon'
              />
              <input
                type='search'
                placeholder='Search'
                onChange={this.searchInputValue}
                value={searchInput}
                className='searchBar'
              />
            </div>
          </div>
          <hr />
          <div className='checkboxPass'>
            <input
              type='checkbox'
              id='checkbox'
              onChange={this.onCheckBox}
              className='checkbox'
            />
            <label className='showPass' htmlFor='checkbox'>
              Show Passwords
            </label>
          </div>
          {!isTrue && (
            <div className='NoPassword'>
              <img
                src='https://assets.ccbp.in/frontend/react-js/no-passwords-img.png'
                alt='no passwords'
              />
              <p>No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className='unorderedList'>
              {newList.map(eachPassword => (
                <li
                  className='listItems'
                  id={eachPassword.id}
                  key={eachPassword.id}
                >
                  <p className='initial'>{eachPassword.initial}</p>
                  <div className='webUserPass'>
                    <p>{eachPassword.websiteName}</p>
                    <p>{eachPassword.userName}</p>
                    {!isShow && (
                      <img
                        src='https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png'
                        alt='stars'
                      />
                    )}
                    {isShow && <p>{eachPassword.enterPassword}</p>}
                  </div>
                  <button
                    type='button'
                    data-testid='delete'
                    className='delButton'
                    onClick={() => this.deletePassword(eachPassword.id)}
                  >
                    <img
                      src='https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png'
                      alt='delete'
                      className='delete'
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
