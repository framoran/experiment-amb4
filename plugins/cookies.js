// plugins/cookies.js
import { defineNuxtPlugin } from '#app'
import UniversalCookies from 'universal-cookie'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('cookies', new UniversalCookies())
})