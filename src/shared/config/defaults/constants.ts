export const defaultPictures = {
  logo: "/logo/logo-1.svg",
  user: "/defaults/images/user.png",
  placeholder: "/defaults/images/placeholder.png",
  social: {
    png: {
      white: (logo: string) => `/social/png/white/${logo}.png`,
      color: (logo: string) => `/social/png/color/${logo}.png`,
      black: (logo: string) => `/social/png/black/${logo}.png`
    },
    svg: {
      white: (logo: string) => `/social/svg/white/${logo}.svg`,
      color: (logo: string) => `/social/svg/color/${logo}.svg`,
      black: (logo: string) => `/social/svg/black/${logo}.svg`
    }
  }
} as const
