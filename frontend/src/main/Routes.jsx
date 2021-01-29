import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import UserCrud from '../components/user/UserCrud'
import SupplierCrud from '../components/supplier/SupplierCrud'

export default props => 
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/users' component={UserCrud} />
        <Route path='/suppliers' component={SupplierCrud} />
        <Redirect from='*' to='/' />
    </Switch>