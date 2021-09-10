import type { PrismTheme } from 'prism-react-renderer';
import type { ComponentType } from 'react';
import type { ComponentDoc as DocgenComponentDoc } from 'react-docgen-typescript';
import type { Configuration } from 'webpack';

export { flattenArray, NestedArray } from './flatten-array';
export { parseQueryString, stringifyQueryString } from './query-string';
export { Ssr } from './ssr-types';
export { ImportMapData, Packages, transpileImports } from './transpile-imports';
export { isDefined, isNil, isNumber } from './type-guard';

export interface RequestCompileData {
  source: string;
  messageId: number;
}

export interface CompilationError {
  type: 'compilationError';
  line: number;
}

export interface CompilationSuccessResult {
  type: 'success';
  code: string;
  messageId: number;
}

export type CompileResult =
  | CompilationSuccessResult
  | {
      type: 'error';
      error: string;
      messageId: number;
      meta?: CompilationError;
    };

export type CodeBlocks = Record<string, CompilationSuccessResult | undefined>;

export interface ComponentDocItem {
  component: DocgenComponentDoc & { slug: string };
  doc: null | ComponentType<any>;
}

export type Environment = 'development' | 'production';

export interface ItemConfigurationWithPath {
  title?: string;
  /**
   * path for the section. Will be inferred from title if not provided
   */
  path?: string;
}

export interface ComponentSectionConfiguration
  extends ItemConfigurationWithPath {
  type: 'components';
  /**
   * A short description of this section.
   */
  description?: string;
  /**
   * location of a Markdown file containing the overview content.
   */
  content?: string;
  /**
   * a glob pattern string
   */
  components: string;
}

export interface ContentItemConfiguration extends ItemConfigurationWithPath {
  type: 'content';
  /**
   * location of a Markdown file containing the overview content.
   */
  content: string;
}

export interface LinkItemConfiguration {
  type: 'link';
  title: string;
  /**
   * URL for the link
   */
  href: string;
}

export interface DocSectionConfiguration extends ItemConfigurationWithPath {
  type: 'docs';
  /**
   * relative path to the folder that contents all the markdown files.
   */
  folder: string;
}

export interface GroupSectionConfiguration extends ItemConfigurationWithPath {
  type: 'group';
  /**
   * section title
   */
  title?: string;
  /**
   * path for the section. Will be inferred from title if not provided
   */
  path?: string;
  items: Array<ItemConfiguration>;
}

export type ItemConfiguration =
  | ComponentSectionConfiguration
  | ContentItemConfiguration
  | LinkItemConfiguration
  | DocSectionConfiguration
  | GroupSectionConfiguration;

export interface ReactShowroomConfiguration {
  /**
   * modules to be available to be imported in examples.
   *
   * - If it's a local module in the project, pass 'name' (how it is imported) and 'path' (relative path from project root).
   * - If it's a third-party library, pass the package name.
   */
  imports: Array<
    | {
        name: string;
        path: string;
      }
    | string
  >;
  items?: Array<ItemConfiguration>;
  /**
   * Title to be displayed for the site.
   *
   * @default 'React Showroom'
   */
  title?: string;
  webpackConfig?: Configuration | ((env: Environment) => Configuration);
  /**
   * output of the generated site.
   *
   * @default 'showroom'
   */
  outDir?: string;
  /**
   * controls if the build output should be pre-rendered.
   *
   * This is useful to ensure your components are SSR-friendly.
   *
   * Note that this would increase time to generate the static site because
   * we will need to generate separate bundle for pre-rendering.
   *
   * @default false
   */
  prerender?: boolean;
  /**
   * Set a prefix for the static site.
   *
   * Note that this only takes effect if `prerender` is set to `true`.
   *
   * @example '/docs'
   *
   * @default '/''
   */
  basePath?: string;
  /**
   * One of the themes provided by `'prism-react-renderer'`.
   */
  codeTheme?: PrismTheme;
}

export interface ReactShowroomComponentSectionConfig {
  type: 'component';
  sourcePath: string;
  docPath: string | null;
  parentSlugs: Array<string>;
}

interface ReactShowroomMarkdownSectionConfig {
  type: 'markdown';
  sourcePath: string;
  slug: string;
  title?: string;
}

interface ReactShowroomLinkSectionConfig {
  type: 'link';
  href: string;
  title: string;
}

interface ReactShowroomGroupSectionConfig {
  type: 'group';
  title: string;
  slug: string;
  items: Array<ReactShowroomSectionConfig>;
}

/**
 * @private
 */
export type ReactShowroomSectionConfig =
  | ReactShowroomComponentSectionConfig
  | ReactShowroomMarkdownSectionConfig
  | ReactShowroomLinkSectionConfig
  | ReactShowroomGroupSectionConfig;

export interface NormalizedReactShowroomConfiguration
  extends Omit<ReactShowroomConfiguration, 'components' | 'sections'> {
  title: string;
  sections: Array<ReactShowroomSectionConfig>;
  components: Array<ReactShowroomComponentSectionConfig>;
  outDir: string;
  prerender: boolean;
  basePath: string;
  codeTheme: PrismTheme;
}

export interface ReactShowroomComponentSection {
  type: 'component';
  data: ComponentDocItem;
  slug: string;
}

export interface ReactShowroomMarkdownSection {
  type: 'markdown';
  Component: ComponentType<any>;
  title: string;
  slug: string;
  frontmatter: {
    title?: string;
    order?: number;
    hideSidebar?: boolean;
    hideHeader?: boolean;
  };
}

interface ReactShowroomLinkSection {
  type: 'link';
  href: string;
  title: string;
}

export interface ReactShowroomGroupSection {
  type: 'group';
  title: string;
  slug: string;
  items: Array<ReactShowroomSection>;
}

export type ReactShowroomSection =
  | ReactShowroomComponentSection
  | ReactShowroomMarkdownSection
  | ReactShowroomLinkSection
  | ReactShowroomGroupSection;
