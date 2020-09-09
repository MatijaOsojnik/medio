import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Landing from '@/views/Landing'
import Register from '@/views/Register'
import Login from '@/views/Login'
import Articles from '@/views/Articles'
import Article from '@/views/Article'
import ArticleCreate from '@/views/Article/Create'
import ArticleEdit from '@/views/Article/Edit'
import ArticleAction from '@/views/Article/Action'
import User from '@/views/Users/Show'
import Admin from '@/views/Admin'
import AdminLogin from '@/views/Admin/Login'
import AdminUsers from '@/views/Admin/Users'
import AdminArticles from '@/views/Admin/Articles'
import AdminCategories from '@/views/Admin/Categories'
import AdminRoles from '@/views/Admin/Roles'
import UserArticles from '@/views/Users/Articles'
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
    path: '/articles',
    name: 'articles',
    component: Articles,
  },
  {
    path: '/articles/:id',
    name: 'article',
    component: Article,
    props: true
  },
  {
    path: '/articles/categories/:categoryId',
    name: 'articles-categories',
    component: Articles,
    props: true,
  },
  {
    path: '/articles/create/:id',
    name: 'article-create',
    component: ArticleCreate,
    meta: {
      onlyPrivilegedUser: true
    }
  },
  {
    path: '/articles/:id/edit',
    name: 'article-edit',
    component: ArticleEdit,
    meta: {
      onlyPrivilegedUser: true
    }
  },
  {
    path: '/articles/:id/action',
    name: 'article-action',
    component: ArticleAction,
    meta: {
      onlyAuthUser: true
    }
  },
  {
    path: '/users/:displayName/:id/profile',
    name: 'show-user',
    component: User,
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
    path: '/users/:displayName/:id/articles',
    name: 'user-articles',
    component: UserArticles,
    meta: {
      onlyPrivilegedUser: true,
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
    path: '/admin/articles',
    name: 'admin-articles',
    component: AdminArticles,
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
    path: '*',
    redirect: 'articles'
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
        name: 'articles'
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
          name: 'articles'
        })
      }
    } else {
      next({
        name: 'articles'
      })
    }
  } else if (to.meta.onlyPrivilegedUser) {
    if (isUserLoggedIn) {
      if (isWriter || isModerator || isAdmin) {
        next()
      } else {
        next({
          name: 'articles'
        })
      }
    } else if (to.meta.belongsToUser) {
      if (isUserLoggedIn) {
        if (this.$route.params.id === this.$store.state.user.id) {
          next()
        } else {
          next({
            name: 'articles'
          })
        }
      } else {
        next({
          name: 'articles'
        })
      }
    } else {
      next({
        name: 'articles'
      })
    }
  } else {
    next()
  }

})

export default router