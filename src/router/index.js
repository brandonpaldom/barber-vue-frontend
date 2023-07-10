import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppointmentsLayout from '../views/appointments/AppointmentsLayout.vue'
import authApi from '../services/authApi'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'my-appointments' },
    },
    {
      path: '/admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: {
        requiresAdmin: true,
      },
      children: [
        {
          // Upcoming appointments
          path: '',
          name: 'admin',
          component: () =>
            import('../views/admin/UpcomingAppointmentsView.vue'),
        },
      ],
    },
    {
      path: '/appointments',
      name: 'appointments',
      component: AppointmentsLayout,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: '',
          name: 'my-appointments',
          component: () =>
            import('../views/appointments/MyAppointmentsView.vue'),
        },
        {
          path: 'new',
          component: () =>
            import('../views/appointments/NewAppointmentLayout.vue'),
          children: [
            {
              path: '',
              name: 'new-appointment',
              component: () => import('../views/appointments/ServicesView.vue'),
            },
            {
              path: 'details',
              name: 'appointment-details',
              component: () => import('../views/appointments/DetailsView.vue'),
            },
          ],
        },
        {
          path: 'edit/:id',
          component: () =>
            import('../views/appointments/EditAppointmentLayout.vue'),
          children: [
            {
              path: '',
              name: 'edit-appointment',
              component: () => import('../views/appointments/ServicesView.vue'),
            },
            {
              path: 'details',
              name: 'edit-appointment-details',
              component: () => import('../views/appointments/DetailsView.vue'),
            },
          ],
        },
      ],
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/auth/AuthLayout.vue'),
      children: [
        {
          path: 'register',
          name: 'register',
          component: () => import('../views/auth/RegisterView.vue'),
        },
        {
          path: 'verify/:token',
          name: 'verify',
          component: () => import('../views/auth/VerifyView.vue'),
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/auth/LoginView.vue'),
        },
        {
          path: 'forgot-password',
          name: 'forgot-password',
          component: () => import('../views/auth/ForgotPasswordView.vue'),
        },
        {
          path: 'reset-password/:token',
          name: 'reset-password',
          component: () => import('../views/auth/ResetPasswordView.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth) {
    try {
      const { data } = await authApi.auth()
      if (data.admin) {
        return next({ name: 'admin' })
      } else {
        return next()
      }
    } catch (error) {
      return next({ name: 'login' })
    }
  } else {
    next()
  }
})

router.beforeEach(async (to, from, next) => {
  const requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin)

  if (requiresAdmin) {
    try {
      const { data } = await authApi.admin()
      if (data.admin) {
        return next()
      } else {
        return next({ name: 'my-appointments' })
      }
    } catch (error) {
      return next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router
