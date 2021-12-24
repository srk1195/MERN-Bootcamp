import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';
import Home from './core/Home';
import Signup from './user/Signup';
import SignIn from './user/Signin';
import NotFound from './NotFound';
import UserDashBoard from './user/UserDashBoard';
import AdminDashBoard from './user/AdminDashBoard';
import PrivateRoutes from './auth/helper/PrivateRoutes';
import AdminRoutes from './auth/helper/AdminRoutes';
import Profile from './user/Profile';
import AddCategory from './admin/AddCategory';
import ManageCategories from './admin/ManageCategories';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import ManageProductsReducer from './admin/ManageProductsReducer';
import UpdateProduct from './admin/UpdateProduct';
import UpdateCategory from './admin/UpdateCategory';
import Cart from './core/Cart';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/cart" component={Cart} />

                {/* <Route exact path="/user/dashboard" component={userDashBoard}></Route> */}
                {/* <Route
                  exact
                  path="/user/dashboard"
                  render={(props) => <UserDashBoard {...props} />}
                ></Route> */}

                <PrivateRoutes exact path="/user/dashboard" component={UserDashBoard} />
                <AdminRoutes exact path="/admin/dashboard" component={AdminDashBoard} />
                <AdminRoutes exact path="/admin/create/category" component={AddCategory} />
                <AdminRoutes exact path="/admin/categories" component={ManageCategories} />

                <AdminRoutes exact path="/admin/products" component={ManageProducts} />
                <AdminRoutes exact path="/admin/products/reducer" component={ManageProductsReducer} />

                <AdminRoutes exact path="/admin/create/product" component={AddProduct} />
                <AdminRoutes exact path="/admin/product/update/:productId" component={UpdateProduct} />
                <AdminRoutes exact path="/admin/category/update/:categoryId" component={UpdateCategory} />
                <Route exact path="/profile" component={Profile} />
                <Route component={NotFound} />
            </Switch>
            <ToastContainer transition={Zoom} autoClose={2000} position="top-right" />
        </BrowserRouter>
    );
}

export default Routes;
