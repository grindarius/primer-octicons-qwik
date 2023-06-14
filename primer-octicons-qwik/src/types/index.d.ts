declare module '@primer/octicons' {
  interface IconProperty {
    width: number
    path: string
    options: {
      version: string
      width: string
      height: string
      viewBox: string
      class: string
      'aria-hidden'?: string
    }
  }

  interface Icon {
    symbol: string
    keywords: Array<string>
    toSVG: () => string
    heights: Record<string, IconProperty>
  }

  const octicons: {
    [key: string]: Icon
  }

  export = octicons
}
