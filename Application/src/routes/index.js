import React from 'react';
import { Scene, Tabs, Stack } from 'react-native-router-flux';
import { SimpleLineIcons } from '@expo/vector-icons';
import AppConfig from 'constants/config';
import DefaultProps from 'constants/navigation';


import RecipesContainer from 'containers/Recipes';
import RecipesComponent from 'components/Articles';
import RecipeViewComponent from 'components/Article';


import SignUpContainer from 'containers/Member/SignUp';
import SignUpComponent from 'components/Member/SignUp';

import LoginContainer from 'containers/Member/Login';
import LoginComponent from 'components/Member/Login';

import ForgotPasswordContainer from 'containers/Member/ForgotPassword';
import ForgotPasswordComponent from 'components/Member/ForgotPassword';

import UpdateProfileContainer from 'containers/Member/UpdateProfile';
import UpdateProfileComponent from 'components/Member/UpdateProfile';

import MemberContainer from 'containers/Member';
import ProfileComponent from 'components/Member';

import AboutComponent from 'components/About';

const Index = (
  <Stack>
    <Scene hideNavBar>
      <Tabs
        key="tabbar"
        swipeEnabled
        type="replace"
        showLabel={false}
        {...DefaultProps.tabProps}
      >
        <Stack
          key="profile"
          title="PROFILE"
          icon={() => <SimpleLineIcons name="user" size={26} {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="profileHome" component={MemberContainer} Layout={ProfileComponent} />
          <Scene
            back
            key="signUp"
            title="SIGN UP"
            {...DefaultProps.navbarProps}
            component={SignUpContainer}
            Layout={SignUpComponent}
          />
          <Scene
            back
            initial
            key="login"
            title="LOGIN"
            {...DefaultProps.navbarProps}
            component={LoginContainer}
            Layout={LoginComponent}
          />
          <Scene
            back
            key="forgotPassword"
            title="FORGOT PASSWORD"
            {...DefaultProps.navbarProps}
            component={ForgotPasswordContainer}
            Layout={ForgotPasswordComponent}
          />
          <Scene
            back
            key="updateProfile"
            title="UPDATE PROFILE"
            {...DefaultProps.navbarProps}
            component={UpdateProfileContainer}
            Layout={UpdateProfileComponent}
          />
        </Stack>
        <Stack
          key="home"
          title={AppConfig.appName.toUpperCase()}
          icon={() => <SimpleLineIcons name="speech" size={26} {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="home" component={AboutComponent} />
        </Stack>

        <Stack
          key="recipes"
          title="RECIPES"
          icon={() => <SimpleLineIcons name="book-open" size={26} {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="recipes" component={RecipesContainer} Layout={RecipesComponent} />
        </Stack>


      </Tabs>
    </Scene>

    <Scene
      back
      clone
      key="recipe"
      title="RECIPE"
      {...DefaultProps.navbarProps}
      component={RecipesContainer}
      Layout={RecipeViewComponent}
    />
  </Stack>
);

export default Index;
