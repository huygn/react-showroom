import { ArrowsExpandIcon } from '@heroicons/react/outline';
import { removeTrailingSlash } from '@showroomjs/core';
import { icons, styled, Tooltip } from '@showroomjs/ui';
import * as React from 'react';
import { Link, useRouteMatch } from '../lib/routing';

export const LinkToStandaloneView = (props: {
  codeHash: string | undefined;
  isDesigner: boolean;
}) => {
  const { url } = useRouteMatch();

  return props.codeHash ? (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <StyledLink
          to={`${removeTrailingSlash(url)}/_standalone/${props.codeHash}${
            props.isDesigner ? '?commentMode=true' : ''
          }`}
          data-testid="standalone-link"
        >
          <ArrowsExpandIcon width={20} height={20} className={icons()} />
        </StyledLink>
      </Tooltip.Trigger>
      <Tooltip.Content>
        Standalone
        <Tooltip.Arrow />
      </Tooltip.Content>
    </Tooltip.Root>
  ) : null;
};

const StyledLink = styled(Link, {
  display: 'inline-flex',
  alignItems: 'center',
  textDecoration: 'none',
  px: '$1',
  gap: '$1',
  fontSize: '$sm',
  color: '$gray-500',
  outlineRing: '',
});