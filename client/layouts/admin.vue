<template>
    <LoadingSpinner :isActive="state.isPageLoading">
        <TransitionRoot as="template" :show="sidebarOpen">
            <Dialog as="div" class="relative z-50 lg:hidden" @close="sidebarOpen = false">
                <TransitionChild as="template" enter="transition-opacity ease-linear duration-300"
                    enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300"
                    leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-primary/80" />
                </TransitionChild>

                <div class="fixed inset-0 flex">
                    <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                        enter-from="-translate-x-full" enter-to="translate-x-0"
                        leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                        leave-to="-translate-x-full">
                        <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
                            <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                                enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100"
                                leave-to="opacity-0">
                                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                                    <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                                        <span class="sr-only">Close sidebar</span>
                                        <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                                    </button>
                                </div>
                            </TransitionChild>
                            <div
                                class="flex grow flex-col gap-y-5 overflow-y-auto bg-slate-800 px-6 pb-4 ring-1 ring-white/10">
                                <div class="flex h-16 shrink-0 items-center">
                                    <span class="text-white font-medium" @click="navigateTo('/admin/dashboard')">
                                        Student Ledger
                                    </span>
                                </div>
                                <nav class="flex flex-1 flex-col">
                                    <ul role="list" class="flex flex-1 flex-col gap-y-7">
                                        <li>
                                            <ul role="list" class="-mx-2 space-y-1">
                                                <li v-for="item in navigation" :key="item.name">
                                                    <div v-if="!item.children" @click="navigateTo(item.href)"
                                                        :class="[item.activeRouteNames.includes($route.name) ? 'text-sky-500 dark:text-white' : 'text-gray-400 hover:text-white hover:bg-sky-500/10', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                                                        <component :is="item.icon" class="h-5 w-5 shrink-0"
                                                            :class="[item.activeRouteNames.includes($route.name) ? 'text-sky-500' : 'text-gray-400']"
                                                            aria-hidden="true" />
                                                        {{ item.name }}
                                                    </div>
                                                    <Disclosure as="div" v-else v-slot="{ open }">
                                                        <DisclosureButton
                                                            :class="[item.activeRouteNames.includes($route.name) ? 'text-sky-500 dark:text-white' : 'text-gray-400 hover:text-white hover:bg-sky-500/10', 'group flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-400']">
                                                            <component :is="item.icon" class="h-5 w-5 shrink-0"
                                                                :class="[item.activeRouteNames.includes($route.name) ? 'text-sky-500' : 'text-gray-400']"
                                                                aria-hidden="true" />
                                                            {{ item.name }}
                                                            <ChevronRightIcon
                                                                :class="[open ? 'rotate-90 text-white' : 'text-gray-400 hover:text-white', 'ml-auto h-5 w-5 shrink-0']"
                                                                aria-hidden="true" />
                                                        </DisclosureButton>
                                                        <DisclosurePanel as="ul" class="mt-1 px-2">
                                                            <div v-for="subItem in item.children" :key="subItem.name">
                                                                <DisclosureButton as="div"
                                                                    @click="navigateTo(subItem.href)"
                                                                    :class="[subItem.current ? 'text-sky-500 dark:text-white' : 'text-gray-400 hover:text-white hover:bg-sky-500/10', 'py-2 pr-2 pl-9 flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                                                                    {{ subItem.name }}
                                                                </DisclosureButton>
                                                            </div>
                                                        </DisclosurePanel>
                                                    </Disclosure>
                                                </li>
                                            </ul>
                                        </li>
                                        <li class="mt-auto">
                                            <div @click="logout()"
                                                class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-sky-500/10 hover:text-white">
                                                <ArrowLeftEndOnRectangleIcon class="h-6 w-6 shrink-0"
                                                    aria-hidden="true" />
                                                Logout
                                            </div>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </TransitionRoot>

        <!-- Static sidebar for desktop -->
        <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            <div
                class="flex grow flex-col gap-y-5 overflow-y-auto bg-white border border-gray-200 dark:border-none dark:bg-slate-800 px-6 pb-4">
                <div class="flex h-16 shrink-0 items-center">
                    <span class="text-sky-500 font-medium cursor-pointer" @click="navigateTo('/admin/dashboard')">
                        Student Ledger
                    </span>
                </div>
                <nav class="flex flex-1 flex-col">
                    <ul role="list" class="flex flex-1 flex-col gap-y-7">
                        <li>
                            <ul role="list" class="-mx-2 space-y-1">
                                <li v-for="item in navigation" :key="item.name">
                                    <div v-if="!item.children" @click="navigateTo(item.href)"
                                        :class="[item.activeRouteNames.includes($route.name) ? 'text-sky-500' : 'text-gray-400 hover:text-sky-500', 'group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold cursor-pointer']">
                                        <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                                        {{ item.name }}
                                    </div>
                                    <Disclosure as="div" v-else v-slot="{ open }">
                                        <DisclosureButton
                                            :class="[item.activeRouteNames.includes($route.name) ? 'text-sky-500 dark:text-white' : 'text-gray-400 hover:text-white hover:bg-sky-500/10', 'group flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-400']">
                                            <component :is="item.icon" class="h-5 w-5 shrink-0 text-gray-400"
                                                aria-hidden="true" />
                                            {{ item.name }}
                                            <ChevronRightIcon
                                                :class="[open ? 'rotate-90 text-white' : 'text-gray-400 hover:text-white', 'ml-auto h-5 w-5 shrink-0']"
                                                aria-hidden="true" />
                                        </DisclosureButton>
                                        <DisclosurePanel as="ul" class="mt-1 px-2">
                                            <div v-for="subItem in item.children" :key="subItem.name">
                                                <DisclosureButton as="div" @click="navigateTo(subItem.href)"
                                                    :class="[subItem.current ? 'text-sky-500 dark:text-white' : 'text-gray-400 hover:text-white hover:bg-sky-500/10', 'py-2 pr-2 pl-9 flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                                                    {{ subItem.name }}
                                                </DisclosureButton>
                                            </div>
                                        </DisclosurePanel>
                                    </Disclosure>
                                </li>
                            </ul>
                        </li>
                        <li class="mt-auto">
                            <div @click="logout()"
                                class="cursor-pointer group -mx-2 flex gap-x-3 rounded-md px-3 py-3 text-sm font-semibold leading-6 text-gray-400 hover:text-sky-500">
                                <ArrowLeftEndOnRectangleIcon class="h-6 w-6 shrink-0" aria-hidden="true" />
                                Logout
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

        <div class="lg:pl-72">
            <div
                class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 dark:border-none bg-white dark:bg-primary px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden dark:text-white"
                    @click="sidebarOpen = true">
                    <span class="sr-only">Open sidebar</span>
                    <Bars3Icon class="h-6 w-6" aria-hidden="true" />
                </button>

                <!-- Separator -->
                <div class="h-6 w-px bg-primary/10 lg:hidden" aria-hidden="true" />

                <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                    <div class="flex-1"></div>
                    <div class="flex items-center gap-x-4 lg:gap-x-6">
                        <!-- <button type="button" class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                            <BellIcon class="h-6 w-6" aria-hidden="true" />
                        </button> -->
                        <button
                            class="bg-white w-9 h-9 relative rounded-full outline-2 outline-gray-400 hover:outline-dashed"
                            v-if="darkModeStore.getDarkMode" @click="darkModeStore.toggleDarkMode()">
                            <MoonIcon class="w-4 h-4 cursor-pointer text-yellow-400 absolute top-2.5 left-2.5" />
                        </button>
                        <button class="bg-white w-9 h-9 relative rounded-full outline-2 outline-gray-400 outline-dashed"
                            v-else @click="darkModeStore.toggleDarkMode()">
                            <SunIcon class="w-6 cursor-pointer text-yellow-400 absolute top-1.5 left-1.5" />
                        </button>

                        <!-- Separator -->
                        <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10 dark:bg-white"
                            aria-hidden="true" />
                        <Menu as="div" class="relative">
                            <MenuButton class="-m-1.5 flex items-center p-1.5">
                                <span class="sr-only">Open user menu</span>
                                <img class="h-8 w-8 rounded-full bg-gray-50" src="/public/logout.png" alt="User" />
                                <span class="hidden lg:flex lg:items-center">
                                    <span class="ml-4 text-sm font-semibold leading-6 text-gray-900 dark:text-white"
                                        aria-hidden="true">
                                        {{ userStore.getUser?.name }}
                                    </span>
                                    <ChevronDownIcon class="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                            </MenuButton>
                            <transition enter-active-class="transition ease-out duration-100"
                                enter-from-class="transform opacity-0 scale-95"
                                enter-to-class="transform opacity-100 scale-100"
                                leave-active-class="transition ease-in duration-75"
                                leave-from-class="transform opacity-100 scale-100"
                                leave-to-class="transform opacity-0 scale-95">
                                <MenuItems
                                    class="absolute right-0 z-10 mt-2.5 w-44 origin-top-right rounded-sm bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                    <MenuItem>
                                    <div @click="logout()"
                                        class="cursor-pointer bg-gray-50 block px-3 py-2 text-sm leading-6 text-gray-900 hover:bg-gray-200">
                                        Logout
                                    </div>
                                    </MenuItem>
                                </MenuItems>
                            </transition>
                        </Menu>
                    </div>
                </div>
            </div>

            <main class="min-h-screen py-10 dark:bg-primary">
                <div class="px-4 sm:px-6 lg:px-8">
                    <div>
                        <h1 class="text-2xl text-gray-900 dark:text-white">
                            <slot name="header"></slot>
                        </h1>
                    </div>
                    <div class="mt-4">
                        <h3 class="text-lg text-gray-900 dark:text-white">
                            <slot name="sub-header"></slot>
                        </h3>
                    </div>

                    <div class="mt-4 text-gray-900 dark:text-white">
                        <button @click="navigateTo('/admin/students/addStudent')" class="w-28 bg-primary text-white rounded-sm text-sm px-4 py-3 dark:bg-sky-500 dark:hover:bg-sky-400">Add Student</button>
                    </div>


                    <div class="mt-7 mb-14">
                        <slot />
                    </div>
                </div>
            </main>
        </div>
    </LoadingSpinner>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'
import {
    MoonIcon,
    SunIcon,
} from '@heroicons/vue/24/solid'
import {
    ArrowLeftEndOnRectangleIcon,
    Bars3Icon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/vue/24/outline'
import { ChevronRightIcon } from '@heroicons/vue/20/solid'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { authService } from '@/components/api/AuthService'
import { useUserStore } from '@/store/user'
import { useDarkModeStore } from '@/store/darkMode'

const darkModeStore = useDarkModeStore()
const userStore = useUserStore()

const navigation = [
    {
        name: 'Students',
        href: '/admin/students',
        icon: UsersIcon,
        activeRouteNames: [
            'admin-students'
        ]
    },
]

const sidebarOpen = ref(false)

const state = reactive({
    error: null,
    isPageLoading: false,
})

async function logout() {
    state.isPageLoading = true
    try {
        const response = await authService.logout()
        if (response) {
            localStorage.removeItem("_token")
            navigateTo('/')
        }
    } catch (error: any) {
        state.error = error
    }
    state.isPageLoading = false
}
</script>