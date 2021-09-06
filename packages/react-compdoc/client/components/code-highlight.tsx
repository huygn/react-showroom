import Highlight, { Language, Prism, PrismTheme } from 'prism-react-renderer';
import { Fragment } from 'react';

export const CodeHighlight = (props: {
  code: string;
  language: Language;
  theme: PrismTheme;
}) => (
  <Highlight Prism={Prism} {...props}>
    {({ tokens, getLineProps, getTokenProps }) => (
      <Fragment>
        {tokens.map((line, i) => (
          // eslint-disable-next-line react/jsx-key
          <div {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              // eslint-disable-next-line react/jsx-key
              <span {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </Fragment>
    )}
  </Highlight>
);
