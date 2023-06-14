import octicons from '@primer/octicons'
import { outputFile } from 'fs-extra'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const clearAndUpper = (text) => {
  return text.replace(/-/, '').toUpperCase()
}

const toPascalCase = (text) => {
  return text.replace(/(^\w|-\w)/g, clearAndUpper)
}

const __dirname = dirname(fileURLToPath(import.meta.url))

const main = async () => {
  for (const [iconName, iconProperty] of Object.entries(octicons)) {
    const sizes = Object.keys(iconProperty.heights)

    const component = `import { component$ } from '@builder.io/qwik'
import { PrimerOcticonsQwikProps } from '../..'
import { JSX } from '@builder.io/qwik/jsx-runtime'

export const ${toPascalCase(iconName)}Icon = component$<PrimerOcticonsQwikProps<${sizes.join(' | ')}>>(props => {
  const paths: Record<${sizes.join(' | ')}, JSX.Element> = {
    ${sizes.map(size => `${size}: <>${octicons[iconName].heights[size].path}</>`).join(',\n    ')}
  }

  const minSize = ${Math.min(...sizes.map(size => Number(size)))}

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      class={\`octicon octicon-${iconProperty.symbol} \` + (props.class ?? '')}
      id={props.id}
      fill={props.fill ?? 'currentColor'}
      height={props.size ?? minSize}
      width={props.size ?? minSize}
      aria-hidden={props['aria-label'] != null ? false : props['aria-hidden'] != null ? props['aria-hidden'] : true}
      aria-label={props['aria-label']}
      aria-labelledby={props['aria-labelledby']}
      tabIndex={props.tabIndex}
      viewBox={\`0 0 \${props.size ?? minSize} \${props.size ?? minSize}\`}>
      {props.title != null ? <title>{props.title}</title> : null}
      {paths[props.size ?? minSize]}
    </svg>
  )
})
`
    const destination = join(__dirname, '..', '..', 'primer-octicons-qwik', 'src', 'components', iconName, `${iconName}.tsx`)
    await outputFile(destination, component)
  }

  const exportString = Object.keys(octicons).map(iconName => {
    return `export { ${toPascalCase(iconName)}Icon } from './${iconName}/${iconName}'`
  }).join('\n')

  const exportStringDestination = join(__dirname, '..', '..', 'primer-octicons-qwik', 'src', 'components', 'index.ts')
  await outputFile(exportStringDestination, exportString)
}

await main()
