// Advanced Modern Header Component - Direct HTML Injection
document.addEventListener('DOMContentLoaded', function() {
  const headerContainer = document.getElementById('header-container');
  if (!headerContainer) return;

  headerContainer.innerHTML = `
    <header class="sticky top-0 z-40 flex w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div class="flex flex-grow items-center justify-between px-4 py-3 shadow-2 md:px-6 2xl:px-11">
        <div class="flex items-center gap-2 sm:gap-4">
          <!-- Sidebar Toggle Button -->
          <button id="sidebar-toggle-btn" onclick="window.handleSidebarToggle()" class="z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 lg:h-11 lg:w-11 lg:border">
            <!-- Desktop hamburger icon -->
            <svg class="hidden fill-current lg:block" width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75L1.33325 1.75C0.919038 1.75 0.583252 1.41422 0.583252 1ZM0.583252 11C0.583252 10.5858 0.919038 10.25 1.33325 10.25L14.6666 10.25C15.0808 10.25 15.4166 10.5858 15.4166 11C15.4166 11.4142 15.0808 11.75 14.6666 11.75L1.33325 11.75C0.919038 11.75 0.583252 11.4142 0.583252 11ZM1.33325 5.25C0.919038 5.25 0.583252 5.58579 0.583252 6C0.583252 6.41421 0.919038 6.75 1.33325 6.75L7.99992 6.75C8.41413 6.75 8.74992 6.41421 8.74992 6C8.74992 5.58579 8.41413 5.25 7.99992 5.25L1.33325 5.25Z" fill=""/>
            </svg>
            <!-- Mobile hamburger icon -->
            <svg id="mobile-menu-open-icon" class="fill-current lg:hidden" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M3.25 6C3.25 5.58579 3.58579 5.25 4 5.25L20 5.25C20.4142 5.25 20.75 5.58579 20.75 6C20.75 6.41421 20.4142 6.75 20 6.75L4 6.75C3.58579 6.75 3.25 6.41422 3.25 6ZM3.25 18C3.25 17.5858 3.58579 17.25 4 17.25L20 17.25C20.4142 17.25 20.75 17.5858 20.75 18C20.75 18.4142 20.4142 18.75 20 18.75L4 18.75C3.58579 18.75 3.25 18.4142 3.25 18ZM4 11.25C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75L12 12.75C12.4142 12.75 12.75 12.4142 12.75 12C12.75 11.5858 12.4142 11.25 12 11.25L4 11.25Z" fill=""/>
            </svg>
            <!-- Mobile close icon -->
            <svg id="mobile-menu-close-icon" class="hidden fill-current lg:hidden" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z" fill=""/>
            </svg>
          </button>
          
          <!-- Mobile Logo (hidden on desktop - sidebar shows brand) -->
          <a href="01-main-dashboard.html" class="flex items-center gap-2 lg:hidden">
            <div class="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 000 2h14a1 1 0 000-2H3zm0 4a1 1 0 000 2h10a1 1 0 000-2H3zm0 4a1 1 0 000 2h6a1 1 0 000-2H3z"/>
              </svg>
            </div>
            <span class="text-base font-bold text-gray-900 dark:text-white tracking-tight">mtverse</span>
          </a>
        </div>

        <!-- Search Bar (Desktop) -->
        <div class="hidden lg:block">
          <form>
            <div class="relative">
              <span class="absolute top-1/2 left-4 -translate-y-1/2">
                <svg class="fill-gray-500 dark:fill-gray-400" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z" fill=""/>
                </svg>
              </span>
              <input type="text" placeholder="Search or type command..." class="h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pr-14 pl-12 text-sm text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 focus:outline-hidden dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 xl:w-[430px]" />
              <button class="absolute top-1/2 right-2.5 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-[7px] py-[4.5px] text-xs text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400">
                <span>⌘</span>
                <span>K</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Right Side Actions -->
        <div class="flex items-center justify-end gap-2 sm:gap-4">
          <!-- Dark Mode Toggle -->
          <button onclick="window.toggleDarkMode()" class="relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white">
            <svg class="hidden dark:block" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M9.99998 1.5415C10.4142 1.5415 10.75 1.87729 10.75 2.2915V3.5415C10.75 3.95572 10.4142 4.2915 9.99998 4.2915C9.58577 4.2915 9.24998 3.95572 9.24998 3.5415V2.2915C9.24998 1.87729 9.58577 1.5415 9.99998 1.5415ZM10.0009 6.79327C8.22978 6.79327 6.79402 8.22904 6.79402 10.0001C6.79402 11.7712 8.22978 13.207 10.0009 13.207C11.772 13.207 13.2078 11.7712 13.2078 10.0001C13.2078 8.22904 11.772 6.79327 10.0009 6.79327ZM5.29402 10.0001C5.29402 7.40061 7.40135 5.29327 10.0009 5.29327C12.6004 5.29327 14.7078 7.40061 14.7078 10.0001C14.7078 12.5997 12.6004 14.707 10.0009 14.707C7.40135 14.707 5.29402 12.5997 5.29402 10.0001ZM15.9813 5.08035C16.2742 4.78746 16.2742 4.31258 15.9813 4.01969C15.6884 3.7268 15.2135 3.7268 14.9207 4.01969L14.0368 4.90357C13.7439 5.19647 13.7439 5.67134 14.0368 5.96423C14.3297 6.25713 14.8045 6.25713 15.0974 5.96423L15.9813 5.08035ZM18.4577 10.0001C18.4577 10.4143 18.1219 10.7501 17.7077 10.7501H16.4577C16.0435 10.7501 15.7077 10.4143 15.7077 10.0001C15.7077 9.58592 16.0435 9.25013 16.4577 9.25013H17.7077C18.1219 9.25013 18.4577 9.58592 18.4577 10.0001ZM14.9207 15.9806C15.2135 16.2735 15.6884 16.2735 15.9813 15.9806C16.2742 15.6877 16.2742 15.2128 15.9813 14.9199L15.0974 14.036C14.8045 13.7431 14.3297 13.7431 14.0368 14.036C13.7439 14.3289 13.7439 14.8038 14.0368 15.0967L14.9207 15.9806ZM9.99998 15.7088C10.4142 15.7088 10.75 16.0445 10.75 16.4588V17.7088C10.75 18.123 10.4142 18.4588 9.99998 18.4588C9.58577 18.4588 9.24998 18.123 9.24998 17.7088V16.4588C9.24998 16.0445 9.58577 15.7088 9.99998 15.7088ZM5.96356 15.0972C6.25646 14.8043 6.25646 14.3295 5.96356 14.0366C5.67067 13.7437 5.1958 13.7437 4.9029 14.0366L4.01902 14.9204C3.72613 15.2133 3.72613 15.6882 4.01902 15.9811C4.31191 16.274 4.78679 16.274 5.07968 15.9811L5.96356 15.0972ZM4.29224 10.0001C4.29224 10.4143 3.95645 10.7501 3.54224 10.7501H2.29224C1.87802 10.7501 1.54224 10.4143 1.54224 10.0001C1.54224 9.58592 1.87802 9.25013 2.29224 9.25013H3.54224C3.95645 9.25013 4.29224 9.58592 4.29224 10.0001Z" fill="currentColor"/>
            </svg>
            <svg class="dark:hidden" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.4547 11.97L18.1799 12.1611C18.265 11.8383 18.1265 11.4982 17.8401 11.3266C17.5538 11.1551 17.1885 11.1934 16.944 11.4207L17.4547 11.97ZM8.0306 2.5459L8.57989 3.05657C8.80718 2.81209 8.84554 2.44682 8.67398 2.16046C8.50243 1.8741 8.16227 1.73559 7.83948 1.82066L8.0306 2.5459ZM12.9154 13.0035C9.64678 13.0035 6.99707 10.3538 6.99707 7.08524H5.49707C5.49707 11.1823 8.81835 14.5035 12.9154 14.5035V13.0035ZM16.944 11.4207C15.8869 12.4035 14.4721 13.0035 12.9154 13.0035V14.5035C14.8657 14.5035 16.6418 13.7499 17.9654 12.5193L16.944 11.4207ZM16.7295 11.7789C15.9437 14.7607 13.2277 16.9586 10.0003 16.9586V18.4586C13.9257 18.4586 17.2249 15.7853 18.1799 12.1611L16.7295 11.7789ZM10.0003 16.9586C6.15734 16.9586 3.04199 13.8433 3.04199 10.0003H1.54199C1.54199 14.6717 5.32892 18.4586 10.0003 18.4586V16.9586ZM3.04199 10.0003C3.04199 6.77289 5.23988 4.05695 8.22173 3.27114L7.83948 1.82066C4.21532 2.77574 1.54199 6.07486 1.54199 10.0003H3.04199ZM6.99707 7.08524C6.99707 5.52854 7.5971 4.11366 8.57989 3.05657L7.48132 2.03522C6.25073 3.35885 5.49707 5.13487 5.49707 7.08524H6.99707Z" fill="currentColor"/>
            </svg>
          </button>

          <!-- Notification Button with Dropdown -->
          <div class="relative">
            <button onclick="window.toggleDropdown('notification-dropdown')" class="relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white">
              <span class="absolute top-0.5 right-0.5 z-1 h-2 w-2 rounded-full bg-orange-400">
                <span class="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
              </span>
              <svg class="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.75 2.29248C10.75 1.87827 10.4143 1.54248 10 1.54248C9.58583 1.54248 9.25004 1.87827 9.25004 2.29248V2.83613C6.08266 3.20733 3.62504 5.9004 3.62504 9.16748V14.4591H3.33337C2.91916 14.4591 2.58337 14.7949 2.58337 15.2091C2.58337 15.6234 2.91916 15.9591 3.33337 15.9591H4.37504H15.625H16.6667C17.0809 15.9591 17.4167 15.6234 17.4167 15.2091C17.4167 14.7949 17.0809 14.4591 16.6667 14.4591H16.375V9.16748C16.375 5.9004 13.9174 3.20733 10.75 2.83613V2.29248ZM14.875 14.4591V9.16748C14.875 6.47509 12.6924 4.29248 10 4.29248C7.30765 4.29248 5.12504 6.47509 5.12504 9.16748V14.4591H14.875ZM8.00004 17.7085C8.00004 18.1228 8.33583 18.4585 8.75004 18.4585H11.25C11.6643 18.4585 12 18.1228 12 17.7085C12 17.2943 11.6643 16.9585 11.25 16.9585H8.75004C8.33583 16.9585 8.00004 17.2943 8.00004 17.7085Z" fill=""/>
              </svg>
            </button>
            <div id="notification-dropdown" class="hidden absolute right-0 top-full z-50 mt-2 w-[380px] rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900 animate-slideDown">
              <div class="border-b border-gray-200 p-4 dark:border-gray-800">
                <div class="flex items-center justify-between">
                  <h4 class="text-sm font-semibold text-gray-900 dark:text-white">Notifications</h4>
                  <button onclick="window.markAllAsRead()" class="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">Mark all as read</button>
                </div>
              </div>
              <div class="max-h-[400px] overflow-y-auto">
                <!-- Unread Notifications -->
                <div class="bg-blue-50/50 dark:bg-blue-900/10">
                  <div class="flex gap-3 p-4 hover:bg-blue-100/50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer border-l-4 border-blue-500">
                    <div class="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 dark:text-white">Payment successful</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Your payment of $49.00 for Pro Plan was successfully processed</p>
                      <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">2 minutes ago</p>
                    </div>
                    <button class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div class="bg-blue-50/50 dark:bg-blue-900/10">
                  <div class="flex gap-3 p-4 hover:bg-blue-100/50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer border-l-4 border-blue-500">
                    <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 dark:text-white">New user registered</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">John Doe just signed up for the Starter Plan</p>
                      <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">15 minutes ago</p>
                    </div>
                    <button class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <div class="bg-blue-50/50 dark:bg-blue-900/10">
                  <div class="flex gap-3 p-4 hover:bg-blue-100/50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer border-l-4 border-blue-500">
                    <div class="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                      </svg>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 dark:text-white">AI usage alert</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">You've used 85% of your monthly AI token quota</p>
                      <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">1 hour ago</p>
                    </div>
                    <button class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Read Notifications -->
                <div class="border-t border-gray-200 dark:border-gray-800">
                  <div class="flex gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer opacity-75">
                    <div class="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                      </svg>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-600 dark:text-gray-300">System maintenance scheduled</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Scheduled maintenance on May 28, 2026 at 2:00 AM UTC</p>
                      <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">Yesterday</p>
                    </div>
                  </div>
                </div>

                <div class="border-t border-gray-200 dark:border-gray-800">
                  <div class="flex gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer opacity-75">
                    <div class="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                      </svg>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-600 dark:text-gray-300">New comment on your post</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Sarah replied to your discussion about AI models</p>
                      <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">2 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="border-t border-gray-200 p-3 dark:border-gray-800">
                <button class="w-full rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors">View all notifications</button>
              </div>
            </div>
          </div>

          <!-- User Profile with Dropdown -->
          <div class="relative">
            <button onclick="window.toggleDropdown('profile-dropdown')" class="flex items-center gap-3 text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg px-2 py-1 transition-colors">
              <span class="app-avatar app-avatar-header">
                <img src="assets/avatars/admin-profile-man.png" alt="Musharof" />
                <span class="app-online-dot" aria-hidden="true"></span>
              </span>
              <div class="hidden md:block text-left">
                <p class="text-sm font-medium text-gray-900 dark:text-white">Musharof</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">Team Manager</p>
              </div>
              <svg class="hidden md:block w-4 h-4 transition-transform duration-200" id="profile-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <div id="profile-dropdown" class="hidden absolute right-0 top-full z-50 mt-2 w-[280px] rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900 animate-slideDown">
              <!-- User Info Header -->
              <div class="border-b border-gray-200 p-4 dark:border-gray-800">
                <div class="flex items-center gap-3">
                  <div class="app-avatar app-avatar-dropdown">
                    <img src="assets/avatars/admin-profile-man.png" alt="Musharof" />
                    <span class="app-online-dot" aria-hidden="true"></span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-semibold text-gray-900 dark:text-white">Musharof</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400 truncate">musharof@example.com</p>
                    <div class="flex items-center gap-1 mt-1">
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                        <span class="w-1.5 h-1.5 rounded-full bg-blue-600 mr-1"></span>
                        Pro Plan
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Menu Items -->
              <div class="p-2">
                <p class="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Account</p>
                <a href="44-user-profile.html" class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors group">
                  <svg class="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                  <span>My Profile</span>
                </a>
                <a href="102-settings.html" class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors group">
                  <svg class="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <span>Settings</span>
                </a>
                <a href="51-settings-billing.html" class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors group">
                  <svg class="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                  </svg>
                  <span>Billing & Plans</span>
                </a>
                
                <p class="px-3 py-2 mt-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Workspace</p>
                <a href="101-users.html" class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors group">
                  <svg class="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                  </svg>
                  <span>Team Members</span>
                  <span class="ml-auto text-xs text-gray-400">5</span>
                </a>
                <a href="#" class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors group">
                  <svg class="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <span>Activity Log</span>
                </a>
              </div>
              
              <!-- Sign Out -->
              <div class="border-t border-gray-200 p-2 dark:border-gray-800">
                <a href="81-auth-login.html" class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors group">
                  <svg class="w-4 h-4 text-red-500 group-hover:text-red-600 dark:group-hover:text-red-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                  </svg>
                  <span>Sign Out</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  `;

  // Check for saved dark mode preference
  if (localStorage.getItem('darkMode') === 'true') {
    document.documentElement.classList.add('dark');
  }
});

// Global functions
window.toggleDarkMode = function() {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
};

window.toggleDropdown = function(id) {
  const dropdown = document.getElementById(id);
  const allDropdowns = document.querySelectorAll('[id$="-dropdown"]');
  
  // Close all other dropdowns
  allDropdowns.forEach(dd => {
    if (dd.id !== id) {
      dd.classList.add('hidden');
    }
  });
  
  // Toggle current dropdown
  dropdown.classList.toggle('hidden');
  
  // Rotate arrow if it's the profile dropdown
  if (id === 'profile-dropdown') {
    const arrow = document.getElementById('profile-arrow');
    if (arrow) {
      arrow.classList.toggle('rotate-180');
    }
  }
};

window.markAllAsRead = function() {
  const unreadNotifications = document.querySelectorAll('.bg-blue-50\\/50, .dark\\:bg-blue-900\\/10');
  unreadNotifications.forEach(notification => {
    notification.classList.remove('bg-blue-50/50', 'dark:bg-blue-900/10');
    notification.classList.add('opacity-75');
    const border = notification.querySelector('.border-l-4');
    if (border) {
      border.classList.remove('border-blue-500');
      border.classList.add('border-transparent');
    }
  });
  
  // Remove notification badge
  const badge = document.querySelector('.animate-ping');
  if (badge) {
    badge.remove();
  }
  const dot = document.querySelector('.h-2.w-2.rounded-full.bg-orange-400');
  if (dot) {
    dot.remove();
  }
};

// Close dropdowns when clicking outside
document.addEventListener('click', function(event) {
  const dropdowns = document.querySelectorAll('[id$="-dropdown"]');
  const buttons = document.querySelectorAll('[onclick*="toggleDropdown"]');
  
  let isClickInside = false;
  buttons.forEach(button => {
    if (button.contains(event.target)) {
      isClickInside = true;
    }
  });
  
  dropdowns.forEach(dropdown => {
    if (!dropdown.contains(event.target) && !isClickInside) {
      dropdown.classList.add('hidden');
    }
  });
});
