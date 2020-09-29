import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Landing from '@/views/Landing'
import Register from '@/views/Register'
import Login from '@/views/Login'
import Stories from '@/views/Stories'
import Story from '@/views/Story'
import StoryCreate from '@/views/Story/Create'
import StoryEdit from '@/views/Story/Edit'
import StoryAction from '@/views/Story/Action'
import User from '@/views/Users/Show'
import Admin from '@/views/Admin'
import AdminLogin from '@/views/Admin/Login'
import AdminUsers from '@/views/Admin/Users'
import AdminStories from '@/views/Admin/Stories'
import AdminCategories from '@/views/Admin/Categories'
import AdminRoles from '@/views/Admin/Roles'
import UserStories from '@/views/Users/Stories'
import UserBookmarks from '@/views/Bookmarks/'
import EditUser from '@/views/Users/Edit.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'landing',
    component: Landing,
    meta: {
      onlyGuestUser: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      onlyGuestUser: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      onlyGuestUser: true
    }
  },
  {
    path: '/stories',
    name: 'stories',
    component: Stories,
    meta: {
      onlyAuthUser: true
    }
  },
  {
    path: '/stories/:id',
    name: 'story',
    component: Story,
    props: true,
    meta: {
      onlyAuthUser: true
    }
  },
  {
    path: '/stories/categories/:categoryId',
    name: 'stories-categories',
    component: Stories,
    props: true,
    meta: {
      onlyAuthUser: true
    }
  },
  {
    path: '/stories/create/:id',
    name: 'story-create',
    component: StoryCreate,
    meta: {
      onlyPriviligedUser: true
    }
  },
  {
    path: '/stories/:id/edit',
    name: 'story-edit',
    component: StoryEdit,
    meta: {
      onlyAuthUser: true
    }
  },
  {
    path: '/stories/:id/action',
    name: 'story-action',
    component: StoryAction,
    meta: {
      onlyAuthUser: true
    }
  },
  {
    path: '/users/:displayName/:id/profile',
    name: 'show-user',
    component: User,
    meta: {
      onlyAuthUser: true
    }
  },
  {
    path: '/users/:displayName/:id/profile/followers',
    name: 'user-followers',
    component: User,
    meta: {
      onlyAuthUser: true
    }
  },
  {
    path: '/users/:displayName/:id/profile/following',
    name: 'user-following',
    component: User,
    meta: {
      onlyAuthUser: true
    }
  },
  {
    path: '/users/:displayName/:id/edit',
    name: 'edit-user',
    component: EditUser,
    meta: {
      onlyAuthUser: true,
      belongsToUser: true
    },
  }, {
    path: '/users/:displayName/:id/stories',
    name: 'user-stories',
    component: UserStories,
    meta: {
      onlyAuthUser: true,
      belongsToUser: true
    }
  },
  {
    path: '/users/:displayName/:id/bookmarks',
    name: 'user-bookmarks',
    component: UserBookmarks,
    meta: {
      onlyAuthUser: true,
      belongsToUser: true
    }
  },
  {
    path: '/admin/main',
    name: 'admin-main',
    component: Admin,
    meta: {
      onlyAdmin: true
    },
  },
  {
    path: '/admin/login',
    name: 'admin-login',
    component: AdminLogin
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: AdminUsers,
    meta: {
      onlyAdmin: true
    },
  },
  {
    path: '/admin/stories',
    name: 'admin-stories',
    component: AdminStories,
    meta: {
      onlyAdmin: true
    },
  },
  {
    path: '/admin/categories',
    name: 'admin-categories',
    component: AdminCategories,
    meta: {
      onlyAdmin: true
    },
  },
  {
    path: '/admin/roles',
    name: 'admin-roles',
    component: AdminRoles,
    meta: {
      onlyAdmin: true
    },
  },
  {
    path: '/admin',
    redirect: '/admin/login'
  },
  {
    path: '/admin/main',
    redirect: '/admin/login'
  },
  {
    path: '/admin/categories',
    redirect: '/admin/login'
  },
  {
    path: '/admin/roles',
    redirect: '/admin/login'
  },
  {
    path: '/admin',
    redirect: '/admin/stories'
  },
  {
    path: '*',
    redirect: `${store.state.isUserLoggedIn ? '/stories' : '/'}`
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  const isUserLoggedIn = store.state.isUserLoggedIn
  const userAuthorities = store.state.authorities
  let isAdmin = false;
  let isModerator = false;
  let isWriter = false;

  if (userAuthorities) {
    for (let i = 0; i < userAuthorities.length; i++) {
      if (userAuthorities[i] === 'ROLE_WRITER') {
        isWriter = true
      } else if (userAuthorities[i] === 'ROLE_MODERATOR') {
        isModerator = true
      } else if (userAuthorities[i] === 'ROLE_ADMIN') {
        isAdmin = true
      }
    }
  }

  if (to.meta.onlyAuthUser) {
    if (isUserLoggedIn) {
      next()
    } else {
      next({
        name: 'login'
      })
    }
  } else if (to.meta.onlyGuestUser) {
    if (isUserLoggedIn) {
      next({
        name: 'stories'
      })
    } else {
      next()
    }
  } else if (to.meta.onlyAdmin) {
    if (isUserLoggedIn) {
      if (isAdmin) {
        next()
      } else {
        next({
          name: 'stories'
        })
      }
    } else {
      next({
        name: 'stories'
      })
    }
  } else if (to.meta.onlyPrivilegedUser) {
    if (isUserLoggedIn) {
      if (isWriter || isModerator || isAdmin) {
        next()
      } else {
        next({
          name: 'stories'
        })
      }
    } else if (to.meta.belongsToUser) {
      if (isUserLoggedIn) {
        if (this.$route.params.id === this.$store.state.user.id) {
          next()
        } else {
          next({
            name: 'stories'
          })
        }
      } else {
        next({
          name: 'stories'
        })
      }
    } else {
      next({
        name: 'stories'
      })
    }
  } else {
    next()
  }

})

export default router