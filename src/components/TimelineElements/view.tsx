import React from 'react';
import styled, { StyledComponent } from '@emotion/styled';

import { MovementType } from '../Timeline/constants';
import { ReactiveColumnWrapperProps } from './declarations';
import { CrossBrowserCSS } from '../../reactive/utils';

// TODO: Pass colours
// TODO: Pass highlight colour
// TODO: Theme provider

/**
 * Grid row
 */
export const Row: StyledComponent<any, any, any> = styled.div`
  &.header {
    background-color: #f6f6f6;
    color: rgb(0, 11, 40);
    border-bottom: 1px solid #c5c5c5;
    li {
      background: none;
      border-left: 1px solid #e7e7e7;
    }
  }
  &.stripes {
    width: 100%;
    position: absolute;
    left: 0;
    width: 100%;
    z-index: 0;
    height: 100%;
  }
  z-index: 10;
  border-bottom: 1px solid #c5c5c5;
`;

/**
 * Grid Columns container
 */
export const Columns: StyledComponent<any, any, any> = styled.ul`
  padding: 10px 0;
`;

export const StrippedColumn: StyledComponent<any, any, any> = styled.li`
  border-left: 1px solid #e7e7e7;
`;

/**
 * Grid Column
 */
export const Column: StyledComponent<any, any, any> = styled.li`
  padding: 20px;
  background: #ffd035;
  position: relative;
  border-radius: 5px;
  .item,
  .item .handle {
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    touch-action: manipulation;
  }
  &:active {
    opacity: 0.9;
    cursor: move;
    ${CrossBrowserCSS.grabbing}
    pointer-events: none;
    user-select: none;
  }
  .item {
    color: #fff;
    min-width: 100%;
    position: absolute;
    left: 0;
    z-index: 10;
    top: 0;
    height: 100%;
    cursor: move;
    cursor: grab;
    display: flex;
    align-items: center;
    justify-content: center;
    .handle {
      height: 80%;
      position: absolute;
      top: 10%;
      left: 5px;
      background: #fff;
      z-index: 20;
      width: 5px;
      border-radius: 10xp;
      &.handle-left {
        cursor: col-resize;
        cursor: w-resize;
        left: 5px;
      }
      &.handle-right {
        left: auto;
        right: 3px;
        cursor: col-resize;
        cursor: e-resize;
      }
    }
    .inner {
      text-align: center;
      z-index: 5;
      pointer-events: none;
      user-select: none;
    }
  }
`;

/**
 * First Table Column
 */
export const FirstColumn: StyledComponent<any, any, any> = styled.div`
  padding: 20px;
  background-color: #f6f6f6;
  border-right: 1px solid #e7e7e7;
  z-index: 10;
  position: relative;
`;

/**
 * Grid wrapper setting the main grid
 */
export const Wrapper: StyledComponent<any, any, any> = styled.div`
  display: grid;
  border: 0;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  background-color: white;
  > div {
    display: grid;
    grid-template-columns: ${({ withFirstColumn, withFirstColumnSize }) =>
        withFirstColumn ? withFirstColumnSize || '1fr' : ''} 1fr;
    > ul {
      list-style: none;
      display: grid;
      grid-template-columns: repeat(
        ${({ numberOfColumns }) => numberOfColumns},
        1fr
      );
      grid-gap: 8px 0;
      padding: 0;
      margin: 0;
    }
  }
`;

/**
 * Reactive Column Wrapper displays the column and it's size.
 * It's a function, that gets feeded the multi-casting Behaviour
 * Subject from rxjs, filters the result to only care about
 * it's own change and renders the component.
 */
export const ReactiveColumnWrapper = React.memo(
  (props: ReactiveColumnWrapperProps) => {
    const { i, columnSizing, children } = props;
    /**
     * Calculate latest column size
     */
    const [columnSize, columnSpan] = columnSizing;

    /**
     * Render the column
     */
    return (
      <Columns key={`line-${i}`}>
        <Column
          style={{
            gridColumn: `${columnSize} / span ${columnSpan}`,
          }}
        >
          <div
            className="item"
            data-index={i}
            data-type={MovementType.Drag}
            data-edge={MovementType.None}
            data-sizing={`${columnSize},${columnSpan}`}
          >
            <div
              data-edge={MovementType.Left}
              data-type={MovementType.Resize}
              className="handle handle-left"
            />
            <div className="inner">{children(props)}</div>
            <div
              data-edge={MovementType.Right}
              data-type={MovementType.Resize}
              className="handle handle-right"
            />
          </div>
        </Column>
      </Columns>
    );
  }
);
