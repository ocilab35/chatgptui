      const defaultThemeMode = 'light';
      let themeMode = localStorage.getItem('theme') || defaultThemeMode;

      if (themeMode === 'system') {
          themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }

      document.documentElement.classList.add(themeMode);
