import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import jwt from 'util/token'
import { inject, observer } from 'mobx-react'
import * as urls from 'constant/urls.js'

import Dashboard  from 'component/Dashboard'
import Loadable from 'component/Loadable'

import login    from 'app/login'
import home     from 'app/home'
import style    from 'app/style'
import project  from 'app/project'
import edu      from 'app/edu'
import job      from 'app/job'
import contract from 'app/contract'
import config   from 'app/config'

@inject('userActions')
@observer
class App extends React.Component {
  constructor(props) {
    super(props)

    if (jwt.getToken()) {
      props.userActions.autoLogin()
    } else {
      window.location.assign(`${window.location.origin}${window.location.pathname}#/login`)
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path={urls.LOGIN} component={ Loadable({ loader: () => import('app/login') }) } />
          <Route path='/' render={() => (
            <div className='app-root'>
              <Dashboard>
                <Switch>
                  <Route exact path='/home'    component={home}/>
                  <Route exact path='/project' component={project}/>
                  <Route exact path='/style'   component={style}/>
                  <Route exact path='/edu'     component={edu}/>
                  <Route exact path='/job'     component={job}/>
                  <Route exact path='/contract'component={contract}/>
                  <Route exact path='/config'  component={config}/>
                </Switch>
              </Dashboard>
            </div>
           )} />
        </Switch>
      </Router>
    )
  }
}

export default App;
